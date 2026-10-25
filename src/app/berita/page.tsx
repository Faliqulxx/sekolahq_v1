'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ChevronRight, 
  ArrowRight, 
  X, 
  Share2, 
  Tag, 
  BookOpen 
} from 'lucide-react';
import { NEWS, NewsItem } from '@/data/schoolData';

export default function BeritaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [activeArticle, setActiveArticle] = useState<NewsItem | null>(null);

  const categories = ['Semua', 'Prestasi', 'Kegiatan', 'Pengumuman', 'Artikel Guru'];

  const filteredNews = NEWS.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white text-slate-900 pb-24">
      
      {/* Top Banner */}
      <div className="bg-navy-950 text-white py-14 sm:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-primary-950/70 to-navy-900" />
        <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-accent-gold uppercase tracking-wider">
            <Link href="/" className="hover:underline">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Berita & Prestasi</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Warta Sekolah & Prestasi Siswa
          </h1>
          <p className="text-slate-300 text-xs sm:text-base max-w-2xl">
            Informasi terkini mengenai dinamika akademik, torehan kejuaraan, pengumuman resmi, dan artikel edukatif dari para pendidik.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-10 sm:pt-12 space-y-8 sm:space-y-10">
        
        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Live Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari berita atau pengumuman..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

        </div>

        {/* Results Counter */}
        <div className="text-xs text-slate-500">
          Menampilkan <span className="font-bold text-navy-950">{filteredNews.length}</span> artikel berita
        </div>

        {/* News Grid - 2 Columns on Mobile, 3 on Desktop */}
        {filteredNews.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-base text-navy-950 mb-1">Tidak ada berita yang cocok</h3>
            <p className="text-xs text-slate-500">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {filteredNews.map((item) => (
              <article
                key={item.id}
                id={item.slug}
                className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-32 sm:h-56 w-full overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
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
                    <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-slate-500">
                      <span className="flex items-center gap-1 sm:gap-1.5">
                        <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary-600" />
                        <span>{item.date}</span>
                      </span>
                      <span>•</span>
                      <span className="hidden sm:flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.readTime}</span>
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-lg font-bold text-navy-950 group-hover:text-primary-600 transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="px-3.5 pb-3.5 sm:px-6 sm:pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-xs">
                  <span className="text-slate-500 truncate max-w-[100px] sm:max-w-none">{item.author}</span>
                  <button
                    onClick={() => setActiveArticle(item)}
                    className="inline-flex items-center gap-1 font-bold text-primary-600 hover:text-primary-800 transition-colors shrink-0"
                  >
                    <span>Baca</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>

      {/* Interactive Modal for Reading Full Article */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            
            {/* Modal Header Bar */}
            <div className="p-3 sm:p-4 sm:px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-800 text-[10px] sm:text-xs font-bold">
                  {activeArticle.category}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500">{activeArticle.date}</span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-colors"
                aria-label="Tutup modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content Scrollable */}
            <div className="overflow-y-auto p-4 sm:p-8 space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-3xl font-extrabold text-navy-950 leading-tight">
                {activeArticle.title}
              </h2>

              <div className="flex items-center gap-3 sm:gap-4 text-xs text-slate-500 pb-2 border-b border-slate-100">
                <span>Penulis: <strong>{activeArticle.author}</strong></span>
                <span>•</span>
                <span>Waktu baca: {activeArticle.readTime}</span>
              </div>

              <div className="relative h-44 sm:h-80 w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={activeArticle.imageUrl}
                  alt={activeArticle.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-3 sm:space-y-4 text-xs sm:text-base text-slate-700 leading-relaxed">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Share simulation */}
              <div className="pt-4 sm:pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span>Bagikan warta ini ke kerabat & wali murid</span>
                <button
                  onClick={() => alert("Tautan berita berhasil disalin ke papan klip.")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Salin Tautan</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
