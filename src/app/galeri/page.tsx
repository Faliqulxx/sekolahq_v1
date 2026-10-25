'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Camera, 
  ChevronRight, 
  X, 
  ChevronLeft, 
  ChevronRight as ChevronRightIcon, 
  Maximize2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { GALLERY, GalleryItem } from '@/data/schoolData';

export default function GaleriPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['Semua', 'Akademik', 'Ekstrakurikuler', 'Fasilitas', 'Prestasi'];

  const filteredGallery = selectedCategory === 'Semua'
    ? GALLERY
    : GALLERY.filter(g => g.category === selectedCategory);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredGallery.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredGallery.length) % filteredGallery.length : null));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredGallery.length]);

  const activePhoto = lightboxIndex !== null ? filteredGallery[lightboxIndex] : null;

  return (
    <div className="bg-white text-slate-900 pb-24">
      
      {/* Top Banner */}
      <div className="bg-navy-950 text-white py-14 sm:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-primary-950/70 to-navy-900" />
        <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-accent-gold uppercase tracking-wider">
            <Link href="/" className="hover:underline">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Galeri Dokumentasi</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Galeri Kegiatan & Fasilitas
          </h1>
          <p className="text-slate-300 text-xs sm:text-base max-w-2xl">
            Potret kebersamaan, semangat belajar, sarana pendukung, dan momen bersejarah keluarga besar Sekolah-Q.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-10 sm:pt-12 space-y-8 sm:space-y-10">
        
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

        {/* Responsive Grid - 2 Columns on Mobile, 3 on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {filteredGallery.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative bg-slate-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-soft hover:shadow-card cursor-pointer border border-slate-200/80 transition-all duration-300 aspect-[4/3]"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay with info (always readable on mobile via soft gradient, enhanced on hover) */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 p-3 sm:p-6 flex flex-col justify-between">
                <div className="flex justify-end">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
                    <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>

                <div className="space-y-1 text-white">
                  <span className="px-2 py-0.5 rounded-full bg-accent-gold text-slate-950 text-[9px] sm:text-[10px] font-extrabold uppercase">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-xs sm:text-base leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-300 line-clamp-1 hidden sm:block">
                    {item.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal with Keyboard Navigation */}
      {activePhoto && lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Tutup foto"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={() => setLightboxIndex((lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length)}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={() => setLightboxIndex((lightboxIndex + 1) % filteredGallery.length)}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Foto selanjutnya"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          {/* Center Lightbox Card */}
          <div className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
            <div className="relative w-full h-[55vh] sm:h-[65vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Photo Info Banner below */}
            <div className="w-full mt-4 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold text-accent-gold uppercase tracking-wider">
                    {activePhoto.category}
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="text-xs text-slate-300">{activePhoto.date}</span>
                </div>
                <h4 className="font-bold text-sm sm:text-base leading-snug">{activePhoto.title}</h4>
                <p className="text-xs text-slate-300 mt-0.5">{activePhoto.caption}</p>
              </div>

              <div className="text-xs text-slate-400 shrink-0">
                {lightboxIndex + 1} dari {filteredGallery.length}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
