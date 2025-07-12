import express from "express"
const router = express.Router();
import { verifyJWT } from "../middlewares/authMiddleware.js";
import {
  getAllQuestion,
  getAQuestion,
  newQuestion,
  updateQuestion,
  deleteQuestion
} from "../controller/questions.controller.js"

router.route("/").post(verifyJWT,newQuestion)
router.route("/").patch(verifyJWT,updateQuestion)
router.route("/").delete(verifyJWT,deleteQuestion)
export default router;