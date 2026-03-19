import * as React from "react";
import { Box, Typography, Paper, Divider, Container } from "@mui/material";
import { getCategoryPageBySlug } from "@/src/actions/category/CategoryPage/getCategoryPage";
import UpdateCategoryPageForm from "@/src/app/(admin)/admin/categories/categoryPage/UpdateCategoryPageForm";
import Link from "next/link";

interface EditPageProps {
  params: Promise<{
    categoryId: string;
    categoryPageId: string;
  }>;
}

export default async function EditCategoryPage({ params }: EditPageProps) {
  const { categoryId, categoryPageId } = await params;
  const pageData = await getCategoryPageBySlug(categoryPageId);

  if (!pageData) {
    return (
      <Container maxWidth="sm" sx={{ py: 10 }}>
        <Paper
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <Typography variant="h5" color="error" fontWeight={700} gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            The category page with slug <strong>{categoryPageId}</strong> does
            not exist in our database.
          </Typography>

          {/* ✅ Plain <a> tag — zero serialization issues */}
          <Link
            href="/admin/categories"
            style={{
              display: "inline-block",
              padding: "8px 24px",
              backgroundColor: "#1976d2",
              color: "#fff",
              borderRadius: "4px",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Back to Categories
          </Link>
        </Paper>
      </Container>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* ✅ Pure HTML nav + anchor — no MUI, no NextLink, no serialization */}
      <nav style={{ marginBottom: "16px", fontSize: "0.875rem" }}>
        <Link
          href="/admin/categories"
          style={{ color: "#666", textDecoration: "none" }}
        >
          Categories
        </Link>
        <span style={{ margin: "0 6px", color: "#999" }}>/</span>
        <span style={{ color: "#1e293b", fontWeight: 500 }}>
          Edit: {pageData.title}
        </span>
      </nav>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          border: "1px solid #e2e8f0",
        }}
      >
        <Box mb={4}>
          <Typography variant="h4" fontWeight={800} color="#1e293b">
            Edit Page Details
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Current Path:{" "}
            <Box
              component="span"
              sx={{ color: "primary.main", fontWeight: 600 }}
            >
              /categories/{categoryId}/{pageData.slug}
            </Box>
          </Typography>
        </Box>

        <Divider sx={{ mb: 5 }} />

        <UpdateCategoryPageForm initialData={pageData} />
      </Paper>
    </Box>
  );
}
