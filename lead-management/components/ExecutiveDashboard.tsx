"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { Lead, LeadTransfer, Notification as AppNotification, CRM_STATUSES_EXECUTIVE, SERVICE_TYPES, LEAD_SOURCES } from "../types";
import { leadService } from "../services/leadService";
import LeadDetailModal from "./LeadDetailModal";
import ConfirmModal from "./ConfirmModal";
import { toast, ToastContainer } from "./Toast";
import "../styles/lead-management.css";

const getSourceBadgeClass = (source?: string | null) => {
  const s = (source || "").toLowerCase();
  if (s.includes("facebook")) return "bg-blue-950/70 border-blue-800/80 text-blue-400";
  if (s.includes("meta")) return "bg-indigo-950/70 border-indigo-800/80 text-indigo-400";
  if (s.includes("insta")) return "bg-pink-950/70 border-pink-800/80 text-pink-400";
  if (s.includes("whatsapp")) return "bg-emerald-950/70 border-emerald-800/80 text-emerald-400";
  if (s.includes("referral")) return "bg-purple-950/70 border-purple-800/80 text-purple-400";
  if (s.includes("website")) return "bg-slate-800/80 border-slate-700 text-slate-300";
  return "bg-amber-950/70 border-amber-800/80 text-amber-400";
};

