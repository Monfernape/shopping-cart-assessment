import { Request, Response, NextFunction } from "express";
import { Database } from "../../repositories";
import { NotFoundError } from "../../bootstrap/middlewares/NotFoundError";
import { UserDocument, CartDocument } from "../../interfaces";

export const buyCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cartId, userId } = req.params;
  try {
    const cart = (await Database.cartRepository.getCartById(
      cartId
    )) as CartDocument;
    const user = (await Database.userRepository.getUserById(
      userId
    )) as UserDocument;
    user.spendingHistory = [...cart.products, ...user.spendingHistory];
    cart.products = [];
    await Database.cartRepository.updateCart(cart);
    await Database.userRepository.updateUser(user);
    res.status(200).send({ message: "Cart Updated" });
  } catch {
    next(new NotFoundError());
  }
};
