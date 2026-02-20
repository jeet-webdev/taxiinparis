'use client';

import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import AdminNavbar from './Header/AdminNavbar';
import Sidebar from './Sidebar';


interface AdminAppLayoutProps {
  children: ReactNode;
}

const AdminAppLayout: React.FC<AdminAppLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // 🔑 desktop & mobile states separated
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleSidebar = () => {
    if (isDesktop) {
      setDesktopOpen((p) => !p);
    } else {
      setMobileOpen(true);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AdminNavbar onMenuClick={handleToggleSidebar} />

      {/* 🔑 MAIN ROW */}
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        {/* SIDEBAR */}
        <Box
          sx={{
            transition: 'width 0.25s ease',
            flexShrink: 0,
          }}
        >
          <Sidebar
            open={isDesktop ? desktopOpen : mobileOpen}
            variant={isDesktop ? 'permanent' : 'temporary'}
            onClose={() => setMobileOpen(false)}
          />
        </Box>

        {/* CONTENT */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: 'auto',
            backgroundColor: '#f9fafb',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminAppLayout;
