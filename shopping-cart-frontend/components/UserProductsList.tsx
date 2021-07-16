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

export const UserProductsList = () => {
  return (
    <div className="flex flex-wrap gap-6 p-6 ">
      {products.map((x, i) => (
        <Product key={i} product={x} />
      ))}
    </div>
  );
};

const Product = ({ product }: any) => {
  const { name, price, stock } = product;
  return (
    <div className="bg-white rounded-xl shadow-md flex items-center p-6">
      <div>
        <div className="text-xl font-medium text-black">{name}</div>
        <div className="flex justify-between space-x-3">
          <p className="text-gray-500">USD {price}</p>
          <p className="text-gray-500">{stock} Remaining</p>
        </div>
        <button
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
