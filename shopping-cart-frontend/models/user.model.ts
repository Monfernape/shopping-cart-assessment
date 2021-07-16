import { Product } from "./index"

export type User = {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    spendingHistory: Product[]
}