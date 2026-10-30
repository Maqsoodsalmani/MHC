import { AlertCircle, ArrowRight, Award, Briefcase, Loader2 } from 'lucide-react';
import type { Doctor } from '@/lib/types';
import type { DoctorDirectory } from '@/hooks/useDoctors';

type DoctorsProps = {
  directory: DoctorDirectory;
  onBookDoctor: (doctorId: string) => void;
};

export default function Doctors({ directory, onBookDoctor }: DoctorsProps) {
  const { status, doctors, reload } = directory;

  return (
    <section id="doctors" className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wider text-accent-600">Our doctors</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl">
              Meet your specialists
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Experienced doctors who listen, explain clearly and follow up with you.
            </p>
          </div>
        </div>

        {status === 'loading' && (
          <div className="mt-14 flex items-center justify-center gap-3 text-slate-600">
            <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
            Loading our doctors...
          </div>
        )}

        {status === 'error' && (
          <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-red-100 bg-white p-8 text-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <p className="text-slate-700">We could not load our doctors right now.</p>
            <button
              type="button"
              onClick={reload}
              className="rounded-full bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Try again
            </button>
          </div>
        )}

        {status === 'ready' && doctors.length === 0 && (
          <p className="mt-14 text-center text-slate-600">No doctors are listed yet. Please check back soon.</p>
        )}

        {status === 'ready' && doctors.length > 0 && (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} onBook={() => onBookDoctor(doctor.id)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function DoctorCard({ doctor, onBook }: { doctor: Doctor; onBook: () => void }) {
  const initials = doctor.name
    .replace(/^Dr\.?\s*/i, '')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="group flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-900/5">
      <div className="flex items-center gap-4">
        <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-xl font-bold text-white shadow-md shadow-primary-600/20">
          {initials}
        </span>
        <div>
          <h3 className="text-lg font-bold text-primary-900">{doctor.name}</h3>
          <p className="text-sm font-semibold text-accent-700">{doctor.specialty}</p>
        </div>
      </div>

      <div className="mt-6 space-y-2 text-sm text-slate-600">
        <p className="flex items-center gap-2">
          <Award className="h-4 w-4 text-primary-500" />
          {doctor.qualification}
        </p>
        <p className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-primary-500" />
          {doctor.experience_years} years of experience
        </p>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{doctor.bio}</p>

      <button
        type="button"
        onClick={onBook}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-primary-200 px-5 py-2.5 text-sm font-semibold text-primary-700 transition-all hover:border-primary-600 hover:bg-primary-600 hover:text-white"
      >
        Book with {doctor.name}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </article>
  );
}
