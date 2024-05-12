import { Product } from "./contracts";

export interface GetProductsFilters {
  ids?: Product["id"][];
  searchByTitle?: string;
  minPrice?: Product["price"];
  maxPrice?: Product["price"];
}

export interface Api {
  getProducts(filters: GetProductsFilters): Promise<Product[]>;
  getFilters(): Promise<{
    minPrice: number;
    maxPrice: number;
  }>;
  getProductById(id: Product["id"]): Promise<Product | undefined>;
}
