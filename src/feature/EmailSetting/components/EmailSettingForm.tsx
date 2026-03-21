"use client";

import React, { useActionState, useState } from "react";
import {
  saveEmailSetting,
  EmailSettingState,
  SmtpSettings,
} from "@/src/actions/emailSettingAction";

const initialState: EmailSettingState = { success: false, error: null };

export default function EmailSettingForm({
  current,
}: {
  current: SmtpSettings;
}) {
  const [state, formAction, isPending] = useActionState(
    saveEmailSetting,
    initialState,
  );
  const [showPassword, setShowPassword] = useState(false);
  const fe = state.fieldErrors;

  return (
    <form action={formAction} className="space-y-6">
      {state.success && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
          ✓ SMTP settings saved successfully.
        </div>
      )}
      {state.error && !fe && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          ✕ {state.error}
        </div>
      )}

      {/* SMTP Host & Port */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#C8954A]">
            SMTP Host *
          </label>
          <input
            name="smtpHost"
            type="text"
            defaultValue={current.smtpHost}
            placeholder="smtp.example.com"
            className={`w-full p-2.5 border text-black rounded focus:ring-1 focus:ring-amber-500 outline-none transition-all ${fe?.smtpHost ? "border-amber-500" : "border-gray-300"}`}
          />
          {fe?.smtpHost && (
            <p className="text-amber-500 text-xs">{fe.smtpHost}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#C8954A]">
            SMTP Port *
          </label>
          <input
            name="smtpPort"
            type="number"
            defaultValue={current.smtpPort}
            placeholder="587"
            className={`w-full p-2.5 border text-black rounded focus:ring-1 focus:ring-amber-500 outline-none transition-all ${fe?.smtpPort ? "border-amber-500" : "border-gray-300"}`}
          />
          {fe?.smtpPort && (
            <p className="text-amber-500 text-xs">{fe.smtpPort}</p>
          )}
        </div>
      </div>

      {/* SMTP User & Password */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#C8954A]">
            SMTP User (Email) *
          </label>
          <input
            name="smtpUser"
            type="email"
            defaultValue={current.smtpUser}
            placeholder="sender@yourdomain.com"
            className={`w-full p-2.5 border text-black rounded focus:ring-1 focus:ring-amber-500 outline-none transition-all ${fe?.smtpUser ? "border-amber-500" : "border-gray-300"}`}
          />
          {fe?.smtpUser && (
            <p className="text-amber-500 text-xs">{fe.smtpUser}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#C8954A]">
            SMTP Password *
          </label>
          <div className="relative">
            <input
              name="smtpPassword"
              type={showPassword ? "text" : "password"}
              defaultValue={current.smtpPassword}
              placeholder="••••••••"
              className={`w-full p-2.5 border text-black rounded focus:ring-1 focus:ring-amber-500 outline-none transition-all pr-10 ${fe?.smtpPassword ? "border-amber-500" : "border-gray-300"}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {fe?.smtpPassword && (
            <p className="text-amber-500 text-xs">{fe.smtpPassword}</p>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs text-gray-400 mb-4">
          The address below receives all contact form submissions.
        </p>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#C8954A]">
            Site Contact (Destination) Email *
          </label>
          <input
            name="contactEmail"
            type="email"
            defaultValue={current.contactEmail}
            placeholder="contact@yourdomain.com"
            className={`w-full p-2.5 border text-black rounded focus:ring-1 focus:ring-amber-500 outline-none transition-all ${fe?.contactEmail ? "border-amber-500" : "border-gray-300"}`}
          />
          {fe?.contactEmail && (
            <p className="text-amber-500 text-xs">{fe.contactEmail}</p>
          )}
        </div>
      </div>

      <div className="flex justify-start">
        <button
          type="submit"
          disabled={isPending}
          className="btn-primary font-logo"
        >
          {isPending ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
