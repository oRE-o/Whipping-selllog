import { useFileLoader } from '../hooks/useFileLoader';

export const FileLoaderTest = () => {
  const { products, loadFile } = useFileLoader();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">파일 불러오기 테스트</h2>

      <input
        type="file"
        accept=".csv"
        onChange={e => {
          if (e.target.files?.[0]) {
            loadFile(e.target.files[0]);
          }
        }}
        className="mb-4"
      />

      {products.length === 0 && <p>상품 데이터가 없습니다.</p>}

      {products.length > 0 && (
        <ul className="space-y-2">
          {products.map(p => (
            <li key={p.id} className="border p-2 rounded shadow">
              <div><strong>{p.name}</strong> ({p.category})</div>
              <div>원가: {p.cost}원 | 판매가: {p.price}원</div>
              <div>{p.description}</div>
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-24 h-24 object-contain mt-2"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};