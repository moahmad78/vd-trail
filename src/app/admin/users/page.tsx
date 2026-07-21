"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Employee {
  id: string;
  name: string;
  email: string | null;
  username: string;
  avatarUrl: string | null;
  role: string;
  createdAt: string;
}

export default function AdminUsersDirectory() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Change Password Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Employee | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/employees");
      const data = await res.json();
      if (res.ok && data.success) {
        setEmployees(data.data);
      } else {
        if (res.status === 401 || res.status === 403) {
          setError("Unauthorized: You do not have permission to view this directory.");
        } else {
          setError(data.error || "Failed to fetch users directory.");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  const openPasswordModal = (user: Employee) => {
    setSelectedUser(user);
    setNewPassword("");
    setShowPassword(false);
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setSelectedUser(null);
    setNewPassword("");
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !newPassword) return;

    setIsUpdatingPassword(true);
    try {
      const res = await fetch("/api/employees", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedUser.id, password: newPassword }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        alert("Password updated successfully!");
        closePasswordModal();
      } else {
        alert(data.error || "Failed to update password");
      }
    } catch (err) {
      alert("Error connecting to server.");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white p-6 font-sans">
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800/60 w-full mb-8">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-light tracking-tight text-white flex items-center gap-3">
                <span className="text-2xl">👥</span>
                Admin <span className="font-serif italic text-amber-500 font-bold">Directory</span>
              </h1>
              <p className="text-slate-400 text-sm mt-1">Centralized management of system accounts</p>
            </div>
          </div>
          <button 
            onClick={fetchEmployees}
            className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 text-slate-300 rounded-lg text-sm border border-slate-700/50 transition-colors flex items-center gap-2"
          >
            <span>🔄</span> Refresh List
          </button>
        </div>

        {/* Content Area */}
        {error ? (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-xl text-center">
            <p className="text-lg font-medium">{error}</p>
            <button onClick={fetchEmployees} className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm transition-colors">Try Again</button>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="bg-[#111827] border border-slate-800/60 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/50 border-b border-slate-800">
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Employee Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">System Username</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Account Role</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Created Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {employees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-200">
                        <div className="flex items-center gap-3">
                          {emp.avatarUrl ? (
                            <img src={emp.avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-amber-500 border border-slate-700">
                              {emp.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          {emp.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">{emp.email || "-"}</td>
                      <td className="px-6 py-4 text-slate-400 text-sm font-mono">{emp.username}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          emp.role === "Admin" || emp.role === "Manager" 
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/20" 
                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }`}>
                          {emp.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">
                        {new Date(emp.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => openPasswordModal(emp)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-500 rounded text-sm font-medium border border-slate-700 transition-colors"
                        >
                          🔑 Change Password
                        </button>
                      </td>
                    </tr>
                  ))}
                  {employees.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                        No user accounts found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {isPasswordModalOpen && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="bg-[#111827] border border-slate-700 shadow-2xl rounded-2xl w-full max-w-md overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
              
              <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white tracking-tight">Overwrite Password</h3>
                <button onClick={closePasswordModal} className="text-slate-500 hover:text-slate-300 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>

              <form onSubmit={handleChangePassword} className="p-6 flex flex-col gap-5">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex flex-col gap-1">
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Target Account</span>
                  <span className="text-slate-200 font-medium">{selectedUser.name} <span className="text-slate-500 font-normal">({selectedUser.username})</span></span>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-slate-400 font-bold ml-1">New Password</label>
                  <div className="relative">
                    <input 
                      required 
                      type={showPassword ? "text" : "password"} 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-[#0f172a] border border-slate-700 text-slate-200 placeholder-slate-600 rounded-xl py-3 px-4 focus:ring-1 focus:ring-amber-500 focus:outline-none w-full pr-12" 
                      placeholder="Enter new secure password" 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 focus:outline-none p-1"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={closePasswordModal} className="px-5 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 text-sm font-semibold transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={isUpdatingPassword || !newPassword} className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:hover:bg-amber-500 text-black text-sm font-bold transition-colors">
                    {isUpdatingPassword ? "Updating..." : "Force Update Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
