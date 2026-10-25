'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  // If in admin panel, do not render public AnnouncementBar, Navbar, or Footer
  if (isAdmin) {
    return <div className="min-h-screen bg-slate-900 text-slate-100">{children}</div>;
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
