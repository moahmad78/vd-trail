"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Lock,
  User,
  Shield,
  Users,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Headphones,
} from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"Admin" | "Employee">("Admin");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.role === "admin") {
          router.push("/adminlead");
        } else {
          router.push("/lead");
        }
      } else {
        setError(data.error || "Invalid username or password. Please try again.");
      }
    } catch (err) {
      setError("An unexpected network error occurred. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans selection:bg-[#071633] selection:text-white">
      {/* Background decorative glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#c29b28]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#071633]/10 rounded-full blur-3xl" />
      </div>

      {/* Main Split Card Container */}
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(7,22,51,0.12)] border border-slate-200/80 overflow-hidden flex flex-col lg:flex-row min-h-[640px] z-10">
        
        {/* ================= LEFT SIDE: BRAND SHOWCASE ================= */}
        <div className="lg:w-5/12 bg-gradient-to-br from-[#071633] via-[#0b1f48] to-[#040e22] text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle gold grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#c29b28 1px, transparent 1px), radial-gradient(#c29b28 1px, #071633 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Top Brand Block */}
          <div className="relative z-10">
            {/* Logo Badge */}
            <div className="inline-flex items-center gap-3 bg-white/95 px-4 py-2.5 rounded-2xl shadow-lg border border-white/20 mb-6">
              <div className="relative w-36 h-10">
                <Image
                  src="/logo/logo.webp"
                  alt="Voomet Design Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-[#c29b28]/20 text-[#f5d061] border border-[#c29b28]/30">
                Enterprise Suite
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
              Lead Operations &amp; Team Portal
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Precision architecture &amp; turnkey interiors management platform for real-time lead ingestion, claiming and performance tracking.
            </p>
          </div>

          {/* Middle Feature Highlights */}
          <div className="my-8 relative z-10 space-y-4">
            <div className="flex items-start gap-3.5 group">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/15 text-[#f5d061]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Live Multi-Channel Sync</h4>
                <p className="text-xs text-slate-300 leading-normal">
                  Continuous auto-ingestion from Google Ads &amp; Meta Ads sheets.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 group">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/15 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Instant Lead Claiming</h4>
                <p className="text-xs text-slate-300 leading-normal">
                  Dedicated executive dispatch with direct WhatsApp and calling tools.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 group">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/15 text-sky-400">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Enterprise Security</h4>
                <p className="text-xs text-slate-300 leading-normal">
                  Role-governed data protection, trash recovery and audit logs.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Footer Info */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>&copy; {new Date().getFullYear()} Voomet Design</span>
            <span className="flex items-center gap-1 text-[#f5d061]/90">
              <Headphones className="w-3.5 h-3.5" /> Support 24/7
            </span>
          </div>
        </div>

        {/* ================= RIGHT SIDE: AUTHENTICATION FORM ================= */}
        <div className="lg:w-7/12 bg-[#fafaf8] p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071633] tracking-tight">
                Sign In to Portal
              </h2>
              <p className="text-slate-500 text-sm mt-1.5">
                Select your role and enter your credentials to access your workspace.
              </p>
            </div>

            {/* Role Switcher Tabs */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Select Access Mode
              </label>
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300/70">
                <button
                  type="button"
                  onClick={() => {
                    setRole("Admin");
                    setError("");
                  }}
                  className={`flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                    role === "Admin"
                      ? "bg-[#071633] text-white shadow-md shadow-[#071633]/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-300/50"
                  }`}
                >
                  <Shield className={`w-4 h-4 ${role === "Admin" ? "text-[#f5d061]" : "text-slate-500"}`} />
                  <span>Admin Portal</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRole("Employee");
                    setError("");
                  }}
                  className={`flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                    role === "Employee"
                      ? "bg-[#071633] text-white shadow-md shadow-[#071633]/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-300/50"
                  }`}
                >
                  <Users className={`w-4 h-4 ${role === "Employee" ? "text-emerald-400" : "text-slate-500"}`} />
                  <span>Employee Portal</span>
                </button>
              </div>

              {/* Role Context Hint */}
              <div className="mt-2 text-[12px] text-slate-500 flex items-center gap-1.5 px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c29b28]" />
                {role === "Admin" ? (
                  <span>
                    Super Admin Console: Master leads table, Google/Meta sync, trash recovery &amp; team management.
                  </span>
                ) : (
                  <span>
                    Executive Console: View assigned leads, initiate calls, update statuses &amp; add notes.
                  </span>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 animate-shake">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-xs text-red-700 font-medium leading-relaxed">
                  {error}
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {role === "Admin" ? "Admin Username" : "Employee Name, Username or Email"}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder={
                      role === "Admin"
                        ? "Enter admin username (e.g. Sahil)"
                        : "Enter name, username or email (e.g. Sahil Sheikh)"
                    }
                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#071633] focus:border-transparent transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Password Input with Show / Hide Toggle */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    {role === "Admin" ? "Password" : "Password or 4-Digit PIN"}
                  </label>
                  {role === "Employee" && (
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Supports PIN or Password
                    </span>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder={
                      role === "Admin"
                        ? "Enter admin password"
                        : "Enter password (e.g. Sahil@123) or PIN (e.g. 2567)"
                    }
                    className="w-full pl-11 pr-11 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#071633] focus:border-transparent transition-all shadow-sm"
                  />
                  {/* Show / Hide Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-[#071633]" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-3 bg-[#071633] hover:bg-[#0b1f48] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-[#071633]/25 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In as {role}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Helper for Employees */}
            <div className="mt-6 p-3 rounded-xl bg-slate-100/80 border border-slate-200 text-center">
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Need help with credentials? Contact your system administrator or refer to your registered staff profile.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
