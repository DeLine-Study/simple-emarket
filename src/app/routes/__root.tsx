import {
  AppBar,
  Badge,
  Container,
  CssBaseline,
  IconButton,
  Stack,
} from "@mui/material";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { FC, memo } from "react";
import { useBasketStore } from "../../store/basket.store";

const BasketButton: FC = () => {
  const basketGoodsCount = useBasketStore((state) => state.goods.size);

  return (
    <Badge badgeContent={basketGoodsCount} color="error">
      <IconButton sx={{ color: "#fff" }}>
        <ShoppingBasketIcon />
      </IconButton>
    </Badge>
  );
};

const Component = () => (
  <>
    <CssBaseline />
    <AppBar position="static" sx={{ py: 2 }}>
      <Container>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link to="/">
            <img
              src="/logo.png"
              style={{
                height: 50,
              }}
            />
          </Link>
          <Link to="/basket">
            <BasketButton />
          </Link>
        </Stack>
      </Container>
    </AppBar>
    <Container sx={{ py: 2 }}>
      <Outlet />
    </Container>
  </>
);

export const Route = createRootRoute({
  component: memo(Component),
});
