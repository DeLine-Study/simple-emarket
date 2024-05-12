import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "pages/product";
import { FC } from "react";

const Component: FC = () => {
  const params = Route.useParams();

  return <ProductPage productId={params.productId} />;
};

export const Route = createFileRoute("/products/$productId")({
  component: Component,
  parseParams: (rawParams) => {
    return {
      productId: +rawParams.productId,
    };
  },
});
