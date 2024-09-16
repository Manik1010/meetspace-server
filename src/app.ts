import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/order/order.route';


const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application routes
// app.use('/api/products', ProductRoutes);
// app.use('/api/orders', OrderRoutes)

const getProduct = (req: Request, res: Response) => {
    res.send('Hello World next');
};

app.get('/', getProduct);

export default app;
