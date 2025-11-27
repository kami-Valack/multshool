import { StyledComponentsProvider } from "../providers/StyledComponentsProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import DeviceDetector from "@/components/DeviceDetector";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import GlobalStyle from "@/styles/GlobalStyle";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Portal do Estudante - Multischool",
  description:
    "Portal de Estudantes Multischool: acede às tuas notas, horários, pagamentos, documentos e aulas online num único espaço digital.",
  icons: {
    icon: "/assets/icon_white.png",
    apple: "/assets/icon_white.png",
  },
  openGraph: {
    title: "Portal do Estudante - Multischool",
    description:
    "Portal de Estudantes Multischool: acede às tuas notas, horários, pagamentos, documentos e aulas online num único espaço digital.",
    url: "https://teu-dominio.com",
    siteName: "Portal do Estudante",
    images: [
      {
        url: "/assets/icon_white.png",
        width: 1200,
        height: 630,
        alt: "Pré-visualização do Portal do Estudante",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className={poppins.variable}>
      <body>
        <StyledComponentsProvider>
          <AuthProvider>
            {/* <GlobalStyle />  */}
            <DeviceDetector maxMobileWidth={468}>{children}</DeviceDetector>
          </AuthProvider>
        </StyledComponentsProvider>
      </body>
    </html>
  );
}
