import { getHeaderData } from "./actions";
import HeaderForm from "@/src/feature/page-editor/HeaderEditor/component/HeaderForm";
import { NavLink } from "@/src/feature/page-editor/HeaderEditor/types/header.types";

export default async function HeaderEditor() {
  const data = await getHeaderData();

  // ✅ TS 5 Safe Casting for Navigation
  const navLinks: NavLink[] =
    data && Array.isArray(data.navLinks)
      ? (data.navLinks as unknown as NavLink[])
      : [];

  return (
    <div className="p-10 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-800">Header Editor</h1>
      </div>

      {/* ADD THESE PROPS: 
          We pass the logoUrl and logoAlt so the form can 
          show the "Current Logo" preview on load.
      */}
      <HeaderForm
        initialData={navLinks}
        initialLogoUrl={data?.logoUrl}
        initialLogoAlt={data?.logoAlt}
        initialMobileLogoUrl={data?.mobileLogoUrl}
        initialMobileLogoAlt={data?.mobileLogoAlt}
        initialBtnText={data?.btnText} // ← ADD
        initialBtnLink={data?.btnLink} // ← ADD
      />
    </div>
  );
}
