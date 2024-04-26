import { Grid } from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";
import { GoodCard } from "../../components/good-card";
import { api } from "../../shared/mock-api";

const goods = api.getGoods();

export const Route = createLazyFileRoute("/")({
  component: () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            {goods.map((item) => (
              <Grid item xs={4} key={item.id}>
                <GoodCard {...item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={4}>
          Filters
        </Grid>
      </Grid>
    );
  },
});
