import { Request, Response, NextFunction } from "express";
import { Database } from "../../repositories";
import { BadRequestError } from "../../bootstrap/middlewares/BadRequestError";
import { ProductDocument, CartDocument } from "../../interfaces";

export const removeItemFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cartId, productId } = req.params;
  try {
    const cart = (await Database.cartRepository.getCartById(
      cartId
    )) as CartDocument;
    const product = (await Database.productRepository.getProductById(
      productId
    )) as ProductDocument;
    cart.products = cart.products.filter((p) => p != productId);
    product.stock += 1;
    await Database.productRepository.updateProduct(product);
    await Database.cartRepository.updateCart(cart);
    res.status(200).send({ message: "Cart Updated" });
  } catch {
    next(new BadRequestError());
  }
};
