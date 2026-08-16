import { useState, type ElementType } from 'react';
import {
  Stethoscope,
  Activity,
  ShieldPlus,
  HeartPulse,
  Thermometer,
  Apple,
  Brain,
  Wind,
  Droplets,
  Shield,
  ClipboardCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { SERVICES_DATA } from '../data/healthcareData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

const iconComponentMap: Record<string, ElementType> = {
  Stethoscope,
  Activity,
  ShieldPlus,
  HeartPulse,
  Thermometer,
  Apple,
  Brain,
  Wind,
  Droplets,
  Shield,
  ClipboardCheck,
  Sparkles,
};

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Primary Care', 'Chronic Care', 'Wellness', 'Preventive Care'];

  const filteredServices = selectedCategory === 'All'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === selectedCategory || (selectedCategory === 'Wellness' && (s.category === 'Wellness' || s.category === 'Preventive Care')));

  return (
    <section id="services" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-block px-4 py-1 glass-pill text-xs font-bold tracking-wider text-[#1E3A8A] uppercase mb-4 shadow-sm">
          Clinical Services
        </div>
        {/* Section Title H2: Deep Navy Blue (#1E3A8A) */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3A8A] tracking-tight mb-4 font-heading">
          Healthcare That Puts You First
        </h2>
        {/* Paragraph: Dark Charcoal (#374151) */}
        <p className="text-base sm:text-lg text-[#374151] font-normal">
          Comprehensive healthcare consultations, diagnostics, and chronic condition management in Ongole.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'glass-btn-primary text-[#FFFFFF] shadow-md shadow-blue-600/20'
                  : 'glass-pill text-[#374151] hover:text-[#1E3A8A] hover:bg-white/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service: ServiceItem) => {
          const Icon = iconComponentMap[service.iconName] || Stethoscope;
          return (
            <div
              key={service.id}
              className="group relative rounded-3xl glass-card p-6 flex flex-col justify-between"
            >
              <div>
                {/* Icon and Category Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-[#2563EB] group-hover:bg-blue-600/20 transition-all shadow-inner backdrop-blur-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#64748B] glass-pill px-2.5 py-1 uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>

                {/* Service Title: Deep Navy Blue (#1E3A8A) */}
                <h3 className="text-lg font-bold text-[#1E3A8A] tracking-tight group-hover:text-[#2563EB] transition-colors mb-2 font-heading">
                  {service.title}
                </h3>

                {/* Description: Dark Charcoal (#374151) */}
                <p className="text-xs sm:text-sm text-[#374151] leading-relaxed mb-4 font-normal">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium text-[#64748B] bg-white/50 px-2.5 py-0.5 rounded-lg border border-white/80 backdrop-blur-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Consult Action: Medical Cyan (#0EA5E9) or Medical Teal (#0D9488) */}
              <button
                onClick={() => onSelectService(service.title)}
                className="w-full flex items-center justify-between pt-3.5 border-t border-slate-200/50 text-xs font-bold text-[#0EA5E9] hover:text-[#0284C7] transition-colors cursor-pointer"
              >
                <span>Consult for {service.title}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
