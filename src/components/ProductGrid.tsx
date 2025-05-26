// src/components/ProductGrid.tsx
import React from "react";
import { ProductButton } from "./ProductButton";

type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

type Props = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

export const ProductGrid: React.FC<Props> = ({ products, onAddToCart }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductButton key={product.id} product={product} onClick={() => onAddToCart(product)} />
      ))}
    </div>
  );
};
