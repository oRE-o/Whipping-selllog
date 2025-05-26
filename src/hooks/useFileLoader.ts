import { useState } from "react";

export interface Product {
  id: string;
  category: string;
  cost: number;
  price: number;
  description: string;
  imageUrl: string;
  name: string;
}

export const useFileLoader = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const parseCSV = (text: string) => {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim()); // 헤더 한글 그대로

    const data = lines.slice(1).map(line => {
      const values = line.split(',');
      const entry: any = {};
      headers.forEach((header, i) => {
        entry[header] = values[i] ? values[i].trim() : '';
      });
      return entry;
    });

    const parsedProducts: Product[] = data.map((item, idx) => ({
      id: `${idx}`, // 임시 id, 나중에 uuid 추천
      category: item['category'] || '',
      cost: Number(item['cost']) || 0,
      price: Number(item['price']) || 0,
      description: item['description'] || '',
      imageUrl: item['imageUrl'] || '',
      name: item['name'] || '',
    }));

    setProducts(parsedProducts);
  };

  const loadFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        parseCSV(text);
      }
    };
    reader.readAsText(file);
  };

  return { products, loadFile };
};
