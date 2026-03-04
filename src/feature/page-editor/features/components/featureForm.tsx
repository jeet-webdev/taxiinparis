// "use client";
// import React, { useState, useTransition, useRef } from "react";
// import {
//   saveFeatureAction,
//   deleteFeatureAction,
// } from "@/src/actions/featureAction";
// import { FeatureItem, MainTitleObject } from "../types/feature.types";

// export function FeatureForm({
//   initialFeatures,
// }: {
//   initialFeatures: FeatureItem[];
// }) {
//   const [editingItem, setEditingItem] = useState<FeatureItem | null>(null);
//   const [isPending, startTransition] = useTransition();
//   const formRef = useRef<HTMLFormElement>(null);

//   // This handles the form submission via the Server Action
//   const clientAction = async (formData: FormData) => {
//     startTransition(async () => {
//       const result = await saveFeatureAction(formData);
//       if (result?.success) {
//         // Success: Clear the form and the editing state
//         setEditingItem(null);
//         formRef.current?.reset();
//       } else if (result?.error) {
//         alert(result.error);
//       }
//     });
//   };

//   const handleEdit = (item: FeatureItem) => {
//     setEditingItem(item);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id: number) => {
//     if (confirm("Are you sure you want to delete this feature?")) {
//       startTransition(async () => {
//         await deleteFeatureAction(id);
//       });
//     }
//   };
//   const mainTitleValue =
//     (initialFeatures[0]?.mainTitle as unknown as MainTitleObject)?.text || "";

//   return (
//     <div className="space-y-10">
//       <div>
//         <label className="block text-sm font-bold text-gray-700 mb-1">
//           Main Section Heading
//         </label>
//         <input
//           name="mainTitle"
//           key={editingItem ? "edit-mt" : "new-mt"} // Forces re-render of default value
//           defaultValue={
//             (initialFeatures[0]?.mainTitle as unknown as MainTitleObject)
//               ?.text || ""
//           }
//           className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
//           placeholder="e.g., Why Choose Luxberri"
//         />
//       </div>

//       {/* FORM SECTION */}
//       <form
//         ref={formRef}
//         action={clientAction}
//         className={`bg-white p-8 rounded-xl border shadow-sm space-y-6 transition-opacity ${
//           isPending ? "opacity-50 pointer-events-none" : "opacity-100"
//         }`}
//       >
//         <h2 className="text-xl font-bold text-orange-600">
//           {editingItem ? "Edit Feature" : "Add New Feature"}
//         </h2>

//         {/* Hidden ID field: Essential for the UPDATE logic to work */}
//         <input type="hidden" name="id" value={editingItem?.id || ""} />

//         <div className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-bold text-gray-700 mb-1">
//                 Card Title
//               </label>
//               <input
//                 name="title"
//                 key={editingItem?.id + "-title"}
//                 defaultValue={editingItem?.title || ""}
//                 className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-bold text-gray-700 mb-1">
//                 Select Icon
//               </label>
//               <select
//                 name="iconType"
//                 key={editingItem?.id + "-icon"}
//                 defaultValue={editingItem?.iconType || "DirectionsCarIcon"}
//                 className="w-full p-3 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-orange-500"
//               >
//                 <option value="DiamondIcon">💎 Premium/VIP Service</option>
//                 <option value="CelebrationIcon">🎉 Events & Weddings</option>
//                 <option value="GroupsIcon">👥 Group Travel/Vans</option>
//                 <option value="WorkIcon">🏢 Corporate/Executive</option>
//                 <option value="ExploreIcon">🌐 Global/International</option>
//                 <option value="MapIcon">📍 Route/Destination</option>
//                 <option value="LanguageIcon">🌍 Multilingual Chauffeur</option>
//                 <option value="DirectionsCarIcon">🚗 Luxury Car</option>
//                 <option value="FlightIcon">✈️ Airport Transfer</option>
//                 <option value="SecurityIcon">🛡️ Security/Safety</option>
//                 <option value="WifiIcon">📶 Free Onboard Wi-Fi</option>
//                 <option value="LuggageIcon">🧳 Luggage Assistance</option>
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-bold text-gray-700 mb-1">
//               Button Label (e.g., Book Now)
//             </label>
//             <input
//               name="buttonText"
//               key={editingItem?.id + "-btn"}
//               defaultValue={editingItem?.buttonText || "Book Now"}
//               className="w-full p-3 border rounded-lg border-orange-100 bg-orange-50 focus:ring-2 focus:ring-orange-500 outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-bold text-gray-700 mb-1">
//               Description
//             </label>
//             <textarea
//               name="description"
//               key={editingItem?.id + "-desc"}
//               defaultValue={editingItem?.description || ""}
//               className="w-full p-3 border rounded-lg h-32 outline-none focus:ring-2 focus:ring-orange-500"
//               required
//             />
//           </div>
//         </div>

