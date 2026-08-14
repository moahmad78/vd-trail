"use client";

import React, { useState, useMemo } from "react";
import Head from "next/head";

// --- Types ---
type LeadStatus =
  | "New Lead"
  | "Not Responding"
  | "Not Reachable"
  | "Callback Next Week"
  | "Follow Up Next Month"
  | "Claimed"
  | "Converted";

interface Lead {
  id: string;
  name: string;
  mobile: string;
  requirement: string;
  source: string;
  isGoogleAds?: boolean;
  status: LeadStatus;
  date?: string;
  location?: string;
}

// --- Hardcoded Initial Data ---
const initialAssignedLeads: Lead[] = [
  {
    id: "1",
    name: "Script Admin Test",
    mobile: "8888888888",
    requirement: "Interior Design",
    source: "Website",
    status: "Callback Next Week",
  },
  {
    id: "2",
    name: "Unassigned Browser Test Lead",
    mobile: "8888888888",
    requirement: "Please Claim Me",
    source: "Website",
    status: "Follow Up Next Month",
  },
  {
    id: "3",
    name: "Hasina",
    mobile: "9935836568",
    requirement: "Hospitality",
    source: "Website",
    isGoogleAds: true,
    status: "Callback Next Week",
  },
  {
    id: "4",
    name: "IMTIYAZ AHMAD",
    mobile: "7897303308",
    requirement: "Aluminium, uPVC & Facades",
    source: "Website",
    status: "Callback Next Week",
  },
];

const initialAvailableLeads: Lead[] = [
  {
    id: "101",
    name: "Darshan",
    mobile: "0000000000",
    requirement: "Educational",
    location: "Jammu",
    date: "7/9/2026",
    source: "Website",
    status: "Callback Next Week",
  },
];

const STATUS_OPTIONS: LeadStatus[] = [
  "New Lead",
  "Not Responding",
  "Not Reachable",
  "Callback Next Week",
  "Follow Up Next Month",
  "Claimed",
  "Converted",
];

// --- Icons (SVG) ---
const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
);
const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const AlertIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
);
const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);
const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

