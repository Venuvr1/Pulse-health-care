import { useState, useEffect } from 'react';
import { Phone, Calendar, MessageCircle, MapPin, X, ArrowUp } from 'lucide-react';
import { CLINIC_INFO } from '../data/healthcareData';

interface QuickFloatingActionsProps {
  onBookClick: () => void;
}

export function QuickFloatingActions({ onBookClick }: QuickFloatingActionsProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside aria-label="Quick contact actions" className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Floating Call Button */}
      <a
        href={`tel:${CLINIC_INFO.phones[0].display}`}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full glass-pill text-[#1E3A8A] shadow-xl hover:bg-white/90 hover:scale-105 transition-all text-xs font-bold font-mono"
        title="Call Pulse Health Centre"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <Phone className="w-4 h-4 text-[#2563EB]" />
        <span className="hidden sm:inline">Call {CLINIC_INFO.phones[0].display}</span>
        <span className="sm:hidden">Call</span>
      </a>

      {/* Floating Book Appointment Button */}
      <button
        onClick={onBookClick}
        className="flex items-center gap-2 px-5 py-3 rounded-full glass-btn-primary text-[#FFFFFF] shadow-xl shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all text-sm font-bold cursor-pointer"
        aria-label="Quick Book Appointment"
      >
        <Calendar className="w-4 h-4 text-[#FFFFFF]" />
        <span>Book Appointment</span>
      </button>
    </aside>
  );
}
