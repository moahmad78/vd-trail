import { Lead, Employee, Notification, LeadTransfer } from '../types';

export const leadService = {
  // Leads
  async fetchLeads(params?: { employee?: string; unassigned?: boolean; trashed?: boolean }): Promise<Lead[]> {
    const query = new URLSearchParams();
    if (params?.employee) query.append("employee", params.employee);
    if (params?.unassigned) query.append("unassigned", "true");
    if (params?.trashed) query.append("trashed", "true");

    const queryString = query.toString() ? `?${query.toString()}` : "";
    const res = await fetch(`/api/lead${queryString}`);
    if (!res.ok) throw new Error('Failed to fetch leads');
    const result = await res.json();
    return result.data || [];
  },

  async fetchLeadById(id: string): Promise<Lead> {
    const res = await fetch(`/api/lead/${id}`);
    if (!res.ok) throw new Error('Failed to fetch lead details');
    const result = await res.json();
    return result.data;
  },

  async createLead(leadData: Partial<Lead>): Promise<Lead> {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'create_lead', ...leadData }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create lead');
    }
    const result = await res.json();
    return result.data;
  },

  async updateLead(id: string, updateData: Partial<Lead>): Promise<void> {
    const res = await fetch(`/api/lead/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update lead');
    }
  },

  async deleteLead(id: string): Promise<void> {
    const res = await fetch(`/api/lead/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete lead');
  },

  async deletePermanentLead(id: string): Promise<void> {
    const res = await fetch(`/api/lead/${id}?permanent=true`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to permanently delete lead');
    }
  },

  async bulkUpdateLeads(ids: string[], updateData: Partial<Lead>): Promise<void> {
    await Promise.all(ids.map((id) => this.updateLead(id, updateData)));
  },

  async bulkDeleteLeads(ids: string[]): Promise<void> {
    await Promise.all(ids.map((id) => this.deleteLead(id)));
  },


  // Employees
  async fetchEmployees(): Promise<Employee[]> {
    const res = await fetch('/api/employees');
    if (!res.ok) return [];
    const result = await res.json();
    return result.data || [];
  },

  async createEmployee(employeeData: Partial<Employee>): Promise<Employee> {
    const res = await fetch('/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employeeData),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create employee');
    }
    const result = await res.json();
    return result.data;
  },

  async updateEmployee(id: string, updateData: Partial<Employee & { password?: string }>): Promise<Employee> {
    const res = await fetch(`/api/employees/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to update employee');
    }
    const result = await res.json();
    return result.data;
  },

  async deleteEmployee(id: string): Promise<void> {
    const res = await fetch(`/api/employees/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to delete employee');
    }
  },


  // Notifications
  async fetchNotifications(): Promise<Notification[]> {
    const res = await fetch('/api/notifications');
    if (!res.ok) return [];
    const result = await res.json();
    return result.data || [];
  },

  // Lead Transfer
  async transferLead(leadId: string, toEmployee: string, note?: string): Promise<void> {
    const res = await fetch('/api/lead-transfer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId, toEmployee, note }),
    });
    if (!res.ok) throw new Error('Failed to send transfer request');
  },

  async fetchTransfers(): Promise<LeadTransfer[]> {
    const res = await fetch('/api/lead-transfer');
    if (!res.ok) return [];
    const result = await res.json();
    return result.data || [];
  },

  async respondTransfer(transferId: string, status: 'ACCEPTED' | 'REJECTED'): Promise<void> {
    const res = await fetch('/api/lead-transfer', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transferId, status }),
    });
    if (!res.ok) throw new Error('Failed to update transfer status');
  },

  // Upload file attachment
  async uploadAttachment(file: File): Promise<{ url: string; type: string }> {
    const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
      method: 'POST',
      body: file,
    });
    const uploadResult = await res.json();
    if (!uploadResult.success) throw new Error('Failed to upload file');
    
    let type = 'document';
    if (file.type.startsWith('image/')) type = 'image';
    else if (file.type.startsWith('audio/')) type = 'audio';

    return { url: uploadResult.url, type };
  },

  // Add Chat Message to Lead
  async addMessage(leadId: string, text: string, attachmentUrl?: string | null, attachmentType?: string | null): Promise<void> {
    const res = await fetch(`/api/lead/${leadId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, attachmentUrl, attachmentType }),
    });
    if (!res.ok) throw new Error('Failed to send message');
  },

  // Audit Logs
  async fetchAuditLogs(): Promise<any[]> {
    const res = await fetch('/api/admin/audit-logs');
    if (!res.ok) return [];
    const result = await res.json();
    return result.data || [];
  }
};
