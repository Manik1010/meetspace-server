import TSlot from "./slot.interface";
import SlotModel from "./slot.model";


const createSlotIntoDB = async (slot: TSlot) => {
    try {
        const result = await SlotModel.create(slot);
        return result;
    } catch (err: unknown) {
        console.error('Error creating slot:', err);

        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error('An unknown error occurred while creating the slot.');
        }
    }
};

export const SlotServices = {
    createSlotIntoDB,

};