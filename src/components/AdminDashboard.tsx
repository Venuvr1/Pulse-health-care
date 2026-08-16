import React, { useState, useEffect, useMemo, type FormEvent } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Download,
  Printer,
  Plus,
  RefreshCw,
  X,
  Lock,
  Unlock,
  MessageCircle,
  FileText,
  UserCheck,
  Building2,
  Trash2,
  Edit3,
  Shield,
  KeyRound,
  Check
} from 'lucide-react';
import { AppointmentRecord, AppointmentStatus } from '../types';
import {
  getStoredAppointments,
  updateAppointmentStatus,
  updateAppointmentNotes,
  deleteAppointment,
  saveAppointment,
  getAdminPin,
  setAdminPin,
  createWhatsAppMessageUrl,
  exportAppointmentsToCSV
} from '../utils/appointmentStorage';
import { CLINIC_INFO, DOCTORS_DATA, SERVICES_DATA } from '../data/healthcareData';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [doctorFilter, setDoctorFilter] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<string>('All');
  
  // Selected appointment for details or editing notes
  const [activeNotesId, setActiveNotesId] = useState<string | null>(null);
  const [notesInput, setNotesInput] = useState('');

  // Walk-in booking modal state
  const [showWalkinModal, setShowWalkinModal] = useState(false);
  const [walkinData, setWalkinData] = useState({
    fullName: '',
    phone: '',
    email: '',
    preferredDoctor: DOCTORS_DATA[0].name + ' (' + DOCTORS_DATA[0].specialty + ')',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: 'Morning (9:30 AM - 1:00 PM)',
    reason: 'General Consultation',
    message: '',
    source: 'Walk-in' as const,
    staffNotes: ''
  });

  // PIN settings modal
  const [showPinModal, setShowPinModal] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  // Print slip modal
  const [printAppointment, setPrintAppointment] = useState<AppointmentRecord | null>(null);

  // Load appointments from storage
  const loadAppointments = () => {
    setAppointments(getStoredAppointments());
  };

  useEffect(() => {
    loadAppointments();
    const handleUpdate = () => loadAppointments();
    window.addEventListener('pulse_appointment_updated', handleUpdate);
    return () => window.removeEventListener('pulse_appointment_updated', handleUpdate);
  }, []);

  // Handle Login
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPin = getAdminPin();
    if (pinInput === currentPin) {
      setIsAuthenticated(true);
      setPinError('');
      setPinInput('');
    } else {
      setPinError('Invalid PIN code. Default is 1234');
    }
  };

  // Change PIN handler
  const handlePinChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length >= 4) {
      setAdminPin(newPin);
      setPinChangeSuccess(true);
      setTimeout(() => {
        setPinChangeSuccess(false);
        setShowPinModal(false);
        setNewPin('');
      }, 1500);
    }
  };

  // Walk-in submit handler
  const handleWalkinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkinData.fullName.trim() || !walkinData.phone.trim()) return;

    const refCode = 'PHC-' + Math.floor(100000 + Math.random() * 900000);
    saveAppointment({
      ...walkinData,
      refCode,
      status: 'Confirmed'
    });

    setShowWalkinModal(false);
    setWalkinData({
      fullName: '',
      phone: '',
      email: '',
      preferredDoctor: DOCTORS_DATA[0].name + ' (' + DOCTORS_DATA[0].specialty + ')',
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: 'Morning (9:30 AM - 1:00 PM)',
      reason: 'General Consultation',
      message: '',
      source: 'Walk-in',
      staffNotes: ''
    });
  };

  const handleStatusChange = (id: string, newStatus: AppointmentStatus) => {
    updateAppointmentStatus(id, newStatus);
  };

  const handleSaveNotes = (id: string) => {
    updateAppointmentNotes(id, notesInput);
    setActiveNotesId(null);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete appointment for ${name}?`)) {
      deleteAppointment(id);
    }
  };

  // Filtered appointments
  const todayStr = new Date().toISOString().split('T')[0];

  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      // Search
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        apt.fullName.toLowerCase().includes(q) ||
        apt.phone.includes(q) ||
        apt.refCode.toLowerCase().includes(q) ||
        apt.reason.toLowerCase().includes(q);

      // Status
      const matchStatus = statusFilter === 'All' || apt.status === statusFilter;

      // Doctor
      const matchDoctor = doctorFilter === 'All' || apt.preferredDoctor.includes(doctorFilter);

      // Date
      let matchDate = true;
      if (dateFilter === 'Today') {
        matchDate = apt.preferredDate === todayStr;
      } else if (dateFilter === 'Upcoming') {
        matchDate = apt.preferredDate >= todayStr;
      } else if (dateFilter === 'Past') {
        matchDate = apt.preferredDate < todayStr;
      }

      return matchSearch && matchStatus && matchDoctor && matchDate;
    });
  }, [appointments, searchQuery, statusFilter, doctorFilter, dateFilter, todayStr]);

  // Statistics
  const stats = useMemo(() => {
    const total = appointments.length;
    const todayCount = appointments.filter((a) => a.preferredDate === todayStr).length;
    const pending = appointments.filter((a) => a.status === 'Pending').length;
    const confirmed = appointments.filter((a) => a.status === 'Confirmed').length;
    const completed = appointments.filter((a) => a.status === 'Completed').length;
    return { total, todayCount, pending, confirmed, completed };
  }, [appointments, todayStr]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-7xl bg-white/95 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-200/80 bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-white backdrop-blur-md">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-heading tracking-tight">
                  Pulse Reception & Desk Manager
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold uppercase tracking-wider">
                  Live Clinic Portal
                </span>
              </div>
              <p className="text-xs text-slate-300 font-normal">
                Beside STAR MRI, Sundaraiah Bhavan Rd, Ongole • 6300795469
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <>
                <button
                  onClick={() => setShowPinModal(true)}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/20 transition-all cursor-pointer"
                  title="Change PIN"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>PIN Settings</span>
                </button>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/20 transition-all cursor-pointer"
                  title="Lock Dashboard"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Lock</span>
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {!isAuthenticated ? (
            /* PIN Login Screen */
            <div className="max-w-md mx-auto py-12 px-6 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/30 text-[#2563EB] mx-auto flex items-center justify-center shadow-inner">
                <Shield className="w-8 h-8 text-[#2563EB]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1E3A8A] font-heading">
                  Reception Staff Verification
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Enter 4-digit receptionist PIN code to manage bookings and patient records.
                </p>
                <div className="mt-2 inline-block px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-[11px] font-mono text-[#2563EB]">
                  Default Access PIN: <strong>1234</strong>
                </div>
              </div>

              <form onSubmit={handlePinSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    maxLength={6}
                    autoFocus
                    placeholder="Enter Staff PIN"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full text-center tracking-widest text-2xl font-mono py-3.5 px-4 rounded-xl border border-slate-300 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-600/10 transition-all"
                  />
                  {pinError && (
                    <p className="text-xs text-rose-500 font-semibold mt-2 flex items-center justify-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {pinError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-white glass-btn-primary active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Access Reception Portal</span>
                </button>
              </form>
            </div>
          ) : (
            /* Dashboard Portal View */
            <div className="space-y-6">
              {/* Top Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl glass-panel border border-slate-200">
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Today's Schedule</p>
                  <div className="flex items-baseline justify-between mt-1">
                    <p className="text-2xl sm:text-3xl font-black text-[#1E3A8A] font-heading">{stats.todayCount}</p>
                    <span className="text-[11px] font-bold text-[#0D9488] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                      {todayStr}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl glass-panel border border-slate-200">
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Pending Action</p>
                  <div className="flex items-baseline justify-between mt-1">
                    <p className="text-2xl sm:text-3xl font-black text-amber-600 font-heading">{stats.pending}</p>
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      Requires Call
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl glass-panel border border-slate-200">
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Confirmed</p>
                  <div className="flex items-baseline justify-between mt-1">
                    <p className="text-2xl sm:text-3xl font-black text-[#2563EB] font-heading">{stats.confirmed}</p>
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                      Active Tokens
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl glass-panel border border-slate-200">
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Total Bookings</p>
                  <div className="flex items-baseline justify-between mt-1">
                    <p className="text-2xl sm:text-3xl font-black text-slate-800 font-heading">{stats.total}</p>
                    <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                      Lifetime
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200">
                {/* Search Field */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by patient name, mobile, ref code or symptom..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#2563EB]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filters and Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Status filter */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  {/* Doctor filter */}
                  <select
                    value={doctorFilter}
                    onChange={(e) => setDoctorFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
                  >
                    <option value="All">All Doctors</option>
                    <option value="Mani">Dr. Mani Kishore</option>
                    <option value="Neeharika">Dr. Kokkula Neeharika</option>
                  </select>

                  {/* Date filter */}
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
                  >
                    <option value="All">All Dates</option>
                    <option value="Today">Today Only</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Past">Past</option>
                  </select>

                  {/* Walk-in Add Button */}
                  <button
                    onClick={() => setShowWalkinModal(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ New Booking</span>
                  </button>

                  {/* Export CSV */}
                  <button
                    onClick={() => exportAppointmentsToCSV(filteredAppointments)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-all cursor-pointer"
                    title="Export to Excel / CSV"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-600" />
                    <span className="hidden sm:inline">CSV</span>
                  </button>

                  {/* Refresh */}
                  <button
                    onClick={loadAppointments}
                    className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs transition-all cursor-pointer"
                    title="Refresh List"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
                  </button>
                </div>
              </div>

              {/* Appointments List / Table */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs bg-white">
                {filteredAppointments.length === 0 ? (
                  <div className="py-16 text-center text-slate-400 space-y-2">
                    <Calendar className="w-12 h-12 mx-auto text-slate-300" />
                    <p className="text-sm font-semibold text-slate-600">No appointments found matching your filters</p>
                    <p className="text-xs text-slate-400">Try changing your search terms or date filter.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {filteredAppointments.map((apt) => {
                      const isPending = apt.status === 'Pending';
                      const isConfirmed = apt.status === 'Confirmed';
                      const isCompleted = apt.status === 'Completed';
                      const isCancelled = apt.status === 'Cancelled';

                      return (
                        <div
                          key={apt.id}
                          className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                        >
                          {/* Patient Info */}
                          <div className="flex-1 space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#1E3A8A] font-mono text-xs font-bold border border-blue-200">
                                {apt.refCode}
                              </span>
                              <h4 className="text-base font-bold text-[#1E3A8A] font-heading">
                                {apt.fullName}
                              </h4>
                              <span className="text-xs text-slate-500 font-mono flex items-center gap-1 font-semibold">
                                <Phone className="w-3 h-3 text-[#2563EB]" />
                                {apt.phone}
                              </span>
                              <span
                                className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                                  isConfirmed
                                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                    : isCompleted
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                    : isCancelled
                                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                    : 'bg-amber-100 text-amber-800 border border-amber-200 animate-pulse'
                                }`}
                              >
                                {apt.status}
                              </span>
                              <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                                {apt.source}
                              </span>
                            </div>

                            {/* Doctor & Date */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-slate-600">
                              <div className="flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5 text-[#2563EB]" />
                                <span className="font-semibold text-slate-800">{apt.preferredDoctor}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-[#0D9488]" />
                                <span className="font-medium">{apt.preferredDate} ({apt.preferredTime})</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5 text-slate-400" />
                                <span className="text-slate-700 italic">"{apt.reason}"</span>
                              </div>
                            </div>

                            {/* Patient Message / Staff Notes */}
                            {apt.message && (
                              <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                                <strong className="text-slate-700">Patient Note:</strong> {apt.message}
                              </p>
                            )}

                            {/* Staff Notes Editor */}
                            {activeNotesId === apt.id ? (
                              <div className="flex items-center gap-2 mt-2">
                                <input
                                  type="text"
                                  placeholder="Add internal token / clinical note..."
                                  value={notesInput}
                                  onChange={(e) => setNotesInput(e.target.value)}
                                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                                  autoFocus
                                />
                                <button
                                  onClick={() => handleSaveNotes(apt.id)}
                                  className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white text-xs font-bold cursor-pointer"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setActiveNotesId(null)}
                                  className="px-2 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-xs cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              apt.staffNotes && (
                                <div className="text-xs text-[#1E3A8A] bg-blue-50/80 p-2 rounded-lg border border-blue-200 flex items-center justify-between">
                                  <span>
                                    <strong>Reception Note:</strong> {apt.staffNotes}
                                  </span>
                                  <button
                                    onClick={() => {
                                      setActiveNotesId(apt.id);
                                      setNotesInput(apt.staffNotes || '');
                                    }}
                                    className="text-[#2563EB] hover:underline text-[11px] font-semibold flex items-center gap-1 cursor-pointer ml-2"
                                  >
                                    <Edit3 className="w-3 h-3" /> Edit
                                  </button>
                                </div>
                              )
                            )}
                          </div>

                          {/* Quick Action Buttons for Receptionist */}
                          <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                            {/* Call Patient Direct */}
                            <a
                              href={`tel:${apt.phone}`}
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-all"
                              title="Call Patient Mobile"
                            >
                              <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
                              <span>Call</span>
                            </a>

                            {/* Send WhatsApp Confirmation */}
                            <a
                              href={createWhatsAppMessageUrl(apt.phone, apt)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all"
                              title="Send WhatsApp Confirmation Slip to Patient"
                            >
                              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                              <span>WhatsApp</span>
                            </a>

                            {/* Print Token Slip */}
                            <button
                              onClick={() => setPrintAppointment(apt)}
                              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold cursor-pointer"
                              title="Print Consultation Slip"
                            >
                              <Printer className="w-3.5 h-3.5 text-slate-600" />
                            </button>

                            {/* Status Changer Menu */}
                            <select
                              value={apt.status}
                              onChange={(e) => handleStatusChange(apt.id, e.target.value as AppointmentStatus)}
                              className={`px-3 py-2 rounded-xl text-xs font-bold cursor-pointer border ${
                                isConfirmed
                                  ? 'bg-blue-50 text-blue-900 border-blue-300'
                                  : isCompleted
                                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                                  : isCancelled
                                  ? 'bg-rose-50 text-rose-900 border-rose-300'
                                  : 'bg-amber-50 text-amber-900 border-amber-300'
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>

                            {/* Add/Edit Note Button if empty */}
                            {!apt.staffNotes && activeNotesId !== apt.id && (
                              <button
                                onClick={() => {
                                  setActiveNotesId(apt.id);
                                  setNotesInput('');
                                }}
                                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 text-xs cursor-pointer"
                                title="Add Reception Token / Note"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {/* Delete Record */}
                            <button
                              onClick={() => handleDelete(apt.id, apt.fullName)}
                              className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 text-xs transition-colors cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="p-3.5 px-6 border-t border-slate-200/80 bg-slate-50 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Pulse Health Centre Official Desk • Real-time Sync Active</span>
          </div>
          <div>
            <span>Default Staff PIN: <strong>1234</strong></span>
          </div>
        </div>
      </div>

      {/* Walk-in Booking Modal */}
      {showWalkinModal && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-[#1E3A8A] font-heading">
                Add Walk-in / Phone Consultation
              </h3>
              <button onClick={() => setShowWalkinModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleWalkinSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Patient Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Reddy"
                  value={walkinData.fullName}
                  onChange={(e) => setWalkinData({ ...walkinData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    value={walkinData.phone}
                    onChange={(e) => setWalkinData({ ...walkinData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Source</label>
                  <select
                    value={walkinData.source}
                    onChange={(e) => setWalkinData({ ...walkinData, source: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                  >
                    <option value="Walk-in">Walk-in at Clinic</option>
                    <option value="Phone Call">Phone Call Booking</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Doctor Specialty</label>
                <select
                  value={walkinData.preferredDoctor}
                  onChange={(e) => setWalkinData({ ...walkinData, preferredDoctor: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                >
                  {DOCTORS_DATA.map((d) => (
                    <option key={d.id} value={`${d.name} (${d.specialty})`}>
                      {d.name} — {d.specialty}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={walkinData.preferredDate}
                    onChange={(e) => setWalkinData({ ...walkinData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Time Slot</label>
                  <select
                    value={walkinData.preferredTime}
                    onChange={(e) => setWalkinData({ ...walkinData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                  >
                    <option value="Morning (9:30 AM - 1:00 PM)">Morning (9:30 AM - 1:00 PM)</option>
                    <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                    <option value="Evening (6:00 PM - 9:00 PM)">Evening (6:00 PM - 9:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Chief Complaint / Reason</label>
                <input
                  type="text"
                  placeholder="e.g. Fever, Blood Test, General Checkup"
                  value={walkinData.reason}
                  onChange={(e) => setWalkinData({ ...walkinData, reason: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Reception / Token Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Token #5 issued, Fee collected"
                  value={walkinData.staffNotes}
                  onChange={(e) => setWalkinData({ ...walkinData, staffNotes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowWalkinModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Save & Issue Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-200 text-center">
            <KeyRound className="w-10 h-10 text-[#2563EB] mx-auto" />
            <h3 className="text-lg font-bold text-[#1E3A8A] font-heading">
              Update Reception PIN
            </h3>
            <p className="text-xs text-slate-500">
              Enter a new 4 to 6 digit numerical PIN code for reception dashboard access.
            </p>

            <form onSubmit={handlePinChange} className="space-y-4">
              <input
                type="password"
                maxLength={6}
                placeholder="Enter New PIN"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                className="w-full text-center tracking-widest text-2xl font-mono py-2.5 px-4 rounded-xl border border-slate-300"
                required
              />

              {pinChangeSuccess ? (
                <p className="text-xs text-emerald-600 font-bold flex items-center justify-center gap-1">
                  <Check className="w-4 h-4" /> PIN Updated Successfully!
                </p>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPinModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold"
                  >
                    Save New PIN
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Printable Consultation Slip Modal */}
      {printAppointment && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-200 print:p-0">
            <div className="text-center border-b border-slate-200 pb-4">
              <h3 className="text-xl font-bold text-[#1E3A8A] font-heading uppercase tracking-wide">
                PULSE HEALTH CENTRE
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Beside STAR MRI, Sundaraiah Bhavan Road, Ongole - 523001
              </p>
              <p className="text-xs text-[#2563EB] font-mono font-bold mt-0.5">
                Helpline: 6300795469 / 9705959319
              </p>
              <div className="mt-3 inline-block px-3 py-1 bg-blue-50 border border-blue-200 rounded-lg text-xs font-mono font-bold text-[#1E3A8A]">
                OP TOKEN REF: {printAppointment.refCode}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Patient Name:</span>
                <strong className="text-slate-800 text-sm">{printAppointment.fullName}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Phone Number:</span>
                <strong className="text-slate-800">{printAppointment.phone}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Doctor / Specialist:</span>
                <strong className="text-[#1E3A8A]">{printAppointment.preferredDoctor}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Date & Slot:</span>
                <strong className="text-slate-800">{printAppointment.preferredDate} ({printAppointment.preferredTime})</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Purpose:</span>
                <strong className="text-slate-800">{printAppointment.reason}</strong>
              </div>
              {printAppointment.staffNotes && (
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Token/Notes:</span>
                  <strong className="text-[#0D9488]">{printAppointment.staffNotes}</strong>
                </div>
              )}
            </div>

            <div className="pt-4 flex items-center justify-between gap-3">
              <button
                onClick={() => setPrintAppointment(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold shadow-md cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print OP Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
