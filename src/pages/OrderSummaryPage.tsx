import React from "react";
import type { CartItem } from "../hooks/useCart";

type Order = {
  id: string;
  date: string;
  items: CartItem[];
  paymentMethod: string;
  total: number;
};

type Props = {
  order: Order;
  onConfirm: () => void;
  onCancel: () => void;
};

export const OrderSummaryPage: React.FC<Props> = ({ order, onConfirm, onCancel }) => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">주문 내역</h2>
      <div>주문 ID: {order.id}</div>
      <div>주문 일시: {new Date(order.date).toLocaleString()}</div>
      <div>결제 수단: {order.paymentMethod}</div>
      <ul className="mt-4 space-y-2">
        {order.items.map((item) => (
          <li key={item.id} className="flex justify-between">
            <div>{item.name} × {item.quantity}</div>
            <div>{(item.price * item.quantity).toLocaleString()}원</div>
          </li>
        ))}
      </ul>
      <div className="text-right font-bold mt-4">
        총 합계: {order.total.toLocaleString()}원
      </div>
      <div className="mt-6 space-x-2">
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel}>
          취소
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={onConfirm}>
          확인
        </button>
      </div>
    </div>
  );
};
