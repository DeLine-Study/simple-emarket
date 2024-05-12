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
import { formatPrice } from "shared/lib";
import { HomePageSearchParams } from "shared/types";

const transformPrice = (val: string | number | undefined) => {
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

  const validatePrice = useCallback(
    (price: number | undefined) => {
      if (price) {
        price = Math.max(price, priceRangeBorders[0]);
        price = Math.min(price, priceRangeBorders[1]);
      }

      return price;
    },
    [priceRangeBorders]
  );

  const validateMinPrice = useCallback(
    (val: Parameters<typeof transformPrice>[0]) => {
      const validatedPrice = validatePrice(transformPrice(val));
      if (maxPrice !== undefined && validatedPrice) {
        return Math.min(validatedPrice, maxPrice);
      }

      return validatedPrice;
    },
    [maxPrice, validatePrice]
  );

  const validateMaxPrice = useCallback(
    (val: Parameters<typeof transformPrice>[0]) => {
      const validatedPrice = validatePrice(transformPrice(val));
      if (minPrice !== undefined && validatedPrice) {
        return Math.max(minPrice, validatedPrice);
      }

      return validatedPrice;
    },
    [minPrice, validatePrice]
  );

  const handleMinPriceChange: TextFieldProps["onChange"] = (e) => {
    const minPrice = transformPrice(e.currentTarget.value);
    setMinPrice(minPrice);
    onChange?.([validateMinPrice(e.currentTarget.value), maxPrice]);
  };

  const handleMaxPriceChange: TextFieldProps["onChange"] = (e) => {
    const maxPrice = transformPrice(e.currentTarget.value);
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
    setMaxPrice(maxPrice && Math.min(maxPrice, priceRangeBorders[1]));
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
          placeholder={formatPrice(priceRangeBorders[0])}
          type="number"
          value={minPrice ?? ""}
          onChange={handleMinPriceChange}
          onBlur={handleMinPriceBlur}
        />
        <TextField
          label="Цена до"
          placeholder={formatPrice(priceRangeBorders[1])}
          type="number"
          value={maxPrice ?? ""}
          onChange={handleMaxPriceChange}
          onBlur={handleMaxPriceBlur}
        />
      </Stack>
    </Stack>
  );
};

export interface FilterByPriceProps {
  minPrice: number;
  maxPrice: number;
}

export const FilterByPrice: FC<FilterByPriceProps> = ({
  maxPrice,
  minPrice,
}) => {
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
      priceRangeBorders={[minPrice, maxPrice]}
      onChange={handleChange}
      defaultPriceRange={[params.minPrice, params.maxPrice]}
    />
  );
};
