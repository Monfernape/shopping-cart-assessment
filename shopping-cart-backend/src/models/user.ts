import { Schema, model } from "mongoose";
import { UserDocument } from "../interfaces";

const schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  spendingHistory: [{type:Schema.Types.ObjectId, ref:'product'}],
});

export const User = model<UserDocument>("user", schema);
 
