import { Product } from "../models";
import axios from "./axios.service";

export class ProductService {
  public getProducts = () => {
    return axios
      .get("/product")
      .then((response) => response.data.data as Product[]);
  };

  public getProductById = (id: string) => {
    return axios.get(`/product/${id}`).then(response => response.data.data as Product)
  }

  public addProduct = (product: Product) => {
    return axios.post("/product", product);
  };

  public deleteProduct = (id: string) => {
    return axios.delete(`/product/${id}`)
  }
  
  public updateProduct = (product: Product) => {
    return axios.put('/product', product)
  }
}
