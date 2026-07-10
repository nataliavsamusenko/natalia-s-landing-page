import { createFileRoute } from "@tanstack/react-router";
import { AudienceProvider, useAudience } from "@/components/landing/audience";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { TrustStrip } from "@/components/landing/trust-strip";
import { BusinessBlock } from "@/components/landing/business-block";
import { FinanceBlock } from "@/components/landing/finance-block";
import { Glossary } from "@/components/landing/glossary";
import { Testimonials } from "@/components/landing/testimonials";
import { ContactForm } from "@/components/landing/contact-form";
import { Footer } from "@/components/landing/footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <AudienceProvider>
      <div className="relative min-h-screen">
        <Header />
        <main>
          <Hero />
          <TrustStrip />
          <AudienceSections />
          <Glossary />
          <Testimonials />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </AudienceProvider>
  );
}

function AudienceSections() {
  const { audience } = useAudience();
  return (
    <>
      <BusinessBlock hidden={audience !== "business"} />
      <FinanceBlock hidden={audience !== "finance"} />
    </>
  );
}
