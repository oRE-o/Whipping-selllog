import React from "react";
import { useCart } from "../hooks/useCart";
import { ProductGrid } from "../components/ProductGrid";
import { CartSidebar } from "../components/CartSidebar";

type KioskPageProps = {
  products: any[];
};

export const KioskPage: React.FC<KioskPageProps> = ({ products }) => {
  const cart = useCart();

  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex h-screen">
      <div className="w-2/3 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">상품 목록</h2>
        <ProductGrid products={products} onAddToCart={cart.addItem} />
      </div>

      <div className="w-1/3 border-l p-4 bg-gray-100">
        <CartSidebar
          items={cart.items}
          onRemove={cart.removeItem}
          onUpdateQuantity={cart.updateQuantity}
          onCheckout={() => alert("결제 처리 예정")}
          total={total}
        />
      </div>
    </div>
  );
};
