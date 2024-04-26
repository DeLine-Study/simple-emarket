import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { FC } from "react";
import { formatPrice } from "../utils";
import { Good } from "../types";
import { AddToBasket } from "../features/add-to-basket";

export interface GoodCardProps extends Good {}

export const GoodCard: FC<GoodCardProps> = ({
  id,
  title,
  previewSrc,
  price,
}) => {
  return (
    <Card>
      <CardMedia
        sx={{ height: 140, backgroundSize: "contain" }}
        image={previewSrc}
        title={title}
      />
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>{title}</Typography>
          <Typography>{formatPrice(price)}</Typography>
        </Stack>
        <Box textAlign="center" mt={4}>
          <AddToBasket goodId={id} />
        </Box>
      </CardContent>
    </Card>
  );
};
