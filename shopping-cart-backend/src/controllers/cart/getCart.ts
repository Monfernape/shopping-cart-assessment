import { Request, Response, NextFunction } from "express";
import { Database } from "../../repositories";
import { BadRequestError } from "../../bootstrap/middlewares/BadRequestError";

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    const cart = await Database.cartRepository.getCartByUser(userId)
    res.status(200).send({ message: "Retrieving Cart", data: cart });
  } catch {
    next(new BadRequestError());
  }
};
