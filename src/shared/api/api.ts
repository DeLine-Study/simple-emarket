import { Good } from "./contracts";

interface GetGoodsFilters {
  ids?: Good["id"][];
  searchByTitle?: string;
  minPrice?: Good["price"];
  maxPrice?: Good["price"];
}

export const getGoods = (filters?: GetGoodsFilters): Good[] =>
  Array(6)
    .fill(null)
    .map((_, idx) => ({
      previewSrc:
        "https://s3-alpha-sig.figma.com/img/0cc1/5929/c6fdfca4df3c30fbbb110a5a30dbb0ab?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hMbRAI3OcYbPUwsDj1sb5mnJMSVKzxw3CJG1p7RlrhGud2FYLHCCix23Ydpo7Op0RCyX8u3sd42tYOg~IqPHOCLZDbqhLS5ZW2S9lucy3iFvhtvYvdzFv~yI1gz3frtozMnkMm3YJ5KvW~upfI3FX9AMt-Y1dTP6Qee-4hViFZHqfvuz9Wrd7BK-U1oJNmnlev5P3LXGhzzv885hkLrxwkIRg~1P4f8l4fgJIuQqQeiqb2LVnoMatjLAt2xUpCWvCmkvrQc5bCg91-9rEHejdve1LXSzTnDUmehcy0dvbUcAY6wtHYR8vEitChvhTMJ2ufNbPGlIzg-giyCx2XQBig__",
      title: `iPhone ${idx}`,
      price: 26_000 * idx,
      id: idx,
    }))
    .filter(({ id, title, price }) => {
      let filterRes: boolean | null = null;
      if (filters?.ids) filterRes = filters.ids.includes(id);

      if (filters?.searchByTitle) {
        filterRes = title
          .toLocaleLowerCase()
          .includes(filters.searchByTitle.toLocaleLowerCase());
      }

      if (filters?.maxPrice) filterRes = filters.maxPrice <= price;
      if (filters?.minPrice) filterRes = filters.minPrice >= price;

      return filterRes === null ? true : filterRes;
    });
