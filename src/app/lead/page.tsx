"use client";

import React, {  useState, useEffect, useMemo  } from "react";
import Image from "next/image";
import LeadDetailModal from "@/components/LeadDetailModal";

interface Lead {
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
}

export interface Notification {
  id: string;
  type: string;
  message: string;
  isRead: boolean;
  leadId: string | null;
  createdAt: string;
}

export interface LeadTransfer {
  id: string;
  fromEmployee: string;
  toEmployee: string;
  note: string | null;
  status: string;
  createdAt: string;
  lead: { name: string; projectLocation: string | null; requirement: string };
}

const CRM_STATUSES = [
  "New Lead",
  "Not Responding",
  "Not Reachable",
  "Callback Next Week",
  "Follow Up Next Month",
  "Converted / Active Project"
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
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterSource, setFilterSource] = useState<string>("All");
  const [filterService, setFilterService] = useState<string>("All");
  const [filterLocation, setFilterLocation] = useState<string>("All");
  const [filterEmployee, setFilterEmployee] = useState<string>("All");
  const [currentUser, setCurrentUser] = useState<string | null>("Employee");
  const [selectedLeadForDetails, setSelectedLeadForDetails] = useState<Lead | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLeadData, setNewLeadData] = useState({
    name: "",
    mobileNumber: "",
    projectLocation: "",
    requirement: SERVICE_TYPES[0],
    areaSqft: "",
    source: "Other",
    handledBy: "Unassigned",
  });
  const [isCreatingLead, setIsCreatingLead] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [pendingTransfers, setPendingTransfers] = useState<LeadTransfer[]>([]);

  // Transfer Modal
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferLead, setTransferLead] = useState<Lead | null>(null);
  const [transferTarget, setTransferTarget] = useState("");
  const [transferNote, setTransferNote] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);

  const unreadAssignedCount = useMemo(() => {
    if (!currentUser) return 0;
    return (leads || []).filter(l => l.handledBy === "Pinned: " + currentUser && l.status === "New Lead").length;
  }, [leads, currentUser]);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/lead");
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
    } catch (e) {}
  };

  const fetchTransfers = async () => {
    try {
      const res = await fetch("/api/lead-transfer");
      if (res.ok) {
        const result = await res.json();
        setPendingTransfers(result.data || []);
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (!currentUser) return;
    fetchLeads();
    fetchNotifications();
    fetchTransfers();
    const interval = setInterval(() => {
      fetchLeads();
      fetchNotifications();
      fetchTransfers();
    }, 10000);
    return () => clearInterval(interval);
  }, [currentUser]);


  const handleStatusChange = async (id: string, newStatus: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus, handledBy: currentUser } : l)));
    try {
      const res = await fetch("/api/lead", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus, handledBy: currentUser }),
      });
      if (res.status === 403) {
        alert("Ye lead aapko assign nahi hai");
      }
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
        body: JSON.stringify({ id, handledBy: assignedTo }),
      });
      if (res.status === 403) {
        alert("Ye lead aapko assign nahi hai");
      }
      if (!res.ok) {
        fetchLeads();
      }
    } catch (error) {
      console.error("Failed to assign lead:", error);
      fetchLeads();
    }
  };

  const markNotificationRead = async (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    try { await fetch("/api/notifications", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ notificationId: id }) }); } catch (e) { fetchNotifications(); }
  };

  const markAllNotificationsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    try { await fetch("/api/notifications", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ markAllRead: true }) }); } catch (e) { fetchNotifications(); }
  };

  const submitTransfer = async () => {
    if (!transferLead || !transferTarget) return;
    setIsTransferring(true);
    try {
      const res = await fetch("/api/lead-transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: transferLead.id, toEmployee: transferTarget, note: transferNote })
      });
      if (res.ok) {
        setIsTransferModalOpen(false);
        setTransferLead(null);
        setTransferNote("");
        fetchLeads();
      } else {
        const d = await res.json();
        alert("Failed to transfer: " + d.error);
      }
    } catch (e) { alert("Error sending transfer request"); }
    setIsTransferring(false);
  };

  const handleRespondTransfer = async (transferId: string, action: "accept" | "reject") => {
    setPendingTransfers(prev => prev.filter(t => t.id !== transferId));
    try {
      await fetch("/api/lead-transfer", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transferId, action })
      });
      fetchLeads();
      fetchTransfers();
    } catch(e) {}
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

  const buildWhatsAppLink = (lead: Lead) => {
    const message = `Hello ${lead.name}, thank you for connecting with voometdesign regarding your ${(lead.requirement || "")} requirement. Let us know a convenient time to discuss your project spatial layout plans.`;
    return `https://wa.me/91${(lead.mobileNumber || "")}?text=${encodeURIComponent(message)}`;
  };

  const uniqueLocations = useMemo(() => {
    const locs = (leads || []).map(l => l.projectLocation?.trim()).filter(Boolean) as string[];
    return Array.from(new Set(locs)).sort();
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return (leads || []).filter((lead) => {
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
      // Employee Filter
      if (filterEmployee !== "All" && lead.handledBy !== filterEmployee) {
        return false;
      }
      // Source Filter
      if (filterSource !== "All" && (lead.source || "") !== filterSource) {
        return false;
      }
      return true;
    });
  }, [leads, filterDate, filterService, filterLocation, filterEmployee, filterSource]);

  const exportToCSV = () => {
    const headers = ["Date", "Time", "Client Name", "Mobile Number", "Email", "Project Location", "Service Requirement", "Area (sqft)", "Project Details", "Submission Source", "Promo Code", "Status", "Handled By"];
    const csvRows = [headers.join(",")];
    
    (filteredLeads || []).forEach(lead => {
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
    a.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
    <div className="fixed inset-0 z-[100] flex flex-col justify-start pt-10 min-h-screen bg-[#0a0f1d] text-white px-6 pb-20 font-sans overflow-y-auto">
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
            <div className="relative">
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
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></span>
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

            
          </div>
        </div>

        {/* Pending Transfers Section */}
        {pendingTransfers.length > 0 && (
          <div className="mb-6 w-full">
            <h3 className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-3 ml-1">Pending Transfer Requests</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {pendingTransfers.map(transfer => (
                <div key={transfer.id} className="bg-[#1e293b] border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)] rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-semibold text-white">{transfer.lead.name}</span>
                    <span className="text-[10px] text-slate-400">{new Date(transfer.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    <p>From: <strong className="text-amber-400">{transfer.fromEmployee}</strong></p>
                    <p className="mt-1 opacity-80">Service: {transfer.lead.requirement} | Loc: {transfer.lead.projectLocation || "—"}</p>
                  </div>
                  {transfer.note && (
                    <div className="text-xs text-slate-400 bg-black/20 p-2 rounded border border-slate-700/50 mt-1 italic">
                      Note: {transfer.note}
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <button 
                      onClick={() => handleRespondTransfer(transfer.id, "accept")}
                      className="flex-1 bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white border border-green-500/30 rounded py-1.5 text-xs font-bold transition-colors"
                    >
                      Accept
                    </button>
                    <button 
                      onClick={() => handleRespondTransfer(transfer.id, "reject")}
                      className="flex-1 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/30 rounded py-1.5 text-xs font-bold transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clean Filter Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-6 gap-4 mt-6 mb-10 w-full items-end">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-slate-500 font-mono uppercase tracking-widest pl-1">Source</label>
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="bg-[#1e293b] border border-slate-700/50 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 appearance-none pr-8 cursor-pointer h-[42px] w-full"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'#94a3b8\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
            >
              <option value="All">All Sources</option>
              <option value="Website">Website</option>
              <option value="Meta Ads">Meta Ads</option>
              <option value="Google Ads">Google Ads</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-slate-400 font-mono uppercase tracking-widest pl-1">Date</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="bg-[#1e293b] border border-slate-700/50 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 [color-scheme:dark] h-[42px] w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-slate-400 font-mono uppercase tracking-widest pl-1">Service</label>
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="bg-[#1e293b] border border-slate-700/50 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 appearance-none pr-8 cursor-pointer h-[42px] w-full"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'#94a3b8\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
            >
              <option value="All">All Services</option>
              {SERVICE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-slate-400 font-mono uppercase tracking-widest pl-1">Location</label>
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="bg-[#1e293b] border border-slate-700/50 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 appearance-none pr-8 cursor-pointer h-[42px] w-full"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'#94a3b8\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
            >
              <option value="All">All Locations</option>
              {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-slate-400 font-mono uppercase tracking-widest pl-1">Employee</label>
            <select
              value={filterEmployee}
              onChange={(e) => setFilterEmployee(e.target.value)}
              className="bg-[#1e293b] border border-slate-700/50 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 appearance-none pr-8 cursor-pointer h-[42px] w-full"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'#94a3b8\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
            >
              <option value="All">All Employees</option>
              <option value="Sahil">Sahil</option>
              <option value="Design Admin">Design Admin</option>
              <option value="Team Member 1">Team Member 1</option>
              <option value="Team Member 2">Team Member 2</option>
              <option value="Team Member 3">Team Member 3</option>
            </select>
          </div>

          <div className="flex items-center gap-2 xl:col-span-1 md:col-span-5 col-span-2 justify-end w-full">
            {(filterDate || filterService !== "All" || filterLocation !== "All" || filterEmployee !== "All" || filterSource !== "All") && (
              <button 
                onClick={() => { setFilterDate(""); setFilterService("All"); setFilterLocation("All"); setFilterEmployee("All"); setFilterSource("All"); }}
                className="h-[42px] px-4 rounded-xl border border-slate-700/50 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors text-xs font-semibold uppercase tracking-wider shrink-0"
              >
                Clear
              </button>
            )}
            
            {/* Metrics & Export */}
            <div className="flex items-center gap-3 shrink-0 ml-auto">
              <button 
                onClick={exportToCSV}
                className="h-[42px] px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center gap-2 text-sm font-medium transition-colors"
                title="Export Filtered Leads to CSV"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Export CSV
              </button>
              
              <div className="bg-[#1e293b] border border-slate-700/50 px-5 h-[42px] rounded-xl flex items-center gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">TOTAL LEADS</span>
                  <span className="text-xl font-bold text-slate-200 leading-none">{(filteredLeads || []).length}</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-500">
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
                  <tr className="bg-slate-900/50 border-b border-slate-800/60">
                    <th className="py-5 px-6 text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold w-[140px]">Date & Time</th>
                    <th className="py-5 px-6 text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold w-[160px]">Client Name</th>
                    <th className="py-5 px-6 text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold w-[160px]">Contact Info</th>
                    <th className="py-5 px-6 text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold w-[150px]">Location & Promo</th>
                    <th className="py-5 px-6 text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold w-[180px]">Service & Details</th>
                    <th className="py-5 px-6 text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold w-[200px]">Status Tracker</th>
                    <th className="py-5 px-6 text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold w-[160px]">Handled By</th>
                    <th className="py-5 px-6 text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold text-right w-[140px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {(filteredLeads || []).map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                      <td className="py-5 px-6 whitespace-nowrap align-middle">
                        <div className="flex flex-col gap-1 mt-1">
                          <span className="text-sm text-slate-300 font-medium">{new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span className="text-[11px] text-slate-400 font-mono">{new Date(lead.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 align-middle">
                        <div className="flex flex-col gap-2 items-start">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-serif text-sm border border-amber-500/20 shrink-0 shadow-inner">
                              {(lead.name || "").charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm font-semibold text-slate-200 tracking-wide">{lead.name}</span>
                          </div>
                          {getSourceBadge((lead.source || ""))}
                        </div>
                      </td>
                      <td className="py-5 px-6 align-middle">
                        <div className="flex flex-col gap-1.5 mt-1">
                          <span className="text-sm text-slate-300 font-mono tracking-wider">{(lead.mobileNumber || "")}</span>
                          {lead.email && <span className="text-[11px] text-slate-400 truncate max-w-[150px]" title={lead.email}>{lead.email}</span>}
                        </div>
                      </td>
                      <td className="py-5 px-6 align-middle">
                        <div className="flex flex-col items-start gap-2 mt-1">
                           <span className="text-sm text-slate-500 capitalize">{lead.projectLocation || "—"}</span>
                           {lead.promoCode && lead.promoCode !== "None" && (
                            <div className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-md">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-sm"></span>
                              <span className="text-[10px] font-mono font-bold text-green-400 tracking-widest">{lead.promoCode}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-5 px-6 align-middle">
                        <div className="flex flex-col gap-2 items-start mt-0.5">
                          <div className="flex gap-2 items-center flex-wrap">
                            <span className="text-xs bg-neutral-800 text-neutral-200 px-3 py-1 rounded-full border border-neutral-700 tracking-wide shadow-sm">
                              {(lead.requirement || "")}
                            </span>
                            {lead.areaSqft && (
                              <span className="text-[10px] bg-slate-800/60 text-slate-300 px-2 py-1 rounded-full border border-slate-700/50 font-mono">
                                {lead.areaSqft} sqft
                              </span>
                            )}
                          </div>
                          {(lead.projectDetails || "") ? (
                             <span className="text-[11px] text-slate-400 italic mt-1 block tracking-wide font-mono bg-slate-800/40 px-2 py-0.5 rounded">"{lead.projectDetails}"</span>
                          ) : (
                             <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Via {lead.submissionSource}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-5 px-6 align-middle">
                        <select 
                          value={lead.status || "New Lead"}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`mt-1 text-xs font-semibold tracking-wide border rounded-lg px-3 py-2 outline-none appearance-none cursor-pointer pr-8 shadow-sm transition-colors ${getStatusStyle(lead.status)}`}
                          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
                        >
                          {CRM_STATUSES.map(status => (
                            <option key={status} value={status} className="bg-white text-slate-200">{status}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-5 px-6 align-middle">
                        {lead.handledBy && lead.handledBy !== "Unassigned" && lead.handledBy !== "" ? (
                          <div className="rounded px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold inline-block">
                            {lead.handledBy.replace('Pinned: ', '📌 ')}
                          </div>
                        ) : (
                          <select
                            value="Unassigned"
                            onChange={(e) => handleClaimLead(lead.id, e.target.value)}
                            className="rounded-lg px-3 py-2 bg-amber-500/10 text-amber-400 border-amber-500/30 text-xs font-semibold tracking-wide border outline-none appearance-none cursor-pointer pr-7 shadow-sm transition-colors"
                            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 6px center' }}
                          >
                            <option value="Unassigned" className="bg-white text-slate-200">Unassigned</option>
                            <option value={`Pinned: ${currentUser}`} className="bg-white text-slate-200">📌 Claim for me</option>
                          </select>
                        )}
                      </td>
                      <td className="py-5 px-6 align-middle text-right">
                        <div className="flex items-center justify-end gap-2 mt-1">
                          {(lead.handledBy === currentUser || lead.handledBy === `Pinned: ${currentUser}`) && (
                            <button
                              onClick={() => { setTransferLead(lead); setIsTransferModalOpen(true); }}
                              className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center hover:bg-blue-500 hover:text-slate-200 transition-all shadow-sm"
                              title="Transfer Lead"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
                            </button>
                          )}
                          <button
                            onClick={() => setSelectedLeadForDetails(lead)}
                            className="w-9 h-9 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center hover:bg-purple-500 hover:text-slate-200 transition-all shadow-sm"
                            title="View Details & Chat"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                          </button>
                          <a 
                            href={buildWhatsAppLink(lead)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-slate-200 transition-all shadow-sm"
                            title="WhatsApp Client"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                          </a>
                          <a 
                            href={`tel:+91${(lead.mobileNumber || "")}`}
                            className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-slate-200 transition-all shadow-sm"
                            title="Call Client"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
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
                    <input required type="text" value={newLeadData.name} onChange={(e) => setNewLeadData({...newLeadData, name: e.target.value})} className="bg-[#1e293b] border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500" placeholder="e.g. John Doe" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-slate-400 font-mono uppercase tracking-widest pl-1">Mobile Number *</label>
                    <input required type="text" value={newLeadData.mobileNumber} onChange={(e) => setNewLeadData({...newLeadData, mobileNumber: e.target.value})} className="bg-[#1e293b] border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500" placeholder="e.g. 9876543210" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-slate-400 font-mono uppercase tracking-widest pl-1">Location</label>
                    <input type="text" value={newLeadData.projectLocation} onChange={(e) => setNewLeadData({...newLeadData, projectLocation: e.target.value})} className="bg-[#1e293b] border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500" placeholder="e.g. Mumbai" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-slate-400 font-mono uppercase tracking-widest pl-1">Requirement *</label>
                    <select value={newLeadData.requirement} onChange={(e) => setNewLeadData({...newLeadData, requirement: e.target.value})} className="bg-[#1e293b] border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 appearance-none">
                      {SERVICE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-slate-400 font-mono uppercase tracking-widest pl-1">Area (sqft) *</label>
                    <input required type="number" value={newLeadData.areaSqft} onChange={(e) => setNewLeadData({...newLeadData, areaSqft: e.target.value})} className="bg-[#1e293b] border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500" placeholder="e.g. 1500" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-slate-400 font-mono uppercase tracking-widest pl-1">Lead Source</label>
                    <select value={newLeadData.source} onChange={(e) => setNewLeadData({...newLeadData, source: e.target.value})} className="bg-[#1e293b] border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 appearance-none">
                      <option value="Meta Ads">Meta Ads</option>
                      <option value="Google Ads">Google Ads</option>
                      <option value="Reference">Reference</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-slate-400 font-mono uppercase tracking-widest pl-1 text-amber-500">Direct Assignment</label>
                    <select value={newLeadData.handledBy} onChange={(e) => setNewLeadData({...newLeadData, handledBy: e.target.value})} className="bg-white border border-amber-500/30 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500/80 appearance-none">
                      <option value="Unassigned">Leave Unassigned</option>
                      <option value="Sahil">Sahil</option>
                      <option value="Design Admin">Design Admin</option>
                      <option value="Team Member 1">Team Member 1</option>
                      <option value="Team Member 2">Team Member 2</option>
                      <option value="Team Member 3">Team Member 3</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-200">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-200 hover:bg-neutral-800 text-sm font-semibold transition-colors">Cancel</button>
                  <button type="submit" disabled={isCreatingLead} className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-colors shadow-[0_0_15px_rgba(245,158,11,0.2)] disabled:opacity-50">
                    {isCreatingLead ? "Creating..." : "Create Lead"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Transfer Modal */}
        {isTransferModalOpen && transferLead && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm bg-[#1e293b] border border-slate-700/50 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
              <div className="p-6 border-b border-slate-800/60 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-200 tracking-tight">Transfer Lead</h3>
                <button
                  onClick={() => setIsTransferModalOpen(false)}
                  className="text-slate-500 hover:text-slate-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div className="text-sm text-slate-400">Transferring <strong className="text-white">{transferLead.name}</strong> to:</div>
                <select
                  value={transferTarget}
                  onChange={(e) => setTransferTarget(e.target.value)}
                  className="w-full bg-[#111827] border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="" disabled>Select Employee</option>
                  <option value="Sahil">Sahil</option>
                  <option value="Design Admin">Design Admin</option>
                  <option value="Team Member 1">Team Member 1</option>
                  <option value="Team Member 2">Team Member 2</option>
                  <option value="Team Member 3">Team Member 3</option>
                </select>
                <textarea
                  value={transferNote}
                  onChange={(e) => setTransferNote(e.target.value)}
                  placeholder="Reason for transfer (optional)..."
                  className="w-full h-24 bg-[#111827] border border-slate-700/50 rounded-xl p-3 text-sm text-neutral-200 focus:outline-none focus:border-blue-500 resize-none"
                />
                <button
                  onClick={submitTransfer}
                  disabled={!transferTarget || isTransferring}
                  className="w-full bg-blue-500 text-white font-bold uppercase tracking-widest text-xs py-3 rounded-xl hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isTransferring ? "Sending Request..." : "Request Transfer"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
