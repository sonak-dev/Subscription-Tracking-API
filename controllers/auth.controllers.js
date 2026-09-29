import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";


// 🔹 Sign up controller
export const signUp = async (req, res, next) => {
   const { name, email, password } = req.body;

   // 1. Validate required fields
   if (!name || !email || !password) {
      const error = new Error(
         "Please provide all required fields: name, email, and password."
      );
      error.statusCode = 400;
      return next(error);
   }

   try {
      // 2. Check if user already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
         const error = new Error("User already exists");
         error.statusCode = 409;
         throw error;
      }

      // 3. Hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      // 4. Create user
      const newUser = await User.create({
         name,
         email,
         password: hashPassword
      });

      // 5. Generate JWT
      const token = jwt.sign(
         { userId: newUser._id },
         JWT_SECRET,
         { expiresIn: JWT_EXPIRES_IN || "7d" }
      );

      // 6. Store JWT in HTTP-only cookie
      res.cookie("token", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "strict",
         maxAge: 7 * 24 * 60 * 60 * 1000
      });

      // 7. Send response
      res.status(201).json({
         success: true,
         message: "User created successfully",
         data: {
            user: {
               id: newUser._id,
               name: newUser.name,
               email: newUser.email
            }
         }
      });

   } catch (error) {
      next(error);
   }
};


// 🔹 Sign in controller
export const signIn = async (req, res, next) => {
   try {
      const { email, password } = req.body;

      // 1. Find user
      const user = await User.findOne({ email });

      // 2. Check if user exists
      if (!user) {
         const error = new Error("Invalid email or password");
         error.statusCode = 401;
         throw error;
      }

      // 3. Compare entered password with stored hash
      const isPasswordValid = await bcrypt.compare(
         password,
         user.password
      );

      if (!isPasswordValid) {
         const error = new Error("Invalid email or password");
         error.statusCode = 401;
         throw error;
      }

      // 4. Generate JWT
      const token = jwt.sign(
         { userId: user._id },
         JWT_SECRET,
         { expiresIn: JWT_EXPIRES_IN || "7d" }
      );

      // 5. Store JWT in HTTP-only cookie
      res.cookie("token", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "strict",
         maxAge: 7 * 24 * 60 * 60 * 1000
      });

      // 6. Send safe user data
      res.status(200).json({
         success: true,
         message: "User signed in successfully",
         data: {
            user: {
               id: user._id,
               name: user.name,
               email: user.email
            }
         }
      });

   } catch (error) {
      next(error);
   }
};


// 🔹 Sign out controller
export const signOut = async (req, res, next) => {
   try {
      // Remove JWT cookie
      res.clearCookie("token");

      res.status(200).json({
         success: true,
         message: "User signed out successfully"
      });

   } catch (error) {
      next(error);
   }
};

