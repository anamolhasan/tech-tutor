import type { Metadata } from "next";

import CtaSection from "@/components/tech-tutor/cta-section";
import HeroSection from "@/components/tech-tutor/hero-section";
import QuickStart from "@/components/tech-tutor/quick-start";

export const metadata: Metadata = {
  title: "Tech Tutor — বাংলা ওয়েব ডেভেলপমেন্ট ডকুমেন্টেশন",
  description:
    "HTML থেকে Next.js পর্যন্ত জনপ্রিয় সব প্রযুক্তির বাংলা ডকুমেন্টেশন — ধাপে ধাপে, উদাহরণ ও কোড সহ।",
};

const TechTutorIndex = () => {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Quick start */}
      <QuickStart />

       {/* CTA */}
      <CtaSection />

    

     
    </>
  );
};

export default TechTutorIndex;