'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Trophy, 
  Clock, 
  User, 
  Sparkles, 
  ChevronRight, 
  ArrowRight,
  ShieldAlert,
  Flame
} from 'lucide-react';
import { EXTRACURRICULARS } from '@/data/schoolData';

export default function EkstrakurikulerPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Kepemimpinan', 'Akademik', 'Olahraga', 'Seni & Budaya'];

  const filteredEkskul = selectedCategory === 'Semua'
    ? EXTRACURRICULARS
    : EXTRACURRICULARS.filter(e => e.category === selectedCategory);

  return (
    <div className="bg-white text-slate-900 pb-24">
      
      {/* Top Banner */}
      <div className="bg-navy-950 text-white py-14 sm:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-primary-950/70 to-navy-900" />
        <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-accent-gold uppercase tracking-wider">
            <Link href="/" className="hover:underline">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Ekstrakurikuler</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Kegiatan Ekstrakurikuler
          </h1>
          <p className="text-slate-300 text-xs sm:text-base max-w-2xl">
            Wadah pengembangan minat, bakat, kepemimpinan, dan sportivitas siswa di luar jam tatap muka akademik.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-10 sm:pt-12 space-y-10 sm:space-y-12">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Ekstrakurikuler Grid - 2 Columns on Mobile, 3 on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {filteredEkskul.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50/70 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-32 sm:h-52 w-full overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                    <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-navy-950/80 backdrop-blur-md text-white text-[9px] sm:text-[11px] font-bold">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 sm:p-6 space-y-2 sm:space-y-3">
                  <h3 className="text-sm sm:text-xl font-bold text-navy-950 group-hover:text-primary-600 transition-colors line-clamp-1">
                    {item.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {item.description}
                  </p>

                  <div className="pt-2 space-y-1.5 sm:space-y-2 border-t border-slate-200/60 text-[10px] sm:text-xs text-slate-500">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Clock className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                      <span className="truncate">{item.schedule}</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <User className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                      <span className="truncate">Pembina: {item.mentor}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievement Badge */}
              <div className="px-3.5 pb-3.5 sm:px-6 sm:pb-6 pt-1 sm:pt-2">
                <div className="p-2 sm:p-3 rounded-xl bg-amber-50 border border-amber-200/70 text-[10px] sm:text-xs text-amber-900 flex items-start gap-1.5 sm:gap-2">
                  <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[9px] sm:text-[10px] text-amber-800 uppercase">Prestasi:</span>
                    <span className="line-clamp-1 sm:line-clamp-2">{item.achievements}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
