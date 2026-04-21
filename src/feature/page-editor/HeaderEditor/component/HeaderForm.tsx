"use client";

import { useState, useRef } from "react";
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
  initialLogoUrl?: string | null;
  initialLogoAlt?: string | null;
  // ── NEW: mobile logo props ──
  initialMobileLogoUrl?: string | null;
  initialMobileLogoAlt?: string | null;
  initialBtnText?: string | null; // ← ADD
  initialBtnLink?: string | null; // ← ADD
  initialShowBtn?: boolean | null; // 1. ADD THIS
  initialHeaderPhone?: string | null; // ← NEW
  initialShowPhone?: boolean | null; // ← NEW
  initialWhatsapp?: string | null;
  initialShowWhatsapp?: boolean | null;
}

export default function HeaderForm({
  initialData,
  initialLogoUrl,
  initialLogoAlt,
  initialMobileLogoUrl,
  initialMobileLogoAlt,
  initialBtnText, // ← ADD
  initialBtnLink, // ← ADD
  initialShowBtn, // 2. ADD THIS
  initialHeaderPhone, // ← NEW
  initialShowPhone, // ← NEW
  initialWhatsapp,
  initialShowWhatsapp,
}: Props) {
  const [navLinks, setNavLinks] = useState<NavLink[]>(() => {
    const hasPrivacy = initialData.some((link) => link.url === "/privacy");
    if (!hasPrivacy) {
      return [
        ...initialData,
        { url: "/privacy", label: "Privacy Policy", showInNav: false },
      ];
    }
    return initialData;
  });

  // ── Desktop logo state ──
  const [logoAlt, setLogoAlt] = useState(initialLogoAlt || "");
  const [logoPreview, setLogoPreview] = useState<string | null>(
    initialLogoUrl || null,
  );
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // ── Mobile logo state ──
  const [mobileLogoAlt, setMobileLogoAlt] = useState(
    initialMobileLogoAlt || "",
  );
  const [mobileLogoPreview, setMobileLogoPreview] = useState<string | null>(
    initialMobileLogoUrl || null,
  );
  const [mobileLogoFile, setMobileLogoFile] = useState<File | null>(null);

  // ── CTA Button state — read from props, not initialData array ──
  const [btnText, setBtnText] = useState(initialBtnText || "Devis en ligne");
  const [btnLink, setBtnLink] = useState(initialBtnLink || "/devis");
  const [showBtn, setShowBtn] = useState(initialShowBtn ?? true);
  const [headerPhone, setHeaderPhone] = useState(initialHeaderPhone || "");
  const [showPhone, setShowPhone] = useState(initialShowPhone ?? true);
  const [whatsapp, setWhatsapp] = useState(initialWhatsapp || "");
  const [showWhatsapp, setShowWhatsapp] = useState(initialShowWhatsapp ?? true);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mobileFileInputRef = useRef<HTMLInputElement>(null);

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
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleMobileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMobileLogoFile(file);
      setMobileLogoPreview(URL.createObjectURL(file));
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
      formData.append("navLinks", JSON.stringify(navLinks));
      formData.append("logoAlt", logoAlt);
      formData.append("btnText", btnText); // ← sends to action
      formData.append("btnLink", btnLink); // ← sends to action
      formData.append("showBtn", String(showBtn));
      formData.append("headerPhone", headerPhone); // ← NEW
      formData.append("showPhone", String(showPhone)); // ← NEW
      formData.append("whatsapp", whatsapp);
      formData.append("showWhatsapp", String(showWhatsapp));
      if (logoFile) formData.append("logoImage", logoFile);

      // ── NEW: append mobile logo fields ──
      formData.append("mobileLogoAlt", mobileLogoAlt);
      if (mobileLogoFile) formData.append("mobileLogoImage", mobileLogoFile);

      const result = await updateHeaderAndLogo(formData);

      if (result.success) {
        toast.success("Header and Logo updated successfully");
        setLogoFile(null);
        setMobileLogoFile(null);
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
          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-[#8B6C26] focus:border-[#8B6C26] outline-none transition-all shadow-sm"
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

  // ── Reusable logo upload block ──
  const LogoUploadBlock = ({
    label,
    badge,
    hint,
    preview,
    altValue,
    altPlaceholder,
    inputRef,
    onFileChange,
    onAltChange,
  }: {
    label: string;
    badge: string;
    hint: string;
    preview: string | null;
    altValue: string;
    altPlaceholder: string;
    inputRef: React.RefObject<HTMLInputElement | null>;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAltChange: (val: string) => void;
  }) => (
    <section>
      <div className="flex items-center gap-3 mb-5">
        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">
          {badge}
        </span>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          {label}
        </h2>
        <span className="text-xs text-slate-400 normal-case tracking-normal font-normal">
          — {hint}
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Current
            </label>
            <div className="h-48 border border-dashed border-slate-200 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden relative">
              {preview ? (
                <div className="relative h-40 w-full p-4">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-contain"
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
              Upload New
            </label>
            <div
              onClick={() => inputRef.current?.click()}
              className="h-48 border-2 border-dashed border-slate-300 rounded-xl hover:border-[#8B6C26] hover:bg-amber-50/30 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group"
            >
              <input
                type="file"
                ref={inputRef}
                hidden
                onChange={onFileChange}
                accept="image/*"
              />
              <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                <CloudUploadIcon className="text-slate-400 group-hover:text-[#8B6C26]" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-600">
                  Click to upload
                </p>
                <p className="text-xs text-slate-400 mt-1">PNG, SVG or JPG</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Alt Text (SEO)
          </label>
          <input
            type="text"
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-[#8B6C26] focus:border-[#8B6C26] outline-none transition-all"
            value={altValue}
            onChange={(e) => onAltChange(e.target.value)}
            placeholder={altPlaceholder}
          />
        </div>
      </div>
    </section>
  );

  return (
    <div className="max-w-5xl mx-auto pb-12 px-6">
      <div className="space-y-12">
        {/* ── Desktop Logo ── */}
        <LogoUploadBlock
          badge="Desktop"
          label="Site Logo — Desktop"
          hint="Shown on screens md and above"
          preview={logoPreview}
          altValue={logoAlt}
          altPlaceholder="e.g. Luxury Limo Paris Company Logo"
          inputRef={fileInputRef}
          onFileChange={handleFileChange}
          onAltChange={setLogoAlt}
        />

        {/* ── Mobile Logo ── */}
        <LogoUploadBlock
          badge="Mobile"
          label="Site Logo — Mobile"
          hint="Shown on small/phone screens only"
          preview={mobileLogoPreview}
          altValue={mobileLogoAlt}
          altPlaceholder="e.g. Luxury Limo Paris Mobile Logo"
          inputRef={mobileFileInputRef}
          onFileChange={handleMobileFileChange}
          onAltChange={setMobileLogoAlt}
        />

        <div className="mt-10">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Header & Footer Settings
          </h1>
        </div>
        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">
              Phone
            </span>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Header Phone Button
            </h2>
            <span className="text-xs text-slate-400 normal-case tracking-normal font-normal">
              — The phone icon shown in the top navigation
            </span>
          </div>

          {/* Toggle */}
          <label className="relative inline-flex items-center cursor-pointer mb-4">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={showPhone}
              onChange={(e) => setShowPhone(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B6C26]" />
            <span className="ms-3 text-sm font-medium text-slate-600">
              {showPhone ? "Enabled" : "Disabled"}
            </span>
          </label>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Phone Number
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-[#8B6C26]/20 focus:border-[#8B6C26] outline-none transition-all"
              value={headerPhone}
              onChange={(e) => setHeaderPhone(e.target.value)}
              placeholder="e.g. +33 1 45 66 88 12"
            />
            <p className="text-xs text-slate-400 mt-2">
              This is separate from the footer phone number.
            </p>
          </div>
        </section>

        {/* ── WhatsApp Button Section ── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded uppercase">
              WhatsApp
            </span>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
           WhatsApp ICON
            </h2>
            {/* <span className="text-xs text-slate-400 normal-case tracking-normal font-normal">
              — The WhatsApp icon shown in the corner of the site, separate from the footer WhatsApp button
            </span> */}
          </div>

          {/* Toggle */}
          <label className="relative inline-flex items-center cursor-pointer mb-4">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={showWhatsapp}
              onChange={(e) => setShowWhatsapp(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B6C26]" />
            <span className="ms-3 text-sm font-medium text-slate-600">
              {showWhatsapp ? "Enabled" : "Disabled"}
            </span>
          </label>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              WhatsApp Link or Number
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-[#8B6C26]/20 focus:border-[#8B6C26] outline-none transition-all"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="e.g. https://wa.me/+33184190997"
            />
            <p className="text-xs text-slate-400 mt-2">
              Enter a full wa.me link or just the phone number with country code
            </p>
          </div>
        </section>

        {/* ── CTA Button Section ── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded uppercase">
              CTA
            </span>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Header Button
            </h2>

            <span className="text-xs text-slate-400 normal-case tracking-normal font-normal">
              — The button shown in the top navigation
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={showBtn}
              onChange={(e) => setShowBtn(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B6C26]"></div>
            <span className="ms-3 text-sm font-medium text-slate-600">
              {showBtn ? "Enabled" : "Disabled"}
            </span>
          </label>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Button Text
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-[#8B6C26]/20 focus:border-[#8B6C26] outline-none transition-all"
                value={btnText}
                onChange={(e) => setBtnText(e.target.value)}
                placeholder="e.g. Devis en ligne"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Button Link
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-[#8B6C26] focus:border-[#8B6C26] outline-none transition-all"
                value={btnLink}
                onChange={(e) => setBtnLink(e.target.value)}
                placeholder="e.g. /devis or https://..."
              />
            </div>
          </div>
        </section>

        {/* Navigation Sections */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="px-2 py-1 bg-[#8B6C26]/10 text-[#8B6C26] text-[10px] font-bold rounded uppercase">
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
            className="flex items-center gap-3 bg-[#8B6C26] hover:bg-[#a88435] disabled:bg-slate-300 text-white font-bold px-10 py-4 rounded-xl shadow-lg transition-all active:scale-95"
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
