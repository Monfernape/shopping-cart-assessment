import React from "react";

const products = [
  {
    name: "Item 1",
    price: 500,
    stock: 35,
  },
  {
    name: "Item 1",
    price: 500,
    stock: 35,
  },
  {
    name: "Item 1",
    price: 500,
    stock: 35,
  },
  {
    name: "Item 1",
    price: 500,
    stock: 35,
  },
  {
    name: "Item 1",
    price: 500,
    stock: 35,
  },
];

export const Cart = () => {
  return (
    <div className={"w-1/6 flex flex-col gap-2"}>
      {products.map((x, i) => (
        <CartItem key={i} product={x} />
      ))}
    </div>
  );
};

const CartItem = ({ product }: any) => {
  const { name, price } = product;
  return (
    <div className="bg-white rounded-xl shadow-md flex items-center p-6">
      <div>
        <div className="text-xl font-medium text-black">{name}</div>
        <div className="flex justify-between space-x-3">
          <p className="text-gray-500">USD {price}</p>
        </div>
        <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Remove
        </button>
      </div>
    </div>
  );
};
