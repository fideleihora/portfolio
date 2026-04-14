import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";
import { AIAssistant } from "@/components/AIAssistant";

export const metadata: Metadata = {
  title: "Ihorindengera Fidele | Portfolio",
  description: "Mathematics, Physics & Computer Science Specialist Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <CustomCursor />
            <Navbar />
            {children}
            <AIAssistant />
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