//         <div className="flex gap-3">
//           <button
//             type="submit"
//             disabled={isPending}
//             className="flex-1 bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 transition-colors"
//           >
//             {isPending
//               ? "Processing..."
//               : editingItem
//                 ? "Update Feature"
//                 : "Save to Database"}
//           </button>

//           {editingItem && (
//             <button
//               type="button"
//               onClick={() => {
//                 setEditingItem(null);
//                 formRef.current?.reset();
//               }}
//               className="px-6 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {/* LIST SECTION */}
//       <div className="space-y-4">
//         <h2 className="text-xl font-bold text-gray-800">Current Features</h2>
//         <div className="grid gap-4">
//           {initialFeatures.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white p-5 rounded-xl border flex justify-between items-center shadow-sm hover:border-orange-200 transition-colors"
//             >
//               <div>
//                 <h3 className="font-bold text-gray-900">{item.title}</h3>
//                 <p className="text-xs text-gray-500 uppercase tracking-wide">
//                   {item.iconType} | Button: {item.buttonText || "Book Now"}
//                 </p>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleEdit(item)}
//                   className="px-4 py-2 text-sm font-bold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(item.id)}
//                   className="px-4 py-2 text-sm font-bold text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
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

  // Derive the current heading from the first item in the list
  const currentMainHeading =
    (initialFeatures[0]?.mainTitle as unknown as MainTitleObject)?.text || "";

  const clientAction = async (formData: FormData) => {
    startTransition(async () => {
      const result = await saveFeatureAction(formData);
      if (result?.success) {
        setEditingItem(null);
        formRef.current?.reset();
      } else if (result?.error) {
        alert(result.error);
      }
    });
  };

  const handleEdit = (item: FeatureItem) => {
    setEditingItem(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this feature?")) {
      startTransition(async () => {
        await deleteFeatureAction(id);
      });
    }
  };

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

        {/* --- SECTION 1: MAIN HEADING (SHARED) --- */}
        <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300 mb-8">
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Main Section Heading (Why Choose Us Title)
          </label>
          <input
            name="mainTitle"
            // The key forces the input to update when server data changes
            key={`heading-${currentMainHeading}`}
            defaultValue={currentMainHeading}
            className="w-full p-3 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-orange-500 font-medium"
            placeholder="e.g., Why Choose Luxberri"
          />
          <p className="text-xs text-gray-400 mt-1 italic">
            Note: This heading updates globally for the entire section.
          </p>
        </div>

        <hr className="border-gray-100" />

        {/* --- SECTION 2: FEATURE CARDS --- */}
        <h3 className="text-lg font-bold text-gray-800">
          {editingItem ? "Edit Feature Card" : "Add New Feature Card"}
        </h3>

        {/* Hidden ID field: Essential for UPDATE logic */}
        <input type="hidden" name="id" value={editingItem?.id || ""} />

        <div className="space-y-4">
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
                <option value="CelebrationIcon">🎉 Events & Weddings</option>
                <option value="GroupsIcon">👥 Group Travel/Vans</option>
                <option value="WorkIcon">🏢 Corporate/Executive</option>
                <option value="ExploreIcon">🌐 Global/International</option>
                <option value="MapIcon">📍 Route/Destination</option>
                <option value="LanguageIcon">🌍 Multilingual Chauffeur</option>
                <option value="DirectionsCarIcon">🚗 Luxury Car</option>
                <option value="FlightIcon">✈️ Airport Transfer</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Button Label
            </label>
            <input
              name="buttonText"
              key={editingItem ? `edit-btn-${editingItem.id}` : "new-btn"}
              defaultValue={editingItem?.buttonText || "Book Now"}
              className="w-full p-3 border rounded-lg border-orange-100 bg-orange-50 focus:ring-2 focus:ring-orange-500 outline-none"
            />
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
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 bg-[#D4AF6A] text-white font-bold py-3 rounded-lg hover:bg-[#ecbe69] disabled:bg-gray-400 transition-colors"
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
              className="px-6 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* --- LIST SECTION --- */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Current Features</h2>
        <div className="grid gap-4">
          {initialFeatures.length === 0 ? (
            <p className="text-gray-500 italic">
              No features found. Add one above.
            </p>
          ) : (
            initialFeatures.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-xl border flex justify-between items-center shadow-sm hover:border-orange-200 transition-colors"
              >
                <div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    {item.iconType} | Button: {item.buttonText || "Book Now"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-4 py-2 text-sm font-bold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
