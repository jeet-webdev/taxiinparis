"use client";

import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "@/src/theme/mui-theme";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

export default function MuiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
       <AppRouterCacheProvider>

    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
       </AppRouterCacheProvider>
  );
}