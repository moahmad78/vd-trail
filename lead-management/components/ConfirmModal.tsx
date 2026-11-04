"use client";

import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isDestructive = true,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
      <div className="w-full max-w-sm bg-white border border-[#e2e8f0] rounded-2xl shadow-2xl relative flex flex-col overflow-hidden">
        <div className="p-6">
          <h3 className="text-base font-bold text-[#071633] mb-2">{title}</h3>
          <p className="text-xs text-[#64748b] leading-relaxed">{message}</p>
        </div>
        <div className="flex justify-end gap-2.5 px-6 py-4 bg-[#f8fafc] border-t border-[#e2e8f0]">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-white border border-[#cbd5e1] hover:bg-[#f1f5f9] text-[#475569] font-semibold text-xs rounded-xl shadow-xs transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-xs ${
              isDestructive
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-[#071633] hover:bg-[#0f2452] text-white"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
