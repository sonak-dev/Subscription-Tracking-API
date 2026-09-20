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


/**
 * @swagger
 * /api/v1/subscriptions/upcoming-renewals:
 *   get:
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
subscriptionRouter.get(`/upcoming-renewals`, authorize, getUpcomingRenewals);


/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   get:
 *     tags: [Subscriptions]
 *     summary: Get a single subscription by ID
 *     description: Returns details of a specific subscription using its MongoDB ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *       404:
 *         description: Subscription not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Subscription not found"
 */
subscriptionRouter.get(`/:id`, getSubscription);


/**
 * @swagger
 * /api/v1/subscriptions:
 *   post:
 *     tags: [Subscriptions]
 *     summary: Create a new subscription
 *     description: |
 *       Creates a new subscription for the authenticated user.
 *       - **renewalDate** is auto-calculated from startDate + frequency if not provided.
 *       - Automatically triggers email reminders via Upstash QStash at 7, 5, 2, and 1 day(s) before renewal.
 *       - Status auto-updates to `expired` if the renewal date has already passed.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSubscriptionRequest'
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
 */
subscriptionRouter.post(`/`, authorize, createSubscription);


/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   put:
 *     tags: [Subscriptions]
 *     summary: Update a subscription
 *     description: |
 *       Updates specific fields of a subscription. Only the owner can update.
 *       - Allowed fields: `name`, `price`, `currency`, `paymentMethod`, `frequency`, `category`
 *       - Expired subscriptions cannot be updated.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Subscription ID
 *         example: "6a6b3034f250b87ad168ed7d"
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
 *     tags: [Subscriptions]
 *     summary: Cancel a subscription
 *     description: Cancels an active subscription. Status changes to `cancelled`. Only the owner can cancel. Already cancelled subscriptions return an error.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Subscription ID
 *         example: "6a6b3034f250b87ad168ed7d"
 *     responses:
 *       200:
 *         description: Subscription cancelled successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Subscription cancelled successfully"
 *               data:
 *                 _id: "6a6b3034f250b87ad168ed7d"
 *                 name: "Netflix Premium"
 *                 status: "cancelled"
 *       400:
 *         description: Subscription is already cancelled
 *         content:
 *           application/json:
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
 *     tags: [Subscriptions]
 *     summary: Delete a subscription
 *     description: Permanently deletes a subscription. Only the owner can delete their subscription.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Subscription ID
 *         example: "6a6b3034f250b87ad168ed7d"
 *     responses:
 *       200:
 *         description: Subscription deleted successfully
 *         content:
 *           application/json:
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
 *     tags: [Subscriptions]
 *     summary: Get all subscriptions of a specific user
 *     description: Returns all subscriptions belonging to the specified user. Only the owner can view their own subscriptions.
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
 */
subscriptionRouter.get(`/user/:id`, authorize, getUserSubscription);


export default subscriptionRouter;