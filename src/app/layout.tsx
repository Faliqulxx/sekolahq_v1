import type { Metadata } from "next";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  metadataBase: new URL('https://smpujungpangkah.sch.id'),
  title: "Sekolah-Q Gresik | Sekolah Penggerak Berkarakter & Berprestasi",
  description: "Website resmi konsep Sekolah-Q Kabupaten Gresik. Menampilkan informasi profil, program unggulan, ekstrakurikuler, galeri, dewan guru, dan PPDB TA 2026/2027.",
  keywords: [
    "Sekolah-Q",
    "SMP Gresik",
    "Sekolah Penggerak Gresik",
    "PPDB SMP 2026",
    "Kurikulum Merdeka",
    "Tahfidz SMP",
    "STEM Robotika SMP"
  ],
  authors: [{ name: "Faliqul Ishbah" }],
  openGraph: {
    title: "Sekolah-Q - Membentuk Pemimpin Masa Depan",
    description: "Kurikulum berstandar internasional, program tahfidz Al-Qur'an, dan sains robotika dengan fasilitas premium di Ujungpangkah Gresik.",
    images: ["/images/hero-students.webp"],
    type: "website",
    locale: "id_ID"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col bg-white text-slate-900 selection:bg-primary-100 selection:text-primary-900">
        <SiteShell>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
