import Nav from '@/components/Nav/Nav';
import Hero from '@/components/Hero/Hero';
import Work from '@/components/Work/Work';
import About from '@/components/About/About';
import Process from '@/components/Process/Process';
import Skills from '@/components/Skills/Skills';
import Contact from '@/components/Contact/Contact';

export default function HomePage() {
  return (
    <main id="main-content">
      <Nav />
      <Hero />
      <Work />
      <About />
      <Process />
      <Skills />
      <Contact />
    </main>
  );
}
