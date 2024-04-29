import { TextField, TextFieldProps } from "@mui/material";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { FC, useEffect, useState } from "react";
import { HomePageSearchParams } from "shared/api";
import { useDebounce } from "shared/lib";

export const FilterByTitle: FC = () => {
  const params: HomePageSearchParams = useSearch({
    strict: false,
  });
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(params.title ?? "");
  const debouncedSearch = useDebounce(searchValue);

  useEffect(() => {
    navigate({
      replace: true,
      search: (prev) => ({ ...prev, title: debouncedSearch || undefined }),
    });
  }, [debouncedSearch, navigate]);

  const handleChange: TextFieldProps["onChange"] = ({ currentTarget }) => {
    setSearchValue(currentTarget.value);
  };

  return (
    <TextField
      label="Поиск по названию"
      value={searchValue}
      onChange={handleChange}
    />
  );
};
