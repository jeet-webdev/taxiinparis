"use client";

import React, { useActionState, useState } from "react";
import { sendContactEmail, FormState } from "@/src/actions/contactAction";
import PhoneField from "./PhoneField";
import CaptchaField from "../CaptchaField";

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
  const [captchaValid, setCaptchaValid] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  return (
    <form
      action={(formData) => {
        if (!captchaValid) {
          setCaptchaError("Invalid captcha");
          return;
        }

        setCaptchaError("");
        formAction(formData);
      }}
      className="space-y-6"
    >
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
          <label className="text-sm font-semibold text-[#8B6C26]">Name *</label>
          <input
            name="name"
            type="text"
            className={`w-full p-2.5 border text-black rounded focus:ring-1 focus:ring-[#8B6C26] outline-none transition-all ${fe?.name ? "border-[#8B6C26]" : "border-gray-300"}`}
          />
          {fe?.name && <p className="text-[#8B6C26] text-xs">{fe.name[0]}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#8B6C26]">
            Surname *
          </label>
          <input
            name="surname"
            type="text"
            className={`w-full p-2.5 border text-black rounded focus:ring-1 focus:ring-[#8B6C26] outline-none transition-all ${fe?.surname ? "border-[#8B6C26]" : "border-gray-300"}`}
          />
          {fe?.surname && (
            <p className="text-[#8B6C26] text-xs">{fe.surname[0]}</p>
          )}
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#8B6C26]">
            Email *
          </label>
          <input
            name="email"
            type="text"
            className={`w-full p-2.5 border text-black rounded focus:ring-1 focus:ring-[#8B6C26] outline-none transition-all ${fe?.email ? "border-[#8B6C26]" : "border-gray-300"}`}
          />
          {fe?.email && <p className="text-[#8B6C26] text-xs">{fe.email[0]}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#8B6C26]">Phone</label>
          <PhoneField />
          {fe?.phone && (
            <p className="text-[#8B6C26] focus:ring-[#8B6C26]  text-xs">
              {fe.phone[0]}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-[#8B6C26]">
          Message *
        </label>
        <textarea
          name="message"
          rows={5}
          className={`w-full p-2.5 border text-black rounded focus:ring-1 focus:ring-[#8B6C26] outline-none resize-none transition-all ${fe?.message ? "border-[#8B6C26]" : "border-gray-300"}`}
        />
        {fe?.message && (
          <p className="text-[#8B6C26] text-xs">{fe.message[0]}</p>
        )}
      </div>

      {/* Captcha */}

      <div className="max-w-[220px] space-y-2">
        <CaptchaField
          cssClass={`w-full p-2.5 border text-black rounded focus:ring-1 focus:ring-[#8B6C26] outline-none transition-all ${fe?.surname ? "border-[#8B6C26]" : "border-gray-300"}`}
          onChange={(valid) => {
            setCaptchaValid(valid);
            if (valid) setCaptchaError("");
          }}
        />

        {captchaError && (
          <p className="text-[#8B6C26] text-xs">{captchaError}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="btn-primary font-logo"
        >
          {isPending ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}
