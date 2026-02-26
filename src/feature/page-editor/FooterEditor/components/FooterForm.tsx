"use client";

import { useState } from "react";
import { FooterData, NavLink, SocialLink } from "../types/footer.types";
import { saveFooterData } from "@/src/app/(admin)/admin/footer-editor/actions";
import { toast } from "react-toastify";
import { Add, Delete, Link as LinkIcon, Share } from "@mui/icons-material";

export default function FooterForm({
  initialData,
}: {
  initialData: FooterData | null;
}) {
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState<FooterData>(
    initialData || {
      title: "TAXI IN PARIS",
      tagline: "Premium Transfer Service",
      copyrightText: "© 2026 Taxi in Paris. All Rights Reserved",
      email: "info@taxiinparis.com",
      phone: "+33 1 45 66 88 12",
      navLinks: [{ label: "About", url: "/about" }],
      socialLinks: [],
      appLinks: [],
      paymentLinks: [],
    },
  );

  // --- Helpers ---
  const addNavLink = () => {
    setFormData({
      ...formData,
      navLinks: [...formData.navLinks, { label: "", url: "" }],
    });
  };

  const removeNavLink = (index: number) => {
    const updatedLinks = formData.navLinks.filter((_, i) => i !== index);
    setFormData({ ...formData, navLinks: updatedLinks });
  };

  const updateNavLink = (
    index: number,
    field: keyof NavLink,
    value: string,
  ) => {
    const updatedLinks = [...formData.navLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setFormData({ ...formData, navLinks: updatedLinks });
  };

  const addSocialLink = () => {
    setFormData({
      ...formData,
      socialLinks: [...formData.socialLinks, { platform: "facebook", url: "" }],
    });
  };

  const removeSocialLink = (index: number) => {
    const updatedLinks = formData.socialLinks.filter((_, i) => i !== index);
    setFormData({ ...formData, socialLinks: updatedLinks });
  };

  // Fixed Generics to prevent the "any" error while keeping logic flat
  const updateSocialLink = <K extends keyof SocialLink>(
    index: number,
    field: K,
    value: SocialLink[K],
  ) => {
    const updatedLinks = [...formData.socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setFormData({ ...formData, socialLinks: updatedLinks });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const res = await saveFooterData(formData);
      if (res.success) toast.success(res.message || "Footer updated!");
      else toast.error(res.message || "Failed to update footer.");
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-8 rounded-xl border shadow-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2 text-gray-800">
            Basic Information
          </h3>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Site Title
            </label>
            <input
              className="w-full p-2 border rounded mt-1 text-gray-900"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Tagline</label>
            <input
              className="w-full p-2 border rounded mt-1 text-gray-900"
              value={formData.tagline}
              onChange={(e) =>
                setFormData({ ...formData, tagline: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Copyright Text
            </label>
            <input
              className="w-full p-2 border rounded mt-1 text-gray-900"
              value={formData.copyrightText}
              onChange={(e) =>
                setFormData({ ...formData, copyrightText: e.target.value })
              }
            />
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2 text-gray-800">
            Contact Details
          </h3>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              className="w-full p-2 border rounded mt-1 text-gray-900"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              className="w-full p-2 border rounded mt-1 text-gray-900"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
        </section>
      </div>

      {/* Navigation Links */}
      <section className="space-y-4 border-t pt-6">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
            <LinkIcon className="text-[#D4AF6A]" /> Navigation Links
          </h3>
          <button
            type="button"
            onClick={addNavLink}
            className="flex items-center gap-1 text-sm bg-green-50 text-green-700 px-3 py-1 rounded-md border border-green-200 hover:bg-green-100 transition"
          >
            <Add fontSize="small" /> Add Link
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {formData.navLinks.map((link, index) => (
            <div
              key={index}
              className="flex flex-wrap md:flex-nowrap items-end gap-3 bg-gray-400/5 p-4 rounded-lg border"
            >
              <div className="flex-1">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Link Label
                </label>
                <input
                  className="w-full p-2 border rounded mt-1 text-sm"
                  value={link.label}
                  onChange={(e) =>
                    updateNavLink(index, "label", e.target.value)
                  }
                />
              </div>
              <div className="flex-[2]">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  URL / Path
                </label>
                <input
                  className="w-full p-2 border rounded mt-1 text-sm"
                  value={link.url}
                  onChange={(e) => updateNavLink(index, "url", e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={() => removeNavLink(index)}
                className="text-red-600 p-2"
              >
                <Delete fontSize="small" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Social Links */}
      <section className="space-y-4 border-t pt-6">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
            <Share className="text-[#D4AF6A]" /> Social Media Links
          </h3>
          <button
            type="button"
            onClick={addSocialLink}
            className="flex items-center gap-1 text-sm bg-green-50 text-green-700 px-3 py-1 rounded-md border border-green-200 hover:bg-green-100 transition"
          >
            <Add fontSize="small" /> Add Social Icon
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {formData.socialLinks.map((social, index) => (
            <div
              key={index}
              className="flex flex-wrap md:flex-nowrap items-end gap-3 bg-gray-50 p-4 rounded-lg border"
            >
              <div className="flex-1">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Platform
                </label>
                {/* <select
                  className="w-full p-2 border rounded mt-1 text-sm"
                  value={social.platform}
                  onChange={(e) =>
                    updateSocialLink(index, "platform", e.target.value as any)
                  }
                > */}
                <select
                  className="w-full p-2 border rounded mt-1 text-sm"
                  value={social.platform}
                  onChange={(e) =>
                    updateSocialLink(
                      index,
                      "platform",
                      e.target.value as SocialLink["platform"], // Cast to the specific union type
                    )
                  }
                >
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="google">Google</option>
                  <option value="email">Email</option>
                </select>
              </div>
              <div className="flex-[2]">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Profile URL
                </label>
                <input
                  className="w-full p-2 border rounded mt-1 text-sm"
                  value={social.url}
                  onChange={(e) =>
                    updateSocialLink(index, "url", e.target.value)
                  }
                />
              </div>
              <button
                type="button"
                onClick={() => removeSocialLink(index)}
                className="text-red-600 p-2"
              >
                <Delete fontSize="small" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="pt-4 border-t">
        <button
          type="submit"
          disabled={isPending}
          className={`bg-[#D4AF6A] text-white px-8 py-3 rounded-lg font-bold w-full md:w-auto ${
            isPending ? "opacity-70 cursor-not-allowed" : "hover:bg-[#b8955a]"
          }`}
        >
          {isPending ? "Saving Changes..." : "Save Footer Configuration"}
        </button>
      </div>
    </form>
  );
}
