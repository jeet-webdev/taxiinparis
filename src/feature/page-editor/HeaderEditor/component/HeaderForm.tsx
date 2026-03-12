"use client";

import { useState, useRef } from "react";
// Import the new action we discussed
import { updateHeaderAndLogo } from "@/src/app/(admin)/admin/header-editor/actions";
import { NavLink } from "../types/header.types";
import { toast } from "react-toastify";

// MUI Components & Icons
import SaveIcon from "@mui/icons-material/Save";
import LinkIcon from "@mui/icons-material/Link";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";

interface Props {
  initialData: NavLink[];
  initialLogoUrl?: string | null; // Matches your schema
  initialLogoAlt?: string | null; // Matches your schema
}

export default function HeaderForm({
  initialData,
  initialLogoUrl,
  initialLogoAlt,
}: Props) {
  // const [navLinks, setNavLinks] = useState<NavLink[]>(initialData);
  const [navLinks, setNavLinks] = useState<NavLink[]>(() => {
    const hasPrivacy = initialData.some((link) => link.url === "/privacy");

    if (!hasPrivacy) {
      return [
        ...initialData,
        {
          url: "/privacy",
          label: "Privacy Policy",
          showInNav: false, // Match the NavLink interface requirement
        },
      ];
    }
    return initialData;
  });
  const [logoAlt, setLogoAlt] = useState(initialLogoAlt || "");
  const [logoPreview, setLogoPreview] = useState<string | null>(
    initialLogoUrl || null,
  );
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const mainNav = navLinks.filter((link) => link.url !== "/terms");
  // const footerOnly = navLinks.filter((link) => link.url === "/terms");
  const mainNav = navLinks.filter(
    (link) => link.url !== "/terms" && link.url !== "/privacy",
  );

  const footerOnly = navLinks.filter(
    (link) => link.url === "/terms" || link.url === "/privacy",
  );
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      // Create temporary URL for previewing before upload
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const updateNavLink = (url: string, value: string) => {
    setNavLinks((prev) =>
      prev.map((link) => (link.url === url ? { ...link, label: value } : link)),
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();

      // 1. Add Navigation Links as a JSON string
      formData.append("navLinks", JSON.stringify(navLinks));

      // 2. Add Alt Text
      formData.append("logoAlt", logoAlt);

      // 3. Add File only if a new one was selected
      if (logoFile) {
        formData.append("logoImage", logoFile); // Note: Server action looks for "logoImage" key
      }

      // Call the server action
      const result = await updateHeaderAndLogo(formData);

      if (result.success) {
        toast.success("Header and Logo updated successfully");
        setLogoFile(null); // Clear the file state as it's now saved
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  const RenderRow = (link: NavLink) => (
    <div
      key={link.url}
      className="grid grid-cols-12 gap-6 px-6 py-4 items-center hover:bg-slate-50/50 transition-colors"
    >
      <div className="col-span-7">
        <input
          type="text"
          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-[#D4AF6A]/20 focus:border-[#D4AF6A] outline-none transition-all shadow-sm"
          value={link.label}
          onChange={(e) => updateNavLink(link.url, e.target.value)}
          placeholder="Link Label"
        />
      </div>
      <div className="col-span-5">
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-500">
          <div className="flex items-center gap-2 overflow-hidden">
            <LinkIcon sx={{ fontSize: 16, color: "#94a3b8" }} />
            <span className="text-xs font-mono truncate uppercase tracking-tight">
              {link.url}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto pb-12 px-6">
      {/* <div className="mb-10 pt-6 border-b border-slate-100 pb-6 text-left">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          Header & Footer Settings
        </h1>
      </div> */}

      <div className="space-y-12">
        {/* Section: Logo Upload */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">
              Asset
            </span>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Site Logo
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Current Logo
                </label>
                <div className="h-48 border border-dashed border-slate-200 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden relative">
                  {logoPreview ? (
                    <div className="relative h-40 w-full p-4">
                      {" "}
                      {/* 2. Responsive Container */}
                      <Image
                        src={logoPreview}
                        alt="Preview"
                        fill // 3. The magic layout prop
                        className="object-contain" // 4. Handles the object-fit
                        // 5. Optional but recommended for dynamic previews
                        unoptimized={true}
                      />
                    </div>
                  ) : (
                    <span className="text-slate-400 text-sm">
                      No Image Selected
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Upload New Logo
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="h-48 border-2 border-dashed border-slate-300 rounded-xl hover:border-[#D4AF6A] hover:bg-amber-50/30 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                    <CloudUploadIcon className="text-slate-400 group-hover:text-[#D4AF6A]" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-slate-600">
                      Click to upload
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      PNG, SVG or JPG
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Logo Alt Text (SEO)
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-[#D4AF6A]/20 focus:border-[#D4AF6A] outline-none transition-all"
                value={logoAlt}
                onChange={(e) => setLogoAlt(e.target.value)}
                placeholder="e.g. Luxury Limo Paris Company Logo"
              />
            </div>
          </div>
        </section>
        <div className="mt-10 ">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Header & Footer Settings
          </h1>
        </div>

        {/* Navigation Sections */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="px-2 py-1 bg-[#D4AF6A]/10 text-[#D4AF6A] text-[10px] font-bold rounded uppercase">
              Primary
            </span>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Navigation Menu
            </h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-12 gap-6 px-6 py-3 bg-slate-50/80 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <div className="col-span-7">Name</div>
              <div className="col-span-5">Path</div>
            </div>
            <div className="divide-y divide-slate-100">
              {mainNav.map(RenderRow)}
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="px-2 py-1 bg-slate-100 text-slate-400 text-[10px] font-bold rounded uppercase">
              Secondary
            </span>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="divide-y divide-slate-100">
              {footerOnly.map(RenderRow)}
            </div>
          </div>
        </section>

        <div className="pt-8 border-t border-slate-100 flex justify-start">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-3 bg-[#D4AF6A] hover:bg-[#C19B58] disabled:bg-slate-300 text-white font-bold px-10 py-4 rounded-xl shadow-lg transition-all active:scale-95"
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <SaveIcon />
            )}
            {loading ? "Saving Changes..." : "Save All Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
