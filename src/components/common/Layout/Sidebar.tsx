'use client';

import React, { useState } from 'react';
import {
  Drawer,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  List,
  Divider,
  ListItemIcon,
  Tooltip,
  IconButton,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { useRouter, usePathname } from 'next/navigation';
import PersonIcon from '@mui/icons-material/Person';
import { BarChart, Event, EmojiEvents, Category } from '@mui/icons-material';
import { GridCloseIcon } from '@mui/x-data-grid';
import Collapse from '@mui/material/Collapse';
import { COMPETITION_PAGES } from '@/features/pages/CompetitionPage/config/competitionPages';
interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant: 'permanent' | 'temporary';
}

export const SIDEBAR_MENU = [
  {
    section: 'Menu Items',
    items: [
      {
        name: 'Users',
        link: '/admin/users',
        icon: <PersonIcon fontSize="small" />,
      },
      {
        name: 'Season',
        link: '/admin/season',
        icon: <PersonIcon fontSize="small" />,
      },
      {
        name: 'Grades',
        link: '/admin/grades',
        icon: <PersonIcon fontSize="small" />,
      },
      {
        name: 'Level',
        link: '/admin/level',
        icon: <PersonIcon fontSize="small" />,
      },
      {
        name: 'Questions',
        link: '/admin/questions',
        icon: <PersonIcon fontSize="small" />,
      },
      {
        name: 'Events',
        link: '/admin/events',
        icon: <Event fontSize="small" />,
      },
      {
        name: 'Award Categories',
        link: '/admin/award-categories',
        icon: <Category fontSize="small" />,
      },
      {
        name: 'Awards',
        link: '/admin/awards',
        icon: <EmojiEvents fontSize="small" />,
      },
    ],
  },
  {
    section: 'Extra Items',
    items: [
      {
        name: 'Reports',
        link: '/admin/reports',
        icon: <BarChart fontSize="small" />,
      },
      {
        name: 'Pages',
        icon: <DescriptionIcon fontSize="small" />,
        children: [
          { name: 'Home Page', link: '/admin/pages/home' },
          { name: 'About Page', link: '/admin/pages/about' },
          { name: 'Contact Page', link: '/admin/pages/contact' },
          { name: 'Faq Page', link: '/admin/pages/faq' },
          { name: 'Privacy Policy Page', link: '/admin/pages/privacy' },
          { name: 'Return Policy Page', link: '/admin/pages/return-policy' },
          { name: 'Terms of Service Page', link: '/admin/pages/terms' },
          ...Object.values(COMPETITION_PAGES).map((page) => ({
            name: page.title.replace(' Page', ''),
            link: `/admin/pages/${page.slug}`,
          })),
        ],
      },
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, variant }) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const handleToggle = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };
  const router = useRouter();
  const pathname = usePathname();
  const navbarHeight = 64;

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      role="navigation"
      aria-label="Main sidebar navigation"
      sx={{
        width: variant === 'permanent' ? (open ? 240 : 64) : 240,
        flexShrink: 0,

        '& .MuiDrawer-paper': {
          width: variant === 'permanent' ? (open ? 240 : 64) : '100vw',
          maxWidth: 240,
          boxSizing: 'border-box',

          // 🔑 DESKTOP vs MOBILE
          top: variant === 'temporary' ? 0 : `${navbarHeight}px`,
          height: variant === 'temporary' ? '100vh' : `calc(100vh - ${navbarHeight}px)`,

          backgroundColor: '#F5F6FA',
          borderTop: variant === 'temporary' ? 'none' : '2px solid #e7e9ed',
          px: open ? 1 : 0.5,
          transition: 'width 0.25s ease',
          overflowX: 'hidden',
        },
      }}
    >
      {variant === 'temporary' && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            px: 1,
            pt: 1,
          }}
        >
          <IconButton onClick={onClose} aria-label="Close sidebar">
            <GridCloseIcon />
          </IconButton>
        </Box>
      )}

      {SIDEBAR_MENU.map((group, index) => (
        <Box key={group.section} sx={{ mb: 2 }}>
          {index > 0 && <Divider sx={{ mb: 2 }} />}

          {open && (
            <Typography
              variant="caption"
              sx={{
                px: 2,
                pt: 0.25,
                mb: 1,
                display: 'block',
                color: '#4a5269',
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {group.section}
            </Typography>
          )}

          <List disablePadding>
            {group.items.map((item) => {
              const isActive = pathname === item.link;

              // 🔹 If item has children → render dropdown
              if (item.children) {
                const isOpen = openMenus[item.name];

                return (
                  <Box key={item.name}>
                    <ListItemButton
                      onClick={() => handleToggle(item.name)}
                      sx={{
                        py: 0.75,
                        borderRadius: 1.5,
                        mb: 0.5,
                        justifyContent: open ? 'flex-start' : 'center',
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: open ? 28 : 'auto' }}>{item.icon}</ListItemIcon>

                      <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />

                      {open && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>

                    {/* 🔽 CHILD LINKS */}
                    <Collapse in={isOpen && open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.children.map((child) => {
                          const isChildActive = pathname === child.link;

                          return (
                            <ListItemButton
                              key={child.link}
                              onClick={() => router.push(child.link)}
                              sx={{
                                pl: 5,
                                py: 0.75,
                                borderRadius: 1.5,
                                mb: 0.5,
                                backgroundColor: isChildActive ? '#edeff5' : 'transparent',
                                '&:hover': { backgroundColor: '#edeff5' },
                              }}
                            >
                              <ListItemText
                                primary={child.name}
                                primaryTypographyProps={{
                                  fontSize: 14,
                                  fontWeight: isChildActive ? 600 : 400,
                                }}
                              />
                            </ListItemButton>
                          );
                        })}
                      </List>
                    </Collapse>
                  </Box>
                );
              }

              // 🔹 Normal menu item (no children)
              const button = (
                <ListItemButton
                  key={item.link}
                  onClick={() => router.push(item.link)}
                  sx={{
                    py: 0.75,
                    borderRadius: 1.5,
                    mb: 0.5,
                    justifyContent: open ? 'flex-start' : 'center',
                    backgroundColor: isActive ? '#edeff5' : 'transparent',
                    '&:hover': { backgroundColor: '#edeff5' },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: open ? 28 : 'auto' }}>{item.icon}</ListItemIcon>

                  <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              );

              return open ? (
                button
              ) : (
                <Tooltip key={item.link} title={item.name} placement="right" arrow>
                  {button}
                </Tooltip>
              );
            })}
          </List>
        </Box>
      ))}
    </Drawer>
  );
};

export default Sidebar;
