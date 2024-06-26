import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import dataRetrieveRoutes from "./routes/dataRetrieveRoutes";
import balanceRetrieveRoutes from "./routes/balanceRetrieveRoutes";
import { verifyToken } from "./middlewares/auth";
import cookieParser from "cookie-parser";
import * as localSwagger from "./swagger-dev";
import * as prodSwagger from "./swagger-prod";
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
app.use(
	cors({
		origin: [
			`http://localhost:${PORT}`,
			`https://carboncell-backend-assignment.onrender.com/`,
		],
	})
);
app.use(cookieParser());
if (process.env.NODE_ENV === "production") {
	app.use(
		"/api-docs",
		prodSwagger.swaggerUiExpress.serve,
		prodSwagger.swaggerUiExpress.setup(prodSwagger.specs)
	);
} else {
	app.use(
		"/api-docs",
		localSwagger.swaggerUiExpress.serve,
		localSwagger.swaggerUiExpress.setup(localSwagger.specs)
	);
}
app.use("/auth", authRoutes);
app.use("/", verifyToken, dataRetrieveRoutes);
app.use("/balance", verifyToken, balanceRetrieveRoutes);
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
