import React from "react";

type Props = {
  onClose: () => void;
};

export const SettingsModal: React.FC<Props> = ({ onClose }) => {
  const handleDownload = () => {
  const data = localStorage.getItem("ledger") || "";
  const header = "구매일시,오더 ID,상품,단가,수량,합계,결제수단\n";
  const csvContent = header + data;

  // UTF-8 with BOM
  const BOM = "\uFEFF"; // 이게 핵심임!!

  const blob = new Blob([BOM + csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `ledger-${Date.now()}.csv`);
  link.click();
  URL.revokeObjectURL(url);
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-sm w-full">
        <h3 className="text-lg font-bold mb-4">설정</h3>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          CSV 다운로드
        </button>
        <button
          onClick={onClose}
          className="ml-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          닫기
        </button>
      </div>
    </div>
  );
};
