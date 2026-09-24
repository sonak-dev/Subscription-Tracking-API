import { Router } from "express";
import { signUp, signIn, signOut } from "../controllers/auth.controllers.js";

const authRouter = Router();

<<<<<<< HEAD

=======
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
/**
 * @swagger
 * /api/v1/auth/sign-up:
 *   post:
<<<<<<< HEAD
 *     summary: Register a new user
 *     tags: [Auth]
=======
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: Creates a new user account and returns a JWT token for authentication.
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpRequest'
 *     responses:
 *       201:
<<<<<<< HEAD
 *         description: User registered successfully
=======
 *         description: User created successfully
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
<<<<<<< HEAD
=======
 *             example:
 *               success: true
 *               message: "User created successfully"
 *               data:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   _id: "6a6b302ef250b87ad168ed79"
 *                   name: "Sonak Jha"
 *                   email: "sonak@example.com"
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
<<<<<<< HEAD
=======
 *             example:
 *               success: false
 *               error: "Please provide all required fields: name, email, and password."
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
<<<<<<< HEAD
 */
// path: api/v1/auth/sign-up
=======
 *             example:
 *               success: false
 *               error: "User already exists"
 */
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
authRouter.post(`/sign-up`, signUp);


/**
 * @swagger
 * /api/v1/auth/sign-in:
 *   post:
<<<<<<< HEAD
 *     summary: Sign in an existing user
 *     tags: [Auth]
=======
 *     tags: [Auth]
 *     summary: Sign in an existing user
 *     description: Authenticates user credentials and returns a JWT token. Use this token as Bearer token in protected routes.
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInRequest'
 *     responses:
 *       200:
<<<<<<< HEAD
 *         description: User signed in successfully
=======
 *         description: Signed in successfully
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
<<<<<<< HEAD
 *       401:
 *         description: Invalid password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
=======
 *             example:
 *               success: true
 *               message: "User signed in successfully"
 *               data:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   _id: "6a6b302ef250b87ad168ed79"
 *                   name: "Sonak Jha"
 *                   email: "sonak@example.com"
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
<<<<<<< HEAD
=======
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
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 */
authRouter.post(`/sign-in`, signIn);


/**
 * @swagger
 * /api/v1/auth/sign-out:
 *   post:
<<<<<<< HEAD
 *     summary: Sign out the current user
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
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
=======
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
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 */
authRouter.post(`/sign-out`, signOut);


export default authRouter;