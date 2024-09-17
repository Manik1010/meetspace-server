import { Schema, model } from "mongoose";
import { Types } from "mongoose";
import TBooking from "./booking.interface";

// Create and export the Booking model
const bookingSchema = new Schema<TBooking>({
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: [true, "Room is required"]
    },
    slots: [{
        type: Schema.Types.ObjectId,
        ref: 'Slot',
        required: [true, "At least one slot is required"]
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User is required"]
    },
    date: {
        type: Date,
        required: [true, "Booking date is required"]
    },
    totalAmount: {
        type: Number,
        required: [true, "Total amount is required"]
    },
    isConfirmed: {
        type: Boolean,
        default: false,
        required: [true, "Booking confirmation status is required"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

const BookingModel = model<TBooking>("Booking", bookingSchema);
export default BookingModel;
