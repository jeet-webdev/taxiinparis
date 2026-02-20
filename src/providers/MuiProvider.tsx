"use client";

import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "@/src/theme/mui-theme";
import CssBaseline from "@mui/material/CssBaseline";

export default function MuiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}