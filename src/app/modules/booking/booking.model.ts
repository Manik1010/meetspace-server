import { Schema, model } from "mongoose";
import { Types } from "mongoose";
import TSlot from "../slot/slot.interface";

// Create and export the Slot model
const slotSchema = new Schema<TSlot>({
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: [true, "Room is required"]
    },
    date: {
        type: Date,
        required: [true, "Booking date is required"]
    },
    startTime: {
        type: String,
        required: [true, "Start time is required"]
    },
    endTime: {
        type: String,
        required: [true, "End time is required"]
    },
    isBooked: {
        type: Boolean,
        default: false,
        required: [true, "Booking status is required"]
    }
});

const SlotModel = model<TSlot>("Slot", slotSchema);
export default SlotModel;
