import React from "react";
import { useQuery, useMutation } from "react-query";
import { ProductService, CartService } from "../services";
import { queryClient } from "../constants";
import type { Cart, Product as IProduct } from "../models";

export const UserProductsList = () => {
  const productService = new ProductService();
  const cartService = new CartService();
  const cartId = (queryClient.getQueryData("cart") as Cart)?._id;

  const {
    data: products = [],
    error,
    isLoading,
  } = useQuery<IProduct[]>("products", productService.getProducts);

  const { mutate: addToCart } = useMutation(
    (productId: string) =>
      cartService.addItemToCart(cartId as string, productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart');
        queryClient.invalidateQueries('products');
      },
    }
  );

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Errors</div>;
  return (
    <div className="flex flex-wrap gap-6 w-3/4 ">
      {products.map((x, i) => (
        <Product key={i} product={x} addToCart={(id) => addToCart(id)} />
      ))}
    </div>
  );
};

const Product = ({
  product,
  addToCart,
}: {
  product: IProduct;
  addToCart: (id: string) => void;
}) => {
  const { name, price, stock, _id } = product;
  if(parseInt(product.stock) < 1) return null
  return (
    <div className="bg-white rounded-xl shadow-md flex items-center p-6 h-1/4">
      <div>
        <div className="text-xl font-medium text-black">{name}</div>
        <div className="flex justify-between space-x-3">
          <p className="text-gray-500">USD {price}</p>
          <p className="text-gray-500">{stock} Remaining</p>
        </div>
        <button
          onClick={() => addToCart(_id as string)}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
