import AdminAppLayout from "@/src/components/common/Layout/AdminAppLayout";
import MuiProvider from "@/src/providers/MuiProvider";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/src/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionId = (await cookies()).get("admin_session")?.value;

  // No cookie
  if (!sessionId) {
    redirect("/login");
  }

  // 🔍 Check session in DB
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { account: true },
  });

  //  Invalid / expired / not admin
  if (
    !session ||
    session.expiresAt < new Date() ||
    session.account.role !== "ADMIN"
  ) {
    redirect("/login");
  }

  return (
    <MuiProvider>
      <AdminAppLayout>{children}</AdminAppLayout>
    </MuiProvider>
  );
}
