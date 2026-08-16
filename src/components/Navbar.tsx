import { useState, useEffect, type MouseEvent } from 'react';
import { Activity, Phone, Calendar, Menu, X, ChevronRight, ShieldCheck, Shield } from 'lucide-react';
import { CLINIC_INFO } from '../data/healthcareData';
import { scrollToSection } from '../utils/scrollHelper';

interface NavbarProps {
  onBookClick: () => void;
  onOpenAdmin: () => void;
}

export function Navbar({ onBookClick, onOpenAdmin }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check current section with offset consideration
      const headerEl = document.querySelector('header');
      const offsetThreshold = (headerEl ? headerEl.getBoundingClientRect().height : 80) + 40;
      
      const sections = ['home', 'about', 'doctors', 'services', 'why-us', 'appointment', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offsetThreshold && rect.bottom >= offsetThreshold) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Our Doctors', href: '#doctors', id: 'doctors' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Why Us', href: '#why-us', id: 'why-us' },
    { name: 'Appointment', href: '#appointment', id: 'appointment' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollToSection(targetId);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 lg:px-8 py-3">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-lg shadow-blue-950/5 py-2.5 px-4 sm:px-6'
            : 'glass-panel py-3 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo & Tagline */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-lg cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/30 text-[#1E3A8A] backdrop-blur-md group-hover:bg-blue-600/20 transition-all shadow-inner">
              <Activity className="w-5 h-5 text-[#2563EB] animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-[#1E3A8A] flex items-center gap-1.5 font-heading">
                PULSE HEALTH CENTRE
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#0D9488] font-bold">
                {CLINIC_INFO.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 lg:gap-1.5 p-1 rounded-2xl bg-white/40 border border-white/60 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-sm transition-all cursor-pointer ${
                    isActive
                      ? 'text-[#1E3A8A] bg-white/90 border border-white shadow-sm font-bold backdrop-blur-sm'
                      : 'text-[#374151] hover:text-[#1E3A8A] hover:bg-white/60 font-medium'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Reception Desk Admin Access */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#1E3A8A] bg-blue-50/90 hover:bg-blue-100/90 border border-blue-200/80 transition-all cursor-pointer"
              title="Clinic Reception / Staff Desk"
            >
              <Shield className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="hidden md:inline">Reception Desk</span>
            </button>

            {/* Quick Call */}
            <a
              href={`tel:${CLINIC_INFO.phones[0].display}`}
              className="hidden xl:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#374151] glass-btn-secondary hover:text-[#1E3A8A] transition-all"
              title="Call Pulse Health Centre"
            >
              <Phone className="w-3.5 h-3.5 text-[#0EA5E9]" />
              <span className="font-mono">{CLINIC_INFO.phones[0].display}</span>
            </a>

            {/* Book Appointment CTA (Trust Blue with Pure White text) */}
            <button
              onClick={onBookClick}
              className="relative inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white glass-btn-primary active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile & Tablet Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl glass-pill text-[#374151] hover:text-[#1E3A8A] focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 rounded-2xl glass-panel shadow-2xl space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-[#374151] hover:bg-blue-50 hover:text-[#1E3A8A] transition-colors cursor-pointer"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-[#64748B]" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200/60 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-bold bg-blue-50 border border-blue-200 text-[#1E3A8A] cursor-pointer"
            >
              <Shield className="w-4 h-4 text-[#2563EB]" />
              <span>Reception Desk & Bookings Login</span>
            </button>
            <a
              href={`tel:${CLINIC_INFO.phones[0].display}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-bold glass-btn-secondary text-[#1E3A8A]"
            >
              <Phone className="w-4 h-4 text-[#0EA5E9]" />
              <span>Call Helpline ({CLINIC_INFO.phones[0].display})</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-bold text-white glass-btn-primary cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment Now</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#64748B] pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>Beside STAR MRI, Sundaraiah Bhavan Road, Ongole</span>
          </div>
        </div>
      )}
    </header>
  );
}
