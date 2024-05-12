import { Grid, Paper, Stack, Typography } from "@mui/material";
import { ProductRating } from "entities/product";
import { AddToBasket } from "features/add-to-basket";
import { FC, useMemo } from "react";
import { Product, api } from "shared/api";
import { formatPrice, useGetData } from "shared/lib";
import { Loader } from "shared/ui";
import { PageLayout } from "widgets/page-layout";

export interface ProductPageProps {
  productId: Product["id"];
}

export const ProductPage: FC<ProductPageProps> = ({ productId }) => {
  const productQuery = useMemo(
    () => api.getProductById(productId),
    [productId]
  );

  const product = useGetData(productQuery);

  return (
    <PageLayout
      title={product.data?.title}
      sideSlot={
        !product.isLoading && (
          <Paper
            sx={{
              p: 2,
            }}
          >
            <Stack gap={3} alignItems="center">
              <AddToBasket goodId={productId} />
              <ProductRating productId={productId} />
            </Stack>
          </Paper>
        )
      }
    >
      <Loader loading={product.isLoading}>
        <Grid container spacing={10} mb={2}>
          <Grid item xs={5}>
            <img
              src={product.data?.previewSrc}
              style={{
                width: "100%",
                objectFit: "contain",
              }}
            />
          </Grid>
          <Grid item xs={7}>
            <Typography variant="h5" mb={2}>
              {formatPrice(product.data?.price)}
            </Typography>
            <Stack gap={2}>
              {product.data?.specifications?.map(({ key, value }) => (
                <Typography variant="body1">
                  {key}: {value}
                </Typography>
              ))}
            </Stack>
          </Grid>
        </Grid>
        <Typography>{product.data?.description}</Typography>
      </Loader>
    </PageLayout>
  );
};
