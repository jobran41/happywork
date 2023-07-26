import * as React from "react";
import Typography from "@mui/material/Typography";
import { titleProps } from "shared/models";

export default function Title({ children, hr = true, ...rest }: titleProps) {
  return (
    <Typography
      component="h2"
      variant="h6"
      color="primary"
      {...rest}
      gutterBottom
    >
      {children}
      {hr ?? (
        <hr
          style={{ backgroundColor: "#ddd", height: "1px", border: "none" }}
        />
      )}
    </Typography>
  );
}
