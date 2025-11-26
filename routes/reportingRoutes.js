import express from "express";
const router = express.Router();

import {
  getClosedLeadsLastWeek,
  getPipelineCount,
} from "../controllers/reportingControllers.js";

router.get("/report/last-week", getClosedLeadsLastWeek);
router.get("/report/pipeline", getPipelineCount);

export default router;
