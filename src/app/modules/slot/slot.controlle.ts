import { Request, Response } from 'express';
import { SlotServices } from './slot.service';
import SlotModel from './slot.model';

const createSlot = async (req: Request, res: Response) => {
    try {
        const slotData = req.body;
        console.log('Received slot data:', slotData);

        // Destructure required fields from slotData
        const { room, date, startTime, endTime } = slotData;

        // Check if all required fields are provided
        if (!room || !date || !startTime || !endTime) {
            console.error('Validation failed: Missing required fields');
            return res.status(400).json({
                success: false,
                message: 'All required fields (room, date, startTime, endTime) must be provided.',
            });
        }

        // Call the service function to save the slot to the database
        const result = await SlotServices.createSlotIntoDB(slotData);

        // Send response
        res.status(201).json({ 
            success: true,
            message: 'Slot created successfully.',
            data: result,
        });
    } catch (err: unknown) {
        console.error('Error in createSlot controller:', err);
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'An error occurred while creating the slot.',
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

export const SlotControllers = {
    createSlot,
    getAvailableSlots,
};