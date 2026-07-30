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


subscriptionRouter.get(`/`, getSubscriptions);


// 🔹 Static routes must come BEFORE dynamic parameter routes (/:id) to prevent route shadowing
subscriptionRouter.get(`/upcoming-renewals`, authorize, getUpcomingRenewals);


subscriptionRouter.get(`/:id`, getSubscription);


subscriptionRouter.post(`/`, authorize, createSubscription);


subscriptionRouter.put(`/:id`, authorize, updateSubscription);


subscriptionRouter.put(`/:id/cancel`, authorize, cancelSubscription);


subscriptionRouter.delete(`/:id`, authorize, deleteSubscription);


subscriptionRouter.get(`/user/:id`, authorize, getUserSubscription);


export default subscriptionRouter;