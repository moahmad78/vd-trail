"use client";

import React, { useState } from "react";
import { Employee, SERVICE_TYPES, LEAD_SOURCES } from "../types";
import { leadService } from "../services/leadService";
import { toast } from "./Toast";
import { X, PlusCircle } from "lucide-react";

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeesList?: Employee[];
  onLeadAdded: () => void;
  currentUser?: string | null;
  currentUserRole?: string | null;
}

export default function AddLeadModal({
  isOpen,
  onClose,
  employeesList = [],
  onLeadAdded,
  currentUser,
  currentUserRole,
}: AddLeadModalProps) {
  const defaultHandledBy = "";

  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    projectLocation: "",
    requirement: SERVICE_TYPES[0],
    areaSqft: "",
    source: "Website",
    handledBy: defaultHandledBy,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobileNumber) {
      toast.error("Name and Mobile Number are required!");
      return;
    }

    setIsCreating(true);
    try {
      const payload = {
        ...formData,
        handledBy: formData.handledBy || null,
      };
      await leadService.createLead(payload);
      toast.success("Lead created successfully! It will appear in the Available Leads Pool.");
      setFormData({
        name: "",
        mobileNumber: "",
        projectLocation: "",
        requirement: SERVICE_TYPES[0],
        areaSqft: "",
        source: "Website",
        handledBy: defaultHandledBy,
      });
      onLeadAdded();
      onClose();
    } catch (error: any) {
      console.error("Error creating lead:", error);
      toast.error(error.message || "Failed to create lead.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
      <div className="w-full max-w-lg bg-white border border-[#e2e8f0] rounded-2xl shadow-2xl overflow-hidden p-6 relative">
        <div className="flex justify-between items-center pb-4 border-b border-[#e2e8f0] mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#071633]/5 text-[#071633] flex items-center justify-center font-bold">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#071633]">Add New Lead Manually</h3>
              <p className="text-[11px] text-[#64748b]">Enter lead contact information & initial project details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#94a3b8] hover:text-[#071633] p-1.5 rounded-lg hover:bg-[#f1f5f9] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-[#475569] block mb-1">Customer Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs text-[#0f172a] focus:bg-white focus:outline-none focus:border-[#071633] shadow-xs transition-colors"
              placeholder="e.g. Rahul Sharma"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#475569] block mb-1">Mobile Number *</label>
              <input
                type="text"
                required
                value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs text-[#0f172a] focus:bg-white focus:outline-none focus:border-[#071633] shadow-xs transition-colors"
                placeholder="10-digit number"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#475569] block mb-1">Location</label>
              <input
                type="text"
                value={formData.projectLocation}
                onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs text-[#0f172a] focus:bg-white focus:outline-none focus:border-[#071633] shadow-xs transition-colors"
                placeholder="City / Area"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#475569] block mb-1">Requirement</label>
              <select
                value={formData.requirement}
                onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs text-[#0f172a] focus:bg-white focus:outline-none focus:border-[#071633] shadow-xs transition-colors"
              >
                {SERVICE_TYPES.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#475569] block mb-1">Area (Sq Ft)</label>
              <input
                type="text"
                value={formData.areaSqft}
                onChange={(e) => setFormData({ ...formData, areaSqft: e.target.value })}
                className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs text-[#0f172a] focus:bg-white focus:outline-none focus:border-[#071633] shadow-xs transition-colors"
                placeholder="e.g. 1500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#475569] block mb-1">Lead Source</label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs text-[#0f172a] focus:bg-white focus:outline-none focus:border-[#071633] shadow-xs transition-colors"
              >
                {LEAD_SOURCES.map((src) => (
                  <option key={src} value={src}>{src}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#475569] block mb-1">Assign Executive</label>
              <select
                value={formData.handledBy}
                onChange={(e) => setFormData({ ...formData, handledBy: e.target.value })}
                className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs text-[#0f172a] focus:bg-white focus:outline-none focus:border-[#071633] shadow-xs transition-colors"
              >
                <option value="">All / Unassigned (Let team claim)</option>
                {employeesList.map((emp) => (
                  <option key={emp.id} value={`Pinned: ${emp.name || emp.username}`}>
                    Pinned: {emp.name || emp.username}
                  </option>
                ))}
              </select>
              {!formData.handledBy && (
                <p className="text-[10px] text-[#64748b] mt-1">Lead will go to the shared pool — any employee can claim it.</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2.5 mt-5 pt-4 border-t border-[#e2e8f0]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#475569] font-semibold text-xs rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="px-5 py-2 bg-[#071633] hover:bg-[#0f2452] text-white font-bold text-xs rounded-xl transition-colors shadow-sm disabled:opacity-50"
            >
              {isCreating ? "Saving..." : "Save Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
