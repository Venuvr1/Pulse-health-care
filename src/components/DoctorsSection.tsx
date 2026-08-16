import { Stethoscope, Microscope, Check, ArrowRight, ShieldCheck, UserCheck, Calendar } from 'lucide-react';
import { DOCTORS_DATA } from '../data/healthcareData';
import { Doctor } from '../types';

interface DoctorsSectionProps {
  onSelectDoctor: (doctorName: string) => void;
}

export function DoctorsSection({ onSelectDoctor }: DoctorsSectionProps) {
  return (
    <section id="doctors" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background soft glow accents */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-96 h-96 bg-blue-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-teal-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
        <div className="inline-block px-4 py-1 glass-pill text-xs font-bold tracking-wider text-[#1E3A8A] uppercase mb-4 shadow-sm">
          Qualified Specialists
        </div>
        {/* Section Title H2: Deep Navy Blue (#1E3A8A) */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3A8A] tracking-tight mb-4 font-heading">
          Meet Our Doctors
        </h2>
        {/* Body Text: Dark Charcoal (#374151) */}
        <p className="text-base sm:text-lg text-[#374151] font-normal">
          Experienced medical specialists dedicated to patient-focused diagnosis and care in Ongole.
        </p>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
        {DOCTORS_DATA.map((doctor: Doctor, index: number) => {
          const isPhysician = index === 0;
          return (
            <div
              key={doctor.id}
              className="group relative rounded-3xl glass-card p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                {/* Header with Monogram and Medical Icon */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  {/* Monogram Avatar */}
                  <div className="relative">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-xl sm:text-2xl font-bold text-[#1E3A8A] font-heading shadow-inner backdrop-blur-md">
                      {doctor.monogram}
                    </div>
                    {/* Active indicator */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white/90 border border-white flex items-center justify-center shadow-xs">
                      <div className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
                    </div>
                  </div>

                  {/* Specialty Badges */}
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl glass-pill text-[#1E3A8A] text-[11px] font-bold uppercase tracking-wider">
                      {isPhysician ? (
                        <Stethoscope className="w-3.5 h-3.5 text-[#2563EB]" />
                      ) : (
                        <Microscope className="w-3.5 h-3.5 text-[#0EA5E9]" />
                      )}
                      <span>{doctor.specialty}</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-white/60 text-[#64748B] border border-white/80 text-[11px] font-mono font-medium backdrop-blur-xs">
                      {doctor.qualifications}
                    </span>
                  </div>
                </div>

                {/* Doctor Name & Title: Deep Navy Blue (#1E3A8A) */}
                <div className="mb-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] tracking-tight group-hover:text-[#2563EB] transition-colors font-heading">
                    {doctor.name}
                  </h3>
                  <p className="text-sm font-semibold text-[#64748B] mt-0.5">
                    {doctor.qualifications} • {doctor.specialty}
                  </p>
                </div>

                {/* Description: Dark Charcoal (#374151) */}
                <p className="text-sm text-[#374151] leading-relaxed mb-6 font-normal">
                  {doctor.description}
                </p>

                {/* Tags / Focus Areas */}
                <div className="mb-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748B] mb-2.5">
                    Key Areas of Practice
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {doctor.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/60 border border-white/80 text-xs font-semibold text-[#374151] backdrop-blur-xs"
                      >
                        <Check className="w-3.5 h-3.5 text-[#0D9488]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Consultation CTA Button (Trust Blue #2563EB with Pure White text) */}
              <div className="pt-4 border-t border-slate-200/50">
                <button
                  onClick={() => onSelectDoctor(doctor.name)}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl text-sm font-bold text-[#FFFFFF] glass-btn-primary transition-all duration-200 cursor-pointer active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4 text-[#FFFFFF]" />
                  <span>Book Consultation with {doctor.shortName || (doctor.id === 'dr-mani-kishore' ? 'Mani' : 'Neeharika')}</span>
                  <ArrowRight className="w-4 h-4 text-[#FFFFFF] transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
