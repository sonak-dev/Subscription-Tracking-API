import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import {
<<<<<<< HEAD
   getSubscriptions,
   getSubscription,
   createSubscription,
   getUserSubscription,
   updateSubscription,
   deleteSubscription,
   cancelSubscription,
   getUpcomingRenewals
=======
    getSubscriptions,
    getSubscription,
    createSubscription,
    getUserSubscription,
    updateSubscription,
    deleteSubscription,
    cancelSubscription,
    getUpcomingRenewals
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
} from "../controllers/subscription.controllers.js";


const subscriptionRouter = Router();


/**
 * @swagger
 * /api/v1/subscriptions:
 *   get:
<<<<<<< HEAD
 *     summary: Get all subscriptions of the logged-in user
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of the authenticated user's subscriptions
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
 *         description: Unauthorized - missing or invalid token
 */
subscriptionRouter.get(`/`, authorize, getSubscriptions);
=======
 *     tags: [Subscriptions]
 *     summary: Get all subscriptions
 *     description: Returns a list of all subscriptions from all users in the database.
 *     responses:
 *       200:
 *         description: List of all subscriptions
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - _id: "6a6b3034f250b87ad168ed7d"
 *                   name: "Netflix Premium"
 *                   price: 19.99
 *                   currency: "USD"
 *                   frequency: "monthly"
 *                   category: "entertainment"
 *                   paymentMethod: "Credit Card"
 *                   status: "active"
 *                   startDate: "2026-07-01T00:00:00.000Z"
 *                   renewalDate: "2026-07-31T00:00:00.000Z"
 *                   user: "6a6b302ef250b87ad168ed79"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
subscriptionRouter.get(`/`, getSubscriptions);
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1


/**
 * @swagger
 * /api/v1/subscriptions/upcoming-renewals:
 *   get:
<<<<<<< HEAD
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
=======
 *     tags: [Subscriptions]
 *     summary: Get upcoming renewals for logged-in user
 *     description: Returns all active subscriptions for the authenticated user sorted by renewal date (soonest first).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of upcoming renewals sorted by date
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - _id: "6a6b3034f250b87ad168ed7d"
 *                   name: "Netflix Premium"
 *                   price: 19.99
 *                   currency: "USD"
 *                   renewalDate: "2026-07-31T00:00:00.000Z"
 *                   status: "active"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
 */
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
subscriptionRouter.get(`/upcoming-renewals`, authorize, getUpcomingRenewals);


/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   get:
<<<<<<< HEAD
 *     summary: Get a specific subscription by ID (owner only)
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
=======
 *     tags: [Subscriptions]
 *     summary: Get a single subscription by ID
 *     description: Returns details of a specific subscription using its MongoDB ID.
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
<<<<<<< HEAD
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
=======
 *         description: MongoDB Subscription ID
 *         example: "6a6b3034f250b87ad168ed7d"
 *     responses:
 *       200:
 *         description: Subscription found
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 _id: "6a6b3034f250b87ad168ed7d"
 *                 name: "Netflix Premium"
 *                 price: 19.99
 *                 currency: "USD"
 *                 frequency: "monthly"
 *                 category: "entertainment"
 *                 paymentMethod: "Credit Card"
 *                 status: "active"
 *                 renewalDate: "2026-07-31T00:00:00.000Z"
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 *       404:
 *         description: Subscription not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
<<<<<<< HEAD
 */
subscriptionRouter.get(`/:id`, authorize, getSubscription);
=======
 *             example:
 *               success: false
 *               error: "Subscription not found"
 */
subscriptionRouter.get(`/:id`, getSubscription);
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1


/**
 * @swagger
 * /api/v1/subscriptions:
 *   post:
<<<<<<< HEAD
 *     summary: Create a new subscription
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
=======
 *     tags: [Subscriptions]
 *     summary: Create a new subscription
 *     description: |
 *       Creates a new subscription for the authenticated user.
 *       - **renewalDate** is auto-calculated from startDate + frequency if not provided.
 *       - Automatically triggers email reminders via Upstash QStash at 7, 5, 2, and 1 day(s) before renewal.
 *       - Status auto-updates to `expired` if the renewal date has already passed.
 *     security:
 *       - bearerAuth: []
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSubscriptionRequest'
<<<<<<< HEAD
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
=======
 *           example:
 *             name: "Netflix Premium"
 *             price: 19.99
 *             currency: "USD"
 *             frequency: "monthly"
 *             category: "entertainment"
 *             paymentMethod: "Credit Card"
 *             startDate: "2026-09-01T00:00:00.000Z"
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 subscription:
 *                   _id: "6a6b3034f250b87ad168ed7d"
 *                   name: "Netflix Premium"
 *                   price: 19.99
 *                   currency: "USD"
 *                   frequency: "monthly"
 *                   category: "entertainment"
 *                   paymentMethod: "Credit Card"
 *                   status: "active"
 *                   startDate: "2026-09-01T00:00:00.000Z"
 *                   renewalDate: "2026-10-01T00:00:00.000Z"
 *                   user: "6a6b302ef250b87ad168ed79"
 *                 workflowRunId: "wfr_abc123"
 *       400:
 *         description: Duplicate active subscription
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "You already have an active subscription."
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 */
subscriptionRouter.post(`/`, authorize, createSubscription);


