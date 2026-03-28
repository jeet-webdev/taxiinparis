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
import DeleteConfirmDialog from "../../DeleteConfirmDialog";

export interface PageRow {
  id: number;
  title: string;
  slug: string;
  metaTitle: string;
}

export interface CategoryRow {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  pages?: PageRow[];
}

interface CategoriesTableProps {
  rows: CategoryRow[];
  onDelete?: (id: number) => Promise<{ success: boolean }>;
  onDeletePage?: (
    pageId: number,
    categoryId: number,
  ) => Promise<{ success: boolean }>;
}

type Order = "asc" | "desc";

export default function CategoriesTable({
  rows,
  onDelete,
  onDeletePage,
}: CategoriesTableProps) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof CategoryRow>("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deleteAction, setDeleteAction] = React.useState<() => void>(() => {});
  const [deleteText, setDeleteText] = React.useState("");
  const [selectedCategory, setSelectedCategory] =
    React.useState<CategoryRow | null>(null);
  const [menuRow, setMenuRow] = React.useState<CategoryRow | null>(null);

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

      if (valueA === undefined || valueA === null) return 1;
      if (valueB === undefined || valueB === null) return -1;
      if (valueA === valueB) return 0;

      const aVal =
        valueA instanceof Date ? valueA.getTime() : (valueA as string | number);
      const bVal =
        valueB instanceof Date ? valueB.getTime() : (valueB as string | number);

      if (aVal < bVal) return order === "asc" ? -1 : 1;
      if (aVal > bVal) return order === "asc" ? 1 : -1;
      return 0;
    });
  }, [rows, order, orderBy]);

  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {/* PRIMARY CATEGORY TABLE */}
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5" fontWeight={600} sx={{ color: "#333" }}>
            Category List
          </Typography>
          <button
            className="btn-primary py-2! px-4!"
            onClick={() => router.push("/admin/categories/add")}
          >
            + Add New Category
          </button>
        </Box>

        {/*
          FIX: Paper is passed as the component to TableContainer.
          TablePagination is placed with component="div" OUTSIDE TableContainer
          so we never get div>td or div inside tr — both are invalid HTML.
        */}
        <TableContainer component={Paper} sx={{ elevation: 2 }}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={() => handleSort("name")}
                  >
                    Category Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>Slug</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  selected={selectedCategory?.id === row.id}
                >
                  <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                  <TableCell sx={{ color: "primary.main" }}>
                    /{row.slug}
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                    >
                      <button
                        className="btn-secondary py-1! border-2! px-1!"
                        onClick={() => setSelectedCategory(row)}
                      >
                        View Pages
                      </button>
                      <button
                        className="btn-primary p-1!"
                        onClick={(e) => {
                          setAnchorEl(e.currentTarget);
                          setMenuRow(row);
                        }}
                      >
                        Action
                      </button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* TablePagination with component="div" sits outside TableContainer */}
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
      </Box>

      {/* SECONDARY PAGES TABLE */}
      {selectedCategory && (
        <Box sx={{ mt: 2 }}>
          <Box
            sx={{
              backgroundColor: "#343a40",
              color: "#fff",
              p: 1.5,
              borderRadius: "4px 4px 0 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              Pages Management for: {selectedCategory.name}
            </Typography>
            <Button
              size="small"
              variant="contained"
              sx={{
                backgroundColor: "#6c757d",
                "&:hover": { backgroundColor: "#5a6268" },
              }}
              onClick={() => setSelectedCategory(null)}
            >
              Close
            </Button>
          </Box>

          {/*
            FIX: Paper wraps only the TableContainer here.
            No Paper nested inside TableContainer or Table.
          */}
          <TableContainer
            component={Paper}
            sx={{ borderRadius: "0 0 4px 4px", border: "1px solid #dee2e6" }}
          >
            <Table size="small">
              <TableHead sx={{ backgroundColor: "#f8f9fa" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Page Title</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>URL Slug</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Meta Title</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedCategory.pages && selectedCategory.pages.length > 0 ? (
                  selectedCategory.pages.map((p) => (
                    <TableRow key={p.id} hover>
                      <TableCell>{p.title}</TableCell>
                      <TableCell sx={{ color: "primary.main" }}>
                        /{p.slug}
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "0.85rem", color: "text.secondary" }}
                      >
                        {p.metaTitle || "---"}
                      </TableCell>
                      <TableCell align="right">
                        <Box
                          sx={{
                            display: "flex",
                            gap: 0.5,
                            justifyContent: "flex-end",
                          }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() =>
                              router.push(
                                `/admin/categories/${selectedCategory.id}/edit/${p.slug}`,
                              )
                            }
                          >
                            Edit
                          </Button>
                          {/* <Button
                            variant="contained"
                            color="error"
                            size="small"
                            sx={{
                              minWidth: "50px",
                              fontSize: "0.7rem",
                              py: 0.5,
                            }}
                            onClick={async () => {
                              if (!onDeletePage) return;
                              setDeleteText(`Delete page "${p.title}"?`);

                              setDeleteAction(() => async () => {
                                if (!onDeletePage) return;

                                const res = await onDeletePage(
                                  p.id,
                                  selectedCategory.id,
                                );

                                if (res.success) {
                                  setSelectedCategory((prev) =>
                                    prev
                                      ? {
                                          ...prev,
                                          pages: prev.pages?.filter(
                                            (pg) => pg.id !== p.id,
                                          ),
                                        }
                                      : null,
                                  );
                                }

                                setDeleteOpen(false);
                              });

                              setDeleteOpen(true);
                              try {
                                const res = await onDeletePage(
                                  p.id,
                                  selectedCategory.id,
                                );
                                if (res.success) {
                                  setSelectedCategory((prev) =>
                                    prev
                                      ? {
                                          ...prev,
                                          pages: prev.pages?.filter(
                                            (pg) => pg.id !== p.id,
                                          ),
                                        }
                                      : null,
                                  );
                                } else {
                                  alert(
                                    "Failed to delete the page. Please try again.",
                                  );
                                }
                              } catch (err) {
                                console.error("Delete page failed:", err);
                                alert("An error occurred. Please try again.");
                              }
                            }}
                          >
                            Delete
                          </Button> */}
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            sx={{
                              minWidth: "50px",
                              fontSize: "0.7rem",
                              py: 0.5,
                            }}
                            onClick={() => {
                              // 1. Safety check & Capture local constants to avoid 'null' or 'missing p' errors
                              if (!onDeletePage || !selectedCategory) return;

                              const pageId = p.id;
                              const pageTitle = p.title;
                              const catId = selectedCategory.id;

                              setDeleteText(`Delete page "${pageTitle}"?`);

                              // 2. ONLY set the action here. Do NOT call onDeletePage immediately.
                              setDeleteAction(() => async () => {
                                try {
                                  const res = await onDeletePage(pageId, catId);
                                  if (res.success) {
                                    setSelectedCategory((prev) =>
                                      prev
                                        ? {
                                            ...prev,
                                            pages: prev.pages?.filter(
                                              (pg) => pg.id !== pageId,
                                            ),
                                          }
                                        : null,
                                    );
                                  } else {
                                    alert("Failed to delete the page.");
                                  }
                                } catch (err) {
                                  console.error("Delete page failed:", err);
                                } finally {
                                  setDeleteOpen(false); // Close dialog after completion
                                }
                              });

                              setDeleteOpen(true);
                            }}
                          >
                            Delete
                          </Button>
                          <button
                            className="btn-secondary py-0.5! px-1! border-2!"
                            onClick={() =>
                              window.open(
                                `/category/${selectedCategory.slug}/${p.slug}`,
                                "_blank",
                              )
                            }
                          >
                            View
                          </button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      align="center"
                      sx={{ py: 4, color: "text.secondary" }}
                    >
                      No pages found for this category. Click Action → Add Page
                      to create one.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* ACTION MENU */}
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
            if (menuRow) router.push(`/admin/categories/${menuRow.id}/add`);
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
            if (menuRow) router.push(`/admin/categories/edit/${menuRow.id}`);
            setAnchorEl(null);
          }}
        >
          Edit Category
        </MenuItem>
        {/* <MenuItem
          sx={{ color: "error.main" }}
          onClick={() => {
            if (!menuRow || !onDelete) return;

            setDeleteText(`Delete category "${menuRow.name}"?`);

            setDeleteAction(() => async () => {
              await onDelete(menuRow.id);
              setDeleteOpen(false);
            });

            setDeleteOpen(true);
            setAnchorEl(null);
          }}
        >
          Delete Category
        </MenuItem> */}
        <MenuItem
          sx={{ color: "error.main" }}
          onClick={() => {
            if (!menuRow || !onDelete) return;

            const categoryId = menuRow.id;
            const categoryName = menuRow.name;

            setDeleteText(`Delete category "${categoryName}"?`);

            setDeleteAction(() => async () => {
              try {
                const res = await onDelete(categoryId);
                if (res.success) {
                  // If you want the category to disappear from the table immediately:
                  // Note: This requires 'rows' to be part of a parent state or handled via router.refresh()
                  router.refresh();
                }
              } catch (err) {
                console.error("Delete category failed:", err);
              } finally {
                setDeleteOpen(false);
              }
            });

            setDeleteOpen(true);
            setAnchorEl(null);
          }}
        >
          Delete Category
        </MenuItem>
      </Menu>
      <DeleteConfirmDialog
        open={deleteOpen}
        description={deleteText}
        onClose={() => setDeleteOpen(false)}
        onConfirm={deleteAction}
      />
    </Box>
  );
}
