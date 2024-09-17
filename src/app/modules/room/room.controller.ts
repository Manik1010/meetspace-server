import { Request, Response } from 'express';
import { RoomServices } from './room.service';
import TRoom from './room.interface';

const createRoom = async (req: Request, res: Response) => {
    try {
        const roomData = req.body;
        console.log('Received room data:', roomData); // Enhanced logging for debugging

        // Check if all required fields are provided
        const { name, roomNo, floorNo, capacity, pricePerSlot, amenities } = roomData;

        if (!name || !roomNo || !floorNo || !capacity || !pricePerSlot || !amenities) {
            console.error('Validation failed: Missing required fields');
            return res.status(400).json({
                success: false,
                message: 'All required fields (name, roomNo, floorNo, capacity, pricePerSlot, amenities) must be provided.',
            });
        }

        // Call the service function to save the room to the database
        const result = await RoomServices.createRoomIntoDB(roomData);

        // Send response
        res.status(201).json({ 
            success: true,
            message: 'Room created successfully.',
            data: result,
        });
    } catch (err: unknown) {
        console.error('Error in createRoom controller:', err);
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'An error occurred while creating the room.',
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

const getSingleRoom = async (req: Request, res: Response) => {
    try {
        const { roomId } = req.params;
        // console.log(roomId);
        const result = await RoomServices.getSingleRoomIntoDB(roomId)
        if (result) {
            res.status(200).json({
                success: true,
                message: "room fetched successfully!",
                data: result
            })
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

export const RoomControllers = {
    createRoom,
    getSingleRoom,
};
