import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Languages, 
  BookOpen, 
  Cpu, 
  ArrowRight, 
  Check
} from 'lucide-react';
import { PROGRAMS } from '@/data/schoolData';

const iconMap: Record<string, React.ElementType> = {
  GraduationCap: GraduationCap,
  Languages: Languages,
  BookOpen: BookOpen,
  Cpu: Cpu,
};

const cardTheme = [
  {
    bgIcon: 'bg-blue-50 text-blue-600 border-blue-200',
    tag: 'bg-blue-100/60 text-blue-800',
    borderHover: 'hover:border-blue-300'
  },
  {
    bgIcon: 'bg-amber-50 text-amber-600 border-amber-200',
    tag: 'bg-amber-100/60 text-amber-800',
    borderHover: 'hover:border-amber-300'
  },
  {
    bgIcon: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    tag: 'bg-emerald-100/60 text-emerald-800',
    borderHover: 'hover:border-emerald-300'
  },
  {
    bgIcon: 'bg-purple-50 text-purple-600 border-purple-200',
    tag: 'bg-purple-100/60 text-purple-800',
    borderHover: 'hover:border-purple-300'
  }
];

export default function ProgramsShowcase() {
  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-slate-50/60 border-y border-slate-200/70">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header (Sekolah Nusantara Ref 1 Style) */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-navy-950">
            Program Unggulan Sekolah
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
            Program pendidikan terbaik yang dirancang untuk mengembangkan potensi akademik, spiritual, bahasa, dan teknologi siswa secara menyeluruh.
          </p>
        </div>

        {/* 4 Modern Floating Feature Cards - 2 Columns on Mobile, 4 on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {PROGRAMS.map((program, idx) => {
            const IconComponent = iconMap[program.iconName] || GraduationCap;
            const theme = cardTheme[idx % cardTheme.length];

            return (
              <div
                key={program.id}
                className={`bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 lg:p-7 shadow-soft border border-slate-200/80 hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group ${theme.borderHover}`}
              >
                <div>
                  {/* Top: Icon in Rounded Pastel Container + Badge */}
                  <div className="flex items-start justify-between gap-2 mb-3 sm:mb-6">
                    <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center border shadow-xs transition-transform group-hover:scale-110 duration-300 ${theme.bgIcon}`}>
                      <IconComponent className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                    <span className={`text-[9px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full ${theme.tag}`}>
                      {program.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-navy-950 mb-1 sm:mb-2 group-hover:text-primary-600 transition-colors leading-snug line-clamp-2">
                    {program.title}
                  </h3>

                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium mb-2 sm:mb-4 line-clamp-1">
                    {program.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3 sm:mb-6 line-clamp-2 sm:line-clamp-3">
                    {program.summary}
                  </p>

                  {/* Key Highlights (Desktop & Tablet) */}
                  <div className="hidden sm:block space-y-2 mb-6 pt-4 border-t border-slate-100">
                    {program.highlights.slice(0, 2).map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-3 sm:pt-4 border-t border-slate-100">
                  <Link
                    href={`/program#${program.slug}`}
                    className="inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-bold text-primary-600 hover:text-primary-800 transition-colors group/link"
                  >
                    <span>Detail Program</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Programs Bar */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/program"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-navy-950 hover:bg-slate-100 font-bold text-xs sm:text-sm border border-slate-300 shadow-soft transition-all duration-200"
          >
            <span>Lihat Rincian Seluruh Kurikulum & Program Khusus</span>
            <ArrowRight className="w-4 h-4 text-primary-600" />
          </Link>
        </div>

      </div>
    </section>
  );
}
