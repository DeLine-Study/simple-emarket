import { Product } from "./contracts";
import { Api, GetProductsFilters } from "./types";

const delay = (ms: number = 300) => new Promise((res) => setTimeout(res, ms));

export class MockApi implements Api {
  private readonly data: Product[];
  constructor() {
    this.data = Array(6)
      .fill(null)
      .map((_, idx) => ({
        previewSrc: `${import.meta.env.BASE_URL}/iphone-photo.png`,
        title: `iPhone ${idx}`,
        price: 26_000 * (idx + 1),
        id: idx,
        specifications: [
          { key: "Цвет", value: "красивый" },
          { key: "Звук", value: "хороший" },
          { key: "Камера", value: `хорошая, ${idx}мп` },
          { key: "Bluetooth", value: "нет" },
          { key: "ОС", value: `ios ${idx}` },
        ],
        description:
          "Смартфон хороший, продаю потому что слишком много собрали таких.",
      }));
  }

  async getProducts(filters?: GetProductsFilters) {
    await delay(900);
    return this.data.filter(({ id, title, price }) => {
      const filterRes: boolean[] = [];
      if (filters?.ids) {
        filterRes.push(filters.ids.includes(id));
      }

      if (filters?.searchByTitle) {
        filterRes.push(
          title
            .toLocaleLowerCase()
            .includes(filters.searchByTitle.toLocaleLowerCase())
        );
      }

      if (filters?.maxPrice !== undefined) {
        filterRes.push(price <= filters.maxPrice);
      }
      if (filters?.minPrice !== undefined) {
        filterRes.push(price >= filters.minPrice);
      }

      if (filterRes.length < 1) return true;

      return filterRes.every((val) => val);
    });
  }

  async getFilters() {
    await delay(500);
    return {
      minPrice: this.data.reduce(
        (acc, cur) => Math.min(acc, cur.price),
        this.data[0].price
      ),
      maxPrice: this.data.reduce(
        (acc, cur) => Math.max(acc, cur.price),
        this.data[0].price
      ),
    };
  }

  async getProductById(id: Product["id"]) {
    await delay(500);
    return this.data.find((it) => it.id === id);
  }
}
