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

const getSingleRoomIntoDB = async (id: string) => {
    if (!isValidObjectId(id)) {
        throw new Error("Invalid Room ID");
    }
    const result = await RoomModel.findOne({ _id: id });
    return result;
};

export const RoomServices = {
    createRoomIntoDB,
    getSingleRoomIntoDB,

};
