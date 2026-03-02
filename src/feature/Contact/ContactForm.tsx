"use client";

import React, { useActionState, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { sendContactEmail, FormState } from "@/src/actions/contactAction";

const initialState: FormState = {
  error: null,
  success: false,
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendContactEmail,
    initialState,
  );
  const [phoneValue, setPhoneValue] = useState<string | undefined>();

  return (
    <form action={formAction} className="space-y-6">
      {/* Status Notifications */}
      {state.success && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
          ✓ Message sent successfully! We will contact you shortly.
        </div>
      )}
      {state.error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
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
            required
            className="w-full p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-amber-500 outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#d4af6a]">
            Surname *
          </label>
          <input
            name="surname"
            type="text"
            required
            className="w-full p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-amber-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Email & Phone with Flag Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#d4af6a]">
            Email *
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-amber-500 outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#d4af6a]">Phone</label>
          <div className="luxury-phone-input">
            <style>{`
  /* Container styling */
  .PhoneInput {
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background: white;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  /* Flag container styling */
  .PhoneInputCountry {
    padding: 0 10px;
    border-right: 1px solid #d1d5db;
    background: #f9fafb;
    height: 45px;
    display: flex;
    align-items: center;
  }

  /* Hide dropdown arrow */
  .PhoneInputCountrySelectArrow {
    display: none;
  }

  /* 🔥 Hide country names in dropdown */
  .PhoneInputCountrySelect option {
    font-size: 0;
  }

  /* Make dropdown width small */
  .PhoneInputCountrySelect {
    width: 60px !important;
  }

  /* Focus styling */
  .PhoneInput:focus-within {
    border-color: #d4af6a;
    box-shadow: 0 0 0 1px #d4af6a;
  }

  /* Remove input border */
  .PhoneInputInput {
    border: none !important;
    padding: 10px !important;
  }
`}</style>

            <PhoneInput
              international
              defaultCountry="FR"
              displayInitialCountryNames={false} // THIS HIDES THE COUNTRY NAMES
              value={phoneValue}
              onChange={setPhoneValue}
              inputComponent={(
                props: React.InputHTMLAttributes<HTMLInputElement>,
              ) => (
                <input
                  {...props}
                  name="phone"
                  className="w-full outline-none bg-transparent"
                />
              )}
            />
          </div>
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
          required
          className="w-full p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-amber-500 outline-none resize-none transition-all"
        />
      </div>

      {/* Math Solver */}
      <div className="max-w-[200px] space-y-2">
        <label className="text-sm font-semibold text-[#d4af6a] italic">
          Solve: 4 + 7 = ?
        </label>
        <input
          name="captcha"
          type="text"
          required
          placeholder="Answer"
          className="w-full p-2.5 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-amber-500 transition-all"
        />
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
