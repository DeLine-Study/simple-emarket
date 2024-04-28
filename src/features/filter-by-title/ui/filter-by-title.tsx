import { TextField, TextFieldProps } from "@mui/material";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { FC } from "react";
import { HomePageSearchParams } from "shared/api";

export const FilterByTitle: FC = () => {
  const navigate = useNavigate();

  const params: HomePageSearchParams = useSearch({
    strict: false,
  });

  const handleChange: TextFieldProps["onChange"] = ({ currentTarget }) => {
    navigate({
      search: (prev) => ({ ...prev, title: currentTarget.value || undefined }),
    });
  };

  return (
    <TextField
      label="Поиск по названию"
      value={params.title ?? ""}
      onChange={handleChange}
    />
  );
};
