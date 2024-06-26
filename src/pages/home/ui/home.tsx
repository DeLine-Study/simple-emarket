import { Box, Grid, Typography } from "@mui/material";
import { useSearch } from "@tanstack/react-router";
import { ProductCard } from "entities/product";
import { AddToBasket } from "features/add-to-basket";
import { FC, memo, useMemo } from "react";
import { HomePageSearchParams } from "shared/types";
import { useGetData } from "shared/lib";
import { Loader, RouterLink } from "shared/ui";
import { ProductsFilters } from "widgets/products-filters";
import { PageLayout } from "widgets/page-layout";
import { api } from "shared/api";

export const HomePage: FC = memo(() => {
  const { title, maxPrice, minPrice }: HomePageSearchParams = useSearch({
    strict: false,
  });

  const productsQuery = useMemo(
    () =>
      api.getProducts({
        searchByTitle: title,
        minPrice,
        maxPrice,
      }),
    [maxPrice, minPrice, title]
  );

  const products = useGetData(productsQuery);

  return (
    <PageLayout title="Товары" sideSlot={<ProductsFilters />}>
      <Loader loading={products.isLoading} size={60}>
        {products.data?.length ? (
          <Grid container spacing={2}>
            {products.data.map(({ id, ...item }) => (
              <Grid item xs={4} key={id}>
                <RouterLink
                  to="/products/$productId"
                  params={{
                    productId: id,
                  }}
                >
                  <ProductCard
                    {...item}
                    actionSlot={
                      <Box
                        textAlign="center"
                        onClick={(e) => e.preventDefault()}
                      >
                        <AddToBasket productId={id} />
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
      </Loader>
    </PageLayout>
  );
});
