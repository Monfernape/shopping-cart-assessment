import { Product } from "./product.model";

export type Cart = {
    _id?: string;
    userId: string;
    products: Array<Product>
}