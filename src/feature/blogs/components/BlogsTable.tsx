"use client";

import * as React from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation";

export interface BlogRow {
  id: number;
  title: string;
  slug: string;
  metaDescription: string;
  metaKeywords: string;
}

interface BlogsTableProps {
  rows: BlogRow[];
  onDelete?: (id: number) => Promise<{ success: boolean }>;
}

type Order = "asc" | "desc";

export default function BlogsTable({ rows, onDelete }: BlogsTableProps) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof BlogRow>("title");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedRowId, setSelectedRowId] = React.useState<number | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const router = useRouter();

  const handleSort = (property: keyof BlogRow) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // const sortedRows = React.useMemo(() => {
  //   return [...rows].sort((a, b) => {
  //     const valueA = a[orderBy];
  //     const valueB = b[orderBy];

  //     if (valueA < valueB) return order === "asc" ? -1 : 1;
  //     if (valueA > valueB) return order === "asc" ? 1 : -1;
  //     return 0;
  //   });
  // }, [order, orderBy]);

  const sortedRows = React.useMemo(() => {
    return [...rows].sort((a, b) => {
      // Access values based on the current orderBy key
      const valueA = a[orderBy];
      const valueB = b[orderBy];

      // Handle null or undefined cases just in case
      if (valueA === valueB) return 0;
      if (valueA === null || valueA === undefined) return 1;
      if (valueB === null || valueB === undefined) return -1;

      // Standard comparison logic
      if (valueA < valueB) {
        return order === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [rows, order, orderBy]); // Added 'rows' to dependencies

  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" fontWeight={500} mb={2}>
          Blogs
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#F4C430",
            color: "#111",
            textTransform: "none",
            borderRadius: 2,
            px: 3,
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#F6D365",
            },
          }}
          onClick={() => router.push("/admin/blogs/add")}
        >
          Add New Blog
        </Button>
      </Box>

      <Paper>
        <TableContainer>
          <Table
            size="small"
            sx={{
              "& .MuiTableCell-root": {
                py: 1.5,
              },
            }}
            aria-label="Blogs Table"
          >
            <TableHead>
              <TableRow>
                <TableCell sortDirection={orderBy === "title" ? order : false}>
                  <TableSortLabel
                    sx={{ fontWeight: 600, fontSize: 16 }}
                    active={orderBy === "title"}
                    direction={orderBy === "title" ? order : "asc"}
                    onClick={() => handleSort("title")}
                  >
                    Title
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === "slug" ? order : false}>
                  <TableSortLabel
                    sx={{ fontWeight: 600, fontSize: 16 }}
                    active={orderBy === "slug"}
                    direction={orderBy === "slug" ? order : "asc"}
                    onClick={() => handleSort("slug")}
                  >
                    Slug
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sortDirection={orderBy === "metaDescription" ? order : false}
                >
                  <TableSortLabel
                    sx={{ fontWeight: 600, fontSize: 16 }}
                    active={orderBy === "metaDescription"}
                    direction={orderBy === "metaDescription" ? order : "asc"}
                    onClick={() => handleSort("metaDescription")}
                  >
                    Meta Description
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sortDirection={orderBy === "metaKeywords" ? order : false}
                >
                  <TableSortLabel
                    sx={{ fontWeight: 600, fontSize: 16 }}
                    active={orderBy === "metaKeywords"}
                    direction={orderBy === "metaKeywords" ? order : "asc"}
                    onClick={() => handleSort("metaKeywords")}
                  >
                    Meta Keywords
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, fontSize: 16 }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedRows.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.slug}</TableCell>
                  <TableCell>{row.metaDescription}</TableCell>
                  <TableCell>{row.metaKeywords}</TableCell>
                  {/* Action Column */}
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                      }}
                      size="small"
                      onClick={(e) => {
                        setAnchorEl(e.currentTarget);
                        setSelectedRowId(row.id);
                      }}
                    >
                      Action
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Bottom */}
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{
            fontSize: 16,
            fontWeight: 500,
            color: "#000",

            "& .MuiTablePagination-selectLabel": {
              color: "#000",
              fontSize: 16,
              fontWeight: 500,
            },

            "& .MuiTablePagination-displayedRows": {
              color: "#000",
              fontSize: 16,
              fontWeight: 500,
            },

            "& .MuiSelect-select": {
              color: "#000",
            },

            "& .MuiSvgIcon-root": {
              color: "#000",
            },

            "& .MuiIconButton-root": {
              color: "#000",
            },
          }}
        />
      </Paper>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            if (selectedRowId) {
              router.push(`/admin/blogs/edit/${selectedRowId}`);
            }
            setAnchorEl(null);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>View</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Block</MenuItem>
        <MenuItem
          onClick={async () => {
            if (selectedRowId && onDelete) {
              await onDelete(selectedRowId);
            }
            setAnchorEl(null);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}
