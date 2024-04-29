import { Button, Paper, Stack } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { FilterByPrice } from "features/filter-by-price";
import { FilterByTitle } from "features/filter-by-title";
import { FC, Fragment, memo, useState } from "react";

export const GoodsFilters: FC = memo(() => {
  const [key, setKey] = useState(Math.random());
  const navigate = useNavigate();
  const handleClearFilters = async () => {
    await navigate({
      replace: true,
      search: {},
    });
    setKey(Math.random());
  };

  return (
    <Paper component={Stack} gap={5} p={3}>
      <Fragment key={key}>
        <FilterByTitle />
        <FilterByPrice />
      </Fragment>
      <Button variant="contained" fullWidth onClick={handleClearFilters}>
        Сбросить
      </Button>
    </Paper>
  );
});
