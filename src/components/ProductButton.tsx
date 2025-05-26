// src/components/ProductButton.tsx
import React from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

type Props = {
  product: Product;
  onClick: () => void;
};

export const ProductButton: React.FC<Props> = ({ product, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full h-32 bg-white border rounded shadow hover:bg-blue-50 p-2 flex flex-col justify-between"
    >
      <div className="text-sm font-bold">{product.name}</div>
      <div className="text-sm text-gray-500">{product.price.toLocaleString()}원</div>
    </button>
  );
};
