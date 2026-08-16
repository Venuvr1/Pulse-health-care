import { Activity, Phone, Calendar, ArrowRight, ShieldCheck, MapPin, Sparkles, Clock, HeartHandshake, Stethoscope, Microscope, UserCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { CLINIC_INFO, DOCTORS_DATA } from '../data/healthcareData';
import { EcgVisual } from './EcgVisual';

interface HeroProps {
  onBookClick: () => void;
  onSelectDoctor?: (doctorName: string) => void;
}

export function Hero({ onBookClick, onSelectDoctor }: HeroProps) {
  const maniDoctor = DOCTORS_DATA[0];
  const neeharikaDoctor = DOCTORS_DATA[1];

  const handleDoctorClick = (doctorName: string) => {
    if (onSelectDoctor) {
      onSelectDoctor(doctorName);
    } else {
      onBookClick();
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] pt-28 pb-16 md:pt-36 md:pb-24 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Pure White Ambient Background Subtle Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-gradient-to-tr from-blue-500/[0.03] via-teal-500/[0.02] to-sky-500/[0.02] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 left-[-5%] w-96 h-96 bg-blue-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-5%] w-96 h-96 bg-teal-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-pill text-xs font-bold tracking-wider text-[#1E3A8A] uppercase mb-6 shadow-sm group hover:border-blue-300/80 transition-all">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]"></span>
          </span>
          <span>PULSE HEALTH CENTRE • ONGOLE</span>
          <span className="text-[#64748B]">•</span>
          <span className="text-[#0D9488] font-semibold">Beside STAR MRI</span>
        </div>

        {/* Main Heading H1: Deep Navy Blue (#1E3A8A) with Plus Jakarta Sans */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold text-[#1E3A8A] tracking-tight leading-[1.08] max-w-4xl mx-auto mb-6 font-heading">
          Trusted Healthcare.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#0EA5E9] to-[#0D9488]">
            Caring for Life.
          </span>
        </h1>

        {/* Supporting Paragraph: Dark Charcoal (#374151) 16px-18px Regular */}
        <p className="text-base sm:text-lg md:text-xl text-[#374151] max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal">
          Professional, patient-focused healthcare for you and your family in Ongole.
          Consult with experienced medical specialists for primary care, chronic condition management, and pathology diagnostics.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10">
          {/* Primary CTA: Trust Blue Glass Button */}
          <button
            id="hero-book-btn"
            onClick={onBookClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl text-base font-bold text-[#FFFFFF] glass-btn-primary transition-all active:scale-[0.98] cursor-pointer"
          >
            <Calendar className="w-5 h-5 text-[#FFFFFF]" />
            <span>Book Appointment</span>
            <ArrowRight className="w-4 h-4 text-[#FFFFFF] transition-transform group-hover:translate-x-1" />
          </button>

          {/* Secondary CTA: Translucent Glass Secondary */}
          <a
            id="hero-call-btn"
            href={`tel:${CLINIC_INFO.phones[0].display}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl text-base font-bold text-[#1E3A8A] glass-btn-secondary transition-all active:scale-[0.98]"
          >
            <Phone className="w-5 h-5 text-[#0EA5E9]" />
            <span>Call {CLINIC_INFO.phones[0].display}</span>
          </a>
        </div>

        {/* Trust Highlight Pill Bar */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-6 py-3 rounded-2xl glass-card text-xs sm:text-sm text-[#374151] mb-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0" />
            <span className="font-semibold text-[#1E3A8A]">Professional Medical Care</span>
          </div>
          <span className="text-[#64748B]/40 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-[#0EA5E9] shrink-0" />
            <span className="font-semibold text-[#1E3A8A]">Patient-Focused Approach</span>
          </div>
          <span className="text-[#64748B]/40 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#0D9488] shrink-0" />
            <span className="font-semibold text-[#1E3A8A]">Sundaraiah Bhavan Road, Beside STAR MRI</span>
          </div>
        </div>

        {/* Front Page Featured Doctors Spotlight Cards */}
        <div className="w-full max-w-5xl mx-auto mb-10 text-left">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1E3A8A]">
                Our Leading Specialists on Duty
              </h3>
            </div>
            <span className="text-xs text-[#64748B] font-medium hidden sm:inline">
              Morning & Evening OP Sessions Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dr. Mani Kishore Card */}
            <div className="p-5 sm:p-6 rounded-3xl glass-card border border-blue-200/60 hover:border-blue-400/80 transition-all flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-[#2563EB] flex items-center justify-center shrink-0">
                    <Stethoscope className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#2563EB] text-[10px] font-bold uppercase tracking-wider border border-blue-200">
                      General Medicine
                    </span>
                    <h4 className="text-lg font-bold text-[#1E3A8A] font-heading mt-0.5">
                      {maniDoctor.name}
                    </h4>
                    <p className="text-xs font-semibold text-[#2563EB]">{maniDoctor.qualifications}</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#374151] leading-relaxed">
                {maniDoctor.description}
              </p>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                <div className="text-[11px] text-[#64748B]">
                  <span className="font-semibold text-slate-700">OP Hours:</span> 9:30 AM - 1:00 PM | 6:00 PM - 9:00 PM
                </div>
                <button
                  onClick={() => handleDoctorClick(maniDoctor.name)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white glass-btn-primary active:scale-95 cursor-pointer shrink-0"
                >
                  <span>Book Mani</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Dr. Kokkula Neeharika Card */}
            <div className="p-5 sm:p-6 rounded-3xl glass-card border border-teal-200/60 hover:border-teal-400/80 transition-all flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-teal-600/10 border border-teal-500/20 text-[#0D9488] flex items-center justify-center shrink-0">
                    <Microscope className="w-6 h-6 text-[#0D9488]" />
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded-md bg-teal-50 text-[#0D9488] text-[10px] font-bold uppercase tracking-wider border border-teal-200">
                      Pathology & Diagnostics
                    </span>
                    <h4 className="text-lg font-bold text-[#1E3A8A] font-heading mt-0.5">
                      {neeharikaDoctor.name}
                    </h4>
                    <p className="text-xs font-semibold text-[#0D9488]">{neeharikaDoctor.qualifications}</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#374151] leading-relaxed">
                {neeharikaDoctor.description}
              </p>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                <div className="text-[11px] text-[#64748B]">
                  <span className="font-semibold text-slate-700">Lab Reports:</span> Fast Turnaround & In-House Testing
                </div>
                <button
                  onClick={() => handleDoctorClick(neeharikaDoctor.name)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white glass-btn-primary active:scale-95 cursor-pointer shrink-0"
                >
                  <span>Book Neeharika</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Abstract Healthcare Geometric Visual Card with ECG */}
        <div className="mt-4 relative w-full mx-auto">
          <div className="relative rounded-[32px] glass-card p-5 sm:p-7 md:p-8">
            {/* Top Bar with Status Indicators */}
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 pb-4 mb-2 border-b border-slate-200/50">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-ping" />
                <span className="text-xs font-bold text-[#1E3A8A] tracking-wider uppercase">
                  Active Consultation Hours
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#64748B]">
                <span className="hidden md:inline font-medium">Dr. M. Mani Kishore (General Physician)</span>
                <span className="text-slate-300 hidden md:inline">|</span>
                <span className="hidden md:inline font-medium">Dr. Kokkula Neeharika (Pathology)</span>
                <span className="px-2.5 py-1 rounded-lg glass-pill text-[#1E3A8A] font-mono text-[11px] font-bold">
                  Ongole, AP
                </span>
              </div>
            </div>

            {/* Glowing Animated ECG Line */}
            <div className="py-3">
              <EcgVisual height={70} />
            </div>

            {/* Bottom Mini Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-3 border-t border-slate-200/50 text-left">
              <div className="p-3.5 sm:p-4 rounded-2xl glass-panel">
                <p className="text-[11px] text-[#64748B] font-medium">Primary Physician</p>
                <p className="text-xs sm:text-sm font-bold text-[#1E3A8A] truncate">Dr. M. Mani Kishore</p>
                <p className="text-[10px] sm:text-[11px] text-[#2563EB] font-bold">M.B.B.S., M.D. (Gen. Med)</p>
              </div>
              <div className="p-3.5 sm:p-4 rounded-2xl glass-panel">
                <p className="text-[11px] text-[#64748B] font-medium">Diagnostic Head</p>
                <p className="text-xs sm:text-sm font-bold text-[#1E3A8A] truncate">Dr. Kokkula Neeharika</p>
                <p className="text-[10px] sm:text-[11px] text-[#0EA5E9] font-bold">M.B.B.S., M.D. (Pathology)</p>
              </div>
              <div className="p-3.5 sm:p-4 rounded-2xl glass-panel">
                <p className="text-[11px] text-[#64748B] font-medium">Direct Helpline</p>
                <p className="text-xs sm:text-sm font-bold text-[#2563EB] font-mono">6300795469</p>
                <p className="text-[10px] sm:text-[11px] text-[#64748B] font-mono">9705959319</p>
              </div>
              <div className="p-3.5 sm:p-4 rounded-2xl glass-panel">
                <p className="text-[11px] text-[#64748B] font-medium">Prime Landmark</p>
                <p className="text-xs sm:text-sm font-bold text-[#1E3A8A] truncate">Beside STAR MRI</p>
                <p className="text-[10px] sm:text-[11px] text-[#64748B]">Sundaraiah Bhavan Rd</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

