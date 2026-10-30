import { CheckCircle2, Mail, MessageSquare } from 'lucide-react';
import type { BookingResult, NotificationStatus } from '@/lib/types';
import { formatDisplayDate, formatDisplayTime } from '@/lib/booking';

type BookingConfirmationProps = {
  result: BookingResult;
  doctorName: string;
  date: string;
  time: string;
  patientEmail: string;
  patientPhone: string;
  onDone: () => void;
};

const STATUS_TEXT: Record<NotificationStatus, string> = {
  sent: 'Sent',
  failed: 'Could not be sent',
  not_configured: 'Pending setup',
  no_contact: 'No contact on file',
};

const STATUS_CLASS: Record<NotificationStatus, string> = {
  sent: 'text-accent-700',
  failed: 'text-red-600',
  not_configured: 'text-amber-700',
  no_contact: 'text-slate-500',
};

export default function BookingConfirmation({
  result,
  doctorName,
  date,
  time,
  patientEmail,
  patientPhone,
  onDone,
}: BookingConfirmationProps) {
  const rows = [
    { icon: Mail, label: `Patient email (${patientEmail})`, status: result.notifications.patientEmail },
    { icon: MessageSquare, label: `Patient SMS (${patientPhone})`, status: result.notifications.patientSms },
    { icon: Mail, label: `Doctor email (${doctorName})`, status: result.notifications.doctorEmail },
    { icon: MessageSquare, label: `Doctor SMS (${doctorName})`, status: result.notifications.doctorSms },
  ];

  return (
    <div className="text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-100 text-accent-600">
        <CheckCircle2 className="h-9 w-9" />
      </span>
      <h3 className="mt-6 text-2xl font-bold text-primary-900">Your appointment is booked</h3>
      <p className="mt-3 text-slate-600">
        {doctorName} on {formatDisplayDate(date)} at {formatDisplayTime(time)}
      </p>
      <p className="mt-2 text-sm text-slate-500">
        Reference: <span className="font-mono font-semibold text-slate-700">{result.appointmentId.slice(0, 8).toUpperCase()}</span>
      </p>

      <ul className="mx-auto mt-8 max-w-md divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-slate-50 text-left">
        {rows.map(({ icon: Icon, label, status }) => (
          <li key={label} className="flex items-center justify-between gap-4 px-5 py-3.5">
            <span className="flex items-center gap-3 text-sm text-slate-700">
              <Icon className="h-4 w-4 text-primary-500" />
              {label}
            </span>
            <span className={`text-sm font-semibold ${STATUS_CLASS[status]}`}>{STATUS_TEXT[status]}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onDone}
        className="mt-8 rounded-full bg-primary-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:-translate-y-0.5 hover:bg-primary-700"
      >
        Book another appointment
      </button>
    </div>
  );
}
