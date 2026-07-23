import type { Metadata } from "next";
import { Roboto, Space_Grotesk } from "next/font/google";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SITE } from "@/lib/constants";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
