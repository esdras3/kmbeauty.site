import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { AuthorityBar } from "@/components/sections/AuthorityBar";
import { ProcedimentosDestaque } from "@/components/sections/ProcedimentosDestaque";
import { AboutSection } from "@/components/sections/AboutSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { DifferentialsSection } from "@/components/sections/DifferentialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFab } from "@/components/sections/WhatsAppFab";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AuthorityBar />
        <ProcedimentosDestaque />
        <AboutSection />
        <TestimonialsSection />
        <DifferentialsSection />
        <FaqSection />
        <LeadFormSection />
        <FinalCtaSection />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
