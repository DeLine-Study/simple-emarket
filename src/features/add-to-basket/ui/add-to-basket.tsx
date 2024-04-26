import { Button, IconButton, Stack, Typography } from "@mui/material";
import { FC } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useBasketStore } from "../../../store/basket.store";
import { Good } from "../../../types";

export interface AddToBasketProps {
  goodId: Good["id"];
}

export const AddToBasket: FC<AddToBasketProps> = ({ goodId }) => {
  const increaseBasketItemCount = useBasketStore(
    (state) => state.increaseBasketItemCount
  );
  const decreaseBasketItemCount = useBasketStore(
    (state) => state.decreaseBasketItemCount
  );
  const goodCount = useBasketStore((state) => state.goods.get(goodId));

  const increaseCount = () => increaseBasketItemCount(goodId);
  const decreaseCount = () => decreaseBasketItemCount(goodId);

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
