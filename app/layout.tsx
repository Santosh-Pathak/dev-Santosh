import type { Metadata } from "next";
import { JetBrains_Mono, Syne, Outfit } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ThemeProvider } from "@/context/ThemeContext";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Display / heading font — bold geometric with distinctive letterforms
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

// Body font — clean modern sans
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Santosh Pathak · Portfolio",
  description:
    "Software Development Engineer at Tedekstra — Full-Stack Engineering, Cloud & DevOps, System Design. Building scalable and production-ready systems.",
  openGraph: {
    title: "Santosh Pathak · Portfolio",
    description:
      "Software Development Engineer at Tedekstra — Full-Stack, Cloud & DevOps, System Design.",
    url: "https://santosh-pathak-portfolio.vercel.app/",
    siteName: "Santosh Pathak Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Santosh Pathak · Portfolio",
    description: "Software Development Engineer at Tedekstra — Full-Stack, Cloud & DevOps.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${syne.variable} ${outfit.variable}`}>
      <body className="font-sans bg-vscode-bg text-vscode-text-primary antialiased">
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
