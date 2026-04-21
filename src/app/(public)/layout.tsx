import AppLayout from "@/src/components/common/Layout/AppLayout";
import DisableRightClick from "@/src/components/common/Layout/DisableRightClick";
import TawkTo from "@/src/components/common/Layout/TawkTo";
import WhatsAppButton from "@/src/components/common/Layout/WhatsAppButton";
// import WhatsAppButton from "@/src/components/common/Layout/WhatsAppButton";
import { headers } from "next/headers";
import { getHeaderData } from "@/src/app/(admin)/admin/header-editor/actions";

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

  // Fetch site header/footer settings to decide whether to show WhatsApp
  const data = await getHeaderData();
  const showWhatsapp = (data as any)?.showWhatsapp;
  const whatsapp = (data as any)?.whatsapp;

  return (
    <div className="public-section">
      <DisableRightClick />
      <AppLayout>
        {children}
        {showWhatsapp ? <WhatsAppButton phone={whatsapp ?? undefined} /> : null}
      </AppLayout>
    </div>
  );
}
