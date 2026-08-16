import type { ElementType } from 'react';
import { UserCheck, Award, MapPin, HeartHandshake, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { WHY_US_DATA, CLINIC_INFO } from '../data/healthcareData';
import { WhyUsItem } from '../types';

const iconMap: Record<string, ElementType> = {
  UserCheck,
  Award,
  MapPin,
  HeartHandshake,
};

export function WhyUsSection() {
  return (
    <section id="why-us" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background accents */}
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-blue-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-block px-4 py-1 glass-pill text-xs font-bold tracking-wider text-[#1E3A8A] uppercase mb-4 shadow-sm">
          Why Choose Us
        </div>
        {/* Section Title H2: Deep Navy Blue (#1E3A8A) */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3A8A] tracking-tight mb-4 font-heading">
          Care That Feels Personal
        </h2>
        {/* Paragraph: Dark Charcoal (#374151) */}
        <p className="text-base sm:text-lg text-[#374151] font-normal">
          Designed around the healthcare needs of individuals and families across Ongole and surrounding regions.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {WHY_US_DATA.map((item: WhyUsItem, idx: number) => {
          const Icon = iconMap[item.iconName] || CheckCircle2;
          return (
            <div
              key={item.id}
              className="group relative rounded-3xl glass-card p-6 flex flex-col justify-between"
            >
              <div>
                {/* Card number badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-[#2563EB] group-hover:bg-blue-600/20 transition-all shadow-inner backdrop-blur-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#64748B] group-hover:text-[#2563EB] transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                {/* Title: Deep Navy Blue (#1E3A8A) */}
                <h3 className="text-lg font-bold text-[#1E3A8A] tracking-tight mb-2.5 group-hover:text-[#2563EB] transition-colors font-heading">
                  {item.title}
                </h3>

                {/* Description: Dark Charcoal (#374151) */}
                <p className="text-sm text-[#374151] leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Location Banner inside Why Us */}
      <div className="mt-12 rounded-3xl glass-card p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="flex items-center gap-4 text-left">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/30 text-[#2563EB] shadow-inner backdrop-blur-md shrink-0">
            <MapPin className="w-6 h-6 text-[#2563EB]" />
          </div>
          <div>
            <h4 className="text-base font-bold text-[#1E3A8A] font-heading">Central Ongole Accessibility</h4>
            <p className="text-xs sm:text-sm text-[#374151] mt-0.5 font-normal">
              {CLINIC_INFO.address.full}
            </p>
          </div>
        </div>
        <a
          href={CLINIC_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl glass-btn-secondary text-[#1E3A8A] hover:text-[#2563EB] text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap"
        >
          View on Map & Directions
        </a>
      </div>
    </section>
  );
}
