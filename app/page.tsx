import AnimationProvider from "@/components/animation-provider";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import HeroSection from "@/components/sections/hero-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import VisionSection from "@/components/sections/vision-section";

export default function RootPage() {
  return (
    <AnimationProvider>
      <Navbar />
      <main>
        <HeroSection />
        <VisionSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </AnimationProvider>
  );
}
