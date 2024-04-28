import { FC, memo } from "react";
import { Grid } from "@mui/material";
import { GoodCard } from "components/good-card";
import { PageLayout } from "widgets/page-layout";
import { HomePageSearchParams, api } from "shared/api";
import { GoodsFilters } from "widgets/goods-filters";
import { useSearch } from "@tanstack/react-router";

export const HomePage: FC = memo(() => {
  const { title }: HomePageSearchParams = useSearch({
    strict: false,
  });

  const goods = api.getGoods({
    searchByTitle: title,
  });

  return (
    <PageLayout title="Товары" sideSlot={<GoodsFilters />}>
      <Grid container spacing={2}>
        {goods.map((item) => (
          <Grid item xs={4} key={item.id}>
            <GoodCard {...item} />
          </Grid>
        ))}
      </Grid>
    </PageLayout>
  );
});
