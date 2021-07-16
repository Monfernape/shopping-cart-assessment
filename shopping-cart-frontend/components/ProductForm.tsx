import React from "react";

interface IProduct {
  name: string;
  price: number | null;
  stock: number | null;
}

interface IProps {
  isEdit?: boolean;
}

export const ProductForm = ({ isEdit = false }: IProps) => {
  const [product, setProduct] = React.useState<IProduct>({
    name: "",
    price: null,
    stock: null,
  });

  const handleProductSubmission = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isEdit ? "Edit" : "Add"} Product
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleProductSubmission}>
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
                type="text"
                value={product.price as number}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.valueAsNumber })
                }
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Price"
              />
            </div>

            <div>
              <label className="sr-only">In Stock</label>
              <input
                type="text"
                value={product.stock as number}
                onChange={(e) =>
                  setProduct({ ...product, stock: e.target.valueAsNumber })
                }
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Price"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              {isEdit ? 'Edit' : 'Add'} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
