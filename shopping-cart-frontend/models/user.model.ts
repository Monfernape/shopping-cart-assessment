import { Product } from "./index"

export type User = {
    _id?: string
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    spendingHistory: Product[]
    role: 'admin' | 'user'
}