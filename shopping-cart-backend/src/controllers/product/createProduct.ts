import { Request, Response, NextFunction } from "express";
import { Database } from "../../repositories";
import { NotFoundError } from "../../bootstrap/middlewares/NotFoundError";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = req.body;
  try {
    await Database.productRepository.createProduct(product)
    res.status(200).send({ message: "Product Created" });
  } catch {
    next(new NotFoundError());
  }
};