export interface Product {
  id: number;
  title: string;
  price: number;
  previewSrc?: string;
  specifications?: { key: string; value: string }[];
  description?: string;
}
