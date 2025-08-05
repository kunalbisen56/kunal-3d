import Navigation from "@/components/Navigation";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import VideoSection from "@/components/VideoSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LoadingScreen />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ServicesSection />
      <VideoSection />
      <ContactSection />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;