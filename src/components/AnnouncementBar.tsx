'use client';

import React from 'react';
import Link from 'next/link';
import { Megaphone, MapPin } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-[#050c18] text-slate-300 text-xs py-2 border-b border-white/10 hidden md:block select-none w-full">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 flex items-center justify-between gap-6">
        
        {/* SISI KIRI: Headline Pengumuman & Tagline PPDB */}
        <div className="flex items-center gap-2.5 min-w-0">
          <Megaphone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="font-semibold text-white">
              PPDB Tahun Ajaran 2026/2027 Resmi Dibuka
            </span>
            <span className="text-slate-600">|</span>
            <Link href="/ppdb" className="text-slate-300 hover:text-amber-400 transition-colors">
              Raih Masa Depan Bersama SEKOLAH-Q
            </Link>
          </div>
        </div>

        {/* SISI KANAN: Lokasi & Nilai Utama */}
        <div className="flex items-center gap-3 text-[11px] sm:text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>Gresik, Jawa Timur</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">
            Islami • Berprestasi • Mendunia
          </span>
        </div>

      </div>
    </div>
  );
}
