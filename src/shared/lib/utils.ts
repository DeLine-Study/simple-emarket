export const formatPrice = (price: number | undefined) =>
  price?.toLocaleString("ru-ru", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  });
