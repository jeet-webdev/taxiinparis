"use client";

import { Lock, Mail } from "@mui/icons-material";
import { useTransition } from "react";
import {
  adminLoginSchema,
  AdminLoginSchemaType,
} from "../validations/adminLoginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAdminAction } from "@/src/actions/adminLogin";

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

  const onSubmit = (data: AdminLoginSchemaType) => {
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
            backgroundImage:
              "url('/assets/images/nighttime-taxi-scene-stockcake.webp')",
          }}
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-start p-16 text-white">
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
            TaxiIn<span className="text-yellow-400">Paris</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-300 max-w-md">
            Premium fleet management & luxury ride administration dashboard.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12 relative
bg-[radial-gradient(circle_at_85%_20%,rgba(255,193,7,0.25),transparent_40%),linear-gradient(135deg,#0f0f0f_0%,#1a1a1a_40%,#2a1f0f_75%,#000000_100%)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,200,0,0.12),transparent_40%)]" />

        <div className="relative z-10 w-full max-w-md">
          <div className="relative rounded-3xl p-10 bg-white/5 backdrop-blur-xl border border-yellow-400/20 shadow-[0_0_60px_rgba(255,200,0,0.08)]">
            
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white tracking-wide">
                Admin <span className="text-yellow-400">Login</span>
              </h2>
              <p className="text-sm text-zinc-400 mt-2">
                Secure access to dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* Email */}
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400 transition-colors duration-300 group-focus-within:text-yellow-300" />
                <input
                  type="email"
                  placeholder="Admin Email"
                  {...register("email")}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/60 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-300"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400 transition-colors duration-300 group-focus-within:text-yellow-300" />
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

              {/* Button */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 rounded-xl font-semibold text-black bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-300 transition-all duration-300 shadow-[0_0_25px_rgba(255,200,0,0.4)] hover:shadow-[0_0_40px_rgba(255,200,0,0.6)] disabled:opacity-70 disabled:cursor-not-allowed"
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
                    i % 2 === 0 ? "bg-yellow-400" : "bg-black"
                  }`}
                />
              ))}
            </div>

            <div className="mt-6 text-center text-xs text-zinc-500">
              © {new Date().getFullYear()} TaxiParis Admin Panel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}