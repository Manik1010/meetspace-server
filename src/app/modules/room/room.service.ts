import TRoom from "./room.interface";
import RoomModel from "./room.model";
import { isValidObjectId } from "mongoose";

const createRoomIntoDB = async (room: TRoom) => {
    try {
        const result = await RoomModel.create(room);
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

const getAllRoomIntoDB = async (searchTerm?: string) => {
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
        
        const rooms = await RoomModel.find(query).exec();
        return rooms;
    } catch (err: unknown) {
        console.error('Error fetching rooms:', err);

        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error('An unknown error occurred while fetching rooms.');
        }
    }
};
const getSingleRoomIntoDB = async (id: string) => {
    if (!isValidObjectId(id)) {
        throw new Error("Invalid Room ID");
    }
    const result = await RoomModel.findOne({ _id: id });
    return result;
};

// Delete a product by ID from the database
const deleteRoomIntoDB = async (id: string) => {
    if (!isValidObjectId(id)) {
        throw new Error("Invalid room ID");
    }
    const result = await RoomModel.deleteOne({ _id: id });
    return result;
};

const updateRoomIntoDB = async (roomId: string, updatedRoom: TRoom) => {
    if (!isValidObjectId(roomId)) {
        throw new Error("Invalid Room ID");
    }
    const result = await RoomModel.findByIdAndUpdate(
        roomId,
        { $set: updatedRoom },
        { new: true, runValidators: true }
    );
    return result;
};
export const RoomServices = {
    createRoomIntoDB,
    getSingleRoomIntoDB,
    getAllRoomIntoDB,
    updateRoomIntoDB,
    deleteRoomIntoDB,
};
