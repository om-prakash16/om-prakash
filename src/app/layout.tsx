import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AnimatePresence } from "framer-motion";
import SmoothScroll from "@/components/ui/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const BASE_URL = "https://ommee.in";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Om Prakash Kumar — Python Developer & Technical Writer",
    template: "%s | Om Prakash Kumar",
  },
  description:
    "Om Prakash Kumar — Python developer, technical writer, and web developer. Skilled in Python automation, data processing (Pandas/NumPy), HTML/CSS, Tailwind, REST APIs, and SaaS tools like Bill.com. Currently working as Process Associate at SuntecIndia. Published at GeeksforGeeks.",
  keywords: [
    "Om Prakash Kumar",
    "Python Developer",
    "Technical Writer",
    "GeeksforGeeks",
    "SuntecIndia",
    "Process Associate",
    "Data Processing",
    "Pandas",
    "NumPy",
    "API Integration",
    "HTML CSS",
    "Web Development",
    "Tailwind CSS",
    "Bootstrap",
    "Bill.com",
    "React",
    "Next.js",
    "Automation",
    "Invoice Processing",
    "om-prakash16",
    "portfolio",
  ],
  authors: [{ name: "Om Prakash Kumar", url: "https://github.com/om-prakash16" }],
  creator: "Om Prakash Kumar",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Om Prakash Kumar Portfolio",
    title: "Om Prakash Kumar — Python Developer & Technical Writer",
    description:
      "Python developer, technical writer, and web developer. Skilled in Python, Pandas, REST APIs, HTML/CSS, Tailwind. Currently at SuntecIndia. Published at GeeksforGeeks.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Om Prakash Kumar Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@om_prakash_kr_",
    creator: "@om_prakash_kr_",
    title: "Om Prakash Kumar — Python Developer & Technical Writer",
    description:
      "Python developer, technical writer, web developer. Pandas | REST APIs | HTML/CSS | Bill.com | GeeksforGeeks.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Extra SEO: LinkedIn profile */}
        <link rel="me" href="https://linkedin.com/in/om-prakash-kr/" />
        <link rel="me" href="https://github.com/om-prakash16" />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#080810" />
        <meta name="color-scheme" content="dark" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Om Prakash Kumar",
              url: BASE_URL,
              sameAs: [
                "https://linkedin.com/in/om-prakash-kr/",
                "https://github.com/om-prakash16/",
                "https://x.com/om_prakash_kr_",
                "https://www.instagram.com/om_prakash__kr",
                "https://www.threads.com/@om_prakash__kr",
              ],
              jobTitle: "Process Associate & Python Developer",
              worksFor: { "@type": "Organization", name: "SuntecIndia" },
              knowsAbout: [
                "Python",
                "Data Processing",
                "Pandas",
                "NumPy",
                "REST APIs",
                "HTML",
                "CSS",
                "Tailwind CSS",
                "Technical Writing",
                "Web Development",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased overflow-x-hidden`}
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <SmoothScroll>
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </SmoothScroll>
      </body>
    </html>
  );
}
