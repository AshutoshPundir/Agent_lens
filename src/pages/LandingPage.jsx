import AnimatedBackground from "../components/ui/AnimatedBackground";
import LandingNavbar from "../components/landing/LandingNavbar";
import HeroSection from "../components/landing/HeroSection";
import AboutSection from "../components/landing/AboutSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import StatsSection from "../components/landing/StatsSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import ShowcaseSection from "../components/landing/ShowcaseSection";
import CTASection from "../components/landing/CTASection";
import LandingFooter from "../components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <AnimatedBackground />
      <LandingNavbar />
      <main className="relative" style={{ zIndex: 1 }}>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <HowItWorksSection />
        <StatsSection />
        <TestimonialsSection />
        <ShowcaseSection />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  );
}
