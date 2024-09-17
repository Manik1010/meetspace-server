import { Types } from "mongoose";

export type TBooking = {
    room: Types.ObjectId;
    slots: Types.ObjectId[];
    user: Types.ObjectId;
    date: Date;
    totalAmount: number;
    isConfirmed: boolean;
    isDeleted: boolean;
};

export default TBooking;