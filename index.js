import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

import leadRoutes from "./routes/leadRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";
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
