import { Schema, model } from "mongoose";
import { CartDocument } from "../interfaces";

const schema = new Schema({
  userId: { type: String, required: true },
  products: [{type:Schema.Types.ObjectId, ref:'product'}],
});

export const Cart = model<CartDocument>("cart", schema);
