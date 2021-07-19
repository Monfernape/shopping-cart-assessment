import { Request, Response, NextFunction } from "express";
import { Database } from "../../repositories";
import { BadRequestError } from "../../bootstrap/middlewares/BadRequestError";
import { ProductDocument, CartDocument } from "../../interfaces";

export const addItemToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cartId, productId } = req.params;
  try {
    const cart = await Database.cartRepository.getCartById(cartId);
    const product = (await Database.productRepository.getProductById(
      productId
    )) as ProductDocument;
    if (cart && product.stock > 0) {
      cart.products.push(productId);
      product.stock = product.stock - 1;
      await Database.productRepository.updateProduct(product);
      await Database.cartRepository.updateCart(cart);
      res.status(200).send({ message: "Cart Updated" });
    } else {
      const cartWithProduct = (await Database.cartRepository.getCartByProduct(
        productId
      )) as CartDocument;
      if (cartWithProduct) {
        cartWithProduct.products = cartWithProduct.products.filter(
          (p) => p !== productId
        );
        await Database.cartRepository.updateCart(cartWithProduct);
      } else
        res.status(400).send({ message: "Purchase Error: Item Out Of Stock" });
    }
  } catch {
    next(new BadRequestError());
  }
};
