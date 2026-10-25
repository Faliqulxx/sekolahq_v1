import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Award, 
  ShieldCheck, 
  Instagram,
  Youtube
} from 'lucide-react';
import { SCHOOL_INFO } from '@/data/schoolData';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-white/10 pt-16 pb-12">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: School Brand & Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl overflow-hidden bg-navy-900 border border-white/20 p-0.5 shadow-md shrink-0">
                <Image
                  src="/images/logo-crest.webp"
                  alt="Logo Sekolah-Q"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">SEKOLAH-Q</h3>
                <p className="text-[11px] text-accent-gold font-medium">Sekolah Penggerak Berakhlak</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Lembaga pendidikan menengah pertama unggulan di Kabupaten Gresik yang memadukan Kurikulum Merdeka, pembiasaan karakter Islami, dan inovasi sains teknologi.
            </p>

            <div className="flex flex-wrap gap-2 text-xs pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200 text-[11px]">
                <Award className="w-3.5 h-3.5 text-accent-gold" />
                <span>NPSN: {SCHOOL_INFO.npsn}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Akreditasi: {SCHOOL_INFO.akreditasi}</span>
              </span>
            </div>
          </div>

          {/* Col 2: Layanan PPDB */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-400"></span>
              Layanan PPDB
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/ppdb" className="hover:text-white transition-colors flex items-center gap-1">
                  <span className="text-accent-gold font-medium">Gelombang 1 (Dibuka)</span>
                </Link>
              </li>
              <li>
                <Link href="/ppdb#jalur" className="hover:text-white transition-colors">Jalur Prestasi & Zonasi</Link>
              </li>
              <li>
                <Link href="/ppdb#syarat" className="hover:text-white transition-colors">Syarat Berkas & Formulir</Link>
              </li>
              <li>
                <Link href="/ppdb#faq" className="hover:text-white transition-colors">Tanya Jawab PPDB</Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-white transition-colors">Kunjungan Tur Kampus</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Sosial Media */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-400"></span>
              Sosial Media
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-pink-500/10 border border-white/10 hover:border-pink-500/30 text-slate-300 hover:text-pink-300 transition-all duration-200 group"
                >
                  <span className="w-7 h-7 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Instagram className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold text-white group-hover:text-pink-300 leading-tight text-xs sm:text-sm">Instagram (IG)</div>
                    <div className="text-[11px] text-slate-400 truncate">@sekolahq.official</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-slate-700/30 border border-white/10 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-300 transition-all duration-200 group"
                >
                  <span className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform border border-white/10">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold text-white group-hover:text-cyan-300 leading-tight text-xs sm:text-sm">TikTok</div>
                    <div className="text-[11px] text-slate-400 truncate">@sekolahq_id</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-slate-300 hover:text-red-300 transition-all duration-200 group"
                >
                  <span className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Youtube className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold text-white group-hover:text-red-300 leading-tight text-xs sm:text-sm">YouTube</div>
                    <div className="text-[11px] text-slate-400 truncate">Sekolah-Q Official</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Kontak & Alamat */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Sekretariat
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                <span className="leading-snug">{SCHOOL_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent-gold shrink-0" />
                <span>{SCHOOL_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent-gold shrink-0" />
                <span className="truncate">{SCHOOL_INFO.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent-gold shrink-0" />
                <span>07.00 - 15.00 WIB</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Portfolio Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 {SCHOOL_INFO.name}. Hak Cipta Dilindungi Undang-Undang.
          </div>
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-center">
            <span>Studi Kasus Portofolio Frontend oleh <strong>Faliqul Ishbah</strong></span>
            <span className="text-white/30">•</span>
            <span className="text-accent-gold">Konsep Desain Web Sekolah Modern</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
