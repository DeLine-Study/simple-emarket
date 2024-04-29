import {
  Box,
  Slider,
  SliderProps,
  Stack,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { FC, useCallback, useRef, useState } from "react";
import { HomePageSearchParams } from "shared/api";

const validatePrice = (val: string | number | undefined) => {
  if (typeof val === "string" && val) return +val;
  if (typeof val === "number") return val;
};

type PriceRange = [number | undefined, number | undefined];

interface PriceControlsProps {
  priceRangeBorders: [number, number];
  onChange?: (value: PriceRange) => void;
  defaultPriceRange?: PriceRange;
}

const PriceControls: FC<PriceControlsProps> = ({
  priceRangeBorders,
  onChange,
  defaultPriceRange,
}) => {
  const [minPrice, setMinPrice] = useState<number | undefined>(
    defaultPriceRange?.[0]
  );
  const [maxPrice, setMaxPrice] = useState<number | undefined>(
    defaultPriceRange?.[1]
  );

  const [sliderValue, setSliderValue] = useState([
    minPrice ?? priceRangeBorders[0],
    maxPrice ?? priceRangeBorders[1],
  ]);

  const validateMinPrice = useCallback(
    (val: Parameters<typeof validatePrice>[0]) => {
      const validatedPrice = validatePrice(val);
      if (maxPrice !== undefined && validatedPrice) {
        return Math.min(validatedPrice, maxPrice);
      }

      return validatedPrice;
    },
    [maxPrice]
  );

  const validateMaxPrice = useCallback(
    (val: Parameters<typeof validatePrice>[0]) => {
      const validatedPrice = validatePrice(val);
      if (minPrice !== undefined && validatedPrice) {
        return Math.max(minPrice, validatedPrice);
      }

      return validatedPrice;
    },
    [minPrice]
  );

  const handleMinPriceChange: TextFieldProps["onChange"] = (e) => {
    const minPrice = validatePrice(e.currentTarget.value);
    setMinPrice(minPrice);
    onChange?.([validateMinPrice(e.currentTarget.value), maxPrice]);
  };

  const handleMaxPriceChange: TextFieldProps["onChange"] = (e) => {
    const maxPrice = validatePrice(e.currentTarget.value);
    setMaxPrice(maxPrice);
    onChange?.([minPrice, validateMaxPrice(e.currentTarget.value)]);
  };

  const handleMinPriceBlur: TextFieldProps["onBlur"] = (e) => {
    const minPrice = validateMinPrice(e.currentTarget.value);
    setSliderValue([
      minPrice ?? priceRangeBorders[0],
      maxPrice ?? priceRangeBorders[1],
    ]);
    setMinPrice(minPrice);
  };

  const handleMaxPriceBlur: TextFieldProps["onBlur"] = (e) => {
    const maxPrice = validateMaxPrice(e.currentTarget.value);
    setSliderValue([
      minPrice ?? priceRangeBorders[0],
      maxPrice ?? priceRangeBorders[1],
    ]);
    setMaxPrice(maxPrice);
  };

  const handleSliderChange: SliderProps["onChange"] = (_e, val) => {
    const value = val as [number, number];
    const minPrice = value[0] === priceRangeBorders[0] ? undefined : value[0];
    const maxPrice = value[1] === priceRangeBorders[1] ? undefined : value[1];

    setSliderValue(value);
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    onChange?.([minPrice, maxPrice]);
  };

  return (
    <Stack gap={3}>
      <Box px={1}>
        <Slider
          valueLabelDisplay="auto"
          value={sliderValue}
          min={priceRangeBorders[0]}
          max={priceRangeBorders[1]}
          onChange={handleSliderChange}
        />
      </Box>
      <Stack direction="row" gap={5}>
        <TextField
          label="Цена от"
          type="number"
          value={minPrice ?? ""}
          onChange={handleMinPriceChange}
          onBlur={handleMinPriceBlur}
        />
        <TextField
          label="Цена до"
          type="number"
          value={maxPrice ?? ""}
          onChange={handleMaxPriceChange}
          onBlur={handleMaxPriceBlur}
        />
      </Stack>
    </Stack>
  );
};

const priceRangeBorders: [number, number] = [0, 130_000];

export const FilterByPrice: FC = () => {
  const params: HomePageSearchParams = useSearch({
    strict: false,
  });

  const navigate = useNavigate();
  const ref = useRef<{ timeoutId?: number }>({});

  const handleChange = useCallback<NonNullable<PriceControlsProps["onChange"]>>(
    ([minPrice, maxPrice]) => {
      clearTimeout(ref.current.timeoutId);
      ref.current.timeoutId = setTimeout(() => {
        navigate({
          replace: true,
          search: (prev: HomePageSearchParams) => {
            const search: HomePageSearchParams = { ...prev };
            search.minPrice = minPrice;
            search.maxPrice = maxPrice;

            return search;
          },
        });
      }, 300);
    },
    [navigate]
  );

  return (
    <PriceControls
      priceRangeBorders={priceRangeBorders}
      onChange={handleChange}
      defaultPriceRange={[params.minPrice, params.maxPrice]}
    />
  );
};
