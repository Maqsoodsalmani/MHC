import { Clock } from 'lucide-react';
// We removed SLOT_TIMES from the import below since we are adding it directly to this file
import { formatDisplayTime, isSlotInPast } from '@/lib/booking';

// Added the 15-minute interval time slots (11am-2pm and 6pm-11pm)
const SLOT_TIMES = [
  // Morning / Afternoon Session
  "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM",
  "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM",
  "01:00 PM", "01:15 PM", "01:30 PM", "01:45 PM",
  "02:00 PM",
  
  // Evening Session
  "06:00 PM", "06:15 PM", "06:30 PM", "06:45 PM",
  "07:00 PM", "07:15 PM", "07:30 PM", "07:45 PM",
  "08:00 PM", "08:15 PM", "08:30 PM", "08:45 PM",
  "09:00 PM", "09:15 PM", "09:30 PM", "09:45 PM",
  "10:00 PM", "10:15 PM", "10:30 PM", "10:45 PM",
  "11:00 PM"
];

type SlotPickerProps = {
  date: string;
  bookedSlots: string[];
  selectedTime: string;
  onSelect: (time: string) => void;
  now: Date;
};

export default function SlotPicker({ date, bookedSlots, selectedTime, onSelect, now }: SlotPickerProps) {
  return (
    <div>
      <p className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <Clock className="h-4 w-4 text-primary-600" />
        Available time slots
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {SLOT_TIMES.map((time) => {
          const booked = bookedSlots.includes(time);
          const past = isSlotInPast(date, time, now);
          const disabled = booked || past;
          const selected = selectedTime === time;
          return (
            <button
              key={time}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(time)}
              aria-pressed={selected}
              className={`rounded-xl border px-2 py-2.5 text-sm font-semibold transition-all ${
                selected
                  ? 'border-primary-600 bg-primary-600 text-white shadow-md shadow-primary-600/25'
                  : disabled
                    ? 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400 line-through'
                    : 'border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-primary-400 hover:text-primary-700'
              }`}
            >
              {formatDisplayTime(time)}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-slate-500">Struck-through slots are already booked or have passed.</p>
    </div>
  );
}
