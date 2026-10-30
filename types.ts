export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experience_years: number;
  bio: string;
  working_days: number[];
};

export type BookingInput = {
  doctorId: string;
  date: string;
  time: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  reason: string;
};

export type NotificationStatus = 'sent' | 'failed' | 'not_configured' | 'no_contact';

export type BookingResult = {
  appointmentId: string;
  notifications: {
    patientEmail: NotificationStatus;
    patientSms: NotificationStatus;
    doctorEmail: NotificationStatus;
    doctorSms: NotificationStatus;
  };
};
