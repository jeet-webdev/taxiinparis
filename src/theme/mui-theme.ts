import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  typography: {
    fontFamily: "var(--font-montserrat)", // default

    h4: {
      fontFamily: "var(--font-heading)", // 👈 Playfair
      fontWeight: 700,
    },
  },
});