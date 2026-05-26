import { Schema, model, Document } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  stock: number;
}

// 2. Create a Schema corresponding to the document interface.
const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  stock: { type: Number, required: true, default: 10 }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// 3. Create and export the Model.
export const Product = model<IProduct>('Product', productSchema);