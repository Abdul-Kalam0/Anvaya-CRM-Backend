import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      //"http://localhost:5173", // local dev (Vite)
      "https://anvaya-crm-001.vercel.app", // production frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

import leadRoutes from "./routes/leadRoutes.js";
import salesRoutes from "./routes/agentRoutes.js";
import commentsRoutes from "./routes/commentsRoutes.js";
import reportingRoutes from "./routes/reportingRoutes.js";

//lead routes
app.use("/", leadRoutes);

//sales routes
app.use("/", salesRoutes);

//comments routes
app.use("/", commentsRoutes);

//reporting routes
app.use("/", reportingRoutes);

export default app;
