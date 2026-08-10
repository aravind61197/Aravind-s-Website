import type { Metadata } from "next";
import "@fontsource-variable/nunito-sans";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aravindux.com"),
  title: "Aravind V — Product & UX Designer",
  description: "Product-focused UX designer creating intelligent enterprise experiences with measurable impact.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Aravind V — Product & UX Designer",
    description: "Complex products. Obvious experiences.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Aravind V, Product and UX Designer" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
