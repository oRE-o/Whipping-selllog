import React, { useState } from "react";

type MainPageProps = {
  products: any[];
  loadFile: (file: File) => void;
  onReady: () => void;
};

export const MainPage: React.FC<MainPageProps> = ({ products, loadFile, onReady }) => {
  const [useNewLog, setUseNewLog] = useState(true);
  const [salesLogFile, setSalesLogFile] = useState<File | null>(null);

  const onProductFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      loadFile(e.target.files[0]);
    }
  };

  const onSalesLogFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSalesLogFile(e.target.files[0]);
      setUseNewLog(false);
    }
  };

  const handleConfirm = () => {
    if (products.length === 0) {
      alert("상품 파일을 먼저 업로드 해주세요!");
      return;
    }
    onReady();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">굿즈샵 판매장부</h1>

      <div>
        <label className="block mb-1 font-semibold">상품 CSV 파일 업로드</label>
        <input type="file" accept=".csv" onChange={onProductFileChange} />
      </div>

      <div className="mt-4">
        <label className="block mb-1 font-semibold">기존 판매 로그 파일 (선택)</label>
        <input
          type="file"
          accept=".csv"
          onChange={onSalesLogFileChange}
          disabled={useNewLog}
        />
      </div>

      <div className="mt-4">
        <label className="inline-flex items-center space-x-2">
          <input
            type="radio"
            checked={useNewLog}
            onChange={() => setUseNewLog(true)}
          />
          <span>새로 시작하기</span>
        </label>
        <label className="inline-flex items-center space-x-2 ml-6">
          <input
            type="radio"
            checked={!useNewLog}
            onChange={() => setUseNewLog(false)}
            disabled={!salesLogFile}
          />
          <span>기존 장부 불러오기</span>
        </label>
      </div>

      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleConfirm}
      >
        확인
      </button>
    </div>
  );
};
