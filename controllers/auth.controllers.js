import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";


export const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        const error = new Error('Please provide all required fields: name, email, and password.');
        error.statusCode = 400;
        return next(error);
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        let newUser;
        let session = null;

        try {
            session = await mongoose.startSession();
            session.startTransaction();

            const newUsers = await User.create([{
                name,
                email,
                password: hashPassword
            }], { session });

            newUser = newUsers[0];
            await session.commitTransaction();
            session.endSession();
        } catch (txError) {
            if (session) {
                await session.abortTransaction();
                session.endSession();
            }
            // Fallback for standalone MongoDB instances without replica set support
            newUser = await User.create({
                name,
                email,
                password: hashPassword
            });
        }

        const token = jwt.sign(
            { userId: newUser._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN || '7d' }
        );

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUser
            }
        });

    } catch (error) {
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
    
    try {
        res.status(200).json({
            success: true,
            message: "User signed out successfully"
        });

    }catch(error) {
        next(error);
    }
    
}