import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
      contrastText: "white",
    },
    secondary: {
      main: "#9c27b0",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
