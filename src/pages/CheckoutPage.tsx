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
  const methods = ["현금", "계좌이체", "페이"];

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">결제 선택</h2>
      <div className="mb-4 text-lg font-semibold">
        총 결제 금액: <span className="">{total.toLocaleString()}원</span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {methods.map((method) => (
          <button
            key={method}
            type="button"
            onClick={() => setSelectedMethod(method)}
            className={`btn h-20 text-lg ${selectedMethod === method ? "btn-primary" : "btn-outline"}`}
          >
            {method}
          </button>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <button className="btn btn-outline" onClick={onCancel}>
          취소
        </button>
        <button
          className="btn btn-primary"
          disabled={!selectedMethod}
          onClick={() => onPaymentComplete(selectedMethod)}
        >
          결제 완료
        </button>
      </div>
    </div>
  );
};
