"use client";

import React, { useState } from "react";
import { Employee, SERVICE_TYPES, LEAD_SOURCES } from "../types";
import { leadService } from "../services/leadService";
import { toast } from "./Toast";

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
  // For admin: default to unassigned pool (empty string → null on server)
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
      // Send null for handledBy if empty string (unassigned pool)
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
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 relative">
        <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Add New Lead Manually
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">Customer Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              placeholder="e.g. Rahul Sharma"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Mobile Number *</label>
              <input
                type="text"
                required
                value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                placeholder="10-digit number"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Location</label>
              <input
                type="text"
                value={formData.projectLocation}
                onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                placeholder="City / Area"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Requirement</label>
              <select
                value={formData.requirement}
                onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                {SERVICE_TYPES.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Area (Sq Ft)</label>
              <input
                type="text"
                value={formData.areaSqft}
                onChange={(e) => setFormData({ ...formData, areaSqft: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                placeholder="e.g. 1500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Lead Source</label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                {LEAD_SOURCES.map((src) => (
                  <option key={src} value={src}>{src}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Assign Executive</label>
              <select
                value={formData.handledBy}
                onChange={(e) => setFormData({ ...formData, handledBy: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option value="">🌐 All / Unassigned (Let team claim)</option>
                {employeesList.map((emp) => (
                  <option key={emp.id} value={`Pinned: ${emp.name || emp.username}`}>
                    📌 {emp.name || emp.username}
                  </option>
                ))}
              </select>
              {!formData.handledBy && (
                <p className="text-[10px] text-slate-500 mt-1">Lead will go to the shared pool — any employee can claim it.</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-sm hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="px-5 py-2 bg-amber-500 text-black font-bold rounded-lg text-sm hover:bg-amber-400 transition-colors disabled:opacity-50"
            >
              {isCreating ? "Creating..." : "Save Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
