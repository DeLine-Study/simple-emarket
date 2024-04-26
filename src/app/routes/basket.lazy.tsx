import { Button, Grid, Stack, Typography } from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";
import { GoodCard } from "../../components/good-card";
import { api } from "../../shared/mock-api";
import { useBasketStore } from "../../store/basket.store";
import { useMemo } from "react";
import { formatPrice } from "../../utils";

export const Route = createLazyFileRoute("/basket")({
  component: () => {
    const basketGoods = useBasketStore((state) => state.goods);

    const goods = useMemo(
      () => api.getGoods({ ids: [...basketGoods.keys()] }),
      [basketGoods]
    );

    const totalPrice = useMemo(
      () =>
        formatPrice(
          goods.reduce(
            (acc, { price, id }) => acc + price * basketGoods.get(id)!,
            0
          )
        ),
      [basketGoods, goods]
    );

    return (
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            {goods.map((item) => (
              <Grid item xs={4} key={item.id}>
                <GoodCard {...item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Stack>
            <Typography textAlign="center">Итого: {totalPrice}</Typography>
            <Button
              onClick={() => {
                if (confirm(`Вы подтверждаете покупку на ${totalPrice}`)) {
                  alert("Спасибо за покупку!");
                }
              }}
            >
              Продолжить
            </Button>
          </Stack>
        </Grid>
      </Grid>
    );
  },
});
