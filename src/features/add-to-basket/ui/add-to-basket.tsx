import { Button, IconButton, Stack, Typography } from "@mui/material";
import { FC, MouseEventHandler } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Product } from "shared/api";
import { useBasketStore } from "entities/basket";

export interface AddToBasketProps {
  productId: Product["id"];
  onIncrement?: (count: number, ...args: Parameters<MouseEventHandler>) => void;
  onDecrement?: (count: number, ...args: Parameters<MouseEventHandler>) => void;
}

export const AddToBasket: FC<AddToBasketProps> = ({
  productId,
  onIncrement,
  onDecrement,
}) => {
  const increaseBasketItemCount = useBasketStore(
    (state) => state.increaseBasketItemCount
  );
  const decreaseBasketItemCount = useBasketStore(
    (state) => state.decreaseBasketItemCount
  );
  const productCount = useBasketStore(
    (state) => state.products.get(productId) ?? 0
  );

  const increaseCount: MouseEventHandler = (e) => {
    onIncrement?.(productCount, e);
    if (e.isDefaultPrevented()) return;
    increaseBasketItemCount(productId);
  };
  const decreaseCount: MouseEventHandler = (e) => {
    onDecrement?.(productCount, e);
    if (e.isDefaultPrevented()) return;
    decreaseBasketItemCount(productId);
  };

  if (productCount) {
    return (
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={4}
        sx={{ cursor: "default" }}
      >
        <IconButton onClick={increaseCount}>
          <AddIcon />
        </IconButton>
        <Typography>{productCount}</Typography>
        <IconButton onClick={decreaseCount}>
          <RemoveIcon />
        </IconButton>
      </Stack>
    );
  }

  return (
    <Button
      fullWidth
      variant="contained"
      onClick={increaseCount}
      sx={{
        height: 40,
      }}
    >
      В корзину
    </Button>
  );
};
