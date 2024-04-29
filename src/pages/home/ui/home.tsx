import { Box, Grid, Typography } from "@mui/material";
import { useSearch } from "@tanstack/react-router";
import { GoodCard } from "entities/good";
import { AddToBasket } from "features/add-to-basket";
import { FC, memo } from "react";
import { HomePageSearchParams, api } from "shared/api";
import { RouterLink } from "shared/ui";
import { GoodsFilters } from "widgets/goods-filters";
import { PageLayout } from "widgets/page-layout";

export const HomePage: FC = memo(() => {
  const { title, maxPrice, minPrice }: HomePageSearchParams = useSearch({
    strict: false,
  });

  const goods = api.getGoods({
    searchByTitle: title,
    minPrice,
    maxPrice,
  });

  return (
    <PageLayout title="Товары" sideSlot={<GoodsFilters />}>
      {goods.length ? (
        <Grid container spacing={2}>
          {goods.map(({ id, ...item }) => (
            <Grid item xs={4} key={id}>
              <RouterLink to="/basket">
                <GoodCard
                  {...item}
                  actionSlot={
                    <Box textAlign="center" onClick={(e) => e.preventDefault()}>
                      <AddToBasket goodId={id} />
                    </Box>
                  }
                />
              </RouterLink>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography textAlign="center" variant="h6">
          Нет подходящих товаров
        </Typography>
      )}
    </PageLayout>
  );
});
