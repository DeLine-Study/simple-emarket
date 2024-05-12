import { Badge, IconButton } from "@mui/material";
import { FC } from "react";
import { useBasketStore } from "../model/basket.store";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

export const BasketCounter: FC = () => {
  const basketGoodsCount = useBasketStore((state) => state.goods.size);

  return (
    <Badge badgeContent={basketGoodsCount} color="error">
      <IconButton sx={{ color: "#fff" }}>
        <ShoppingBasketIcon />
      </IconButton>
    </Badge>
  );
};
