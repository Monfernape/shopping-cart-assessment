import React from "react";
import { useQuery, useMutation } from "react-query";
import { Cart as ICart, Product } from "../models";
import { CartService, getUserId } from "../services";
import { queryClient } from "../constants";

export const Cart = () => {
  const cartService = new CartService();
  const userId = getUserId();

  const {
    isLoading,
    error,
    data: cart,
  } = useQuery<ICart>("cart", () => cartService.getCartByUserId(userId));

  const { mutate: removeItem } = useMutation(
    (productId: string) =>
      cartService.removeItemFromCart((cart as ICart)._id as string, productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cart");
        queryClient.invalidateQueries("products");
      },
    }
  );

  const { mutate: buyItems } = useMutation(
    () => cartService.buyItems((cart as ICart)._id as string, userId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cart");
      },
    }
  );

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Errors</div>;
  return (
    <div className={"w-1/4 flex flex-col gap-2 bg-gray-300 h-screen"}>
      {(cart?.products || []).length > 0 && (
        <button
          onClick={() => buyItems()}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Buy Products
        </button>
      )}
      {cart?.products.map((x, i) => (
        <CartItem key={i} product={x} removeItem={(id) => removeItem(id)} />
      ))}
    </div>
  );
};

const CartItem = ({
  product,
  removeItem,
}: {
  product: Product;
  removeItem: (id: string) => void;
}) => {
  const { name, price, _id } = product;
  return (
    <div className="bg-white rounded-xl shadow-md flex items-center p-6">
      <div>
        <div className="text-xl font-medium text-black">{name}</div>
        <div className="flex justify-between space-x-3">
          <p className="text-gray-500">USD {price}</p>
        </div>
        <button
          onClick={() => removeItem(_id as string)}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Remove
        </button>
      </div>
    </div>
  );
};
