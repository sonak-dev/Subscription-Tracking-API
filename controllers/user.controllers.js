import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";


export const getUsers = async (req, res, next) => {

    try{
        const users = await User.find();

        res.status(200).json({
            success: true,
            data: users
        })
    }catch(error){
        next(error);
    }

}


export const getUser = async (req, res, next) => {

    try{
        const user = await User.findById(req.params.id).select('-password');

        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: user
        })
    }catch(error){
        next(error);
    }

}


export const createUser = async (req, res, next) => {

    try{

        const { name, email, password } = req.body;

        if(!name || !email || !password){
            const error = new Error('Please provide all required fields: name, email, and password.');
            error.statusCode = 400;
            throw error;
        }

        const existingUser = await User.findOne({ email });
        
        if(existingUser){
            const error  = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password : hashPassword
        });

        const token = jwt.sign(
            {userId: newUser._id},
            JWT_SECRET,
            {expiresIn: JWT_EXPIRES_IN}
        );

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUser
            }
        });

    }catch(error){
        next(error);
    }

}


export const updateUser = async (req, res, next) => {

    try{

        const {id} = req.params;
        const {name, email, password} = req.body;

        const updateData =  {name, email};

        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            updateData.password = hashPassword;
        }

        const user = await User.findByIdAndUpdate(
            id,
            updateData,
            {new: true, runValidators: true, select: "-password"}
        )

        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user,
        });

    }catch(error){
        next(error);
    }

}


export const deleteUser = async (req, res, next) => {

    try{

        const {id} = req.params;

        const user = await User.findByIdAndDelete(id);

        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });

    }catch(error){
        next(error);
    }

}