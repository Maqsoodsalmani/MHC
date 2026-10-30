import { Activity, Baby, Bone, HeartPulse, Scan, Sparkles } from 'lucide-react';

const SERVICES = [
  { icon: HeartPulse, title: 'Cardiology', description: 'Heart health checks, blood pressure care and long-term cardiac follow-ups.' },
  { icon: Sparkles, title: 'Dermatology', description: 'Skin, hair and nail treatments from specialists who keep you looking and feeling your best.' },
  { icon: Baby, title: 'Pediatrics', description: 'Gentle, thorough care for newborns, children and teens, including vaccinations.' },
  { icon: Bone, title: 'Orthopedics', description: 'Bone, joint and sports injury consultations with clear, practical treatment plans.' },
  { icon: Activity, title: 'General Consultation', description: 'Everyday illnesses, routine check-ups and referrals when you need a second opinion.' },
  { icon: Scan, title: 'Diagnostics', description: 'Guidance on tests and reports, so you understand your results before you leave.' },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-accent-600">Our services</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl">
            Care for every stage of life
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            From routine check-ups to specialist consultations, book the care you need with a few clicks.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="group rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-100 hover:shadow-xl hover:shadow-primary-900/5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-primary-900">{title}</h3>
              <p className="mt-3 leading-relaxed text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
