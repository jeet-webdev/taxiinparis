// "use client";

// import * as React from "react";
// import {
//   Box,
//   Button,
//   Menu,
//   MenuItem,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
//   TableSortLabel,
//   Typography,
//   Divider,
// } from "@mui/material";
// import { useRouter } from "next/navigation";

// export interface CategoryRow {
//   id: number;
//   name: string;
//   slug: string;
//   createdAt: Date;
// }

// interface CategoriesTableProps {
//   rows: CategoryRow[];
//   onDelete?: (id: number) => Promise<{ success: boolean }>;
// }

// type Order = "asc" | "desc";

// export default function CategoriesTable({
//   rows,
//   onDelete,
// }: CategoriesTableProps) {
//   const [order, setOrder] = React.useState<Order>("asc");
//   const [orderBy, setOrderBy] = React.useState<keyof CategoryRow>("name");
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const [selectedRow, setSelectedRow] = React.useState<CategoryRow | null>(
//     null,
//   );
//   const router = useRouter();

//   const handleSort = (property: keyof CategoryRow) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   const sortedRows = React.useMemo(() => {
//     return [...rows].sort((a, b) => {
//       const valueA = a[orderBy];
//       const valueB = b[orderBy];
//       if (valueA === valueB) return 0;
//       if (valueA < valueB) return order === "asc" ? -1 : 1;
//       if (valueA > valueB) return order === "asc" ? 1 : -1;
//       return 0;
//     });
//   }, [rows, order, orderBy]);

//   const paginatedRows = sortedRows.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage,
//   );
//   function FormattedDate({ date }: { date: Date }) {
//     const [formatted, setFormatted] = React.useState("");

//     React.useEffect(() => {
//       // This only runs on the client, matching the user's browser settings
//       setFormatted(new Date(date).toLocaleDateString());
//     }, [date]);

//     return <span>{formatted}</span>;
//   }
//   return (
//     <Box>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={2}
//       >
//         <Typography variant="h4" fontWeight={500}>
//           Categories
//         </Typography>
//         <Button
//           variant="contained"
//           sx={{
//             backgroundColor: "#F4C430",
//             color: "#111",
//             textTransform: "none",
//             borderRadius: 2,
//             px: 3,
//             fontWeight: 600,
//             "&:hover": { backgroundColor: "#F6D365" },
//           }}
//           onClick={() => router.push("/admin/categories/add")}
//         >
//           Add New Category
//         </Button>
//       </Box>

//       <Paper>
//         <TableContainer>
//           <Table size="small" sx={{ "& .MuiTableCell-root": { py: 1.5 } }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell>
//                   <TableSortLabel
//                     sx={{ fontWeight: 600, fontSize: 16 }}
//                     active={orderBy === "name"}
//                     direction={orderBy === "name" ? order : "asc"}
//                     onClick={() => handleSort("name")}
//                   >
//                     Name
//                   </TableSortLabel>
//                 </TableCell>
//                 <TableCell>
//                   <TableSortLabel
//                     sx={{ fontWeight: 600, fontSize: 16 }}
//                     active={orderBy === "slug"}
//                     direction={orderBy === "slug" ? order : "asc"}
//                     onClick={() => handleSort("slug")}
//                   >
//                     Slug
//                   </TableSortLabel>
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: 600, fontSize: 16 }}>
//                   Created At
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{ fontWeight: 600, fontSize: 16 }}
//                 >
//                   Action
//                 </TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {paginatedRows.map((row) => (
//                 <TableRow key={row.id} hover>
//                   <TableCell>{row.name}</TableCell>
//                   <TableCell>{row.slug}</TableCell>
//                   <TableCell>
//                     {new Date(row.createdAt).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell align="center">
//                     <Button
//                       variant="contained"
//                       size="small"
//                       sx={{ textTransform: "none", fontWeight: 500 }}
//                       onClick={(e) => {
//                         setAnchorEl(e.currentTarget);
//                         setSelectedRow(row);
//                       }}
//                     >
//                       Action
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <TablePagination
//           component="div"
//           count={rows.length}
//           page={page}
//           onPageChange={(_, newPage) => setPage(newPage)}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={(e) => {
//             setRowsPerPage(parseInt(e.target.value, 10));
//             setPage(0);
//           }}
//           rowsPerPageOptions={[5, 10, 25]}
//         />
//       </Paper>

//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={() => setAnchorEl(null)}
//       >
//         <Typography
//           variant="overline"
//           sx={{ px: 2, display: "block", color: "text.secondary", mt: 1 }}
//         >
//           Content
//         </Typography>
//         <MenuItem
//           onClick={() => {
//             if (selectedRow)
//               router.push(`/admin/categories/${selectedRow.id}/add`);
//             setAnchorEl(null);
//           }}
//         >
//           Add Page to Category
//         </MenuItem>

//         <Divider />

//         <Typography
//           variant="overline"
//           sx={{ px: 2, display: "block", color: "text.secondary", mt: 1 }}
//         >
//           Management
//         </Typography>
//         <MenuItem
//           onClick={() => {
//             if (selectedRow)
//               router.push(`/admin/categories/edit/${selectedRow.id}`);
//             setAnchorEl(null);
//           }}
//         >
//           Edit Category
//         </MenuItem>
//         <MenuItem
//           sx={{ color: "error.main" }}
//           onClick={async () => {
//             if (selectedRow && onDelete) {
//               await onDelete(selectedRow.id);
//             }
//             setAnchorEl(null);
//           }}
//         >
//           Delete Category
//         </MenuItem>
//       </Menu>
//     </Box>
//   );
// }

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

