import BaseRoute from "./base.routes";
import { CartController } from "../controllers";

export class CartRoutes extends BaseRoute {
  public init() {
    this.get("/:userId", CartController.get);
    this.get('/checkout/:cartId/:userId', CartController.checkout)
    this.get('/add/:cartId/:productId', CartController.addItemToCart)
    this.get('/remove/:cartId/:productId', CartController.removeItemFromCart)
    return this.router;
  }
}
