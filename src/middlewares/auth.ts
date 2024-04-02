import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
interface AuthMiddleware extends Request {
	user?: any;
}

export const verifyToken = (
	req: AuthMiddleware,
	res: Response,
	next: NextFunction
): void => {
	const token =
		req.cookies?.accesstoken ||
		req.header("Authorization")?.replace("Bearer ", "");

	if (!token) {
		res.status(401).json({ error: "No token provided" });
		return;
	}

	try {
		jwt.verify(
			token,
			process.env.JWT_SECRET || "",
			(err: any, decoded: any) => {
				if (err) {
					res.status(401).json({ error: "Invalid token" });
					return;
				}
				req.user = decoded;
				next();
			}
		);
	} catch (error) {
		res.status(500).json({
			error: "Failed to authenticate token",
		});
	}
};
