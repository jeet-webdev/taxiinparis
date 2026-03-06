"use client";

import { useState } from "react";
import { FooterData, NavLink, SocialLink } from "../types/footer.types";
import { saveFooterData } from "@/src/app/(admin)/admin/footer-editor/actions";
import { toast } from "react-toastify";
import { Add, Delete, Link as LinkIcon, Share } from "@mui/icons-material";
import Image from "next/image";

const SOCIAL_PLATFORMS: SocialLink["platform"][] = [
  "facebook",
  "x",
  "linkedin",
  "pinterest",
  "email",
  "instagram",
  "tiktok",
  "youtube",
  "whatsapp",
];
const APP_ICONS = {
  google_play: "/assets/images/google-play-store.png",
  app_store: "/assets/images/app-store-1.png",
};

const PAYMENT_ICONS = {
  visa: "/assets/images/visacard.svg",
  mastercard: "/assets/images/mastercard1.svg",
  amex: "/assets/images/amex-3.svg",
  paypal: "/assets/images/paypal3.svg",
  applepay: "/assets/images/applepay.svg",
  gpay: "/assets/images/gpay.svg",
};

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
      address: "Paris France",
      navLinks: [
        { label: "Home", url: "/" },
        { label: "About Us", url: "/about" },
        { label: "Services", url: "/services" },
        { label: "Blog", url: "/blog" },
        { label: "Contact Us", url: "/contact" },
      ],
      socialLinks: [],

      appLinks: [
        { platform: "app_store", url: "", isVisible: true },
        { platform: "google_play", url: "", isVisible: true },
      ],
      paymentLinks: [
        { method: "visa", isVisible: true },
        { method: "mastercard", isVisible: true },
        { method: "amex", isVisible: true },
      ],
    },
  );

  const updateNavLink = (
    index: number,
    field: keyof NavLink,
    value: string,
  ) => {
    const updatedLinks = [...formData.navLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setFormData({ ...formData, navLinks: updatedLinks });
  };

  // const addSocialLink = () => {
  //   const usedPlatforms = formData.socialLinks.map((s) => s.platform);
  //   const availablePlatform = SOCIAL_PLATFORMS.find(
  //     (platform) => !usedPlatforms.includes(platform),
  //   );

  //   if (!availablePlatform) {
  //     toast.info("All social platforms already added.");
  //     return;
  //   }

  //   setFormData({
  //     ...formData,
  //     socialLinks: [
  //       ...formData.socialLinks,
  //       { platform: availablePlatform, url: "" },
  //     ],
  //   });
  // };
  const addSocialLink = () => {
    // 1. Find which platforms are already in use
    const usedPlatforms = formData.socialLinks.map((s) => s.platform);

    // 2. Find the first platform from our list that isn't used yet
    const availablePlatform = SOCIAL_PLATFORMS.find(
      (platform) => !usedPlatforms.includes(platform),
    );

    if (!availablePlatform) {
      toast.info("All available social platforms have been added.");
      return;
    }

    // 3. Append the new link to the state
    setFormData({
      ...formData,
      socialLinks: [
        ...formData.socialLinks,
        { platform: availablePlatform, url: "" },
      ],
    });
  };

  const updateSocialLink = <K extends keyof SocialLink>(
    index: number,
    field: K,
    value: SocialLink[K],
  ) => {
    const updatedLinks = [...formData.socialLinks];

    // Update the specific field (platform or url) for the item at 'index'
    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: value,
    };

    setFormData({ ...formData, socialLinks: updatedLinks });
  };
  const removeSocialLink = (index: number) => {
    const updatedLinks = formData.socialLinks.filter((_, i) => i !== index);
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
            <label className="text-sm font-medium text-gray-700">
              Subheading
            </label>
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
          <div>
            <label className="text-sm font-medium text-gray-700">
              {" "}
              Service
            </label>
            <textarea
              className="w-full p-2 border rounded mt-1 text-gray-900 text-sm"
              rows={3}
              value={formData.address}
              placeholder="123 Street, City, Country"
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
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

      {/* Social Links */}
      <section className="space-y-4 border-t pt-6">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
            <Share className="text-[#D4AF6A]" /> Social Media Links
          </h3>

          <button
            type="button"
            onClick={addSocialLink}
            disabled={formData.socialLinks.length >= SOCIAL_PLATFORMS.length}
            className="flex items-center gap-1 text-sm bg-green-50 text-green-700 px-3 py-1 rounded-md border border-green-200 hover:bg-green-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Add fontSize="small" /> Add Social Icon
          </button>
        </div>

        {formData.socialLinks.length === 0 && (
          <p className="text-sm text-gray-400">No social links added yet.</p>
        )}

        <div className="grid grid-cols-1 gap-4">
          {formData.socialLinks.map((social, index) => {
            const selectedPlatforms = formData.socialLinks.map(
              (s) => s.platform,
            );

            return (
              <div
                key={index}
                className="flex flex-wrap md:flex-nowrap items-end gap-3 bg-gray-50 p-4 rounded-lg border"
              >
                {/* Platform Select */}
                <div className="flex-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Platform
                  </label>

                  <select
                    className="w-full p-2 border rounded mt-1 text-sm"
                    value={social.platform}
                    onChange={(e) =>
                      updateSocialLink(
                        index,
                        "platform",
                        e.target.value as SocialLink["platform"],
                      )
                    }
                  >
                    {SOCIAL_PLATFORMS.filter(
                      (platform) =>
                        !selectedPlatforms.includes(platform) ||
                        platform === social.platform,
                    ).map((platform) => (
                      <option key={platform} value={platform}>
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* URL Input */}
                <div className="flex-[2]">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Profile URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/profile"
                    className="w-full p-2 border rounded mt-1 text-sm"
                    value={social.url}
                    onChange={(e) =>
                      updateSocialLink(index, "url", e.target.value)
                    }
                  />
                </div>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => removeSocialLink(index)}
                  className="text-red-600 p-2 hover:bg-red-50 rounded-md transition"
                >
                  <Delete fontSize="small" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-6">
        {/* App Links Column */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase">
            Mobile Store Badges
          </h4>
          {formData.appLinks.map((link, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border"
            >
              <Image
                src={APP_ICONS[link.platform]}
                alt={link.platform}
                width={48} // Matches w-12 (12 * 4px)
                height={48} // Matches h-12
                className="object-contain"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-600 uppercase">
                    {link.platform.replace("_", " ")}
                  </span>
                  {/* <input
                    type="checkbox"
                    checked={link.isVisible}
                    onChange={(e) => {
                      const updated = [...formData.appLinks];
                      updated[index].isVisible = e.target.checked;
                      setFormData({ ...formData, appLinks: updated });
                    }}
                  /> */}
                </div>
                <input
                  className="w-full p-1 border rounded text-xs"
                  value={link.url}
                  placeholder="Store URL"
                  onChange={(e) => {
                    const updated = [...formData.appLinks];
                    updated[index].url = e.target.value;
                    setFormData({ ...formData, appLinks: updated });
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Payment Links Column */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase">
            Payment Provider Icons
          </h4>
          {formData.paymentLinks.map((link, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border"
            >
              <Image
                src={PAYMENT_ICONS[link.method]}
                alt={link.method}
                width={48}
                height={48}
                className="object-contain"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-600 uppercase">
                    {link.method}
                  </span>
                  <input
                    type="checkbox"
                    checked={link.isVisible}
                    onChange={(e) => {
                      const updated = [...formData.paymentLinks];
                      updated[index].isVisible = e.target.checked;
                      setFormData({ ...formData, paymentLinks: updated });
                    }}
                  />
                </div>
              </div>
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
