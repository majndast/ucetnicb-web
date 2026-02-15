import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Stats } from "@/components/stats";
import { About } from "@/components/about";
import { Pricing } from "@/components/pricing";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <About />
      <Pricing />
      <Contact />
    </>
  );
}
