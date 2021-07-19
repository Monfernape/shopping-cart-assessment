import { Request, Response, NextFunction } from "express";
import { Database } from "../../repositories";
import { BadRequestError } from "../../bootstrap/middlewares/BadRequestError";

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
    next(new BadRequestError());
  }
};