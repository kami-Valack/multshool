import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Akaedem Multischool - Instituições",
  description: "Akaedem Multischool: Gestão institucional facilitada.",
  icons: {
    icon: "/assets/icon_white.png",
    apple: "/assets/icon_white.png",
  },
  openGraph: {
    title: "Akaedem Multischool - Instituições",
    description: "Gestão institucional facilitada",
    url: "https://teu-dominio.com",
    siteName: "Portal do Estudante",
    images: [
      {
        url: "/assets/icon_white.png",
        width: 1200,
        height: 630,
        alt: "Pré-visualização do Sistema de Gestão institucional facilitada",
      },
    ],
    locale: "pt_PT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portal do Estudante - Multischool",
    description:
      "Plataforma digital para estudantes gerirem documentos, exames e muito mais.",
    images: ["/og-image.png"],
  },
};

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={poppins.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
