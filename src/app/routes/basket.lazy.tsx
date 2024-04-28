import { createLazyFileRoute } from "@tanstack/react-router";
import { BasketPage } from "pages/basket/ui/basket";

export const Route = createLazyFileRoute("/basket")({
  component: BasketPage,
});
