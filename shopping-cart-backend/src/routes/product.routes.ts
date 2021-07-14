import BaseRoute from "./base.routes";
import { ProductController } from "../controllers";

export class ProductRoutes extends BaseRoute {
  public init() {
    this.get("/", ProductController.get);
    this.get("/:id", ProductController.getById);
    this.post("/", ProductController.create);
    this.put("/", ProductController.update);
    this.delete("/:id", ProductController.deleteProduct);
    return this.router;
  }
}
