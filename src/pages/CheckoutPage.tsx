import React, { useState } from "react";
import type { CartItem } from "../hooks/useCart";

type Props = {
  items: CartItem[];
  onPaymentComplete: (paymentMethod: string) => void;
  onCancel: () => void;
};

export const CheckoutPage: React.FC<Props> = ({ items, onPaymentComplete, onCancel }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">결제 선택</h2>
      <div className="mb-4">총 결제 금액: {total.toLocaleString()}원</div>
      <div className="space-y-2">
        {["현금", "계좌이체", "페이"].map((method) => (
          <label key={method} className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment"
              value={method}
              checked={selectedMethod === method}
              onChange={() => setSelectedMethod(method)}
            />
            <span>{method}</span>
          </label>
        ))}
      </div>
      <div className="mt-6 space-x-2">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={onCancel}
        >
          취소
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          disabled={!selectedMethod}
          onClick={() => onPaymentComplete(selectedMethod)}
        >
          결제 완료
        </button>
      </div>
    </div>
  );
};
