import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(400, "User not found");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

//Registration
const register = asyncHandler(async (req, res) => {
try {
    const { username, email, password } = req.body;
  
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) throw new ApiError(400, "Username or Email already registered");
  
    const user = await User.create(
      { 
        username,
        email,
        password 
      });
  
    res.status(200).json(
      new ApiResponse(
        200,
        user,
        "User registered successfully"
      )
    );
} catch (error) {
  throw new ApiError(500,"Something went wrong while creating the user")
}
});

// Login
const login = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

   if(!(email || username)){
        throw new ApiError(500,"Email is required")
    }
    
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(401, "User was not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(500,"Invalid Credentials")
    }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken") 
  const options = {
    httpOnly:true,
    secure: true,
    sameSite: "None"
  }

  res
  .status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(
    new ApiResponse(
      200,
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: accessToken,
      },
      "Login successful"
    )
  );
});

// Logout
const logout = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(200).json(new ApiResponse(200, null, "User already logged out"));
  }

  // Clear token cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json(new ApiResponse(200, null, "Logged out successfully"));
});

// Refresh Access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) throw new ApiError(401, "No refresh token found");

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded._id);

    if (!user || user.refreshToken !== token) {
      throw new ApiError(403, "Invalid refresh token");
    }

    const newAccessToken = user.generateAccessToken();

    res.status(200).json(
      new ApiResponse(
        200,
        { token: newAccessToken },
        "Access token refreshed successfully"
      )
    );
  } catch (err) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }
});

export { register, login, logout, refreshAccessToken };
