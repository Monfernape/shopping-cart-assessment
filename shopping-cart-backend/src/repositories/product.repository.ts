import { ProductDocument } from "../interfaces";
import { Product } from "../models";

export class ProductRepository {
  getProducts = async () => {
    return await Product.find();
  };

  createProduct = async (product: ProductDocument) => {
    return await new Product(product).save();
  };

  updateProduct = async (product: ProductDocument) => {
    return await Product.findByIdAndUpdate(product._id, product);
  };

  deleteProduct = async (id: string) => {
    return await Product.findByIdAndDelete(id);
  };

  getProductById = async (id: string) => {
    return await Product.findById(id);
  };
}
