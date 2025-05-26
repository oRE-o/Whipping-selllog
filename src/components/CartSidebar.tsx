// src/components/CartSidebar.tsx
import React from "react";
import type { CartItem } from "../hooks/useCart";

type Props = {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onClear: () => void; // 비우기 콜백 추가
  total: number;
};

export const CartSidebar: React.FC<Props> = ({
  items,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  onClear,   // 받기
  total,
}) => {
  return (
    <div className="w-full bg-base-100 border-l shadow p-4 space-y-4">
      <h2 className="text-lg font-bold">🛒 장바구니</h2>

      {items.length === 0 ? (
        <div className="text-gray-500">상품이 없습니다</div>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between items-center border p-2 rounded-lg">
              <div className="flex-1">
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-gray-500">
                  {item.price.toLocaleString()}원 × {item.quantity}
                </div>
              </div>

              <div className="flex items-center gap-1 ml-2">
                <button
                  className="btn btn-xs btn-outline btn-square"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>

                <span className="px-2 min-w-[1.5rem] text-center">{item.quantity}</span>

                <button
                  className="btn btn-xs btn-outline btn-square"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>

                <button
                  className="btn btn-xs btn-outline btn-square text-error ml-1"
                  onClick={() => onRemove(item.id)}
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="text-right font-bold text-xl mt-4">
        합계: {total.toLocaleString()}원
      </div>

      <div className="flex justify-between mt-4 gap-2">
        <button
          onClick={onClear}
          className="btn btn-warning flex-1"
          disabled={items.length === 0}
        >
          장바구니 비우기
        </button>

        <button
          onClick={onCheckout}
          className="btn btn-primary flex-1"
          disabled={items.length === 0}
        >
          결제하기
        </button>
      </div>
    </div>
  );
};
