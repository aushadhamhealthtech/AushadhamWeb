import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import HowItWorksSection from "@/components/sections/how-it-works-section";
import MissionSection from "@/components/sections/mission-section";
import VisionSection from "@/components/sections/vision-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import ExpertsSection from "@/components/sections/experts-section";
import DoctorsCTASection from "@/components/sections/doctors-cta-section";
import AnimationProvider from "@/components/animation-provider";

export default function HomePage() {
  return (
    <AnimationProvider>
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <HeroSection />
        <HowItWorksSection />
        <MissionSection />
        <VisionSection />
        <TestimonialsSection />
        <ExpertsSection />
        <DoctorsCTASection />
        <Footer />
      </main>
    </AnimationProvider>
  );
}
