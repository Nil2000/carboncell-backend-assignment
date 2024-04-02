import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import dataRetrieveRoutes from "./routes/dataRetrieveRoutes";
import balanceRetrieveRoutes from "./routes/balanceRetrieveRoutes";
import { verifyToken } from "./middlewares/auth";
import cookieParser from "cookie-parser";
import { specs, swaggerUiExpress } from "./swagger";
import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
mongoose.connect(process.env.MONGO_URI || "", {}).then(() => {
	console.log("Connected to MongoDB");
});
app.get("/", (req, res) => {
	res.send("Hello World");
});
app.use(cors());
app.use(cookieParser());
app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use("/auth", authRoutes);
app.use("/", verifyToken, dataRetrieveRoutes);
app.use("/balance", verifyToken, balanceRetrieveRoutes);
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
