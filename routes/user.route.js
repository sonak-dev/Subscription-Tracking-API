import { Router } from "express";
import { getUser, getUsers, createUser, updateUser, deleteUser } from "../controllers/user.controllers.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();


/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     description: Returns a list of all registered users. Passwords are excluded from the response.
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - _id: "6a6b302ef250b87ad168ed79"
 *                   name: "Sonak Jha"
 *                   email: "sonak@example.com"
 *                   createdAt: "2026-07-30T11:06:22.102Z"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.get(`/`, getUsers);


/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get a single user by ID
 *     description: Returns a specific user's details by their MongoDB ID. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB User ID
 *         example: "6a6b302ef250b87ad168ed79"
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 _id: "6a6b302ef250b87ad168ed79"
 *                 name: "Sonak Jha"
 *                 email: "sonak@example.com"
 *                 createdAt: "2026-07-30T11:06:22.102Z"
 *       401:
 *         description: Unauthorized - token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "User not found"
 */
userRouter.get(`/:id`, authorize, getUser);


/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     tags: [Users]
 *     summary: Create a new user directly
 *     description: Creates a user directly (without email verification). Note - For standard registration use `/api/v1/auth/sign-up` instead.
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
 *             example:
 *               success: true
 *               message: "User created successfully"
 *               data:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   _id: "6a6b302ef250b87ad168ed79"
 *                   name: "Sonak Jha"
 *                   email: "sonak@example.com"
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.post(`/`, createUser);


/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Update a user by ID
 *     description: Updates a user's name, email, or password. Password will be securely hashed if provided.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB User ID
 *         example: "6a6b302ef250b87ad168ed79"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sonak Kumar Jha"
 *               email:
 *                 type: string
 *                 example: "sonak.new@example.com"
 *               password:
 *                 type: string
 *                 example: "NewPassword456!"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "User updated successfully"
 *               data:
 *                 _id: "6a6b302ef250b87ad168ed79"
 *                 name: "Sonak Kumar Jha"
 *                 email: "sonak.new@example.com"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.put(`/:id`, updateUser);


/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user by ID
 *     description: Permanently deletes a user account. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB User ID
 *         example: "6a6b302ef250b87ad168ed79"
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "User deleted successfully"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.delete(`/:id`, authorize, deleteUser);


export default userRouter;