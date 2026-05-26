import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose'; // <-- Add Mongoose

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB Connected successfully! 🗄️'))
  .catch((err) => console.log('MongoDB connection error: ', err));

import productRoutes from './routes/productRoutes';
app.use('/api/products', productRoutes);

import checkoutRoutes from './routes/checkoutRoutes';
app.use('/api/checkout', checkoutRoutes);

// Health Check Route
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running and healthy! 🚀' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});