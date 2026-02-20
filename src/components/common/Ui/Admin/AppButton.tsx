'use client';

import { Button, CircularProgress } from '@mui/material';
import type { ButtonProps } from '@mui/material';

interface AppButtonProps extends ButtonProps {
  loading?: boolean;
}

export default function AppButton({
  children,
  loading = false,
  disabled,
  ...props
}: AppButtonProps) {
  return (
    <Button
      {...props}
      variant={props.variant ?? 'contained'}
      sx={{ textTransform: 'none', borderRadius: 1.5 }}
      disabled={disabled || loading}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : children}
    </Button>
  );
}
