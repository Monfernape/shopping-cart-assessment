import { Document } from "mongoose";

export interface CartDocument extends Document {
    userId: string;
    products: Array<string>
}