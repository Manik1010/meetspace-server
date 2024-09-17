import express from 'express';
import { RoomControllers } from './room.controller'; // Properly import controller

const router = express.Router();

router.post('', RoomControllers.createRoom);
router.get('/:roomId', RoomControllers.getSingleRoom)

export const RoomIRoutes = router;
