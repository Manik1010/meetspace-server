import { Request, Response } from 'express';
import { RoomServices } from './room.service';
// import { RoomServices } from './room.service'; // Assuming RoomServices is defined

const createRoom = async (req: Request, res: Response) => {
  try {
    const { room: roomData } = req.body;
    console.log(roomData);

    // Call the service function to save the room to the database
    const result = await RoomServices.createRoomIntoDB(roomData);

    // Send response
    res.status(200).json({
      success: true,
      message: 'Room created successfully.',
      data: result,
    });
  } catch (err: unknown) {
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

export const RoomControllers = {
  createRoom,
};
