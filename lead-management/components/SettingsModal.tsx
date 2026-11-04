"use client";

import React, { useState, useEffect } from "react";
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
  initialTab?: "employee" | "trash" | "audit" | "profile" | "meta";
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
  initialTab = "employee",
  onEmployeeCreated,
  onLeadRestored,
}: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<"employee" | "trash" | "audit" | "profile" | "meta">(initialTab);
  const [selectedTrashIds, setSelectedTrashIds] = useState<string[]>([]);
  const [isBulkTrashOperating, setIsBulkTrashOperating] = useState(false);

  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
      setSelectedTrashIds([]);
    }
  }, [isOpen, initialTab]);
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

  const isAllTrashSelected = trashedLeads.length > 0 && trashedLeads.every((l) => selectedTrashIds.includes(l.id));

  const handleToggleSelectAllTrash = () => {
    if (isAllTrashSelected) {
      setSelectedTrashIds([]);
    } else {
      setSelectedTrashIds(trashedLeads.map((l) => l.id));
    }
  };

  const handleToggleSelectTrashLead = (id: string) => {
    if (selectedTrashIds.includes(id)) {
      setSelectedTrashIds(selectedTrashIds.filter((item) => item !== id));
    } else {
      setSelectedTrashIds([...selectedTrashIds, id]);
    }
  };

  const handleBulkRestoreTrash = async () => {
    if (selectedTrashIds.length === 0) return;
    setIsBulkTrashOperating(true);
    try {
      await Promise.allSettled(selectedTrashIds.map((id) => leadService.updateLead(id, { isTrashed: false })));
      toast.success(`Restored ${selectedTrashIds.length} lead(s) back to active table!`);
      setSelectedTrashIds([]);
      onLeadRestored();
    } catch (err) {
      toast.error("Failed to restore some leads");
    } finally {
      setIsBulkTrashOperating(false);
    }
  };

  const handleBulkPermanentDeleteTrash = async () => {
    if (selectedTrashIds.length === 0) return;
    setConfirmAction(() => async () => {
      setConfirmModalConfig(null);
      setIsBulkTrashOperating(true);
      try {
        await Promise.allSettled(selectedTrashIds.map((id) => leadService.deletePermanentLead(id)));
        toast.success(`Permanently deleted ${selectedTrashIds.length} lead(s) from database.`);
        setSelectedTrashIds([]);
        onLeadRestored();
      } catch (err: any) {
        toast.error(err.message || "Failed to permanently delete some leads");
      } finally {
        setIsBulkTrashOperating(false);
      }
    });
    setConfirmModalConfig({
      title: "Bulk Permanent Delete",
      message: `Are you sure? This will permanently delete ${selectedTrashIds.length} lead(s) from the database and cannot be undone.`,
      isDestructive: true,
    });
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
                    <div className="p-8 text-center text-[#64748b] text-xs bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
                      No team members found.
                    </div>
                  ) : (
                    employeesList.map((emp) => (
                      <div
                        key={emp.id}
                        className={`flex items-center justify-between p-3.5 bg-white border rounded-xl hover:border-[#cbd5e1] hover:shadow-xs transition-all ${
                          emp.status === "Inactive" || emp.status === "Disabled" ? "opacity-60 border-red-200 bg-red-50/40" : "border-[#e2e8f0]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#071633]/5 text-[#071633] border border-[#071633]/15 flex items-center justify-center font-bold text-xs">
                            {(emp.name || emp.username || "E").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-bold text-[#071633]">{emp.name || emp.username}</p>
                              {emp.status === "Inactive" && (
                                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-red-100 text-red-700 border border-red-200 rounded">
                                  Deactivated
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#64748b]">{emp.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border ${
                              emp.role === "Admin"
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : "bg-slate-100 text-[#475569] border-[#e2e8f0]"
                            }`}
                          >
                            {emp.role || "Team Member"}
                          </span>
                          <button
                            onClick={() => handleStartEditEmp(emp)}
                            className="px-2.5 py-1 text-xs font-semibold text-[#071633] hover:bg-[#f1f5f9] bg-white border border-[#cbd5e1] rounded-lg transition-colors shadow-xs"
                            title="Edit Employee"
                          >
                            <Edit3 className="w-3 h-3 inline mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => handleToggleEmpStatus(emp)}
                            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors shadow-xs ${
                              emp.status === "Inactive"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                                : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                            }`}
                            title={emp.status === "Inactive" ? "Activate Login" : "Deactivate Login"}
                          >
                            {emp.status === "Inactive" ? "Activate" : "Deactivate"}
                          </button>
                          <button
                            onClick={() => handleRemoveEmp(emp)}
                            className="p-1.5 text-xs text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors shadow-xs"
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
              <div className="flex flex-wrap justify-between items-center gap-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#071633]">Trashed / Deleted Leads ({trashedLeads.length})</h3>
                  {trashedLeads.length > 0 && (
                    <label className="flex items-center gap-2 text-xs font-semibold text-[#475569] cursor-pointer ml-3 bg-[#f1f5f9] px-2.5 py-1 rounded-lg border border-[#e2e8f0]">
                      <input
                        type="checkbox"
                        checked={isAllTrashSelected}
                        onChange={handleToggleSelectAllTrash}
                        className="rounded border-slate-400 text-[#071633] focus:ring-0 cursor-pointer"
                      />
                      <span>Select All ({trashedLeads.length})</span>
                    </label>
                  )}
                </div>

                {selectedTrashIds.length > 0 && (
                  <div className="flex items-center gap-2 animate-fade-in">
                    <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                      {selectedTrashIds.length} marked
                    </span>
                    <button
                      onClick={handleBulkRestoreTrash}
                      disabled={isBulkTrashOperating}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors shadow-xs flex items-center gap-1 disabled:opacity-50"
                    >
                      ↩️ Restore ({selectedTrashIds.length})
                    </button>
                    <button
                      onClick={handleBulkPermanentDeleteTrash}
                      disabled={isBulkTrashOperating}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors shadow-xs flex items-center gap-1 disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5 inline" /> Delete Permanently ({selectedTrashIds.length})
                    </button>
                  </div>
                )}
              </div>

              {trashedLeads.length === 0 ? (
                <div className="p-12 text-center text-[#64748b] text-xs bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
                  Trash bin is clean! No deleted leads found.
                </div>
              ) : (
                <div className="flex flex-col gap-2 max-h-[460px] overflow-y-auto custom-scrollbar pr-1">
                  {trashedLeads.map((lead) => {
                    const isSelected = selectedTrashIds.includes(lead.id);
                    return (
                      <div
                        key={lead.id}
                        className={`flex items-center justify-between p-3.5 border rounded-xl transition-all shadow-xs ${
                          isSelected ? "bg-red-50/40 border-red-200" : "bg-white border-[#e2e8f0] hover:border-[#cbd5e1]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelectTrashLead(lead.id)}
                            className="rounded border-slate-400 text-red-600 focus:ring-0 cursor-pointer"
                          />
                          <div>
                            <p className="text-xs font-bold text-[#071633]">{lead.name}</p>
                            <p className="text-[11px] text-[#64748b]">
                              {lead.mobileNumber} • {lead.requirement} • {lead.projectLocation || "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleRestoreLead(lead.id)}
                            className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-xs font-bold rounded-lg transition-colors shadow-xs"
                          >
                            ↩️ Restore
                          </button>
                          <button
                            onClick={() => handlePermanentDeleteLead(lead.id)}
                            className="px-3 py-1.5 bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 text-xs font-bold rounded-lg transition-colors shadow-xs"
                          >
                            <Trash2 className="w-3.5 h-3.5 inline mr-1" /> Permanent Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "audit" && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-[#071633]">System Audit & Action Logs</h3>
                <span className="text-xs text-[#64748b]">Read-only history of administrative actions</span>
              </div>
              <div className="flex flex-col gap-2">
                {isLoadingLogs ? (
                  <div className="p-8 text-center text-[#64748b] text-xs animate-pulse">Loading audit log history...</div>
                ) : auditLogs.length === 0 ? (
                  <div className="p-12 text-center text-[#64748b] text-xs bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
                    No admin audit logs recorded yet.
                  </div>
                ) : (
                  auditLogs.map((log: any) => (
                    <div
                      key={log.id}
                      className="p-3.5 bg-white border border-[#e2e8f0] rounded-xl flex items-center justify-between text-xs shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-[#071633]/5 text-[#071633] border border-[#071633]/15">
                          {log.action}
                        </span>
                        <div>
                          <p className="font-semibold text-[#071633]">{log.details || `${log.action} on ${log.targetType}`}</p>
                          <p className="text-[11px] text-[#64748b]">By: {log.adminUsername} • Target: {log.targetType} ({log.targetId || "N/A"})</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#94a3b8] font-mono">
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
              <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0081FB] text-white flex items-center justify-center text-2xl font-black shrink-0 shadow-xs">
                    ∞
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-[#071633]">Meta Conversions API (CAPI)</h3>
                      <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                        Active & Connected
                      </span>
                    </div>
                    <p className="text-xs text-blue-900 mt-0.5">
                      Server-side dataset integration syncing CRM lead status events with Meta
                    </p>
                  </div>
                </div>
              </div>

              {/* Endpoint Details Card */}
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-5 flex flex-col gap-4 shadow-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#475569]">Integration Configuration</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white border border-[#e2e8f0] rounded-xl p-3 shadow-xs">
                    <span className="text-[#64748b] block mb-1">Dataset ID (Pixel)</span>
                    <span className="font-mono font-bold text-[#071633] select-all">1434564675397419</span>
                  </div>

                  <div className="bg-white border border-[#e2e8f0] rounded-xl p-3 shadow-xs">
                    <span className="text-[#64748b] block mb-1">Graph API Version</span>
                    <span className="font-mono font-bold text-[#0081FB]">v26.0 (Latest)</span>
                  </div>
                </div>

                <div className="bg-white border border-[#e2e8f0] rounded-xl p-3 text-xs shadow-xs">
                  <span className="text-[#64748b] block mb-1">Live Endpoint URL</span>
                  <span className="font-mono text-[11px] text-[#334155] break-all select-all">
                    https://graph.facebook.com/v26.0/1434564675397419/events
                  </span>
                </div>

                <div className="bg-white border border-[#e2e8f0] rounded-xl p-3 text-xs flex items-center justify-between shadow-xs">
                  <div>
                    <span className="text-[#64748b] block mb-0.5">Dataset Access Token</span>
                    <span className="font-mono text-[#334155]">EAAh0jZB9k3TkBSzU...KXUbwZDZD</span>
                  </div>
                  <span className="text-emerald-700 text-xs font-semibold">Verified Authenticated</span>
                </div>
              </div>

              {/* Payload System Preview */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 flex flex-col gap-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#475569]">Payload System Schema (Meta Graph API)</h4>
                  <span className="text-[11px] text-[#0081FB] font-mono font-semibold">POST /v26.0/1434564675397419/events</span>
                </div>
                <pre className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-3 text-[11px] font-mono text-[#0f172a] overflow-x-auto custom-scrollbar">
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
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#071633]">Test Live Connection</h4>
                    <p className="text-xs text-[#64748b] mt-0.5">
                      Send a diagnostic test lead event directly to Meta's dataset endpoint to verify real-time ingestion.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={testEventCode}
                      onChange={(e) => setTestEventCode(e.target.value)}
                      placeholder="Test Event Code (e.g. TEST12345)"
                      className="bg-white border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs text-[#0f172a] placeholder:text-[#94a3b8] font-mono focus:outline-none focus:border-[#0081FB] w-52 shadow-xs"
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
                      className="px-4 py-2 bg-[#0081FB] hover:bg-blue-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all shadow-sm shrink-0 flex items-center gap-2 cursor-pointer"
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
                        ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                        : "bg-red-50 border-red-200 text-red-900"
                    }`}
                  >
                    <div className="font-bold flex items-center gap-2">
                      {metaTestResult.success ? <Check className="w-4 h-4 text-emerald-600 inline mr-1" /> : <X className="w-4 h-4 text-red-600 inline mr-1" />} {metaTestResult.message}
                    </div>
                    {metaTestResult.details && (
                      <pre className="font-mono text-[11px] bg-white border border-[#e2e8f0] p-2.5 rounded-lg overflow-x-auto text-[#0f172a]">
                        {JSON.stringify(metaTestResult.details, null, 2)}
                      </pre>
                    )}
                  </div>
                )}
              </div>

              {/* Automatic Pipeline Info */}
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4 text-xs text-[#475569] flex flex-col gap-2">
                <span className="font-bold text-[#071633]">Automated CRM Workflow:</span>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong className="text-[#071633]">New Leads:</strong> Submissions from website forms & manual entries automatically trigger a <code className="text-blue-700 bg-blue-50 px-1 py-0.5 rounded font-mono">Lead</code> event to Meta with SHA-256 hashed customer identifiers.</li>
                  <li><strong className="text-[#071633]">Status Updates:</strong> Whenever a lead is moved across pipeline stages in this panel, a lead status transition is posted to Meta CAPI.</li>
                  <li><strong className="text-[#071633]">Privacy Compliance:</strong> All phone numbers and emails are normalized and encrypted via SHA-256 matching before transmission.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="max-w-md mx-auto bg-white border border-[#e2e8f0] rounded-2xl shadow-xs p-6 flex flex-col gap-4 items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#071633]/5 text-[#071633] border border-[#071633]/15 flex items-center justify-center font-bold text-3xl">
                {currentUser?.charAt(0).toUpperCase() || "A"}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#071633]">{currentUser || "Admin User"}</h3>
                <p className="text-xs text-[#c29b28] font-semibold">{currentUserRole || "System Admin"}</p>
              </div>
              <div className="w-full pt-4 border-t border-[#e2e8f0] text-left flex flex-col gap-2 text-xs text-[#64748b]">
                <p><strong className="text-[#071633]">Workspace:</strong> VoometDesign Lead Management System</p>
                <p><strong className="text-[#071633]">Access Level:</strong> Full Administrative Access</p>
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
                className="mt-4 w-full py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
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
