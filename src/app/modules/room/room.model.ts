import { Schema, model } from "mongoose";
import TRoom from "./room.interface";

const roomSchema = new Schema<TRoom>({
    name: {
        type: String,
        trim: true,
        minlength: [3, 'Room name must be at least 3 characters'],
        maxlength: [50, 'Room name must be at most 50 characters'],
        unique: true,
        required: [true, "Room name is required"],
    },
    roomNo: {
        type: Number,
        unique: true,
        required: [true, "Room number is required"],
    },
    floorNo: {
        type: Number,
        required: [true, "Floor number is required"],
    },
    capacity: {
        type: Number,
        required: [true, "Capacity is required"],
    },
    pricePerSlot: {
        type: Number,
        required: [true, "Price per slot is required"],
    },
    amenities: {
        type: [String],
        required: [true, "Amenities are required"],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

// Create and export the room model
const RoomModel = model<TRoom>("Room", roomSchema);
export default RoomModel;