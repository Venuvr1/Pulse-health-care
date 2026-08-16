import { useState, useEffect, type FormEvent } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Send,
  Loader2,
  ShieldCheck,
  Check
} from 'lucide-react';
import { CLINIC_INFO, DOCTORS_DATA, SERVICES_DATA } from '../data/healthcareData';
import { AppointmentFormData, FormErrors, AppointmentRecord } from '../types';
import { saveAppointment, createReceptionNotificationWhatsAppUrl } from '../utils/appointmentStorage';
import { MessageSquare } from 'lucide-react';

interface AppointmentSectionProps {
  preselectedDoctor?: string;
  preselectedService?: string;
  onClearPreselect?: () => void;
}

export function AppointmentSection({
  preselectedDoctor = '',
  preselectedService = '',
  onClearPreselect
}: AppointmentSectionProps) {
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phone: '',
    email: '',
    preferredDoctor: preselectedDoctor || '',
    preferredDate: '',
    preferredTime: 'Morning (9:30 AM - 1:00 PM)',
    reason: preselectedService || '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  // Update form if preselected doctor or service changes
  useEffect(() => {
    if (preselectedDoctor) {
      setFormData((prev) => ({ ...prev, preferredDoctor: preselectedDoctor }));
    }
  }, [preselectedDoctor]);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, reason: preselectedService }));
    }
  }, [preselectedService]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    // Phone validation
    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Phone Number is required';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone) && cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    // Reason validation
    if (!formData.reason.trim()) {
      newErrors.reason = 'Please select or enter the reason for consultation';
    }

    // Email validation (optional)
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [createdRecord, setCreatedRecord] = useState<AppointmentRecord | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const code = 'PHC-' + Math.floor(100000 + Math.random() * 900000);
      setConfirmationCode(code);

      const record = saveAppointment({
        refCode: code,
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        preferredDoctor: formData.preferredDoctor || 'Dr. M. Mani Kishore (General Physician)',
        preferredDate: formData.preferredDate || today,
        preferredTime: formData.preferredTime,
        reason: formData.reason,
        message: formData.message,
        source: 'Online Website'
      });
      setCreatedRecord(record);
    }, 800);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      preferredDoctor: '',
      preferredDate: '',
      preferredTime: 'Morning (9:30 AM - 1:00 PM)',
      reason: '',
      message: ''
    });
    setErrors({});
    if (onClearPreselect) onClearPreselect();
  };

  // Get tomorrow's date for date picker min
  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="appointment" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-blue-500/[0.03] via-teal-500/[0.02] to-sky-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-block px-4 py-1 glass-pill text-xs font-bold tracking-wider text-[#1E3A8A] uppercase mb-4 shadow-sm">
          Patient Consultation Desk
        </div>
        {/* Section Title H2: Deep Navy Blue (#1E3A8A) */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3A8A] tracking-tight mb-4 font-heading">
          Book Your Consultation
        </h2>
        {/* Paragraph: Dark Charcoal (#374151) */}
        <p className="text-base sm:text-lg text-[#374151] font-normal">
          Schedule your appointment with Dr. M. Mani Kishore or Dr. Kokkula Neeharika at Pulse Health Centre, Ongole.
        </p>
      </div>

      {/* Main Appointment Container */}
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-[32px] glass-card p-6 sm:p-10 shadow-2xl overflow-hidden">
          {/* Ambient Corner Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/[0.03] blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/[0.03] blur-[80px] pointer-events-none" />

          {isSubmitted ? (
            /* Success State */
            <div className="py-8 text-center space-y-6 relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-blue-600/10 border border-blue-500/30 text-[#2563EB] mx-auto flex items-center justify-center shadow-inner backdrop-blur-md">
                <CheckCircle2 className="w-10 h-10 text-[#2563EB]" />
              </div>

              <div className="space-y-2">
                <span className="inline-block px-3.5 py-1 rounded-full glass-pill text-[#1E3A8A] text-xs font-mono font-bold">
                  Ref Code: {confirmationCode}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] tracking-tight font-heading">
                  Appointment Request Received!
                </h3>
                <p className="text-sm sm:text-base text-[#374151] max-w-lg mx-auto leading-relaxed font-normal">
                  Thank you, <span className="text-[#1E3A8A] font-bold">{formData.fullName}</span>! Your consultation request has been logged. Our reception team will call you at <span className="text-[#1E3A8A] font-bold font-mono">{formData.phone}</span> to confirm your time slot.
                </p>
              </div>

              {/* Summary Card */}
              <div className="max-w-md mx-auto p-5 rounded-2xl glass-panel text-left space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between py-1.5 border-b border-slate-200/50">
                  <span className="text-[#64748B] font-medium">Doctor:</span>
                  <span className="text-[#1E3A8A] font-bold">{formData.preferredDoctor || 'Any Available Doctor'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200/50">
                  <span className="text-[#64748B] font-medium">Preferred Date:</span>
                  <span className="text-[#1E3A8A] font-bold">{formData.preferredDate || 'Earliest Available'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200/50">
                  <span className="text-[#64748B] font-medium">Preferred Time:</span>
                  <span className="text-[#1E3A8A] font-bold">{formData.preferredTime}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#64748B] font-medium">Reason:</span>
                  <span className="text-[#0D9488] font-bold">{formData.reason}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                {createdRecord && (
                  <a
                    href={createReceptionNotificationWhatsAppUrl(createdRecord)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-bold shadow-md shadow-emerald-500/20 active:scale-[0.98] transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>Send Slip to Clinic WhatsApp (6300795469)</span>
                  </a>
                )}
                <a
                  href={`tel:${CLINIC_INFO.phones[0].display}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-btn-primary text-[#FFFFFF] text-sm font-bold active:scale-[0.98] transition-all"
                >
                  <Phone className="w-4 h-4 text-[#FFFFFF]" />
                  <span>Call Reception ({CLINIC_INFO.phones[0].display})</span>
                </a>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-btn-secondary text-[#374151] hover:text-[#1E3A8A] text-sm font-bold cursor-pointer active:scale-[0.98] transition-all"
                >
                  <span>Book Another Consultation</span>
                </button>
              </div>

              <div className="pt-2 text-center">
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Synced with Pulse Clinic Reception Desk
                </span>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="fullName" className="block text-xs font-bold text-[#1E3A8A] uppercase tracking-wider">
                    Full Name <span className="text-[#2563EB]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="fullName"
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm text-[#374151] placeholder-slate-400 focus:outline-none transition-all ${
                        errors.fullName ? 'border-red-500 bg-red-50/50' : ''
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="phone" className="block text-xs font-bold text-[#1E3A8A] uppercase tracking-wider">
                    Phone Number <span className="text-[#2563EB]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm text-[#374151] placeholder-slate-400 focus:outline-none transition-all ${
                        errors.phone ? 'border-red-500 bg-red-50/50' : ''
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="email" className="block text-xs font-bold text-[#1E3A8A] uppercase tracking-wider">
                    Email Address <span className="text-[#64748B] text-[11px] font-normal lowercase">(optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm text-[#374151] placeholder-slate-400 focus:outline-none transition-all ${
                        errors.email ? 'border-red-500 bg-red-50/50' : ''
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Preferred Doctor */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="preferredDoctor" className="block text-xs font-bold text-[#1E3A8A] uppercase tracking-wider">
                    Preferred Doctor
                  </label>
                  <select
                    id="preferredDoctor"
                    value={formData.preferredDoctor}
                    onChange={(e) => setFormData({ ...formData, preferredDoctor: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-[#374151] focus:outline-none transition-all cursor-pointer font-medium"
                  >
                    <option value="">Any Available Specialist</option>
                    {DOCTORS_DATA.map((doc) => (
                      <option key={doc.id} value={doc.name}>
                        {doc.name} ({doc.specialty} - {doc.qualifications})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Date */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="preferredDate" className="block text-xs font-bold text-[#1E3A8A] uppercase tracking-wider">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <input
                      id="preferredDate"
                      type="date"
                      min={today}
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-[#374151] focus:outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Preferred Time Slot */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="preferredTime" className="block text-xs font-bold text-[#1E3A8A] uppercase tracking-wider">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <select
                      id="preferredTime"
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-[#374151] focus:outline-none transition-all cursor-pointer font-medium"
                    >
                      <option value="Morning (9:30 AM - 1:00 PM)">Morning (9:30 AM – 1:00 PM)</option>
                      <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM – 5:00 PM)</option>
                      <option value="Evening (5:30 PM - 8:30 PM)">Evening (5:30 PM – 8:30 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Reason for Consultation */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="reason" className="block text-xs font-bold text-[#1E3A8A] uppercase tracking-wider">
                  Reason for Consultation <span className="text-[#2563EB]">*</span>
                </label>
                <div className="relative">
                  <input
                    id="reason"
                    type="text"
                    required
                    list="reason-options"
                    placeholder="e.g. General checkup, Fever, Blood Pressure, Diabetes, Thyroid..."
                    value={formData.reason}
                    onChange={(e) => {
                      setFormData({ ...formData, reason: e.target.value });
                      if (errors.reason) setErrors({ ...errors, reason: undefined });
                    }}
                    className={`w-full px-4 py-3 rounded-xl glass-input text-sm text-[#374151] placeholder-slate-400 focus:outline-none transition-all ${
                      errors.reason ? 'border-red-500 bg-red-50/50' : ''
                    }`}
                  />
                  <datalist id="reason-options">
                    {SERVICES_DATA.map((srv) => (
                      <option key={srv.id} value={srv.title} />
                    ))}
                    <option value="General Health Checkup" />
                    <option value="Routine Blood Pressure & Sugar Review" />
                    <option value="Pathology & Laboratory Tests" />
                  </datalist>
                </div>
                {errors.reason && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.reason}
                  </p>
                )}
              </div>

              {/* Additional Message / Note */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="message" className="block text-xs font-bold text-[#1E3A8A] uppercase tracking-wider">
                  Additional Note / Symptoms <span className="text-[#64748B] text-[11px] font-normal lowercase">(optional)</span>
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Any specific symptoms or health history you would like the doctors to know beforehand..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-[#374151] placeholder-slate-400 focus:outline-none transition-all resize-none"
                />
              </div>

              {/* Privacy Notice */}
              <div className="flex items-center gap-2 text-xs text-[#64748B] text-left pt-2 font-normal">
                <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>Your medical details are confidential and handled directly by our healthcare team.</span>
              </div>

              {/* Submit CTA: Solid Trust Blue (#2563EB) with Pure White (#FFFFFF) text */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-8 rounded-xl text-base font-bold text-[#FFFFFF] glass-btn-primary disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Request...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5 text-[#FFFFFF]" />
                    <span>Request Appointment</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
