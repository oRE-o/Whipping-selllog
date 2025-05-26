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
      className="btn btn-outline border-1 hover:border-primary hover:bg-primary hover:text-white text-left p-0 overflow-hidden h-auto min-h-0 rounded-lg transition-all"
    >
      <div className="flex flex-col w-full">
        {product.image && (
          <div className="bg-base-200 h-32 flex items-center justify-center overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="object-contain h-full w-full"
            />
          </div>
        )}
        <div className="p-3 text-sm">
          <div className="font-bold text-lg">{product.name}</div>
          <div className="text-gray-500 text-right">{product.price.toLocaleString()}원</div>
        </div>
      </div>
    </button>
  );
};
