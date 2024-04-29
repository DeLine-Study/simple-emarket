export const formatPrice = (price: number) =>
  price.toLocaleString("ru-ru", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  });
