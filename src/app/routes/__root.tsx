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

export const Route = createRootRoute({
  component: () => (
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
            <div>Logo</div>
            <Link to="/basket">
              <Badge badgeContent={0} color="error">
                <IconButton sx={{ color: "#fff" }}>
                  <ShoppingBasketIcon />
                </IconButton>
              </Badge>
            </Link>
          </Stack>
        </Container>
      </AppBar>
      <Container sx={{ py: 2 }}>
        <Outlet />
      </Container>
    </>
  ),
});
