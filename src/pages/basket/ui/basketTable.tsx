import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Typography,
} from "@mui/material";
import { useBasketStore } from "entities/basket";
import { AddToBasket, AddToBasketProps } from "features/add-to-basket";
import { FC, memo } from "react";
import { Product } from "shared/api";
import { formatPrice } from "shared/lib";
import { RouterLink } from "shared/ui";

export interface BasketTableProps {
  products: Product[];
}

const Row: FC<Product> = ({ id, price, title, previewSrc }) => {
  const count = useBasketStore((state) => state.products.get(id) ?? 0);

  const handleDelete: AddToBasketProps["onDecrement"] = (count, e) => {
    if (count === 1 && !confirm("Удалить товар из корзины?"))
      e.preventDefault();
  };

  return (
    <TableRow>
      <TableCell align="center">
        <RouterLink
          to="/products/$productId"
          params={{
            productId: id,
          }}
        >
          <Stack direction="row" alignItems="center">
            <img
              src={previewSrc}
              style={{
                width: 50,
                height: 50,
                objectFit: "contain",
              }}
            />
            <Typography>{title}</Typography>
          </Stack>
        </RouterLink>
      </TableCell>
      <TableCell align="center">{formatPrice(price)}</TableCell>
      <TableCell align="center">
        <AddToBasket productId={id} onDecrement={handleDelete} />
      </TableCell>
      <TableCell align="center">{formatPrice(price * count)}</TableCell>
    </TableRow>
  );
};

export const BasketTable: FC<BasketTableProps> = memo(({ products }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Товар</TableCell>
            <TableCell align="center">Цена</TableCell>
            <TableCell align="center">Количество</TableCell>
            <TableCell align="center">Итог</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <Row key={product.id} {...product} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
