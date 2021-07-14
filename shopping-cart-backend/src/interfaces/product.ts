import { Document } from "mongoose";

export interface ProductDocument extends Document {
    name: string;
    price: number;
    stock: number;
}