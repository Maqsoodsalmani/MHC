import { supabase } from '@/lib/supabase';
import type { BookingInput, BookingResult } from '@/lib/types';

export const SLOT_TIMES = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
];

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export function toDateInputValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function weekdayOf(date: string): number {
  const day = new Date(`${date}T00:00:00Z`).getUTCDay();
  return day === 0 ? 7 : day;
}

export function isSlotInPast(date: string, time: string, now: Date): boolean {
  return new Date(`${date}T${time}:00`).getTime() <= now.getTime();
}

export function formatDisplayDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatDisplayTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

export async function fetchBookedSlots(doctorId: string, date: string): Promise<string[]> {
  const { data, error } = await supabase.rpc('get_booked_slots', {
    p_doctor_id: doctorId,
    p_date: date,
  });
  if (error) throw new Error('Could not load available time slots.');
  if (!Array.isArray(data)) throw new Error('Could not load available time slots.');
  return data.filter((t): t is string => typeof t === 'string').map((t) => t.slice(0, 5));
}

export async function createAppointment(input: BookingInput): Promise<BookingResult> {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/book-appointment`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      apikey: SUPABASE_ANON_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    const message = body && typeof body.error === 'string' ? body.error : 'Booking failed. Please try again.';
    throw new Error(message);
  }
  if (!body || typeof body.appointmentId !== 'string' || !body.notifications) {
    throw new Error('Booking failed. Please try again.');
  }
  return body as BookingResult;
}
