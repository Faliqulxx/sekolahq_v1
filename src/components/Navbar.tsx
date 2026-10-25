'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  Menu, 
  X, 
  ChevronRight, 
  ChevronDown, 
  Newspaper, 
  Camera, 
  GraduationCap 
} from 'lucide-react';
import { SCHOOL_INFO } from '@/data/schoolData';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [infoDropdownOpen, setInfoDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setInfoDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isInfoActive = pathname === '/berita' || pathname === '/galeri';

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        isScrolled
          ? 'bg-[#081326]/95 backdrop-blur-md shadow-md py-3 text-slate-800'
          : 'bg-[#081326] py-3.5 text-white border-b border-white/10'
      }`}
    >
      {/* Edge-to-Edge Navigation Bar */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 flex items-center justify-between">
        
        {/* SISI KIRI: Logo & Identitas Sekolah */}
        <div className="flex items-center shrink-0">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center">
              <Image
                src="/images/school-logo.webp"
                alt="Logo Sekolah-Q"
                width={44}
                height={44}
                className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-base sm:text-lg leading-tight text-white whitespace-nowrap">
                SEKOLAH-Q
              </span>
              <span className="text-[11px] text-slate-400 font-normal tracking-wide mt-0.5">
                Islamic & Global
              </span>
            </div>
          </Link>
        </div>

        {/* DI TENGAH: Menu Navigasi Utama */}
        <nav className="hidden lg:flex items-center justify-center flex-1 mx-6 xl:mx-10 gap-5 xl:gap-7 text-[13px] font-medium">
          
          {/* Beranda dengan Yellow/Gold Underline Indicator */}
          <Link
            href="/"
            className={`whitespace-nowrap transition-colors relative py-1 ${
              pathname === '/'
                ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-amber-400 after:rounded-full'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Beranda
          </Link>

          {/* Profil Sekolah */}
          <Link
            href="/profil"
            className={`whitespace-nowrap transition-colors relative py-1 ${
              pathname === '/profil'
                ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-amber-400 after:rounded-full'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Profil Sekolah
          </Link>

          {/* Program */}
          <Link
            href="/program"
            className={`whitespace-nowrap transition-colors relative py-1 ${
              pathname === '/program'
                ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-amber-400 after:rounded-full'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Program
          </Link>

          {/* Ekstrakurikuler */}
          <Link
            href="/ekstrakurikuler"
            className={`whitespace-nowrap transition-colors relative py-1 ${
              pathname === '/ekstrakurikuler'
                ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-amber-400 after:rounded-full'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Ekstrakurikuler
          </Link>

          {/* Dropdown: Informasi */}
          <div 
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setInfoDropdownOpen(true)}
            onMouseLeave={() => setInfoDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setInfoDropdownOpen(!infoDropdownOpen)}
              className={`flex items-center gap-1 whitespace-nowrap transition-colors relative py-1 ${
                isInfoActive
                  ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-amber-400 after:rounded-full'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>Informasi</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${infoDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Flyout Menu */}
            {infoDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl bg-[#0b1830] shadow-2xl border border-white/10 py-2 text-slate-200 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <Link
                  href="/berita"
                  onClick={() => setInfoDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 transition-colors text-xs font-semibold text-white"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-600/30 text-primary-300 flex items-center justify-center shrink-0 border border-primary-500/30">
                    <Newspaper className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="leading-tight">Berita & Prestasi</div>
                    <div className="text-[10px] text-slate-400 font-normal">Warta kegiatan sekolah</div>
                  </div>
                </Link>

                <Link
                  href="/galeri"
                  onClick={() => setInfoDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 transition-colors text-xs font-semibold text-white"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/30">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="leading-tight">Galeri Dokumentasi</div>
                    <div className="text-[10px] text-slate-400 font-normal">Foto sarana & aktivitas</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Guru & Staf */}
          <Link
            href="/guru"
            className={`whitespace-nowrap transition-colors relative py-1 ${
              pathname === '/guru'
                ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-amber-400 after:rounded-full'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Guru & Staf
          </Link>

          {/* Kontak */}
          <Link
            href="/kontak"
            className={`whitespace-nowrap transition-colors relative py-1 ${
              pathname === '/kontak'
                ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-amber-400 after:rounded-full'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Kontak
          </Link>

        </nav>

        {/* SISI KANAN: Tombol Daftar PPDB */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/ppdb"
            className="hidden sm:inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-md transition-all duration-200 bg-amber-400 hover:bg-amber-300 text-slate-950 hover:shadow-glow-gold active:scale-95 whitespace-nowrap group"
          >
            <span>Daftar PPDB</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5] transition-transform group-hover:translate-x-0.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl lg:hidden text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] sm:top-[68px] bottom-0 bg-[#081326]/98 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col justify-between overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200 z-50">
          <div className="space-y-1.5">
            <div className="text-xs uppercase font-semibold text-amber-400 tracking-wider mb-3 px-3">
              Menu Navigasi
            </div>
            
            {[
              { label: 'Beranda', href: '/' },
              { label: 'Profil Sekolah', href: '/profil' },
              { label: 'Program Unggulan', href: '/program' },
              { label: 'Ekstrakurikuler', href: '/ekstrakurikuler' },
              { label: 'Berita & Prestasi', href: '/berita' },
              { label: 'Galeri Dokumentasi', href: '/galeri' },
              { label: 'Guru & Staf', href: '/guru' },
              { label: 'Kontak & Lokasi', href: '/kontak' },
            ].map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-amber-400"></span>}
                </Link>
              );
            })}
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <Link
              href="/ppdb"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-center font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-lg text-sm"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Info & Pendaftaran PPDB 2026</span>
            </Link>
            <div className="text-center text-xs text-slate-400">
              Pertanyaan? WA Panitia: <span className="text-white font-medium">{SCHOOL_INFO.whatsapp}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
