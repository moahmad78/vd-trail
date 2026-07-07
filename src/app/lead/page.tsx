"use client";

import React, { useState, useEffect, useMemo } from "react";

interface Lead {
  id: string;
  name: string;
  mobileNumber: string;
  email: string | null;
  projectLocation: string | null;
  requirement: string;
  projectDetails: string | null;
  submissionSource: string;
  promoCode: string | null;
  status: string;
  handledBy: string | null;
  notes: any; // Storing Json array of ConversationNote
  createdAt: string;
}

export interface ConversationNote {
  id: string;
  text: string;
  timestamp: string;
  author: string;
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
  const [filterService, setFilterService] = useState<string>("All");
  const [filterLocation, setFilterLocation] = useState<string>("All");
  const [filterEmployee, setFilterEmployee] = useState<string>("All");
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [loginUsername, setLoginUsername] = useState("Sahil");
  const [pin, setPin] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [selectedLeadForNotes, setSelectedLeadForNotes] = useState<Lead | null>(null);
  const [notesInput, setNotesInput] = useState("");
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingNoteText, setEditingNoteText] = useState("");

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/lead");
      if (res.ok) {
        const result = await res.json();
        setLeads(result.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    fetchLeads();
    const interval = setInterval(() => {
      fetchLeads();
    }, 10000);
    return () => clearInterval(interval);
  }, [currentUser]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) return;
    setIsAuthenticating(true);
    setAuthError("");
    
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUsername, pin }),
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        setCurrentUser(data.user);
      } else {
        setAuthError(data.error || "Invalid PIN");
        setPin("");
      }
    } catch (error) {
      setAuthError("Failed to authenticate. Please try again.");
    } finally {
      setIsAuthenticating(false);
    }
  };

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

  const handleClaimLead = async (id: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, handledBy: currentUser } : l)));
    try {
      const res = await fetch("/api/lead", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, handledBy: currentUser }),
      });
      if (!res.ok) {
        fetchLeads();
      }
    } catch (error) {
      console.error("Failed to claim lead:", error);
      fetchLeads();
    }
  };

  const buildWhatsAppLink = (lead: Lead) => {
    const message = `Hello ${lead.name}, thank you for connecting with voometdesign regarding your ${lead.requirement} requirement. Let us know a convenient time to discuss your project spatial layout plans.`;
    return `https://wa.me/91${lead.mobileNumber}?text=${encodeURIComponent(message)}`;
  };

  const uniqueLocations = useMemo(() => {
    const locs = leads.map(l => l.projectLocation?.trim()).filter(Boolean) as string[];
    return Array.from(new Set(locs)).sort();
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Date Filter
      if (filterDate) {
        const leadDate = new Date(lead.createdAt).toISOString().split("T")[0];
        if (leadDate !== filterDate) return false;
      }
      // Service Filter
      if (filterService !== "All" && lead.requirement !== filterService) {
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
      return true;
    });
  }, [leads, filterDate, filterService, filterLocation, filterEmployee]);

  const exportToCSV = () => {
    const headers = ["Date", "Time", "Client Name", "Mobile Number", "Email", "Project Location", "Service Requirement", "Project Details", "Submission Source", "Promo Code", "Status", "Handled By"];
    const csvRows = [headers.join(",")];
    
    filteredLeads.forEach(lead => {
      const row = [
        new Date(lead.createdAt).toLocaleDateString('en-US'),
        new Date(lead.createdAt).toLocaleTimeString('en-US'),
        `"${lead.name.replace(/"/g, '""')}"`,
        `"${lead.mobileNumber}"`,
        `"${lead.email || ''}"`,
        `"${(lead.projectLocation || '').replace(/"/g, '""')}"`,
        `"${lead.requirement}"`,
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

  const getStatusStyle = (status: string) => {
    if (status === 'Converted / Active Project') return 'border-green-500/40 text-green-400 bg-green-500/10';
    if (status === 'New Lead') return 'border-amber-500/40 text-amber-400 bg-amber-500/10';
    if (status === 'Not Responding' || status === 'Not Reachable') return 'border-red-500/40 text-red-400 bg-red-500/10';
    if (status === 'Callback Next Week' || status === 'Follow Up Next Month') return 'border-blue-500/40 text-blue-400 bg-blue-500/10';
    return 'border-neutral-700 text-neutral-300 bg-neutral-900';
  };

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white px-6 font-sans">
        <div className="w-full max-w-md bg-[#0A0A0A] border border-neutral-800 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
          <div className="mb-10 text-center">
            <span className="text-amber-500 text-[10px] font-mono tracking-[0.3em] uppercase block mb-3">Secure Access</span>
            <h1 className="text-3xl font-light tracking-tight text-white">Lead <span className="font-serif italic text-amber-400">Intelligence</span></h1>
          </div>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-neutral-400 font-mono uppercase tracking-widest pl-1">Team Member</label>
              <select
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 appearance-none pr-8 cursor-pointer transition-colors"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'#737373\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
              >
                <option value="Sahil">Sahil</option>
                <option value="Design Admin">Design Admin</option>
                <option value="Team Member 1">Team Member 1</option>
                <option value="Team Member 2">Team Member 2</option>
                <option value="Team Member 3">Team Member 3</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-neutral-400 font-mono uppercase tracking-widest pl-1">Access PIN</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-center tracking-[0.5em] focus:outline-none focus:border-amber-500/50 transition-colors"
                autoFocus
              />
              {authError && <p className="text-red-400 text-xs text-center mt-1 font-medium">{authError}</p>}
            </div>
            
            <button
              type="submit"
              disabled={isAuthenticating || !pin}
              className="w-full bg-white hover:bg-neutral-200 text-black rounded-xl py-3 text-sm font-bold uppercase tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAuthenticating ? "Verifying..." : "Authenticate"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start pt-10 min-h-screen bg-transparent text-white px-6 pb-20 font-sans">
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-10 border-b border-neutral-800 pb-8 gap-6">
           <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-amber-500 text-[10px] font-mono tracking-[0.3em] uppercase block">
                Voomet Design Studio
              </span>
              <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                <span className="text-[9px] text-neutral-400 font-mono uppercase tracking-widest">Logged in as: <span className="text-white font-semibold">{currentUser}</span></span>
              </div>
              <button
                onClick={() => {
                  setCurrentUser(null);
                  setPin("");
                }}
                className="ml-3 flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                title="Logout"
              >
                Logout
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              </button>
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-2">
              Lead <span className="font-serif italic text-amber-400">Intelligence</span>
            </h1>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xl">
              Centralized architectural and spatial consultation requests mapped directly from global deployment arrays.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-end w-full xl:w-auto overflow-x-auto pb-2 scrollbar-none">
            {/* Filters */}
            <div className="flex items-end gap-3 shrink-0">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest pl-1">Date</label>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50 [color-scheme:dark] h-[42px]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest pl-1">Service</label>
                <select
                  value={filterService}
                  onChange={(e) => setFilterService(e.target.value)}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50 appearance-none pr-8 cursor-pointer h-[42px] min-w-[140px]"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'#737373\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
                >
                  <option value="All">All Services</option>
                  {SERVICE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest pl-1">Location</label>
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50 appearance-none pr-8 cursor-pointer h-[42px] min-w-[140px]"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'#737373\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
                >
                  <option value="All">All Locations</option>
                  {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest pl-1">Employee</label>
                <select
                  value={filterEmployee}
                  onChange={(e) => setFilterEmployee(e.target.value)}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50 appearance-none pr-8 cursor-pointer h-[42px] min-w-[140px]"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'#737373\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
                >
                  <option value="All">All Employees</option>
                  <option value="Sahil">Sahil</option>
                  <option value="Design Admin">Design Admin</option>
                  <option value="Team Member 1">Team Member 1</option>
                  <option value="Team Member 2">Team Member 2</option>
                  <option value="Team Member 3">Team Member 3</option>
                </select>
              </div>
              
              {(filterDate || filterService !== "All" || filterLocation !== "All" || filterEmployee !== "All") && (
                <button 
                  onClick={() => { setFilterDate(""); setFilterService("All"); setFilterLocation("All"); setFilterEmployee("All"); }}
                  className="h-[42px] px-4 rounded-xl border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider shrink-0"
                >
                  Clear
                </button>
              )}
            </div>

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
              
              <div className="bg-neutral-900 border border-neutral-800 px-5 h-[42px] rounded-xl flex items-center gap-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">TOTAL LEADS</span>
                  <span className="text-xl font-bold text-white leading-none">{filteredLeads.length}</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-500">
                  {isLoading && leads.length === 0 ? (
                    <div className="w-3 h-3 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin" />
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isLoading && leads.length === 0 ? (
           <div className="w-full flex flex-col items-center justify-center py-32 bg-neutral-900/30 border border-neutral-800 rounded-3xl border-dashed">
            <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mb-6 text-neutral-500 shadow-inner">
               <div className="w-6 h-6 rounded-full border-2 border-neutral-500/30 border-t-neutral-500 animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Synchronizing Data</h3>
            <p className="text-sm text-neutral-500">Connecting to secure database nodes...</p>
         </div>
        ) : filteredLeads.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-32 bg-neutral-900/30 border border-neutral-800 rounded-3xl border-dashed">
            <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mb-6 text-neutral-500 shadow-inner">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">No leads found</h3>
            <p className="text-sm text-neutral-500">Try adjusting your filters or waiting for new requests.</p>
          </div>
        ) : (
          <div className="w-full bg-[#0A0A0A] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1300px]">
                <thead>
                  <tr className="bg-neutral-900/80 border-b border-neutral-800">
                    <th className="py-5 px-6 text-[10px] font-mono tracking-widest uppercase text-neutral-500 font-semibold w-[140px]">Date & Time</th>
                    <th className="py-5 px-6 text-[10px] font-mono tracking-widest uppercase text-neutral-500 font-semibold w-[160px]">Client Name</th>
                    <th className="py-5 px-6 text-[10px] font-mono tracking-widest uppercase text-neutral-500 font-semibold w-[160px]">Contact Info</th>
                    <th className="py-5 px-6 text-[10px] font-mono tracking-widest uppercase text-neutral-500 font-semibold w-[150px]">Location & Promo</th>
                    <th className="py-5 px-6 text-[10px] font-mono tracking-widest uppercase text-neutral-500 font-semibold w-[180px]">Service & Details</th>
                    <th className="py-5 px-6 text-[10px] font-mono tracking-widest uppercase text-neutral-500 font-semibold w-[200px]">Status Tracker</th>
                    <th className="py-5 px-6 text-[10px] font-mono tracking-widest uppercase text-neutral-500 font-semibold w-[160px]">Handled By</th>
                    <th className="py-5 px-6 text-[10px] font-mono tracking-widest uppercase text-neutral-500 font-semibold text-right w-[140px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/50">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-neutral-900/30 transition-colors group">
                      <td className="py-5 px-6 whitespace-nowrap align-middle">
                        <div className="flex flex-col gap-1 mt-1">
                          <span className="text-sm text-neutral-300 font-medium">{new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span className="text-[11px] text-neutral-600 font-mono">{new Date(lead.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 align-middle">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-serif text-sm border border-amber-500/20 shrink-0 shadow-inner">
                            {lead.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-semibold text-white tracking-wide">{lead.name}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 align-middle">
                        <div className="flex flex-col gap-1.5 mt-1">
                          <span className="text-sm text-neutral-300 font-mono tracking-wider">{lead.mobileNumber}</span>
                          {lead.email && <span className="text-[11px] text-neutral-500 truncate max-w-[150px]" title={lead.email}>{lead.email}</span>}
                        </div>
                      </td>
                      <td className="py-5 px-6 align-middle">
                        <div className="flex flex-col items-start gap-2 mt-1">
                           <span className="text-sm text-neutral-400 capitalize">{lead.projectLocation || "—"}</span>
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
                          <span className="text-xs bg-neutral-800 text-neutral-200 px-3 py-1 rounded-full border border-neutral-700 tracking-wide shadow-sm">
                            {lead.requirement}
                          </span>
                          {lead.projectDetails ? (
                             <p className="text-[12px] text-neutral-400 line-clamp-2 leading-relaxed max-w-[250px]" title={lead.projectDetails}>
                               {lead.projectDetails}
                             </p>
                          ) : (
                             <span className="text-[10px] text-neutral-600 font-mono uppercase tracking-wider">Via {lead.submissionSource}</span>
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
                            <option key={status} value={status} className="bg-neutral-900 text-white">{status}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-5 px-6 align-middle">
                        {lead.handledBy && lead.handledBy !== 'Unassigned' ? (
                          <div className="inline-flex items-center gap-2 bg-neutral-800 border border-neutral-700 px-3 py-1.5 rounded-full">
                            <div className="w-4 h-4 rounded-full bg-neutral-700 flex items-center justify-center text-[8px] font-bold text-white shrink-0">
                              {lead.handledBy.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-xs text-neutral-300 font-medium tracking-wide truncate max-w-[100px]" title={lead.handledBy}>
                              {lead.handledBy}
                            </span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleClaimLead(lead.id)}
                            className="px-2.5 py-1 text-[11px] font-medium rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all"
                          >
                            🙋‍♂️ Claim Lead
                          </button>
                        )}
                      </td>
                      <td className="py-5 px-6 align-middle text-right">
                        <div className="flex items-center justify-end gap-2 mt-1">
                          <button
                            onClick={() => { setSelectedLeadForNotes(lead); setNotesInput(""); setEditingNoteId(null); }}
                            className="w-9 h-9 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all shadow-sm"
                            title="Notes"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                          </button>
                          <a 
                            href={buildWhatsAppLink(lead)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all shadow-sm"
                            title="WhatsApp Client"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                          </a>
                          <a 
                            href={`tel:+91${lead.mobileNumber}`}
                            className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all shadow-sm"
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
        {/* Notes Modal */}
        {selectedLeadForNotes && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-[#0A0A0A] border border-neutral-800 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col max-h-[85vh]">
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
              <div className="p-6 border-b border-neutral-800 flex justify-between items-center shrink-0">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    Conversation Notes
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">For Lead: {selectedLeadForNotes.name}</p>
                </div>
                <button
                  onClick={() => setSelectedLeadForNotes(null)}
                  className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              
              <div className="p-6 flex flex-col gap-6 overflow-y-auto flex-1 bg-neutral-900/10">
                {/* Timeline History */}
                <div className="flex flex-col gap-4 mb-4">
                  <h4 className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest border-b border-neutral-800 pb-2">Conversation History</h4>
                  
                  {(!selectedLeadForNotes.notes || (Array.isArray(selectedLeadForNotes.notes) && selectedLeadForNotes.notes.length === 0)) ? (
                    <p className="text-sm text-neutral-500 italic text-center py-4">No notes logged yet.</p>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {(Array.isArray(selectedLeadForNotes.notes) ? selectedLeadForNotes.notes : []).map((note: ConversationNote) => (
                        <div key={note.id} className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 flex flex-col gap-2">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-white">{note.author}</span>
                              <span className="text-[10px] text-neutral-500 font-mono">{note.timestamp}</span>
                            </div>
                            <button
                              onClick={() => { setEditingNoteId(note.id); setEditingNoteText(note.text); }}
                              className="text-neutral-500 hover:text-amber-500 transition-colors"
                              title="Edit Note"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                            </button>
                          </div>
                          
                          {editingNoteId === note.id ? (
                            <div className="flex flex-col gap-2 mt-1">
                              <textarea
                                value={editingNoteText}
                                onChange={(e) => setEditingNoteText(e.target.value)}
                                className="w-full h-24 bg-neutral-950 border border-amber-500/30 rounded-lg p-2 text-sm text-neutral-200 focus:outline-none focus:border-amber-500/60 resize-none"
                              />
                              <div className="flex justify-end gap-2">
                                <button onClick={() => setEditingNoteId(null)} className="px-3 py-1 text-xs text-neutral-400 hover:text-white">Cancel</button>
                                <button
                                  onClick={async () => {
                                    const updatedNotes = (selectedLeadForNotes.notes as ConversationNote[]).map(n => n.id === note.id ? { ...n, text: editingNoteText } : n);
                                    setLeads(prev => prev.map(l => l.id === selectedLeadForNotes.id ? { ...l, notes: updatedNotes } : l));
                                    setSelectedLeadForNotes({ ...selectedLeadForNotes, notes: updatedNotes });
                                    setEditingNoteId(null);
                                    try {
                                      await fetch("/api/lead", {
                                        method: "PATCH",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ id: selectedLeadForNotes.id, notes: updatedNotes }),
                                      });
                                    } catch(e) { console.error(e); }
                                  }}
                                  className="px-3 py-1 text-xs bg-amber-500/20 text-amber-400 rounded hover:bg-amber-500/30 font-medium"
                                >
                                  Update
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">{note.text}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Add New Note */}
                <div className="flex flex-col gap-2 mt-auto shrink-0">
                  <h4 className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest pl-1">Add New Note</h4>
                  <textarea
                    value={notesInput}
                    onChange={(e) => setNotesInput(e.target.value)}
                    placeholder="Log call details, requirements, or next steps here..."
                    className="w-full h-24 bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-200 focus:outline-none focus:border-amber-500/50 resize-none transition-colors"
                  />
                  <div className="flex justify-end mt-2">
                     <button
                      onClick={async () => {
                        if (!notesInput.trim()) return;
                        setIsSavingNotes(true);
                        
                        const newNote: ConversationNote = {
                          id: Math.random().toString(36).substring(7),
                          text: notesInput.trim(),
                          timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
                          author: currentUser || "Unknown",
                        };

                        const currentNotes = Array.isArray(selectedLeadForNotes.notes) ? selectedLeadForNotes.notes : [];
                        const updatedNotes = [...currentNotes, newNote];
                        
                        setLeads(prev => prev.map(l => l.id === selectedLeadForNotes.id ? { ...l, notes: updatedNotes } : l));
                        setSelectedLeadForNotes({ ...selectedLeadForNotes, notes: updatedNotes });
                        setNotesInput("");

                        try {
                          await fetch("/api/lead", {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ id: selectedLeadForNotes.id, notes: updatedNotes }),
                          });
                        } catch(e) {
                          console.error(e);
                        }
                        setIsSavingNotes(false);
                      }}
                      disabled={isSavingNotes || !notesInput.trim()}
                      className="px-4 py-2 rounded-lg bg-amber-500 text-black hover:bg-amber-400 text-xs font-bold transition-colors disabled:opacity-50"
                    >
                      {isSavingNotes ? "Saving..." : "Save New Note"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
