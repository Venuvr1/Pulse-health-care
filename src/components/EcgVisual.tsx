export function EcgVisual({ className = '', height = 64 }: { className?: string; height?: number }) {
  return (
    <div className={`relative overflow-hidden w-full ${className}`} style={{ height: `${height}px` }}>
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ecgGlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0d9488" stopOpacity="0.2" />
            <stop offset="25%" stopColor="#0f766e" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#0891b2" stopOpacity="1" />
            <stop offset="75%" stopColor="#0284c7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.2" />
          </linearGradient>
          <filter id="ecgGlowFilter" x="-10%" y="-30%" width="120%" height="160%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient background baseline */}
        <path
          d="M0 60 H1200"
          stroke="rgba(13, 148, 136, 0.2)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />

        {/* Dynamic ECG Waveform */}
        <path
          d="M0 60 L120 60 L140 55 L150 60 L180 60 L195 45 L205 85 L220 15 L235 98 L248 50 L260 64 L275 60 L360 60 L420 60 L440 55 L450 60 L480 60 L495 45 L505 85 L520 15 L535 98 L548 50 L560 64 L575 60 L660 60 L720 60 L740 55 L750 60 L780 60 L795 45 L805 85 L820 15 L835 98 L848 50 L860 64 L875 60 L960 60 L1020 60 L1040 55 L1050 60 L1080 60 L1095 45 L1105 85 L1120 15 L1135 98 L1148 50 L1160 64 L1175 60 L1200 60"
          stroke="url(#ecgGlowGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#ecgGlowFilter)"
          className="animate-ecg"
        />
      </svg>
    </div>
  );
}
