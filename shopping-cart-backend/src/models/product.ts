import { Schema, model } from "mongoose";
import { ProductDocument } from "../interfaces";

const schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

export const Product = model<ProductDocument>("product", schema);
