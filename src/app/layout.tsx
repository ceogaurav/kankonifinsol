import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://www.kankonifinsol.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kankoni Finsol — India's Premium Financial Solutions Partner",
    template: "%s | Kankoni Finsol",
  },
  description:
    "Kankoni Finsol is India's premium financial solutions company. Get instant approval from 100+ banks on personal, business, home, mortgage & working capital loans. One application, multiple banks, lowest interest rates, doorstep service.",
  keywords: [
    "Kankoni Finsol",
    "personal loan India",
    "business loan",
    "home loan",
    "loan against property",
    "mortgage loan",
    "working capital loan",
    "OD CC",
    "machinery loan",
    "construction finance",
    "balance transfer",
    "car loan",
    "gold loan",
    "insurance",
    "credit cards",
    "mutual funds",
    "MSME finance",
    "project finance",
    "startup funding",
    "CIBIL improvement",
    "financial consultation",
    "best loan aggregator India",
  ],
  authors: [{ name: "Kankoni Finsol" }],
  creator: "Kankoni Finsol",
  publisher: "Kankoni Finsol",
  alternates: { canonical: siteUrl },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Kankoni Finsol — India's Premium Financial Solutions Partner",
    description:
      "Your complete financial partner. Get instant approval from 100+ banks with one application. Lowest rates, fast approval, 100% digital.",
    url: siteUrl,
    siteName: "Kankoni Finsol",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kankoni Finsol — India's Premium Financial Solutions Partner",
    description:
      "Your complete financial partner. Instant approval from 100+ banks. One application. Lowest rates.",
  },
  category: "finance",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1020" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "Kankoni Finsol",
  description:
    "India's premium financial solutions company providing complete financial services under one platform.",
  url: siteUrl,
  telephone: "+91-90000-00000",
  email: "care@kankonifinsol.com",
  areaServed: "IN",
  priceRange: "₹₹",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "10000",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Loan & Financial Products",
    itemListElement: [
      "Personal Loan",
      "Business Loan",
      "Home Loan",
      "Loan Against Property",
      "Mortgage Loan",
      "Working Capital Loan",
      "OD/CC",
      "Machinery Loan",
      "Construction Finance",
      "Balance Transfer",
      "Used Car Loan",
      "New Car Loan",
      "Gold Loan",
      "Insurance",
      "Credit Cards",
      "Investment Products",
      "Mutual Funds",
      "MSME Finance",
      "Project Finance",
      "Startup Funding",
      "CIBIL Improvement",
      "Financial Consultation",
    ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${sora.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <SonnerToaster position="top-center" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
