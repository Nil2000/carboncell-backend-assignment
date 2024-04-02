"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: "Email already exists" });
            return;
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const newUSer = new User_1.default({ name, email, password: hashedPassword });
        yield newUSer.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to register user" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield User_1.default.findOne({ email });
        if (!existingUser) {
            res.status(401).json({ error: "User does not exist" });
        }
        const passwordValid = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!passwordValid) {
            res.status(401).json({ error: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({
            userId: existingUser === null || existingUser === void 0 ? void 0 : existingUser.id,
            email: existingUser === null || existingUser === void 0 ? void 0 : existingUser.email,
            name: existingUser === null || existingUser === void 0 ? void 0 : existingUser.name,
        }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res
            .status(200)
            .cookie("accesstoken", token)
            .json({ token, name: existingUser === null || existingUser === void 0 ? void 0 : existingUser.name });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to login user" });
    }
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res
            .status(200)
            .clearCookie("accesstoken")
            .json({ message: "User logged out successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to log out user" });
    }
});
exports.logoutUser = logoutUser;
