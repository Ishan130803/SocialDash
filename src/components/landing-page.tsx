import { ConnectSection } from "@/features/landing-page/components/connect-section";
import { HeroSection } from "@/features/landing-page/components/hero-section";
import { StatsSection } from "@/features/landing-page/components/stats-section";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ConnectSection />
    </>
  );
}
