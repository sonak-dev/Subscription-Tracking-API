import { Router } from "express";
import { signUp, signIn, signOut } from "../controllers/auth.controllers.js";

const authRouter = Router();

/**
 * @swagger
 * /api/v1/auth/sign-up:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: Creates a new user account and returns a JWT token for authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               success: true
 *               message: "User created successfully"
 *               data:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   _id: "6a6b302ef250b87ad168ed79"
 *                   name: "Sonak Jha"
 *                   email: "sonak@example.com"
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Please provide all required fields: name, email, and password."
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "User already exists"
 */
authRouter.post(`/sign-up`, signUp);


/**
 * @swagger
 * /api/v1/auth/sign-in:
 *   post:
 *     tags: [Auth]
 *     summary: Sign in an existing user
 *     description: Authenticates user credentials and returns a JWT token. Use this token as Bearer token in protected routes.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInRequest'
 *     responses:
 *       200:
 *         description: Signed in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               success: true
 *               message: "User signed in successfully"
 *               data:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   _id: "6a6b302ef250b87ad168ed79"
 *                   name: "Sonak Jha"
 *                   email: "sonak@example.com"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "User not found"
 *       401:
 *         description: Invalid password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Invalid password"
 */
authRouter.post(`/sign-in`, signIn);


/**
 * @swagger
 * /api/v1/auth/sign-out:
 *   post:
 *     tags: [Auth]
 *     summary: Sign out current user
 *     description: Signs out the currently authenticated user. The client should discard the JWT token after this call.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Signed out successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "User signed out successfully"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
 */
authRouter.post(`/sign-out`, signOut);


export default authRouter;