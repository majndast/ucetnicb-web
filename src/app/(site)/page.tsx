import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Stats } from "@/components/stats";
import { About } from "@/components/about";
import { Pricing } from "@/components/pricing";
import { Contact } from "@/components/contact";

const SITE_URL = "https://ucetnicb-web.vercel.app";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "Účetnictví Kotmanová",
  alternateName: "Šárka Kotmanová - účetní služby",
  description:
    "Kompletní vedení účetnictví, daňová evidence, mzdy a daňové poradenství v Českých Budějovicích. Šárka Kotmanová - vaše spolehlivá účetní s více než 18 lety zkušeností.",
  url: SITE_URL,
  telephone: "+420724159681",
  email: "info@ucetnicb.cz",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Novohradská",
    addressLocality: "České Budějovice",
    addressCountry: "CZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.9745,
    longitude: 14.4747,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  founder: {
    "@type": "Person",
    name: "Šárka Kotmanová",
    jobTitle: "Účetní poradkyně",
  },
  areaServed: {
    "@type": "City",
    name: "České Budějovice",
  },
  priceRange: "$$",
  knowsLanguage: "cs",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Účetní služby",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Vedení účetnictví",
          description:
            "Kompletní vedení podvojného účetnictví pro právnické i fyzické osoby včetně účetní závěrky.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Daňová evidence",
          description:
            "Přehledná daňová evidence pro OSVČ. Jednoduché a transparentní zpracování.",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "2000",
          priceCurrency: "CZK",
          unitText: "měsíc",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Daňové přiznání",
          description:
            "Zpracování všech typů daňových přiznání včetně kontrolního hlášení k DPH.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mzdová agenda",
          description:
            "Kompletní zpracování mezd, personální agendy a komunikace s úřady.",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "250",
          priceCurrency: "CZK",
          unitText: "zaměstnanec/měsíc",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Daňové poradenství",
          description:
            "Odborné poradenství v oblasti daní, optimalizace daňové zátěže a plánování.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Zastupování na úřadech",
          description:
            "Zastupování před finančním úřadem, ČSSZ a zdravotními pojišťovnami.",
        },
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Kolik stojí vedení účetnictví v Českých Budějovicích?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cena za vedení daňové evidence začíná od 2 000 Kč měsíčně, podvojné účetnictví od 4 000 Kč měsíčně a mzdová agenda od 250 Kč za zaměstnance. Konečná cena závisí na rozsahu a složitosti vašeho účetnictví.",
      },
    },
    {
      "@type": "Question",
      name: "Jaké služby nabízíte?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nabízíme kompletní vedení podvojného účetnictví, daňovou evidenci pro OSVČ, zpracování daňových přiznání, mzdovou agendu, zastupování na úřadech a daňové poradenství.",
      },
    },
    {
      "@type": "Question",
      name: "Pro koho jsou vaše služby určeny?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Naše služby jsou určeny pro OSVČ, malé a střední podniky, s.r.o. a další právnické osoby v Českých Budějovicích a okolí.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Úvod",
      item: SITE_URL,
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Hero />
      <Services />
      <Stats />
      <About />
      <Pricing />
      <Contact />
    </>
  );
}