/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   put:
<<<<<<< HEAD
 *     summary: Update a subscription's details
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
=======
 *     tags: [Subscriptions]
 *     summary: Update a subscription
 *     description: |
 *       Updates specific fields of a subscription. Only the owner can update.
 *       - Allowed fields: `name`, `price`, `currency`, `paymentMethod`, `frequency`, `category`
 *       - Expired subscriptions cannot be updated.
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
 *         description: MongoDB ObjectId of the subscription
 *         example: 64f8a1b2c3d4e5f6a7b8c9d1
=======
 *         description: MongoDB Subscription ID
 *         example: "6a6b3034f250b87ad168ed7d"
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
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
<<<<<<< HEAD
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
=======
 *             example:
 *               success: true
 *               message: "Subscription updated successfully"
 *               data:
 *                 _id: "6a6b3034f250b87ad168ed7d"
 *                 name: "Netflix Standard"
 *                 price: 15.49
 *       400:
 *         description: Expired subscription cannot be updated
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Expired subscription cannot be updated"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
 *       403:
 *         description: Forbidden — not the owner
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "You cannot update this subscription"
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
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
<<<<<<< HEAD
 *     summary: Cancel an active subscription
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
=======
 *     tags: [Subscriptions]
 *     summary: Cancel a subscription
 *     description: Cancels an active subscription. Status changes to `cancelled`. Only the owner can cancel. Already cancelled subscriptions return an error.
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
 *         description: MongoDB ObjectId of the subscription
 *         example: 64f8a1b2c3d4e5f6a7b8c9d1
=======
 *         description: MongoDB Subscription ID
 *         example: "6a6b3034f250b87ad168ed7d"
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 *     responses:
 *       200:
 *         description: Subscription cancelled successfully
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
 *                   example: Subscription cancelled successfully
 *                 data:
 *                   $ref: '#/components/schemas/Subscription'
=======
 *             example:
 *               success: true
 *               message: "Subscription cancelled successfully"
 *               data:
 *                 _id: "6a6b3034f250b87ad168ed7d"
 *                 name: "Netflix Premium"
 *                 status: "cancelled"
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 *       400:
 *         description: Subscription is already cancelled
 *         content:
 *           application/json:
<<<<<<< HEAD
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
=======
 *             example:
 *               success: false
 *               message: "Subscription is already cancelled"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
 *       403:
 *         description: Not authorized to cancel this subscription
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "You are not authorized to cancel this subscription"
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
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
<<<<<<< HEAD
 *     summary: Delete a subscription by ID
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
=======
 *     tags: [Subscriptions]
 *     summary: Delete a subscription
 *     description: Permanently deletes a subscription. Only the owner can delete their subscription.
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
 *         description: MongoDB ObjectId of the subscription
 *         example: 64f8a1b2c3d4e5f6a7b8c9d1
=======
 *         description: MongoDB Subscription ID
 *         example: "6a6b3034f250b87ad168ed7d"
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 *     responses:
 *       200:
 *         description: Subscription deleted successfully
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
=======
 *             example:
 *               success: true
 *               message: "Subscription deleted successfully"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
 *       403:
 *         description: Not authorized to delete
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "You are not authorized to delete this subscription"
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
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
<<<<<<< HEAD
 *     summary: Get all subscriptions for a specific user
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
=======
 *     tags: [Subscriptions]
 *     summary: Get all subscriptions of a specific user
 *     description: Returns all subscriptions belonging to the specified user. Only the owner can view their own subscriptions.
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
=======
 *         description: MongoDB User ID
 *         example: "6a6b302ef250b87ad168ed79"
 *     responses:
 *       200:
 *         description: User subscriptions retrieved
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - _id: "6a6b3034f250b87ad168ed7d"
 *                   name: "Netflix Premium"
 *                   price: 19.99
 *                   status: "active"
 *                 - _id: "6a6b3042f250b87ad168ed81"
 *                   name: "Spotify Duo"
 *                   price: 14.99
 *                   status: "active"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
 *       403:
 *         description: Not the owner of this account
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "You are not the owner of this account"
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
 */
subscriptionRouter.get(`/user/:id`, authorize, getUserSubscription);


export default subscriptionRouter;