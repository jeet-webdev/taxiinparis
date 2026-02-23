import AdminAppLayout from "@/src/components/common/Layout/AdminAppLayout";
import MuiProvider from "@/src/providers/MuiProvider";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("token");

//   if (!token) {
//     redirect("/login");
//   }

  return (
    <MuiProvider>

    <AdminAppLayout>
      {children}
      </AdminAppLayout>
    </MuiProvider>
  );
}