import { Application } from "express";
import { AuthRoute, ProductRoutes, UserRoutes, CartRoutes } from "../routes";

export class ApplicationRoutes {
  public static register(app: Application) {
    const authRoutes = new AuthRoute().init();
    const userRoutes = new UserRoutes().init();
    const productRoutes = new ProductRoutes().init();
    const cartRoutes = new CartRoutes().init();

    app.use("/api/auth", authRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/product", productRoutes);
    app.use("/api/cart", cartRoutes);
  }
}
