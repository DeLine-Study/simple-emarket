import { Card, CardMedia, CardContent, Typography, Stack } from "@mui/material";
import { FC } from "react";
import { Good } from "shared/api";
import { ReactNode } from "@tanstack/react-router";
import { formatPrice } from "shared/lib";

export interface GoodCardProps extends Omit<Good, "id"> {
  actionSlot?: ReactNode;
}

export const GoodCard: FC<GoodCardProps> = ({
  title,
  previewSrc,
  price,
  actionSlot,
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
          mb={4}
        >
          <Typography>{title}</Typography>
          <Typography>{formatPrice(price)}</Typography>
        </Stack>
        {actionSlot}
      </CardContent>
    </Card>
  );
};
