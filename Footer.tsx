import { HeartPulse, Mail, MapPin, Phone } from 'lucide-react';

const QUICK_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#doctors', label: 'Doctors' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#book', label: 'Book online' },
];

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-primary-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3 lg:px-8">
        <div>
          <a href="#top" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
              <HeartPulse className="h-5 w-5" />
            </span>
            <span className="text-xl font-bold tracking-tight text-white">MHS</span>
          </a>
          <p className="mt-5 max-w-sm leading-relaxed text-primary-200">
            Trusted medical care, booked online. Find the right specialist and secure your consultation in minutes.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Explore</h4>
          <ul className="mt-5 space-y-3">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-primary-200 transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Contact</h4>
          <ul className="mt-5 space-y-4 text-primary-200">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-accent-300" />
              Support line available during clinic hours
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-accent-300" />
              Reach us through the booking form
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-accent-300" />
              Online consultations across all our clinics
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-6 py-6 text-sm text-primary-300 lg:px-8">
          &copy; {new Date().getFullYear()} MHS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
