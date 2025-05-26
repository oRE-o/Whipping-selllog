import { useState } from "react";
import { MainPage } from "./pages/MainPage";
import { KioskPage } from "./pages/KioskPage";
import { CheckoutModal } from "./components/CheckoutModal";
import { OrderSummaryPage } from "./pages/OrderSummaryPage"; // 모달처럼 바꿔도 됨
import { useFileLoader } from "./hooks/useFileLoader";
import type { CartItem } from "./hooks/useCart";

type Order = {
  id: string;
  date: string;
  items: CartItem[];
  paymentMethod: string;
  total: number;
};

export function App() {
  const { products, loadFile } = useFileLoader();

  const [page, setPage] = useState<"main" | "kiosk">("main");

  // 주문 내역 (로컬스토리지 불러오기)
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  // 장바구니에서 체크아웃 시 선택한 아이템들
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);

  // 주문 완료 후 보여줄 주문 데이터
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // 모달 표시 여부
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showOrderSummaryModal, setShowOrderSummaryModal] = useState(false);

  const handleStartKiosk = () => setPage("kiosk");

  const handleCheckout = (items: CartItem[]) => {
    setCheckoutItems(items);
    setShowCheckoutModal(true); // 모달 열기
  };

  const handlePaymentComplete = (paymentMethod: string) => {
    const total = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder: Order = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: checkoutItems,
      paymentMethod,
      total,
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    setCurrentOrder(newOrder);
    setShowCheckoutModal(false);
    setShowOrderSummaryModal(true); // 주문 요약 모달 열기
  };

  const handleOrderConfirm = () => {
    if (currentOrder) {
      const existing = localStorage.getItem("ledger") || "";
      const lines = currentOrder.items.map((item) => {
        return [
          currentOrder.date,
          currentOrder.id,
          item.name,
          item.price,
          item.quantity,
          item.price * item.quantity,
          currentOrder.paymentMethod,
        ].join(",");
      });

      const updated = [existing.trim(), ...lines].filter(Boolean).join("\n");
      localStorage.setItem("ledger", updated);
    }

    setCurrentOrder(null);
    setCheckoutItems([]);
    setShowOrderSummaryModal(false);
    setPage("kiosk");
  };

  return (
    <>
      {page === "main" && (
        <MainPage products={products} loadFile={loadFile} onReady={handleStartKiosk} />
      )}

      {page === "kiosk" && (
        <KioskPage
          products={products}
          onCheckout={handleCheckout} // 여기서 모달 열게 했어
        />
      )}

      {showCheckoutModal && (
        <CheckoutModal
          items={checkoutItems}
          onPaymentComplete={handlePaymentComplete}
          onClose={() => setShowCheckoutModal(false)}
        />
      )}

      {showOrderSummaryModal && currentOrder && (
        <OrderSummaryPage
          order={currentOrder}
          onConfirm={handleOrderConfirm}
          onCancel={handleOrderConfirm}
        />
      )}
    </>
  );
}
