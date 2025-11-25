import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
    throw new Error('please define the DB_URI environment variable');
}

const connectToDatabase = async () => {
    try{
        await mongoose.connect(DB_URI);
        console.log(`Connected to database in ${NODE_ENV} mode`);
    }catch(error){
        console.error('Error connecting to database: ', error);

        process.exit(1);
    }
};

<<<<<<< HEAD
=======

>>>>>>> 3a55cbee6320fd8db13573bed2c9f63dbf69f3e8
export default connectToDatabase;
