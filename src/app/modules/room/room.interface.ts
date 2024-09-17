export type RoomAmenities = {
    name: string;
};

export type TRoom = {
    name: string;
    roomNo: number; 
    floorNo: number;
    capacity: number;
    pricePerSlot: number;
    amenities: RoomAmenities[];
    isDeleted: boolean;
};

export default TRoom;
