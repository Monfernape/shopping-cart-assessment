import React from "react";
import { useRouter } from "next/router";
import { ProductService } from "../services";
import { Product } from "../models";

interface IProps {
  isEdit?: boolean;
  editProduct?: Product | null;
}

export const ProductForm = ({ isEdit = false, editProduct = null }: IProps) => {
  const [product, setProduct] = React.useState<Product>(
    isEdit
      ? (editProduct as Product)
      : {
          name: "",
          price: "",
          stock: "",
        }
  );

  const router = useRouter();
  const productService = new ProductService();

  const addProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (isEdit) await productService.updateProduct(product);
      else await productService.addProduct(product);
      router.push("/products-list");
    } catch {
      console.error("ERROR");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isEdit ? "Edit" : "Add"} Product
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={addProduct}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="sr-only">Name</label>
              <input
                type="text"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
              />
            </div>
            <div>
              <label className="sr-only">Price</label>
              <input
                value={product.price}
                type="number"
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Price"
              />
            </div>

            <div>
              <label className="sr-only">In Stock</label>
              <input
                type="number"
                value={product.stock}
                onChange={(e) =>
                  setProduct({ ...product, stock: e.target.value })
                }
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Stock"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              {isEdit ? "Update" : "Add"} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
