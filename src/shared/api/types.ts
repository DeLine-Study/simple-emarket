import { Product } from "./contracts";

export interface GetGoodsFilters {
  ids?: Product["id"][];
  searchByTitle?: string;
  minPrice?: Product["price"];
  maxPrice?: Product["price"];
}

export interface Api {
  getProducts(filters: GetGoodsFilters): Promise<Product[]>;
  getFilters(): Promise<{
    minPrice: number;
    maxPrice: number;
  }>;
  getProductById(id: Product["id"]): Promise<Product | undefined>;
}
