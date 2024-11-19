import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { ParticleAuthkit } from "@/app/components/Authkit";

export const metadata: Metadata = {
  title: "Particle Auth App",
  description: "An application leveraging Particle Auth for social logins.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ParticleAuthkit>{children}</ParticleAuthkit>
      </body>
    </html>
  );
}
