import express from 'express';
import { RoomControllers } from './room.controller'; // Properly import controller

const router = express.Router();

router.post('', RoomControllers.createRoom);

export const RoomIRoutes = router;
