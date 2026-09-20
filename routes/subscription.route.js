import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import {
   getSubscriptions,
   getSubscription,
   createSubscription,
   getUserSubscription,
   updateSubscription,
   deleteSubscription,
   cancelSubscription,
   getUpcomingRenewals
} from "../controllers/subscription.controllers.js";


const subscriptionRouter = Router();


/**
 * @swagger
 * /api/v1/subscriptions:
 *   get:
 *     summary: Get all subscriptions
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: List of all subscriptions
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
 *                     $ref: '#/components/schemas/Subscription'
 */
subscriptionRouter.get(`/`, getSubscriptions);


/**
 * @swagger
 * /api/v1/subscriptions/upcoming-renewals:
 *   get:
 *     summary: Get upcoming renewal subscriptions for the authenticated user
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of active subscriptions sorted by upcoming renewal date
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
 *                     $ref: '#/components/schemas/Subscription'
 *       401:
 *         description: Unauthorized — JWT token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
// 🔹 Static routes must come BEFORE dynamic parameter routes (/:id) to prevent route shadowing
subscriptionRouter.get(`/upcoming-renewals`, authorize, getUpcomingRenewals);


/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   get:
 *     summary: Get a specific subscription by ID
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the subscription
 *         example: 64f8a1b2c3d4e5f6a7b8c9d1
 *     responses:
 *       200:
 *         description: Subscription found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: Subscription not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
subscriptionRouter.get(`/:id`, getSubscription);


/**
 * @swagger
 * /api/v1/subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSubscriptionRequest'
 *     responses:
 *       201:
 *         description: Subscription created and workflow triggered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     subscription:
 *                       $ref: '#/components/schemas/Subscription'
 *                     workflowRunId:
 *                       type: string
 *                       example: wfr_abc123xyz
 *       400:
 *         description: User already has an active subscription with the same name
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized — JWT token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
subscriptionRouter.post(`/`, authorize, createSubscription);


/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   put:
 *     summary: Update a subscription's details
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the subscription
 *         example: 64f8a1b2c3d4e5f6a7b8c9d1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSubscriptionRequest'
 *     responses:
 *       200:
 *         description: Subscription updated successfully
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
 *                   example: Subscription updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Expired subscriptions cannot be updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized — JWT token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden — you do not own this subscription
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Subscription not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
subscriptionRouter.put(`/:id`, authorize, updateSubscription);


/**
 * @swagger
 * /api/v1/subscriptions/{id}/cancel:
 *   put:
 *     summary: Cancel an active subscription
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the subscription
 *         example: 64f8a1b2c3d4e5f6a7b8c9d1
 *     responses:
 *       200:
 *         description: Subscription cancelled successfully
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
 *                   example: Subscription cancelled successfully
 *                 data:
 *                   $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Subscription is already cancelled
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized — JWT token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden — you do not own this subscription
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Subscription not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
subscriptionRouter.put(`/:id/cancel`, authorize, cancelSubscription);


/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   delete:
 *     summary: Delete a subscription by ID
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the subscription
 *         example: 64f8a1b2c3d4e5f6a7b8c9d1
 *     responses:
 *       200:
 *         description: Subscription deleted successfully
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
 *                   example: Subscription deleted successfully
 *                 data:
 *                   $ref: '#/components/schemas/Subscription'
 *       401:
 *         description: Unauthorized — JWT token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden — you do not own this subscription
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Subscription not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
subscriptionRouter.delete(`/:id`, authorize, deleteSubscription);


/**
 * @swagger
 * /api/v1/subscriptions/user/{id}:
 *   get:
 *     summary: Get all subscriptions for a specific user
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the user
 *         example: 64f8a1b2c3d4e5f6a7b8c9d0
 *     responses:
 *       200:
 *         description: Subscriptions for the specified user
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
 *                     $ref: '#/components/schemas/Subscription'
 *       401:
 *         description: Unauthorized — JWT token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden — you can only access your own subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
subscriptionRouter.get(`/user/:id`, authorize, getUserSubscription);


export default subscriptionRouter;