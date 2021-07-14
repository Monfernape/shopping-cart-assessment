import { Request, Response, NextFunction } from "express";
import {
  getProductById,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "./";

export class ProductController {
  public static update(req: Request, res: Response, next: NextFunction) {
    updateProduct(req, res, next);
  }

  public static getById(req: Request, res: Response, next: NextFunction) {
    getProductById(req, res, next);
  }

  public static get(req: Request, res: Response, next: NextFunction) {
    getProducts(req, res, next);
  }

  public static create(req: Request, res: Response, next: NextFunction) {
    createProduct(req, res, next);
  }

  public static deleteProduct(req: Request, res: Response, next: NextFunction) {
    deleteProduct(req, res, next);
  }
}
