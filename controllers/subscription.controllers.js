import Subscription from "../models/subscription.model.js";
import { workflowClient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";



export const getSubscriptions = async (req, res, next) => {

  try{

    const subscriptions = await Subscription.find();

    res.status(200).json({
      success: true,
      data: subscriptions
    });

  }catch(error){
    next(error);
  }

}



export const getSubscription = async (req, res, next) => {

  try{

    const subscription = await Subscription.findById(req.params.id);

    if(!subscription){
      const error = new Error('Subscription not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: subscription
    })

  }catch(error){
    next(error);
  }

}



export const createSubscription = async (req, res, next) => {
    
  try {
    // Step 1: Check if user already has an active subscription
    const existingSub = await Subscription.findOne({
      user: req.user._id,
      status: "active", // assuming you have a 'status' field
    });

    if (existingSub) {
      return res.status(400).json({
        success: false,
        message: "You already have an active subscription.",
      });
    }

    // Step 2: Create new subscription
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    // Step 3: Trigger workflow
    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: { subscriptionId: subscription.id },
      headers: { "Content-Type": "application/json" },
      retries: 0,
    });

    // Step 4: Send response
    res.status(201).json({
      success: true,
      data: { subscription, workflowRunId },
    });
  } catch (error) {
    next(error);
  }

};



export const updateSubscription = async (req, res, next) => {

  try {

    const { id } = req.params;

    // 1️⃣ Subscription dhundho
    const subscription = await Subscription.findById(id);
    if(!subscription) {
      return res.status(404).json({ 
        success: false,
        message: "Subscription not found"
      });
    }

    // 2️⃣ Ownership check (sirf owner hi update kare)
    if(subscription.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You cannot update this subscription" 
      });
    }

    // 3️⃣ Expired subscription update na ho
    if(subscription.status === "expired") {
      return res.status(400).json({ 
        success: false,
        message: "Expired subscription cannot be updated" 
      });
    }

    // 4️⃣ Simple update - allowed fields
    const allowedFields = ["name", "price", "currency", "paymentMethod", "frequency", "category"];
    allowedFields.forEach(field => {
      if(req.body[field] !== undefined) {
        subscription[field] = req.body[field];
      }
    });

    // 5️⃣ Save subscription
    await subscription.save();

    // 6️⃣ Send response
    res.status(200).json({
      success: true,
      message: "Subscription updated successfully",
      data: subscription
    });

  } catch (error) {
    next(error);
  }
};



export const deleteSubscription = async (req, res, next) => {

  try {

    const { id } = req.params;

    // 1️⃣ Find subscription first
    const subscription = await Subscription.findById(id);
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    // 2️⃣ Ownership check
    if (subscription.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this subscription",
      });
    }

    // 3️⃣ Delete subscription
    await subscription.deleteOne();

    // 4️⃣ Send response
    res.status(200).json({
      success: true,
      message: "Subscription deleted successfully",
      data: subscription,
    });

  } catch (error) {
    next(error);
  }

};




export const getUserSubscription = async (req, res, next) => {

    try{
        // Check if the user is the same as the one in the token
        if(req.user._id.toString() !== req.params.id){
            const error = new Error('You are not the owner of this account');
            error.statusCode = 403;
            throw error;
        }

        const subscription = await Subscription.find({user: req.params.id});

        res.status(200).json({
            success: true,
            data: subscription
        });

    }catch(error){
        next(error);
    }

}