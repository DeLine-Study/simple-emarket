import { Button, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { FilterByPrice } from "features/filter-by-price";
import { FilterByTitle } from "features/filter-by-title";
import { FC, Fragment, memo, useMemo, useState } from "react";
import { api } from "shared/api";
import { useGetData } from "shared/lib";
import { Loader } from "shared/ui";

export const ProductsFilters: FC = memo(() => {
  const [key, setKey] = useState(Math.random());
  const navigate = useNavigate();
  const handleClearFilters = async () => {
    await navigate({
      replace: true,
      search: {},
    });
    setKey(Math.random());
  };

  const filtersQuery = useMemo(() => api.getFilters(), []);

  const filters = useGetData(filtersQuery);

  return (
    <Paper component={Stack} gap={5} p={3}>
      <Typography variant="h4">Фильтры</Typography>
      <Loader loading={filters.isLoading}>
        <Fragment key={key}>
          <FilterByTitle />
          <FilterByPrice {...filters.data!} />
        </Fragment>
        <Button variant="contained" fullWidth onClick={handleClearFilters}>
          Сбросить
        </Button>
      </Loader>
    </Paper>
  );
});
