import React, { useEffect, useRef } from "react";
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

export const OrderSummaryModal: React.FC<Props> = ({ order, onConfirm, onCancel }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
    // 모달이 닫히면 onCancel 호출하게 이벤트 연결
    const dialog = dialogRef.current;
    const handleCancel = (e: Event) => {
      e.preventDefault(); // 기본 취소 동작 막기
      onCancel();
    };
    dialog?.addEventListener("cancel", handleCancel);
    return () => dialog?.removeEventListener("cancel", handleCancel);
  }, [onCancel]);

  return (
    <dialog ref={dialogRef} className="modal">
      <form method="dialog" className="modal-box max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">🧾 주문 내역</h2>

        <div className="space-y-1 mb-4 text-sm text-gray-600">
          <div><span className="font-semibold">주문 ID:</span> {order.id}</div>
          <div><span className="font-semibold">주문 일시:</span> {new Date(order.date).toLocaleString()}</div>
          <div><span className="font-semibold">결제 수단:</span> {order.paymentMethod}</div>
        </div>

        <div className="divider">상품 목록</div>

        <ul className="space-y-2 mb-4">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between items-center border-b py-2">
              <div>{item.name} × {item.quantity}</div>
              <div className="text-right font-medium text-base">{(item.price * item.quantity).toLocaleString()}원</div>
            </li>
          ))}
        </ul>

        <div className="text-right text-lg font-bold mb-4">
          총 합계: {order.total.toLocaleString()}원
        </div>

        <div className="modal-action">
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            취소
          </button>
          <button type="button" className="btn btn-primary" onClick={onConfirm}>
            확인
          </button>
        </div>
      </form>
    </dialog>
  );
};
