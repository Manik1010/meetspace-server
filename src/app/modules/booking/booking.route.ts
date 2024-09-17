import express from 'express';
import { BookingControllers } from './booking.controller';

const router = express.Router();

router.post('', BookingControllers.createBooking);
router.get('', BookingControllers.getAllBooking);
router.get('/:userId', BookingControllers.getUserBooking);
router.put('/:bookingId', BookingControllers.updateBooking)
router.delete('/:bookingId', BookingControllers.deleteSingleBooking)

export const BookingRoutes = router;
