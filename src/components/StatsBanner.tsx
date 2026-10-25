import React from 'react';
import { Users, GraduationCap, Calendar, BookOpen, Award, Sparkles } from 'lucide-react';
import { SCHOOL_INFO } from '@/data/schoolData';

export default function StatsBanner() {
  const statsList = [
    {
      icon: Users,
      value: "1.250+",
      label: "TOTAL SISWA AKTIF",
      sub: "36 Rombongan Belajar",
      color: "from-blue-500 to-primary-600"
    },
    {
      icon: GraduationCap,
      value: "85+",
      label: "TENAGA PENDIDIK",
      sub: "100% S1/S2 Bersertifikat",
      color: "from-amber-400 to-amber-600"
    },
    {
      icon: Calendar,
      value: "38 Th",
      label: "TAHUN BERDIRI",
      sub: "Mendidik Sejak 1988",
      color: "from-emerald-400 to-teal-600"
    },
    {
      icon: Award,
      value: "140+",
      label: "PRESTASI & JUARA",
      sub: "Kabupaten s.d Nasional",
      color: "from-indigo-400 to-purple-600"
    }
  ];

  return (
    <section className="relative bg-gradient-to-r from-primary-900 via-primary-800 to-navy-950 text-white py-12 sm:py-16 overflow-hidden shadow-card">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(37,99,235,0.25),transparent_60%)]" />
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_70%_50%,rgba(245,158,11,0.15),transparent_60%)]" />

      <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {statsList.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-3 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                {/* Glowing Icon Container (Sekolah Nusantara Style) */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-2 sm:mb-4 text-accent-gold group-hover:scale-110 group-hover:border-accent-gold/50 transition-all duration-300 shadow-sm">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                {/* Big Bold Stat Value */}
                <div className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-1 group-hover:text-accent-gold transition-colors">
                  {stat.value}
                </div>

                {/* Stat Label */}
                <div className="text-[10px] sm:text-xs font-bold tracking-wider text-slate-200 uppercase mb-0.5 sm:mb-1">
                  {stat.label}
                </div>

                {/* Helper context */}
                <div className="text-[9px] sm:text-[11px] text-slate-400">
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
