import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

const connectToDatabase = async () => {
    if (!DB_URI) {
        console.error('CRITICAL ERROR: DB_URI environment variable is not defined.');
        console.error('Please set DB_URI in your Render environment variables dashboard.');
        process.exit(1);
    }

    try {
        await mongoose.connect(DB_URI);
        console.log(`Connected to database in ${NODE_ENV || "development"} mode`);
    } catch (error) {
        console.error('Error connecting to database: ', error);
        process.exit(1);
    }
};

export default connectToDatabase;

