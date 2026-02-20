import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

export default function AdminDashboard() {
    return (
        <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f5f6fa',
          p: { xs: 2, md: 4 },
        }}
      >
        <Stack spacing={4} alignItems="center">
          {/* Welcome Card */}
          <Card
            elevation={3}
            sx={{
              width: '100%',
              maxWidth: 600,
              borderRadius: 2,
              boxShadow: '0px 10px 30px rgba(0,0,0,0.08)',
            }}
          >
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#1e222d' }}>
                Welcome to the Dashboard
              </Typography>
              <Typography variant="body1" sx={{ color: '#555' }}>
                Here you can manage your users, projects, and settings.
              </Typography>
            </CardContent>
          </Card>
          </Stack>
          </Box>
    )
  }