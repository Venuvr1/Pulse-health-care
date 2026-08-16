import { GraduationCap, Heart, MapPin, CalendarCheck, CheckCircle2 } from 'lucide-react';
import { TRUST_BAR_ITEMS } from '../data/healthcareData';

const iconMap: Record<string, typeof GraduationCap> = {
  GraduationCap,
  Heart,
  MapPin,
  CalendarCheck,
};

export function TrustBar() {
  return (
    <section className="relative z-20 mt-6 sm:mt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl glass-card p-5 sm:p-6 shadow-lg shadow-blue-950/5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {TRUST_BAR_ITEMS.map((item) => {
            const Icon = iconMap[item.icon] || CheckCircle2;
            return (
              <div
                key={item.label}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl glass-panel hover:border-blue-300/40 transition-all"
              >
                <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-[#2563EB] shrink-0 shadow-inner backdrop-blur-md">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563EB]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#1E3A8A] tracking-tight font-heading truncate">
                    {item.label}
                  </h3>
                  <p className="text-xs text-[#64748B] mt-0.5 font-normal truncate">
                    {item.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
