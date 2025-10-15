import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Harish Kumar Babry - Telecom Systems & Infrastructure Leader",
  description: "Experienced engineering and technology leader with 30+ years in telecom and IT infrastructure. Specializing in AI, digital transformation, and project management.",
  keywords: ["Project Management", "PMP", "Telecom Systems", "AI", "Digital Transformation", "Infrastructure", "Blockchain", "Engineering"],
  authors: [{ name: "Harish Kumar Babry" }],
  openGraph: {
    title: "Harish Kumar Babry - Engineering & Technology Leader",
    description: "30+ years of experience in telecom and IT infrastructure projects. AI enthusiast and digital transformation expert.",
    type: "website",
    url: "https://harishbabry.dev",
    images: [
      {
        url: "/HarishBabry-logo.png",
        width: 1200,
        height: 630,
        alt: "Harish Kumar Babry - Engineering & Technology Leader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harish Kumar Babry - Engineering & Technology Leader",
    description: "30+ years of experience in telecom and IT infrastructure projects. AI enthusiast and digital transformation expert.",
  },
  icons: {
    icon: "/HarishBabry-logo.png",
    shortcut: "/HarishBabry-logo.png",
    apple: "/HarishBabry-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
