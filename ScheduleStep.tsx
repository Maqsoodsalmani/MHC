import { useEffect, useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import type { Doctor } from '@/lib/types';
import {
  fetchBookedSlots,
  toDateInputValue,
  weekdayOf,
  formatDisplayDate,
} from '@/lib/booking';
import SlotPicker from '@/components/booking/SlotPicker';

const BOOKING_WINDOW_DAYS = 60;

export type ScheduleSelection = {
  doctorId: string;
  date: string;
  time: string;
};

type ScheduleStepProps = {
  doctors: Doctor[];
  selection: ScheduleSelection;
  onChange: (next: ScheduleSelection) => void;
};

export default function ScheduleStep({ doctors, selection, onChange }: ScheduleStepProps) {
  const [now] = useState(() => new Date());
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [slotsStatus, setSlotsStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [reloadKey, setReloadKey] = useState(0);

  const { doctorId, date, time } = selection;
  const doctor = doctors.find((d) => d.id === doctorId);
  const dayAvailable = !!doctor && !!date && doctor.working_days.includes(weekdayOf(date));
  const showSlots = dayAvailable && !!doctor;

  useEffect(() => {
    if (!doctorId || !date || !dayAvailable) {
      setBookedSlots([]);
      setSlotsStatus('idle');
      return;
    }
    let cancelled = false;
    setSlotsStatus('loading');
    fetchBookedSlots(doctorId, date)
      .then((slots) => {
        if (cancelled) return;
        setBookedSlots(slots);
        setSlotsStatus('ready');
      })
      .catch(() => {
        if (cancelled) return;
        setBookedSlots([]);
        setSlotsStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [doctorId, date, dayAvailable, reloadKey]);

  const maxDate = new Date(now);
  maxDate.setDate(maxDate.getDate() + BOOKING_WINDOW_DAYS);

  return (
    <div className="space-y-8">
      <div>
        <label htmlFor="doctor" className="block text-sm font-semibold text-slate-700">
          Doctor
        </label>
        <select
          id="doctor"
          value={doctorId}
          onChange={(e) => onChange({ doctorId: e.target.value, date, time: '' })}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm transition focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100"
        >
          <option value="">Choose a doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} - {d.specialty}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-semibold text-slate-700">
          Appointment date
        </label>
        <input
          id="date"
          type="date"
          min={toDateInputValue(now)}
          max={toDateInputValue(maxDate)}
          value={date}
          onChange={(e) => onChange({ doctorId, date: e.target.value, time: '' })}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm transition focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100"
        />
        {doctor && date && !dayAvailable && (
          <p className="mt-2 text-sm text-amber-700">
            {doctor.name} does not see patients on {formatDisplayDate(date)}. Please choose another day.
          </p>
        )}
      </div>

      {showSlots && (
        <div>
          {slotsStatus === 'loading' && (
            <p className="flex items-center gap-2 text-sm text-slate-600">
              <Loader2 className="h-4 w-4 animate-spin text-primary-600" />
              Checking available slots...
            </p>
          )}
          {slotsStatus === 'error' && (
            <div className="flex items-center justify-between gap-4 rounded-xl border border-red-100 bg-red-50 p-4">
              <p className="flex items-center gap-2 text-sm text-red-700">
                <AlertCircle className="h-4 w-4" />
                We could not load the time slots.
              </p>
              <button
                type="button"
                onClick={() => setReloadKey((k) => k + 1)}
                className="text-sm font-semibold text-red-700 underline"
              >
                Retry
              </button>
            </div>
          )}
          {slotsStatus === 'ready' && (
            <SlotPicker
              date={date}
              bookedSlots={bookedSlots}
              selectedTime={time}
              now={now}
              onSelect={(t) => onChange({ doctorId, date, time: t })}
            />
          )}
        </div>
      )}
    </div>
  );
}
