import { Request, Response } from 'express';
import { BookingServices } from './booking.service';
import TBooking from './booking.interface';
import BookingModel from './booking.model';

const createBooking = async (req: Request, res: Response) => {
    try {
        const bookingData = req.body; // Corrected to use the whole body
        console.log('Received Booking data:', bookingData); // Enhanced logging for debugging

        // Check if all required fields are provided
        const { room, slots, user, date, totalAmount, isConfirmed, isDeleted } = bookingData;

        if (!room || !slots || !user || !date || totalAmount === undefined || isConfirmed === undefined || isDeleted === undefined) {
            console.error('Validation failed: Missing required fields');
            return res.status(400).json({
                success: false,
                message: 'All required fields (room, slots, user, date, totalAmount, isConfirmed, isDeleted) must be provided.',
            });
        }

        // Call the service function to save the booking to the database
        const result = await BookingServices.createBookingIntoDB(bookingData);

        res.status(201).json({
            success: true,
            message: 'Booking created successfully.',
            data: result,
        });
    } catch (err: unknown) {
        console.error('Error in createBooking controller:', err);
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'An error occurred while creating the booking.',
                error: err.message,
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'An unknown error occurred.',
                error: 'Unknown error',
            });
        }
    }
};

const getAllBooking = async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.searchTerm as string | undefined;
        const booking = await BookingServices.getAllBookingIntoDB(searchTerm);

        res.status(200).json({
            success: true,
            message: 'booking fetched successfully.',
            data: booking,
        });
    } catch (err: unknown) {
        console.error('Error in getAllbooking controller:', err);
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'An error occurred while fetching booking.',
                error: err.message,
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'An unknown error occurred.',
                error: 'Unknown error',
            });
        }
    }
}

const getUserBooking = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        console.log(userId);

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'user ID is required'
            });
        }

        const result = await BookingServices.getUserBookingIntoDB(userId);

        if (result) {
            res.status(200).json({
                success: true,
                message: "user fetched successfully!",
                data: result
            });
        } else {
            res.status(404).json({
                success: false,
                message: "user not found!"
            });
        }
    } catch (err: unknown) {
        console.error('Error in getUseruser controller:', err);
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: err.message || "Something went wrong",
                error: err.message
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: 'Unknown error'
            });
        }
    }
};

const deleteSingleBooking = async (req: Request, res: Response) => {
    try {
        const { bookingId } = req.params;
        console.log(bookingId)
        const result = await BookingServices.deleteBookingIntoDB(bookingId)
        if (result.deletedCount > 0) {
            res.status(200).json({
                success: true,
                message: "room deleted successfully!",
                data: null
            });
        } else {
            res.status(404).json({
                success: false,
                message: "room not found!"
            });
        }

    } catch (err: unknown) {  // Changed from 'any' to 'unknown'
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: err.message || "Something went wrong",
                error: err.message
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: 'Unknown error'
            });
        }
    }
}
const updateBooking = async (req: Request, res: Response) => {
    try {
        const { bookingId } = req.params;
        const updatedData = req.body;

        const result = await BookingServices.updateBookingIntoDB(bookingId, updatedData);

        if (result) {
            res.status(200).json({
                success: true,
                message: 'Booking updated successfully!',
                data: result
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Booking not found!'
            });
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: err.message || 'Something went wrong',
                error: err.message
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error: 'Unknown error'
            });
        }
    }
};
export const BookingControllers = {
    createBooking,
    getAllBooking,
    getUserBooking,
    updateBooking,
    deleteSingleBooking,
};
