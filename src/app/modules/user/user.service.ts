import bcrypt from "bcryptjs";
import UserModel from "./user.model";
import TUser from "./user.interface";

// Create user in the database with hashed password
const createUserIntoDB = async (user: TUser) => {
    try {
        // Hash the user's password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;

        const result = await UserModel.create(user);
        return result;
    } catch (err: unknown) {
        console.error('Error creating User:', err);

        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error('An unknown error occurred while creating the User.');
        }
    }
};

// Find user by email
const findUserByEmail = async (email: string) => {
    try {
        const user = await UserModel.findOne({ email });
        return user;
    } catch (err) {
        console.error("Error finding user by email:", err);
        throw new Error('Error finding user by email.');
    }
};

export const UserServices = {
    createUserIntoDB,
    findUserByEmail,
};
