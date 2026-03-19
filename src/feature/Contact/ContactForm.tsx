"use client";

import React, { useActionState, useState } from "react";
import { sendContactEmail, FormState } from "@/src/actions/contactAction";
import PhoneField from "./PhoneField";

const initialState: FormState = {
  error: null,
  success: false,
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendContactEmail,
    initialState,
  );
  const fe = state.fieldErrors;

  return (
    <form action={formAction} className="space-y-6">
      {/* Status Notifications */}
      {state.success && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
          ✓ Message sent successfully! We will contact you shortly.
        </div>
      )}
      {state.error && !fe && (
        <div className="p-4 bg-amber-50 border border-amber-200 text-amber-700 rounded-md">
          ✕ {state.error}
        </div>
      )}

      {/* Name & Surname */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#d4af6a]">Name *</label>
          <input
            name="name"
            type="text"
            className={`w-full p-2.5 border rounded focus:ring-1 focus:ring-amber-500 outline-none transition-all ${fe?.name ? "border-amber-500" : "border-gray-300"}`}
          />
          {fe?.name && <p className="text-amber-500 text-xs">{fe.name[0]}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#d4af6a]">
            Surname *
          </label>
          <input
            name="surname"
            type="text"
            className={`w-full p-2.5 border rounded focus:ring-1 focus:ring-amber-500 outline-none transition-all ${fe?.surname ? "border-amber-500" : "border-gray-300"}`}
          />
          {fe?.surname && (
            <p className="text-amber-500 text-xs">{fe.surname[0]}</p>
          )}
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#d4af6a]">
            Email *
          </label>
          <input
            name="email"
            type="text"
            className={`w-full p-2.5 border rounded focus:ring-1 focus:ring-amber-500 outline-none transition-all ${fe?.email ? "border-amber-500" : "border-gray-300"}`}
          />
          {fe?.email && <p className="text-amber-500 text-xs">{fe.email[0]}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#d4af6a]">Phone</label>
          <PhoneField />
          {fe?.phone && (
            <p className="text-amber-500 focus:ring-amber-500  text-xs">
              {fe.phone[0]}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-[#d4af6a]">
          Message *
        </label>
        <textarea
          name="message"
          rows={5}
          className={`w-full p-2.5 border rounded focus:ring-1 focus:ring-amber-500 outline-none resize-none transition-all ${fe?.message ? "border-amber-500" : "border-gray-300"}`}
        />
        {fe?.message && (
          <p className="text-amber-500 text-xs">{fe.message[0]}</p>
        )}
      </div>

      {/* Captcha */}
      <div className="max-w-[200px] space-y-2">
        <label className="text-sm font-semibold text-[#d4af6a] italic">
          Solve: 4 + 7 = ?
        </label>
        <input
          name="captcha"
          type="text"
          placeholder="Answer"
          className={`w-full p-2.5 border rounded outline-none focus:ring-1 focus:ring-amber-500 transition-all ${fe?.captcha ? "border-amber-500" : "border-gray-300"}`}
        />
        {fe?.captcha && (
          <p className="text-amber-500 text-xs">{fe.captcha[0]}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="px-16 py-3.5 bg-black text-white text-lg font-bold rounded-md hover:bg-gray-800 transition-all uppercase tracking-widest shadow-lg disabled:bg-gray-400"
        >
          {isPending ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}
