import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { AboutSection } from './components/AboutSection';
import { DoctorsSection } from './components/DoctorsSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyUsSection } from './components/WhyUsSection';
import { AppointmentSection } from './components/AppointmentSection';
import { ContactSection } from './components/ContactSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { QuickFloatingActions } from './components/QuickFloatingActions';
import { AdminDashboard } from './components/AdminDashboard';
import { scrollToSection } from './utils/scrollHelper';

export default function App() {
  const [preselectedDoctor, setPreselectedDoctor] = useState<string>('');
  const [preselectedService, setPreselectedService] = useState<string>('');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  const scrollToAppointment = () => {
    scrollToSection('appointment');
  };

  const handleSelectDoctor = (doctorName: string) => {
    setPreselectedDoctor(doctorName);
    scrollToAppointment();
  };

  const handleSelectService = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    scrollToAppointment();
  };

  const handleClearPreselect = () => {
    setPreselectedDoctor('');
    setPreselectedService('');
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#374151] font-['Inter',sans-serif] selection:bg-blue-500/20 selection:text-blue-900 antialiased overflow-x-hidden relative">
      {/* Dynamic Ambient Glassmorphism Luminous Mesh Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Top-left Indigo / Blue Orb */}
        <div className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] bg-gradient-to-br from-blue-500/20 via-indigo-400/15 to-transparent rounded-full blur-[100px] animate-pulse-glow" />
        
        {/* Top-right Sky / Cyan Orb */}
        <div className="absolute top-[5%] -right-[10%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] bg-gradient-to-bl from-cyan-400/20 via-sky-300/15 to-transparent rounded-full blur-[110px] animate-float-ambient" />
        
        {/* Mid-page Emerald / Teal Glow */}
        <div className="absolute top-[40%] left-[20%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] bg-gradient-to-tr from-teal-400/15 via-emerald-300/10 to-transparent rounded-full blur-[120px] animate-pulse-glow" />
        
        {/* Lower Right Blue / Violet Glow */}
        <div className="absolute top-[65%] -right-[5%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] bg-gradient-to-tl from-blue-600/15 via-indigo-400/10 to-transparent rounded-full blur-[110px] animate-float-ambient" />
        
        {/* Bottom Left Teal Glow */}
        <div className="absolute -bottom-[10%] -left-[10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] bg-gradient-to-tr from-teal-500/15 via-cyan-400/10 to-transparent rounded-full blur-[100px] animate-pulse-glow" />

        {/* Subtle grid pattern texture for glass refraction depth */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1e3a8a 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Floating Glass Navbar */}
      <Navbar onBookClick={scrollToAppointment} onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero onBookClick={scrollToAppointment} onSelectDoctor={handleSelectDoctor} />

        {/* 2. Trust Bar */}
        <TrustBar />

        {/* 3. About Pulse Health Centre */}
        <AboutSection onBookClick={scrollToAppointment} />

        {/* 4. Meet Our Doctors */}
        <DoctorsSection onSelectDoctor={handleSelectDoctor} />

        {/* 5. Medical Services */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 6. Why Pulse Health Centre */}
        <WhyUsSection />

        {/* 7. Appointment Booking Desk */}
        <AppointmentSection
          preselectedDoctor={preselectedDoctor}
          preselectedService={preselectedService}
          onClearPreselect={handleClearPreselect}
        />

        {/* 7. Location & Contact */}
        <ContactSection />

        {/* 8. Final High-Impact CTA */}
        <FinalCtaSection onBookClick={scrollToAppointment} />
      </main>

      {/* 9. Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* 10. Floating Actions */}
      <QuickFloatingActions onBookClick={scrollToAppointment} />

      {/* 11. Reception Staff Admin Dashboard */}
      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
