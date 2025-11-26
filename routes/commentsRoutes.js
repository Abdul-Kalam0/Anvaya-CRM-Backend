import express from "express";
const router = express.Router();

import {
  addComment,
  getAllCommentsForLead,
} from "../controllers/commentsController.js";

router.post("/leads/:id/comments", addComment);
router.get("/leads/:id/comments", getAllCommentsForLead);

export default router;
