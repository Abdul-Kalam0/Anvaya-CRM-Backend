import express from "express";
const router = express.Router();
import { leadCreation, getAllLeads } from "../controllers/leadControllers.js";

router.post("/leads", leadCreation);
router.get("/leads", getAllLeads);

export default router;
