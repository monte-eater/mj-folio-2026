import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.montaguejoachim.com.au";

const defaultTitle = "Montague Joachim — Portfolio";
const defaultDescription =
  "UX/UI Designer driven by a passion for solving complex problems with creative, user-centred solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultTitle,
  description: defaultDescription,
  openGraph: {
    type: "website",
    siteName: "Montague Joachim",
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  verification: {
    google: "NEk1VPh6dAGGXjdvBiwrexYoX8ZfJonBPqzo0FKxNZQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
