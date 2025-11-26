import express from "express";
const router = express.Router();
import {
  leadCreation,
  getAllLeads,
  leadDelete,
  leadUpdate,
} from "../controllers/leadControllers.js";

router.post("/leads", leadCreation);
router.get("/leads", getAllLeads);
router.put("/leads/:id", leadUpdate);
router.delete("/leads/:id", leadDelete);

export default router;
