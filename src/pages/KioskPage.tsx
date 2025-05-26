import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import { ProductGrid } from "../components/ProductGrid";
import { CartSidebar } from "../components/CartSidebar";
import { SettingsModal } from "../components/SettingsModal"; // 추가!

type KioskPageProps = {
  products: any[];
  onCheckout: (items: ReturnType<typeof useCart>["items"]) => void;
};

export const KioskPage: React.FC<KioskPageProps> = ({ products, onCheckout }) => {
  const cart = useCart();
  const [showSettings, setShowSettings] = useState(false);

  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex h-screen">
      <div className="w-2/3 p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">상품 목록</h2>
          <button
            onClick={() => setShowSettings(true)}
            className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          >
            ⚙️ 설정
          </button>
        </div>
        <ProductGrid products={products} onAddToCart={cart.addItem} />
      </div>

      <div className="w-1/3 border-l p-4 bg-gray-100">
        <CartSidebar
          items={cart.items}
          onRemove={cart.removeItem}
          onUpdateQuantity={cart.updateQuantity}
          onCheckout={() => onCheckout(cart.items)}
          total={total}
        />
      </div>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
};
