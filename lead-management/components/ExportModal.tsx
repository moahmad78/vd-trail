"use client";

import React, { useState } from "react";
import { Lead, Employee, SERVICE_TYPES, CRM_STATUSES_ADMIN, LEAD_SOURCES } from "../types";
import { toast } from "./Toast";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: Lead[];
  employeesList: Employee[];
}

export default function ExportModal({
  isOpen,
  onClose,
  leads,
  employeesList,
}: ExportModalProps) {
  const [exportType, setExportType] = useState<"All" | "Employee" | "Status" | "Service" | "Source" | "DateRange">("All");
  const [exportEmployee, setExportEmployee] = useState<string>("Pinned: Sahil");
  const [exportStatus, setExportStatus] = useState<string>("New Lead");
  const [exportService, setExportService] = useState<string>("Residential");
  const [exportSource, setExportSource] = useState<string>("Website");
  const [exportDateRange, setExportDateRange] = useState({ start: "", end: "" });

  if (!isOpen) return null;

  const handleExport = () => {
    let filtered = [...leads];

    if (exportType === "Employee") {
      filtered = filtered.filter((l) => l.handledBy === exportEmployee);
    } else if (exportType === "Status") {
      filtered = filtered.filter((l) => l.status === exportStatus);
    } else if (exportType === "Service") {
      filtered = filtered.filter((l) => l.requirement === exportService);
    } else if (exportType === "Source") {
      filtered = filtered.filter((l) => (l.source || l.submissionSource) === exportSource);
    } else if (exportType === "DateRange") {
      if (exportDateRange.start) {
        filtered = filtered.filter((l) => new Date(l.createdAt) >= new Date(exportDateRange.start));
      }
      if (exportDateRange.end) {
        filtered = filtered.filter((l) => new Date(l.createdAt) <= new Date(exportDateRange.end + "T23:59:59"));
      }
    }

    if (filtered.length === 0) {
      toast.error("No leads found for selected export criteria.");
      return;
    }

    // Convert to CSV
    const headers = ["ID", "Name", "Mobile", "Email", "Requirement", "Location", "Area SqFt", "Status", "Handled By", "Source", "Created At"];
    const rows = filtered.map((l) => [
      l.id,
      `"${(l.name || "").replace(/"/g, '""')}"`,
      `"${(l.mobileNumber || "").replace(/"/g, '""')}"`,
      `"${(l.email || "").replace(/"/g, '""')}"`,
      `"${(l.requirement || "").replace(/"/g, '""')}"`,
      `"${(l.projectLocation || "").replace(/"/g, '""')}"`,
      `"${(l.areaSqft || "").replace(/"/g, '""')}"`,
      `"${(l.status || "").replace(/"/g, '""')}"`,
      `"${(l.handledBy || "").replace(/"/g, '""')}"`,
      `"${(l.submissionSource || l.source || "").replace(/"/g, '""')}"`,
      `"${new Date(l.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `leads_export_${exportType.toLowerCase()}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Leads exported successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 relative">
        <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            📊 Export Leads Data
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800">
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-2">Select Filter Criterion</label>
            <select
              value={exportType}
              onChange={(e) => setExportType(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
            >
              <option value="All">All Leads</option>
              <option value="Employee">By Assigned Employee</option>
              <option value="Status">By Lead Status</option>
              <option value="Service">By Service Type</option>
              <option value="Source">By Lead Source</option>
              <option value="DateRange">By Custom Date Range</option>
            </select>
          </div>

          {exportType === "Employee" && (
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Select Employee</label>
              <select
                value={exportEmployee}
                onChange={(e) => setExportEmployee(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Unassigned">Unassigned</option>
                {employeesList.map((emp) => (
                  <option key={emp.id} value={`Pinned: ${emp.name || emp.username}`}>
                    Pinned: {emp.name || emp.username}
                  </option>
                ))}
              </select>
            </div>
          )}

          {exportType === "Status" && (
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Select Status</label>
              <select
                value={exportStatus}
                onChange={(e) => setExportStatus(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                {CRM_STATUSES_ADMIN.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          )}

          {exportType === "Service" && (
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Select Service</label>
              <select
                value={exportService}
                onChange={(e) => setExportService(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                {SERVICE_TYPES.map((srv) => (
                  <option key={srv} value={srv}>
                    {srv}
                  </option>
                ))}
              </select>
            </div>
          )}

          {exportType === "Source" && (
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Select Lead Source</label>
              <select
                value={exportSource}
                onChange={(e) => setExportSource(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                {LEAD_SOURCES.map((src) => (
                  <option key={src} value={src}>
                    {src}
                  </option>
                ))}
              </select>
            </div>
          )}

          {exportType === "DateRange" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">From Date</label>
                <input
                  type="date"
                  value={exportDateRange.start}
                  onChange={(e) => setExportDateRange({ ...exportDateRange, start: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">To Date</label>
                <input
                  type="date"
                  value={exportDateRange.end}
                  onChange={(e) => setExportDateRange({ ...exportDateRange, end: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-800">
            <button onClick={onClose} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-sm hover:bg-slate-700">
              Cancel
            </button>
            <button
              onClick={handleExport}
              className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-lg text-sm hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/30"
            >
              Download CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
