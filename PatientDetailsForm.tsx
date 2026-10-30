import { useState, type FormEvent, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export type PatientDetails = {
  name: string;
  email: string;
  phone: string;
  reason: string;
};

type PatientDetailsFormProps = {
  details: PatientDetails;
  onChange: (next: PatientDetails) => void;
  onBack: () => void;
  onSubmit: () => void;
  submitting: boolean;
  submitError: string | null;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s()-]{7,20}$/;

const inputClass =
  'mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100';

export default function PatientDetailsForm({
  details,
  onChange,
  onBack,
  onSubmit,
  submitting,
  submitError,
}: PatientDetailsFormProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof PatientDetails, string>>>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (details.name.trim().length < 2) next.name = 'Please enter the patient name.';
    if (!EMAIL_RE.test(details.email.trim())) next.email = 'Please enter a valid email address.';
    if (!PHONE_RE.test(details.phone.trim())) next.phone = 'Please enter a valid phone number.';
    setErrors(next);
    if (Object.keys(next).length === 0) onSubmit();
  };

  const update = (field: keyof PatientDetails) => (value: string) => {
    onChange({ ...details, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Patient full name" error={errors.name}>
          <input
            type="text"
            autoComplete="name"
            value={details.name}
            onChange={(e) => update('name')(e.target.value)}
            className={inputClass}
            placeholder="e.g. Asha Verma"
          />
        </Field>
        <Field label="Phone number" error={errors.phone}>
          <input
            type="tel"
            autoComplete="tel"
            value={details.phone}
            onChange={(e) => update('phone')(e.target.value)}
            className={inputClass}
            placeholder="+91 98765 43210"
          />
        </Field>
      </div>

      <Field label="Email address" error={errors.email}>
        <input
          type="email"
          autoComplete="email"
          value={details.email}
          onChange={(e) => update('email')(e.target.value)}
          className={inputClass}
          placeholder="you@example.com"
        />
      </Field>

      <Field label="Reason for visit (optional)">
        <textarea
          rows={3}
          value={details.reason}
          onChange={(e) => update('reason')(e.target.value)}
          className={inputClass}
          placeholder="Briefly describe your symptoms or concern"
        />
      </Field>

      {submitError && (
        <p role="alert" className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:-translate-y-0.5 hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting ? 'Booking...' : 'Confirm appointment'}
        </button>
      </div>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-slate-700">{label}</span>
      {children}
      {error && <span className="mt-2 block text-sm text-red-600">{error}</span>}
    </label>
  );
}
