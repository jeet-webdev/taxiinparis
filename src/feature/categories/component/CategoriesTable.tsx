"use client";

import * as React from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";

export interface CategoryRow {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
}

interface CategoriesTableProps {
  rows: CategoryRow[];
  onDelete?: (id: number) => Promise<{ success: boolean }>;
}

type Order = "asc" | "desc";

export default function CategoriesTable({
  rows,
  onDelete,
}: CategoriesTableProps) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof CategoryRow>("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = React.useState<CategoryRow | null>(
    null,
  );
  const router = useRouter();

  const handleSort = (property: keyof CategoryRow) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = React.useMemo(() => {
    return [...rows].sort((a, b) => {
      const valueA = a[orderBy];
      const valueB = b[orderBy];
      if (valueA === valueB) return 0;
      if (valueA < valueB) return order === "asc" ? -1 : 1;
      if (valueA > valueB) return order === "asc" ? 1 : -1;
      return 0;
    });
  }, [rows, order, orderBy]);

  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );
  function FormattedDate({ date }: { date: Date }) {
    const [formatted, setFormatted] = React.useState("");

    React.useEffect(() => {
      // This only runs on the client, matching the user's browser settings
      setFormatted(new Date(date).toLocaleDateString());
    }, [date]);

    return <span>{formatted}</span>;
  }
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" fontWeight={500}>
          Categories
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
            "&:hover": { backgroundColor: "#F6D365" },
          }}
          onClick={() => router.push("/admin/categories/add")}
        >
          Add New Category
        </Button>
      </Box>

      <Paper>
        <TableContainer>
          <Table size="small" sx={{ "& .MuiTableCell-root": { py: 1.5 } }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    sx={{ fontWeight: 600, fontSize: 16 }}
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={() => handleSort("name")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    sx={{ fontWeight: 600, fontSize: 16 }}
                    active={orderBy === "slug"}
                    direction={orderBy === "slug" ? order : "asc"}
                    onClick={() => handleSort("slug")}
                  >
                    Slug
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: 16 }}>
                  Created At
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
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.slug}</TableCell>
                  <TableCell>
                    {new Date(row.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ textTransform: "none", fontWeight: 500 }}
                      onClick={(e) => {
                        setAnchorEl(e.currentTarget);
                        setSelectedRow(row);
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
        />
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <Typography
          variant="overline"
          sx={{ px: 2, display: "block", color: "text.secondary", mt: 1 }}
        >
          Content
        </Typography>
        <MenuItem
          onClick={() => {
            if (selectedRow)
              router.push(`/admin/categories/${selectedRow.id}/add`);
            setAnchorEl(null);
          }}
        >
          Add Page to Category
        </MenuItem>

        <Divider />

        <Typography
          variant="overline"
          sx={{ px: 2, display: "block", color: "text.secondary", mt: 1 }}
        >
          Management
        </Typography>
        <MenuItem
          onClick={() => {
            if (selectedRow)
              router.push(`/admin/categories/edit/${selectedRow.id}`);
            setAnchorEl(null);
          }}
        >
          Edit Category
        </MenuItem>
        <MenuItem
          sx={{ color: "error.main" }}
          onClick={async () => {
            if (selectedRow && onDelete) {
              await onDelete(selectedRow.id);
            }
            setAnchorEl(null);
          }}
        >
          Delete Category
        </MenuItem>
      </Menu>
    </Box>
  );
}
