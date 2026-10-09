import type { Metadata } from "next";
import { Instrument_Sans, Young_Serif } from "next/font/google";
import "./globals.css";
import Bewegung from "@/components/Bewegung";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Young Serif für Titel und Preise (robust wie ein kopierter Aushang), Instrument Sans für alles andere.
const young = Young_Serif({ weight: "400", subsets: ["latin"], variable: "--font-young" });
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument" });

export const metadata: Metadata = {
  title: { default: "Leihbar", template: "%s – Leihbar" },
  description: "Leihen statt kaufen – Dinge am Campus anbieten, finden, anfragen.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${young.variable} ${instrument.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Bewegung>
          <Header />
          {children}
          <Footer />
        </Bewegung>
      </body>
    </html>
  );
}
