import type { Metadata, Viewport } from "next";
import { Fraunces, Nunito, Outfit } from "next/font/google";
import { AppStoreProvider } from "@/store/app-store";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "MindGrow",
  description: "Descubre cómo aprende y progresa. Una plataforma lúdica para acompañar habilidades tempranas.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg" },
  appleWebApp: { capable: true, title: "MindGrow", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1a2744",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${fraunces.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <AppStoreProvider>{children}</AppStoreProvider>
      </body>
    </html>
  );
}
