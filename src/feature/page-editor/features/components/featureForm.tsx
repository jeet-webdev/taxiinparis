"use client";
import React, { useState, useTransition, useRef } from "react";
import {
  saveFeatureAction,
  deleteFeatureAction,
} from "@/src/actions/featureAction";
import { FeatureItem, MainTitleObject } from "../types/feature.types";

export function FeatureForm({
  initialFeatures,
}: {
  initialFeatures: FeatureItem[];
}) {
  const [editingItem, setEditingItem] = useState<FeatureItem | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const currentMainHeading =
    (initialFeatures[0]?.mainTitle as unknown as MainTitleObject)?.text || "";

  const clientAction = async (formData: FormData) => {
    startTransition(async () => {
      const result = await saveFeatureAction(formData);
      if (result?.success) {
        setEditingItem(null);
        setOpenInNewTab(false);
        formRef.current?.reset();
      } else if (result?.error) {
        alert(result.error);
      }
    });
  };
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this feature?")) {
      startTransition(async () => {
        const result = await deleteFeatureAction(id);
        if (result?.error) {
          alert(result.error);
        }
      });
    }
  };
  const handleEdit = (item: FeatureItem) => {
    setEditingItem(item);
    setOpenInNewTab(item.openInNewTab ?? false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [openInNewTab, setOpenInNewTab] = useState<boolean>(
    editingItem?.openInNewTab ?? false,
  );
  return (
    <div className="space-y-10">
      <form
        ref={formRef}
        action={clientAction}
        className={`bg-white p-8 rounded-xl border shadow-sm space-y-6 transition-opacity ${
          isPending ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <h2 className="text-xl font-bold text-[#D4AF6A]">
          Manage Feature Section
        </h2>

        <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300 mb-8">
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Main Section Heading
          </label>
          <input
            name="mainTitle"
            key={`heading-${currentMainHeading}`}
            defaultValue={currentMainHeading}
            className="w-full p-3 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g., Why Choose Luxberri"
          />
        </div>

        <hr className="border-gray-100" />
        <h3 className="text-lg font-bold text-gray-800">
          {editingItem ? "Edit Feature Card" : "Add New Feature Card"}
        </h3>
        <input type="hidden" name="id" value={editingItem?.id || ""} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Card Title
            </label>
            <input
              name="title"
              key={editingItem ? `edit-title-${editingItem.id}` : "new-title"}
              defaultValue={editingItem?.title || ""}
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#D4AF6A]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Select Icon
            </label>
            <select
              name="iconType"
              key={editingItem ? `edit-icon-${editingItem.id}` : "new-icon"}
              defaultValue={editingItem?.iconType || "DirectionsCarIcon"}
              className="w-full p-3 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-[#D4AF6A]"
            >
              <option value="DiamondIcon">💎 Premium/VIP Service</option>
              <option value="WorkIcon">💼 Corporate/Executive</option>
              <option value="BusinessCenterIcon">🏢 Business Center</option>
              <option value="DirectionsCarIcon">🚗 Luxury Car</option>
              <option value="LocalTaxiIcon">🚕 Local Taxi</option>
              {/* Travel & Logistics */}
              <option value="FlightIcon">✈️ Flight Icon</option>
              <option value="LuggageIcon">🌐 Language / Globe</option>
              <option value="GroupsIcon">👥 Group Travel/Vans</option>
              <option value="AccessTimeIcon">⌚ Punctuality/Hourly</option>
              {/* Navigation & Exploration */}
              <option value="ExploreIcon">🔎 Explore/Discovery</option>
              <option value="MapIcon">🗺️ Route/Destination</option>
              <option value="LanguageIcon">🌐 International/Language</option>
              {/* Safety & Support */}
              <option value="SecurityIcon">🛡️ Secure Travel</option>
              <option value="VerifiedUserIcon">✅ Verified Chauffeur</option>
              <option value="SupportAgentIcon">🎧 24/7 Support</option>

              {/* Events & Extras */}
              <option value="CelebrationIcon">🎉 Events & Weddings</option>
              <option value="WineBarIcon">🍷 Night Out/Bar</option>
              <option value="WifiIcon">📶 Free Wi-Fi</option>
              <option value="CreditCardIcon">💳 Easy Payment</option>
              <option value="NotificationsActiveIcon">
                🔔 Real-time Alerts
              </option>
              <option value="PersonIcon">👤 Personal Driver</option>
              {/* ... other options same as before */}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Button Text
            </label>
            <input
              name="buttonText"
              key={editingItem ? `edit-btn-${editingItem.id}` : "new-btn"}
              defaultValue={editingItem?.buttonText || "Book Now"}
              className="w-full p-3 border rounded-lg border-orange-100 bg-orange-50 focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Button URL (Link)
            </label>
            <input
              name="buttonLink"
              key={editingItem ? `edit-link-${editingItem.id}` : "new-link"}
              defaultValue={
                editingItem?.buttonLink ||
                "https://portail.driverconnect.fr/vtc-fils/template?DS=1&tkn=00001_3739617_-1157023572_1769256160266"
              }
              className="w-full p-3 border rounded-lg border-orange-100 bg-orange-50 focus:ring-2 focus:ring-orange-500"
              placeholder="https://portail.driverconnect.fr/vtc-fils/template?DS=1&tkn=00001_3739617_-1157023572_1769256160266"
            />
          </div>
          {/* Open in New Tab Toggle */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
            <input
              type="hidden"
              name="openInNewTab"
              value={openInNewTab ? "true" : "false"}
            />
            <button
              type="button"
              onClick={() => setOpenInNewTab(!openInNewTab)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                openInNewTab ? "bg-[#D4AF6A]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-300 ${
                  openInNewTab ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <div>
              <p className="text-sm font-bold text-gray-700">Open in New Tab</p>
              <p className="text-xs text-gray-400">
                {openInNewTab
                  ? "Link opens in a new tab"
                  : "Link opens in same tab"}
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            key={editingItem ? `edit-desc-${editingItem.id}` : "new-desc"}
            defaultValue={editingItem?.description || ""}
            className="w-full p-3 border rounded-lg h-32 outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 bg-[#D4AF6A] text-white font-bold py-3 rounded-lg hover:bg-[#ecbe69] disabled:bg-gray-400"
          >
            {isPending
              ? "Processing..."
              : editingItem
                ? "Update Feature"
                : "Save to Database"}
          </button>
          {editingItem && (
            <button
              type="button"
              onClick={() => {
                setEditingItem(null);
                formRef.current?.reset();
              }}
              className="px-6 bg-gray-200 text-gray-700 font-bold rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Current Features</h2>
        <div className="grid gap-4">
          {initialFeatures.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-xl border flex justify-between items-center shadow-sm"
            >
              <div>
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="text-xs text-blue-500 truncate max-w-xs">
                  {item.buttonLink}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-4 py-2 text-sm font-bold text-[#D4AF6A] border border-[#D4AF6A] rounded-lg hover:bg-[#D4AF6A]-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-4 py-2 text-sm font-bold text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
