"use client";

import React, { useState, useEffect } from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

class ToastEmitter {
  listeners: ((toast: ToastMessage) => void)[] = [];

  subscribe(listener: (toast: ToastMessage) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  emit(message: string, type: ToastType = "info") {
    const toast = { id: Math.random().toString(36).substring(2, 9), message, type };
    this.listeners.forEach((listener) => listener(toast));
  }
}

export const toastEmitter = new ToastEmitter();

export const toast = {
  success: (msg: string) => toastEmitter.emit(msg, "success"),
  error: (msg: string) => toastEmitter.emit(msg, "error"),
  info: (msg: string) => toastEmitter.emit(msg, "info"),
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const unsubscribe = toastEmitter.subscribe((tst) => {
      setToasts((prev) => [...prev, tst]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== tst.id));
      }, 2500);
    });
    return unsubscribe;
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-3 rounded-xl shadow-2xl font-semibold text-sm transform transition-all duration-300 animate-fade-in flex items-center gap-2 pointer-events-auto
            ${t.type === "success" ? "bg-emerald-950 border border-emerald-800/60 text-emerald-400" : ""}
            ${t.type === "error" ? "bg-red-950 border border-red-800/60 text-red-400" : ""}
            ${t.type === "info" ? "bg-slate-900 border border-slate-700/60 text-white" : ""}
          `}
        >
          {t.type === "success" && "✅"}
          {t.type === "error" && "⚠️"}
          {t.type === "info" && "ℹ️"}
          {t.message}
        </div>
      ))}
    </div>
  );
}
