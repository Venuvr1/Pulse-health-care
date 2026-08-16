import { Doctor, ServiceItem, WhyUsItem } from '../types';

export const CLINIC_INFO = {
  name: 'PULSE HEALTH CENTRE',
  city: 'Ongole',
  tagline: 'Caring for Life',
  address: {
    line1: 'Beside STAR MRI',
    line2: '2nd Lane, Sundaraiah Bhavan Road',
    city: 'Ongole',
    state: 'Andhra Pradesh',
    pincode: '523001',
    full: 'Beside STAR MRI, 2nd Lane, Sundaraiah Bhavan Road, Ongole, Andhra Pradesh – 523001'
  },
  phones: [
    { display: '6300795469', raw: '+916300795469' },
    { display: '9705959319', raw: '+919705959319' }
  ],
  workingHours: [
    { days: 'Monday – Saturday', hours: '9:00 AM – 8:30 PM' },
    { days: 'Sunday', hours: '10:00 AM – 2:00 PM (By Appointment)' }
  ],
  googleMapsUrl: 'https://maps.google.com/?q=Beside+STAR+MRI,+2nd+Lane,+Sundaraiah+Bhavan+Road,+Ongole,+Andhra+Pradesh+523001'
};

export const DOCTORS_DATA: Doctor[] = [
  {
    id: 'dr-mani-kishore',
    name: 'Dr. M. Mani Kishore',
    shortName: 'Mani',
    qualifications: 'M.B.B.S., M.D.',
    specialty: 'General Physician',
    monogram: 'MK',
    description: 'Providing medical consultation and personalized guidance for a wide range of general health concerns.',
    tags: ['Primary Care', 'Chronic Disease', 'Preventive Health', 'General Medicine']
  },
  {
    id: 'dr-kokkula-neeharika',
    name: 'Dr. Kokkula Neeharika',
    shortName: 'Neeharika',
    qualifications: 'M.B.B.S., M.D.',
    specialty: 'Pathology',
    monogram: 'KN',
    description: 'Focused on pathology services and supporting medical evaluation as part of comprehensive healthcare.',
    tags: ['Diagnostic Evaluation', 'Clinical Pathology', 'Laboratory Diagnostics', 'Health Screening']
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'general-physician',
    title: 'General Physician Consultation',
    category: 'Primary Care',
    description: 'Comprehensive primary care diagnosis, treatment, and ongoing health management for all age groups.',
    iconName: 'Stethoscope',
    tags: ['Diagnosis', 'Consultation', 'Primary Health']
  },
  {
    id: 'diabetes-care',
    title: 'Diabetes Care',
    category: 'Chronic Care',
    description: 'Personalized blood sugar monitoring, glycemic control strategies, lifestyle guidance, and regular checkups.',
    iconName: 'Activity',
    tags: ['Blood Sugar', 'HbA1c', 'Metabolic Health']
  },
  {
    id: 'thyroid-care',
    title: 'Thyroid Care',
    category: 'Endocrinology',
    description: 'Clinical evaluation and systematic medical management for hypothyroidism, hyperthyroidism, and hormonal balance.',
    iconName: 'ShieldPlus',
    tags: ['TSH Management', 'Hormonal Evaluation']
  },
  {
    id: 'blood-pressure',
    title: 'Blood Pressure Management',
    category: 'Cardiovascular',
    description: 'Hypertension screening, personalized cardiovascular risk assessment, and therapeutic blood pressure regulation.',
    iconName: 'HeartPulse',
    tags: ['Hypertension', 'Vascular Health', 'Vitals']
  },
  {
    id: 'fever-common-illness',
    title: 'Fever & Common Illness Care',
    category: 'Acute Care',
    description: 'Prompt evaluation and targeted relief for acute viral fevers, seasonal infections, and common ailments.',
    iconName: 'Thermometer',
    tags: ['Viral Infections', 'Seasonal Flu', 'Quick Relief']
  },
  {
    id: 'gastric-digestive',
    title: 'Gastric & Digestive Concerns',
    category: 'Gastroenterology',
    description: 'Medical support for acid reflux, indigestion, gastritis, bloating, and other abdominal health concerns.',
    iconName: 'Apple',
    tags: ['Gastritis', 'Acidity', 'Gut Health']
  },
  {
    id: 'headache-migraine',
    title: 'Headache & Migraine Consultation',
    category: 'Neurological',
    description: 'Systematic diagnosis of tension headaches, chronic migraines, and stress-related neurological symptoms.',
    iconName: 'Brain',
    tags: ['Migraine', 'Tension Relief', 'Neurology']
  },
  {
    id: 'respiratory-breathing',
    title: 'Respiratory & Breathing Concerns',
    category: 'Pulmonology',
    description: 'Care for persistent cough, asthma, bronchitis, seasonal allergies, and breathing difficulties.',
    iconName: 'Wind',
    tags: ['Bronchitis', 'Allergies', 'Lungs']
  },
  {
    id: 'kidney-concerns',
    title: 'Kidney-Related Concerns',
    category: 'Renal Care',
    description: 'Preliminary kidney function evaluation, urinary symptom management, and metabolic screening.',
    iconName: 'Droplets',
    tags: ['Renal Evaluation', 'Urinary Health']
  },
  {
    id: 'liver-gallbladder',
    title: 'Liver & Gallbladder Concerns',
    category: 'Hepatic Health',
    description: 'Clinical checkups and guidance for liver health indicators, fatty liver, and biliary symptoms.',
    iconName: 'Shield',
    tags: ['Hepatic Screening', 'Metabolism']
  },
  {
    id: 'general-health',
    title: 'General Health Consultation',
    category: 'Wellness',
    description: 'Full-body wellness checks, clinical second opinions, and tailored lifestyle advice for families in Ongole.',
    iconName: 'ClipboardCheck',
    tags: ['Family Health', 'Routine Checkup']
  },
  {
    id: 'preventive-guidance',
    title: 'Preventive Health Guidance',
    category: 'Preventive Care',
    description: 'Proactive health planning, early risk detection, dietary recommendations, and annual screening plans.',
    iconName: 'Sparkles',
    tags: ['Early Detection', 'Proactive Wellness']
  }
];

export const WHY_US_DATA: WhyUsItem[] = [
  {
    id: 'personal-attention',
    title: 'Personal Attention',
    description: "Healthcare designed around understanding each patient's concerns with unhurried, attentive consultations.",
    iconName: 'UserCheck'
  },
  {
    id: 'professional-care',
    title: 'Professional Care',
    description: 'Medical consultation from qualified healthcare professionals with M.B.B.S., M.D. expertise.',
    iconName: 'Award'
  },
  {
    id: 'convenient-location',
    title: 'Convenient Location',
    description: 'Centrally located beside STAR MRI on Sundaraiah Bhavan Road, easily accessible across Ongole.',
    iconName: 'MapPin'
  },
  {
    id: 'caring-approach',
    title: 'Caring Approach',
    description: 'A patient-friendly approach focused on comfort, clear communication, and empathetic support.',
    iconName: 'HeartHandshake'
  }
];

export const TRUST_BAR_ITEMS = [
  { label: 'Qualified Medical Professionals', sub: 'M.B.B.S., M.D. Specialists', icon: 'GraduationCap' },
  { label: 'Patient-Focused Care', sub: 'Personalized Attention', icon: 'Heart' },
  { label: 'Ongole Central Location', sub: 'Beside STAR MRI, Sundaraiah Bhavan Rd', icon: 'MapPin' },
  { label: 'Easy Appointment Booking', sub: 'Call or Online Request', icon: 'CalendarCheck' }
];
