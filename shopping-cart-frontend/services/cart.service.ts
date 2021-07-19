import { Cart } from "../models";
import axios from "./axios.service";

export class CartService {
    public getCartByUserId = (userId: string) => {
        return axios.get(`/cart/${userId}`).then(response => response.data.data as Cart)
    }

    public addItemToCart = (cartId: string, productId: string) => {
        return axios.get(`/cart/add/${cartId}/${productId}`)
    }

    public removeItemFromCart = (cartId: string, productId: string) => {
        return axios.get(`/cart/remove/${cartId}/${productId}`)
    }

    public buyItems = (cartId: string, userId: string) => {
        return axios.get(`/cart/checkout/${cartId}/${userId}`)
    }
}