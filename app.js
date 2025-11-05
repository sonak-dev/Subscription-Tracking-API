import express from "express";
import cookieParser from "cookie-parser";


// 🔹 Load environment variables (e.g., PORT) from centralized config
import { PORT } from "./config/env.js";


// 🔹 Import application routes
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import subscriptionRouter from "./routes/subscription.route.js"
import workflowRouter from "./routes/workflow.route.js";


// 🔹 Import MongoDB connection function
import connectToDatabase from "./database/mongodb.js";


// 🔹 Import custom global error handler
import errorMiddleware from "./middleware/error.middleware.js";
import arcjet from "@arcjet/node";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";



// Initialize Express application
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(arcjetMiddleware);


/**
 * API Routes
 * Each router handles a specific feature:
 *  - /api/v1/auth         → Authentication & Authorization
 *  - /api/v1/users        → User management
 *  - /api/v1/subscriptions → Subscription tracking
 */
app.use(`/api/v1/auth`, authRouter);
app.use(`/api/v1/users`, userRouter);
app.use(`/api/v1/subscriptions`, subscriptionRouter);
app.use(`/api/v1/workflows`, workflowRouter)


// 🔹 Global error-handling middleware (must be last middleware)
app.use(errorMiddleware)


// 🔹 Default root route (health check / welcome route)
app.get(`/`, (req, res) => {
    res.send(`Welcome to the Subscription Tracker API!`);
})


/**
 * Start the server
 *  - Listen on configured PORT
 *  - Establish MongoDB connection on startup
 */
app.listen(PORT, async () => {
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);

    await connectToDatabase();
})


export default app;