import React from "react";

type Props = {
  onClose: () => void;
};

export const SettingsModal: React.FC<Props> = ({ onClose }) => {
  const handleDownload = () => {
  const data = localStorage.getItem("ledger") || "";
  const BOM = "\uFEFF";
  const lines = data.trim().split("\n");

  // 합계 수식 줄 추가
  const totalFormulaLine = [ '', '', '', '', '총 판매액', `=SUM(F2:F${lines.length})`, '' ].join(",");

  const csvWithTotal = [...lines, totalFormulaLine].join("\n");
  const blob = new Blob([BOM + csvWithTotal], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `ledger-${Date.now()}.csv`);
  link.click();

  URL.revokeObjectURL(url);
};


  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md">
        <h3 className="font-bold text-lg mb-4 text-center">설정</h3>

        <div className="flex flex-col gap-4">
          <button
            className="btn btn-success btn-block"
            onClick={handleDownload}
          >
            CSV 다운로드
          </button>

          <button
            className="btn btn-outline btn-block"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
