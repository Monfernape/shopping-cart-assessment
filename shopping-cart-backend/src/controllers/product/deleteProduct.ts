import { Request, Response, NextFunction } from "express";
import { Database } from "../../repositories";
import { NotFoundError } from "../../bootstrap/middlewares/NotFoundError";

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
    next(new NotFoundError());
  }
};
