import React from "react";
import Link from "next/link";
import { useQuery, useMutation } from "react-query";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
import { ProductService } from "../services";
import { queryClient } from "../constants";
import type { Product } from "../models";

export const AdminProductsList = () => {
  const productService = new ProductService();

  const {
    data: products = [],
    error,
    isLoading,
  } = useQuery<Product[]>("products", productService.getProducts);

  const {
    isLoading: deleting,
    error: deleteError,
    mutate: deletion,
  } = useMutation(productService.deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  const deleteProduct = async (id: string) => {
    deletion(id);
  };

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>ERROR</div>;
  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Products
        </h3>
        <Link href="/products">
          <a className="text-indigo-500">
            <PlusIcon className="h-6 w-6 cursor-pointer" aria-hidden="true" />
          </a>
        </Link>
      </div>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Stock Available
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        $ {product.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          parseInt(product.stock) > 5
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className={"flex gap-4"}>
                        <Link href={`/products/${product._id}`}>
                          <a>
                            <PencilIcon
                              className="h-6 w-6 cursor-pointer"
                              aria-hidden="true"
                            />
                          </a>
                        </Link>
                        <TrashIcon
                          className={"h-5 w-5"}
                          onClick={() => deleteProduct(product._id as string)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
