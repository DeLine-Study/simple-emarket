import { AppBar, Container, CssBaseline, Stack } from "@mui/material";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { BasketCounter } from "entities/basket";
import { memo } from "react";
import logoSrc from "shared/assets/logo.png";

export const Route = createRootRoute({
  component: memo(() => (
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
                src={logoSrc}
                style={{
                  height: 50,
                }}
              />
            </Link>
            <Link to="/basket">
              <BasketCounter />
            </Link>
          </Stack>
        </Container>
      </AppBar>
      <Container sx={{ py: 2 }}>
        <Outlet />
      </Container>
    </>
  )),
});
