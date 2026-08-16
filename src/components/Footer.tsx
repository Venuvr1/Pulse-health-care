import { type MouseEvent } from 'react';
import { Activity, Phone, MapPin, Mail, ArrowUp, Heart, ShieldCheck, Shield } from 'lucide-react';
import { CLINIC_INFO, DOCTORS_DATA } from '../data/healthcareData';
import { scrollToSection } from '../utils/scrollHelper';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export function Footer({ onOpenAdmin }: FooterProps) {
  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    scrollToSection(targetId);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative glass-panel border-t border-slate-200/50 text-[#374151] text-sm overflow-hidden mt-12">
      {/* Background glow accent */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200/50">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-[#2563EB] shadow-inner backdrop-blur-md">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold text-[#1E3A8A] tracking-tight font-heading">
                  PULSE <span className="text-[#2563EB]">HEALTH</span> CENTRE
                </span>
                <p className="text-[11px] font-bold text-[#0D9488] tracking-wider uppercase">
                  {CLINIC_INFO.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#374151] leading-relaxed max-w-sm font-normal">
              Providing patient-focused healthcare, clinical consultations, chronic condition management, and pathology diagnostics in Ongole, Andhra Pradesh.
            </p>

            <div className="pt-2 flex flex-col space-y-1.5 text-xs text-[#374151] font-medium">
              <div className="flex items-center gap-2">
                <span className="text-[#2563EB] font-bold">•</span>
                <span>Dr. M. Mani Kishore (M.B.B.S., M.D. - General Physician)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#0D9488] font-bold">•</span>
                <span>Dr. Kokkula Neeharika (M.B.B.S., M.D. - Pathology)</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className="text-[#374151] hover:text-[#2563EB] transition-colors cursor-pointer"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleLinkClick(e, 'about')}
                  className="text-[#374151] hover:text-[#2563EB] transition-colors cursor-pointer"
                >
                  About Pulse Centre
                </a>
              </li>
              <li>
                <a
                  href="#doctors"
                  onClick={(e) => handleLinkClick(e, 'doctors')}
                  className="text-[#374151] hover:text-[#2563EB] transition-colors cursor-pointer"
                >
                  Meet Our Doctors
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, 'services')}
                  className="text-[#374151] hover:text-[#2563EB] transition-colors cursor-pointer"
                >
                  Medical Services
                </a>
              </li>
              <li>
                <a
                  href="#why-us"
                  onClick={(e) => handleLinkClick(e, 'why-us')}
                  className="text-[#374151] hover:text-[#2563EB] transition-colors cursor-pointer"
                >
                  Why Pulse Health Centre
                </a>
              </li>
              <li>
                <a
                  href="#appointment"
                  onClick={(e) => handleLinkClick(e, 'appointment')}
                  className="text-[#374151] hover:text-[#2563EB] transition-colors cursor-pointer"
                >
                  Book Consultation
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, 'contact')}
                  className="text-[#374151] hover:text-[#2563EB] transition-colors cursor-pointer"
                >
                  Location & Contact
                </a>
              </li>
              {onOpenAdmin && (
                <li className="pt-2 border-t border-slate-200/60">
                  <button
                    onClick={onOpenAdmin}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#1E3A8A] hover:text-[#2563EB] transition-colors cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Reception & Staff Portal</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: Key Services (Local SEO) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider font-heading">
              Clinical Services
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, 'services')}
                  className="text-[#374151] hover:text-[#2563EB] transition-colors cursor-pointer"
                >
                  General Physician Care
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, 'services')}
                  className="text-[#374151] hover:text-[#2563EB] transition-colors cursor-pointer"
                >
                  Diabetes & Blood Sugar
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, 'services')}
                  className="text-[#374151] hover:text-[#2563EB] transition-colors cursor-pointer"
                >
                  Blood Pressure Management
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, 'services')}
                  className="text-[#374151] hover:text-[#2563EB] transition-colors cursor-pointer"
                >
                  Thyroid & Metabolic Health
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, 'services')}
                  className="text-[#374151] hover:text-[#2563EB] transition-colors cursor-pointer"
                >
                  Pathology Diagnostics
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, 'services')}
                  className="text-[#374151] hover:text-[#2563EB] transition-colors cursor-pointer"
                >
                  Preventive Health Checkups
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider font-heading">
              Clinic Desk
            </h4>
            <div className="space-y-2.5 text-xs">
              <p className="flex items-start gap-2 text-[#374151] font-normal">
                <MapPin className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <span>
                  Beside STAR MRI, 2nd Lane, Sundaraiah Bhavan Road, Ongole, AP – 523001
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#2563EB] shrink-0" />
                <a href={`tel:${CLINIC_INFO.phones[0].display}`} className="text-[#1E3A8A] hover:text-[#2563EB] font-bold font-mono">
                  {CLINIC_INFO.phones[0].display}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0D9488] shrink-0" />
                <a href={`tel:${CLINIC_INFO.phones[1].display}`} className="text-[#1E3A8A] hover:text-[#0D9488] font-bold font-mono">
                  {CLINIC_INFO.phones[1].display}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & local SEO snippet */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-[#64748B] text-center sm:text-left font-normal">
            © 2026 Pulse Health Centre. All Rights Reserved. • Caring for Life
          </p>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-[#64748B] hidden lg:inline font-normal">
              Ongole, Andhra Pradesh – 523001
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-pill text-[#374151] hover:text-[#1E3A8A] transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="font-bold">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
