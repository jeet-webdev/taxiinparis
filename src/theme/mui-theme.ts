import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  typography: {
    fontFamily: "var(--font-montserrat)", // default

    h4: {
      fontFamily: "var(--font-heading)", // 👈 Playfair
      fontWeight: 700,
    },
  },
    components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#111", // dark label
          fontWeight: 600,
          "&.Mui-focused": {
            color: "#111", // keep dark on focus
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: "#d1d5db", // normal border
          },
          "&:hover fieldset": {
            borderColor: "#111",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#111",
          },
        },
      },
    },
  },
});