export interface Doctor {
  id: string;
  name: string;
  shortName?: string;
  qualifications: string;
  specialty: string;
  monogram: string;
  description: string;
  tags: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  tags: string[];
}

export interface WhyUsItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  email: string;
  preferredDoctor: string;
  preferredDate: string;
  preferredTime: string;
  reason: string;
  message: string;
}

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  reason?: string;
}
export interface AppointmentRecord {
  id: string;
  refCode: string;
  fullName: string;
  phone: string;
  email?: string;
  preferredDoctor: string;
  preferredDate: string;
  preferredTime: string;
  reason: string;
  message?: string;
  status: AppointmentStatus;
  createdAt: string;
  source: 'Online Website' | 'Walk-in' | 'Phone Call';
  staffNotes?: string;
}
