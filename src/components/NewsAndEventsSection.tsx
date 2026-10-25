import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { NEWS } from '@/data/schoolData';

export default function NewsAndEventsSection() {
  const featured = NEWS[0];
  const sideArticles = NEWS.slice(1, 4);

  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-white">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header (BMSC Ref 2 Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-16">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-navy-950">
              Warta & Agenda Prestasi
            </h2>
            
            <p className="text-sm sm:text-base text-slate-600">
              Liputan kegiatan, prestasi membanggakan siswa, dan agenda akademik penting di Sekolah-Q.
            </p>
          </div>

          <Link
            href="/berita"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-primary-50 text-slate-800 hover:text-primary-700 text-xs sm:text-sm font-bold border border-slate-200 transition-colors shrink-0 group self-start md:self-auto"
          >
            <span>Lihat Semua Berita</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 2-Column Layout: 1 Big Featured Story (Left) + 3 Horizontal Story Cards (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Big Featured Card (7 cols) */}
          <div className="lg:col-span-7">
            <Link
              href={`/berita#${featured.slug}`}
              className="group block bg-slate-50 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 hover:shadow-card transition-all duration-300"
            >
              <div className="relative h-52 sm:h-72 md:h-96 w-full overflow-hidden">
                <Image
                  src={featured.imageUrl}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex gap-2">
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-accent-gold text-slate-950 text-[10px] sm:text-xs font-extrabold shadow-md">
                    {featured.category}
                  </span>
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-navy-950/80 backdrop-blur-md text-white text-[10px] sm:text-xs font-medium">
                    Sorotan Utama
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-7 lg:p-8 space-y-2.5 sm:space-y-3">
                <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary-600" />
                    {featured.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {featured.readTime}
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl font-bold text-navy-950 group-hover:text-primary-600 transition-colors leading-snug">
                  {featured.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {featured.summary}
                </p>

                <div className="pt-1 sm:pt-2 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary-600 group-hover:text-primary-800">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>

          {/* 3 Side Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            {sideArticles.map((item) => (
              <Link
                key={item.id}
                href={`/berita#${item.slug}`}
                className="group flex flex-row gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 hover:bg-primary-50/40 border border-slate-200/80 hover:border-primary-200 transition-all duration-200"
              >
                <div className="relative w-24 sm:w-36 h-24 sm:h-28 rounded-lg sm:rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-1.5 left-1.5 sm:hidden">
                    <span className="px-1.5 py-0.5 rounded-full bg-navy-950/80 text-white text-[9px] font-bold">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-[10px] sm:text-[11px] text-slate-500 mb-1">
                      <span className="hidden sm:inline-block font-semibold text-primary-600">
                        {item.category}
                      </span>
                      <span>{item.date}</span>
                    </div>

                    <h4 className="font-bold text-xs sm:text-sm text-navy-950 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug mb-1">
                      {item.title}
                    </h4>

                    <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-tight">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-1.5 text-[10px] sm:text-[11px] font-bold text-primary-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Selengkapnya</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
