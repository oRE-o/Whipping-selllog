// src/components/CheckoutModal.tsx
import React, { useState } from "react";
import type { CartItem } from "../hooks/useCart";

type Props = {
  items: CartItem[];
  onPaymentComplete: (method: string) => void;
  onClose: () => void;
};

export const CheckoutModal: React.FC<Props> = ({ items, onPaymentComplete, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const methods = ["현금", "계좌이체", "페이"];

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-md">
        <h3 className="font-bold text-xl mb-4">💳 결제 수단 선택</h3>
        <p className="mb-4 text-lg">
          총 결제 금액: <span className="text-primary">{total.toLocaleString()}원</span>
        </p>

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

        <div className="modal-action">
          <button className="btn btn-outline" onClick={onClose}>
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
    </dialog>
  );
};
