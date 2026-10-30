import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Doctors from '@/components/home/Doctors';
import HowItWorks from '@/components/home/HowItWorks';
import BookingSection, { type DoctorPreselection } from '@/components/booking/BookingSection';
import { useDoctors } from '@/hooks/useDoctors';

function App() {
  const directory = useDoctors();
  const [preselection, setPreselection] = useState<DoctorPreselection | null>(null);

  const handleBookDoctor = (doctorId: string) => {
    setPreselection({ doctorId });
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Doctors directory={directory} onBookDoctor={handleBookDoctor} />
        <HowItWorks />
        <BookingSection
          doctors={directory.status === 'ready' ? directory.doctors : []}
          preselection={preselection}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
