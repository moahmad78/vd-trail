"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  X,
  Check,
  Loader2,
  User,
  Phone,
  Mail,
  MapPin,
  Building2,
  Clock,
  Send,
  Paperclip,
  FileText,
  Pin,
  Save,
  MessageSquare,
  Calendar,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import {
  Lead,
  Employee,
  Activity,
  Message,
  CRM_STATUSES_ADMIN,
  CRM_STATUSES_EXECUTIVE,
  LEAD_SOURCES,
} from "../types";
import { leadService } from "../services/leadService";
import { toast } from "./Toast";

interface LeadDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadId: string;
  currentUser: string;
  currentUserRole?: string | null;
  employeesList?: Employee[];
  onLeadUpdated?: (updatedLead: Lead) => void;
}

export default function LeadDetailModal({
  isOpen,
  onClose,
  leadId,
  currentUser,
  currentUserRole,
  employeesList = [],
  onLeadUpdated,
}: LeadDetailModalProps) {
  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Chat state
  const [messageText, setMessageText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSavingLead, setIsSavingLead] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isOwner =
    lead?.handledBy === currentUser || lead?.handledBy === `Pinned: ${currentUser}`;
  const isUnassigned =
    !lead?.handledBy || lead?.handledBy === "Unassigned" || lead?.handledBy === "";
  const canEdit = currentUserRole !== "Team Member" || isOwner || isUnassigned;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && leadId) {
      fetchLeadDetails();
    }
  }, [isOpen, leadId]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [lead?.messages]);

  const fetchLeadDetails = async () => {
    setIsLoading(true);
    try {
      const data = await leadService.fetchLeadById(leadId);
      setLead(data);
    } catch (error) {
      console.error("Error fetching lead details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveLead = async () => {
    if (!lead) return;
    setIsSavingLead(true);
    try {
      const updated = await leadService.updateLead(leadId, {
        name: lead.name,
        mobileNumber: lead.mobileNumber,
        email: lead.email,
        projectLocation: lead.projectLocation,
        areaSqft: lead.areaSqft,
        requirement: lead.requirement,
        status: lead.status,
        handledBy: lead.handledBy,
        source: lead.source,
        reminderDateTime: lead.reminderDateTime,
      });
      toast.success("Lead details updated successfully!");
      if (onLeadUpdated && updated) {
        onLeadUpdated(updated);
      }
      fetchLeadDetails();
    } catch (error: any) {
      console.error("Error saving lead:", error);
      toast.error(error.message || "Failed to update lead");
    } finally {
      setIsSavingLead(false);
    }
  };

  const handleSaveMessage = async (msgId: string) => {
    const msg = lead?.messages?.find((m: any) => m.id === msgId);
    if (!msg) return;
    try {
      const res = await fetch(`/api/lead/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messagesToUpdate: [{ id: msg.id, text: msg.text }],
        }),
      });
      if (!res.ok) {
        toast.error("Failed to update message");
      } else {
        toast.success("Message updated!");
      }
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const handleMessageTextChange = (msgId: string, newText: string) => {
    if (!lead) return;
    setLead({
      ...lead,
      messages: lead.messages?.map((m: any) =>
        m.id === msgId ? { ...m, text: newText } : m
      ),
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() && !selectedFile) return;

    setIsSending(true);
    try {
      let attachmentUrl = null;
      let attachmentType = null;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          attachmentUrl = uploadData.url;
          if (selectedFile.type.startsWith("image/")) attachmentType = "image";
          else if (selectedFile.type.startsWith("audio/")) attachmentType = "audio";
          else attachmentType = "document";
        } else {
          toast.error("File upload failed, sending text only.");
        }
      }

      const res = await fetch(`/api/lead/${leadId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: messageText.trim() || null,
          attachmentUrl,
          attachmentType,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to send message");
      }

      setMessageText("");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchLeadDetails();
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error(error.message || "Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const formatActivityType = (activity: any) => {
    const time = new Date(activity.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const date = new Date(activity.createdAt).toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
    const timeStr = `${time}, ${date}`;

    switch (activity.type) {
      case "claimed":
        return `${activity.fromUser} claimed this lead — ${timeStr}`;
      case "assigned":
        return `Admin (${activity.fromUser}) assigned lead to ${activity.toUser} — ${timeStr}`;
      case "transfer_requested":
        return `${activity.fromUser} sent transfer request to ${activity.toUser} — ${timeStr}`;
      case "transfer_accepted":
        return `${activity.fromUser} accepted lead transfer — ${timeStr}`;
      case "transfer_rejected":
        return `${activity.fromUser} rejected lead transfer — ${timeStr}`;
      case "pinned":
        return `${activity.fromUser} pinned lead — ${timeStr}`;
      case "unpinned":
        return `${activity.fromUser} unpinned lead — ${timeStr}`;
      case "status_changed":
        return `${activity.fromUser} changed status — ${timeStr}`;
      default:
        return `Action: ${activity.type} by ${activity.fromUser} — ${timeStr}`;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-6 lg:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-6xl h-[92vh] max-h-[900px] bg-white rounded-3xl shadow-2xl relative flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* ================= MODAL TOP ACTION BAR ================= */}
        <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between gap-4 shrink-0 shadow-2xs z-20">
          {/* Left: Avatar + Title & Badges */}
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#071633] to-[#1e3a5f] text-white flex items-center justify-center font-bold text-lg shadow-sm border border-slate-200/50 shrink-0 select-none">
              {lead?.name?.charAt(0).toUpperCase() || "?"}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-[#071633] tracking-tight truncate">
                  {lead?.name || "Lead Details"}
                </h2>
                {lead?.isPinned && (
                  <span title="Pinned Lead" className="text-amber-500">
                    <Pin className="w-4 h-4 fill-amber-500" />
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                {/* Source Badge */}
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    (lead?.source || lead?.submissionSource || "").toLowerCase().includes("meta")
                      ? "bg-sky-50 text-sky-700 border-sky-200"
                      : (lead?.source || lead?.submissionSource || "").toLowerCase().includes("google")
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-purple-50 text-purple-700 border-purple-200"
                  }`}
                >
                  {lead?.source || lead?.submissionSource || "Website"}
                </span>

                {/* Status Badge */}
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {lead?.status || "New Lead"}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Save Changes + CUT/CLOSE BUTTON */}
          <div className="flex items-center gap-3 shrink-0">
            {canEdit && (
              <button
                type="button"
                onClick={handleSaveLead}
                disabled={isSavingLead}
                className="px-4 py-2 bg-[#071633] hover:bg-[#0b1f48] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 active:scale-95"
              >
                {isSavingLead ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            )}

            {/* CUT / CLOSE BUTTON - Prominent & Fixed */}
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 border border-slate-200 hover:border-red-200 flex items-center justify-center transition-all cursor-pointer shadow-xs shrink-0 group active:scale-90"
              title="Close (Esc)"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* ================= ORGANIZED FORM FIELDS GRID ================= */}
        <div className="px-6 py-4 bg-slate-50/90 border-b border-slate-200 shrink-0 overflow-x-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Field 1: Name */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <User className="w-3 h-3 text-slate-400" />
                <span>Customer Name</span>
              </label>
              <input
                type="text"
                value={lead?.name || ""}
                disabled={!canEdit}
                onChange={(e) => lead && setLead({ ...lead, name: e.target.value })}
                className={`w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#071633] focus:border-transparent outline-none transition-all shadow-xs ${
                  !canEdit ? "opacity-60 cursor-not-allowed bg-slate-100" : ""
                }`}
                placeholder="Full name"
              />
            </div>

            {/* Field 2: Phone */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                <span>Phone Number</span>
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={lead?.mobileNumber || ""}
                  disabled={!canEdit}
                  onChange={(e) => lead && setLead({ ...lead, mobileNumber: e.target.value })}
                  className={`w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#071633] focus:border-transparent outline-none transition-all shadow-xs ${
                    !canEdit ? "opacity-60 cursor-not-allowed bg-slate-100" : ""
                  }`}
                  placeholder="Mobile"
                />
                {lead?.mobileNumber && (
                  <a
                    href={`tel:${lead.mobileNumber}`}
                    className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors shrink-0"
                    title="Call"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Field 3: Email */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                value={lead?.email || ""}
                disabled={!canEdit}
                onChange={(e) => lead && setLead({ ...lead, email: e.target.value })}
                className={`w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-700 focus:ring-2 focus:ring-[#071633] focus:border-transparent outline-none transition-all shadow-xs ${
                  !canEdit ? "opacity-60 cursor-not-allowed bg-slate-100" : ""
                }`}
                placeholder="email@example.com"
              />
            </div>

            {/* Field 4: Location & Area */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>Location &amp; Area</span>
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={lead?.projectLocation || ""}
                  disabled={!canEdit}
                  onChange={(e) => lead && setLead({ ...lead, projectLocation: e.target.value })}
                  className={`w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-700 focus:ring-2 focus:ring-[#071633] focus:border-transparent outline-none transition-all shadow-xs ${
                    !canEdit ? "opacity-60 cursor-not-allowed bg-slate-100" : ""
                  }`}
                  placeholder="City / Area"
                />
                <input
                  type="text"
                  value={lead?.areaSqft || ""}
                  disabled={!canEdit}
                  onChange={(e) => lead && setLead({ ...lead, areaSqft: e.target.value })}
                  className={`w-28 bg-white border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-emerald-700 font-semibold focus:ring-2 focus:ring-[#071633] focus:border-transparent outline-none transition-all shadow-xs shrink-0 ${
                    !canEdit ? "opacity-60 cursor-not-allowed bg-slate-100" : ""
                  }`}
                  placeholder="Sq Ft / Type"
                  title="Area in Sq Ft or Property Type"
                />
              </div>
            </div>

            {/* Field 5: Requirement / Service */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-slate-400" />
                <span>Service / Requirement</span>
              </label>
              <select
                value={lead?.requirement || ""}
                onChange={(e) => lead && setLead({ ...lead, requirement: e.target.value })}
                disabled={!canEdit}
                className={`w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#071633] outline-none shadow-xs transition-all ${
                  !canEdit ? "opacity-60 cursor-not-allowed bg-slate-100" : ""
                }`}
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Educational">Educational</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Aluminium, uPVC & Facades">Aluminium, uPVC & Facades</option>
                <option value="Aluminium Windows & Doors">Aluminium Windows & Doors</option>
                <option value="Wooden Door Systems">Wooden Door Systems</option>
                <option value="Complete Interior Design Quote">Complete Interior Design Quote</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>

            {/* Field 6: CRM Status */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>Lead Status</span>
              </label>
              <select
                value={lead?.status || ""}
                onChange={(e) => lead && setLead({ ...lead, status: e.target.value })}
                disabled={!canEdit}
                className={`w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#071633] outline-none shadow-xs transition-all ${
                  !canEdit ? "opacity-60 cursor-not-allowed bg-slate-100" : ""
                }`}
              >
                {Array.from(new Set([...CRM_STATUSES_ADMIN, ...CRM_STATUSES_EXECUTIVE])).map(
                  (st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Field 7: Assigned Executive */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <User className="w-3 h-3 text-blue-500" />
                <span>Assigned Executive</span>
              </label>
              <select
                value={lead?.handledBy || "Unassigned"}
                onChange={(e) => lead && setLead({ ...lead, handledBy: e.target.value })}
                disabled={!canEdit}
                className={`w-full px-3 py-2 bg-blue-50/80 border border-blue-200 rounded-xl text-xs text-blue-900 font-bold focus:ring-2 focus:ring-[#071633] outline-none shadow-xs transition-all ${
                  !canEdit ? "opacity-60 cursor-not-allowed bg-slate-100" : ""
                }`}
              >
                <option value="Unassigned">Unassigned</option>
                {employeesList && employeesList.length > 0 ? (
                  employeesList.map((emp) => (
                    <option key={emp.id} value={`Pinned: ${emp.name || emp.username}`}>
                      Pinned: {emp.name || emp.username}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Pinned: Sahil">Pinned: Sahil</option>
                    <option value="Pinned: Design Admin">Pinned: Design Admin</option>
                  </>
                )}
              </select>
            </div>

            {/* Field 8: Lead Source */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-purple-500" />
                <span>Lead Source</span>
              </label>
              <select
                value={lead?.source || lead?.submissionSource || "Website"}
                onChange={(e) => lead && setLead({ ...lead, source: e.target.value })}
                disabled={!canEdit}
                className={`w-full px-3 py-2 bg-purple-50/80 border border-purple-200 rounded-xl text-xs text-purple-900 font-bold focus:ring-2 focus:ring-[#071633] outline-none shadow-xs transition-all ${
                  !canEdit ? "opacity-60 cursor-not-allowed bg-slate-100" : ""
                }`}
              >
                {LEAD_SOURCES.map((src) => (
                  <option key={src} value={src}>
                    {src}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Conditional Reminder Bar */}
          {(lead?.status?.includes("Callback") || lead?.status?.includes("Follow Up")) && (
            <div className="mt-3 flex items-center justify-between gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-xs text-amber-900 shadow-2xs">
              <span className="font-bold uppercase tracking-wide flex items-center gap-1.5 text-amber-800">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Set Follow-up / Callback Reminder:</span>
              </span>
              <input
                type="datetime-local"
                value={
                  lead?.reminderDateTime
                    ? new Date(
                        new Date(lead.reminderDateTime).getTime() -
                          new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .slice(0, 16)
                    : ""
                }
                onChange={(e) =>
                  lead &&
                  setLead({
                    ...lead,
                    reminderDateTime: e.target.value
                      ? new Date(e.target.value).toISOString()
                      : null,
                  })
                }
                disabled={!canEdit}
                className={`px-3 py-1.5 bg-white border border-amber-300 rounded-lg text-xs text-amber-900 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  !canEdit ? "opacity-60 cursor-not-allowed" : ""
                }`}
              />
            </div>
          )}
        </div>

        {/* ================= CONTENT AREA: TIMELINE & CHAT ================= */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Column: Activity Timeline */}
          <div className="w-full md:w-[320px] shrink-0 border-r border-slate-200 bg-slate-50/80 p-5 flex flex-col overflow-hidden">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 shrink-0 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Activity Timeline</span>
              </span>
              {lead?.activities?.length ? (
                <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold">
                  {lead.activities.length}
                </span>
              ) : null}
            </h3>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
              {isLoading ? (
                <div className="text-center text-slate-400 text-xs mt-10 flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                  <span>Loading timeline...</span>
                </div>
              ) : !lead?.activities?.length ? (
                <div className="text-center text-slate-400 text-xs mt-10 p-4 border border-dashed border-slate-200 rounded-xl">
                  No activities recorded yet.
                </div>
              ) : (
                <div className="flex flex-col gap-3 relative py-1">
                  <div className="absolute left-[11px] top-3 bottom-3 w-px bg-slate-200" />
                  {lead.activities.map((activity: any) => (
                    <div key={activity.id} className="flex gap-3 group relative z-10">
                      <div className="w-6 h-6 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center shrink-0 group-hover:border-[#071633] transition-colors shadow-2xs">
                        <div className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-[#071633]" />
                      </div>
                      <div className="flex-1 bg-white border border-slate-200 rounded-xl p-3 shadow-2xs">
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                          {formatActivityType(activity)}
                        </p>
                        {activity.note && (
                          <p className="mt-1.5 text-[11px] text-slate-500 italic border-l-2 border-slate-300 pl-2">
                            "{activity.note}"
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Communication Notes & Internal Chat */}
          <div className="flex-1 flex flex-col bg-white relative overflow-hidden">
            {/* Header / Subtitle */}
            <div className="px-5 py-2.5 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 shrink-0">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px]">
                <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                <span>Internal Notes &amp; Activity Log</span>
              </span>
              <span className="text-[11px] text-slate-400">
                Shared only within team
              </span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 custom-scrollbar bg-slate-50/40">
              {isLoading ? (
                <div className="flex items-center justify-center h-full text-slate-400 text-xs gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                  <span>Loading messages...</span>
                </div>
              ) : !lead?.messages?.length ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-1">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-slate-600">No notes or conversation yet.</p>
                  <p className="text-xs text-slate-400">Type a note below to log calling updates, customer requests, or follow-ups.</p>
                </div>
              ) : (
                lead.messages.map((msg: any) => {
                  const isMine = msg.author === currentUser.replace("Pinned: ", "");
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col max-w-[80%] ${
                        isMine ? "self-end items-end" : "self-start items-start"
                      }`}
                    >
                      <div className="mb-1 flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-500 font-bold">
                          {isMine ? "You" : msg.author}
                        </span>
                        <span className="text-[9px] text-slate-400">
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      <div
                        className={`p-3.5 rounded-2xl shadow-xs ${
                          isMine
                            ? "bg-[#071633] text-white rounded-tr-sm"
                            : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm"
                        }`}
                      >
                        {msg.text !== null && (
                          <div className="flex flex-col relative group">
                            <textarea
                              value={msg.text}
                              onChange={(e) => handleMessageTextChange(msg.id, e.target.value)}
                              className={`text-xs leading-relaxed bg-transparent resize-none focus:outline-none min-h-[32px] rounded p-1 ${
                                isMine ? "text-white" : "text-slate-800"
                              }`}
                              rows={msg.text.split("\n").length || 1}
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveMessage(msg.id)}
                              className="absolute -right-8 top-1 w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 text-blue-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-50 shadow-xs"
                              title="Save Changes"
                            >
                              <Save className="w-3 h-3" />
                            </button>
                          </div>
                        )}

                        {msg.attachmentUrl && (
                          <div
                            className={`mt-2 ${
                              msg.text ? "pt-2 border-t border-slate-200/50" : ""
                            }`}
                          >
                            {msg.attachmentType === "image" ? (
                              <a
                                href={msg.attachmentUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="block w-52 h-36 relative rounded-xl overflow-hidden border border-slate-200/60 shadow-xs group"
                              >
                                <Image
                                  src={msg.attachmentUrl}
                                  alt="Attachment"
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform"
                                />
                              </a>
                            ) : msg.attachmentType === "audio" ? (
                              <audio
                                controls
                                src={msg.attachmentUrl}
                                className="h-8 max-w-[220px]"
                              />
                            ) : (
                              <a
                                href={msg.attachmentUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 bg-slate-100/80 p-2 rounded-xl hover:bg-slate-200 transition-colors border border-slate-200 text-slate-700"
                              >
                                <FileText className="w-4 h-4 text-blue-600" />
                                <span className="text-xs font-semibold underline truncate">
                                  View Document
                                </span>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Bottom Form: File attachment + Textarea + Send button */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-slate-200 bg-white shrink-0 flex flex-col gap-2"
            >
              {selectedFile && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xl max-w-fit self-start text-xs text-slate-700">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span className="max-w-[220px] truncate font-medium">
                    {selectedFile.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="text-slate-400 hover:text-red-500 transition-colors p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="flex items-end gap-2">
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  accept="image/*,audio/*,application/pdf"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200 cursor-pointer"
                  title="Attach File"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a note or activity update... (Press Enter to send, Shift+Enter for new line)"
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#071633] focus:border-transparent resize-none h-[44px] custom-scrollbar"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />

                <button
                  type="submit"
                  disabled={isSending || (!messageText.trim() && !selectedFile)}
                  className="p-3 bg-[#071633] hover:bg-[#0b1f48] text-white rounded-xl font-bold transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-95"
                  title="Send Note"
                >
                  {isSending ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
