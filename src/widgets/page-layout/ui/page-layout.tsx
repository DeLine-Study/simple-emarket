import { Grid, Typography } from "@mui/material";
import { FC, PropsWithChildren, ReactNode } from "react";

export interface PageLayoutProps extends PropsWithChildren {
  title?: ReactNode;
  sideSlot?: ReactNode;
}

export const PageLayout: FC<PageLayoutProps> = ({
  sideSlot,
  children,
  title,
}) => {
  const renderBody = () => {
    if (sideSlot) {
      return (
        <Grid container spacing={2}>
          <Grid item xs={8}>
            {children}
          </Grid>
          <Grid item xs={4}>
            {sideSlot}
          </Grid>
        </Grid>
      );
    }

    return children;
  };

  return (
    <>
      {title && (
        <Typography variant="h2" mb={3}>
          {title}
        </Typography>
      )}
      {renderBody()}
    </>
  );
};
