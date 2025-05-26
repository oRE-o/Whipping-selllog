import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import { ProductGrid } from "../components/ProductGrid";
import { CartSidebar } from "../components/CartSidebar";
import { SettingsModal } from "../components/SettingsModal";

type KioskPageProps = {
  products: any[];
  onCheckout: (items: ReturnType<typeof useCart>["items"]) => void;
};

export const KioskPage: React.FC<KioskPageProps> = ({ products, onCheckout }) => {
  const cart = useCart();
  const [showSettings, setShowSettings] = useState(false);

  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onCheckout(cart.items);
    cart.clear();  // 결제 알림 후 장바구니 비우기!
  };

  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-3 bg-base-100">
      {/* 좌측: 상품 목록 */}
      <div className="lg:col-span-2 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">상품 목록</h2>
          <button
            onClick={() => setShowSettings(true)}
            className="btn btn-sm btn-outline btn-neutral"
          >
            ⚙️ 설정
          </button>
        </div>
        <div className="space-y-4">
          <ProductGrid products={products} onAddToCart={cart.addItem} />
        </div>
      </div>

      {/* 우측: 장바구니 */}
      <div className="border-l bg-base-200 p-6 min-w-[400px]">
        <CartSidebar
          items={cart.items}
          onRemove={cart.removeItem}
          onUpdateQuantity={cart.updateQuantity}
          onCheckout={handleCheckout} 
          total={total}
          onClear={cart.clear}
        />
      </div>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
};