// Added a type for the sub-items (pages)
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
  pages?: PageRow[]; // Optional array of pages
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

  // State for the currently selected category to show in the second table
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
      // 1. Get values and handle the 'possibly undefined' check
      const valueA = a[orderBy];
      const valueB = b[orderBy];

      if (valueA === undefined || valueA === null) return 1;
      if (valueB === undefined || valueB === null) return -1;
      if (valueA === valueB) return 0;

      // 2. Type-safe comparison
      // We cast to a union of comparable primitives instead of 'any'
      const aVal =
        valueA instanceof Date ? valueA.getTime() : (valueA as string | number);
      const bVal =
        valueB instanceof Date ? valueB.getTime() : (valueB as string | number);

      if (aVal < bVal) {
        return order === "asc" ? -1 : 1;
      }
      if (aVal > bVal) {
        return order === "asc" ? 1 : -1;
      }

      return 0;
    });
  }, [rows, order, orderBy]);

  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {/* --- PRIMARY CATEGORY TABLE --- */}
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
          <Button
            variant="contained"
            sx={{ backgroundColor: "#F4C430", color: "#111", fontWeight: 600 }}
            onClick={() => router.push("/admin/categories/add")}
          >
            + Add New Category
          </Button>
        </Box>

        <Paper elevation={2}>
          <TableContainer>
            <Table size="small">
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  {/* <TableCell>ID</TableCell> */}
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
                    {/* <TableCell>{row.id}</TableCell> */}
                    <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                    <TableCell sx={{ color: "primary.main" }}>
                      /{row.slug}
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => setSelectedCategory(row)}
                        >
                          View Pages
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={(e) => {
                            setAnchorEl(e.currentTarget);
                            setMenuRow(row);
                          }}
                        >
                          Action
                        </Button>
                      </Box>
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
          />
        </Paper>
      </Box>

      {/* --- SECONDARY SUB-CATEGORY/PAGE TABLE --- */}
      {/* --- SECONDARY SUB-CATEGORY/PAGE TABLE --- */}
      {selectedCategory && (
        <Box sx={{ mt: 2 }}>
          <Box
            sx={{
              backgroundColor: "#343a40", // Dark header like your reference image
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
          <Paper
            elevation={2}
            sx={{ borderRadius: "0 0 4px 4px", border: "1px solid #dee2e6" }}
          >
            <TableContainer>
              <Table size="small">
                <TableHead sx={{ backgroundColor: "#f8f9fa" }}>
                  <TableRow>
                    {/* <TableCell sx={{ fontWeight: 600 }}>ID</TableCell> */}
                    <TableCell sx={{ fontWeight: 600 }}>Page Title</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>URL Slug</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Meta Title</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedCategory.pages &&
                  selectedCategory.pages.length > 0 ? (
                    selectedCategory.pages.map((page) => (
                      <TableRow key={page.id} hover>
                        {/* <TableCell>{page.id}</TableCell> */}
                        <TableCell>{page.title}</TableCell>
                        <TableCell sx={{ color: "primary.main" }}>
                          /{page.slug}
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: "0.85rem", color: "text.secondary" }}
                        >
                          {page.metaTitle || "---"}
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
                              sx={{
                                minWidth: "50px",
                                fontSize: "0.7rem",
                                py: 0.5,
                              }}
                              onClick={() =>
                                router.push(`/admin/pages/edit/${page.slug}`)
                              }
                            >
                              Edit
                            </Button>
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
                                /* Add Delete Page logic here */
                              }}
                            >
                              Delete
                            </Button>
                            <Button
                              variant="contained"
                              color="warning"
                              size="small"
                              sx={{
                                minWidth: "50px",
                                fontSize: "0.7rem",
                                py: 0.5,
                                backgroundColor: "#ffc107",
                                color: "#000",
                              }}
                              onClick={() =>
                                window.open(
                                  `/category/${selectedCategory.slug}/${page.slug}`,
                                  "_blank",
                                )
                              }
                            >
                              View
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        align="center"
                        sx={{ py: 4, color: "text.secondary" }}
                      >
                        No pages found for this category. Click Action Add Page
                        to create one.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      )}

      {/* Existing Menu Logic */}
      {/* Existing Menu Logic at the bottom of your component */}
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

        {/* ADD PAGE OPTION */}
        <MenuItem
          onClick={() => {
            if (menuRow) {
              router.push(`/admin/categories/${menuRow.id}/add`);
            }
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
        {/* <MenuItem
          onClick={() => {
            if (menuRow) {
              // Close the menu first to prevent hydration issues
              setAnchorEl(null);
              // Navigate using the slug
              router.push(`/admin/categories/${menuRow.slug}/add`);
            }
          }}
        >
          Add Page to Category
        </MenuItem> */}
        <MenuItem
          onClick={() => {
            if (menuRow) router.push(`/admin/categories/edit/${menuRow.id}`);
            setAnchorEl(null);
          }}
        >
          Edit Category
        </MenuItem>

        <MenuItem
          sx={{ color: "error.main" }}
          onClick={async () => {
            if (menuRow && onDelete) {
              const res = await onDelete(menuRow.id);
              if (res.success) {
                // You might want to refresh or show a toast here
              }
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
