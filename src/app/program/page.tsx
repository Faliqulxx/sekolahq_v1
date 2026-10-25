'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  GraduationCap, 
  Languages, 
  BookOpen, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ChevronRight,
  Monitor,
  Target,
  Award
} from 'lucide-react';
import { PROGRAMS } from '@/data/schoolData';

const iconMap: Record<string, React.ElementType> = {
  GraduationCap: GraduationCap,
  Languages: Languages,
  BookOpen: BookOpen,
  Cpu: Cpu,
};

export default function ProgramPage() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredPrograms = activeTab === 'all' 
    ? PROGRAMS 
    : PROGRAMS.filter(p => p.category.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <div className="bg-white text-slate-900 pb-24">
      
      {/* Top Banner */}
      <div className="bg-navy-950 text-white py-14 sm:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-primary-950/70 to-navy-900" />
        <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-accent-gold uppercase tracking-wider">
            <Link href="/" className="hover:underline">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Program Unggulan</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Program Unggulan Sekolah
          </h1>
          <p className="text-slate-300 text-xs sm:text-base max-w-2xl">
            Kurikulum terintegrasi yang dirancang untuk mengasah potensi intelektual, kecakapan global, kemandirian spiritual, dan kecakapan teknologi masa depan.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-10 sm:pt-12 space-y-12 sm:space-y-16">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {[
            { id: 'all', label: 'Semua Program' },
            { id: 'akademik', label: 'Akademik Inti' },
            { id: 'bahasa', label: 'Bahasa & Global' },
            { id: 'spiritual', label: 'Spiritual & Karakter' },
            { id: 'teknologi', label: 'Sains & Teknologi' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Deep Dive Cards */}
        <div className="space-y-10 sm:space-y-16">
          {filteredPrograms.map((prog, index) => {
            const Icon = iconMap[prog.iconName] || GraduationCap;
            const isEven = index % 2 === 1;

            return (
              <div
                key={prog.id}
                id={prog.slug}
                className="scroll-mt-28 bg-slate-50/70 rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-slate-200/90 shadow-soft hover:shadow-card transition-all"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}>
                  
                  {/* Visual Image Column (5 cols) */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative h-48 sm:h-72 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-card border-2 border-white">
                      <Image
                        src={prog.imageUrl}
                        alt={prog.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                        <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-navy-950/80 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold shadow-sm">
                          {prog.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text & Features Column (7 cols) */}
                  <div className={`lg:col-span-7 space-y-3 sm:space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-primary-600">
                        {prog.category}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-navy-950 leading-tight">
                      {prog.title}
                    </h2>

                    <p className="text-xs sm:text-sm font-semibold text-slate-500">
                      {prog.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {prog.fullDescription}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 sm:space-y-2 pt-1 sm:pt-2">
                      <div className="text-[11px] sm:text-xs font-bold text-navy-950 uppercase tracking-wider">
                        Keunggulan Utama:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {prog.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Target Outcome */}
                    <div className="p-3 sm:p-4 rounded-xl bg-primary-50/60 border border-primary-100/80 text-xs text-primary-900 flex items-start gap-2.5 sm:gap-3 mt-3 sm:mt-4">
                      <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block mb-0.5">Target Capaian Kelulusan:</span>
                        <span>{prog.targetOutcome}</span>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="text-center bg-navy-950 text-white p-6 sm:p-12 rounded-2xl sm:rounded-3xl shadow-card space-y-4">
          <h3 className="text-xl sm:text-3xl font-extrabold">Tertarik dengan Program Kami?</h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Daftarkan putra-putri Anda pada PPDB Tahun Ajaran 2026/2027 atau konsultasikan peminatan kelas dengan panitia kami.
          </p>
          <div className="pt-2">
            <Link
              href="/ppdb"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-accent-gold hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 min-h-[44px]"
            >
              <span>Daftar PPDB Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
