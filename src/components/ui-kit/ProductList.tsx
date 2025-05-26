import React from "react";
import { Product } from "../../shared/types";

type Props = {
  products: Product[];
  renderProduct: (item: Product) => React.ReactElement;
};

export const ProductList = (props: Props) => {
  const { products, renderProduct } = props;
  return (
    <div className="flex flex-col gap-4">
      {products.map((product) => renderProduct(product))}
    </div>
  );
};
