
import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CTASection";
import Footer from "./Footer";
import DemoSection from "./DemoSection";

const LandingPage = () => {
  return (
    <main className="overflow-hidden rounded-sm border border-solid bg-neutral-700 border-white border-opacity-10">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default LandingPage;
