import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

// Middleware
app.use(cors(
  {
  origin:process.env.CORS_ORIGIN,
  credentials:true
}
));
app.use(express.json());
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// Routes
import queestionRouter from "./routes/questions.routes.js"

app.use("/api/questions", queestionRouter);

export {app}
