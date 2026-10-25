'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Users, 
  GraduationCap, 
  Quote, 
  ChevronRight, 
  Award, 
  BookOpen,
  Sparkles
} from 'lucide-react';
import { TEACHERS } from '@/data/schoolData';

export default function GuruPage() {
  const [selectedDivision, setSelectedDivision] = useState<string>('Semua');

  const divisions = ['Semua', 'Pimpinan', 'MIPA & Teknologi', 'Bahasa & Humaniora', 'Agama & Karakter'];

  const filteredTeachers = selectedDivision === 'Semua'
    ? TEACHERS
    : TEACHERS.filter(t => t.category === selectedDivision);

  return (
    <div className="bg-white text-slate-900 pb-24">
      
      {/* Top Banner */}
      <div className="bg-navy-950 text-white py-14 sm:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-primary-950/70 to-navy-900" />
        <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-accent-gold uppercase tracking-wider">
            <Link href="/" className="hover:underline">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Dewan Guru & Staf</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Tenaga Pendidik & Kependidikan
          </h1>
          <p className="text-slate-300 text-xs sm:text-base max-w-2xl">
            Para pendidik berdedikasi, tersertifikasi, dan berjiwa pembelajar yang siap mengantarkan siswa meraih puncak potensi terbaiknya.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-10 sm:pt-12 space-y-10 sm:space-y-12">
        
        {/* Division Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {divisions.map((div) => (
            <button
              key={div}
              onClick={() => setSelectedDivision(div)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                selectedDivision === div
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {div}
            </button>
          ))}
        </div>

        {/* Teachers Grid - 2 Columns on Mobile, 4 on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-slate-50/70 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-40 sm:h-64 w-full overflow-hidden bg-slate-200">
                  <Image
                    src={teacher.imageUrl}
                    alt={teacher.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <span className="px-2 py-0.5 rounded-full bg-navy-950/80 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold">
                      {teacher.category}
                    </span>
                  </div>
                </div>

                <div className="p-3 sm:p-5 space-y-1 sm:space-y-2">
                  <h3 className="font-bold text-xs sm:text-base text-navy-950 group-hover:text-primary-600 transition-colors leading-snug line-clamp-1">
                    {teacher.name}
                  </h3>

                  <div className="text-[11px] sm:text-xs font-semibold text-primary-700 line-clamp-1">
                    {teacher.role}
                  </div>

                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium line-clamp-1">
                    Mapel: {teacher.subject}
                  </p>

                  <div className="pt-1 text-[9px] sm:text-[11px] text-slate-400 truncate">
                    {teacher.education}
                  </div>
                </div>
              </div>

              {/* Quote Footer (shown on tablet and desktop, compact on mobile) */}
              <div className="px-3 pb-3 sm:px-5 sm:pb-5 pt-1">
                <div className="p-2 sm:p-3 rounded-xl bg-white border border-slate-200/80 text-[10px] sm:text-[11px] text-slate-600 italic relative flex items-start gap-1 sm:gap-1.5 shadow-xs">
                  <Quote className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">&ldquo;{teacher.quote}&rdquo;</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
