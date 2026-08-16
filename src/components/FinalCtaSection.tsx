import { Calendar, Phone, ArrowRight, Activity, ShieldCheck } from 'lucide-react';
import { CLINIC_INFO } from '../data/healthcareData';
import { EcgVisual } from './EcgVisual';

interface FinalCtaSectionProps {
  onBookClick: () => void;
}

export function FinalCtaSection({ onBookClick }: FinalCtaSectionProps) {
  return (
    <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="relative rounded-[32px] glass-card p-8 sm:p-12 md:p-16 text-center shadow-2xl overflow-hidden">
        {/* Ambient Glowing Blobs */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 w-80 h-80 bg-teal-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

        {/* Animated ECG background layer */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
          <EcgVisual height={100} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-block px-4 py-1 glass-pill text-xs font-bold tracking-wider text-[#1E3A8A] uppercase shadow-sm">
            PULSE HEALTH CENTRE • ONGOLE
          </div>

          {/* Section Title H2: Deep Navy Blue (#1E3A8A) */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E3A8A] tracking-tight leading-tight font-heading">
            Your Health.{' '}
            <span className="text-[#2563EB]">
              Our Care.
            </span>
          </h2>

          {/* Paragraph: Dark Charcoal (#374151) */}
          <p className="text-base sm:text-lg text-[#374151] max-w-2xl mx-auto leading-relaxed font-normal">
            Connect with Pulse Health Centre for professional healthcare support in Ongole. Schedule a consultation or call our reception directly today.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* Primary Button */}
            <button
              onClick={onBookClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-[#FFFFFF] glass-btn-primary active:scale-[0.98] cursor-pointer"
            >
              <Calendar className="w-5 h-5 text-[#FFFFFF]" />
              <span>Book an Appointment</span>
              <ArrowRight className="w-4 h-4 text-[#FFFFFF]" />
            </button>

            <a
              href={`tel:${CLINIC_INFO.phones[0].display}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-[#374151] hover:text-[#1E3A8A] glass-btn-secondary active:scale-[0.98]"
            >
              <Phone className="w-5 h-5 text-[#2563EB]" />
              <span>Call {CLINIC_INFO.phones[0].display}</span>
            </a>
          </div>

          <div className="pt-4 flex items-center justify-center gap-2 text-xs text-[#64748B] font-normal">
            <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
            <span>General Medicine & Pathology Consultations • Beside STAR MRI, Ongole</span>
          </div>
        </div>
      </div>
    </section>
  );
}
