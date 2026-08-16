import { Stethoscope, Microscope, ShieldCheck, HeartHandshake, CheckCircle2, ArrowRight, Building2, Clock, MapPin } from 'lucide-react';
import { CLINIC_INFO } from '../data/healthcareData';

interface AboutSectionProps {
  onBookClick?: () => void;
}

export function AboutSection({ onBookClick }: AboutSectionProps) {
  return (
    <section id="about" className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-blue-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-block px-4 py-1 glass-pill text-xs font-bold tracking-wider text-[#1E3A8A] uppercase mb-3.5 shadow-xs">
          About Pulse Health Centre
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3A8A] tracking-tight mb-4 font-heading">
          Comprehensive Care & Diagnostics Under One Roof
        </h2>
        <p className="text-base sm:text-lg text-[#374151] font-normal leading-relaxed">
          Founded to bridge clinical expertise and accurate laboratory diagnostics in Ongole, delivering compassionate, evidence-based healthcare for every patient.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Story & Philosophy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-5">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1E3A8A] font-heading">
              A Unified Healthcare Destination in Ongole
            </h3>
            <p className="text-sm sm:text-base text-[#374151] leading-relaxed">
              At <strong className="text-[#1E3A8A]">Pulse Health Centre</strong>, we believe timely and accurate medical care starts with listening to the patient and backing clinical decisions with precise pathology tests. Located conveniently on <strong>Sundaraiah Bhavan Road, Beside STAR MRI</strong>, our centre offers seamless coordination between doctor consultations and laboratory evaluations.
            </p>
            <p className="text-sm sm:text-base text-[#374151] leading-relaxed">
              Led by <strong className="text-[#1E3A8A]">Dr. M. Mani Kishore</strong> (General Physician) and <strong className="text-[#1E3A8A]">Dr. Kokkula Neeharika</strong> (Pathologist), our clinical protocols are designed to minimize patient anxiety, eliminate unnecessary referrals, and provide same-day clarity for acute and chronic conditions.
            </p>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl glass-panel">
                <div className="w-8 h-8 rounded-xl bg-blue-600/10 border border-blue-500/20 text-[#2563EB] flex items-center justify-center shrink-0">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1E3A8A]">General Medicine</h4>
                  <p className="text-[11px] text-[#64748B] mt-0.5">Diabetes, BP, Fevers & Lifestyle disorders</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl glass-panel">
                <div className="w-8 h-8 rounded-xl bg-teal-600/10 border border-teal-500/20 text-[#0D9488] flex items-center justify-center shrink-0">
                  <Microscope className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1E3A8A]">Pathology & Lab</h4>
                  <p className="text-[11px] text-[#64748B] mt-0.5">Complete Blood Picture, Thyroid & Biochemistry</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Feature Highlights & Quick Facts */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E3A8A] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
              <span>Why Patients Trust Pulse</span>
            </div>

            <ul className="space-y-3">
              {[
                { title: 'Qualified MD Specialists', desc: 'Direct consultations with experienced postgraduate doctors.' },
                { title: 'In-House Laboratory', desc: 'Fast turnaround times for routine & specialized blood tests.' },
                { title: 'Zero Clutter, Dedicated Attention', desc: 'Thorough evaluation of medical history and symptoms.' },
                { title: 'Central Ongole Location', desc: 'Easily accessible beside STAR MRI on Sundaraiah Bhavan Road.' }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-[#1E3A8A] block">{item.title}</strong>
                    <span className="text-xs text-[#64748B]">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-[#64748B] font-medium">Have questions or symptoms?</p>
                <p className="text-xs font-bold text-[#1E3A8A]">Helpline: 6300795469</p>
              </div>
              {onBookClick && (
                <button
                  onClick={onBookClick}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white glass-btn-primary active:scale-95 cursor-pointer shadow-sm"
                >
                  <span>Book Visit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
