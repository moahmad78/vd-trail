"use client";

import React, { useState } from "react";
import { Employee, Lead } from "../types";
import { leadService } from "../services/leadService";
import { toast } from "./Toast";
import ConfirmModal from "./ConfirmModal";
import { Settings, X, Users, Trash2, FileText, User, Activity, Edit3, UserPlus, Eye, EyeOff, Send, LogOut, ShieldCheck, Check } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeesList: Employee[];
  trashedLeads: Lead[];
  currentUser: string | null;
  currentUserRole: string | null;
  adminAvatar: string | null;
  onEmployeeCreated: () => void;
  onLeadRestored: () => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  employeesList,
  trashedLeads,
  currentUser,
  currentUserRole,
  adminAvatar,
  onEmployeeCreated,
  onLeadRestored,
}: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<"employee" | "trash" | "audit" | "profile" | "meta">("employee");
  const [isTestingMeta, setIsTestingMeta] = useState(false);
  const [metaTestResult, setMetaTestResult] = useState<{ success: boolean; message: string; details?: any } | null>(null);
  const [testEventCode, setTestEventCode] = useState("");
  const [isCreatingEmp, setIsCreatingEmp] = useState(false);
  const [newEmp, setNewEmp] = useState({
    name: "",
    email: "",
    password: "",
    role: "Team Member",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [selectedEmpView, setSelectedEmpView] = useState<Employee | null>(null);

  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);

  const [editingEmp, setEditingEmp] = useState<Employee | null>(null);
  const [editEmpData, setEditEmpData] = useState({ name: "", email: "", password: "", role: "Team Member" });
  const [isUpdatingEmp, setIsUpdatingEmp] = useState(false);

  React.useEffect(() => {
    if (activeTab === "audit" && isOpen) {
      setIsLoadingLogs(true);
      leadService.fetchAuditLogs().then((data) => {
        setAuditLogs(data);
        setIsLoadingLogs(false);
      }).catch((err) => {
        console.error("Error fetching audit logs", err);
        setIsLoadingLogs(false);
      });
    }
  }, [activeTab, isOpen]);

  // Confirm Modal State
  const [confirmModalConfig, setConfirmModalConfig] = useState<{ title: string; message: string; isDestructive?: boolean } | null>(null);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  if (!isOpen) return null;

  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmp.name || !newEmp.email || !newEmp.password) {
      toast.error("Please fill all required fields!");
      return;
    }

    setIsCreatingEmp(true);
    try {
      await leadService.createEmployee(newEmp);
      toast.success("Employee account created successfully!");
      setNewEmp({ name: "", email: "", password: "", role: "Team Member" });
      onEmployeeCreated();
    } catch (error: any) {
      console.error("Error creating employee:", error);
      toast.error(error.message || "Failed to create employee.");
    } finally {
      setIsCreatingEmp(false);
    }
  };

  const handleRestoreLead = async (leadId: string) => {
    try {
      await leadService.updateLead(leadId, { isTrashed: false });
      toast.success("Lead restored successfully!");
      onLeadRestored();
    } catch (error) {
      console.error("Error restoring lead:", error);
      toast.error("Failed to restore lead");
    }
  };

  const handlePermanentDeleteLead = async (leadId: string) => {
    setConfirmAction(() => async () => {
      setConfirmModalConfig(null);
      try {
        await leadService.deletePermanentLead(leadId);
        toast.success("Lead permanently deleted.");
        onLeadRestored();
      } catch (error: any) {
        console.error("Error permanently deleting lead:", error);
        toast.error(error.message || "Failed to permanently delete lead");
      }
    });
    setConfirmModalConfig({ title: "Delete Lead", message: "Are you sure? This will permanently delete this lead and cannot be undone.", isDestructive: true });
  };

  const handleStartEditEmp = (emp: Employee) => {
    setEditingEmp(emp);
    setEditEmpData({
      name: emp.name || "",
      email: emp.email || "",
      password: "",
      role: emp.role || "Team Member",
    });
  };

  const handleUpdateEmployeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEmp) return;
    setIsUpdatingEmp(true);
    try {
      await leadService.updateEmployee(editingEmp.id, {
        name: editEmpData.name,
        email: editEmpData.email,
        role: editEmpData.role,
        ...(editEmpData.password ? { password: editEmpData.password } : {}),
      });
      toast.success("Employee updated successfully!");
      setEditingEmp(null);
      onEmployeeCreated();
    } catch (error: any) {
      console.error("Error updating employee:", error);
      toast.error(error.message || "Failed to update employee");
    } finally {
      setIsUpdatingEmp(false);
    }
  };

  const handleToggleEmpStatus = async (emp: Employee) => {
    const newStatus = emp.status === "Inactive" || emp.status === "Disabled" ? "Active" : "Inactive";
    const actionName = newStatus === "Inactive" ? "Deactivate" : "Activate";
    
    setConfirmAction(() => async () => {
      setConfirmModalConfig(null);
      try {
        await leadService.updateEmployee(emp.id, { status: newStatus });
        toast.success(`Employee ${newStatus.toLowerCase()}d successfully!`);
        onEmployeeCreated();
      } catch (error: any) {
        console.error("Error updating employee status:", error);
        toast.error(error.message || "Failed to update status");
      }
    });
    setConfirmModalConfig({ title: `${actionName} Employee`, message: `Are you sure you want to ${actionName} ${emp.name || emp.email}?`, isDestructive: newStatus === "Inactive" });
  };

  const handleRemoveEmp = async (emp: Employee) => {
    setConfirmAction(() => async () => {
      setConfirmModalConfig(null);
      try {
        await leadService.deleteEmployee(emp.id);
        toast.success("Employee removed successfully!");
        onEmployeeCreated();
      } catch (error: any) {
        console.error("Error removing employee:", error);
        toast.error(error.message || "Failed to remove employee");
      }
    });
    setConfirmModalConfig({ title: "Remove Employee", message: `Are you sure you want to permanently remove employee ${emp.name || emp.email}?`, isDestructive: true });
  };

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="w-full max-w-4xl h-[85vh] bg-white border border-[#e2e8f0] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative text-[#0f172a]">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#e2e8f0] bg-[#f8fafc] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#071633]/5 text-[#071633] border border-[#071633]/15 flex items-center justify-center font-bold">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#071633]">System Settings & Management</h2>
              <p className="text-xs text-slate-400">Configure team members, trashed leads, and workspace settings</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-[#071633] p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#e2e8f0] bg-white px-6 shrink-0">
          <button
            onClick={() => setActiveTab("employee")}
            className={`px-4 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "employee"
                ? "border-[#071633] text-[#071633]"
                : "border-transparent text-[#64748b] hover:text-[#071633]"
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Team Members ({employeesList.length})
          </button>
          <button
            onClick={() => setActiveTab("trash")}
            className={`px-4 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "trash"
                ? "border-[#071633] text-[#071633]"
                : "border-transparent text-[#64748b] hover:text-[#071633]"
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" /> Trash Bin ({trashedLeads.length})
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`px-4 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "audit"
                ? "border-[#071633] text-[#071633]"
                : "border-transparent text-[#64748b] hover:text-[#071633]"
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Audit Log
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "profile"
                ? "border-[#071633] text-[#071633]"
                : "border-transparent text-[#64748b] hover:text-[#071633]"
            }`}
          >
            <User className="w-3.5 h-3.5" /> My Profile
          </button>
          <button
            onClick={() => setActiveTab("meta")}
            className={`px-4 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "meta"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Activity className="w-3.5 h-3.5" /> Meta Dataset & CAPI
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {activeTab === "employee" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column: Create / Edit Form */}
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-5 flex flex-col gap-4 shadow-xs">
                <h3 className="text-sm font-bold text-[#071633] flex items-center gap-2">
                  {editingEmp ? <><Edit3 className="w-4 h-4 text-[#071633]" /> Edit {editingEmp.name}</> : <><UserPlus className="w-4 h-4 text-[#071633]" /> Add New Team Member</>}
                </h3>
                {editingEmp ? (
                  <form onSubmit={handleUpdateEmployeeSubmit} className="flex flex-col gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[#475569] block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={editEmpData.name}
                        onChange={(e) => setEditEmpData({ ...editEmpData, name: e.target.value })}
                        className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#0f172a] focus:outline-none focus:border-[#071633]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#475569] block mb-1">Email / Username</label>
                      <input
                        type="text"
                        required
                        value={editEmpData.email}
                        onChange={(e) => setEditEmpData({ ...editEmpData, email: e.target.value })}
                        className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#0f172a] focus:outline-none focus:border-[#071633]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#475569] block mb-1">New Password (optional)</label>
                      <input
                        type="password"
                        value={editEmpData.password}
                        onChange={(e) => setEditEmpData({ ...editEmpData, password: e.target.value })}
                        className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#0f172a] focus:outline-none focus:border-[#071633]"
                        placeholder="Leave blank to keep same"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#475569] block mb-1">System Role</label>
                      <select
                        value={editEmpData.role}
                        onChange={(e) => setEditEmpData({ ...editEmpData, role: e.target.value })}
                        className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#0f172a] focus:outline-none focus:border-[#071633]"
                      >
                        <option value="Team Member">Team Member (Executive)</option>
                        <option value="Admin">Admin / Manager</option>
                      </select>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => setEditingEmp(null)}
                        className="flex-1 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-lg hover:bg-slate-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isUpdatingEmp}
                        className="flex-1 py-2 bg-amber-500 text-black font-bold text-xs rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50"
                      >
                        {isUpdatingEmp ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleCreateEmployee} className="flex flex-col gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[#475569] block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={newEmp.name}
                        onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                        className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#0f172a] focus:outline-none focus:border-[#071633]"
                        placeholder="e.g. Rahul Verma"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#475569] block mb-1">Email / Username</label>
                      <input
                        type="text"
                        required
                        value={newEmp.email}
                        onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })}
                        className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#0f172a] focus:outline-none focus:border-[#071633]"
                        placeholder="rahul@voometdesign.com"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#475569] block mb-1">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={newEmp.password}
                          onChange={(e) => setNewEmp({ ...newEmp, password: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 pr-8"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-2 text-slate-500 text-xs hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5 text-slate-500" /> : <Eye className="w-3.5 h-3.5 text-slate-500" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#475569] block mb-1">System Role</label>
                      <select
                        value={newEmp.role}
                        onChange={(e) => setNewEmp({ ...newEmp, role: e.target.value })}
                        className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#0f172a] focus:outline-none focus:border-[#071633]"
                      >
                        <option value="Team Member">Team Member (Executive)</option>
                        <option value="Admin">Admin / Manager</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isCreatingEmp}
                      className="mt-2 w-full py-2 bg-[#071633] text-white font-bold text-xs rounded-lg hover:bg-[#0f2452] transition-colors disabled:opacity-50"
                    >
                      {isCreatingEmp ? "Creating..." : "Create Member Account"}
                    </button>
                  </form>
                )}
              </div>

              {/* Right Column: Employees List */}
              <div className="md:col-span-2 flex flex-col gap-3">
                <h3 className="text-sm font-bold text-[#071633]">Active Team Members ({employeesList.length})</h3>
                <div className="flex flex-col gap-2">
                  {employeesList.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-xs bg-slate-900/40 rounded-xl border border-slate-800">
                      No team members found.
                    </div>
                  ) : (
                    employeesList.map((emp) => (
                      <div
                        key={emp.id}
                        className={`flex items-center justify-between p-3 bg-slate-900/50 border rounded-xl hover:border-slate-700 transition-colors ${
                          emp.status === "Inactive" || emp.status === "Disabled" ? "opacity-60 border-red-900/40 bg-red-950/10" : "border-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-900/30 text-blue-400 border border-blue-800/40 flex items-center justify-center font-bold text-xs">
                            {(emp.name || emp.username || "E").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-bold text-[#071633]">{emp.name || emp.username}</p>
                              {emp.status === "Inactive" && (
                                <span className="px-1.5 py-0.2 text-[9px] font-bold bg-red-950 text-red-400 border border-red-800 rounded">
                                  Deactivated
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-400">{emp.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                              emp.role === "Admin"
                                ? "bg-amber-950/60 text-amber-400 border border-amber-800/50"
                                : "bg-slate-800 text-slate-300 border border-slate-700"
                            }`}
                          >
                            {emp.role || "Team Member"}
                          </span>
                          <button
                            onClick={() => handleStartEditEmp(emp)}
                            className="p-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                            title="Edit Employee"
                          >
                            <Edit3 className="w-3 h-3 inline mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => handleToggleEmpStatus(emp)}
                            className={`p-1.5 text-xs font-bold rounded-lg transition-colors ${
                              emp.status === "Inactive"
                                ? "bg-emerald-950 text-emerald-400 border border-emerald-800 hover:bg-emerald-900"
                                : "bg-amber-950 text-amber-400 border border-amber-800 hover:bg-amber-900"
                            }`}
                            title={emp.status === "Inactive" ? "Activate Login" : "Deactivate Login"}
                          >
                            {emp.status === "Inactive" ? "Activate" : "Deactivate"}
                          </button>
                          <button
                            onClick={() => handleRemoveEmp(emp)}
                            className="p-1.5 text-xs text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors"
                            title="Remove Employee"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}


          {activeTab === "trash" && (
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-white">Trashed / Deleted Leads ({trashedLeads.length})</h3>
              {trashedLeads.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-xs bg-slate-900/40 rounded-xl border border-slate-800">
                  Trash bin is clean! No deleted leads found.
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {trashedLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="flex items-center justify-between p-3 bg-slate-900/50 border border-slate-800 rounded-xl"
                    >
                      <div>
                        <p className="text-xs font-bold text-[#071633]">{lead.name}</p>
                        <p className="text-[10px] text-slate-400">
                          {lead.mobileNumber} • {lead.requirement} • {lead.projectLocation || "N/A"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleRestoreLead(lead.id)}
                          className="px-3 py-1 bg-emerald-950 border border-emerald-800 text-emerald-400 hover:bg-emerald-900 text-xs font-bold rounded-lg transition-colors"
                        >
                          ↩️ Restore Lead
                        </button>
                        <button
                          onClick={() => handlePermanentDeleteLead(lead.id)}
                          className="px-3 py-1 bg-red-950 border border-red-800 text-red-400 hover:bg-red-900 text-xs font-bold rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5 inline mr-1" /> Permanently Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "audit" && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">System Audit & Action Logs</h3>
                <span className="text-xs text-slate-500">Read-only history of administrative actions</span>
              </div>
              <div className="flex flex-col gap-2">
                {isLoadingLogs ? (
                  <div className="p-8 text-center text-slate-500 text-xs animate-pulse">Loading audit log history...</div>
                ) : auditLogs.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 text-xs bg-slate-900/40 rounded-xl border border-slate-800">
                    No admin audit logs recorded yet.
                  </div>
                ) : (
                  auditLogs.map((log: any) => (
                    <div
                      key={log.id}
                      className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          {log.action}
                        </span>
                        <div>
                          <p className="font-semibold text-white">{log.details || `${log.action} on ${log.targetType}`}</p>
                          <p className="text-[10px] text-slate-500">By: {log.adminUsername} • Target: {log.targetType} ({log.targetId || "N/A"})</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}



                    {activeTab === "meta" && (
            <div className="max-w-2xl mx-auto flex flex-col gap-6">
              {/* Meta Header Banner */}
              <div className="bg-gradient-to-r from-blue-950/60 to-slate-900 border border-blue-900/40 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-2xl font-black shrink-0">
                    ∞
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">Meta Conversions API (CAPI)</h3>
                      <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Active & Connected
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Server-side dataset integration syncing CRM lead status events with Meta
                    </p>
                  </div>
                </div>
              </div>

              {/* Endpoint Details Card */}
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-5 flex flex-col gap-4 shadow-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Integration Configuration</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
                    <span className="text-slate-500 block mb-1">Dataset ID (Pixel)</span>
                    <span className="font-mono font-bold text-amber-400 select-all">1434564675397419</span>
                  </div>

                  <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
                    <span className="text-slate-500 block mb-1">Graph API Version</span>
                    <span className="font-mono font-bold text-blue-400">v26.0 (Latest)</span>
                  </div>
                </div>

                <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3 text-xs">
                  <span className="text-slate-500 block mb-1">Live Endpoint URL</span>
                  <span className="font-mono text-[11px] text-slate-300 break-all select-all">
                    https://graph.facebook.com/v26.0/1434564675397419/events
                  </span>
                </div>

                <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3 text-xs flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 block mb-0.5">Dataset Access Token</span>
                    <span className="font-mono text-slate-300">EAAh0jZB9k3TkBSzU...KXUbwZDZD</span>
                  </div>
                  <span className="text-emerald-400 text-xs font-semibold">Verified Authenticated</span>
                </div>
              </div>

                            {/* Payload System Preview */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Payload System Schema (Meta Graph API)</h4>
                  <span className="text-[11px] text-blue-400 font-mono">POST /v26.0/1434564675397419/events</span>
                </div>
                <pre className="bg-slate-950 border border-slate-800/80 rounded-lg p-3 text-[11px] font-mono text-slate-300 overflow-x-auto custom-scrollbar">
{`{
  "data": [
    {
      "action_source": "system_generated",
      "custom_data": {
        "event_source": "crm",
        "lead_event_source": "Voomet CRM",
        "lead_status": "[Current Lead Status]"
      },
      "event_name": "Lead",
      "event_time": [Unix Timestamp],
      "user_data": {
        "em": ["[SHA-256 Hashed Email]"],
        "ph": ["[SHA-256 Hashed Phone]"],
        "fn": ["[SHA-256 Hashed First Name]"],
        "ct": ["[SHA-256 Hashed City]"]
      }
    }
  ]
}`}
                </pre>
              </div>

              {/* Test Connection Card */}
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-5 flex flex-col gap-4 shadow-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Test Live Connection</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Send a diagnostic test lead event directly to Meta's dataset endpoint to verify real-time ingestion.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={testEventCode}
                      onChange={(e) => setTestEventCode(e.target.value)}
                      placeholder="Test Event Code (e.g. TEST12345)"
                      className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 font-mono focus:outline-none focus:border-blue-500 w-52"
                    />
                    <button
                      disabled={isTestingMeta}
                      onClick={async () => {
                        setIsTestingMeta(true);
                        setMetaTestResult(null);
                        try {
                          const res = await fetch("/api/admin/meta-integration", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ testEventCode: testEventCode.trim() || undefined }),
                          });
                          const data = await res.json();
                          if (res.ok && data.success) {
                            setMetaTestResult({
                              success: true,
                              message: data.message || "Test lead status event received by Meta Graph API successfully!",
                              details: data.data,
                            });
                            toast.success("Meta API Connection Verified!");
                          } else {
                            setMetaTestResult({
                              success: false,
                              message: data.error || "Meta rejected the test event",
                              details: data.details,
                            });
                            toast.error("Meta test failed.");
                          }
                        } catch (err: any) {
                          setMetaTestResult({
                            success: false,
                            message: err.message || "Network error",
                          });
                          toast.error("Connection error");
                        } finally {
                          setIsTestingMeta(false);
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-blue-900/30 shrink-0 flex items-center gap-2 cursor-pointer"
                    >
                      {isTestingMeta ? (
                        <>
                          <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Testing...
                        </>
                      ) : (
                        <><Send className="w-3.5 h-3.5" /> Send Test Event</>
                      )}
                    </button>
                  </div>
                </div>

                {metaTestResult && (
                  <div
                    className={`p-4 rounded-xl border text-xs flex flex-col gap-2 ${
                      metaTestResult.success
                        ? "bg-emerald-950/30 border-emerald-800/60 text-emerald-300"
                        : "bg-red-950/30 border-red-800/60 text-red-300"
                    }`}
                  >
                    <div className="font-bold flex items-center gap-2">
                      {metaTestResult.success ? <Check className="w-4 h-4 text-emerald-600 inline mr-1" /> : <X className="w-4 h-4 text-red-600 inline mr-1" />} {metaTestResult.message}
                    </div>
                    {metaTestResult.details && (
                      <pre className="font-mono text-[11px] bg-black/40 p-2.5 rounded-lg overflow-x-auto text-slate-300">
                        {JSON.stringify(metaTestResult.details, null, 2)}
                      </pre>
                    )}
                  </div>
                )}
              </div>

              {/* Automatic Pipeline Info */}
              <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4 text-xs text-slate-400 flex flex-col gap-2">
                <span className="font-bold text-slate-300">Automated CRM Workflow:</span>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong className="text-white">New Leads:</strong> Submissions from website forms & manual entries automatically trigger a <code className="text-blue-300">Lead</code> event to Meta with SHA-256 hashed customer identifiers.</li>
                  <li><strong className="text-white">Status Updates:</strong> Whenever a lead is moved across pipeline stages (e.g., Contacted, Quotation Sent, Converted / Active Project) in this panel, a lead status transition is posted to Meta CAPI.</li>
                  <li><strong className="text-white">Privacy Compliance:</strong> All phone numbers and emails are normalized and encrypted via SHA-256 matching before transmission.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="max-w-md mx-auto bg-slate-900/60 border border-slate-800 rounded-xl p-6 flex flex-col gap-4 items-center text-center">
              <div className="w-20 h-20 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/40 flex items-center justify-center font-bold text-3xl">
                {currentUser?.charAt(0).toUpperCase() || "A"}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{currentUser || "Admin User"}</h3>
                <p className="text-xs text-amber-400 font-semibold">{currentUserRole || "System Admin"}</p>
              </div>
              <div className="w-full pt-4 border-t border-slate-800 text-left flex flex-col gap-2 text-xs text-slate-400">
                <p><strong className="text-white">Workspace:</strong> VoometDesign Lead Management System</p>
                <p><strong className="text-white">Access Level:</strong> Full Administrative Access</p>
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetch("/api/auth", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ action: "logout" }),
                    });
                  } catch (err) {
                    console.error("Logout error", err);
                  } finally {
                    window.location.href = "/login";
                  }
                }}
                className="mt-4 w-full py-2 bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Log Out of System
              </button>
            </div>
          )}
        </div>
      </div>
      
      <ConfirmModal 
        isOpen={!!confirmModalConfig}
        title={confirmModalConfig?.title || ""}
        message={confirmModalConfig?.message || ""}
        isDestructive={confirmModalConfig?.isDestructive}
        onConfirm={() => {
          if (confirmAction) confirmAction();
        }}
        onCancel={() => setConfirmModalConfig(null)}
      />
    </div>
  );
}
