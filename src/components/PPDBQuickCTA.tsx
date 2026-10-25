'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Download, MessageCircle, CheckCircle2 } from 'lucide-react';
import { SCHOOL_INFO } from '@/data/schoolData';

export default function PPDBQuickCTA() {
  const handleDownloadBrochure = () => {
    alert("Simulasi Download: Brosur Panduan PPDB Sekolah-Q TA 2026/2027 berhasil diunduh.");
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-navy-950 via-primary-950 to-navy-900 text-white relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-gold/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-primary-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-center space-y-6 sm:space-y-8">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
          Siap Mewujudkan Masa Depan Gemilang di Sekolah-Q?
        </h2>

        <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Pendaftaran Gelombang 1 Jalur Prestasi dan Minat Bakat dibuka hingga 30 Mei 2026. Kuota terbatas 360 siswa untuk 10 rombongan belajar unggulan.
        </p>

        {/* Feature bullets */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-8 text-xs sm:text-sm text-slate-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Tanpa Biaya Tes Minat Bakat</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0" />
            <span>Tersedia Beasiswa Tahfidz & Prestasi</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Fasilitas Ruang Ber-AC & Smart Projector</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
          <Link
            href="/ppdb"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-accent-gold hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-base shadow-glow-gold transition-all duration-200 active:scale-95 group min-h-[48px]"
          >
            <span>Pelajari Alur & Syarat PPDB</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href={`https://wa.me/6281234567890?text=Halo%20Panitia%20PPDB%20Sekolah-Q,%20saya%20ingin%20konsultasi%20pendaftaran`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-base shadow-md transition-all duration-200 active:scale-95 min-h-[48px]"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Konsultasi WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={handleDownloadBrochure}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-base border border-white/20 backdrop-blur-md transition-all duration-200 active:scale-95 min-h-[48px]"
          >
            <Download className="w-4 h-4 text-accent-gold" />
            <span>Download Brosur PDF</span>
          </button>
        </div>

        <div className="text-[11px] sm:text-xs text-slate-400 pt-2">
          Layanan informasi pendaftaran buka setiap hari kerja pukul 08.00 - 15.00 WIB
        </div>

      </div>
    </section>
  );
}
