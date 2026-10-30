import { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, UserRound } from 'lucide-react';
import type { Doctor, BookingResult } from '@/lib/types';
import { createAppointment } from '@/lib/booking';
import ScheduleStep, { type ScheduleSelection } from '@/components/booking/ScheduleStep';
import PatientDetailsForm, { type PatientDetails } from '@/components/booking/PatientDetailsForm';
import BookingConfirmation from '@/components/booking/BookingConfirmation';

export type DoctorPreselection = { doctorId: string };

type BookingSectionProps = {
  doctors: Doctor[];
  preselection: DoctorPreselection | null;
};

type Step = 'schedule' | 'details' | 'done';

const INDICATOR_STEPS = [
  { id: 'schedule', label: 'Doctor & time', icon: CalendarDays },
  { id: 'details', label: 'Your details', icon: UserRound },
] as const;

const EMPTY_DETAILS: PatientDetails = { name: '', email: '', phone: '', reason: '' };

export default function BookingSection({ doctors, preselection }: BookingSectionProps) {
  const [step, setStep] = useState<Step>('schedule');
  const [selection, setSelection] = useState<ScheduleSelection>({
    doctorId: preselection?.doctorId ?? '',
    date: '',
    time: '',
  });
  useEffect(() => {
    if (!preselection) return;
    setSelection((s) => ({ ...s, doctorId: preselection.doctorId, time: '' }));
    setStep('schedule');
  }, [preselection]);

  const [details, setDetails] = useState<PatientDetails>(EMPTY_DETAILS);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<BookingResult | null>(null);
  const [bookedFor, setBookedFor] = useState<{ doctorName: string; date: string; time: string } | null>(null);

  const doctor = doctors.find((d) => d.id === selection.doctorId);
  const canContinue = !!doctor && !!selection.date && !!selection.time;
  const currentStepIndex = INDICATOR_STEPS.findIndex((s) => s.id === step);

  const handleSubmit = async () => {
    if (!doctor) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const booking = await createAppointment({
        doctorId: selection.doctorId,
        date: selection.date,
        time: selection.time,
        patientName: details.name.trim(),
        patientEmail: details.email.trim(),
        patientPhone: details.phone.trim(),
        reason: details.reason.trim(),
      });
      setResult(booking);
      setBookedFor({ doctorName: doctor.name, date: selection.date, time: selection.time });
      setStep('done');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetBooking = () => {
    setSelection({ doctorId: '', date: '', time: '' });
    setDetails(EMPTY_DETAILS);
    setResult(null);
    setBookedFor(null);
    setSubmitError(null);
    setStep('schedule');
  };

  return (
    <section id="book" className="scroll-mt-20 bg-gradient-to-b from-white to-primary-50/60 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-accent-600">Book online</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl">
            Schedule your consultation
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Pick a doctor, a date and a time slot. Both you and your doctor receive confirmation by email and SMS.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-xl shadow-primary-900/5 ring-1 ring-slate-100">
          {step !== 'done' && (
            <ol className="grid grid-cols-2 border-b border-slate-100 bg-slate-50/70">
              {INDICATOR_STEPS.map((s, index) => {
                const active = index === currentStepIndex;
                const complete = index < currentStepIndex;
                const Icon = s.icon;
                return (
                  <li
                    key={s.id}
                    className={`flex items-center justify-center gap-2 px-3 py-4 text-sm font-semibold transition-colors ${
                      active ? 'bg-white text-primary-700' : complete ? 'text-accent-700' : 'text-slate-400'
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                        active
                          ? 'bg-primary-600 text-white'
                          : complete
                            ? 'bg-accent-500 text-white'
                            : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="hidden sm:inline">{s.label}</span>
                    <Icon className="h-4 w-4 sm:hidden" />
                  </li>
                );
              })}
            </ol>
          )}

          <div className="p-6 sm:p-10">
            {step === 'schedule' && (
              <div className="animate-fade-up">
                {doctors.length === 0 ? (
                  <p className="text-center text-slate-600">Doctors are not available for booking right now.</p>
                ) : (
                  <ScheduleStep doctors={doctors} selection={selection} onChange={setSelection} />
                )}
                <div className="mt-10 flex justify-end">
                  <button
                    type="button"
                    disabled={!canContinue}
                    onClick={() => setStep('details')}
                    className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:-translate-y-0.5 hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none disabled:hover:translate-y-0"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 'details' && (
              <div className="animate-fade-up">
                {doctor && (
                  <div className="mb-8 rounded-2xl bg-primary-50 px-5 py-4 text-sm text-primary-900">
                    <span className="font-semibold">{doctor.name}</span> on{' '}
                    <span className="font-semibold">{selection.date}</span> at{' '}
                    <span className="font-semibold">{selection.time}</span>
                  </div>
                )}
                <PatientDetailsForm
                  details={details}
                  onChange={setDetails}
                  onBack={() => setStep('schedule')}
                  onSubmit={handleSubmit}
                  submitting={submitting}
                  submitError={submitError}
                />
              </div>
            )}

            {step === 'done' && result && bookedFor && (
              <div className="animate-fade-up">
                <BookingConfirmation
                  result={result}
                  doctorName={bookedFor.doctorName}
                  date={bookedFor.date}
                  time={bookedFor.time}
                  patientEmail={details.email.trim()}
                  patientPhone={details.phone.trim()}
                  onDone={resetBooking}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
