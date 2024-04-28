import { Paper, Slider, Stack, TextField } from "@mui/material";
import { FilterByTitle } from "features/filter-by-title";
import { FC, memo } from "react";

export const GoodsFilters: FC = memo(() => {
  return (
    <Paper component={Stack} gap={10} p={3}>
      <FilterByTitle />
      <Slider value={[0, 100]} min={0} max={100_000_000} />
      <Stack direction="row" gap={5}>
        <TextField label="Цена от" />
        <TextField label="Цена до" />
      </Stack>
    </Paper>
  );
});
