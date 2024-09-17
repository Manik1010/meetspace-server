import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { RoomIRoutes } from './app/modules/room/room.router';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/rooms', RoomIRoutes)

const getRoom = (req: Request, res: Response) => {
    res.send('Hello World meetspace-server');
};

app.get('/', getRoom);

export default app;
