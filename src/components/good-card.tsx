import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Button,
  Box,
} from "@mui/material";
import { FC } from "react";
import { formatPrice } from "../utils";

export interface GoodCardProps {
  title: string;
  previewSrc?: string;
  price: number;
}

export const GoodCard: FC<GoodCardProps> = ({ title, previewSrc, price }) => {
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
          <Button variant="contained">В корзину</Button>
        </Box>
      </CardContent>
    </Card>
  );
};
