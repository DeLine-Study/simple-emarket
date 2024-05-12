import { Stack, Typography, Button, Paper } from "@mui/material";
import { FC, memo, useMemo } from "react";
import { api } from "shared/api";
import { BasketTable } from "./basketTable";
import { Link, useNavigate } from "@tanstack/react-router";
import { PageLayout } from "widgets/page-layout";
import { formatPrice, useGetData } from "shared/lib";
import { useBasketStore } from "entities/basket";
import { Loader } from "shared/ui";

export const BasketPage: FC = memo(() => {
  const basketGoods = useBasketStore((state) => state.goods);
  const clearBasket = useBasketStore((state) => state.clear);
  const navigate = useNavigate();

  const basketGoodsIds = [...basketGoods.keys()];

  const goodsQuery = useMemo(
    () => api.getProducts({ ids: basketGoodsIds }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [basketGoodsIds.toString()]
  );

  const goods = useGetData(goodsQuery);

  const totalPrice =
    goods.data &&
    formatPrice(
      goods.data.reduce(
        (acc, { price, id }) => acc + price * basketGoods.get(id)!,
        0
      )
    );

  const handleOrder = () => {
    if (confirm(`Вы подтверждаете покупку на ${totalPrice}`)) {
      alert("Спасибо за покупку!");
      clearBasket();
      navigate({
        to: "/",
      });
    }
  };

  return (
    <PageLayout
      title="Корзина"
      sideSlot={
        goods.data?.length && (
          <Paper component={Stack} p={2} gap={2}>
            <Typography textAlign="center">Итого: {totalPrice}</Typography>
            <Button variant="outlined" onClick={handleOrder}>
              Продолжить
            </Button>
          </Paper>
        )
      }
    >
      <Loader loading={goods.isLoading}>
        {goods.data?.length ? (
          <BasketTable goods={goods.data} />
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
      </Loader>
    </PageLayout>
  );
});
