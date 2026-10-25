import React from 'react';
import HeroSection from '@/components/HeroSection';
import StatsBanner from '@/components/StatsBanner';
import WhyChooseUs from '@/components/WhyChooseUs';
import ProgramsShowcase from '@/components/ProgramsShowcase';
import NewsAndEventsSection from '@/components/NewsAndEventsSection';
import AlumniAndTestimonials from '@/components/AlumniAndTestimonials';
import FAQAccordionSection from '@/components/FAQAccordionSection';
import PPDBQuickCTA from '@/components/PPDBQuickCTA';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBanner />
      <WhyChooseUs />
      <ProgramsShowcase />
      <NewsAndEventsSection />
      <AlumniAndTestimonials />
      <FAQAccordionSection />
      <PPDBQuickCTA />
    </>
  );
}
