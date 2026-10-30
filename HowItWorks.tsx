import { CalendarPlus, MailCheck, Stethoscope } from 'lucide-react';

const STEPS = [
  {
    icon: Stethoscope,
    title: 'Choose your doctor',
    description: 'Browse our specialists and pick the one who fits your need.',
  },
  {
    icon: CalendarPlus,
    title: 'Pick a date and time',
    description: 'See live availability and select a slot that works for your schedule.',
  },
  {
    icon: MailCheck,
    title: 'Get confirmed instantly',
    description: 'You and your doctor receive the details by email and SMS straight away.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-accent-600">How it works</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl">
            Three simple steps to care
          </h2>
        </div>

        <div className="relative mt-16 grid gap-10 md:grid-cols-3">
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-8 hidden h-px border-t-2 border-dashed border-primary-200 md:block" />
          {STEPS.map(({ icon: Icon, title, description }, index) => (
            <div key={title} className="relative text-center">
              <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 text-white shadow-lg shadow-primary-600/25">
                <Icon className="h-7 w-7" />
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold text-primary-700 shadow ring-1 ring-primary-100">
                  {index + 1}
                </span>
              </span>
              <h3 className="mt-6 text-xl font-bold text-primary-900">{title}</h3>
              <p className="mx-auto mt-3 max-w-xs leading-relaxed text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