export default function MockExecutivePortal() {
  const [assignedLeads, setAssignedLeads] = useState<Lead[]>(initialAssignedLeads);
  const [availableLeads, setAvailableLeads] = useState<Lead[]>(initialAvailableLeads);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalLead, setModalLead] = useState<Lead | null>(null);

  // Actions
  const handleRelease = (leadId: string) => {
    const leadToRelease = assignedLeads.find((l) => l.id === leadId);
    if (!leadToRelease) return;
    setAssignedLeads(assignedLeads.filter((l) => l.id !== leadId));
    setAvailableLeads([{ ...leadToRelease, date: new Date().toLocaleDateString() }, ...availableLeads]);
  };

  const handleClaim = (leadId: string) => {
    const leadToClaim = availableLeads.find((l) => l.id === leadId);
    if (!leadToClaim) return;
    setAvailableLeads(availableLeads.filter((l) => l.id !== leadId));
    setAssignedLeads([...assignedLeads, leadToClaim]);
  };

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    setAssignedLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
  };

  const openDetails = (lead: Lead) => {
    setModalLead(lead);
    setShowModal(true);
  };

  // Filtered Leads
  const filteredAssignedLeads = useMemo(() => {
    if (!searchQuery) return assignedLeads;
    const lowerQ = searchQuery.toLowerCase();
    return assignedLeads.filter(
      (l) =>
        l.name.toLowerCase().includes(lowerQ) ||
        l.mobile.includes(lowerQ) ||
        l.requirement.toLowerCase().includes(lowerQ)
    );
  }, [assignedLeads, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans">
      <Head>
        <title>Executive Lead Portal</title>
      </Head>

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-100 border border-slate-300 rounded flex items-center justify-center font-bold text-slate-700">
            V
          </div>
          <h1 className="text-xl font-semibold text-slate-800">Executive Lead Portal</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <BellIcon /> Disable Push Alerts
          </button>
          <button className="p-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors">
            <BellIcon />
          </button>
          <button className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm font-medium transition-colors">
            Logout
          </button>
        </div>
      </header>

      <main className="p-6 max-w-[1600px] mx-auto">
        {/* Metric Cards */}
        <div className="flex flex-wrap gap-4 mb-8">
          <MetricCard title="Total Leads" count={4} icon={<UsersIcon />} iconColor="text-blue-600" bgColor="bg-blue-100" />
          <MetricCard title="New Lead" count={0} icon={<SearchIcon />} iconColor="text-teal-600" bgColor="bg-teal-100" />
          <MetricCard title="Not Responding" count={0} icon={<AlertIcon />} iconColor="text-orange-600" bgColor="bg-orange-100" />
          <MetricCard title="Not Reachable" count={0} icon={<AlertIcon />} iconColor="text-red-600" bgColor="bg-red-100" />
          <MetricCard title="Callback" count={3} icon={<ClockIcon />} iconColor="text-purple-600" bgColor="bg-purple-100" active={true} />
          <MetricCard title="Follow Up" count={1} icon={<ClockIcon />} iconColor="text-yellow-600" bgColor="bg-yellow-100" />
          <MetricCard title="Converted" count={0} icon={<CheckCircleIcon />} iconColor="text-green-600" bgColor="bg-green-100" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Leads Table */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                📋 My Assigned Leads ({assignedLeads.length})
              </h2>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Search and Filter Leads - e.g., Name, Mobile, Requirement..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-sm w-[350px] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
                <select className="px-4 py-2 border border-slate-300 rounded-lg text-sm bg-slate-100">
                  <option>All Sources</option>
                </select>
                <select className="px-4 py-2 border border-slate-300 rounded-lg text-sm bg-slate-100">
                  <option>All Time</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    <th className="p-4 font-semibold">LEAD NAME</th>
                    <th className="p-4 font-semibold">MOBILE</th>
                    <th className="p-4 font-semibold">REQUIREMENT</th>
                    <th className="p-4 font-semibold">SOURCE</th>
                    <th className="p-4 font-semibold">STATUS</th>
                    <th className="p-4 font-semibold text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAssignedLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-medium text-slate-800">{lead.name}</td>
                      <td className="p-4 text-slate-600">{lead.mobile}</td>
                      <td className="p-4 text-slate-600">{lead.requirement}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md border border-slate-200">
                            {lead.source}
                          </span>
                          {lead.isGoogleAds && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-600 text-[10px] font-bold rounded-md">
                              Google Ads
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                          className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-44"
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleRelease(lead.id)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors border border-slate-300"
                          >
                            Release
                          </button>
                          <button
                            onClick={() => openDetails(lead)}
                            className="px-3 py-1.5 bg-[#0f172a] hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                          >
                            Open Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredAssignedLeads.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500">
                        No assigned leads found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Available Leads Pool */}
          <div className="w-full lg:w-[320px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                ⚡ Available Leads Pool ({availableLeads.length})
              </h2>
              <button className="text-slate-400 hover:text-slate-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
              </button>
            </div>
            
            <div className="flex flex-col gap-3">
              {availableLeads.map((lead) => (
                <div key={lead.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{lead.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {lead.requirement} {lead.location && `• ${lead.location}`}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-[10px] font-bold rounded-md border border-purple-200 whitespace-nowrap">
                      {lead.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-100 pt-3">
                    <span className="text-xs text-slate-400">{lead.date}</span>
                    <button
                      onClick={() => handleClaim(lead.id)}
                      className="px-4 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-bold rounded-lg transition-colors"
                    >
                      Claim Lead
                    </button>
                  </div>
                </div>
              ))}
              {availableLeads.length === 0 && (
                <div className="text-center text-sm text-slate-500 py-8 bg-white rounded-xl border border-dashed border-slate-300">
                  Pool is empty.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mock Details Modal */}
      {showModal && modalLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Lead Details: {modalLead.name}</h2>
            <div className="space-y-3 text-sm text-slate-700">
              <p><strong>Mobile:</strong> {modalLead.mobile}</p>
              <p><strong>Requirement:</strong> {modalLead.requirement}</p>
              <p><strong>Source:</strong> {modalLead.source} {modalLead.isGoogleAds && "(Google Ads)"}</p>
              <p><strong>Status:</strong> {modalLead.status}</p>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-[#0f172a] hover:bg-slate-800 text-white rounded-lg"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Helper Components ---
function MetricCard({ title, count, icon, iconColor, bgColor, active }: any) {
  return (
    <div className={`flex items-center justify-between p-4 bg-white rounded-2xl border ${active ? 'border-purple-300 ring-2 ring-purple-100 bg-purple-50/30' : 'border-slate-200 shadow-sm'} flex-1 min-w-[160px]`}>
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-slate-500 mb-1">{title}</span>
        <span className="text-2xl font-bold text-slate-800">{count}</span>
      </div>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bgColor} ${iconColor}`}>
        {icon}
      </div>
    </div>
  );
}
