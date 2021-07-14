import { CartDocument } from "../interfaces";
import { Cart } from "../models";

export class CartRepository {

  getCartById = async (id: string) => {
    return await Cart.findById(id)
  };

  createCart = async (cart: CartDocument) => {
    return await new Cart(cart).save();
  };

  updateCart = async (cart: CartDocument) => {
    return await Cart.findByIdAndUpdate(cart._id, cart);
  };

  deleteCart = async (id: string) => {
    return await Cart.findByIdAndDelete(id);
  };

  getCartByUser = async (userId: string) => {
    return await Cart.findOne({userId}).populate('products').lean().exec()
  };

  getCartByProduct = async (productId: string) => {
    return await Cart.findOne({products: productId})
  }
}
