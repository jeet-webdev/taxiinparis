import AppLayout from "@/src/components/common/Layout/AppLayout";
import TawkTo from "@/src/components/common/Layout/TawkTo";
import WhatsAppButton from "@/src/components/common/Layout/WhatsAppButton";
import { headers } from "next/headers";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();

  // ✅ Reliable: read the custom header set by middleware
  const isMaintenance = h.get("x-is-maintenance") === "1";

  if (isMaintenance) {
    return <>{children}</>;
  }

  return (
    <AppLayout>
      {children}
      <WhatsAppButton />
      <TawkTo />
    </AppLayout>
  );
}
