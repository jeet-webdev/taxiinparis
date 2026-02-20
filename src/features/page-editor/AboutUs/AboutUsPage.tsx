'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect } from 'react';


export default function AboutPage() {




 
  return (
    // <FormProvider {...methods}>
      <Box
        component="form"
        // onSubmit={methods.handleSubmit(() => {})}
        sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 4 }}
      >
        <Typography variant="h5" gutterBottom>
          About Page Configuration
        </Typography>

       
      </Box>
    // </FormProvider>
  );
}
