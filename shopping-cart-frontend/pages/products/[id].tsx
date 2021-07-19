import { GetServerSideProps } from "next";
import { ProductForm } from "../../components";
import { Product } from "../../models";
import { ProductService } from "../../services";

type Props = {
  product: Product;
};

const EditProduct = ({ product }: Props) => {
  return <ProductForm isEdit={true} editProduct={product} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { id },
  } = context;
  const productService = new ProductService();

  const product = await productService.getProductById(id as string);
  return {
    props: {
      product,
    },
  };
};

export default EditProduct;
