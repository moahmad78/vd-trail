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
import { Table, Award, BarChart3, Bell, Download, Plus, Settings, LogOut, Search, Pin, Trash2, X, Trophy, PieChart, MapPin, Share2, FileSpreadsheet, ExternalLink, RefreshCw } from "lucide-react";
import "../styles/lead-management.css";

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

  // Tab Navigation: "leads" | "meta" | "google" | "performance" | "sources"
  const [activeMainTab, setActiveMainTab] = useState<"leads" | "meta" | "google" | "performance" | "sources">("leads");
  const [isSyncingSheet, setIsSyncingSheet] = useState(false);

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
      const [fetchedActive, fetchedTrashed, fetchedEmployees, fetchedNotifications] = await Promise.all([
        leadService.fetchLeads(),
        leadService.fetchLeads({ trashed: true }),
        leadService.fetchEmployees(),
        leadService.fetchNotifications(),
      ]);
      setLeads([...fetchedActive, ...fetchedTrashed]);
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

  const isMetaLead = (l: Lead) => {
    const s = (l.source || "").toLowerCase();
    const sub = (l.submissionSource || "").toLowerCase();
    return (
      s.includes("meta") ||
      s.includes("facebook") ||
      s.includes("instagram") ||
      s.includes("fb") ||
      sub.includes("meta") ||
      sub.includes("facebook") ||
      sub.includes("instagram")
    );
  };

  const isGoogleLead = (l: Lead) => {
    const s = (l.source || "").toLowerCase();
    const sub = (l.submissionSource || "").toLowerCase();
    return (
      s.includes("google") ||
      sub.includes("google") ||
      s.includes("sheet") ||
      sub.includes("sheet") ||
      s === "website" ||
      sub.includes("landing") ||
      sub.includes("popup") ||
      sub.includes("contact")
    );
  };

  const metaLeadsCount = useMemo(() => activeLeads.filter(isMetaLead).length, [activeLeads]);
  const googleLeadsCount = useMemo(() => activeLeads.filter(isGoogleLead).length, [activeLeads]);

  const tabScopedLeads = useMemo(() => {
    if (activeMainTab === "meta") return activeLeads.filter(isMetaLead);
    if (activeMainTab === "google") return activeLeads.filter(isGoogleLead);
    return activeLeads;
  }, [activeLeads, activeMainTab]);

  const filteredLeads = useMemo(() => {
    return tabScopedLeads.filter((lead) => {
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
  }, [tabScopedLeads, debouncedSearchQuery, filterDate, filterSource, filterService, filterLocation, filterStatus, filterEmployee, activeStatCard]);

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
        await loadData();
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
        await leadService.deleteLead(leadId);
        toast.success("Lead moved to trash!");
        await loadData();
      } catch (err: any) {
        console.error("Error trashing lead", err);
        toast.error(err.message || "Failed to move lead to trash");
        setLeads(originalLeads);
      }
    });
    setConfirmModalConfig({ title: "Trash Lead", message: "Are you sure you want to move this lead to trash?", isDestructive: true });
  };

  // Stats calculation (scoped to active tab)
  const totalLeadsCount = tabScopedLeads.length;
  const newLeadsCount = tabScopedLeads.filter((l) => l.status === "New Lead").length;
  const inProgressCount = tabScopedLeads.filter((l) => l.status === "In Progress" || l.status === "Follow-Up").length;
  const convertedCount = tabScopedLeads.filter((l) => l.status === "Converted / Active Project").length;
  const unassignedCount = tabScopedLeads.filter((l) => !l.handledBy || l.handledBy === "Unassigned").length;

  const handleSyncGoogleSheet = async () => {
    setIsSyncingSheet(true);
    try {
      const res = await fetch("/api/admin/google-sheet-sync", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to sync with Google Sheet");
      }
      toast.success(data.message || `Google Sheet synced: ${data.importedCount} new leads imported`);
      await loadData();
    } catch (err: any) {
      console.error("Error syncing Google Sheet:", err);
      toast.error(err.message || "Could not sync Google Sheet");
    } finally {
      setIsSyncingSheet(false);
    }
  };

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
    <div className="min-h-screen bg-[#fafaf8] text-[#0f172a] flex flex-col font-sans admin-dashboard-root crm-light-root selection:bg-[#071633]/15 selection:text-[#071633]">
      {/* Top Header Navigation */}
      <header className="h-16 border-b border-[#e2e8f0] bg-white/95 backdrop-blur-md px-6 flex justify-between items-center sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo/logo.webp" alt="VoometDesign" width={190} height={52} priority className="h-9 md:h-10 w-auto object-contain" />
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#071633]/5 text-[#071633] border border-[#071633]/15">
            Admin Suite
          </span>
        </div>

        {/* Tab Switcher: Leads | Meta Leads | Google Leads | Team Performance | Source Analytics */}
        <div className="flex bg-[#f1f5f9] p-1 rounded-xl border border-[#e2e8f0] text-xs gap-1">
          <button
            onClick={() => setActiveMainTab("leads")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeMainTab === "leads" ? "bg-[#071633] text-white shadow-sm" : "text-[#475569] hover:text-[#071633]"
            }`}
          >
            <Table className="w-3.5 h-3.5 inline mr-1.5" /> Leads Table
          </button>
          <button
            onClick={() => setActiveMainTab("meta")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeMainTab === "meta" ? "bg-[#0081FB] text-white shadow-sm" : "text-[#475569] hover:text-[#0081FB]"
            }`}
          >
            <Share2 className="w-3.5 h-3.5 inline mr-1.5" /> Meta Leads ({metaLeadsCount})
          </button>
          <button
            onClick={() => setActiveMainTab("google")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeMainTab === "google" ? "bg-[#0F9D58] text-white shadow-sm" : "text-[#475569] hover:text-[#0F9D58]"
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 inline mr-1.5" /> Google Leads ({googleLeadsCount})
          </button>
          <button
            onClick={() => setActiveMainTab("performance")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeMainTab === "performance" ? "bg-[#071633] text-white shadow-sm" : "text-[#475569] hover:text-[#071633]"
            }`}
          >
            <Award className="w-3.5 h-3.5 inline mr-1.5" /> Team Performance
          </button>
          <button
            onClick={() => setActiveMainTab("sources")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeMainTab === "sources" ? "bg-[#071633] text-white shadow-sm" : "text-[#475569] hover:text-[#071633]"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 inline mr-1.5" /> Source Analytics
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Phase 3: Notifications Center Button */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2.5 rounded-xl bg-white border border-[#e2e8f0] text-[#475569] hover:text-[#071633] hover:bg-[#f8fafc] transition-colors relative shadow-xs"
            >
              <Bell className="w-4 h-4" />
              {notifications.filter((n) => !n.isRead).length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {notifications.filter((n) => !n.isRead).length}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-[#e2e8f0] rounded-2xl shadow-xl overflow-hidden z-50">
                <div className="p-3 border-b border-[#e2e8f0] bg-[#f8fafc] font-bold text-xs text-[#071633] flex justify-between">
                  <span>Admin Notifications</span>
                  <span className="text-[#64748b]">{notifications.length} Total</span>
                </div>
                <div className="max-h-72 overflow-y-auto custom-scrollbar p-2 flex flex-col gap-1 text-xs">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-center text-slate-500">No new notifications</p>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-[#334155]">
                        <p className="font-semibold text-[#071633]">{n.message}</p>
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
            className="px-3 py-1.5 bg-white hover:bg-[#f8fafc] text-[#071633] font-semibold text-xs rounded-xl border border-[#cbd5e1] transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 inline mr-1.5" /> Export CSV
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-1.5 bg-[#071633] hover:bg-[#0f2452] text-white font-bold text-xs rounded-xl transition-colors shadow-md shadow-[#071633]/15 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 inline mr-1" /> Add Lead
          </button>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-xl bg-white border border-[#e2e8f0] text-[#475569] hover:text-[#071633] hover:bg-[#f8fafc] transition-colors shadow-xs"
            title="System Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
            title="Log Out"
          >
            <LogOut className="w-3.5 h-3.5 inline mr-1" /> Logout
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
                ? "bg-white border-[#071633] shadow-md ring-2 ring-[#071633]/20 scale-[1.02]"
                : "bg-white border-[#e2e8f0] hover:border-[#cbd5e1] hover:shadow-sm"
            }`}
            title="Click to view all active leads"
          >
            <span className="text-xs font-semibold text-[#64748b]">Total Active Leads</span>
            <span className="text-2xl font-black text-[#071633]">{totalLeadsCount}</span>
          </div>

          <div
            onClick={() => handleStatCardClick("new")}
            className={`p-4 rounded-2xl cursor-pointer transition-all flex flex-col gap-1 border ${
              activeStatCard === "new"
                ? "bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-300 scale-[1.02]"
                : "bg-white border-[#e2e8f0] hover:border-blue-300 hover:shadow-sm"
            }`}
            title="Click to filter New Leads"
          >
            <span className="text-xs font-semibold text-blue-600">New Leads</span>
            <span className="text-2xl font-black text-blue-700">{newLeadsCount}</span>
          </div>

          <div
            onClick={() => handleStatCardClick("inprogress")}
            className={`p-4 rounded-2xl cursor-pointer transition-all flex flex-col gap-1 border ${
              activeStatCard === "inprogress"
                ? "bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-300 scale-[1.02]"
                : "bg-white border-[#e2e8f0] hover:border-amber-300 hover:shadow-sm"
            }`}
            title="Click to filter In Progress & Follow-Up Leads"
          >
            <span className="text-xs font-semibold text-amber-600">In Progress / Follow-Up</span>
            <span className="text-2xl font-black text-amber-700">{inProgressCount}</span>
          </div>

          <div
            onClick={() => handleStatCardClick("converted")}
            className={`p-4 rounded-2xl cursor-pointer transition-all flex flex-col gap-1 border ${
              activeStatCard === "converted"
                ? "bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-300 scale-[1.02]"
                : "bg-white border-[#e2e8f0] hover:border-emerald-300 hover:shadow-sm"
            }`}
            title="Click to filter Converted Leads"
          >
            <span className="text-xs font-semibold text-emerald-600">Converted</span>
            <span className="text-2xl font-black text-emerald-700">{convertedCount}</span>
          </div>

          <div
            onClick={() => handleStatCardClick("unassigned")}
            className={`p-4 rounded-2xl cursor-pointer transition-all flex flex-col gap-1 border ${
              activeStatCard === "unassigned"
                ? "bg-purple-50 border-purple-500 shadow-md ring-2 ring-purple-300 scale-[1.02]"
                : "bg-white border-[#e2e8f0] hover:border-purple-300 hover:shadow-sm"
            }`}
            title="Click to filter Unassigned Leads"
          >
            <span className="text-xs font-semibold text-purple-600">Unassigned</span>
            <span className="text-2xl font-black text-purple-700">{unassignedCount}</span>
          </div>
        </div>

        {/* Phase 4: Floating Bulk Action Bar */}
        {selectedLeadIds.length > 0 && (activeMainTab === "leads" || activeMainTab === "meta" || activeMainTab === "google") && (
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
                <Download className="w-3.5 h-3.5 inline mr-1" /> Export CSV ({selectedLeadIds.length})
              </button>

              <button
                onClick={handleBulkDelete}
                disabled={isBulkOperating}
                className="px-3 py-1.5 bg-red-950 border border-red-800 text-red-400 hover:bg-red-900 font-bold rounded-xl transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5 inline mr-1 text-red-500" /> Bulk Move to Trash
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

        {/* MAIN TAB 1: LEADS TABLE (ALL LEADS, META LEADS, GOOGLE LEADS) */}
        {(activeMainTab === "leads" || activeMainTab === "meta" || activeMainTab === "google") && (
          <>
            {/* Meta Channel Banner */}
            {activeMainTab === "meta" && (
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-blue-50/90 border border-blue-200 text-blue-950 shadow-xs animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0081FB] text-white flex items-center justify-center font-bold shadow-xs">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#071633]">Meta Ads & CAPI Integration</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0081FB] text-white">Live Tracking</span>
                    </div>
                    <p className="text-xs text-blue-800">
                      Filtered for leads arriving through Facebook & Instagram campaigns. Status changes sync back to Meta Conversions API (Dataset ID: 1434564675397419).
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://eventsmanager.facebook.com/events_manager2/list/dataset/1434564675397419"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 bg-white hover:bg-blue-100 text-[#0081FB] border border-blue-300 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    Meta Events Manager <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* Google Channel Banner */}
            {activeMainTab === "google" && (
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-emerald-950 shadow-xs animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0F9D58] text-white flex items-center justify-center font-bold shadow-xs">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#071633]">Google Ads & Google Sheet Synced Leads</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0F9D58] text-white">Google Sheet Connected</span>
                    </div>
                    <p className="text-xs text-emerald-800">
                      Showing leads captured from Google Ads and website forms, synchronized with your connected Google Spreadsheet in real time.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSyncGoogleSheet}
                    disabled={isSyncingSheet}
                    className="px-3.5 py-2 bg-[#0F9D58] hover:bg-[#0b8043] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncingSheet ? "animate-spin" : ""}`} />
                    {isSyncingSheet ? "Syncing Sheet..." : "Sync from Google Sheet"}
                  </button>
                  <a
                    href="https://docs.google.com/spreadsheets/d/1Oil1S4a9lt0noA1untM_PkF2ZC8NXfb3k3pzmTMZnDM/edit?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 bg-white hover:bg-emerald-100 text-[#0F9D58] border border-emerald-300 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    Open Google Sheet <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* Phase 5: Debounced Search & Filter Bar */}
            <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] flex flex-wrap gap-3 items-center justify-between shadow-xs">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="w-3.5 h-3.5 text-[#94a3b8] absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search lead name, phone, email, requirement..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl pl-8.5 pr-8 py-2 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#071633] focus:bg-white pr-8 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-2 text-[#94a3b8] hover:text-[#071633] text-xs"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <select
                  value={filterService}
                  onChange={(e) => setFilterService(e.target.value)}
                  className="bg-white border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs text-[#1e293b] font-medium focus:outline-none focus:border-[#071633] shadow-xs cursor-pointer"
                >
                  <option value="All">All Services</option>
                  {SERVICE_TYPES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-white border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs text-[#1e293b] font-medium focus:outline-none focus:border-[#071633] shadow-xs cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  {CRM_STATUSES_ADMIN.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>

                <select
                  value={filterEmployee}
                  onChange={(e) => setFilterEmployee(e.target.value)}
                  className="bg-white border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs text-[#1e293b] font-medium focus:outline-none focus:border-[#071633] shadow-xs cursor-pointer"
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
                  className="bg-white border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs text-[#1e293b] font-medium focus:outline-none focus:border-[#071633] shadow-xs cursor-pointer"
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
                  className="bg-white border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs text-[#1e293b] font-medium focus:outline-none focus:border-[#071633] shadow-xs cursor-pointer"
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
                    className="px-3 py-2 bg-red-50 border border-red-200 text-red-600 font-bold text-xs rounded-xl hover:bg-red-100 transition-colors shadow-xs"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Leads Table */}
            <div className="rounded-2xl bg-white border border-[#e2e8f0] overflow-hidden flex flex-col flex-1 shadow-xs">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-sm text-[#334155] border-collapse">
                  <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#64748b] uppercase tracking-wider font-bold text-[11px]">
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
                      <th className="py-3.5 px-4 whitespace-nowrap min-w-[130px]">Customer</th>
                      <th className="py-3.5 px-4 whitespace-nowrap min-w-[120px]">Contact</th>
                      <th className="py-3.5 px-4 whitespace-nowrap min-w-[140px]">Requirement</th>
                      <th className="py-3.5 px-4 whitespace-nowrap min-w-[120px]">Status</th>
                      <th className="py-3.5 px-4 whitespace-nowrap min-w-[130px]">Assigned To</th>
                      <th className="py-3.5 px-4 whitespace-nowrap min-w-[150px]">Source</th>
                      <th className="py-3.5 px-4 whitespace-nowrap min-w-[100px]">Date</th>
                      <th className="py-3.5 px-4 text-right whitespace-nowrap min-w-[100px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0]">
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
                            className={`hover:bg-[#f1f5f9]/70 transition-colors ${
                              lead.isPinned ? "bg-amber-50/60 border-l-3 border-[#c29b28]" : ""
                            } ${isSelected ? "bg-blue-50/70" : ""}`}
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
                                <Pin className={`w-3.5 h-3.5 transition-transform ${lead.isPinned ? "fill-[#c29b28] text-[#c29b28] rotate-45" : "text-slate-400 hover:text-slate-600"}`} />
                              </button>
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => setSelectedLeadForDetails(lead)}
                                className="font-bold text-[#071633] hover:text-[#c29b28] text-left cursor-pointer transition-colors"
                              >
                                {lead.name}
                              </button>
                            </td>
                            <td className="py-3 px-4 font-mono text-xs text-[#334155]">
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
                                  className="bg-white border border-[#cbd5e1] rounded-lg px-2.5 py-1 text-xs text-[#0f172a] font-medium focus:outline-none focus:border-[#071633] shadow-xs cursor-pointer"
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
                                  className="bg-white border border-[#cbd5e1] rounded-lg px-2.5 py-1 text-xs text-[#0f172a] font-medium focus:outline-none focus:border-[#071633] shadow-xs cursor-pointer"
                                >
                                <option value="Unassigned">Unassigned</option>
                                {employeesList.map((emp) => (
                                  <option key={emp.id} value={`Pinned: ${emp.name || emp.username}`}>
                                    Pinned: {emp.name || emp.username}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="py-3 px-4 text-[11px] whitespace-nowrap min-w-[150px]">
                              {isMetaLead(lead) ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-blue-50 text-[#0081FB] border border-blue-200 whitespace-nowrap shadow-xs">
                                  <Share2 className="w-3 h-3 shrink-0" />
                                  <span>{lead.source || lead.submissionSource || "Meta Ads"}</span>
                                </span>
                              ) : isGoogleLead(lead) ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-50 text-[#0b8043] border border-emerald-200 whitespace-nowrap shadow-xs">
                                  <FileSpreadsheet className="w-3 h-3 shrink-0" />
                                  <span>{lead.submissionSource || lead.source || "Google Sheet"}</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-medium bg-slate-100 text-[#475569] border border-slate-200 whitespace-nowrap">
                                  <span>{lead.submissionSource || lead.source || "Website"}</span>
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-[#64748b] text-[11px] whitespace-nowrap">
                              {new Date(lead.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setSelectedLeadForDetails(lead)}
                                  className="px-3 py-1 bg-[#071633] hover:bg-[#0f2452] text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
                                >
                                  Details
                                </button>
                                <button
                                  onClick={() => handleTrashLead(lead.id)}
                                  className="p-1 text-[#94a3b8] hover:text-red-600 rounded transition-colors"
                                  title="Move to Trash"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-slate-400 hover:text-red-600" />
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
                <h2 className="text-base font-bold text-[#071633] flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#c29b28]" /> Team Member Performance Leaderboard
                </h2>
                <p className="text-xs text-[#64748b]">Ranked by conversion rate and closed projects</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {performanceMetrics.map((member, idx) => (
                <div
                  key={member.id}
                  className="p-5 rounded-2xl bg-white border border-[#e2e8f0] flex flex-col gap-3 relative overflow-hidden shadow-xs"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center font-bold text-sm">
                        #{idx + 1}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#071633]">{member.name}</h3>
                        <span className="text-[10px] text-[#64748b]">{member.role}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                      {member.conversionRate}% Conv.
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#e2e8f0] text-xs">
                    <div className="p-2.5 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
                      <span className="text-[10px] text-[#64748b] block">Total Assigned</span>
                      <span className="text-base font-bold text-[#071633]">{member.totalLeads}</span>
                    </div>
                    <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
                      <span className="text-[10px] text-emerald-800 block">Converted</span>
                      <span className="text-base font-bold text-emerald-700">{member.convertedLeads}</span>
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
                <h2 className="text-base font-bold text-[#071633] flex items-center gap-2">
                  <PieChart className="w-4 h-4 inline mr-1 text-[#071633]" /> Lead Source Breakdown Analytics
                </h2>
                <p className="text-xs text-[#64748b]">Lead volume and percentage share by ingestion source</p>
              </div>

              {/* Date Filter Bar */}
              <div className="flex flex-wrap items-center gap-1 bg-[#f1f5f9] p-1 rounded-xl border border-[#e2e8f0] text-xs">
                <button
                  onClick={() => setAnalyticsPreset("all")}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                    analyticsPreset === "all" ? "bg-[#071633] text-white shadow-xs" : "text-[#475569] hover:text-[#071633]"
                  }`}
                >
                  All Time
                </button>
                <button
                  onClick={() => setAnalyticsPreset("this_month")}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                    analyticsPreset === "this_month" ? "bg-[#071633] text-white shadow-xs" : "text-[#475569] hover:text-[#071633]"
                  }`}
                >
                  This Month
                </button>
                <button
                  onClick={() => setAnalyticsPreset("last_month")}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                    analyticsPreset === "last_month" ? "bg-[#071633] text-white shadow-xs" : "text-[#475569] hover:text-[#071633]"
                  }`}
                >
                  Last Month
                </button>
                <button
                  onClick={() => setAnalyticsPreset("custom")}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                    analyticsPreset === "custom" ? "bg-[#071633] text-white shadow-xs" : "text-[#475569] hover:text-[#071633]"
                  }`}
                >
                  Custom Range
                </button>

                {analyticsPreset === "custom" && (
                  <div className="flex items-center gap-1.5 ml-2">
                    <input
                      type="date"
                      value={analyticsDateFrom}
                      onChange={(e) => setAnalyticsDateFrom(e.target.value)}
                      className="bg-white border border-[#cbd5e1] rounded-lg px-2 py-1 text-[#0f172a] text-[11px] focus:outline-none focus:border-[#071633]"
                    />
                    <span className="text-[#64748b] text-[10px]">to</span>
                    <input
                      type="date"
                      value={analyticsDateTo}
                      onChange={(e) => setAnalyticsDateTo(e.target.value)}
                      className="bg-white border border-[#cbd5e1] rounded-lg px-2 py-1 text-[#0f172a] text-[11px] focus:outline-none focus:border-[#071633]"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] flex flex-col gap-4 shadow-xs">
                <h3 className="text-sm font-bold text-[#071633] flex justify-between items-center">
                  <span>Source Distribution Breakdown</span>
                  <span className="text-xs text-[#071633] font-bold bg-[#f1f5f9] px-2.5 py-1 rounded-full border border-[#e2e8f0]">{sourceFilteredLeads.length} Total Leads</span>
                </h3>
                <div className="flex flex-col gap-4">
                  {sourceBreakdown.map((item) => {
                    let gradientClass = "from-[#071633] to-[#1e3a8a]";
                    if (item.source === "Website") gradientClass = "from-slate-600 to-slate-400";
                    if (item.source === "Google Ads") gradientClass = "from-emerald-600 to-teal-500";
                    if (item.source === "Meta Ads" || item.source === "Facebook") gradientClass = "from-blue-600 to-blue-400";
                    if (item.source === "Instagram") gradientClass = "from-pink-600 to-rose-400";
                    if (item.source === "WhatsApp") gradientClass = "from-emerald-600 to-green-400";
                    if (item.source === "Referral") gradientClass = "from-purple-600 to-violet-400";

                    return (
                      <div key={item.source} className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-[#334155] flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#071633]"></span>
                            {item.source}
                          </span>
                          <span className="text-[#071633] font-bold">{item.count} leads ({item.percentage}%)</span>
                        </div>
                        <div className="w-full h-3 bg-[#f1f5f9] rounded-full overflow-hidden border border-[#e2e8f0]">
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

              <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] flex flex-col gap-4 justify-center items-center text-center shadow-xs">
                <div className="w-16 h-16 rounded-full bg-[#071633]/5 text-[#071633] border border-[#071633]/15 flex items-center justify-center font-bold text-2xl shadow-xs">
                  <MapPin className="w-7 h-7 text-[#071633]" />
                </div>
                <h3 className="text-base font-bold text-[#071633]">Lead Attribution Insights</h3>
                <p className="text-xs text-[#64748b] max-w-sm">
                  Found <strong className="text-[#071633] font-bold">{sourceFilteredLeads.length} leads</strong> captured for the selected time period across {LEAD_SOURCES.length} predefined channels.
                </p>
                <div className="grid grid-cols-2 gap-3 w-full max-w-xs mt-2 text-xs">
                  <div className="p-3 bg-[#f8fafc] rounded-xl border border-[#e2e8f0] flex flex-col items-center shadow-xs">
                    <span className="text-[10px] text-[#64748b]">Top Channel</span>
                    <span className="font-bold text-[#071633] text-sm mt-0.5">{sourceBreakdown[0]?.source || "N/A"}</span>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col items-center shadow-xs">
                    <span className="text-[10px] text-emerald-800">Top Share</span>
                    <span className="font-bold text-emerald-700 text-sm mt-0.5">{sourceBreakdown[0]?.percentage || 0}%</span>
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
