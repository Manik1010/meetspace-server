import TBooking from "./booking.interface";
import BookingModel from "./booking.model";
import { isValidObjectId } from "mongoose";

const createBookingIntoDB = async (room: TBooking) => {
    try {
        const result = await BookingModel.create(room);
        return result;
    } catch (err: unknown) {
        console.error('Error creating room:', err);

        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error('An unknown error occurred while creating the room.');
        }
    }
};
// Get all products from the database
const getAllBookingIntoDB = async (searchTerm?: string) => {
    try {
        let query = {};
        
        if (searchTerm) {
            query = {
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { amenities: { $regex: searchTerm, $options: 'i' } }
                ]
            };
        }
        
        const booking = await BookingModel.find(query).exec();
        return booking;
    } catch (err: unknown) {
        console.error('Error fetching rooms:', err);

        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error('An unknown error occurred while fetching rooms.');
        }
    }
};

const getUserBookingIntoDB = async (id: string) => {
    if (!isValidObjectId(id)) {
        throw new Error("Invalid Room ID");
    }
    const result = await BookingModel.findOne({ _id: id });
    return result;
};

// Delete a product by ID from the database
const deleteBookingIntoDB = async (id: string) => {
    if (!isValidObjectId(id)) {
        throw new Error("Invalid Booking ID");
    }
    const result = await BookingModel.deleteOne({ _id: id });
    return result;
};

const updateBookingIntoDB = async (bookingId: string, updatedBooking: TBooking) => {
    if (!isValidObjectId(bookingId)) {
        throw new Error("Invalid Room ID");
    }
    const result = await BookingModel.findByIdAndUpdate(
        bookingId,
        { $set: updatedBooking },
        { new: true, runValidators: true }
    );
    return result;
};

export const BookingServices = {
    createBookingIntoDB,
    getAllBookingIntoDB,
    getUserBookingIntoDB,
    updateBookingIntoDB,
    deleteBookingIntoDB,
};
