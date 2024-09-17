import express from 'express';
import { RoomControllers } from './room.controller'; // Properly import controller

const router = express.Router();

router.post('/create-room', RoomControllers.createRoom);

export const RoomIRoutes = router;
