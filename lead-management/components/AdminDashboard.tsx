"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { Lead, Employee, Notification, CRM_STATUSES_ADMIN, SERVICE_TYPES, LEAD_SOURCES } from "../types";
import { leadService } from "../services/leadService";
import LeadDetailModal from "./LeadDetailModal";
import AddLeadModal from "./AddLeadModal";
import ExportModal from "./ExportModal";
import SettingsModal from "./SettingsModal";
import ConfirmModal from "./ConfirmModal";
import { toast, ToastContainer } from "./Toast";
import "../styles/lead-management.css";

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

  // Tab Navigation: "leads" | "performance" | "sources"
  const [activeMainTab, setActiveMainTab] = useState<"leads" | "performance" | "sources">("leads");

  // Filters & Search State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterSource, setFilterSource] = useState<string>("All");
  const [filterService, setFilterService] = useState<string>("All");
  const [filterLocation, setFilterLocation] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterEmployee, setFilterEmployee] = useState<string>("All");

  // Clickable Stat Cards Filter State
  const [activeStatCard, setActiveStatCard] = useState<"total" | "new" | "inprogress" | "converted" | "unassigned">("total");

  const handleStatCardClick = (card: "total" | "new" | "inprogress" | "converted" | "unassigned") => {
    if (activeStatCard === card) {
      setActiveStatCard("total");
      setFilterStatus("All");
      setFilterEmployee("All");
    } else {
      setActiveStatCard(card);
      if (card === "total") {
        setFilterStatus("All");
        setFilterEmployee("All");
      } else if (card === "new") {
        setFilterStatus("New Lead");
        setFilterEmployee("All");
      } else if (card === "inprogress") {
        setFilterStatus("All");
        setFilterEmployee("All");
      } else if (card === "converted") {
        setFilterStatus("Converted / Active Project");
        setFilterEmployee("All");
      } else if (card === "unassigned") {
        setFilterEmployee("Unassigned");
        setFilterStatus("All");
      }
    }
  };

  // Analytics Date Filter States (Phase 7 Updated)
  const [analyticsPreset, setAnalyticsPreset] = useState<"all" | "this_month" | "last_month" | "custom">("all");
  const [analyticsDateFrom, setAnalyticsDateFrom] = useState<string>("");
  const [analyticsDateTo, setAnalyticsDateTo] = useState<string>("");

  // Phase 4: Bulk Actions Multi-Select State
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [bulkTargetEmployee, setBulkTargetEmployee] = useState<string>("Unassigned");
  const [isBulkOperating, setIsBulkOperating] = useState(false);

  // Confirm Modal State
  const [confirmModalConfig, setConfirmModalConfig] = useState<{ title: string; message: string; isDestructive?: boolean } | null>(null);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  // Modals
  const [selectedLeadForDetails, setSelectedLeadForDetails] = useState<Lead | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [adminAvatar, setAdminAvatar] = useState<string | null>(null);

  const [employeesList, setEmployeesList] = useState<Employee[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Debounce 300ms for search query (Phase 5)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch Session Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/profile");
        if (res.ok) {
          const { data } = await res.json();
          if (data) {
            setCurrentUser(data.name || data.username);
            setCurrentUserRole(data.role || "Admin");
            setAdminAvatar(data.avatarUrl || null);
          }
        }
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };
    fetchProfile();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [fetchedLeads, fetchedEmployees, fetchedNotifications] = await Promise.all([
        leadService.fetchLeads(),
        leadService.fetchEmployees(),
        leadService.fetchNotifications(),
      ]);
      setLeads(fetchedLeads);
      setEmployeesList(fetchedEmployees);
      setNotifications(fetchedNotifications);
    } catch (err) {
      console.error("Error loading dashboard data", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered Leads Calculation
  const activeLeads = useMemo(() => leads.filter((l) => !l.isTrashed), [leads]);
  const trashedLeads = useMemo(() => leads.filter((l) => l.isTrashed), [leads]);

  const filteredLeads = useMemo(() => {
    return activeLeads.filter((lead) => {
      if (debouncedSearchQuery.trim()) {
        const q = debouncedSearchQuery.toLowerCase();
        const matchName = lead.name?.toLowerCase().includes(q);
        const matchMobile = lead.mobileNumber?.toLowerCase().includes(q);
        const matchEmail = lead.email?.toLowerCase().includes(q);
        const matchId = lead.id?.toLowerCase().includes(q);
        if (!matchName && !matchMobile && !matchEmail && !matchId) return false;
      }
      if (filterDate && new Date(lead.createdAt).toISOString().slice(0, 10) !== filterDate) {
        return false;
      }
      if (filterSource !== "All" && (lead.submissionSource || lead.source) !== filterSource) {
        return false;
      }
      if (filterService !== "All" && lead.requirement !== filterService) {
        return false;
      }
      if (filterLocation !== "All" && lead.projectLocation !== filterLocation) {
        return false;
      }
      if (filterStatus !== "All" && lead.status !== filterStatus) {
        return false;
      }
      if (filterEmployee !== "All" && lead.handledBy !== filterEmployee) {
        return false;
      }
      if (activeStatCard === "new" && lead.status !== "New Lead") {
        return false;
      }
      if (activeStatCard === "inprogress" && (lead.status !== "In Progress" && lead.status !== "Follow-Up")) {
        return false;
      }
      if (activeStatCard === "converted" && lead.status !== "Converted / Active Project") {
        return false;
      }
      if (activeStatCard === "unassigned" && (lead.handledBy && lead.handledBy !== "Unassigned")) {
        return false;
      }
      return true;
    });
  }, [activeLeads, debouncedSearchQuery, filterDate, filterSource, filterService, filterLocation, filterStatus, filterEmployee, activeStatCard]);

  // Checkbox Selection Helpers (Phase 4)
  const isAllSelected = useMemo(() => {
    if (filteredLeads.length === 0) return false;
    return filteredLeads.every((l) => selectedLeadIds.includes(l.id));
  }, [filteredLeads, selectedLeadIds]);

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedLeadIds([]);
    } else {
      setSelectedLeadIds(filteredLeads.map((l) => l.id));
    }
  };

  const handleToggleSelectLead = (id: string) => {
    if (selectedLeadIds.includes(id)) {
      setSelectedLeadIds(selectedLeadIds.filter((item) => item !== id));
    } else {
      setSelectedLeadIds([...selectedLeadIds, id]);
    }
  };

  // Bulk Operations Handlers (Phase 4)
  const handleBulkAssign = async () => {
    if (selectedLeadIds.length === 0) return;
    setIsBulkOperating(true);
    const originalLeads = [...leads];
    
    // Optimistic UI
    setLeads((prev) => prev.map((l) => selectedLeadIds.includes(l.id) ? { ...l, handledBy: bulkTargetEmployee } : l));

    try {
      await leadService.bulkUpdateLeads(selectedLeadIds, { handledBy: bulkTargetEmployee });
      toast.success(`Successfully assigned ${selectedLeadIds.length} leads to ${bulkTargetEmployee}`);
      setSelectedLeadIds([]);
    } catch (err: any) {
      console.error("Bulk assign error", err);
      toast.error(err.message || "Failed to perform bulk assign");
      setLeads(originalLeads);
    } finally {
      setIsBulkOperating(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedLeadIds.length === 0) return;
    
    setConfirmAction(() => async () => {
      setIsBulkOperating(true);
      const originalLeads = [...leads];
      
      // Optimistic UI
      setLeads((prev) => prev.map((l) => selectedLeadIds.includes(l.id) ? { ...l, isTrashed: true } : l));
      setConfirmModalConfig(null);

      try {
        await leadService.bulkDeleteLeads(selectedLeadIds);
        toast.success(`Moved ${selectedLeadIds.length} leads to trash.`);
        setSelectedLeadIds([]);
      } catch (err: any) {
        console.error("Bulk delete error", err);
        toast.error(err.message || "Failed to perform bulk delete");
        setLeads(originalLeads);
      } finally {
        setIsBulkOperating(false);
      }
    });
    setConfirmModalConfig({ title: "Bulk Trash Leads", message: `Are you sure you want to move ${selectedLeadIds.length} selected leads to trash?`, isDestructive: true });
  };

  const handleBulkExportCSV = () => {
    const selectedLeadsObjects = activeLeads.filter((l) => selectedLeadIds.includes(l.id));
    if (selectedLeadsObjects.length === 0) return;

    const headers = ["ID", "Name", "Mobile", "Email", "Requirement", "Location", "Area SqFt", "Status", "Handled By", "Source", "Created At"];
    const rows = selectedLeadsObjects.map((l) => [
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
    link.setAttribute("download", `bulk_leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Lead Actions
  const handleStatusChange = async (leadId: string, newStatus: string) => {
    const originalLeads = [...leads];
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)));
    try {
      await leadService.updateLead(leadId, { status: newStatus });
      toast.success("Status updated!");
    } catch (err: any) {
      console.error("Error changing status", err);
      toast.error(err.message || "Failed to update status");
      setLeads(originalLeads);
    }
  };

  const handleAssignmentChange = async (leadId: string, newHandler: string) => {
    const originalLeads = [...leads];
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, handledBy: newHandler } : l)));
    try {
      await leadService.updateLead(leadId, { handledBy: newHandler });
      toast.success("Lead assigned successfully!");
    } catch (err: any) {
      console.error("Error assigning lead", err);
      toast.error(err.message || "Failed to assign lead");
      setLeads(originalLeads);
    }
  };

  const handleTogglePin = async (leadId: string, currentPinState?: boolean) => {
    const originalLeads = [...leads];
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, isPinned: !currentPinState } : l)));
    try {
      await leadService.updateLead(leadId, { isPinned: !currentPinState });
    } catch (err: any) {
      console.error("Error toggling pin", err);
      toast.error(err.message || "Failed to toggle pin");
      setLeads(originalLeads);
    }
  };

  const handleTrashLead = async (leadId: string) => {
    setConfirmAction(() => async () => {
      const originalLeads = [...leads];
      setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, isTrashed: true } : l)));
      setConfirmModalConfig(null);
      
      try {
        await leadService.updateLead(leadId, { isTrashed: true });
        toast.success("Lead moved to trash!");
      } catch (err: any) {
        console.error("Error trashing lead", err);
        toast.error(err.message || "Failed to move lead to trash");
        setLeads(originalLeads);
      }
    });
    setConfirmModalConfig({ title: "Trash Lead", message: "Are you sure you want to move this lead to trash?", isDestructive: true });
  };

  // Stats calculation
  const totalLeadsCount = activeLeads.length;
  const newLeadsCount = activeLeads.filter((l) => l.status === "New Lead").length;
  const inProgressCount = activeLeads.filter((l) => l.status === "In Progress" || l.status === "Follow-Up").length;
  const convertedCount = activeLeads.filter((l) => l.status === "Converted / Active Project").length;
  const unassignedCount = activeLeads.filter((l) => !l.handledBy || l.handledBy === "Unassigned").length;

  // Phase 6: Performance Metrics Calculation
  const performanceMetrics = useMemo(() => {
    return employeesList.map((emp) => {
      const tag = `Pinned: ${emp.name || emp.username}`;
      const empLeads = activeLeads.filter((l) => l.handledBy === tag || l.handledBy === emp.name || l.handledBy === emp.username);
      const converted = empLeads.filter((l) => l.status === "Converted / Active Project").length;
      const total = empLeads.length;
      const conversionRate = total > 0 ? Math.round((converted / total) * 100) : 0;

      return {
        id: emp.id,
        name: emp.name || emp.username || emp.email,
        role: emp.role || "Team Member",
        totalLeads: total,
        convertedLeads: converted,
        conversionRate,
      };
    }).sort((a, b) => b.conversionRate - a.conversionRate || b.convertedLeads - a.convertedLeads);
  }, [employeesList, activeLeads]);

  // Phase 7: Lead Source Breakdown Metrics (Date-Filterable)
  const sourceFilteredLeads = useMemo(() => {
    return activeLeads.filter((lead) => {
      const created = new Date(lead.createdAt);
      const now = new Date();

      if (analyticsPreset === "this_month") {
        if (created.getMonth() !== now.getMonth() || created.getFullYear() !== now.getFullYear()) {
          return false;
        }
      } else if (analyticsPreset === "last_month") {
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        if (created.getMonth() !== lastMonth.getMonth() || created.getFullYear() !== lastMonth.getFullYear()) {
          return false;
        }
      } else if (analyticsPreset === "custom") {
        if (analyticsDateFrom && created < new Date(analyticsDateFrom)) return false;
        if (analyticsDateTo && created > new Date(analyticsDateTo + "T23:59:59")) return false;
      }
      return true;
    });
  }, [activeLeads, analyticsPreset, analyticsDateFrom, analyticsDateTo]);

  const sourceBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    LEAD_SOURCES.forEach((s) => { counts[s] = 0; });

    sourceFilteredLeads.forEach((lead) => {
      const src = lead.source || lead.submissionSource || "Website";
      counts[src] = (counts[src] || 0) + 1;
    });

    const total = sourceFilteredLeads.length || 1;
    return Object.entries(counts).map(([source, count]) => ({
      source,
      count,
      percentage: sourceFilteredLeads.length > 0 ? Math.round((count / total) * 100) : 0,
    })).sort((a, b) => b.count - a.count);
  }, [sourceFilteredLeads]);

  const handleLogout = async () => {
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
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col font-sans admin-dashboard-root">
      {/* Top Header Navigation */}
      <header className="h-16 border-b border-slate-800/60 bg-[#0F172A]/90 backdrop-blur-md px-6 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo/logo.webp" alt="VoometDesign" width={140} height={40} className="h-6 w-auto object-contain mr-2" />
            <h1 className="text-lg font-bold tracking-tight text-white hidden sm:block">Lead Management</h1>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
            Admin Suite
          </span>
        </div>

        {/* Tab Switcher: Leads | Team Performance | Source Analytics */}
        <div className="flex bg-[#030712] p-1 rounded-xl border border-slate-800/60 text-xs">
          <button
            onClick={() => setActiveMainTab("leads")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeMainTab === "leads" ? "bg-[#D4AF37] text-[#0F172A] shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            📋 Leads Table
          </button>
          <button
            onClick={() => setActiveMainTab("performance")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeMainTab === "performance" ? "bg-[#D4AF37] text-[#0F172A] shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            🏆 Team Performance
          </button>
          <button
            onClick={() => setActiveMainTab("sources")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeMainTab === "sources" ? "bg-[#D4AF37] text-[#0F172A] shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            📊 Source Analytics
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Phase 3: Notifications Center Button */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-xl bg-slate-800/70 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors relative"
            >
              🔔
              {notifications.filter((n) => !n.isRead).length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {notifications.filter((n) => !n.isRead).length}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50">
                <div className="p-3 border-b border-slate-800 bg-slate-900/80 font-bold text-xs text-white flex justify-between">
                  <span>Admin Notifications</span>
                  <span className="text-slate-400">{notifications.length} Total</span>
                </div>
                <div className="max-h-72 overflow-y-auto custom-scrollbar p-2 flex flex-col gap-1 text-xs">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-center text-slate-500">No new notifications</p>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-300">
                        <p className="font-semibold text-white">{n.message}</p>
                        <span className="text-[9px] text-slate-500">{new Date(n.createdAt).toLocaleString()}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700/60 transition-colors flex items-center gap-1.5"
          >
            📊 Export CSV
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl transition-colors shadow-[0_0_15px_rgba(245,158,11,0.25)] flex items-center gap-1.5"
          >
            ➕ Add Lead
          </button>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-xl bg-slate-800/70 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            title="System Settings"
          >
            ⚙️
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-red-950/60 hover:bg-red-900 border border-red-800/60 text-red-300 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
            title="Log Out"
          >
            🚪 Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 flex flex-col gap-6 max-w-7xl mx-auto w-full">
        {/* KPI Stats Grid - Clickable Filters */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div
            onClick={() => handleStatCardClick("total")}
            className={`p-4 rounded-2xl cursor-pointer transition-all flex flex-col gap-1 border ${
              activeStatCard === "total"
                ? "bg-slate-800/90 border-slate-400 shadow-[0_0_15px_rgba(148,163,184,0.3)] ring-1 ring-slate-400/50 scale-[1.02]"
                : "bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60"
            }`}
            title="Click to view all active leads"
          >
            <span className="text-xs font-semibold text-slate-400">Total Active Leads</span>
            <span className="text-2xl font-bold text-white">{totalLeadsCount}</span>
          </div>

          <div
            onClick={() => handleStatCardClick("new")}
            className={`p-4 rounded-2xl cursor-pointer transition-all flex flex-col gap-1 border ${
              activeStatCard === "new"
                ? "bg-blue-900/40 border-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.35)] ring-1 ring-blue-400/50 scale-[1.02]"
                : "bg-blue-950/20 border-blue-800/30 hover:border-blue-700/50 hover:bg-blue-950/40"
            }`}
            title="Click to filter New Leads"
          >
            <span className="text-xs font-semibold text-blue-400">New Leads</span>
            <span className="text-2xl font-bold text-blue-300">{newLeadsCount}</span>
          </div>

          <div
            onClick={() => handleStatCardClick("inprogress")}
            className={`p-4 rounded-2xl cursor-pointer transition-all flex flex-col gap-1 border ${
              activeStatCard === "inprogress"
                ? "bg-amber-900/40 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.35)] ring-1 ring-amber-400/50 scale-[1.02]"
                : "bg-amber-950/20 border-amber-800/30 hover:border-amber-700/50 hover:bg-amber-950/40"
            }`}
            title="Click to filter In Progress & Follow-Up Leads"
          >
            <span className="text-xs font-semibold text-amber-400">In Progress / Follow-Up</span>
            <span className="text-2xl font-bold text-amber-300">{inProgressCount}</span>
          </div>

          <div
            onClick={() => handleStatCardClick("converted")}
            className={`p-4 rounded-2xl cursor-pointer transition-all flex flex-col gap-1 border ${
              activeStatCard === "converted"
                ? "bg-emerald-900/40 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.35)] ring-1 ring-emerald-400/50 scale-[1.02]"
                : "bg-emerald-950/20 border-emerald-800/30 hover:border-emerald-700/50 hover:bg-emerald-950/40"
            }`}
            title="Click to filter Converted Leads"
          >
            <span className="text-xs font-semibold text-emerald-400">Converted</span>
            <span className="text-2xl font-bold text-emerald-300">{convertedCount}</span>
          </div>

          <div
            onClick={() => handleStatCardClick("unassigned")}
            className={`p-4 rounded-2xl cursor-pointer transition-all flex flex-col gap-1 border ${
              activeStatCard === "unassigned"
                ? "bg-purple-900/40 border-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.35)] ring-1 ring-purple-400/50 scale-[1.02]"
                : "bg-purple-950/20 border-purple-800/30 hover:border-purple-700/50 hover:bg-purple-950/40"
            }`}
            title="Click to filter Unassigned Leads"
          >
            <span className="text-xs font-semibold text-purple-400">Unassigned</span>
            <span className="text-2xl font-bold text-purple-300">{unassignedCount}</span>
          </div>
        </div>

        {/* Phase 4: Floating Bulk Action Bar */}
        {selectedLeadIds.length > 0 && activeMainTab === "leads" && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex flex-wrap justify-between items-center gap-3 animate-fade-in shadow-xl">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-black font-bold text-xs flex items-center justify-center">
                {selectedLeadIds.length}
              </span>
              <span className="text-xs font-bold text-amber-300">
                {selectedLeadIds.length} Leads Selected
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 rounded-xl px-2 py-1">
                <span className="text-slate-400 text-[11px]">Assign To:</span>
                <select
                  value={bulkTargetEmployee}
                  onChange={(e) => setBulkTargetEmployee(e.target.value)}
                  className="bg-transparent text-white focus:outline-none text-xs"
                >
                  <option value="Unassigned" className="bg-slate-900">Unassigned</option>
                  {employeesList.map((emp) => (
                    <option key={emp.id} value={`Pinned: ${emp.name || emp.username}`} className="bg-slate-900">
                      Pinned: {emp.name || emp.username}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleBulkAssign}
                  disabled={isBulkOperating}
                  className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors disabled:opacity-50"
                >
                  Apply
                </button>
              </div>

              <button
                onClick={handleBulkExportCSV}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl border border-slate-700 transition-colors"
              >
                📥 Export CSV ({selectedLeadIds.length})
              </button>

              <button
                onClick={handleBulkDelete}
                disabled={isBulkOperating}
                className="px-3 py-1.5 bg-red-950 border border-red-800 text-red-400 hover:bg-red-900 font-bold rounded-xl transition-colors disabled:opacity-50"
              >
                🗑️ Bulk Move to Trash
              </button>

              <button
                onClick={() => setSelectedLeadIds([])}
                className="text-slate-400 hover:text-white px-2 py-1 text-xs"
              >
                Deselect All
              </button>
            </div>
          </div>
        )}

        {/* MAIN TAB 1: LEADS TABLE */}
        {activeMainTab === "leads" && (
          <>
            {/* Phase 5: Debounced Search & Filter Bar */}
            <div className="p-4 rounded-2xl bg-[#0F172A] border border-slate-800/60 flex flex-wrap gap-3 items-center justify-between">
              <div className="flex-1 min-w-[200px] relative">
                <input
                  type="text"
                  placeholder="🔍 Search lead name, mobile, email, ID (debounced 300ms)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#030712] border border-slate-700/60 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]/50 pr-8"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-2 text-slate-500 hover:text-white text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <select
                  value={filterService}
                  onChange={(e) => setFilterService(e.target.value)}
                  className="bg-[#030712] border border-slate-700/60 rounded-xl px-3 py-2 text-slate-300 focus:outline-none"
                >
                  <option value="All">All Services</option>
                  {SERVICE_TYPES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-[#030712] border border-slate-700/60 rounded-xl px-3 py-2 text-slate-300 focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  {CRM_STATUSES_ADMIN.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>

                <select
                  value={filterEmployee}
                  onChange={(e) => setFilterEmployee(e.target.value)}
                  className="bg-[#030712] border border-slate-700/60 rounded-xl px-3 py-2 text-slate-300 focus:outline-none"
                >
                  <option value="All">All Employees</option>
                  <option value="Unassigned">Unassigned</option>
                  {employeesList.map((emp) => (
                    <option key={emp.id} value={`Pinned: ${emp.name || emp.username}`}>
                      Pinned: {emp.name || emp.username}
                    </option>
                  ))}
                </select>

                <select
                  value={filterSource}
                  onChange={(e) => setFilterSource(e.target.value)}
                  className="bg-[#030712] border border-slate-700/60 rounded-xl px-3 py-2 text-slate-300 focus:outline-none"
                >
                  <option value="All">All Sources</option>
                  {LEAD_SOURCES.map((src) => (
                    <option key={src} value={src}>{src}</option>
                  ))}
                </select>

                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="bg-[#030712] border border-slate-700/60 rounded-xl px-3 py-2 text-slate-300 focus:outline-none"
                />

                {(searchQuery || filterService !== "All" || filterStatus !== "All" || filterEmployee !== "All" || filterSource !== "All" || filterDate || activeStatCard !== "total") && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setFilterService("All");
                      setFilterStatus("All");
                      setFilterEmployee("All");
                      setFilterSource("All");
                      setFilterDate("");
                      setActiveStatCard("total");
                    }}
                    className="px-3 py-2 bg-red-950/40 border border-red-800/40 text-red-400 font-bold rounded-xl hover:bg-red-900/50"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Leads Table */}
            <div className="rounded-2xl bg-[#0F172A] border border-slate-800/60 overflow-hidden flex flex-col flex-1 shadow-xl">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-sm text-slate-300 border-collapse">
                  <thead className="bg-[#030712] border-b border-slate-800/60 text-slate-400 uppercase tracking-wider font-bold text-xs">
                    <tr>
                      {/* Phase 4: Header Checkbox */}
                      <th className="py-3.5 px-4 w-10">
                        <input
                          type="checkbox"
                          checked={isAllSelected}
                          onChange={handleToggleSelectAll}
                          className="rounded border-slate-700 text-amber-500 focus:ring-0 cursor-pointer"
                        />
                      </th>
                      <th className="py-3.5 px-3 w-8">Pin</th>
                      <th className="py-3.5 px-4">Customer</th>
                      <th className="py-3.5 px-4">Contact</th>
                      <th className="py-3.5 px-4">Requirement</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Assigned To</th>
                      <th className="py-3.5 px-4">Source</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {isLoading ? (
                      <tr>
                        <td colSpan={10} className="py-12 text-center text-slate-500 animate-pulse">
                          Loading lead management records...
                        </td>
                      </tr>
                    ) : filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="py-12 text-center text-slate-500">
                          No leads match your current search or filter.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => {
                        const isSelected = selectedLeadIds.includes(lead.id);
                        return (
                          <tr
                            key={lead.id}
                            className={`hover:bg-slate-800/30 transition-colors ${
                              lead.isPinned ? "bg-amber-950/10 border-l-2 border-amber-500" : ""
                            } ${isSelected ? "bg-amber-500/5" : ""}`}
                          >
                            <td className="py-3 px-4">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleToggleSelectLead(lead.id)}
                                className="rounded border-slate-700 text-amber-500 focus:ring-0 cursor-pointer"
                              />
                            </td>
                            <td className="py-3 px-3">
                              <button
                                onClick={() => handleTogglePin(lead.id, lead.isPinned)}
                                className={`text-sm ${lead.isPinned ? "opacity-100" : "opacity-30 hover:opacity-100"}`}
                                title={lead.isPinned ? "Unpin Lead" : "Pin Lead"}
                              >
                                📌
                              </button>
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => setSelectedLeadForDetails(lead)}
                                className="font-bold text-white hover:text-amber-400 text-left cursor-pointer"
                              >
                                {lead.name}
                              </button>
                            </td>
                            <td className="py-3 px-4 font-mono text-slate-400">
                              {lead.mobileNumber}
                              {lead.email && <div className="text-[10px] text-slate-500">{lead.email}</div>}
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-semibold">{lead.requirement}</span>
                              {lead.projectLocation && (
                                <div className="text-[10px] text-slate-500">{lead.projectLocation}</div>
                              )}
                            </td>
                            <td className="py-3 px-4">
                                <select
                                  value={lead.status}
                                  onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                  className="bg-[#030712] border border-slate-700/60 rounded-lg px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]/50"
                                >
                                {CRM_STATUSES_ADMIN.map((st) => (
                                  <option key={st} value={st}>{st}</option>
                                ))}
                              </select>
                            </td>
                            <td className="py-3 px-4">
                                <select
                                  value={lead.handledBy || "Unassigned"}
                                  onChange={(e) => handleAssignmentChange(lead.id, e.target.value)}
                                  className="bg-[#030712] border border-slate-700/60 rounded-lg px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]/50"
                                >
                                <option value="Unassigned">Unassigned</option>
                                {employeesList.map((emp) => (
                                  <option key={emp.id} value={`Pinned: ${emp.name || emp.username}`}>
                                    📌 Pinned: {emp.name || emp.username}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="py-3 px-4 text-slate-400 text-[11px]">
                              {lead.submissionSource || lead.source || "Website"}
                            </td>
                            <td className="py-3 px-4 text-slate-500 text-[11px]">
                              {new Date(lead.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setSelectedLeadForDetails(lead)}
                                  className="px-2.5 py-1 bg-[#D4AF37] hover:bg-[#F1D279] text-[#0F172A] rounded-lg text-xs font-semibold transition-colors shadow-[0_0_10px_rgba(212,175,55,0.2)]"
                                >
                                  Details
                                </button>
                                <button
                                  onClick={() => handleTrashLead(lead.id)}
                                  className="p-1 text-slate-500 hover:text-red-400 rounded transition-colors"
                                  title="Move to Trash"
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* MAIN TAB 2: PHASE 6 - TEAM PERFORMANCE LEADERBOARD */}
        {activeMainTab === "performance" && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  🏆 Team Member Performance Leaderboard
                </h2>
                <p className="text-xs text-slate-400">Ranked by conversion rate and closed projects</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {performanceMetrics.map((member, idx) => (
                <div
                  key={member.id}
                  className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800/60 flex flex-col gap-3 relative overflow-hidden shadow-lg"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center font-bold text-sm">
                        #{idx + 1}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">{member.name}</h3>
                        <span className="text-[10px] text-slate-400">{member.role}</span>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-bold">
                      {member.conversionRate}% Conv.
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/60 text-xs">
                    <div className="p-2.5 bg-[#030712] rounded-xl border border-slate-800/40">
                      <span className="text-[10px] text-slate-500 block">Total Assigned</span>
                      <span className="text-base font-bold text-white">{member.totalLeads}</span>
                    </div>
                    <div className="p-2.5 bg-[#030712] rounded-xl border border-slate-800/40">
                      <span className="text-[10px] text-slate-500 block">Converted</span>
                      <span className="text-base font-bold text-emerald-400">{member.convertedLeads}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MAIN TAB 3: PHASE 7 - LEAD SOURCE ANALYTICS */}
        {activeMainTab === "sources" && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  📊 Lead Source Breakdown Analytics
                </h2>
                <p className="text-xs text-slate-400">Lead volume and percentage share by ingestion source</p>
              </div>

              {/* Date Filter Bar */}
              <div className="flex flex-wrap items-center gap-2 bg-[#0F172A] p-1.5 rounded-xl border border-slate-800/60 text-xs">
                <button
                  onClick={() => setAnalyticsPreset("all")}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    analyticsPreset === "all" ? "bg-[#D4AF37] text-[#0F172A]" : "text-slate-400 hover:text-white"
                  }`}
                >
                  All Time
                </button>
                <button
                  onClick={() => setAnalyticsPreset("this_month")}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    analyticsPreset === "this_month" ? "bg-[#D4AF37] text-[#0F172A]" : "text-slate-400 hover:text-white"
                  }`}
                >
                  This Month
                </button>
                <button
                  onClick={() => setAnalyticsPreset("last_month")}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    analyticsPreset === "last_month" ? "bg-amber-500 text-black" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Last Month
                </button>
                <button
                  onClick={() => setAnalyticsPreset("custom")}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    analyticsPreset === "custom" ? "bg-amber-500 text-black" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Custom Range
                </button>

                {analyticsPreset === "custom" && (
                  <div className="flex items-center gap-1 ml-2">
                    <input
                      type="date"
                      value={analyticsDateFrom}
                      onChange={(e) => setAnalyticsDateFrom(e.target.value)}
                      className="bg-[#030712] border border-slate-700/60 rounded-lg px-2 py-1 text-slate-300 text-[11px] focus:outline-none"
                    />
                    <span className="text-slate-500 text-[10px]">to</span>
                    <input
                      type="date"
                      value={analyticsDateTo}
                      onChange={(e) => setAnalyticsDateTo(e.target.value)}
                      className="bg-[#030712] border border-slate-700/60 rounded-lg px-2 py-1 text-slate-300 text-[11px] focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800/60 flex flex-col gap-4 shadow-lg">
                <h3 className="text-sm font-bold text-white flex justify-between items-center">
                  <span>Source Distribution Breakdown</span>
                  <span className="text-xs text-[#D4AF37] font-semibold">{sourceFilteredLeads.length} Total Leads</span>
                </h3>
                <div className="flex flex-col gap-4">
                  {sourceBreakdown.map((item) => {
                    let gradientClass = "from-[#D4AF37] to-[#F1D279]";
                    if (item.source === "Website") gradientClass = "from-slate-500 to-slate-400";
                    if (item.source === "Facebook") gradientClass = "from-blue-600 to-blue-400";
                    if (item.source === "Instagram") gradientClass = "from-pink-600 to-rose-400";
                    if (item.source === "WhatsApp") gradientClass = "from-emerald-600 to-teal-400";
                    if (item.source === "Referral") gradientClass = "from-purple-600 to-violet-400";

                    return (
                      <div key={item.source} className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-200 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                            {item.source}
                          </span>
                          <span className="text-white font-bold">{item.count} leads ({item.percentage}%)</span>
                        </div>
                        <div className="w-full h-3 bg-[#030712] rounded-full overflow-hidden border border-slate-800/60">
                          <div
                            className={`h-full bg-gradient-to-r ${gradientClass} rounded-full transition-all duration-500`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800/60 flex flex-col gap-4 justify-center items-center text-center shadow-lg">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center font-bold text-2xl">
                  📍
                </div>
                <h3 className="text-base font-bold text-white">Lead Attribution Insights</h3>
                <p className="text-xs text-slate-400 max-w-sm">
                  Found <strong className="text-white">{sourceFilteredLeads.length} leads</strong> captured for the selected time period across {LEAD_SOURCES.length} predefined channels.
                </p>
                <div className="grid grid-cols-2 gap-3 w-full max-w-xs mt-2 text-xs">
                  <div className="p-3 bg-[#030712] rounded-xl border border-slate-800/60 flex flex-col items-center">
                    <span className="text-[10px] text-slate-500">Top Channel</span>
                    <span className="font-bold text-[#D4AF37]">{sourceBreakdown[0]?.source || "N/A"}</span>
                  </div>
                  <div className="p-3 bg-[#030712] rounded-xl border border-slate-800/60 flex flex-col items-center">
                    <span className="text-[10px] text-slate-500">Top Share</span>
                    <span className="font-bold text-emerald-400">{sourceBreakdown[0]?.percentage || 0}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedLeadForDetails && (
        <LeadDetailModal
          isOpen={!!selectedLeadForDetails}
          onClose={() => setSelectedLeadForDetails(null)}
          leadId={selectedLeadForDetails.id}
          currentUser={currentUser || "Admin"}
          currentUserRole={currentUserRole}
          employeesList={employeesList}
        />
      )}

      <AddLeadModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        employeesList={employeesList}
        onLeadAdded={loadData}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        leads={activeLeads}
        employeesList={employeesList}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        employeesList={employeesList}
        trashedLeads={trashedLeads}
        currentUser={currentUser}
        currentUserRole={currentUserRole}
        adminAvatar={adminAvatar}
        onEmployeeCreated={loadData}
        onLeadRestored={loadData}
      />

      {/* Utilities */}
      <ToastContainer />
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
