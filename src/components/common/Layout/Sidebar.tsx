"use client";

import React, { useState } from "react";
import {
  Drawer,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  List,
  ListItemIcon,
  Tooltip,
  IconButton,
} from "@mui/material";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useRouter, usePathname } from "next/navigation";
import { GridCloseIcon } from "@mui/x-data-grid";
import Collapse from "@mui/material/Collapse";
import { RiPagesLine } from "react-icons/ri";
import { TbLayoutNavbarCollapseFilled } from "react-icons/tb";
import { TbLayoutBottombarCollapseFilled } from "react-icons/tb";
import { MdFeaturedPlayList } from "react-icons/md";
import { TbLayersDifference } from "react-icons/tb";
import { TbMessageLanguage } from "react-icons/tb";

import { MdCreditScore } from "react-icons/md";
interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant: "permanent" | "temporary";
}

export const SIDEBAR_MENU = [
  {
    section: "",
    items: [
      {
        name: "Header",
        link: "/admin/header-editor",
        icon: <TbLayoutNavbarCollapseFilled size={20} />,
      },
      {
        name: "Blogs",
        link: "/admin/blogs",
        icon: <RiPagesLine size={20} />,
      },
      {
        name: "Pages",
        icon: <MdCreditScore size={20} />,
        children: [
          { name: "Home Page", link: "/admin/home-editor" },
          { name: "About Us Page", link: "/admin/about-editor" },
          { name: "Services Page", link: "/admin/services-editor" },
          { name: "Terms Page", link: "/admin/terms-editor" },
          { name: "Privacy Page", link: "/admin/privacy-editor" },
        ],
      },
      {
        name: "All Page",
        link: "/admin/language-page",
        icon: <TbMessageLanguage size={20} />,
      },

      {
        name: "Features",
        link: "/admin/features-editor",
        icon: <MdFeaturedPlayList size={20} />,
      },
      {
        name: "Category",
        link: "/admin/categories",
        icon: <TbLayersDifference size={20} />,
      },

      {
        name: "Footer",
        link: "/admin/footer-editor",
        icon: <TbLayoutBottombarCollapseFilled size={20} />,
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
      sx={{
        width: open ? 260 : 72,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 260 : 72,
          transition: "all 0.25s ease",
          boxSizing: "border-box",
          top: variant === "temporary" ? 0 : `${navbarHeight}px`,
          height:
            variant === "temporary"
              ? "100vh"
              : `calc(100vh - ${navbarHeight}px)`,
          background: "#F8F9FC",
          borderRight: "1px solid #E6E8F0",
          px: 1,
          borderTop: "2px solid #E6E8F0",
          overflowX: "hidden",
        },
      }}
    >
      {/* Close Button (Mobile) */}
      {variant === "temporary" && (
        <Box display="flex" justifyContent="flex-end" p={1}>
          <IconButton onClick={onClose}>
            <GridCloseIcon />
          </IconButton>
        </Box>
      )}

      {SIDEBAR_MENU.map((group, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          {open && (
            <Typography
              variant="caption"
              sx={{
                px: 2,
                mb: 1,
                fontWeight: 600,
                color: "#8A90A2",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {group.section}
            </Typography>
          )}

          <List disablePadding>
            {group.items.map((item) => {
              const isActive = item.link && pathname.startsWith(item.link);

              if (item.children) {
                const isOpen = openMenus[item.name];

                return (
                  <Box key={item.name}>
                    <ListItemButton
                      onClick={() => handleToggle(item.name)}
                      sx={{
                        borderRadius: 2,
                        mb: 0.5,
                        px: 2,
                        py: 1,
                        backgroundColor: isOpen ? "#EEF2FF" : "transparent",
                        "&:hover": {
                          backgroundColor: "#F1F3FA",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 2 : 0,
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>

                      {open && (
                        <>
                          <ListItemText
                            primary={item.name}
                            primaryTypographyProps={{
                              fontSize: 15,
                              fontWeight: 500,
                            }}
                          />
                          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </>
                      )}
                    </ListItemButton>

                    <Collapse in={isOpen && open}>
                      <List disablePadding>
                        {item.children.map((child) => {
                          const isChildActive = pathname === child.link;

                          return (
                            <ListItemButton
                              key={child.link}
                              onClick={() => router.push(child.link)}
                              sx={{
                                pl: 6,
                                py: 0.8,
                                borderRadius: 2,
                                mb: 0.5,
                                backgroundColor: isChildActive
                                  ? "#E6E9FF"
                                  : "transparent",
                                borderLeft: isChildActive
                                  ? "3px solid #F4C430"
                                  : "3px solid transparent",
                                "&:hover": {
                                  backgroundColor: "#E6E9FF",
                                },
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

              const button = (
                <ListItemButton
                  key={item.link}
                  onClick={() => router.push(item.link!)}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    px: 2,
                    py: 1,
                    backgroundColor: isActive ? "#E6E9FF" : "transparent",
                    borderLeft: isActive
                      ? "3px solid #F4C430"
                      : "3px solid transparent",
                    "&:hover": {
                      backgroundColor: "#F1F3FA",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : 0,
                      justifyContent: "center",
                      color: isActive ? "#D4AF6A" : "inherit", ///
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  {open && (
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: isActive ? 600 : 500,
                      }}
                    />
                  )}
                </ListItemButton>
              );

              return open ? (
                button
              ) : (
                <Tooltip
                  key={item.link}
                  title={item.name}
                  placement="right"
                  arrow
                >
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
