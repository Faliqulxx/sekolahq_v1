import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ShieldCheck, Compass, HeartHandshake, Trees } from 'lucide-react';

export default function WhyChooseUs() {
  const values = [
    {
      title: "Akreditasi A (Unggul)",
      desc: "Penilaian tertinggi BAN-S/M untuk standar mutu manajemen, kurikulum, dan sarana prasarana sekolah.",
      icon: ShieldCheck
    },
    {
      title: "Pendidikan Holistik",
      desc: "Memadukan kecerdasan spiritual, intelektual, emosional, dan nalar kritis siswa secara berimbang.",
      icon: HeartHandshake
    },
    {
      title: "Berwawasan Lingkungan",
      desc: "Sekolah Adiwiyata yang aktif dalam konservasi mangrove pesisir Ujungpangkah dan ramah ekologi.",
      icon: Trees
    },
    {
      title: "Jalur Lanjutan Terjamin",
      desc: "98% lulusan berhasil diterima di SMA/SMK Negeri favorit dan pesantren unggulan di Jawa Timur.",
      icon: Compass
    }
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-white text-slate-900 overflow-hidden">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column (5 cols): 3-Image Editorial Collage (BMSC Ref 2 Signature Style) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 items-center">
              
              {/* Column 1: Campus Facade */}
              <div className="space-y-3 sm:space-y-4">
                <div className="relative h-44 sm:h-64 md:h-80 rounded-2xl overflow-hidden shadow-card border border-slate-200 group">
                  <Image
                    src="/images/indo/campus-front.webp"
                    alt="Gedung Kampus Sekolah-Q"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-white tracking-wide">
                      Kampus Asri
                    </span>
                  </div>
                </div>
              </div>

              {/* Column 2: Classroom & Science Lab (Taller centerpiece) */}
              <div className="space-y-2.5 sm:space-y-4 -translate-y-2 sm:-translate-y-4">
                <div className="relative h-52 sm:h-72 md:h-96 rounded-2xl overflow-hidden shadow-elevated border-2 border-primary-500/30 group">
                  <Image
                    src="/images/indo/classroom-lab.webp"
                    alt="Laboratorium Sains dan Perpustakaan"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-white tracking-wide">
                      Lab Modern & Digital
                    </span>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="bg-navy-950 text-white p-2 sm:p-3 rounded-xl shadow-lg border border-white/10 text-center">
                  <div className="text-lg sm:text-xl font-bold text-accent-gold">38 Th</div>
                  <div className="text-[9px] sm:text-[10px] text-slate-300 uppercase tracking-wider">Dedikasi</div>
                </div>
              </div>

              {/* Column 3: Students in Courtyard */}
              <div className="space-y-3 sm:space-y-4">
                <div className="relative h-44 sm:h-64 md:h-80 rounded-2xl overflow-hidden shadow-card border border-slate-200 group">
                  <Image
                    src="/images/indo/hero-students.webp"
                    alt="Siswa Berprestasi"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-white tracking-wide">
                      Generasi Mandiri
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column (7 cols): Editorial Storytelling (Aurevia & BMSC Style) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-5 sm:space-y-6">
            
            {/* Editorial Heading */}

            {/* Editorial Heading */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-navy-950 leading-[1.2]">
              The Place Where You{' '}
              <span className="font-editorial italic font-normal text-primary-600 block sm:inline">
                Grow, Learn & Lead.
              </span>
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
              Berakar kuat pada kearifan lokal pesisir Ujungpangkah Gresik sejak 1988, sekolah kami berkomitmen menghadirkan iklim belajar yang inklusif, membangkitkan rasa ingin tahu intelektual, serta membentuk akhlakul karimah yang teguh di tengah dinamika global.
            </p>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Dengan bimbingan guru-guru inspiratif dan sarana digital mutakhir, setiap anak didukung untuk menemukan bakat uniknya—baik di bidang sains, riset komputasi, hafalan Al-Qur'an, seni budaya, maupun kepemimpinan kepanduan.
            </p>

            {/* Grid of Key Values - 2 Columns on Mobile & Desktop */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 pt-1 sm:pt-2">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div key={i} className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary-300 hover:bg-white hover:shadow-soft transition-all duration-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm text-navy-950 leading-tight">{v.title}</h4>
                      </div>
                      <p className="text-[10px] sm:text-xs text-slate-600 leading-relaxed line-clamp-3 sm:line-clamp-none">
                        {v.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Link */}
            <div className="pt-2 sm:pt-4 flex flex-wrap sm:flex-nowrap items-center gap-3">
              <Link
                href="/profil"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-navy-950 text-white hover:bg-primary-700 font-semibold text-xs sm:text-sm shadow-md transition-all duration-200 group"
              >
                <span>Pelajari Profil & Sejarah Kami</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="/kontak"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-slate-700 hover:text-navy-950 font-semibold text-xs sm:text-sm border border-slate-200 sm:border-transparent transition-colors"
              >
                <span>Jadwalkan Tur Sekolah</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
