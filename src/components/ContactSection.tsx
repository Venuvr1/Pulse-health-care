import { MapPin, Phone, Clock, Navigation, ShieldCheck, Mail, Building2, CheckCircle2 } from 'lucide-react';
import { CLINIC_INFO } from '../data/healthcareData';

export function ContactSection() {
  return (
    <section id="contact" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background accents */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-500/[0.02] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-block px-4 py-1 glass-pill text-xs font-bold tracking-wider text-[#1E3A8A] uppercase mb-4 shadow-sm">
          Location & Timings
        </div>
        {/* Section Title H2: Deep Navy Blue (#1E3A8A) */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3A8A] tracking-tight mb-4 font-heading">
          Visit Pulse Health Centre
        </h2>
        {/* Paragraph: Dark Charcoal (#374151) */}
        <p className="text-base sm:text-lg text-[#374151] font-normal">
          Centrally located beside STAR MRI on Sundaraiah Bhavan Road in Ongole.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Information Card (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl glass-card p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Address block */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-[#2563EB] border border-blue-500/20 flex items-center justify-center shrink-0 shadow-inner backdrop-blur-md">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
                  Clinic Address
                </span>
                <h3 className="text-lg font-bold text-[#1E3A8A] mt-1 font-heading">
                  PULSE HEALTH CENTRE
                </h3>
                <p className="text-sm text-[#374151] font-normal mt-1 leading-relaxed">
                  Beside STAR MRI, 2nd Lane,<br />
                  Sundaraiah Bhavan Road,<br />
                  <strong className="text-[#1E3A8A] font-semibold">Ongole, Andhra Pradesh – 523001</strong>
                </p>
              </div>
            </div>

            {/* Direct Phone Numbers */}
            <div className="flex items-start gap-4 pt-4 border-t border-slate-200/50">
              <div className="w-12 h-12 rounded-2xl bg-teal-600/10 text-[#0D9488] border border-teal-500/20 flex items-center justify-center shrink-0 shadow-inner backdrop-blur-md">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0D9488]">
                  Direct Contact & Inquiries
                </span>
                <div className="flex flex-col gap-1 mt-1">
                  <a
                    href={`tel:${CLINIC_INFO.phones[0].display}`}
                    className="text-base font-bold text-[#1E3A8A] hover:text-[#2563EB] transition-colors font-mono"
                  >
                    +91 {CLINIC_INFO.phones[0].display}
                  </a>
                  <a
                    href={`tel:${CLINIC_INFO.phones[1].display}`}
                    className="text-base font-bold text-[#1E3A8A] hover:text-[#2563EB] transition-colors font-mono"
                  >
                    +91 {CLINIC_INFO.phones[1].display}
                  </a>
                </div>
              </div>
            </div>

            {/* Timings */}
            <div className="flex items-start gap-4 pt-4 border-t border-slate-200/50">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-[#2563EB] border border-blue-500/20 flex items-center justify-center shrink-0 shadow-inner backdrop-blur-md">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
                  Consultation Timings
                </span>
                <div className="mt-1 space-y-1 text-sm text-[#374151]">
                  <p className="flex justify-between gap-4">
                    <span className="font-medium text-[#64748B]">Mon – Sat:</span>
                    <span className="text-[#1E3A8A] font-bold">9:00 AM – 8:30 PM</span>
                  </p>
                  <p className="flex justify-between gap-4">
                    <span className="font-medium text-[#64748B]">Sunday:</span>
                    <span className="text-[#0D9488] font-bold">10:00 AM – 2:00 PM</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            <a
              href={`tel:${CLINIC_INFO.phones[0].display}`}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-[#FFFFFF] glass-btn-primary active:scale-[0.98] transition-all"
            >
              <Phone className="w-4 h-4 text-[#FFFFFF]" />
              <span>Call Now</span>
            </a>
            <a
              href={CLINIC_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-[#374151] hover:text-[#1E3A8A] glass-btn-secondary active:scale-[0.98] transition-all"
            >
              <Navigation className="w-4 h-4 text-[#2563EB]" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>

        {/* Right Interactive Location Map Preview (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl glass-card p-4 sm:p-6 flex flex-col justify-between overflow-hidden">
          {/* Map Title Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/50">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#2563EB]" />
              <span className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider font-heading">
                Ongole Centre Location Map
              </span>
            </div>
            <span className="text-xs text-[#64748B] font-medium">Beside STAR MRI</span>
          </div>

          {/* Map View */}
          <div className="relative w-full h-[280px] sm:h-[340px] rounded-2xl overflow-hidden bg-slate-100/50 border border-white/60">
            {/* Embedded Google Map iframe */}
            <iframe
              title="Pulse Health Centre Ongole Location"
              src="https://maps.google.com/maps?q=Sundaraiah+Bhavan+Road+Ongole+Andhra+Pradesh+523001&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Overlay Landmark Pin Badge */}
            <div className="absolute top-4 left-4 p-3 rounded-2xl glass-panel max-w-xs shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse" />
                <p className="text-xs font-bold text-[#1E3A8A]">Pulse Health Centre</p>
              </div>
              <p className="text-[11px] text-[#0D9488] font-semibold mt-0.5">
                Beside STAR MRI, 2nd Lane, Sundaraiah Bhavan Rd
              </p>
            </div>
          </div>

          {/* Location notes */}
          <div className="mt-4 pt-3 border-t border-slate-200/50 flex flex-wrap items-center justify-between gap-3 text-xs text-[#64748B]">
            <span className="flex items-center gap-1.5 font-normal">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488]" />
              Easy parking & accessible ground entrance
            </span>
            <a
              href={CLINIC_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563EB] hover:text-[#1D4ED8] font-bold underline"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
