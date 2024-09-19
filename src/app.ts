import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { RoomIRoutes } from './app/modules/room/room.router';
import { BookingRoutes } from './app/modules/booking/booking.route';
import { SlotRoutes } from './app/modules/slot/slot.route';
import { UserRoutes } from './app/modules/user/user.router';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/auth', UserRoutes)
app.use('/api/rooms', RoomIRoutes)
app.use('/api/bookings', BookingRoutes)
app.use('/api/slots',SlotRoutes)

const getRoom = (req: Request, res: Response) => {
    res.send('Hello World meetspace-server');
};

app.get('/', getRoom);

export default app;
