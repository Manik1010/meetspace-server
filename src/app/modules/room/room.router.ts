import express from 'express';
import { RoomControllers } from './room.controller'; // Properly import controller

const router = express.Router();

router.post('', RoomControllers.createRoom);
router.get('', RoomControllers.getAllRooms)
router.get('/:roomId', RoomControllers.getSingleRoom)
router.put('/:roomId', RoomControllers.updateRoom)
router.delete('/:roomId', RoomControllers.deleteSingleRoom)

export const RoomIRoutes = router;
