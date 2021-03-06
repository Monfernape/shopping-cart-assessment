import { Request, Response, NextFunction } from "express";
import { Database } from "../../repositories";
import { BadRequestError } from "../../bootstrap/middlewares/BadRequestError";

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const product = await Database.productRepository.getProductById(
      id as string
    );
    res.status(200).send({ message: "Retrieving Product", data: product });
  } catch {
    next(new BadRequestError());
  }
};

export const getProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const products = await Database.productRepository.getProducts()
      res.status(200).send({ message: "Retrieving Products", data: products });
    } catch {
      next(new BadRequestError());
    }
  };
