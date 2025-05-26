// src/components/CartSidebar.tsx
import React from "react";
import type { CartItem } from "../hooks/useCart";

type Props = {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  total: number;
};

export const CartSidebar: React.FC<Props> = ({
  items,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  total,
}) => {
  return (
    <div className="w-full max-w-xs bg-white border-l shadow p-4 space-y-4">
      <h2 className="text-lg font-bold">장바구니</h2>
      {items.length === 0 ? (
        <div className="text-gray-500">상품이 없습니다</div>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">
                  {item.price.toLocaleString()}원 × {item.quantity}
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                <button onClick={() => onRemove(item.id)} className="ml-2 text-red-500">
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="text-right font-bold mt-4">
        합계: {total.toLocaleString()}원
      </div>
    </div>
  );
};
