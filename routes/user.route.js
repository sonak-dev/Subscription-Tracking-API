import { Router } from "express";
<<<<<<< HEAD
import { 
   getUser, 
   getUsers, 
   createUser, 
   updateUser, 
   deleteUser 
} from "../controllers/user.controllers.js";

=======
import { getUser, getUsers, createUser, updateUser, deleteUser } from "../controllers/user.controllers.js";
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();


/**
 * @swagger
 * /api/v1/users:
 *   get:
<<<<<<< HEAD
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users (passwords excluded)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
=======
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
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 */
userRouter.get(`/`, getUsers);


/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
<<<<<<< HEAD
 *     summary: Get a specific user by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
=======
 *     tags: [Users]
 *     summary: Get a single user by ID
 *     description: Returns a specific user's details by their MongoDB ID. Requires authentication.
 *     security:
 *       - bearerAuth: []
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
<<<<<<< HEAD
 *         description: MongoDB ObjectId of the user
 *         example: 64f8a1b2c3d4e5f6a7b8c9d0
 *     responses:
 *       200:
 *         description: User found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized — JWT token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
=======
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
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 */
userRouter.get(`/:id`, authorize, getUser);


/**
 * @swagger
 * /api/v1/users:
 *   post:
<<<<<<< HEAD
 *     summary: Create a new user
 *     tags: [Users]
=======
 *     tags: [Users]
 *     summary: Create a new user directly
 *     description: Creates a user directly (without email verification). Note - For standard registration use `/api/v1/auth/sign-up` instead.
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
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
<<<<<<< HEAD
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
<<<<<<< HEAD
 *     summary: Update a user's details
 *     tags: [Users]
=======
 *     tags: [Users]
 *     summary: Update a user by ID
 *     description: Updates a user's name, email, or password. Password will be securely hashed if provided.
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
<<<<<<< HEAD
 *         description: MongoDB ObjectId of the user
 *         example: 64f8a1b2c3d4e5f6a7b8c9d0
=======
 *         description: MongoDB User ID
 *         example: "6a6b302ef250b87ad168ed79"
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
<<<<<<< HEAD
 *             $ref: '#/components/schemas/UpdateUserRequest'
=======
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
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
<<<<<<< HEAD
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/User'
=======
 *             example:
 *               success: true
 *               message: "User updated successfully"
 *               data:
 *                 _id: "6a6b302ef250b87ad168ed79"
 *                 name: "Sonak Kumar Jha"
 *                 email: "sonak.new@example.com"
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
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
<<<<<<< HEAD
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
=======
 *     tags: [Users]
 *     summary: Delete a user by ID
 *     description: Permanently deletes a user account. Requires authentication.
 *     security:
 *       - bearerAuth: []
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
<<<<<<< HEAD
 *         description: MongoDB ObjectId of the user
 *         example: 64f8a1b2c3d4e5f6a7b8c9d0
=======
 *         description: MongoDB User ID
 *         example: "6a6b302ef250b87ad168ed79"
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
<<<<<<< HEAD
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       401:
 *         description: Unauthorized — JWT token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
=======
 *             example:
 *               success: true
 *               message: "User deleted successfully"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.delete(`/:id`, authorize, deleteUser);


export default userRouter;