"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface LeadDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadId: string;
  currentUser: string;
}

export default function LeadDetailModal({ isOpen, onClose, leadId, currentUser }: LeadDetailModalProps) {
  const [lead, setLead] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Chat state
  const [messageText, setMessageText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

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
      const res = await fetch(`/api/lead/${leadId}`);
      if (res.ok) {
        const result = await res.json();
        setLead(result.data);
      }
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
      const res = await fetch(`/api/lead/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lead.name,
          mobileNumber: lead.mobileNumber,
          email: lead.email,
          projectLocation: lead.projectLocation,
          requirement: lead.requirement,
          status: lead.status,
          handledBy: lead.handledBy,
        })
      });
      if (res.ok) {
        alert("Lead updated successfully!");
        fetchLeadDetails();
      } else {
        alert("Failed to update lead");
      }
    } catch (error) {
      console.error("Error saving lead:", error);
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
      if (res.ok) {
        // Optional: show a small success toast, or just do nothing as it's saved.
      } else {
        alert("Failed to update message");
      }
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const handleMessageTextChange = (msgId: string, newText: string) => {
    if (!lead) return;
    setLead({
      ...lead,
      messages: lead.messages.map((m: any) => m.id === msgId ? { ...m, text: newText } : m)
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
        const formData = new FormData();
        // Just send raw file body to the simple Vercel Blob route we made
        const res = await fetch(`/api/upload?filename=${encodeURIComponent(selectedFile.name)}`, {
          method: "POST",
          body: selectedFile,
        });
        const uploadResult = await res.json();
        if (uploadResult.success) {
          attachmentUrl = uploadResult.url;
          if (selectedFile.type.startsWith("image/")) attachmentType = "image";
          else if (selectedFile.type.startsWith("audio/")) attachmentType = "audio";
          else attachmentType = "document";
        } else {
          alert("Failed to upload file");
          setIsSending(false);
          return;
        }
      }

      const res = await fetch(`/api/lead/${leadId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: messageText,
          attachmentUrl,
          attachmentType
        })
      });

      if (res.ok) {
        setMessageText("");
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        fetchLeadDetails(); // Refresh to get new message
      }
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
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 md:p-8">
      <div className="w-full max-w-6xl h-[90vh] bg-[#0f172a] border border-slate-700/60 rounded-2xl shadow-2xl relative flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-800/80 bg-slate-900/50 shrink-0">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 mt-1 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-serif text-2xl border border-amber-500/20 shadow-inner">
              {lead?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col gap-2 w-[300px]">
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={lead?.name || ""} 
                  onChange={(e) => setLead({ ...lead, name: e.target.value })} 
                  className="text-lg font-bold text-white bg-slate-900/60 border border-slate-700/50 rounded px-2 py-1 focus:ring-1 focus:ring-amber-500 focus:outline-none w-full" 
                />
                {lead?.isPinned && <span title="Pinned Lead">📌</span>}
              </div>
              <div className="flex gap-2 text-xs text-slate-400 font-mono">
                <input 
                  type="text" 
                  value={lead?.mobileNumber || ""} 
                  onChange={(e) => setLead({ ...lead, mobileNumber: e.target.value })} 
                  className="bg-slate-900/60 border border-slate-700/50 rounded px-2 py-1 focus:ring-1 focus:ring-amber-500 focus:outline-none w-full" 
                  placeholder="Mobile"
                />
                <input 
                  type="email" 
                  value={lead?.email || ""} 
                  onChange={(e) => setLead({ ...lead, email: e.target.value })} 
                  className="bg-slate-900/60 border border-slate-700/50 rounded px-2 py-1 focus:ring-1 focus:ring-amber-500 focus:outline-none w-full" 
                  placeholder="Email"
                />
              </div>
              <input 
                type="text" 
                value={lead?.projectLocation || ""} 
                onChange={(e) => setLead({ ...lead, projectLocation: e.target.value })} 
                className="text-xs text-slate-400 font-mono bg-slate-900/60 border border-slate-700/50 rounded px-2 py-1 focus:ring-1 focus:ring-amber-500 focus:outline-none w-full" 
                placeholder="Location"
              />
            </div>
          </div>
          
          <div className="flex items-start gap-6">
            <div className="flex flex-col items-end gap-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Metadata & Assignment</span>
              <div className="flex gap-2">
                <select 
                  value={lead?.requirement || ""} 
                  onChange={(e) => setLead({ ...lead, requirement: e.target.value })} 
                  className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300 focus:outline-none"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Educational">Educational</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Aluminium Systems">Aluminium Systems</option>
                </select>
                <select 
                  value={lead?.status || ""} 
                  onChange={(e) => setLead({ ...lead, status: e.target.value })} 
                  className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300 focus:outline-none"
                >
                  <option value="New Lead">New Lead</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Follow-Up">Follow-Up</option>
                  <option value="Converted / Active Project">Converted / Active Project</option>
                  <option value="Not Reachable">Not Reachable</option>
                  <option value="Scam / Fake">Scam / Fake</option>
                </select>
                <select 
                  value={lead?.handledBy || "Unassigned"} 
                  onChange={(e) => setLead({ ...lead, handledBy: e.target.value })} 
                  className="px-2 py-1 bg-blue-900/30 border border-blue-800/50 rounded text-xs text-blue-400 font-semibold focus:outline-none"
                >
                  <option value="Unassigned">Unassigned</option>
                  <option value="Sahil">Sahil</option>
                  <option value="Design Admin">Design Admin</option>
                  <option value="Team Member 1">Team Member 1</option>
                  <option value="Team Member 2">Team Member 2</option>
                  <option value="Team Member 3">Team Member 3</option>
                </select>
              </div>
              <button 
                onClick={handleSaveLead}
                disabled={isSavingLead}
                className="mt-1 px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded shadow-[0_0_10px_rgba(245,158,11,0.2)] transition-colors disabled:opacity-50"
              >
                {isSavingLead ? "Saving..." : "Save Changes"}
              </button>
            </div>
            <button onClick={onClose} className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left: Activity Timeline */}
          <div className="w-full md:w-1/3 border-r border-slate-800/80 bg-slate-900/20 p-6 flex flex-col overflow-hidden">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 shrink-0 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Activity Timeline
            </h3>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 relative">
              {isLoading ? (
                <div className="text-center text-slate-500 text-sm mt-10 animate-pulse">Loading timeline...</div>
              ) : lead?.activities?.length === 0 ? (
                <div className="text-center text-slate-500 text-sm mt-10">No activities recorded yet.</div>
              ) : (
                <div className="absolute left-3 top-2 bottom-2 w-px bg-slate-800"></div>
              )}
              
              <div className="flex flex-col gap-5 relative">
                {lead?.activities?.map((activity: any) => (
                  <div key={activity.id} className="flex gap-4 group">
                    <div className="relative mt-1">
                      <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center z-10 relative group-hover:border-blue-500 group-hover:bg-blue-900/50 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-slate-500 group-hover:bg-blue-400"></div>
                      </div>
                    </div>
                    <div className="flex-1 bg-[#1e293b]/50 border border-slate-800/60 rounded-xl p-3">
                      <p className="text-sm text-slate-300">{formatActivityType(activity)}</p>
                      {activity.note && (
                        <p className="mt-2 text-xs text-slate-500 italic border-l-2 border-slate-700 pl-2">"{activity.note}"</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Chat Section */}
          <div className="flex-1 flex flex-col bg-[#0f172a] relative overflow-hidden">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 custom-scrollbar">
              {isLoading ? (
                <div className="flex items-center justify-center h-full text-slate-500">Loading messages...</div>
              ) : lead?.messages?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4 opacity-50">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  <p>No conversation history yet. Start typing below.</p>
                </div>
              ) : (
                lead?.messages?.map((msg: any) => {
                  const isMine = msg.author === currentUser.replace("Pinned: ", "");
                  return (
                    <div key={msg.id} className={`flex flex-col max-w-[75%] ${isMine ? 'self-end items-end' : 'self-start items-start'}`}>
                      <div className="flex items-end gap-2 mb-1">
                        {!isMine && <span className="text-[10px] text-slate-500 font-bold">{msg.author}</span>}
                        {isMine && <span className="text-[10px] text-slate-500 font-bold">You</span>}
                      </div>
                      <div className={`p-3 rounded-2xl ${isMine ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-[#1e293b] border border-slate-700/50 text-slate-200 rounded-tl-sm'}`}>
                        {msg.text !== null && (
                          <div className="flex flex-col relative group">
                            <textarea 
                              value={msg.text} 
                              onChange={(e) => handleMessageTextChange(msg.id, e.target.value)}
                              className={`text-sm leading-relaxed bg-transparent resize-none focus:outline-none min-h-[40px] ${isMine ? 'text-white' : 'text-slate-200'} focus:ring-1 focus:ring-amber-500/50 rounded p-1`}
                              rows={msg.text.split('\n').length || 1}
                            />
                            <button 
                              onClick={() => handleSaveMessage(msg.id)}
                              className="absolute -right-8 top-1 w-6 h-6 rounded bg-slate-800 border border-slate-700 text-amber-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-700 shadow"
                              title="Save Changes"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                            </button>
                          </div>
                        )}
                        
                        {msg.attachmentUrl && (
                          <div className={`mt-2 ${msg.text ? 'pt-2 border-t border-white/10' : ''}`}>
                            {msg.attachmentType === "image" ? (
                              <a href={msg.attachmentUrl} target="_blank" rel="noreferrer" className="block w-48 h-32 relative rounded overflow-hidden border border-white/20">
                                <Image src={msg.attachmentUrl} alt="Attachment" fill className="object-cover hover:scale-105 transition-transform" />
                              </a>
                            ) : msg.attachmentType === "audio" ? (
                              <audio controls src={msg.attachmentUrl} className="h-8 max-w-[200px]" />
                            ) : (
                              <a href={msg.attachmentUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-black/20 p-2 rounded hover:bg-black/40 transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                                <span className="text-xs font-medium underline">View Document</span>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                      <span className="text-[9px] text-slate-500 mt-1">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  );
                })
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Message Input Form */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-[#1e293b] shrink-0 flex flex-col gap-2">
              {selectedFile && (
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-900/20 border border-blue-500/30 rounded-lg max-w-fit self-start">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                  <span className="text-xs text-slate-300 max-w-[200px] truncate">{selectedFile.name}</span>
                  <button type="button" onClick={() => { setSelectedFile(null); if(fileInputRef.current) fileInputRef.current.value = ""; }} className="text-slate-500 hover:text-red-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
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
                  className="p-3 text-slate-400 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-xl transition-colors border border-slate-700/50"
                  title="Attach File"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                </button>
                
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message or add a note..."
                  className="flex-1 bg-[#0f172a] border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 resize-none h-[50px] custom-scrollbar"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />

                <button
                  type="submit"
                  disabled={isSending || (!messageText.trim() && !selectedFile)}
                  className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:cursor-not-allowed border border-blue-500"
                >
                  {isSending ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
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
