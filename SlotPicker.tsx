import { Clock } from 'lucide-react';
import { SLOT_TIMES, formatDisplayTime, isSlotInPast } from '@/lib/booking';

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
