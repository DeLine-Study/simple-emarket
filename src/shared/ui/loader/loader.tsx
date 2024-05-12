import { Box, CircularProgress, CircularProgressProps } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export interface LoaderProps extends PropsWithChildren, CircularProgressProps {
  loading?: boolean;
}

export const Loader: FC<LoaderProps> = ({ children, loading, ...props }) => {
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress {...props} />
      </Box>
    );
  }
  return children;
};