export default function ExecutiveDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [transfers, setTransfers] = useState<LeadTransfer[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

  const knownLeadIdsRef = useRef<Set<string>>(new Set());
  const isInitialLoadRef = useRef(true);
  const selectedLeadForDetailsRef = useRef<Lead | null>(null);


  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSource, setFilterSource] = useState("All");
  // Date Range Filter State (Phase 2)
  const [filterDatePreset, setFilterDatePreset] = useState<"all" | "today" | "this_week" | "this_month" | "custom">("all");
  const [filterCustomDate, setFilterCustomDate] = useState<string>("");

  // Clickable Stat Cards Filter State (Phase 1)
  const [activeStatCard, setActiveStatCard] = useState<"total" | "new" | "notresponding" | "notreachable" | "callback" | "followup" | "converted">("total");

  const handleStatCardClick = (card: "total" | "new" | "notresponding" | "notreachable" | "callback" | "followup" | "converted") => {
    if (activeStatCard === card) {
      setActiveStatCard("total");
    } else {
      setActiveStatCard(card);
    }
  };

  // Modals & Drawers
  const [selectedLeadForDetails, setSelectedLeadForDetails] = useState<Lead | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [isPushLoading, setIsPushLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Confirm Modal State
  const [confirmModalConfig, setConfirmModalConfig] = useState<{ title: string; message: string; isDestructive?: boolean } | null>(null);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  const loadData = async (user?: string | null, silent: boolean = false) => {
    if (!silent) setIsLoading(true);
    const empName = user !== undefined ? user : currentUser;
    try {
      const [assignedLeads, poolLeads, fetchedTransfers, fetchedNotifications] = await Promise.all([
        empName ? leadService.fetchLeads({ employee: empName }) : leadService.fetchLeads(),
        leadService.fetchLeads({ unassigned: true }),
        leadService.fetchTransfers(),
        leadService.fetchNotifications(),
      ]);

      // Merge assigned & unassigned pools deduplicated
      const leadMap = new Map<string, Lead>();
      assignedLeads.forEach((l) => leadMap.set(l.id, l));
      poolLeads.forEach((l) => leadMap.set(l.id, l));

      const newLeads = Array.from(leadMap.values());

      // Auto-open logic for new assigned lead
      if (empName) {
        const myTag = `Pinned: ${empName}`;
        const myFetchedAssigned = newLeads.filter((l) => !l.isTrashed && (l.handledBy === myTag || l.handledBy === empName));

        if (isInitialLoadRef.current) {
          myFetchedAssigned.forEach((l) => knownLeadIdsRef.current.add(l.id));
          isInitialLoadRef.current = false;
        } else {
          const newAssignedLead = myFetchedAssigned.find((l) => !knownLeadIdsRef.current.has(l.id));
          if (newAssignedLead) {
            knownLeadIdsRef.current.add(newAssignedLead.id);
            
            if (selectedLeadForDetailsRef.current) {
              // User is busy viewing details/chatting
              toast.info(`New lead received: ${newAssignedLead.name} - Open list to view`);
            } else {
              // Idle, auto-trigger
              setSelectedLeadForDetails(newAssignedLead);
              toast.success(`New lead "${newAssignedLead.name}" opened automatically!`);
            }
          }
        }
      }

      setLeads(newLeads);
      setTransfers(fetchedTransfers);
      setNotifications(fetchedNotifications);
    } catch (err) {
      console.error("Error loading executive dashboard data", err);
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchProfileAndData = async () => {
      let username: string | null = null;
      try {
        const res = await fetch("/api/user/profile");
        if (res.ok) {
          const { data } = await res.json();
          if (data) {
            username = data.name || data.username;
            setCurrentUser(username);
            setCurrentUserRole(data.role || "Team Member");
          }
        }
      } catch (err) {
        console.error("Error fetching profile", err);
      }
      loadData(username);
    };
    fetchProfileAndData();

    // Check existing push subscription
    const checkPushSubscription = async () => {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
          const registration = await navigator.serviceWorker.getRegistration('/sw.js');
          if (registration) {
            const subscription = await registration.pushManager.getSubscription();
            if (subscription) {
              setIsPushEnabled(true);
            }
          }
        } catch (e) {
          console.error("Error checking push subscription", e);
        }
      }
    };
    checkPushSubscription();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sync selectedLeadForDetails state with reference to avoid stale closures
  useEffect(() => {
    selectedLeadForDetailsRef.current = selectedLeadForDetails;
  }, [selectedLeadForDetails]);

  // Dynamic real-time data polling interval (runs silently every 4 seconds)
  useEffect(() => {
    if (!currentUser) return;
    const interval = setInterval(() => {
      loadData(currentUser, true);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentUser]);

  // Filter My Leads vs Unassigned Leads
  const myAssignedLeads = useMemo(() => {
    if (!currentUser) return [];
    const myTag = `Pinned: ${currentUser}`;
    return leads.filter((l) => !l.isTrashed && (l.handledBy === myTag || l.handledBy === currentUser));
  }, [leads, currentUser]);

  const unassignedLeads = useMemo(() => {
    return leads.filter((l) => !l.isTrashed && (!l.handledBy || l.handledBy === "Unassigned"));
  }, [leads]);

  // Pool auto-expand/collapse state
  const [isPoolExpanded, setIsPoolExpanded] = useState(true);
  const prevUnassignedCountRef = useRef(0);

  useEffect(() => {
    // If pool just got a new lead (transitioned from 0 to >0)
    if (prevUnassignedCountRef.current === 0 && unassignedLeads.length > 0) {
      setIsPoolExpanded(true);
    } 
    // If pool just became completely empty
    else if (unassignedLeads.length === 0) {
      setIsPoolExpanded(false);
    }
    
    // Update the ref
    prevUnassignedCountRef.current = unassignedLeads.length;
  }, [unassignedLeads.length]);

  const pendingTransfers = useMemo(() => {
    if (!currentUser) return [];
    return transfers.filter((t) => t.toEmployee === currentUser && t.status === "PENDING");
  }, [transfers, currentUser]);

  // Personal KPI Stats Counts (Phase 1)
  const myTotalCount = myAssignedLeads.length;
  const myNewCount = myAssignedLeads.filter((l) => l.status === "New Lead").length;
  const myNotRespondingCount = myAssignedLeads.filter((l) => l.status === "Not Responding").length;
  const myNotReachableCount = myAssignedLeads.filter((l) => l.status === "Not Reachable").length;
  const myCallbackCount = myAssignedLeads.filter((l) => l.status === "Callback Next Week").length;
  const myFollowUpCount = myAssignedLeads.filter((l) => l.status === "Follow Up Next Month").length;
  const myConvertedCount = myAssignedLeads.filter((l) => l.status === "Converted / Active Project").length;

  const filteredMyLeads = useMemo(() => {
    return myAssignedLeads.filter((l) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!l.name?.toLowerCase().includes(q) && !l.mobileNumber?.includes(q) && !l.requirement?.toLowerCase().includes(q)) {
          return false;
        }
      }
      if (filterSource !== "All" && (l.source || l.submissionSource) !== filterSource) {
        return false;
      }
      if (filterDatePreset !== "all") {
        const leadDate = new Date(l.createdAt);
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        if (filterDatePreset === "today") {
          if (leadDate < startOfToday) return false;
        } else if (filterDatePreset === "this_week") {
          const startOfWeek = new Date(startOfToday);
          startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
          if (leadDate < startOfWeek) return false;
        } else if (filterDatePreset === "this_month") {
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          if (leadDate < startOfMonth) return false;
        } else if (filterDatePreset === "custom" && filterCustomDate) {
          if (leadDate.toISOString().slice(0, 10) !== filterCustomDate) return false;
        }
      }
      if (activeStatCard === "new" && l.status !== "New Lead") return false;
      if (activeStatCard === "notresponding" && l.status !== "Not Responding") return false;
      if (activeStatCard === "notreachable" && l.status !== "Not Reachable") return false;
      if (activeStatCard === "callback" && l.status !== "Callback Next Week") return false;
      if (activeStatCard === "followup" && l.status !== "Follow Up Next Month") return false;
      if (activeStatCard === "converted" && l.status !== "Converted / Active Project") return false;
      
      return true;
    });
  }, [myAssignedLeads, searchQuery, filterSource, filterDatePreset, filterCustomDate, activeStatCard]);

  // Actions
  const handleClaimLead = async (leadId: string) => {
    let empName = currentUser;
    if (!empName) {
      try {
        const res = await fetch("/api/user/profile");
        if (res.ok) {
          const { data } = await res.json();
          if (data) empName = data.name || data.username;
        }
      } catch (e) {}
    }

    if (!empName) {
      toast.error("Session not detected. Please reload or login again.");
      return;
    }

    const originalLeads = [...leads];
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, handledBy: `Pinned: ${empName}` } : l)));

    try {
      await leadService.updateLead(leadId, { handledBy: `Pinned: ${empName}` });
      toast.success("Lead claimed successfully!");
    } catch (err: any) {
      console.error("Error claiming lead", err);
      toast.error(err.message || "Failed to claim lead.");
      setLeads(originalLeads);
    }
  };

  const handleUnclaimLead = async (leadId: string) => {
    setConfirmAction(() => async () => {
      const originalLeads = [...leads];
      setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, handledBy: null } as any : l)));
      setConfirmModalConfig(null);

      try {
        await leadService.updateLead(leadId, { handledBy: null } as any);
        toast.success("Lead released successfully!");
      } catch (err: any) {
        console.error("Error releasing lead", err);
        toast.error(err.message || "Failed to release lead.");
        setLeads(originalLeads);
      }
    });
    setConfirmModalConfig({ title: "Release Lead", message: "Are you sure you want to release this lead back to the pool?", isDestructive: true });
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    const originalLeads = [...leads];
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)));
    try {
      await leadService.updateLead(leadId, { status: newStatus });
      toast.success("Status updated!");
    } catch (err: any) {
      console.error("Error updating status", err);
      toast.error(err.message || "Failed to update status");
      setLeads(originalLeads);
    }
  };

  const handleRespondTransfer = async (transferId: string, status: "ACCEPTED" | "REJECTED") => {
    try {
      await leadService.respondTransfer(transferId, status);
      loadData();
    } catch (err) {
      console.error("Error responding to transfer", err);
    }
  };

  const handleTogglePushNotifications = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      toast.error("Push notifications are not supported in this browser.");
      return;
    }
    
    setIsPushLoading(true);
    
    try {
      const registration = await navigator.serviceWorker.getRegistration('/sw.js');
      if (!registration) {
        toast.error("Service worker not registered.");
        setIsPushLoading(false);
        return;
      }
      
      const existingSubscription = await registration.pushManager.getSubscription();

      if (isPushEnabled || existingSubscription) {
        // --- DISABLE NOTIFICATIONS ---
        if (existingSubscription) {
          const endpoint = existingSubscription.endpoint;
          
          // 1. Unsubscribe from browser PushManager
          await existingSubscription.unsubscribe();
          
          // 2. Delete from Backend Database
          const res = await fetch('/api/user/push-subscription', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ endpoint })
          });
          
          if (res.ok) {
            setIsPushEnabled(false);
            toast.success("Push notifications disabled!");
          } else {
            console.error("Failed to delete subscription on backend");
            toast.error("Partially disabled. Failed to sync with server.");
          }
        } else {
           setIsPushEnabled(false);
        }
      } else {
        // --- ENABLE NOTIFICATIONS ---
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          toast.error("Notification permission denied.");
          setIsPushLoading(false);
          return;
        }
        
        const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
        if (!publicVapidKey) {
          console.error("VAPID public key not found in env");
          setIsPushLoading(false);
          return;
        }
        
        const urlBase64ToUint8Array = (base64String: string) => {
          const padding = '='.repeat((4 - base64String.length % 4) % 4);
          const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
          const rawData = window.atob(base64);
          const outputArray = new Uint8Array(rawData.length);
          for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
          }
          return outputArray;
        };
        
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });
        
        const res = await fetch('/api/user/push-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subscription })
        });
        
        if (res.ok) {
          toast.success("Push notifications enabled successfully!");
          setIsPushEnabled(true);
        } else {
          toast.error("Failed to save subscription.");
        }
      }
    } catch (error: any) {
      console.error("Error toggling notifications:", error);
      toast.error("Error toggling notifications. See console.");
    } finally {
      setIsPushLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans executive-dashboard-root">
      {/* Top Header */}
      <header className="h-16 border-b border-slate-200 bg-white px-6 flex justify-between items-center sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <Image src="/logo/logo.webp" alt="VoometDesign" width={140} height={40} className="h-6 w-auto object-contain mr-2" />
          <h1 className="text-base font-bold tracking-tight text-slate-800 hidden sm:block">Executive Lead Portal</h1>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleTogglePushNotifications}
            disabled={isPushLoading}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 border ${
              isPushEnabled 
                ? "bg-green-50 hover:bg-green-100 text-green-700 border-green-300" 
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
            } disabled:opacity-50`}
          >
            {isPushLoading ? "⏳ Loading..." : isPushEnabled ? "🔕 Disable Push Alerts" : "🔔 Enable Push Alerts"}
          </button>
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-lg bg-slate-100 border border-slate-300 text-slate-600 hover:text-slate-800 hover:bg-slate-200 transition-colors relative"
            >
              🔔
              {notifications.filter((n) => !n.isRead).length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {notifications.filter((n) => !n.isRead).length}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-50">
                <div className="p-3 border-b border-slate-100 bg-slate-50 font-bold text-xs text-slate-700">
                  Notifications
                </div>
                <div className="max-h-72 overflow-y-auto custom-scrollbar p-2 flex flex-col gap-1 text-xs">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-center text-slate-400">No notifications</p>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600">
                        <p className="font-semibold text-slate-800">{n.message}</p>
                        <span className="text-[9px] text-slate-400">{new Date(n.createdAt).toLocaleString()}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
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
            className="px-3 py-1.5 bg-slate-100 hover:bg-red-50 border border-slate-300 hover:border-red-300 text-slate-600 hover:text-red-600 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
            title="Log Out"
          >
            🚪 Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-6 max-w-[1600px] mx-auto w-full flex flex-col gap-6">
        {/* Pending Transfer Requests Banner */}
        {pendingTransfers.length > 0 && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-2">
              📩 Incoming Lead Transfer Requests ({pendingTransfers.length})
            </h3>
            <div className="flex flex-col gap-2">
              {pendingTransfers.map((transfer) => (
                <div
                  key={transfer.id}
                  className="flex items-center justify-between p-3 bg-white border border-amber-200 rounded-xl"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {transfer.lead?.name} ({transfer.lead?.requirement})
                    </p>
                    <p className="text-[10px] text-slate-500">
                      From: {transfer.fromEmployee} • Note: "{transfer.note || "No note"}"
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRespondTransfer(transfer.id, "ACCEPTED")}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRespondTransfer(transfer.id, "REJECTED")}
                      className="px-3 py-1 bg-red-50 border border-red-300 text-red-600 hover:bg-red-100 text-xs font-bold rounded-lg transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Personal KPI Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4">
          <div
            onClick={() => handleStatCardClick("total")}
            className={`p-4 rounded-2xl cursor-pointer transition-all flex items-center justify-between border ${
              activeStatCard === "total"
                ? "bg-blue-50 border-blue-300 shadow-sm ring-1 ring-blue-200"
                : "bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow"
            }`}
          >
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-slate-500">Total Leads</span>
              <span className="text-2xl font-bold text-slate-800">{myTotalCount}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg">👥</div>
          </div>

          <div
            onClick={() => handleStatCardClick("new")}
            className={`p-4 rounded-2xl cursor-pointer transition-all flex items-center justify-between border ${
              activeStatCard === "new"
                ? "bg-cyan-50 border-cyan-300 shadow-sm ring-1 ring-cyan-200"
                : "bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow"
            }`}
          >
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-slate-500">New Lead</span>
              <span className="text-2xl font-bold text-slate-800">{myNewCount}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-lg">🆕</div>
          </div>

          <div
            onClick={() => handleStatCardClick("notresponding")}
            className={`p-4 rounded-2xl cursor-pointer transition-all flex items-center justify-between border ${
              activeStatCard === "notresponding"
                ? "bg-orange-50 border-orange-300 shadow-sm ring-1 ring-orange-200"
                : "bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow"
            }`}
          >
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-slate-500">Not Responding</span>
              <span className="text-2xl font-bold text-slate-800">{myNotRespondingCount}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-lg">⚠️</div>
          </div>

          <div
            onClick={() => handleStatCardClick("notreachable")}
            className={`p-4 rounded-2xl cursor-pointer transition-all flex items-center justify-between border ${
              activeStatCard === "notreachable"
                ? "bg-red-50 border-red-300 shadow-sm ring-1 ring-red-200"
                : "bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow"
            }`}
          >
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-slate-500">Not Reachable</span>
              <span className="text-2xl font-bold text-slate-800">{myNotReachableCount}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-lg">📵</div>
          </div>

          <div
            onClick={() => handleStatCardClick("callback")}
            className={`p-4 rounded-2xl cursor-pointer transition-all flex items-center justify-between border ${
              activeStatCard === "callback"
                ? "bg-purple-50 border-purple-300 shadow-sm ring-1 ring-purple-200"
                : "bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow"
            }`}
          >
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-slate-500">Callback</span>
              <span className="text-2xl font-bold text-slate-800">{myCallbackCount}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-lg">📞</div>
          </div>

          <div
            onClick={() => handleStatCardClick("followup")}
            className={`p-4 rounded-2xl cursor-pointer transition-all flex items-center justify-between border ${
              activeStatCard === "followup"
                ? "bg-yellow-50 border-yellow-300 shadow-sm ring-1 ring-yellow-200"
                : "bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow"
            }`}
          >
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-slate-500">Follow Up</span>
              <span className="text-2xl font-bold text-slate-800">{myFollowUpCount}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-lg">🔁</div>
          </div>

          <div
            onClick={() => handleStatCardClick("converted")}
            className={`p-4 rounded-2xl cursor-pointer transition-all flex items-center justify-between border ${
              activeStatCard === "converted"
                ? "bg-emerald-50 border-emerald-300 shadow-sm ring-1 ring-emerald-200"
                : "bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow"
            }`}
          >
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-slate-500">Converted</span>
              <span className="text-2xl font-bold text-slate-800">{myConvertedCount}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg">✅</div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Column: My Assigned Leads */}
          <div className="flex-1 w-full min-w-0 flex flex-col gap-4 transition-all duration-300">
            <div className="flex justify-between items-center gap-4">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 whitespace-nowrap">
                📋 My Assigned Leads ({filteredMyLeads.length})
              </h2>
              <div className="flex gap-2 text-xs flex-1">
                <input
                  type="text"
                  placeholder="Search and Filter Leads - e.g., Name, Mobile, Requirement..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
                />

                <select
                  value={filterSource}
                  onChange={(e) => setFilterSource(e.target.value)}
                  className="bg-slate-100 border border-slate-300 rounded-xl px-3 py-1.5 text-slate-700 focus:outline-none focus:border-blue-400"
                >
                  <option value="All">All Sources</option>
                  {LEAD_SOURCES.map((src) => (
                    <option key={src} value={src}>{src}</option>
                  ))}
                </select>

                <select
                  value={filterDatePreset}
                  onChange={(e: any) => setFilterDatePreset(e.target.value)}
                  className="bg-slate-100 border border-slate-300 rounded-xl px-3 py-1.5 text-slate-700 focus:outline-none"
                >
                  <option value="all">📅 All Time</option>
                  <option value="today">Today</option>
                  <option value="this_week">This Week</option>
                  <option value="this_month">This Month</option>
                  <option value="custom">Custom Date</option>
                </select>

                {filterDatePreset === "custom" && (
                  <input
                    type="date"
                    value={filterCustomDate}
                    onChange={(e) => setFilterCustomDate(e.target.value)}
                    className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-slate-700 focus:outline-none text-xs"
                  />
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-100 text-slate-500 text-xs uppercase font-bold tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Lead Name</th>
                      <th className="py-3 px-4">Mobile</th>
                      <th className="py-3 px-4">Requirement</th>
                      <th className="py-3 px-4">Source</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isLoading ? (
                      <tr>
                        <td colSpan={6} className="py-10 text-center text-slate-400 animate-pulse">
                          Loading your leads...
                        </td>
                      </tr>
                    ) : filteredMyLeads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-10 text-center text-slate-400">
                          No assigned leads found. Claim unassigned leads from the sidebar.
                        </td>
                      </tr>
                    ) : (
                      filteredMyLeads.map((lead) => {
                        const srcVal = lead.source || lead.submissionSource || "Website";
                        return (
                          <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4">
                              <button
                                onClick={() => setSelectedLeadForDetails(lead)}
                                className="font-bold text-slate-800 hover:text-blue-600 text-left"
                              >
                                {lead.name}
                              </button>
                            </td>
                            <td className="py-3 px-4 font-mono text-slate-500">{lead.mobileNumber}</td>
                            <td className="py-3 px-4 text-slate-600">{lead.requirement}</td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold border bg-slate-100 text-slate-600 border-slate-200">
                                {srcVal}
                              </span>
                            </td>
                          <td className="py-3 px-4">
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                              className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-700 focus:outline-none focus:border-blue-400"
                            >
                              {CRM_STATUSES_EXECUTIVE.map((st) => (
                                <option key={st} value={st}>{st}</option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end items-center gap-2">
                              {/* Quick Action Icons */}
                              <div className="flex items-center gap-1.5 mr-2">
                                <a
                                  href={`tel:${lead.mobileNumber}`}
                                  title="Call Lead"
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 flex items-center justify-center"
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                </a>
                                <a
                                  href={`sms:${lead.mobileNumber}`}
                                  title="Send SMS"
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 flex items-center justify-center"
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                                </a>
                                <a
                                  href={`mailto:${lead.email || ''}`}
                                  title="Send Email"
                                  className={`p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 flex items-center justify-center ${!lead.email ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''}`}
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                </a>
                                <a
                                  href={`https://wa.me/${lead.mobileNumber?.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Open WhatsApp"
                                  className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors border border-emerald-200 flex items-center justify-center"
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                                </a>
                              </div>

                              {lead.status !== "Converted / Active Project" && (
                                <button
                                  onClick={() => handleUnclaimLead(lead.id)}
                                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-red-50 border border-slate-300 hover:border-red-200 text-slate-600 hover:text-red-600 font-bold rounded-lg text-xs transition-colors"
                                >
                                  Release
                                </button>
                              )}
                              <button
                                onClick={() => setSelectedLeadForDetails(lead)}
                                className="px-2.5 py-1.5 bg-[#0f172a] hover:bg-slate-700 text-white font-bold rounded-lg text-xs transition-colors shadow-sm whitespace-nowrap"
                              >
                                Details
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
          </div>

          {/* Right Column: Unassigned Available Leads Pool */}
          <div className={`w-full shrink-0 flex flex-col gap-4 transition-all duration-300 ${isPoolExpanded ? "lg:w-[320px]" : "lg:w-[48px]"}`}>
            <h2 
              onClick={() => setIsPoolExpanded(!isPoolExpanded)}
              className="text-sm font-bold text-slate-800 flex items-center justify-between gap-2 cursor-pointer select-none group border-b border-slate-100 pb-2 lg:border-none lg:pb-0"
              title={isPoolExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              {isPoolExpanded ? (
                <>
                  <div className="flex items-center gap-2">
                    ⚡ Available Leads Pool ({unassignedLeads.length})
                  </div>
                  <div className="text-slate-400 transition-transform duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-4 py-2 w-full">
                  <span className="text-lg" title="Available Leads Pool">⚡</span>
                  <div className="text-slate-400 transition-transform duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                </div>
              )}
            </h2>

            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isPoolExpanded ? "opacity-100 max-h-[800px]" : "opacity-0 max-h-0"}`}>
              <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto custom-scrollbar">
                {unassignedLeads.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-8 bg-white rounded-xl border border-dashed border-slate-300">No unassigned leads in the pool.</p>
              ) : (
                unassignedLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col gap-2 hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-bold text-slate-800">{lead.name}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          {lead.requirement} • {lead.projectLocation || "Location N/A"}
                        </p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-purple-100 text-purple-700 border border-purple-200">
                        {lead.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-[10px]">
                      <span className="text-slate-400">{new Date(lead.createdAt).toLocaleDateString()}</span>
                      <button
                        onClick={() => handleClaimLead(lead.id)}
                        className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold rounded-lg transition-colors text-xs"
                      >
                        Claim Lead
                      </button>
                    </div>
                  </div>
                ))
              )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {selectedLeadForDetails && (
        <LeadDetailModal
          isOpen={!!selectedLeadForDetails}
          onClose={() => setSelectedLeadForDetails(null)}
          leadId={selectedLeadForDetails.id}
          currentUser={currentUser || "Executive"}
          currentUserRole={currentUserRole}
        />
      )}

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
