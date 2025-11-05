import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import { 
    getSubscriptions,
    getSubscription,
    createSubscription,
    getUserSubscription,
    updateSubscription,
    deleteSubscription
} from "../controllers/subscription.controllers.js";


const subscriptionRouter = Router();


subscriptionRouter.get(`/`, getSubscriptions);


subscriptionRouter.get(`/:id`, getSubscription);


subscriptionRouter.post(`/`, authorize, createSubscription);


subscriptionRouter.put(`/:id`, authorize, updateSubscription);


subscriptionRouter.delete(`/:id`,authorize, deleteSubscription);


subscriptionRouter.get(`/user/:id`, authorize, getUserSubscription);


subscriptionRouter.put(`/:id/cancle`, (req, res) => res.send({title: 'CANCEL subscription'}));


subscriptionRouter.get(`/upcoming-renewals`, (req, res) => res.send({title: 'GET upcoming renewals'}));




export default subscriptionRouter;