import TRoom from "./room.interface";
import RoomModel from "./room.model";

// Create a product in the database
const createRoomIntoDB = async (room: TRoom) => {
    try {
        const result = await RoomModel.create(room);
        return result;
    } catch (err: unknown) {  // Changed from 'any' to 'unknown'
        console.error('Error creating room:', err);
};
}

export const RoomServices = {
    createRoomIntoDB,

};
