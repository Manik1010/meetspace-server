import { Schema, model } from "mongoose";
import IUser from "./user.interface";

// Create and export the User model
const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: [true, "Role is required"],
    },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const UserModel = model<IUser>("User", userSchema);
export default UserModel;
