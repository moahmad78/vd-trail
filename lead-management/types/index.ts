export interface Activity {
  id: string;
  type: string;
  fromUser: string;
  toUser?: string | null;
  note?: string | null;
  createdAt: string;
}

export interface Message {
  id: string;
  author: string;
  text: string | null;
  attachmentUrl?: string | null;
  attachmentType?: 'image' | 'audio' | 'document' | string | null;
  createdAt: string;
}

export interface Lead {
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
  reminderDateTime?: string | null;
  reminderSent?: boolean;
  activities?: Activity[];
  messages?: Message[];
  [key: string]: any;
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
  lead: {
    name: string;
    projectLocation: string | null;
    requirement: string;
  };
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  username?: string;
  status?: string;
  createdAt?: string;
}

export const CRM_STATUSES_ADMIN = [
  "New Lead",
  "In Progress",
  "Follow-Up",
  "Converted / Active Project",
  "Not Reachable",
  "Scam / Fake"
];

export const CRM_STATUSES_EXECUTIVE = [
  "New Lead",
  "Not Responding",
  "Not Reachable",
  "Callback Next Week",
  "Follow Up Next Month",
  "Converted / Active Project"
];

export interface AuditLog {
  id: string;
  adminUsername: string;
  action: string;
  targetType: string;
  targetId?: string | null;
  details?: string | null;
  timestamp: string;
}

export const LEAD_SOURCES = [
  "Website",
  "Facebook",
  "Instagram",
  "WhatsApp",
  "Referral",
  "Other"
];

export const SERVICE_TYPES = [
  "Residential",
  "Commercial",
  "Educational",
  "Hospitality",
  "Aluminium Systems"
];
