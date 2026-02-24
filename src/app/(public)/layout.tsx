import AppLayout from "@/src/components/common/Layout/AppLayout";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  );
}