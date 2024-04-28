import { Button, IconButton, Stack, Typography } from "@mui/material";
import { FC, MouseEventHandler } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Good } from "shared/api";
import { useBasketStore } from "store/basket.store";

export interface AddToBasketProps {
  goodId: Good["id"];
  onIncrement?: (count: number, ...args: Parameters<MouseEventHandler>) => void;
  onDecrement?: (count: number, ...args: Parameters<MouseEventHandler>) => void;
}

export const AddToBasket: FC<AddToBasketProps> = ({
  goodId,
  onIncrement,
  onDecrement,
}) => {
  const increaseBasketItemCount = useBasketStore(
    (state) => state.increaseBasketItemCount
  );
  const decreaseBasketItemCount = useBasketStore(
    (state) => state.decreaseBasketItemCount
  );
  const goodCount = useBasketStore((state) => state.goods.get(goodId) ?? 0);

  const increaseCount: MouseEventHandler = (e) => {
    onIncrement?.(goodCount, e);
    if (e.isDefaultPrevented()) return;
    increaseBasketItemCount(goodId);
  };
  const decreaseCount: MouseEventHandler = (e) => {
    onDecrement?.(goodCount, e);
    if (e.isDefaultPrevented()) return;
    decreaseBasketItemCount(goodId);
  };

  if (goodCount) {
    return (
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={4}
      >
        <IconButton onClick={increaseCount}>
          <AddIcon />
        </IconButton>
        <Typography>{goodCount}</Typography>
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
