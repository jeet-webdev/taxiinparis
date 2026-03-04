"use client";

import React from "react";
import Link from "next/link";
import { Pagination, PaginationItem } from "@mui/material";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface BlogPaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function BlogPagination({ totalPages, currentPage }: BlogPaginationProps) {
  return (
    <div className="mt-16 flex justify-center">
      <Pagination
        count={totalPages}
        page={currentPage}
        variant="outlined"
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            slots={{
              previous: MdChevronLeft,
              next: MdChevronRight,
            }}
            component={Link}
            // Logic to keep the URL clean
            href={`/blog${item.page === 1 ? "" : `?page=${item.page}`}`}
            {...item}
            sx={{
              color: "#d4af6a",
              borderColor: "rgba(212, 175, 106, 0.3)",
              "&.Mui-selected": {
                backgroundColor: "#d4af6a",
                color: "#292d37",
                "&:hover": {
                  backgroundColor: "#c19b5a",
                },
              },
              "&:hover": {
                borderColor: "#d4af6a",
                backgroundColor: "rgba(212, 175, 106, 0.1)",
              },
              "& .MuiPaginationItem-icon": {
                fontSize: "1.5rem",
              },
            }}
          />
        )}
      />
    </div>
  );
}