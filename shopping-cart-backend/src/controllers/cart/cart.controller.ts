import { Request, Response, NextFunction } from "express";
import {
  addItemToCart,
  removeItemFromCart,
  getCart,
  buyCartItems,
} from "./index";

export class CartController {
  public static addItemToCart(req: Request, res: Response, next: NextFunction) {
    addItemToCart(req, res, next);
  }

  public static removeItemFromCart(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    removeItemFromCart(req, res, next);
  }

  public static get(req: Request, res: Response, next: NextFunction) {
    getCart(req, res, next);
  }

  public static checkout(req: Request, res: Response, next: NextFunction) {
    buyCartItems(req, res, next);
  }
}
