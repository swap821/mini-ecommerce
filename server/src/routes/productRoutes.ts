import express, { Request, Response } from 'express';
import { Product } from '../models/Product';

const router = express.Router();

// GET all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// (Optional) POST route to quickly add test products via Postman
router.post('/', async (req: Request, res: Response) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error adding product' });
  }
});

export default router;