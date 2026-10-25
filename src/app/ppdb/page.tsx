'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  Download, 
  MessageCircle, 
  HelpCircle, 
  ChevronRight, 
  ChevronDown, 
  Sparkles,
  Users,
  Award,
  ShieldCheck,
  CheckSquare,
  Square
} from 'lucide-react';
import { PPDB_PHASES, PPDB_REQUIREMENTS, FAQ_LIST, SCHOOL_INFO } from '@/data/schoolData';

export default function PPDBPage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const ppdbFaqs = FAQ_LIST.filter(f => f.category === 'Pendaftaran' || f.category === 'Biaya & Beasiswa');

  return (
    <div className="bg-white text-slate-900 pb-24">
      
      {/* Top Banner */}
      <div className="bg-navy-950 text-white py-14 sm:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-primary-950/70 to-navy-900" />
        <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-accent-gold uppercase tracking-wider">
            <Link href="/" className="hover:underline">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Informasi PPDB</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Penerimaan Peserta Didik Baru (PPDB)
          </h1>
          <p className="text-slate-300 text-xs sm:text-base max-w-2xl">
            Tahun Ajaran 2026/2027 Sekolah-Q. Bergabunglah bersama kami menumbuhkan karakter mulia dan nalar kritis generasi masa depan.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-10 sm:pt-12 space-y-14 sm:space-y-20">
        
        {/* Status Gelombang & Timeline */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-3xl font-extrabold text-navy-950">
              Jadwal Gelombang Pendaftaran
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Perhatikan tanggal penting setiap tahapan pendaftaran agar berkas Anda diproses tepat waktu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {PPDB_PHASES.map((phase, idx) => {
              const isOngoing = phase.status === 'Sedang Berlangsung';
              return (
                <div
                  key={idx}
                  className={`rounded-2xl sm:rounded-3xl p-5 sm:p-7 border transition-all duration-300 flex flex-col justify-between ${
                    isOngoing
                      ? 'bg-primary-50/60 border-primary-500 shadow-card ring-2 ring-primary-500/20'
                      : 'bg-slate-50/80 border-slate-200'
                  }`}
                >
                  <div className="space-y-2.5 sm:space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {phase.phase}
                      </span>
                      <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                        isOngoing ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {phase.status}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-navy-950">
                      {phase.name}
                    </h3>

                    <div className="flex items-center gap-2 text-xs font-bold text-primary-700">
                      <Calendar className="w-4 h-4" />
                      <span>{phase.dateRange}</span>
                    </div>

                    <div className="text-xs text-slate-500 font-semibold">
                      Daya Tampung: <span className="text-navy-950 font-bold">{phase.quota}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-200/60">
                      {phase.desc}
                    </p>
                  </div>

                  <div className="pt-4 sm:pt-6">
                    {isOngoing ? (
                      <a
                        href="#syarat"
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-center text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-md min-h-[44px]"
                      >
                        <span>Cek Syarat & Alur</span>
                      </a>
                    ) : (
                      <div className="w-full text-center py-2 text-xs font-medium text-slate-400 bg-slate-100 rounded-xl min-h-[44px] flex items-center justify-center">
                        Akan Segera Dibuka
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5 Langkah Alur Pendaftaran (Visual Step-by-Step - 2 Columns on Mobile, 5 on Desktop) */}
        <div className="space-y-6 sm:space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-3xl font-extrabold text-navy-950">
              5 Langkah Mudah Mendaftar
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Prosedur penerimaan yang ramah, transparan, dan dapat diselesaikan dalam beberapa tahapan ringkas.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {[
              { step: "01", title: "Registrasi Awal", desc: "Isi formulir online atau ambil berkas di sekretariat." },
              { step: "02", title: "Verifikasi Berkas", desc: "Serahkan ijazah, rapor, KK, dan sertifikat prestasi." },
              { step: "03", title: "Observasi Bakat", desc: "Pemetaan minat bakat dan tes diagnostik belajar santai." },
              { step: "04", title: "Pengumuman", desc: "Hasil seleksi transparan di web atau mading sekolah." },
              { step: "05", title: "Daftar Ulang", desc: "Konfirmasi siswa, seragam, dan masa orientasi (MPLS)." },
            ].map((st, i) => (
              <div key={i} className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1.5 sm:space-y-2 relative group hover:bg-white hover:shadow-soft transition-all flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center mx-auto shadow-sm mb-1.5 sm:mb-2">
                    {st.step}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-navy-950 leading-snug">{st.title}</h4>
                  <p className="text-[10px] sm:text-xs text-slate-500 leading-tight mt-1">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Persyaratan Berkas: Interactive Checklist Tool for Parents */}
        <div id="syarat" className="scroll-mt-28 bg-slate-50/70 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-navy-950">
                  Checklist Kelengkapan Berkas
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Centang dokumen yang telah Anda siapkan untuk mempermudah pengecekan.
                </p>
              </div>

              {/* Progress counter */}
              <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-primary-700 shadow-xs shrink-0">
                Terpenuhi: {completedCount} / {PPDB_REQUIREMENTS.length} Dokumen
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {PPDB_REQUIREMENTS.map((req) => {
                const isChecked = !!checkedItems[req.id];
                return (
                  <div
                    key={req.id}
                    onClick={() => toggleCheck(req.id)}
                    className={`p-4 rounded-xl border flex items-center gap-3.5 cursor-pointer select-none transition-all ${
                      isChecked
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-medium'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-primary-300'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                    <span className="text-xs sm:text-sm leading-relaxed">{req.title}</span>
                  </div>
                );
              })}
            </div>

            {completedCount === PPDB_REQUIREMENTS.length && (
              <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs sm:text-sm flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Luar biasa! Seluruh dokumen persyaratan Anda telah lengkap dan siap diverifikasi.</span>
              </div>
            )}
          </div>
        </div>

        {/* Biaya & Beasiswa Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-soft space-y-4">
            <h3 className="text-xl font-bold text-navy-950">Biaya Pendidikan Transparan</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Sekolah-Q menerapkan struktur biaya yang terukur, tanpa pungutan liar, dan mencakup fasilitas belajar premium:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Bebas Biaya Formulir Pendaftaran</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Termasuk Seragam Lengkap 4 Set & Atribut</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Akses Penuh Laboratorium Komputer & STEM tanpa biaya tambahan</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-navy-950 to-primary-950 text-white shadow-soft space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-gold/20 text-accent-gold text-xs font-bold">
              <Award className="w-4 h-4" />
              <span>Program Beasiswa</span>
            </div>
            <h3 className="text-xl font-bold">Beasiswa Prestasi & Hafiz Qur'an</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Kami memberikan apresiasi bebas biaya pendidikan hingga 100% bagi peraih juara OSN/FLS2N minimal tingkat kabupaten serta penghafal Al-Qur'an (Tahfidz) minimal 1 Juz.
            </p>
            <a
              href={`https://wa.me/6281234567890?text=Halo%20Panitia%20PPDB,%20saya%20ingin%20menanyakan%20syarat%20beasiswa`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-accent-gold hover:underline"
            >
              <span>Konsultasikan Jalur Beasiswa via WhatsApp</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* FAQ Akordeon Khusus PPDB */}
        <div id="faq" className="scroll-mt-28 space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
              Tanya Jawab Seputar Pendaftaran
            </h2>
          </div>

          <div className="space-y-3">
            {ppdbFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-navy-950 hover:text-primary-600 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
