import { Badge, IconButton } from "@mui/material";
import { FC } from "react";
import { useBasketStore } from "../model/basket.store";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

export const BasketCounter: FC = () => {
  const basketProductsCount = useBasketStore((state) => state.products.size);

  return (
    <Badge badgeContent={basketProductsCount} color="error">
      <IconButton sx={{ color: "#fff" }}>
        <ShoppingBasketIcon />
      </IconButton>
    </Badge>
  );
};
