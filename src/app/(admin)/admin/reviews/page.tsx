// "use client";

// import {
//   refreshGoogleReviews,
//   RefreshResponse,
// } from "@/src/actions/refresh-reviews";
// import { useState } from "react";

// export default function AdminReviewPage() {
//   const [loading, setLoading] = useState<boolean>(false);

//   async function handleSync(): Promise<void> {
//     setLoading(true);

//     const res: RefreshResponse = await refreshGoogleReviews();

//     if (res.success) {
//       alert(res.message);
//     } else {
//       alert(res.message);
//     }

//     setLoading(false);
//   }

//   return (
//     <div className="p-10">
//       <div className="max-w-md bg-white border border-gray-100 p-8 rounded-3xl shadow-sm">
//         <h1 className="text-2xl font-bold text-gray-800 mb-2">Google Sync</h1>
//         <p className="text-gray-500 text-sm mb-8">
//           Update the website with the newest 5-star reviews from your Google
//           Business Profile.
//         </p>

//         <button
//           onClick={handleSync}
//           disabled={loading}
//           className={`w-full py-4 rounded-2xl font-bold transition-all shadow-lg ${
//             loading
//               ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//               : "bg-[#C6A85A] text-white hover:bg-[#A88B42] active:scale-95 shadow-[#C6A85A]/20"
//           }`}
//         >
//           {loading ? (
//             <span className="flex items-center justify-center gap-2">
//               <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></span>
//               Syncing...
//             </span>
//           ) : (
//             "Refresh Frontend Reviews"
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import {
  refreshGoogleReviews,
  RefreshResponse,
} from "@/src/actions/refresh-reviews";
import { useState } from "react";

export default function AdminReviewPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<RefreshResponse | null>(null);

  async function handleSync(): Promise<void> {
    setLoading(true);
    setResult(null);

    const res: RefreshResponse = await refreshGoogleReviews();
    setResult(res);
    setLoading(false);
  }

  return (
    <div className="p-10">
      <div className="max-w-md bg-white border border-gray-100 p-8 rounded-3xl shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Google Sync</h1>
        <p className="text-gray-500 text-sm mb-8">
          Update the website with the newest 5-star reviews from your Google
          Business Profile.
        </p>

        <button
          onClick={handleSync}
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-bold transition-all shadow-lg ${
            loading
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-[#C6A85A] text-white hover:bg-[#A88B42] active:scale-95 shadow-[#C6A85A]/20"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></span>
              Syncing...
            </span>
          ) : (
            "Refresh Frontend Reviews"
          )}
        </button>

        {result && (
          <div
            className={`mt-6 p-4 rounded-2xl text-sm font-medium ${
              result.success
                ? "bg-green-50 text-green-700 border border-green-100"
                : "bg-red-50 text-red-700 border border-red-100"
            }`}
          >
            {result.success ? "✅ " : "❌ "}
            {result.message}
          </div>
        )}
      </div>
    </div>
  );
}
