"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with provided name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request, email already exists
 *       '500':
 *         description: Failed to register user
 */
router.post("/register", authController_1.registerUser);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Login user with provided email and password.Sets an access token as a cookie upon successful login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully.Sets an access token as a cookie.
 *       '401':
 *         description: User does not exist or invalid password
 *       '500':
 *         description: Failed to login user
 */
router.post("/login", authController_1.loginUser);
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Clear the access token cookie to log out the user.
 *     responses:
 *       '200':
 *         description: User logged out successfully
 *       '500':
 *         description: Failed to log out user
 */
router.post("/logout", authController_1.logoutUser);
exports.default = router;
