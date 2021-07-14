import BaseRoute from "./base.routes";
import { UserController } from "../controllers";

export class UserRoutes extends BaseRoute {
  public init() {
    this.put("/", UserController.update);
    return this.router;
  }
}
