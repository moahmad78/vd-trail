"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Lead, Employee, Activity, Message, CRM_STATUSES_ADMIN, CRM_STATUSES_EXECUTIVE, LEAD_SOURCES } from "../types";
import { leadService } from "../services/leadService";
import { toast } from "./Toast";

interface LeadDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadId: string;
  currentUser: string;
  currentUserRole?: string | null;
  employeesList?: Employee[];
}

export default function LeadDetailModal({
  isOpen,
  onClose,
  leadId,
  currentUser,
  currentUserRole,
  employeesList = []
}: LeadDetailModalProps) {
  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Chat state
  const [messageText, setMessageText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isOwner = lead?.handledBy === currentUser || lead?.handledBy === `Pinned: ${currentUser}`;
  const isUnassigned = !lead?.handledBy || lead?.handledBy === "Unassigned" || lead?.handledBy === "";
  const canEdit = currentUserRole !== "Team Member" || isOwner || isUnassigned;

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

  const [isSavingLead, setIsSavingLead] = useState(false);

  const handleSaveLead = async () => {
    if (!lead) return;
    setIsSavingLead(true);
    try {
      await leadService.updateLead(leadId, {
        name: lead.name,
        mobileNumber: lead.mobileNumber,
        email: lead.email,
        projectLocation: lead.projectLocation,
        requirement: lead.requirement,
        status: lead.status,
        handledBy: lead.handledBy,
        source: lead.source,
        reminderDateTime: lead.reminderDateTime,
      });
      toast.success("Lead updated successfully!");
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
          messagesToUpdate: [{ id: msg.id, text: msg.text }]
        })
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
      messages: lead.messages?.map((m: any) => m.id === msgId ? { ...m, text: newText } : m)
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() && !selectedFile) return;

    setIsSending(true);
    let attachmentUrl = null;
    let attachmentType = null;

    try {
      if (selectedFile) {
        const upload = await leadService.uploadAttachment(selectedFile);
        attachmentUrl = upload.url;
        attachmentType = upload.type;
      }

      await leadService.addMessage(leadId, messageText, attachmentUrl, attachmentType);
      setMessageText("");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchLeadDetails();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const formatActivityType = (activity: any) => {
    const time = new Date(activity.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = new Date(activity.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' });
    const timeStr = `${time}, ${date}`;

    switch (activity.type) {
      case "claimed": return `${activity.fromUser} ne is lead ko claim kiya — ${timeStr}`;
      case "assigned": return `Admin (${activity.fromUser}) ne ye lead ${activity.toUser} ko assign kiya — ${timeStr}`;
      case "transfer_requested": return `${activity.fromUser} ne is lead ko ${activity.toUser} ko transfer request bheji — ${timeStr}`;
      case "transfer_accepted": return `${activity.fromUser} ne transfer accept kiya — ${timeStr}`;
      case "transfer_rejected": return `${activity.fromUser} ne transfer reject kiya — ${timeStr}`;
      case "pinned": return `${activity.fromUser} ne lead pin ki — ${timeStr}`;
      case "unpinned": return `${activity.fromUser} ne lead unpin ki — ${timeStr}`;
      case "status_changed": return `${activity.fromUser} ne status change kiya — ${timeStr}`;
      default: return `Action: ${activity.type} by ${activity.fromUser} — ${timeStr}`;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 md:p-8"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-6xl h-[90vh] bg-white rounded-2xl shadow-2xl relative flex flex-col overflow-hidden border border-slate-200">

        {/* HEADER */}
        <div className="flex justify-between items-start p-5 border-b border-slate-200 bg-slate-50 shrink-0">
          {/* Left: Avatar + Editable Fields */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 mt-1 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-2xl border-2 border-blue-200 shrink-0 select-none">
              {lead?.name?.charAt(0).toUpperCase() || "?"}
            </div>
            <div className="flex flex-col gap-2 min-w-[260px]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={lead?.name || ""}
                  disabled={!canEdit}
                  onChange={(e) => lead && setLead({ ...lead, name: e.target.value })}
                  className={`text-lg font-bold text-slate-800 bg-white border border-slate-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full ${!canEdit ? "opacity-60 cursor-not-allowed" : ""}`}
                />
                {lead?.isPinned && <span title="Pinned Lead" className="text-sm">&#128204;</span>}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={lead?.mobileNumber || ""}
                  disabled={!canEdit}
                  onChange={(e) => lead && setLead({ ...lead, mobileNumber: e.target.value })}
                  className={`bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-sm text-slate-600 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full ${!canEdit ? "opacity-60 cursor-not-allowed" : ""}`}
                  placeholder="Mobile"
                />
                <input
                  type="email"
                  value={lead?.email || ""}
                  disabled={!canEdit}
                  onChange={(e) => lead && setLead({ ...lead, email: e.target.value })}
                  className={`bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-sm text-slate-600 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full ${!canEdit ? "opacity-60 cursor-not-allowed" : ""}`}
                  placeholder="Email"
                />
              </div>
              <input
                type="text"
                value={lead?.projectLocation || ""}
                disabled={!canEdit}
                onChange={(e) => lead && setLead({ ...lead, projectLocation: e.target.value })}
                className={`bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-sm text-slate-600 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full ${!canEdit ? "opacity-60 cursor-not-allowed" : ""}`}
                placeholder="Project Location"
              />
            </div>
          </div>

          {/* Right: Metadata + Close */}
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-end gap-2.5">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Metadata &amp; Assignment</span>
              <div className="flex items-center gap-2 justify-end">
                <select
                  value={lead?.requirement || ""}
                  onChange={(e) => lead && setLead({ ...lead, requirement: e.target.value })}
                  disabled={!canEdit}
                  className={`px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 ${!canEdit ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Educational">Educational</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Aluminium, uPVC &amp; Facades">Aluminium, uPVC &amp; Facades</option>
                </select>
                <select
                  value={lead?.status || ""}
                  onChange={(e) => lead && setLead({ ...lead, status: e.target.value })}
                  disabled={!canEdit}
                  className={`px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 ${!canEdit ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  {Array.from(new Set([...CRM_STATUSES_ADMIN, ...CRM_STATUSES_EXECUTIVE])).map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
                <select
                  value={lead?.handledBy || "Unassigned"}
                  onChange={(e) => lead && setLead({ ...lead, handledBy: e.target.value })}
                  disabled={!canEdit}
                  className={`px-3 py-1.5 bg-blue-50 border border-blue-300 rounded-lg text-xs text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 ${!canEdit ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  <option value="Unassigned">Unassigned</option>
                  {employeesList && employeesList.length > 0 ? employeesList.map(emp => (
                    <option key={emp.id} value={`Pinned: ${emp.name || emp.username}`}>
                      Pinned: {emp.name || emp.username}
                    </option>
                  )) : (
                    <>
                      <option value="Pinned: Sahil">Pinned: Sahil</option>
                      <option value="Pinned: Design Admin">Pinned: Design Admin</option>
                    </>
                  )}
                </select>
                <select
                  value={lead?.source || lead?.submissionSource || "Website"}
                  onChange={(e) => lead && setLead({ ...lead, source: e.target.value })}
                  disabled={!canEdit}
                  className={`px-3 py-1.5 bg-purple-50 border border-purple-300 rounded-lg text-xs text-purple-700 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400 ${!canEdit ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  {LEAD_SOURCES.map(src => (
                    <option key={src} value={src}>{src}</option>
                  ))}
                </select>
                {canEdit && (
                  <button
                    onClick={handleSaveLead}
                    disabled={isSavingLead}
                    className="px-4 py-1.5 bg-[#0f172a] hover:bg-slate-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors disabled:opacity-50 whitespace-nowrap"
                  >
                    {isSavingLead ? "Saving..." : "Save Changes"}
                  </button>
                )}
              </div>

              {/* Set Reminder */}
              {(lead?.status?.includes("Callback") || lead?.status?.includes("Follow Up")) && (
                <div className="flex items-center gap-3 mt-1 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 w-full justify-between">
                  <span className="text-[11px] text-amber-700 font-bold uppercase tracking-wide flex items-center gap-1.5">
                    &#9200; Set Reminder
                  </span>
                  <input
                    type="datetime-local"
                    value={lead?.reminderDateTime
                      ? new Date(new Date(lead.reminderDateTime).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)
                      : ""}
                    onChange={(e) => lead && setLead({ ...lead, reminderDateTime: e.target.value ? new Date(e.target.value).toISOString() : null })}
                    disabled={!canEdit}
                    className={`px-3 py-1.5 bg-white border border-amber-300 rounded-lg text-xs text-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-400 ${!canEdit ? "opacity-60 cursor-not-allowed" : ""}`}
                  />
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors border border-slate-200 hover:border-red-200 shrink-0"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

          {/* Left: Activity Timeline */}
          <div className="w-full md:w-[300px] shrink-0 border-r border-slate-200 bg-slate-50 p-5 flex flex-col overflow-hidden">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5 shrink-0 flex items-center gap-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Activity Timeline
            </h3>
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
              {isLoading ? (
                <div className="text-center text-slate-400 text-sm mt-10 animate-pulse">Loading timeline...</div>
              ) : !lead?.activities?.length ? (
                <div className="text-center text-slate-400 text-sm mt-10">No activities recorded yet.</div>
              ) : (
                <div className="flex flex-col gap-4 relative">
                  <div className="absolute left-[11px] top-2 bottom-2 w-px bg-slate-200" />
                  {lead?.activities?.map((activity: any) => (
                    <div key={activity.id} className="flex gap-3 group">
                      <div className="w-6 h-6 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center shrink-0 z-10 group-hover:border-blue-400 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-blue-500" />
                      </div>
                      <div className="flex-1 bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
                        <p className="text-xs text-slate-700 leading-relaxed">{formatActivityType(activity)}</p>
                        {activity.note && (
                          <p className="mt-1.5 text-xs text-slate-500 italic border-l-2 border-slate-300 pl-2">"{activity.note}"</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Chat / Notes */}
          <div className="flex-1 flex flex-col bg-white relative overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 custom-scrollbar bg-slate-50/60">
              {isLoading ? (
                <div className="flex items-center justify-center h-full text-slate-400 text-sm">Loading messages...</div>
              ) : !lead?.messages?.length ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  <p className="text-sm">No conversation yet. Start typing below.</p>
                </div>
              ) : (
                lead?.messages?.map((msg: any) => {
                  const isMine = msg.author === currentUser.replace("Pinned: ", "");
                  return (
                    <div key={msg.id} className={`flex flex-col max-w-[75%] ${isMine ? "self-end items-end" : "self-start items-start"}`}>
                      <div className="mb-1">
                        {isMine
                          ? <span className="text-[10px] text-slate-400 font-semibold">You</span>
                          : <span className="text-[10px] text-slate-500 font-semibold">{msg.author}</span>}
                      </div>
                      <div className={`p-3 rounded-2xl shadow-sm ${isMine ? "bg-[#0f172a] text-white rounded-tr-sm" : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm"}`}>
                        {msg.text !== null && (
                          <div className="flex flex-col relative group">
                            <textarea
                              value={msg.text}
                              onChange={(e) => handleMessageTextChange(msg.id, e.target.value)}
                              className={`text-sm leading-relaxed bg-transparent resize-none focus:outline-none min-h-[36px] rounded p-1 ${isMine ? "text-white" : "text-slate-800"}`}
                              rows={msg.text.split("\n").length || 1}
                            />
                            <button
                              onClick={() => handleSaveMessage(msg.id)}
                              className="absolute -right-8 top-1 w-6 h-6 rounded bg-slate-100 border border-slate-200 text-blue-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-50 shadow-sm"
                              title="Save Changes"
                            >
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                            </button>
                          </div>
                        )}
                        {msg.attachmentUrl && (
                          <div className={`mt-2 ${msg.text ? "pt-2 border-t border-slate-200" : ""}`}>
                            {msg.attachmentType === "image" ? (
                              <a href={msg.attachmentUrl} target="_blank" rel="noreferrer" className="block w-48 h-32 relative rounded-lg overflow-hidden border border-slate-200">
                                <Image src={msg.attachmentUrl} alt="Attachment" fill className="object-cover hover:scale-105 transition-transform" />
                              </a>
                            ) : msg.attachmentType === "audio" ? (
                              <audio controls src={msg.attachmentUrl} className="h-8 max-w-[200px]" />
                            ) : (
                              <a href={msg.attachmentUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-slate-100 p-2 rounded-lg hover:bg-slate-200 transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                                <span className="text-xs font-medium text-blue-600 underline">View Document</span>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  );
                })
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 bg-white shrink-0 flex flex-col gap-2">
              {selectedFile && (
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg max-w-fit self-start">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                  <span className="text-xs text-slate-600 max-w-[200px] truncate">{selectedFile.name}</span>
                  <button type="button" onClick={() => { setSelectedFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="text-slate-400 hover:text-red-500 transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
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
                  className="p-3 text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200"
                  title="Attach File"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                </button>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message or note... (Enter to send, Shift+Enter for newline)"
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none h-[50px] custom-scrollbar"
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
                  className="p-3 bg-[#0f172a] hover:bg-slate-700 text-white rounded-xl font-bold transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
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
