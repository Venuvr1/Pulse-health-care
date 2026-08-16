import { AppointmentRecord, AppointmentStatus } from '../types';

const STORAGE_KEY = 'pulse_health_centre_appointments';
const ADMIN_PIN_KEY = 'pulse_admin_pin';
const DEFAULT_PIN = '1234';

// Sample initial data for first-time view
const INITIAL_APPOINTMENTS: AppointmentRecord[] = [
  {
    id: 'apt-101',
    refCode: 'PHC-784920',
    fullName: 'Ramesh Naidu',
    phone: '9848022338',
    email: 'ramesh.n@gmail.com',
    preferredDoctor: 'Dr. M. Mani Kishore (General Physician)',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: 'Morning (9:30 AM - 1:00 PM)',
    reason: 'Hypertension & Diabetes Checkup',
    message: 'High BP readings in morning for last 3 days',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    source: 'Online Website',
    staffNotes: 'Token #3 allotted. Advised fasting blood sugar'
  },
  {
    id: 'apt-102',
    refCode: 'PHC-920145',
    fullName: 'Lakshmi Prasanna',
    phone: '9440187234',
    email: '',
    preferredDoctor: 'Dr. Kokkula Neeharika (Pathology)',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: 'Morning (9:30 AM - 1:00 PM)',
    reason: 'Complete Blood Picture & Thyroid Profile',
    message: 'Routine health checkup prescribed by physician',
    status: 'Pending',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    source: 'Online Website',
    staffNotes: ''
  },
  {
    id: 'apt-103',
    refCode: 'PHC-631890',
    fullName: 'Srinivasa Rao K.',
    phone: '9849234567',
    email: 'srinivas.k@yahoo.com',
    preferredDoctor: 'Dr. M. Mani Kishore (General Physician)',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    preferredTime: 'Evening (6:00 PM - 9:00 PM)',
    reason: 'Fever & Seasonal Infections',
    message: 'Body pains with mild fever for 2 days',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    source: 'Phone Call',
    staffNotes: 'Scheduled for tomorrow evening session'
  }
];

export function getStoredAppointments(): AppointmentRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_APPOINTMENTS));
      return INITIAL_APPOINTMENTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_APPOINTMENTS;
  }
}

export function saveAppointment(appointment: Omit<AppointmentRecord, 'id' | 'createdAt' | 'status'> & { status?: AppointmentStatus }): AppointmentRecord {
  const current = getStoredAppointments();
  const newRecord: AppointmentRecord = {
    ...appointment,
    id: 'apt-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    createdAt: new Date().toISOString(),
    status: appointment.status || 'Pending'
  };

  const updated = [newRecord, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  // Dispatch custom event for real-time UI synchronization
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('pulse_appointment_updated', { detail: newRecord }));
  }

  return newRecord;
}

export function updateAppointmentStatus(id: string, status: AppointmentStatus, notes?: string): AppointmentRecord[] {
  const current = getStoredAppointments();
  const updated = current.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status,
        ...(notes !== undefined ? { staffNotes: notes } : {})
      };
    }
    return item;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('pulse_appointment_updated'));
  }
  return updated;
}

export function updateAppointmentNotes(id: string, notes: string): AppointmentRecord[] {
  const current = getStoredAppointments();
  const updated = current.map((item) => {
    if (item.id === id) {
      return { ...item, staffNotes: notes };
    }
    return item;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('pulse_appointment_updated'));
  }
  return updated;
}

export function deleteAppointment(id: string): AppointmentRecord[] {
  const current = getStoredAppointments();
  const updated = current.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('pulse_appointment_updated'));
  }
  return updated;
}

export function getAdminPin(): string {
  try {
    return localStorage.getItem(ADMIN_PIN_KEY) || DEFAULT_PIN;
  } catch {
    return DEFAULT_PIN;
  }
}

export function setAdminPin(newPin: string): void {
  localStorage.setItem(ADMIN_PIN_KEY, newPin);
}

export function createWhatsAppMessageUrl(phone: string, appointment: AppointmentRecord): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const targetNumber = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone;
  
  const text = `🏥 *Pulse Health Centre, Ongole*
📋 *Consultation Booking Confirmation*

*Patient Name:* ${appointment.fullName}
*Ref Code:* ${appointment.refCode}
*Doctor:* ${appointment.preferredDoctor}
*Date:* ${appointment.preferredDate}
*Time Slot:* ${appointment.preferredTime}
*Reason:* ${appointment.reason}
*Status:* ${appointment.status.toUpperCase()}

📍 *Address:* Sundaraiah Bhavan Road, Beside STAR MRI, Ongole, AP - 523001
📞 *Reception Helpline:* +91 6300795469 / +91 9705959319`;

  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(text)}`;
}

export function createReceptionNotificationWhatsAppUrl(appointment: AppointmentRecord): string {
  const receptionPhone = '916300795469';
  const text = `🚨 *NEW APPOINTMENT ALERT - PULSE HEALTH CENTRE*

*Ref Code:* ${appointment.refCode}
*Patient:* ${appointment.fullName}
*Phone:* ${appointment.phone}
*Doctor:* ${appointment.preferredDoctor}
*Date:* ${appointment.preferredDate}
*Time:* ${appointment.preferredTime}
*Reason:* ${appointment.reason}
${appointment.message ? `*Notes:* ${appointment.message}` : ''}
*Source:* ${appointment.source}`;

  return `https://wa.me/${receptionPhone}?text=${encodeURIComponent(text)}`;
}

export function exportAppointmentsToCSV(appointments: AppointmentRecord[]) {
  const headers = ['Ref Code', 'Patient Name', 'Phone', 'Email', 'Doctor', 'Date', 'Time Slot', 'Reason', 'Status', 'Source', 'Booked At', 'Staff Notes'];
  const rows = appointments.map((a) => [
    `"${a.refCode}"`,
    `"${a.fullName}"`,
    `"${a.phone}"`,
    `"${a.email || ''}"`,
    `"${a.preferredDoctor}"`,
    `"${a.preferredDate}"`,
    `"${a.preferredTime}"`,
    `"${a.reason}"`,
    `"${a.status}"`,
    `"${a.source}"`,
    `"${new Date(a.createdAt).toLocaleString()}"`,
    `"${a.staffNotes || ''}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Pulse_Appointments_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
