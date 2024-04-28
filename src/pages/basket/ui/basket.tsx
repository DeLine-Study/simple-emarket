import { Stack, Typography, Button, Paper } from "@mui/material";
import { FC, memo, useMemo } from "react";
import { api } from "shared/api";
import { useBasketStore } from "store/basket.store";
import { formatPrice } from "utils";
import { BasketTable } from "./basketTable";
import { Link } from "@tanstack/react-router";
import { PageLayout } from "widgets/page-layout";

export const BasketPage: FC = memo(() => {
  const basketGoods = useBasketStore((state) => state.goods);
  const clearBasket = useBasketStore((state) => state.clear);

  const basketGoodsIds = [...basketGoods.keys()];

  const goods = useMemo(
    () => api.getGoods({ ids: basketGoodsIds }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [basketGoodsIds.toString()]
  );

  const totalPrice = formatPrice(
    goods.reduce((acc, { price, id }) => acc + price * basketGoods.get(id)!, 0)
  );

  const handleOrder = () => {
    if (confirm(`Вы подтверждаете покупку на ${totalPrice}`)) {
      alert("Спасибо за покупку!");
      clearBasket();
    }
  };

  return (
    <PageLayout
      title="Корзина"
      sideSlot={
        goods.length && (
          <Paper component={Stack} p={2} gap={2}>
            <Typography textAlign="center">Итого: {totalPrice}</Typography>
            <Button variant="outlined" onClick={handleOrder}>
              Продолжить
            </Button>
          </Paper>
        )
      }
    >
      {goods.length ? (
        <BasketTable goods={goods} />
      ) : (
        <Paper
          component={Stack}
          p={2}
          justifyContent="center"
          height="100%"
          gap={2}
        >
          <Typography textAlign="center">Ваша козина пуста.</Typography>
          <Typography textAlign="center">
            Вернуться в <Link to="/">каталог</Link>
          </Typography>
        </Paper>
      )}
    </PageLayout>
  );
});
