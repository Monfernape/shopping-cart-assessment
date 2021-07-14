import { Document } from "mongoose";

export interface UserDocument extends Document {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    spendingHistory: string[]
}