import TRoom from "../room/room.interface";

export type TSlot = {
    room: TRoom;
    date: Date;
    startTime: string;
    endTime: string;
    isBooked: boolean;
};

export default TSlot;

