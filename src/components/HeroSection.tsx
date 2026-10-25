'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  GraduationCap,
  ChevronRight,
  Award,
  Users,
  HeartHandshake,
  Cog,
  Leaf
} from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-[#071329] text-white overflow-hidden min-h-[90vh] flex flex-col justify-between pt-6 pb-6 sm:pb-8">

      {/* Background Hero Image with Seamless Integrated Backdrop */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-perfect-backdrop.webp"
          alt="Siswa Sekolah-Q Berprestasi"
          fill
          priority
          className="object-cover object-right lg:object-center"
        />
        {/* Subtle top edge blend for navbar */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#081326] to-transparent pointer-events-none" />
      </div>

      {/* Main Left Content Area */}
      <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 my-auto py-6 sm:py-8">
        <div className="max-w-[580px] lg:max-w-[640px] xl:max-w-[680px] space-y-4">

          {/* Top Pill Badge (Graduation Cap + Gold Border) */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a1832]/85 border border-amber-400 text-amber-400 text-[11px] sm:text-xs font-bold tracking-wider backdrop-blur-md shadow-sm">
            <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>PPDB 2026/2027 TELAH DIBUKA</span>
          </div>

          {/* Subtitle / Pre-headline with horizontal divider line */}
          <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-bold tracking-[0.18em] text-sky-400 uppercase pt-1">
            <span>A WORLD-CLASS LEARNING COMMUNITY IN GRESIK</span>
            <span className="h-px w-7 bg-sky-400/50 inline-block"></span>
          </div>

          {/* Headline: Exactly 3 Lines with clear spacing between each line */}
          <h1 className="text-[25px] min-[370px]:text-[27px] sm:text-4xl md:text-[44px] lg:text-[48px] xl:text-[52px] font-extrabold tracking-tight text-white flex flex-col gap-1.5 sm:gap-2 md:gap-3">
            <span className="block whitespace-nowrap leading-tight">Membentuk Pemimpin</span>
            <span className="block whitespace-nowrap leading-tight">Masa Depan,</span>
            <span className="block whitespace-nowrap font-editorial italic font-normal text-amber-400 leading-tight">
              Berkarakter &amp; Berprestasi
            </span>
          </h1>

          {/* Descriptive Body Text */}
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal pt-2 sm:pt-3 max-w-[470px]">
            Kurikulum Merdeka terintegrasi standar global, pembinaan tahfidz Al-Qur'an, dan sains robotika dengan fasilitas representatif untuk memaksimalkan kecerdasan putra-putri Anda.
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/ppdb"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md transition-all duration-200 active:scale-95 group"
            >
              <span>Daftar Sekarang</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5] transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/profil"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm text-white bg-[#0a1a36]/60 hover:bg-[#0a1a36]/90 border border-white/25 backdrop-blur-sm transition-all duration-200 active:scale-95 group"
            >
              <span>Jelajahi Sekolah</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5] transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Trust Badges directly underneath buttons */}
          <div className="pt-4 flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-5 text-xs">

            {/* Terakreditasi A */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white text-xs sm:text-sm">Terakreditasi A</div>
                <div className="text-[11px] text-slate-300">Kualitas pendidikan terjamin</div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-7 w-px bg-white/20 hidden sm:block" />

            {/* 1.250+ Siswa & Alumni */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-sky-400/20 border border-sky-400/40 flex items-center justify-center text-sky-400 shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white text-xs sm:text-sm">1.250+ Siswa & Alumni</div>
                <div className="text-[11px] text-slate-300">Komunitas yang terus tumbuh</div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Floating 4-Pillars Dock (Docked at Bottom Edge of Hero) - 2 Columns on Mobile, 4 on Desktop */}
      <div className="relative z-10 w-full max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-12 xl:px-16 mt-auto">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-3.5 px-3 sm:py-4 sm:px-6 md:px-8 text-slate-900">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 divide-y-0 sm:divide-x divide-slate-100">

            {/* Pillar 1: Academic Excellence */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 sm:px-3 first:pl-0 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-xs sm:text-sm text-navy-950 group-hover:text-primary-600 transition-colors truncate">
                  Academic Excellence
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-500 leading-tight mt-0.5 line-clamp-2">
                  Kurikulum berkualitas dan riset.
                </p>
              </div>
            </div>

            {/* Pillar 2: Holistic Character */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 sm:px-3 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-105 transition-transform">
                <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-xs sm:text-sm text-navy-950 group-hover:text-primary-600 transition-colors truncate">
                  Holistic Character
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-500 leading-tight mt-0.5 line-clamp-2">
                  Akhlak mulia dan kepemimpinan.
                </p>
              </div>
            </div>

            {/* Pillar 3: STEM & Digital Mastery */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 sm:px-3 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-105 transition-transform">
                <Cog className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-xs sm:text-sm text-navy-950 group-hover:text-primary-600 transition-colors truncate">
                  STEM & Digital
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-500 leading-tight mt-0.5 line-clamp-2">
                  Sains, robotika & inovasi digital.
                </p>
              </div>
            </div>

            {/* Pillar 4: Eco & Global Vision */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 sm:px-3 last:pr-0 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-105 transition-transform">
                <Leaf className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-xs sm:text-sm text-navy-950 group-hover:text-primary-600 transition-colors truncate">
                  Eco & Global Vision
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-500 leading-tight mt-0.5 line-clamp-2">
                  Peduli lingkungan & berwawasan global.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
