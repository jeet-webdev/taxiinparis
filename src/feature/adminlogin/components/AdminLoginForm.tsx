"use client";

import { Lock, Mail } from "@mui/icons-material";
import { useState, useTransition } from "react";
import {
  adminLoginSchema,
  AdminLoginSchemaType,
} from "../validations/adminLoginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAdminAction } from "@/src/actions/adminLogin";
import CaptchaField from "../../CaptchaField";

export default function AdminLoginForm() {
  const methods = useForm<AdminLoginSchemaType>({
    resolver: zodResolver(adminLoginSchema),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  const [isPending, startTransition] = useTransition();
  const [captchaValid, setCaptchaValid] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const onSubmit = (data: AdminLoginSchemaType) => {
    if (!captchaValid) {
      setCaptchaError("Invalid captcha");
      return;
    } else {
      setCaptchaError("");
    }

    startTransition(async () => {
      const res = await loginAdminAction(data);

      if (res?.error) {
        setError("root", {
          type: "manual",
          message: res.error,
        });
      }
    });
  };

  return (
    <div className="min-h-screen w-full flex bg-black">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex relative w-1/2 h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/images/admin.webp')",
          }}
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#8a6c26]/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-start p-16 text-white">
          <h1 className="text-5xl font-heading tracking-tight leading-tight">
            Luxury Limo<span className="text-[#8a6c26]"> Paris</span>
          </h1>
          <p className="mt-6 text-lg text-white font-sans max-w-md">
            Premium fleet management & luxury ride administration dashboard.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12 relative
bg-[radial-gradient(circle_at_150%_20%,rgba(255,193,7,0.25),transparent_40%),linear-gradient(135deg,#0f0f0f_0%,#1a1a1a_40%,#2a1f0f_75%,#000000_100%)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,200,0,0.12),transparent_40%)]" />

        <div className="relative z-10 w-full max-w-md">
          <div className="relative rounded-3xl p-10 bg-white/5 backdrop-blur-xl border border-[#8a6c26] shadow-[0_0_60px_rgba(255,200,0,0.08)]">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-heading text-white tracking-wide">
                Admin <span className="text-[#a88435]">Login</span>
              </h2>
              <p className="text-sm text-zinc-400 mt-2">
                Secure access to dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a88435] transition-colors duration-300 group-focus-within:text-[#8a6c26]" />
                <input
                  type="email"
                  placeholder="Admin Email"
                  {...register("email")}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/60 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#a88435] focus:ring-2 focus:ring-[#a88435]/30 transition-all duration-300"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a88435] transition-colors duration-300 group-focus-within:text-[#8a6c26]" />
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/60 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-300"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Root Error */}
              {errors.root && (
                <p className="text-red-500 text-sm text-center">
                  {errors.root.message}
                </p>
              )}
              <CaptchaField
              cssClass="w-full px-4 py-3 rounded-xl bg-black/60 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#a88435] focus:ring-2 focus:ring-[#a88435]/30 transition-all duration-300"
                onChange={(valid) => {
                  setCaptchaValid(valid);
                  if (valid) setCaptchaError("");
                }}
              />

              {captchaError && (
                <p className="text-red-500 text-sm">{captchaError}</p>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? "Signing In..." : "Login"}
              </button>
            </form>

            {/* Taxi Strip */}
            <div className="mt-10 flex justify-center gap-0.5">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-5 ${
                    i % 2 === 0 ? "bg-[#a88435]" : "bg-black"
                  }`}
                />
              ))}
            </div>

            <div className="mt-6 text-center text-xs text-zinc-500">
              © {new Date().getFullYear()} Luxury Limo Paris Admin Panel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
