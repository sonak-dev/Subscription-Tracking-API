import { Router } from "express";

import {
   signUp,
   signIn,
   signOut
} from "../controllers/auth.controllers.js";

const authRouter = Router();


/**
 * @swagger
 * /api/v1/auth/sign-up:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account, hashes the password, generates a JWT, and stores the JWT in an HTTP-only cookie.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpRequest'
 *           example:
 *             name: Sonak Jha
 *             email: sonak@example.com
 *             password: password123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               success: true
 *               message: User created successfully
 *               data:
 *                 user:
 *                   id: "64f123456789abcdef123456"
 *                   name: Sonak Jha
 *                   email: sonak@example.com
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Please provide all required fields: name, email, and password.
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: User already exists
 */
authRouter.post("/sign-up", signUp);


/**
 * @swagger
 * /api/v1/auth/sign-in:
 *   post:
 *     summary: Sign in an existing user
 *     description: Authenticates the user's email and password, generates a JWT, and stores the JWT in an HTTP-only cookie.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInRequest'
 *           example:
 *             email: sonak@example.com
 *             password: password123
 *     responses:
 *       200:
 *         description: User signed in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               success: true
 *               message: User signed in successfully
 *               data:
 *                 user:
 *                   id: "64f123456789abcdef123456"
 *                   name: Sonak Jha
 *                   email: sonak@example.com
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Invalid email or password
 */
authRouter.post("/sign-in", signIn);


/**
 * @swagger
 * /api/v1/auth/sign-out:
 *   post:
 *     summary: Sign out the current user
 *     description: Clears the authentication cookie and signs out the current user.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: User signed out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User signed out successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Unauthorized
 */
authRouter.post("/sign-out", signOut);


export default authRouter;