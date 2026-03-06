import AppLayout from "@/src/components/common/Layout/AppLayout";
import TawkTo from "@/src/components/common/Layout/TawkTo";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout>
      {children}
      <TawkTo />
    </AppLayout>
  );
}
