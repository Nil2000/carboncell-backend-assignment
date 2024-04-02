import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const registerUser = async (req: Request, res: Response) => {
	try {
		const { name, email, password } = req.body;
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			res.status(400).json({ error: "Email already exists" });
			return;
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUSer = new User({ name, email, password: hashedPassword });
		await newUSer.save();

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		res.status(500).json({ error: "Failed to register user" });
	}
};

export const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			res.status(401).json({ error: "User does not exist" });
		}

		const passwordValid = await bcrypt.compare(
			password,
			existingUser!.password
		);
		if (!passwordValid) {
			res.status(401).json({ error: "Invalid password" });
		}

		const token = jwt.sign(
			{
				userId: existingUser?.id,
				email: existingUser?.email,
				name: existingUser?.name,
			},
			process.env.JWT_SECRET!,
			{ expiresIn: "1h" }
		);

		res
			.status(200)
			.cookie("accesstoken", token)
			.json({ token, name: existingUser?.name });
	} catch (error) {
		res.status(500).json({ error: "Failed to login user" });
	}
};

export const logoutUser = async (req: Request, res: Response) => {
	try {
		res
			.status(200)
			.clearCookie("accesstoken")
			.json({ message: "User logged out successfully" });
	} catch (error) {
		res.status(500).json({ error: "Failed to log out user" });
	}
};
