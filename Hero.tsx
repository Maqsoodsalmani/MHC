import { CalendarCheck, ShieldCheck, Stethoscope } from 'lucide-react';

const HERO_IMAGE =
  'https://images.pexels.com/photos/7579823/pexels-photo-7579823.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const TRUST_POINTS = [
  { icon: Stethoscope, label: 'Verified specialists' },
  { icon: CalendarCheck, label: 'Pick a time that suits you' },
  { icon: ShieldCheck, label: 'Private and secure' },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-primary-100/80 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-200 bg-white px-4 py-1.5 text-sm font-semibold text-accent-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-accent-500" />
            Online doctor appointments, made simple
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.15] tracking-tight text-primary-900 sm:text-5xl lg:text-6xl">
            Find the right doctor and <span className="text-primary-600">book in minutes</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            MHS connects you with trusted specialists. Choose your doctor, pick a date and time slot,
            and receive instant confirmation by email and SMS.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#book"
              className="inline-flex items-center justify-center rounded-full bg-primary-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:-translate-y-0.5 hover:bg-primary-700"
            >
              Book an appointment
            </a>
            <a
              href="#doctors"
              className="inline-flex items-center justify-center rounded-full border border-primary-200 bg-white px-8 py-3.5 text-base font-semibold text-primary-700 transition-colors hover:border-primary-400 hover:bg-primary-50"
            >
              Meet our doctors
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {TRUST_POINTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Icon className="h-5 w-5 text-accent-600" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative animate-fade-up [animation-delay:150ms]">
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary-200/60 to-accent-200/60 blur-xl" />
          <img
            src={HERO_IMAGE}
            alt="A doctor consulting a patient in a modern medical office"
            className="relative h-[420px] w-full rounded-[2rem] object-cover shadow-2xl shadow-primary-900/15 lg:h-[520px]"
          />
          <div className="absolute -bottom-6 left-6 right-6 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-xl shadow-primary-900/10 sm:left-auto sm:right-auto sm:w-80 sm:-left-8">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-700">
              <CalendarCheck className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-bold text-primary-900">Appointment confirmed</p>
              <p className="text-xs text-slate-500">Confirmation sent to your email and phone</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
