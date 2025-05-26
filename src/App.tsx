import React, { useState } from "react";
import { MainPage } from "./pages/MainPage";
import { KioskPage } from "./pages/KioskPage";
import { useFileLoader } from "./hooks/useFileLoader";

export function App() {
  const { products, loadFile } = useFileLoader();
  const [page, setPage] = useState<"main" | "kiosk">("main");

  return (
    <>
      {page === "main" && (
        <MainPage
          products={products}
          loadFile={loadFile}
          onReady={() => setPage("kiosk")}
        />
      )}
      {page === "kiosk" && <KioskPage products={products} />}
    </>
  );
}
