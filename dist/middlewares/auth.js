"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => {
    var _a, _b;
    const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accesstoken) ||
        ((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", ""));
    if (!token) {
        res.status(401).json({ error: "No token provided" });
        return;
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "", (err, decoded) => {
            if (err) {
                res.status(401).json({ error: "Invalid token" });
                return;
            }
            req.user = decoded;
            next();
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to authenticate token",
        });
    }
};
exports.verifyToken = verifyToken;
