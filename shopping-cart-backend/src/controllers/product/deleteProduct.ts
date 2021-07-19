import { Request, Response, NextFunction } from "express";
import { Database } from "../../repositories";
import { BadRequestError } from "../../bootstrap/middlewares/BadRequestError";

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    await Database.productRepository.deleteProduct(id as string);
    res.status(200).send({ message: "Product Deleted" });
  } catch {
    next(new BadRequestError());
  }
};
