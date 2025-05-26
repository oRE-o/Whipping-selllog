import React from "react";
import { ProductButton } from "./ProductButton";

type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
  category: string;  // 카테고리 필드 추가
};

type Props = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

export const ProductGrid: React.FC<Props> = ({ products, onAddToCart }) => {
  // 1. 카테고리별 그룹핑
  const grouped = products.reduce<Record<string, Product[]>>((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([category, productsInCategory]) => (
        <section key={category}>
          {/* 소제목 */}
          <h3 className="text-xl font-semibold mb-4 border-b pb-1">{category}</h3>

          {/* 그리드 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {productsInCategory.map((product) => (
              <ProductButton
                key={product.id}
                product={product}
                onClick={() => onAddToCart(product)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
