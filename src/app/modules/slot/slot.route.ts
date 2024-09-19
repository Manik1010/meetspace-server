import express from 'express';
import { SlotControllers } from './slot.controlle';

const router = express.Router();

router.post('', SlotControllers.createSlot);

export const SlotRoutes = router;