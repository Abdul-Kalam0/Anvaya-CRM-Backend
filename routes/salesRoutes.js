import express from "express";
import {
  getAllSalesAgent,
  createAgent,
} from "../controllers/agentController.js";
const router = express.Router();

router.post("/agents", createAgent);
router.get("/agents", getAllSalesAgent);

export default router;
