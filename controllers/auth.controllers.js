import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";


export const signUp = async (req, res, next) => {
    // Implement sign up logic here
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Logic to create a new user
        const { name, email, password } = req.body;

        // Check if all required fields are provided (name, email, password).
        // If any field is missing, throw a 400 Bad Request error.
        if (!name || !email || !password) {
            const error = new Error('Please provide all required fields: name, email, and password.');
            error.statusCode = 400; // 400 for a bad request
            throw error;
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });

        if(existingUser){
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        // Hash password
        // Step 1: Generate a salt (random string for extra security)
        const salt = await bcrypt.genSalt(10);

        // Step 2: Hash the password with the salt
        // Step 3: Save this hashed password in database (not plain password)
        const hashPassword = await bcrypt.hash(password, salt);


        const newUsers = await User.create([{
            name,
            email,
            password: hashPassword
        }], { session } );

        
        const token = jwt.sign(
            {userId: newUsers[0]._id},
            JWT_SECRET,
            {expiresIn: JWT_EXPIRES_IN}
        );

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUsers[0]
            }
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }

}


export const signIn = async (req, res, next) => {
    // Implement sign in logic here

    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {userId: user._id},
            JWT_SECRET,
            {expiresIn: JWT_EXPIRES_IN}
        );

        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                token,
                user
            }
        })

    }catch(error){
        next(error);
    }

}


export const signOut = async (req, res, next) => {
    // Implement sign out logic here
}