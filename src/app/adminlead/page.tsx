"use client";

import React, {  useState, useEffect, useMemo, useRef  } from "react";
import Image from "next/image";
import LeadDetailModal from "@/components/LeadDetailModal";

interface Lead {
  [key: string]: any;
  id: string;
  name: string;
  mobileNumber: string;
  email: string | null;
  projectLocation: string | null;
  requirement: string;
  areaSqft: string | null;
  projectDetails: string | null;
  submissionSource: string;
  source: string;
  promoCode: string | null;
  status: string;
  handledBy: string | null;
  notes: any; // Storing Json array of ConversationNote
  createdAt: string;
  isPinned?: boolean;
  isTrashed?: boolean;
  followUpDate?: string | null;
}

export interface Notification {
  id: string;
  type: string;
  message: string;
  isRead: boolean;
  leadId: string | null;
  createdAt: string;
}

const CRM_STATUSES = [
  "New Lead",
  "In Progress",
  "Follow-Up",
  "Converted / Active Project",
  "Not Reachable",
  "Scam / Fake"
];

const SERVICE_TYPES = [
  "Residential",
  "Commercial",
  "Educational",
  "Hospitality",
  "Aluminium Systems"
];

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterSource, setFilterSource] = useState<string>("All");
  const [filterService, setFilterService] = useState<string>("All");
  const [filterLocation, setFilterLocation] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterEmployee, setFilterEmployee] = useState<string>("All");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportType, setExportType] = useState<"All" | "Employee" | "Status" | "Service" | "DateRange">("All");
  const [exportParam, setExportParam] = useState("");
  const [exportDateRange, setExportDateRange] = useState({ start: "", end: "" });
  const [exportEmployee, setExportEmployee] = useState<string>("Pinned: Sahil");
  const [exportStatus, setExportStatus] = useState<string>("New Lead");
  const [exportService, setExportService] = useState<string>("Residential");
  const [selectedLeadForDetails, setSelectedLeadForDetails] = useState<Lead | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCreatingLead, setIsCreatingLead] = useState(false);

  // System Settings Modal State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState("employee"); // "employee", "trash", "profile"
  const [isCreatingEmployee, setIsCreatingEmployee] = useState(false);
  const [newEmployeeData, setNewEmployeeData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Team Member"
  });
  const [adminAvatar, setAdminAvatar] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedEmployeeForView, setSelectedEmployeeForView] = useState<any | null>(null);
  const [isViewMoreEmployeeModalOpen, setIsViewMoreEmployeeModalOpen] = useState(false);

  const [newLeadData, setNewLeadData] = useState({
    name: "",
    mobileNumber: "",
    projectLocation: "",
    requirement: SERVICE_TYPES[0],
    areaSqft: "",
    source: "Other",
    handledBy: "Unassigned",
  });
  const [employeesList, setEmployeesList] = useState<any[]>([]);
  const [trashedLeads, setTrashedLeads] = useState<Lead[]>([]);
  const [employeeStats, setEmployeeStats] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [actionMenuOpenId, setActionMenuOpenId] = useState<string | null>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setActionMenuOpenId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notificationRef]);

  // Fetch Current Session Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/user/profile');
        if (res.ok) {
          const { data } = await res.json();
          if (data) {
            setCurrentUser(data.name || data.username);
            setCurrentUserRole(data.role || "Team Member");
            setAdminAvatar(data.avatarUrl || null);
          }
        }
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };
    fetchProfile();
  }, []);

  const unreadAssignedCount = useMemo(() => {
    if (!currentUser) return 0;
    return (leads || []).filter(l => l.handledBy === "Pinned: " + currentUser && l.status === "New Lead").length;
  }, [leads, currentUser]);

  const fetchLeads = async () => {
    try {
      const res = await fetch(`/api/lead?employee=${encodeURIComponent(filterEmployee)}`);
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      if (!res.ok) {
        console.error("API error status:", res.status);
        return;
      }
      const result = await res.json();
      setLeads(Array.isArray(result) ? result : result.data || []);
      if (result.stats) setEmployeeStats(result.stats);
    } catch (error) {
      console.error("Error fetching leads Safely:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const result = await res.json();
        setNotifications(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await fetch("/api/employees");
      if (res.ok) {
        const result = await res.json();
        setEmployeesList(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchTrashedLeads = async () => {
    try {
      const res = await fetch(`/api/lead?trashed=true`);
      if (res.ok) {
        const result = await res.json();
        setTrashedLeads(Array.isArray(result) ? result : result.data || []);
      }
    } catch (error) {
      console.error("Error fetching trashed leads:", error);
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    fetchLeads();
    fetchNotifications();
    fetchEmployees();
    fetchTrashedLeads();
    const interval = setInterval(() => {
      fetchLeads();
      fetchNotifications();
    }, 10000);
    return () => clearInterval(interval);
  }, [currentUser, filterEmployee]);


  const handleStatusChange = async (id: string, newStatus: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus, handledBy: currentUser } : l)));
    try {
      const res = await fetch("/api/lead", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus, handledBy: currentUser }),
      });
      if (!res.ok) {
        fetchLeads();
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      fetchLeads();
    }
  };

  const handleClaimLead = async (id: string, assignedTo: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, handledBy: assignedTo } : l)));
    try {
      const res = await fetch("/api/lead", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "assign", handledBy: assignedTo }),
      });
      if (!res.ok) {
        fetchLeads();
      }
    } catch (error) {
      console.error("Failed to assign lead:", error);
      fetchLeads();
    }
  };

  const handlePinLead = async (id: string, isCurrentlyPinned: boolean) => {
    const action = isCurrentlyPinned ? "unpin" : "pin";
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, isPinned: !isCurrentlyPinned } : l)));
    try {
      const res = await fetch("/api/lead", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      if (!res.ok) fetchLeads();
    } catch (error) {
      fetchLeads();
    }
  };

  const handleTrashLead = async (id: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, isTrashed: true } : l)));
    try {
      const res = await fetch("/api/lead", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "trash" }),
      });
      if (!res.ok) fetchLeads();
    } catch (error) { fetchLeads(); }
  };

  const handleRecoverLead = async (id: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, isTrashed: false } : l)));
    try {
      const res = await fetch("/api/lead", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "recover" }),
      });
      if (!res.ok) fetchLeads();
    } catch (error) { fetchLeads(); }
  };

  const handleDeleteLead = async (id: string) => {
    setLeads((prev) => prev.filter(l => l.id !== id));
    try {
      const res = await fetch("/api/lead", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "delete" }),
      });
      if (!res.ok) fetchLeads();
    } catch (error) { fetchLeads(); }
  };

  const markNotificationRead = async (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId: id })
      });
    } catch (e) { fetchNotifications(); }
  };

  const markAllNotificationsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAllRead: true })
      });
    } catch (e) { fetchNotifications(); }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingLead(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newLeadData, action: 'create_lead' }),
      });
      if (res.ok) {
        setIsAddModalOpen(false);
        setNewLeadData({
          name: "",
          mobileNumber: "",
          projectLocation: "",
          requirement: SERVICE_TYPES[0],
          areaSqft: "",
          source: "Other",
          handledBy: "Unassigned",
        });
        fetchLeads();
      }
    } catch (error) {
      console.error("Failed to create lead:", error);
    } finally {
      setIsCreatingLead(false);
    }
  };

  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingEmployee(true);
    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployeeData),
      });
      const data = await res.json();
      if (res.ok) {
        fetchEmployees();
        setNewEmployeeData({ name: "", email: "", password: "", role: "Team Member" });
        alert("Employee added successfully!");
      } else {
        alert(data.error || "Failed to create employee");
      }
    } catch (error) {
      console.error("Failed to create employee:", error);
      alert("Error creating employee");
    } finally {
      setIsCreatingEmployee(false);
    }
  };

  const buildWhatsAppLink = (lead: Lead) => {
    const message = `Hello ${lead.name}, thank you for connecting with voometdesign regarding your ${(lead.requirement || "")} requirement. Let us know a convenient time to discuss your project spatial layout plans.`;
    return `https://wa.me/91${(lead.mobileNumber || "")}?text=${encodeURIComponent(message)}`;
  };

  const uniqueLocations = useMemo(() => {
    const locs = (leads || []).map(l => l.projectLocation?.trim()).filter(Boolean) as string[];
    return Array.from(new Set(locs)).sort();
  }, [leads]);

  const sourceCounts = useMemo(() => {
    const counts = { "All": (leads || []).length, "Google Ads": 0, "Meta Ads": 0, "Website": 0, "Coupon": 0, "Reference": 0, "Other": 0, "TRASH": 0 };
    (leads || []).forEach(l => {
      if (l.isTrashed) {
        counts["TRASH"]++;
        return; // Don't count trashed leads in other channels
      }
      const src = (l.source || "").toLowerCase();
      const loc = (l.projectLocation || "").toUpperCase();
      const hasPromo = Boolean(
        (l.promoCode && l.promoCode.trim() !== '' && l.promoCode.toLowerCase() !== 'none') || 
        ((l as any).coupon && (l as any).coupon.trim() !== '' && (l as any).coupon.toLowerCase() !== 'none') || 
        ((l as any).locationPromo && (l as any).locationPromo.trim() !== '')
      );
      
      if (hasPromo) counts["Coupon"]++;

      if (src === "website") counts["Website"]++;
      else if (src === "google ads" || src.includes("google")) counts["Google Ads"]++;
      else if (src === "meta ads" || src.includes("facebook") || src.includes("instagram") || src.includes("meta")) counts["Meta Ads"]++;
      else if (src.includes("ref")) counts["Reference"]++;
      else counts["Other"]++;
    });
    return counts;
  }, [leads]);

  const unclaimedCount = useMemo(() => {
    return (leads || []).filter(l => !l.isTrashed && (!l.handledBy || l.handledBy === "Unassigned")).length;
  }, [leads]);

  const filteredLeads = useMemo(() => {
    let result = (leads || []).filter((lead) => {
      // Trash Filter
      if (filterSource === "TRASH") {
        if (!lead.isTrashed) return false;
      } else {
        if (lead.isTrashed) return false;
      }

      // Date Filter
      if (filterDate) {
        const leadDate = new Date(lead.createdAt).toISOString().split("T")[0];
        if (leadDate !== filterDate) return false;
      }
      // Service Filter
      if (filterService !== "All" && (lead.requirement || "") !== filterService) {
        return false;
      }
      // Location Filter
      if (filterLocation !== "All" && lead.projectLocation?.trim() !== filterLocation) {
        return false;
      }
      // Employee Filter (Also handled by API, but kept here for robustness)
      if (filterEmployee !== "All") {
        if (filterEmployee === "Unassigned") {
          if (lead.handledBy && lead.handledBy !== "Unassigned" && lead.handledBy.trim() !== "") return false;
        } else {
          if (lead.handledBy !== filterEmployee) return false;
        }
      }
      // Source Filter
      if (filterSource !== "All") {
        const src = (lead.source || "").toLowerCase();
        const loc = (lead.projectLocation || "").toUpperCase();

        if (filterSource === "Google Ads") {
          if (!(src === "google ads" || src.includes("google"))) return false;
        } else if (filterSource === "Meta Ads") {
          if (!(src === "meta ads" || src.includes("facebook") || src.includes("instagram") || src.includes("meta"))) return false;
        } else if (filterSource === "Website") {
          if (src !== "website") return false;
        } else if (filterSource === "Coupon") {
          const hasPromo = Boolean(
            (lead.promoCode && lead.promoCode.trim() !== '' && lead.promoCode.toLowerCase() !== 'none') || 
            ((lead as any).coupon && (lead as any).coupon.trim() !== '' && (lead as any).coupon.toLowerCase() !== 'none') || 
            ((lead as any).locationPromo && (lead as any).locationPromo.trim() !== '')
          );
          if (!hasPromo) return false;
        } else if (filterSource === "Reference") {
          if (!src.includes("ref")) return false;
        } else if (filterSource === "Other") {
          if (src === "google ads" || src.includes("google") || 
              src === "meta ads" || src.includes("facebook") || src.includes("instagram") || src.includes("meta") ||
              src === "website" ||
              src.includes("ref") ||
              loc.includes("VOOMET") || loc.includes("COUPON") || src.includes("coupon")) {
            return false;
          }
        }
      }
      // Status Filter
      if (filterStatus !== "All" && lead.status !== filterStatus) {
        return false;
      }
      return true;
    });

    // Sort: Pinned leads at the top
    result.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0; // maintain default date sorting otherwise
    });

    return result;
  }, [leads, filterDate, filterService, filterLocation, filterEmployee, filterSource, filterStatus]);

  const exportToCSV = () => {
    const headers = ["Date", "Time", "Client Name", "Mobile Number", "Email", "Project Location", "Service Requirement", "Area (sqft)", "Project Details", "Submission Source", "Promo Code", "Status", "Handled By"];
    const csvRows = [headers.join(",")];
    
    let leadsToExport = leads || [];
    let filenameScope = "all";

    if (exportType === "Employee") {
      leadsToExport = leadsToExport.filter(l => l.handledBy === exportEmployee);
      filenameScope = exportEmployee.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    } else if (exportType === "Status") {
      leadsToExport = leadsToExport.filter(l => l.status === exportStatus);
      filenameScope = exportStatus.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    } else if (exportType === "Service") {
      leadsToExport = leadsToExport.filter(l => l.requirement === exportService);
      filenameScope = exportService.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    } else if (exportType === "DateRange") {
      leadsToExport = leadsToExport.filter(l => {
        const createdAt = new Date(l.createdAt).toISOString().split('T')[0];
        return createdAt >= exportDateRange.start && createdAt <= exportDateRange.end;
      });
      filenameScope = `range_${exportDateRange.start}_${exportDateRange.end}`;
    }
    
    leadsToExport.forEach(lead => {
      const row = [
        new Date(lead.createdAt).toLocaleDateString('en-US'),
        new Date(lead.createdAt).toLocaleTimeString('en-US'),
        `"${(lead.name || "").replace(/"/g, '""')}"`,
        `"${(lead.mobileNumber || "")}"`,
        `"${lead.email || ''}"`,
        `"${(lead.projectLocation || '').replace(/"/g, '""')}"`,
        `"${(lead.requirement || "")}"`,
        `"${(lead.areaSqft || "")}"`,
        `"${(lead.projectDetails || '').replace(/"/g, '""')}"`,
        `"${lead.submissionSource}"`,
        `"${lead.promoCode || ''}"`,
        `"${lead.status}"`,
        `"${lead.handledBy || 'Unassigned'}"`,
      ];
      csvRows.push(row.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${filenameScope}_leads_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setIsExportModalOpen(false);
  };

  const getSourceBadge = (source: string) => {
    if (source === "Meta Ads") return <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">Meta Ads</span>;
    if (source === "Google Ads") return <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border border-sky-500/20 bg-sky-500/10 text-sky-400">Google Ads</span>;
    if (source === "Website") return <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">Website</span>;
    return <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border border-slate-700/50 bg-slate-800/50 text-slate-400">{source || "Other"}</span>;
  };

  const getStatusStyle = (status: string) => {
    if (status === 'Converted / Active Project') return 'border-green-500/40 text-green-400 bg-green-500/10';
    if (status === 'New Lead') return 'border-amber-500/40 text-amber-400 bg-amber-500/10';
    if (status === 'Not Responding' || status === 'Not Reachable') return 'border-red-500/40 text-red-400 bg-red-500/10';
    if (status === 'Callback Next Week' || status === 'Follow Up Next Month') return 'border-blue-500/40 text-blue-400 bg-blue-500/10';
    return 'border-neutral-700 text-slate-700 bg-white';
  };


  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col justify-start pt-10 min-h-screen bg-[#0a0f1d] text-white px-6 pb-20 font-sans overflow-y-auto pointer-events-auto"
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div className="max-w-[1600px] mx-auto w-full">
        
        {unreadAssignedCount > 0 && (
          <div className="mb-6 bg-blue-900/20 border border-blue-800/50 rounded-xl p-4 flex items-center justify-between shadow-sm animate-pulse">
            <div className="flex items-center gap-3">
              <span className="text-xl">🔔</span>
              <span className="text-blue-300 font-semibold text-sm">
                You have {unreadAssignedCount} new assigned lead{unreadAssignedCount !== 1 ? 's' : ''} waiting for your action.
              </span>
            </div>
          </div>
        )}

        {/* NEW HEADER STRUCTURE */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-slate-800/60 w-full">
          {/* Left Side: Brand Logo and Title */}
          <div className="flex items-center gap-4">
            <Image 
              src="/logo/logo.webp" 
              alt="Voomet Design Logo" 
              width={160} 
              height={48} 
              className="max-h-12 w-auto object-contain"
            />
            <div className="h-8 w-px bg-slate-800/60 hidden md:block"></div>
            <div>
              <h1 className="text-3xl font-light tracking-tight text-white">
                Lead <span className="font-serif italic text-slate-300 font-bold">Intelligence</span>
              </h1>
            </div>
          </div>

          {/* Right Side: Active Session and Actions */}
          <div className="flex flex-wrap items-center gap-4 relative">
            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 rounded-full border border-slate-700/50 bg-[#1e293b] text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                {notifications.filter(n => !n.isRead).length > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-[0_0_8px_rgba(239,68,68,0.8)]">
                    {notifications.filter(n => !n.isRead).length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 max-h-[400px] bg-[#111827] border border-slate-700/60 shadow-2xl rounded-2xl overflow-hidden z-50 flex flex-col">
                  <div className="p-4 border-b border-slate-800/60 flex justify-between items-center bg-slate-900/50">
                    <h3 className="text-sm font-bold text-slate-200">Notifications</h3>
                    <button 
                      onClick={markAllNotificationsRead}
                      className="text-[10px] uppercase font-bold tracking-wider text-blue-400 hover:text-blue-300"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="overflow-y-auto flex-1 custom-scrollbar">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-sm text-slate-500">No notifications yet.</div>
                    ) : (
                      <div className="flex flex-col divide-y divide-slate-800/40">
                        {notifications.map(n => (
                          <div 
                            key={n.id} 
                            onClick={() => {
                              if (!n.isRead) markNotificationRead(n.id);
                              setIsNotificationsOpen(false);
                            }}
                            className={`p-4 cursor-pointer transition-colors ${!n.isRead ? "bg-blue-500/10 hover:bg-blue-500/15" : "hover:bg-white/5"}`}
                          >
                            <p className={`text-xs ${!n.isRead ? "text-slate-200 font-medium" : "text-slate-400"}`}>{n.message}</p>
                            <p className="text-[10px] text-slate-500 font-mono mt-2 uppercase tracking-widest">
                              {new Date(n.createdAt).toLocaleDateString()} {new Date(n.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Active Session Badge */}
            <div className="flex items-center gap-2 bg-[#1e293b] border border-slate-700/50 px-3 py-1.5 rounded-full">
              {adminAvatar ? (
                <img src={adminAvatar} alt="Profile" className="w-6 h-6 rounded-full object-cover border border-slate-600 shadow-[0_0_8px_rgba(34,197,94,0.3)]" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></span>
              )}
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
                LOGGED IN AS: <span className="text-slate-200 font-semibold">{currentUser}</span>
              </span>
            </div>

            {/* Logout Control */}
            <button
              onClick={async () => {
                try {
                  await fetch("/api/auth", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ action: "logout" }),
                  });
                } catch (e) {}
                document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                localStorage.clear();
                setCurrentUser(null);
                window.location.href = '/login';
              }}
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
              title="Logout"
            >
              Logout
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>

            {/* Add New Lead Button */}
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#0f172a] hover:bg-[#1e293b] text-white border border-slate-700 px-5 py-2.5 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors shadow-[0_0_15px_rgba(15,23,42,0.5)] flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add New Lead
            </button>

            {/* System Settings Button */}
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-5 py-2.5 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors shadow-[0_0_15px_rgba(15,23,42,0.3)] flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              System Settings
            </button>
          </div>
        </div>

        {/* Filter Rows Panel */}
        <div className="mt-6 mb-4 w-full">
          <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase block mb-2">
            Quick Channels
          </span>
          <div className="flex flex-wrap items-center gap-2 w-full">
            <button 
            onClick={() => { setFilterEmployee("All"); setFilterSource("All"); setFilterDate(""); setFilterService("All"); setFilterLocation("All"); }}
            className={`px-4 py-2 rounded-xl border flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all ${(filterEmployee === "All" && filterSource === "All" && !filterDate && filterService === "All" && filterLocation === "All") ? "bg-amber-500/20 border-amber-500/50 text-amber-400" : "bg-slate-800/40 border-slate-700/50 text-slate-400 hover:bg-slate-800"}`}
          >
            All Leads
          </button>
          
          <button
            onClick={() => { setFilterEmployee("Unassigned"); setFilterSource("All"); }}
            className={`transition-all ${
              filterEmployee === "Unassigned"
                ? "bg-rose-500/10 text-rose-400 border border-rose-500/30 px-4 py-2 rounded-lg font-medium text-xs tracking-wider uppercase flex items-center gap-2"
                : "bg-slate-900/60 text-slate-400 border border-slate-800/80 hover:text-rose-400 px-4 py-2 rounded-lg font-medium text-xs tracking-wider uppercase flex items-center gap-2"
            }`}
          >
            Unclaimed Leads
            <span className="bg-rose-950 text-rose-400 border border-rose-800/50 text-[10px] px-1.5 py-0.5 rounded-md font-bold">
              {unclaimedCount}
            </span>
          </button>

          {[
            { label: "GOOGLE LEADS", value: "Google Ads" },
            { label: "META LEADS", value: "Meta Ads" },
            { label: "WEBSITE LEADS", value: "Website" },
            { label: "COUPON LEADS", value: "Coupon" },
            { label: "REFERENCE", value: "Reference" },
            { label: "OTHER", value: "Other" }
          ].map((src) => {
            const isActive = filterSource === src.value;
            return (
              <button
                key={src.value}
                onClick={() => { setFilterSource(src.value); setFilterEmployee("All"); }}
                className={`transition-all ${
                  isActive 
                    ? "bg-amber-500/10 text-amber-500 border border-amber-500/30 px-4 py-2 rounded-lg font-medium text-xs tracking-wider uppercase flex items-center gap-2" 
                    : "bg-slate-900/60 text-slate-400 border border-slate-800/80 hover:text-slate-200 px-4 py-2 rounded-lg font-medium text-xs tracking-wider uppercase flex items-center gap-2"
                }`}
              >
                {src.label}
                <span className="bg-slate-800 text-slate-300 text-[10px] px-1.5 py-0.5 rounded-md font-bold">
                  {sourceCounts[src.value as keyof typeof sourceCounts]}
                </span>
              </button>
            );
          })}
        </div>
        </div>

        {/* Clean Filter Grid */}
        <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase block mb-2 mt-2">
          Advanced Criteria
        </span>
        <div className="flex flex-wrap items-end gap-4 w-full mt-4 mb-10">
          <div className="flex-1 min-w-[150px] flex flex-col gap-2">
            <label className="text-[10px] text-slate-400 font-mono uppercase tracking-widest pl-1">Date</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className={`bg-[#1e293b] rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none [color-scheme:dark] h-[42px] w-full transition-all border ${filterDate !== "" ? "border-amber-500/60 ring-1 ring-amber-500/30" : "border-slate-800"}`}
            />
          </div>
          <div className="flex-1 min-w-[150px] flex flex-col gap-2">
            <label className="text-[10px] text-slate-400 font-mono uppercase tracking-widest pl-1">Service</label>
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className={`bg-[#1e293b] rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none appearance-none pr-8 cursor-pointer h-[42px] w-full transition-all border ${filterService !== "All" ? "border-amber-500/60 ring-1 ring-amber-500/30" : "border-slate-800"}`}
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'#94a3b8\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
            >
              <option value="All">All Services</option>
              {SERVICE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[150px] flex flex-col gap-2">
            <label className="text-[10px] text-slate-400 font-mono uppercase tracking-widest pl-1">Location</label>
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className={`bg-[#1e293b] rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none appearance-none pr-8 cursor-pointer h-[42px] w-full transition-all border ${filterLocation !== "All" ? "border-amber-500/60 ring-1 ring-amber-500/30" : "border-slate-800"}`}
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'#94a3b8\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
            >
              <option value="All">All Locations</option>
              {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[150px] flex flex-col gap-2">
            <label className="text-[10px] text-slate-400 font-mono uppercase tracking-widest pl-1">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`bg-[#1e293b] rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none appearance-none pr-8 cursor-pointer h-[42px] w-full transition-all border ${filterStatus !== "All" ? "border-amber-500/60 ring-1 ring-amber-500/30" : "border-slate-800"}`}
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'#94a3b8\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
            >
              <option value="All">All Statuses</option>
              <option value="New Lead">New Lead</option>
              <option value="In Progress">In Progress</option>
              <option value="Follow-Up">Follow-Up</option>
              <option value="Converted / Active Project">Converted / Active Project</option>
              <option value="Not Reachable">Not Reachable</option>
              <option value="Scam / Fake">Scam / Fake</option>
            </select>
          </div>
          <div className="flex-1 min-w-[150px] flex flex-col gap-2">
            <label className="text-[10px] text-slate-400 font-mono uppercase tracking-widest pl-1">Employee</label>
            <select
              value={filterEmployee}
              onChange={(e) => setFilterEmployee(e.target.value)}
              className={`bg-[#1e293b] rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none appearance-none pr-8 cursor-pointer h-[42px] w-full transition-all border ${filterEmployee !== "All" ? "border-amber-500/60 ring-1 ring-amber-500/30" : "border-slate-800"}`}
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'#94a3b8\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
            >
              <option value="All">All Employees</option>
              {employeesList.map(emp => (
                <option key={emp.id} value={emp.name}>{emp.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4 shrink-0 ml-auto h-[42px]">
            {(filterDate || filterService !== "All" || filterLocation !== "All" || filterEmployee !== "All" || filterSource !== "All" || filterStatus !== "All") && (
              <button 
                onClick={() => { setFilterDate(""); setFilterService("All"); setFilterLocation("All"); setFilterEmployee("All"); setFilterSource("All"); setFilterStatus("All"); }}
                className="h-[42px] px-4 rounded-xl border border-slate-700/50 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors text-xs font-semibold uppercase tracking-wider shrink-0 flex items-center justify-center"
              >
                Clear
              </button>
            )}
            
            {/* Metrics & Export */}
            <div className="flex items-center gap-3 shrink-0 h-[42px]">
              <button 
                onClick={() => setIsExportModalOpen(true)}
                className="h-[42px] px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-colors"
                title="Export Filtered Leads to CSV"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Export CSV
              </button>
              
              <div className="bg-[#1e293b] border border-slate-700/50 px-5 h-[42px] rounded-xl flex items-center justify-center gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">TOTAL LEADS</span>
                  <span className="text-xl font-bold text-slate-200 leading-none">{(filteredLeads || []).length}</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-500 shrink-0">
                  {isLoading && (leads || []).length === 0 ? (
                    <div className="w-3 h-3 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin" />
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isLoading && (leads || []).length === 0 ? (
           <div className="w-full flex flex-col items-center justify-center py-32 bg-slate-900/30 border border-slate-800/60 rounded-3xl border-dashed">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-6 text-slate-400 shadow-inner">
               <div className="w-6 h-6 rounded-full border-2 border-neutral-500/30 border-t-neutral-500 animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-slate-200 mb-2 tracking-tight">Synchronizing Data</h3>
            <p className="text-sm text-slate-400">Connecting to secure database nodes...</p>
         </div>
        ) : (filteredLeads || []).length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-32 bg-slate-900/30 border border-slate-800/60 rounded-3xl border-dashed">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-6 text-slate-400 shadow-inner">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-200 mb-2 tracking-tight">No leads found</h3>
            <p className="text-sm text-slate-400">Try adjusting your filters or waiting for new requests.</p>
          </div>
        ) : (
          <div className="w-full bg-[#111827] border border-slate-800/60 shadow-xl rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1300px]">
                <thead>
                  <tr className="bg-slate-900/50 border-b border-slate-800/60 flex w-full items-center">
                    <th className="py-4 px-2 md:px-4 text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold w-[12%]">Date & Time</th>
                    <th className="py-4 px-2 md:px-4 text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold w-[13%]">Client Name</th>
                    <th className="py-4 px-2 md:px-4 text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold w-[16%]">Contact Info</th>
                    <th className="py-4 px-2 md:px-4 text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold w-[13%]">Location & Promo</th>
                    <th className="py-4 px-2 md:px-4 text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold w-[16%]">Service & Details</th>
                    <th className="py-4 px-2 md:px-4 text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold w-[13%]">Status Tracker</th>
                    <th className="py-4 px-2 md:px-4 text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold w-[11%]">Handled By</th>
                    <th className="py-4 px-2 md:px-4 text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold text-right flex justify-end w-[6%]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {filteredLeads.map((lead) => {
                    const isOwner = lead.handledBy === currentUser || lead.handledBy === "Pinned: " + currentUser;
                    const isUnassigned = !lead.handledBy || lead.handledBy === "Unassigned" || lead.handledBy === "";
                    const canEdit = currentUserRole !== "Team Member" || isOwner || isUnassigned;
                    
                    return (
                    <tr key={lead.id} className="hover:bg-white/5 transition-colors group flex w-full items-center border-b border-slate-800/50">
                      <td className="py-4 px-2 md:px-4 align-middle w-[12%]">
                        <div className="flex flex-col gap-1 mt-1">
                          <span className="text-sm text-slate-300 font-medium">{new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span className="text-[11px] text-slate-400 font-mono">{new Date(lead.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2 md:px-4 align-middle w-[13%]">
                        <div className="flex flex-col gap-2 items-start">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-serif text-sm border border-amber-500/20 shrink-0 shadow-inner">
                              {(lead.name || "").charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm font-semibold text-slate-200 tracking-wide truncate max-w-[120px]">{lead.name}</span>
                          </div>
                          {getSourceBadge((lead.source || ""))}
                        </div>
                      </td>
                      <td className="py-4 px-2 md:px-4 align-middle w-[16%]">
                        <div className="flex flex-col gap-1.5 mt-1">
                          <span className="text-sm text-slate-300 font-mono tracking-wider">{(lead.mobileNumber || "")}</span>
                          {lead.email && <span className="text-[11px] text-slate-400 truncate max-w-[150px]" title={lead.email}>{lead.email}</span>}
                        </div>
                      </td>
                      <td className="py-4 px-2 md:px-4 align-middle w-[13%]">
                        <div className="flex flex-col items-start gap-2 mt-1">
                           <span className="text-sm text-slate-500 capitalize">{lead.projectLocation || "—"}</span>
                           {lead.promoCode && lead.promoCode !== "None" && (
                            <div className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-md">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-sm shrink-0"></span>
                              <span className="text-[10px] font-mono font-bold text-green-400 tracking-widest truncate">{lead.promoCode}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-2 md:px-4 align-middle w-[16%]">
                        <div className="flex flex-col gap-2 items-start mt-0.5">
                          <div className="flex gap-2 items-center flex-wrap">
                            <span className="text-[11px] bg-neutral-800 text-neutral-200 px-3 py-1 rounded-full border border-neutral-700 tracking-wide shadow-sm truncate max-w-[140px]">
                              {(lead.requirement || "")}
                            </span>
                            {lead.areaSqft && (
                              <span className="text-[10px] bg-slate-800/60 text-slate-300 px-2 py-1 rounded-full border border-slate-700/50 font-mono whitespace-nowrap">
                                {lead.areaSqft} sqft
                              </span>
                            )}
                            {lead.status === "Follow-Up" && lead.followUpDate && (
                              <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-2 py-1 rounded-md shadow-[0_0_8px_rgba(245,158,11,0.2)] mt-1" title="Follow-Up Pending">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_5px_rgba(251,191,36,0.8)] animate-pulse shrink-0"></span>
                                <span className="text-[9px] font-bold text-amber-300 tracking-widest uppercase whitespace-nowrap">
                                  📅 {new Date(lead.followUpDate).toLocaleDateString('en-GB')}
                                </span>
                              </div>
                            )}
                          </div>
                          {(lead.projectDetails || "") ? (
                             <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-500 mt-1 block truncate max-w-[140px]">"{lead.projectDetails}"</span>
                          ) : (
                             <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-500 mt-1 block truncate max-w-[140px]">Via {lead.submissionSource}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-2 md:px-4 align-middle w-[13%]">
                        <select 
                          value={lead.status || "New Lead"}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          disabled={!canEdit}
                          className={`mt-1 text-xs font-semibold tracking-wide border rounded-lg px-2 py-2 outline-none appearance-none pr-6 shadow-sm transition-colors w-full max-w-[130px] truncate ${getStatusStyle(lead.status)} ${!canEdit ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 6px center' }}
                        >
                          {CRM_STATUSES.map(status => (
                            <option key={status} value={status} className="bg-slate-900 text-slate-200">{status}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4 px-2 md:px-4 align-middle w-[11%]">
                        <select
                          value={lead.handledBy || "Unassigned"}
                          onChange={(e) => handleClaimLead(lead.id, e.target.value)}
                          disabled={!canEdit}
                          className={`bg-slate-900 border border-slate-800 text-slate-200 rounded-lg py-1.5 px-2 focus:ring-1 focus:ring-slate-700 focus:outline-none text-[11px] font-semibold tracking-wide appearance-none pr-6 transition-colors w-full max-w-[120px] truncate ${!canEdit ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 6px center' }}
                        >
                          <option value="Unassigned" className="bg-slate-900 text-slate-200">Unassigned</option>
                          {employeesList && employeesList.length > 0 ? employeesList.map(emp => (
                            <option key={emp.id} value={`Pinned: ${emp.name || emp.username}`} className="bg-slate-900 text-slate-200">
                              📌 Pinned: {emp.name || emp.username}
                            </option>
                          )) : (
                            <>
                              <option value="Pinned: Sahil" className="bg-slate-900 text-slate-200">📌 Pinned: Sahil</option>
                              <option value="Pinned: Design Admin" className="bg-slate-900 text-slate-200">📌 Pinned: Design Admin</option>
                            </>
                          )}
                        </select>
                      </td>
                      <td className="py-4 px-2 md:px-4 align-middle text-right flex justify-end w-[6%]">
                        <div className="relative inline-block text-left" ref={actionMenuOpenId === lead.id ? actionMenuRef : null}>
                          <button
                            onClick={() => canEdit && setActionMenuOpenId(actionMenuOpenId === lead.id ? null : lead.id)}
                            disabled={!canEdit}
                            className={`w-9 h-9 flex items-center justify-center bg-slate-900/60 text-slate-400 border border-slate-800/80 p-2 rounded-full transition-all duration-200 shadow-sm ${canEdit ? "hover:bg-slate-800 hover:text-white" : "opacity-50 cursor-not-allowed"}`}
                            title="Actions"
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                          </button>
                          
                          {actionMenuOpenId === lead.id && canEdit && (
                            <div className="absolute right-0 top-10 mt-1 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-xl text-sm z-50 overflow-hidden flex flex-col">
                              {lead.isTrashed ? (
                                <>
                                  <button onClick={() => { handleRecoverLead(lead.id); setActionMenuOpenId(null); }} className="px-4 py-3 text-left hover:bg-slate-800 text-slate-200 flex items-center gap-2 transition-colors">
                                    🔄 Recover Lead
                                  </button>
                                  <button onClick={() => { handleDeleteLead(lead.id); setActionMenuOpenId(null); }} className="px-4 py-3 text-left hover:bg-slate-800 text-rose-400 font-medium flex items-center gap-2 transition-colors border-t border-slate-800">
                                    ❌ Delete Permanently
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button onClick={() => { handlePinLead(lead.id, !!lead.isPinned); setActionMenuOpenId(null); }} className="px-4 py-3 text-left hover:bg-slate-800 text-slate-200 flex items-center gap-2 transition-colors">
                                    📌 {lead.isPinned ? "Unpin Lead" : "Pin Lead"}
                                  </button>
                                  <button onClick={() => { setSelectedLeadForDetails(lead); setActionMenuOpenId(null); }} className="px-4 py-3 text-left hover:bg-slate-800 text-slate-200 flex items-center gap-2 transition-colors">
                                    ✏️ Edit Details
                                  </button>
                                  <button onClick={() => { handleTrashLead(lead.id); setActionMenuOpenId(null); }} className="px-4 py-3 text-left hover:bg-slate-800 text-rose-400 font-medium flex items-center gap-2 transition-colors border-t border-slate-800">
                                    🗑️ Move to Trash
                                  </button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Lead Detail & Chat Modal */}
        {selectedLeadForDetails && currentUser && (
          <LeadDetailModal 
            isOpen={true} 
            onClose={() => setSelectedLeadForDetails(null)} 
            leadId={selectedLeadForDetails.id}
            currentUser={currentUser}
            currentUserRole={currentUserRole}
            employeesList={employeesList}
          />
        )}

        {/* Add New Lead Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-xl bg-[#1e293b] border border-slate-700/50 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col">
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
              <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-200 tracking-tight flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                  Add New Lead
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#1e293b] border border-slate-700/50 flex items-center justify-center text-slate-500 hover:text-slate-200 hover:bg-neutral-800 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <form onSubmit={handleCreateLead} className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[70vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-slate-400 font-mono uppercase tracking-widest pl-1">Client Name *</label>
                    <input required type="text" value={newLeadData.name} onChange={(e) => setNewLeadData({...newLeadData, name: e.target.value})} className="bg-slate-900/60 border border-slate-800 text-slate-200 placeholder-slate-500 rounded-lg py-2.5 px-3.5 focus:ring-1 focus:ring-amber-500 focus:outline-none w-full" placeholder="e.g. John Doe" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-slate-400 font-mono uppercase tracking-widest pl-1">Mobile Number *</label>
                    <input required type="text" value={newLeadData.mobileNumber} onChange={(e) => setNewLeadData({...newLeadData, mobileNumber: e.target.value})} className="bg-slate-900/60 border border-slate-800 text-slate-200 placeholder-slate-500 rounded-lg py-2.5 px-3.5 focus:ring-1 focus:ring-amber-500 focus:outline-none w-full" placeholder="e.g. 9876543210" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-slate-400 font-mono uppercase tracking-widest pl-1">Location</label>
                    <input type="text" value={newLeadData.projectLocation} onChange={(e) => setNewLeadData({...newLeadData, projectLocation: e.target.value})} className="bg-slate-900/60 border border-slate-800 text-slate-200 placeholder-slate-500 rounded-lg py-2.5 px-3.5 focus:ring-1 focus:ring-amber-500 focus:outline-none w-full" placeholder="e.g. Mumbai" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-slate-400 font-mono uppercase tracking-widest pl-1">Requirement *</label>
                    <select value={newLeadData.requirement} onChange={(e) => setNewLeadData({...newLeadData, requirement: e.target.value})} className="bg-slate-900/60 border border-slate-800 text-slate-200 placeholder-slate-500 rounded-lg py-2.5 px-3.5 focus:ring-1 focus:ring-amber-500 focus:outline-none w-full appearance-none">
                      {SERVICE_TYPES.map(type => <option key={type} value={type} className="bg-slate-900 text-slate-200">{type}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-slate-400 font-mono uppercase tracking-widest pl-1">Area (sqft) *</label>
                    <input required type="number" value={newLeadData.areaSqft} onChange={(e) => setNewLeadData({...newLeadData, areaSqft: e.target.value})} className="bg-slate-900/60 border border-slate-800 text-slate-200 placeholder-slate-500 rounded-lg py-2.5 px-3.5 focus:ring-1 focus:ring-amber-500 focus:outline-none w-full" placeholder="e.g. 1500" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-slate-400 font-mono uppercase tracking-widest pl-1">Lead Source</label>
                    <select value={newLeadData.source} onChange={(e) => setNewLeadData({...newLeadData, source: e.target.value})} className="bg-slate-900/60 border border-slate-800 text-slate-200 placeholder-slate-500 rounded-lg py-2.5 px-3.5 focus:ring-1 focus:ring-amber-500 focus:outline-none w-full appearance-none">
                      <option value="Meta Ads" className="bg-slate-900 text-slate-200">Meta Ads</option>
                      <option value="Google Ads" className="bg-slate-900 text-slate-200">Google Ads</option>
                      <option value="Reference" className="bg-slate-900 text-slate-200">Reference</option>
                      <option value="Other" className="bg-slate-900 text-slate-200">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-amber-500 font-mono uppercase tracking-widest pl-1">Direct Assignment</label>
                    <select value={newLeadData.handledBy} onChange={(e) => setNewLeadData({...newLeadData, handledBy: e.target.value})} className="bg-slate-900/60 border border-slate-800 text-slate-200 placeholder-slate-500 rounded-lg py-2.5 px-3.5 focus:ring-1 focus:ring-amber-500 focus:outline-none w-full appearance-none">
                      <option value="Unassigned" className="bg-slate-900 text-slate-200">Leave Unassigned</option>
                      <option value="Sahil" className="bg-slate-900 text-slate-200">Sahil</option>
                      <option value="Design Admin" className="bg-slate-900 text-slate-200">Design Admin</option>
                      <option value="Team Member 1" className="bg-slate-900 text-slate-200">Team Member 1</option>
                      <option value="Team Member 2" className="bg-slate-900 text-slate-200">Team Member 2</option>
                      <option value="Team Member 3" className="bg-slate-900 text-slate-200">Team Member 3</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-800">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-sm font-semibold transition-colors">Cancel</button>
                  <button type="submit" disabled={isCreatingLead} className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-colors shadow-[0_0_15px_rgba(245,158,11,0.2)] disabled:opacity-50">
                    {isCreatingLead ? "Creating..." : "Create Lead"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* System Settings Modal */}
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-5xl h-[80vh] bg-[#0f172a] border border-slate-700/50 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row">
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500 z-10" />
              
              {/* Sidebar */}
              <div className="w-full md:w-64 bg-[#1e293b] border-r border-slate-700/50 flex flex-col pt-6 z-0">
                <div className="px-6 mb-8 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-slate-200 tracking-tight flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                    Settings
                  </h3>
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className="md:hidden w-8 h-8 rounded-full bg-[#1e293b] border border-slate-700/50 flex items-center justify-center text-slate-500 hover:text-slate-200 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>

                <nav className="flex flex-col gap-1 px-3">
                  <button 
                    onClick={() => setActiveSettingsTab("employee")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeSettingsTab === "employee" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent"}`}
                  >
                    <span>👥</span> Employee Hub
                  </button>
                  <button 
                    onClick={() => setActiveSettingsTab("trash")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeSettingsTab === "trash" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent"}`}
                  >
                    <span>🗑️</span> Recycle Bin
                  </button>
                  <button 
                    onClick={() => setActiveSettingsTab("profile")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeSettingsTab === "profile" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent"}`}
                  >
                    <span>👤</span> Admin Profile
                  </button>
                </nav>
              </div>

              {/* Content Area */}
              <div className="flex-1 bg-[#0f172a] relative overflow-hidden flex flex-col z-0">
                <div className="absolute top-4 right-4 hidden md:block">
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className="w-8 h-8 rounded-full bg-[#1e293b] border border-slate-700/50 flex items-center justify-center text-slate-500 hover:text-slate-200 hover:bg-neutral-800 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
                  {/* Tab 1: Employee Hub */}
                  {activeSettingsTab === "employee" && (
                    <div className="flex flex-col gap-10">
                      <div>
                        <h2 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
                          <span>👥</span> Add New Employee
                        </h2>
                        <form onSubmit={handleCreateEmployee} className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-[#1e293b] p-6 rounded-2xl border border-slate-800">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs uppercase tracking-widest text-slate-400 font-bold ml-1">Full Name *</label>
                            <input 
                              required type="text" value={newEmployeeData.name} onChange={e => setNewEmployeeData({...newEmployeeData, name: e.target.value})}
                              className="bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-amber-500/50" placeholder="e.g. John Doe"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs uppercase tracking-widest text-slate-400 font-bold ml-1">Email Address *</label>
                            <input 
                              required type="email" value={newEmployeeData.email} onChange={e => setNewEmployeeData({...newEmployeeData, email: e.target.value})}
                              className="bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-amber-500/50" placeholder="e.g. john@voomet.com"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs uppercase tracking-widest text-slate-400 font-bold ml-1">Password *</label>
                            <div className="relative">
                              <input 
                                required type={showPassword ? "text" : "password"} value={newEmployeeData.password} onChange={e => setNewEmployeeData({...newEmployeeData, password: e.target.value})}
                                className="bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-amber-500/50 w-full pr-10" placeholder="Enter password"
                              />
                              <button 
                                type="button" 
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? "🙈" : "👁️"}
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs uppercase tracking-widest text-slate-400 font-bold ml-1">Role *</label>
                            <select
                              value={newEmployeeData.role} onChange={e => setNewEmployeeData({...newEmployeeData, role: e.target.value})}
                              className="bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-amber-500/50"
                            >
                              <option value="Team Member">Team Member</option>
                              <option value="Manager">Manager</option>
                            </select>
                          </div>
                          <div className="md:col-span-2 pt-2">
                            <button type="submit" disabled={isCreatingEmployee} className="bg-amber-500 hover:bg-amber-400 text-[#0f172a] font-bold py-3 px-8 rounded-xl transition-colors disabled:opacity-50">
                              {isCreatingEmployee ? "Creating..." : "Create Employee"}
                            </button>
                          </div>
                        </form>
                      </div>

                      <div>
                        <h2 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
                          <span>📋</span> Staff Directory
                        </h2>
                        <div className="bg-[#1e293b] border border-slate-800 rounded-2xl overflow-hidden">
                          <table className="w-full text-left text-sm text-slate-400">
                            <thead className="bg-[#0f172a] text-xs uppercase font-mono tracking-widest">
                              <tr>
                                <th className="px-6 py-4 font-bold text-slate-300">Name</th>
                                <th className="px-6 py-4 font-bold text-slate-300">Email</th>
                                <th className="px-6 py-4 font-bold text-slate-300">Role</th>
                                <th className="px-6 py-4 font-bold text-slate-300 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60">
                              {employeesList.map(emp => (
                                <tr key={emp.id} className="hover:bg-slate-800/30 transition-colors">
                                  <td className="px-6 py-4 font-medium text-slate-200">{emp.name || emp.username}</td>
                                  <td className="px-6 py-4">{emp.email || "-"}</td>
                                  <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs ${emp.role === "Manager" ? "bg-purple-500/20 text-purple-400" : "bg-slate-800 text-slate-400"}`}>
                                      {emp.role}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs ${emp.status === "Hold" ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}>
                                      {emp.status || "Active"}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                                    <button 
                                      onClick={() => {
                                        setSelectedEmployeeForView(emp);
                                        setIsViewMoreEmployeeModalOpen(true);
                                      }}
                                      className="text-xs bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                                    >
                                      <span>👁️</span> View
                                    </button>
                                    <button 
                                      onClick={async () => {
                                        const newStatus = emp.status === "Hold" ? "Active" : "Hold";
                                        if (confirm(`Are you sure you want to put ${emp.name} on ${newStatus}?`)) {
                                          try {
                                            const res = await fetch(`/api/employees`, {
                                              method: 'PATCH',
                                              headers: {'Content-Type': 'application/json'},
                                              body: JSON.stringify({ id: emp.id, status: newStatus })
                                            });
                                            if (res.ok) {
                                              fetchEmployees();
                                            } else alert("Failed to update status");
                                          } catch (e) {
                                            alert("Error updating status");
                                          }
                                        }
                                      }}
                                      className={`text-xs px-3 py-1.5 rounded-lg transition-colors border flex items-center gap-1 ${emp.status === "Hold" ? "bg-green-500/10 hover:bg-green-500/20 text-green-400 border-green-500/20" : "bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border-orange-500/20"}`}
                                    >
                                      {emp.status === "Hold" ? "▶️ Unhold" : "⏸️ Hold"}
                                    </button>
                                    <button 
                                      onClick={async () => {
                                        if (confirm(`Are you sure you want to PERMANENTLY DELETE ${emp.name}?`)) {
                                          try {
                                            const res = await fetch(`/api/employees?id=${emp.id}`, {
                                              method: 'DELETE',
                                            });
                                            if (res.ok) {
                                              fetchEmployees();
                                            } else alert("Failed to delete employee");
                                          } catch (e) {
                                            alert("Error deleting employee");
                                          }
                                        }
                                      }}
                                      className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                                    >
                                      <span>🗑️</span> Delete
                                    </button>
                                  </td>
                                </tr>
                              ))}
                              {employeesList.length === 0 && (
                                <tr>
                                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">No staff members found.</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Recycle Bin */}
                  {activeSettingsTab === "trash" && (
                    <div className="flex flex-col gap-6">
                      <h2 className="text-xl font-bold text-rose-400 mb-2 flex items-center gap-2 border-b border-slate-800 pb-4">
                        <span>🗑️</span> Recycle Bin (Soft Deleted)
                      </h2>
                      <div className="bg-[#1e293b] border border-slate-800 rounded-2xl overflow-hidden">
                        <table className="w-full text-left text-sm text-slate-400">
                          <thead className="bg-[#0f172a] text-xs uppercase font-mono tracking-widest">
                            <tr>
                              <th className="px-6 py-4 font-bold text-slate-300">Lead Name</th>
                              <th className="px-6 py-4 font-bold text-slate-300">Deleted Date</th>
                              <th className="px-6 py-4 font-bold text-slate-300 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60">
                            {trashedLeads.map(lead => (
                              <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-200">{lead.name}</td>
                                <td className="px-6 py-4">{new Date(lead.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-right flex justify-end gap-2">
                                  <button 
                                    onClick={async () => {
                                      const res = await fetch(`/api/lead`, {
                                        method: 'PATCH',
                                        headers: {'Content-Type': 'application/json'},
                                        body: JSON.stringify({ id: lead.id, action: 'recover' })
                                      });
                                      if (res.ok) {
                                        fetchTrashedLeads();
                                        fetchLeads();
                                      }
                                    }}
                                    className="text-xs bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg transition-colors"
                                  >
                                    🔄 Recover
                                  </button>
                                  <button 
                                    onClick={async () => {
                                      if(confirm(`Are you sure you want to permanently delete ${lead.name}?`)) {
                                        const res = await fetch(`/api/lead`, {
                                          method: 'PATCH',
                                          headers: {'Content-Type': 'application/json'},
                                          body: JSON.stringify({ id: lead.id, action: 'delete' })
                                        });
                                        if (res.ok) fetchTrashedLeads();
                                      }
                                    }}
                                    className="text-xs bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 px-3 py-1.5 rounded-lg transition-colors"
                                  >
                                    ❌ Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                            {trashedLeads.length === 0 && (
                              <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-slate-500">Recycle Bin is empty.</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Tab 3: Admin Profile */}
                  {activeSettingsTab === "profile" && (
                    <div className="flex flex-col gap-6 max-w-xl">
                      <h2 className="text-xl font-bold text-slate-200 mb-2 flex items-center gap-2 border-b border-slate-800 pb-4">
                        <span>👤</span> Admin Profile Settings
                      </h2>
                      <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-800 flex items-center gap-8">
                        <div className="relative group">
                          <div className="w-24 h-24 rounded-full border-4 border-slate-800 overflow-hidden bg-slate-900 flex items-center justify-center">
                            {adminAvatar ? (
                              <img src={adminAvatar} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-3xl">🧑‍💻</span>
                            )}
                          </div>
                          <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full backdrop-blur-sm">
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Change</span>
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (e) => setAdminAvatar(e.target?.result as string);
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-200">{currentUser}</h3>
                          <p className="text-sm text-slate-400 mb-4">Super Administrator</p>
                          <button 
                            onClick={async () => {
                              if (!adminAvatar || !adminAvatar.startsWith('data:')) {
                                alert("No new image selected.");
                                return;
                              }
                              try {
                                const formData = new FormData();
                                // Create blob from data URL
                                const res = await fetch(adminAvatar);
                                const blob = await res.blob();
                                formData.append("file", blob, "avatar.png");

                                const uploadRes = await fetch(`/api/upload?filename=avatar_${Date.now()}.png`, {
                                  method: 'POST',
                                  body: formData.get("file")
                                });
                                const uploadData = await uploadRes.json();
                                if (uploadData.success && uploadData.url) {
                                  const profileRes = await fetch('/api/user/profile', {
                                    method: 'PATCH',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ avatarUrl: uploadData.url })
                                  });
                                  const profileData = await profileRes.json();
                                  if (profileData.success) {
                                    alert("Profile updated successfully!");
                                    setAdminAvatar(profileData.data.avatarUrl);
                                  } else {
                                    alert("Failed to update profile.");
                                  }
                                }
                              } catch (e) {
                                console.error(e);
                                alert("Upload failed.");
                              }
                            }}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors border border-slate-700"
                          >
                            Save Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Export CSV Modal */}
        {isExportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl max-w-md w-full text-slate-200 shadow-2xl">
              <h3 className="text-xl font-bold text-slate-100 tracking-tight mb-6">Export Lead Reports (CSV)</h3>
              
              <div className="flex flex-col gap-4 mb-8">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="exportType" checked={exportType === "All"} onChange={() => setExportType("All")} className="w-4 h-4 text-amber-500 bg-slate-800 border-slate-700 focus:ring-amber-500 focus:ring-offset-slate-900" />
                  <span className="text-sm font-medium">Export All Current Leads</span>
                </label>
                
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="exportType" checked={exportType === "Employee"} onChange={() => setExportType("Employee")} className="w-4 h-4 text-amber-500 bg-slate-800 border-slate-700 focus:ring-amber-500 focus:ring-offset-slate-900" />
                    <span className="text-sm font-medium">Filter by Employee</span>
                  </label>
                  {exportType === "Employee" && (
                    <select value={exportEmployee} onChange={(e) => setExportEmployee(e.target.value)} className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg py-2 px-3 focus:ring-1 focus:ring-amber-500 focus:outline-none ml-7 appearance-none">
                      <option value="Pinned: Sahil">Sahil</option>
                      <option value="Pinned: Design Admin">Design Admin</option>
                      <option value="Pinned: Team Member 1">Team Member 1</option>
                      <option value="Pinned: Team Member 2">Team Member 2</option>
                      <option value="Pinned: Team Member 3">Team Member 3</option>
                    </select>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="exportType" checked={exportType === "Status"} onChange={() => setExportType("Status")} className="w-4 h-4 text-amber-500 bg-slate-800 border-slate-700 focus:ring-amber-500 focus:ring-offset-slate-900" />
                    <span className="text-sm font-medium">Filter by Status</span>
                  </label>
                  {exportType === "Status" && (
                    <select value={exportStatus} onChange={(e) => setExportStatus(e.target.value)} className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg py-2 px-3 focus:ring-1 focus:ring-amber-500 focus:outline-none ml-7 appearance-none">
                      {CRM_STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
                    </select>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="exportType" checked={exportType === "Service"} onChange={() => setExportType("Service")} className="w-4 h-4 text-amber-500 bg-slate-800 border-slate-700 focus:ring-amber-500 focus:ring-offset-slate-900" />
                    <span className="text-sm font-medium">Filter by Service</span>
                  </label>
                  {exportType === "Service" && (
                    <select value={exportService} onChange={(e) => setExportService(e.target.value)} className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg py-2 px-3 focus:ring-1 focus:ring-amber-500 focus:outline-none ml-7 appearance-none">
                      {SERVICE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="exportType" checked={exportType === "DateRange"} onChange={() => setExportType("DateRange")} className="w-4 h-4 text-amber-500 bg-slate-800 border-slate-700 focus:ring-amber-500 focus:ring-offset-slate-900" />
                    <span className="text-sm font-medium">Filter by Custom Date Range</span>
                  </label>
                  {exportType === "DateRange" && (
                    <div className="ml-7 mt-2 grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Start Date</label>
                        <input type="date" value={exportDateRange.start} onChange={e => setExportDateRange(prev => ({...prev, start: e.target.value}))} className="w-full bg-[#0a0f1d] border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500/50" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">End Date</label>
                        <input type="date" value={exportDateRange.end} onChange={e => setExportDateRange(prev => ({...prev, end: e.target.value}))} className="w-full bg-[#0a0f1d] border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500/50" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button type="button" onClick={() => setIsExportModalOpen(false)} className="px-4 py-2 rounded-lg border border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-sm font-semibold transition-colors">
                  Cancel
                </button>
                <button type="button" onClick={exportToCSV} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-lg transition-colors">
                  Download CSV
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View More Employee Modal */}
        {isViewMoreEmployeeModalOpen && selectedEmployeeForView && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-lg w-full text-slate-200 shadow-2xl">
              <div className="flex justify-between items-start mb-6 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 overflow-hidden">
                    {selectedEmployeeForView.avatarUrl ? (
                      <img src={selectedEmployeeForView.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-lg font-bold text-amber-500">{selectedEmployeeForView.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">{selectedEmployeeForView.name}</h3>
                    <p className="text-sm text-slate-400 font-mono">@{selectedEmployeeForView.username}</p>
                  </div>
                </div>
                <button onClick={() => { setIsViewMoreEmployeeModalOpen(false); setSelectedEmployeeForView(null); }} className="text-slate-500 hover:text-slate-300">✕</button>
              </div>

              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-800">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-sm font-medium">{selectedEmployeeForView.email || "N/A"}</p>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-800">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Role</p>
                    <p className="text-sm font-medium text-purple-400">{selectedEmployeeForView.role}</p>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-800">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Status</p>
                    <p className={`text-sm font-medium ${selectedEmployeeForView.status === "Hold" ? "text-red-400" : "text-green-400"}`}>
                      {selectedEmployeeForView.status || "Active"}
                    </p>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-800">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Created At</p>
                    <p className="text-sm font-medium">{new Date(selectedEmployeeForView.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-6">
                <h4 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-widest">Reset / Change Password</h4>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <input 
                      id={`reset_pass_${selectedEmployeeForView.id}`}
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter new password"
                      className="w-full bg-[#0a0f1d] border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500/50"
                    />
                    <button 
                      type="button" 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                  <button 
                    onClick={async () => {
                      const inputElement = document.getElementById(`reset_pass_${selectedEmployeeForView.id}`) as HTMLInputElement;
                      const newPass = inputElement?.value;
                      if (!newPass) return alert("Please enter a new password");
                      try {
                        const res = await fetch(`/api/employees`, {
                          method: 'PATCH',
                          headers: {'Content-Type': 'application/json'},
                          body: JSON.stringify({ id: selectedEmployeeForView.id, password: newPass })
                        });
                        if (res.ok) {
                          alert("Password updated successfully!");
                          inputElement.value = "";
                        } else alert("Failed to update password");
                      } catch (e) {
                        alert("Error updating password");
                      }
                    }}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-bold transition-colors border border-slate-700 whitespace-nowrap"
                  >
                    Update Key
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
