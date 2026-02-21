
import AdminLoginForm from "@/src/feature/adminlogin/components/AdminLoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | Admin Panel",
  description: "Login to access admin dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return <AdminLoginForm />;
}