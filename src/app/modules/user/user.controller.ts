import { Request, Response } from "express";
import { UserServices } from "./user.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createUser = async (req: Request, res: Response) => {
    try {
        const { users } = req.body;
        const { name, email, password, phone, address, role } = users;

        if (!name || !email || !password || !phone || !address || !role) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided.',
            });
        }

        const result = await UserServices.createUserIntoDB(users);
        res.status(201).json({
            success: true,
            message: 'User created successfully.',
            data: result,
        });
    } catch (err: unknown) {
        console.error('Error in createUser controller:', err);
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'An error occurred while creating the user.',
                error: err.message,
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'An unknown error occurred.',
            });
        }
    }
};


const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const user = await UserServices.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials.",
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials.",
            });
        }

        const token = jwt.sign(
            {
                sub: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                address: user.address,
            },
            process.env.JWT_SECRET || "your_jwt_secret_key",
            { expiresIn: "1h" }
        );

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User logged in successfully",
            token,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                address: user.address,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while logging in.",
        });
    }
};

export const UserControllers = {
    createUser,
    loginUser,
};
