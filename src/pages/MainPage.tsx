import React, { useState, useEffect } from "react";

type MainPageProps = {
  products: any[];
  loadFile: (file: File) => void;
  onReady: () => void;
};

export const MainPage: React.FC<MainPageProps> = ({ products, loadFile, onReady }) => {
  const [logSource, setLogSource] = useState<"new" | "file" | "local">("new");
  const [salesLogFile, setSalesLogFile] = useState<File | null>(null);
  const [lastLocalTimestamp, setLastLocalTimestamp] = useState<string | null>(null);

  useEffect(() => {
    const ledger = localStorage.getItem("ledger");
    if (ledger) {
      const lines = ledger.trim().split("\n");
      if (lines.length > 1) {
        const lastLine = lines[lines.length - 1].split(",")[0];
        setLastLocalTimestamp(lastLine);
      }
    }
  }, []);

  const onProductFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      loadFile(e.target.files[0]);
    }
  };

  const onSalesLogFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSalesLogFile(e.target.files[0]);
      setLogSource("file");
    }
  };

  const handleConfirm = () => {
    if (products.length === 0) {
      alert("상품 파일을 먼저 업로드 해주세요!");
      return;
    }

    if (logSource === "file" && salesLogFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        localStorage.setItem("ledger", content);
        onReady();
      };
      reader.readAsText(salesLogFile);
    } else if (logSource === "local") {
      const content = localStorage.getItem("ledger");
      if (!content) {
        alert("브라우저 저장소에 장부 데이터가 없습니다.");
        return;
      }
      onReady();
    } else {
      const header = "구매일시,오더ID,상품,단가,수량,합계,결제수단";
      localStorage.setItem("ledger", header);
      onReady();
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-8">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body space-y-6">
          <h2 className="card-title text-3xl font-bold justify-center">WhippingKiosk</h2>
            <span className="label-text text-lg font-semibold self-center -mt-7 ">더 나은 부스 운영을 위한 새로운 아이디어</span>

        <a href="https://indigo-iodine-939.notion.site/WhippingKiosk-1ffb3ea8c2a78045a23cfa963c0886f4" className="self-center -mt-7 ">🐣처음 해 보신다면 여기를 눌러주세요🐣</a>

          {/* 상품 업로드 */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">📦 상품 CSV 파일 업로드</span>
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={onProductFileChange}
              className="file-input file-input-bordered w-full"
            />
          </div>

          {/* 판매 로그 업로드 */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">📄 기존 판매 로그 파일 (선택)</span>
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={onSalesLogFileChange}
              className="file-input file-input-bordered w-full"
            />
          </div>

          {/* 불러오기 옵션 */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">🗂️ 장부 불러오기 옵션</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="logSource"
                  className="radio checked:bg-primary"
                  checked={logSource === "new"}
                  onChange={() => setLogSource("new")}
                />
                <span>새로 시작하기</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="logSource"
                  className="radio checked:bg-primary"
                  checked={logSource === "file"}
                  disabled={!salesLogFile}
                  onChange={() => setLogSource("file")}
                />
                <span>장부 파일 불러오기</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="logSource"
                  className="radio checked:bg-primary"
                  checked={logSource === "local"}
                  onChange={() => setLogSource("local")}
                />
                <span>
                  이어서 진행하기 (브라우저에 임시 저장된 데이터 불러오기)
                  <br></br>
                  {lastLocalTimestamp && (
                    <span className="ml-1 text-sm text-gray-500">
                    (최근: {new Date(lastLocalTimestamp).toLocaleString()})
                    </span>
                  )}
                </span>
              </label>
            </div>
          </div>

          {/* 확인 버튼 */}
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary w-full sm:w-auto"
              onClick={handleConfirm}
            >
              부스 운영 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
