import { Request, Response, NextFunction } from "express";
import { Database } from "../../repositories";
import { NotFoundError } from "../../bootstrap/middlewares/NotFoundError";

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = req.body;
  try {
    await Database.productRepository.updateProduct(product)
    res.status(200).send({ message: "Product Updated" });
  } catch {
    next(new NotFoundError());
  }
};