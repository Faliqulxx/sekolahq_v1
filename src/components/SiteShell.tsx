'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/wali-kelas');

  // If in admin panel or homeroom teacher portal, do not render public AnnouncementBar, Navbar, or Footer
  if (isAppRoute) {
    return <div className="min-h-screen bg-[#F4F5FA] text-[#3A3541] antialiased">{children}</div>;
  }

  // Public site shell
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}
