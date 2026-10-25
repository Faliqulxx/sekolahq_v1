'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  Building2,
  Navigation
} from 'lucide-react';
import { SCHOOL_INFO } from '@/data/schoolData';

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 600);
  };

  return (
    <div className="bg-white text-slate-900 pb-24">
      
      {/* Top Banner */}
      <div className="bg-navy-950 text-white py-14 sm:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-primary-950/70 to-navy-900" />
        <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-accent-gold uppercase tracking-wider">
            <Link href="/" className="hover:underline">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Kontak & Lokasi</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Hubungi Sekretariat Sekolah
          </h1>
          <p className="text-slate-300 text-xs sm:text-base max-w-2xl">
            Kami siap melayani pertanyaan seputar PPDB, jadwal tur kampus, maupun informasi kemitraan sekolah.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-10 sm:pt-12 space-y-12 sm:space-y-16">
        
        {/* 2-Column: Left Contact Info & Map, Right Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Contact Cards & Location (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
                Informasi & Jam Pelayanan
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Silakan datang langsung ke kampus kami pada jam kerja atau hubungi saluran komunikasi resmi berikut:
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Alamat Kampus</h4>
                  <p className="text-xs sm:text-sm font-semibold text-navy-950 mt-0.5 leading-relaxed">
                    {SCHOOL_INFO.address}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-accent-gold/20 text-accent-amber flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Jam Operasional Kantor</h4>
                  <p className="text-xs sm:text-sm font-semibold text-navy-950 mt-0.5">
                    Senin - Jumat: 07.00 - 15.00 WIB
                  </p>
                  <p className="text-xs text-slate-500">
                    Sabtu: 08.00 - 12.00 WIB (Khusus Pelayanan PPDB)
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Telepon & WhatsApp</h4>
                  <p className="text-xs sm:text-sm font-semibold text-navy-950 mt-0.5">
                    {SCHOOL_INFO.phone}
                  </p>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline mt-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat WhatsApp Panitia ({SCHOOL_INFO.whatsapp})</span>
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Resmi</h4>
                  <p className="text-xs sm:text-sm font-semibold text-navy-950 mt-0.5">
                    {SCHOOL_INFO.email}
                  </p>
                  <p className="text-xs text-slate-500">
                    Layanan PPDB: {SCHOOL_INFO.ppdbEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Styled Map Card */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-soft bg-slate-100 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-navy-950">
                  <Navigation className="w-4 h-4 text-primary-600" />
                  <span>Petunjuk Arah Lokasi</span>
                </div>
                <span className="text-[11px] text-slate-500">Pesisir Pantura Gresik</span>
              </div>

              {/* Map Illustration Frame */}
              <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-800 text-white flex flex-col items-center justify-center p-4 text-center">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative z-10 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-accent-gold text-slate-950 flex items-center justify-center mx-auto shadow-glow-gold animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="font-bold text-sm">Sekolah-Q</div>
                  <div className="text-[11px] text-slate-300">Jl. Pendidikan No. 45, Ujungpangkah, Gresik</div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=SMP+Ujungpangkah+Gresik"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-colors shadow-xs"
              >
                <span>Buka di Google Maps</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Form with Simulation (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50/70 p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-soft">
            <div className="space-y-3 mb-8">
              <h3 className="text-2xl font-extrabold text-navy-950">
                Kirim Pesan atau Pertanyaan
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Isi formulir di bawah ini untuk menanyakan informasi pendaftaran, penjadwalan tur sekolah, atau informasi lainnya.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-emerald-900">
                  Pesan Anda Berhasil Terkirim!
                </h4>
                <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto leading-relaxed">
                  Terima kasih, <strong>{formData.name}</strong>. Tim panitia PPDB dan humas Sekolah-Q akan membalas pesan Anda ke <strong>{formData.email}</strong> dalam 1x24 jam kerja.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                    }}
                    className="px-6 py-2.5 rounded-full bg-emerald-600 text-white text-xs sm:text-sm font-bold hover:bg-emerald-700 shadow-sm transition-all"
                  >
                    Kirim Pesan Lainnya
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-950">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-950">Alamat Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-950">No. WhatsApp / Telepon</label>
                    <input
                      type="tel"
                      placeholder="0812-xxxx-xxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-950">Topik / Keperluan *</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Pilih topik keperluan...</option>
                      <option value="PPDB">Informasi Pendaftaran Siswa Baru (PPDB)</option>
                      <option value="Beasiswa">Jalur Beasiswa & Prestasi</option>
                      <option value="Tur">Penjadwalan Kunjungan / Tur Sekolah</option>
                      <option value="Akademik">Pertanyaan Kurikulum & Kelas Bilingual</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-950">Pesan Anda *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tuliskan pertanyaan atau informasi yang ingin Anda tanyakan secara detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm text-white bg-primary-600 hover:bg-primary-700 shadow-md transition-all active:scale-95 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Mengirim Pesan...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Kirim Formulir Sekarang</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 text-center pt-2">
                  * Data pesan Anda hanya diproses untuk simulasi portofolio dan tidak disimpan ke server publik.
                </p>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
