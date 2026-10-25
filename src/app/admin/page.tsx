'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  GraduationCap,
  Newspaper,
  Users,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  Bell,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Eye,
  Trash2,
  Edit3,
  Save,
  Download,
  ExternalLink,
  ShieldCheck,
  Award,
  ChevronRight,
  Menu,
  X,
  Database,
  ArrowUpRight,
  Send,
  FileSpreadsheet,
  Check,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { SCHOOL_INFO, TEACHERS, NEWS, GALLERY, TESTIMONIALS } from '@/data/schoolData';

// Types for Mock State
type ActiveTab = 'dashboard' | 'ppdb' | 'berita' | 'guru' | 'galeri' | 'pesan' | 'settings';

interface Applicant {
  id: string;
  name: string;
  nisn: string;
  schoolOrigin: string;
  track: 'Prestasi' | 'Zonasi' | 'Tahfidz' | 'Afirmasi';
  phone: string;
  status: 'Menunggu' | 'Terverifikasi' | 'Diterima' | 'Ditolak';
  date: string;
  averageScore: number;
}

interface MessageItem {
  id: string;
  sender: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [ppdbFilter, setPpdbFilter] = useState<string>('Semua');
  const [newsFilter, setNewsFilter] = useState<string>('Semua');

  // Modal States
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [showSupabaseModal, setShowSupabaseModal] = useState(false);

  // Mock PPDB Applicants Data
  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: 'PPDB-001',
      name: 'Muhammad Rizky Ramadhan',
      nisn: '0098765432',
      schoolOrigin: 'SD Negeri 1 Ujungpangkah',
      track: 'Prestasi',
      phone: '081234567890',
      status: 'Terverifikasi',
      date: '24 Okt 2026',
      averageScore: 92.4
    },
    {
      id: 'PPDB-002',
      name: 'Aisyah Putri Nurhaliza',
      nisn: '0098765433',
      schoolOrigin: 'MI Ma\'arif NU Ujungpangkah',
      track: 'Tahfidz',
      phone: '082198765432',
      status: 'Diterima',
      date: '24 Okt 2026',
      averageScore: 89.8
    },
    {
      id: 'PPDB-003',
      name: 'Fauzan Akbar Pratama',
      nisn: '0098765434',
      schoolOrigin: 'SD Negeri 2 Sedagaran',
      track: 'Zonasi',
      phone: '085712345678',
      status: 'Menunggu',
      date: '25 Okt 2026',
      averageScore: 86.5
    },
    {
      id: 'PPDB-004',
      name: 'Nabila Azzahra Fitri',
      nisn: '0098765435',
      schoolOrigin: 'SD Islam Terpadu Gresik',
      track: 'Prestasi',
      phone: '081398761234',
      status: 'Terverifikasi',
      date: '25 Okt 2026',
      averageScore: 94.1
    },
    {
      id: 'PPDB-005',
      name: 'Bagas Aditya Wicaksono',
      nisn: '0098765436',
      schoolOrigin: 'SD Negeri Pangkahwetan',
      track: 'Afirmasi',
      phone: '087812349087',
      status: 'Menunggu',
      date: '25 Okt 2026',
      averageScore: 84.0
    }
  ]);

  // Mock News Data (derived from initial schoolData)
  const [newsList, setNewsList] = useState(NEWS);

  // Mock Teachers Data
  const [teachersList, setTeachersList] = useState(TEACHERS);

  // Mock Gallery Data
  const [galleryList, setGalleryList] = useState(GALLERY);

  // Mock Messages Data
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'MSG-01',
      sender: 'Bambang Sudibyo (Wali Murid)',
      email: 'bambang.s@gmail.com',
      phone: '081299887766',
      subject: 'Konfirmasi Tes Seleksi Tahfidz Gelombang 1',
      message: 'Selamat siang panitia PPDB Sekolah-Q, apakah tes seleksi tahfidz dilakukan secara offline di kampus atau virtual via video call? Terima kasih.',
      date: 'Hari ini, 09:30 WIB',
      isRead: false
    },
    {
      id: 'MSG-02',
      sender: 'Ibu Ratna Dewi',
      email: 'ratnadewi_gresik@yahoo.com',
      phone: '085611223344',
      subject: 'Jadwal Tur Kampus Akhir Pekan',
      message: 'Halo admin, kami berencana berkunjung ke kampus Sekolah-Q hari Sabtu besok untuk melihat fasilitas lab robotik. Apakah kantor sekretariat buka?',
      date: 'Kemarin, 14:15 WIB',
      isRead: true
    },
    {
      id: 'MSG-03',
      sender: 'Hasan Basri',
      email: 'hasan.b@outlook.com',
      phone: '082233445566',
      subject: 'Pertanyaan Program Beasiswa Tahfidz',
      message: 'Anak saya memiliki sertifikat juz 30 dan juz 1, apakah memenuhi syarat untuk beasiswa penuh di jalur tahfidz? Mohon arahannya.',
      date: '23 Okt 2026',
      isRead: true
    }
  ]);

  // Mock Settings State
  const [settingsData, setSettingsData] = useState({
    schoolName: SCHOOL_INFO.name,
    npsn: SCHOOL_INFO.npsn,
    akreditasi: SCHOOL_INFO.akreditasi,
    address: SCHOOL_INFO.address,
    phone: SCHOOL_INFO.phone,
    email: SCHOOL_INFO.email,
    announcementText: 'Pendaftaran Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027 Gelombang 1 Resmi Dibuka!',
    announcementActive: true,
    instagram: '@sekolahq.official',
    tiktok: '@sekolahq_id',
    youtube: 'Sekolah-Q Official',
    totalStudents: '780+',
    totalTeachers: '36',
    totalGraduates: '100%'
  });

  // Helper Toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Status badge styling helper
  const getStatusBadge = (status: Applicant['status']) => {
    switch (status) {
      case 'Diterima':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
      case 'Terverifikasi':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/30';
      case 'Menunggu':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/30';
      case 'Ditolak':
        return 'bg-rose-500/10 text-rose-400 border border-rose-500/30';
      default:
        return 'bg-slate-700 text-slate-300';
    }
  };

  // Export CSV Handler
  const handleExportCSV = () => {
    const headers = 'ID,Nama Siswa,NISN,Asal Sekolah,Jalur,Rata-rata Rapor,No. HP,Status,Tanggal\n';
    const rows = applicants.map(a => 
      `"${a.id}","${a.name}","${a.nisn}","${a.schoolOrigin}","${a.track}",${a.averageScore},"${a.phone}","${a.status}","${a.date}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `PPDB_Sekolah-Q_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('File CSV pendaftar PPDB berhasil diunduh!');
  };

  // Update applicant status
  const handleUpdateStatus = (id: string, newStatus: Applicant['status']) => {
    setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    if (selectedApplicant && selectedApplicant.id === id) {
      setSelectedApplicant(prev => prev ? { ...prev, status: newStatus } : null);
    }
    triggerToast(`Status ${id} diubah menjadi "${newStatus}"`);
  };

  // Filtered applicants
  const filteredApplicants = applicants.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.nisn.includes(searchQuery) ||
                          a.schoolOrigin.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = ppdbFilter === 'Semua' || a.status === ppdbFilter || a.track === ppdbFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-xl shadow-2xl border border-emerald-400/40 animate-bounce">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="h-16 border-b border-white/10 bg-slate-900/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 lg:hidden text-slate-300"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center font-black text-white text-base shadow-md">
              Q
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-2">
                SEKOLAH-Q <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-300 border border-primary-500/30">ADMIN CMS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Header Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Database Info Pill */}
          <button
            type="button"
            onClick={() => setShowSupabaseModal(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-medium transition-colors"
          >
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span>Mode Mock (Siap Supabase)</span>
          </button>

          {/* Quick link to public website */}
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-medium transition-colors"
            title="Buka Website Utama di Tab Baru"
          >
            <span>Lihat Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          {/* Admin Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-slate-800 relative">
              <Image
                src="/images/indo/headmaster.webp"
                alt="Admin"
                fill
                className="object-cover"
              />
            </div>
            <div className="hidden md:block text-left text-xs leading-tight">
              <div className="font-semibold text-white">Drs. H. M. Zainul Arifin</div>
              <div className="text-slate-400 text-[10px]">Super Administrator</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Container (Sidebar + Content Area) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Navigation */}
        <aside className={`
          fixed lg:static inset-y-16 left-0 z-20 w-64 bg-slate-900 border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4 space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Menu Utama
            </div>

            <nav className="space-y-1 text-sm font-medium">
              <button
                type="button"
                onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-left ${
                  activeTab === 'dashboard'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                <span>Dashboard Ringkasan</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('ppdb'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors text-left ${
                  activeTab === 'ppdb'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4 shrink-0" />
                  <span>Pendaftar PPDB</span>
                </div>
                <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                  {applicants.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('berita'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-left ${
                  activeTab === 'berita'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Newspaper className="w-4 h-4 shrink-0" />
                <span>Berita & Prestasi</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('guru'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-left ${
                  activeTab === 'guru'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4 shrink-0" />
                <span>Dewan Guru & Staf</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('galeri'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-left ${
                  activeTab === 'galeri'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4 shrink-0" />
                <span>Galeri Dokumentasi</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('pesan'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors text-left ${
                  activeTab === 'pesan'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>Kotak Pesan Masuk</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              </button>

              <div className="pt-4 px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Konfigurasi
              </div>

              <button
                type="button"
                onClick={() => { setActiveTab('settings'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-left ${
                  activeTab === 'settings'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4 shrink-0" />
                <span>Pengaturan Website</span>
              </button>
            </nav>
          </div>

          {/* Sidebar Footer Info */}
          <div className="p-4 border-t border-white/10 bg-slate-950/40 m-3 rounded-2xl border">
            <div className="flex items-start gap-2.5">
              <Database className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <div className="font-semibold text-white">Status Database</div>
                <div className="text-slate-400 text-[11px] mt-0.5">
                  Local Mock UI Active. Baca file <code className="text-emerald-300 font-mono">backend.md</code> untuk sambungkan ke Supabase.
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Body Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950">
          
          {/* ============================================================== */}
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {/* ============================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 max-w-7xl mx-auto">
              {/* Header Greeting */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                    Dashboard Ringkasan Sekolah-Q
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Pantau capaian pendaftaran PPDB, publikasi warta, dan statistik website secara terpusat.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => { setActiveTab('ppdb'); }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold shadow-md transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Verifikasi PPDB</span>
                  </button>
                </div>
              </div>

              {/* 4 Primary KPI Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 shadow-soft">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Total Pendaftar PPDB</span>
                    <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                      <GraduationCap className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-white">
                    142 <span className="text-xs font-normal text-emerald-400">(Kuota 192)</span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                    <span className="text-emerald-400 font-semibold">73.9%</span> kuota terisi Gelombang 1
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 shadow-soft">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Berita & Prestasi</span>
                    <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                      <Newspaper className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-white">
                    {newsList.length} <span className="text-xs font-normal text-slate-400">Artikel Terbit</span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-400">
                    3 berita masuk kategori Unggulan
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 shadow-soft">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Dewan Guru & Staf</span>
                    <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                      <Users className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-white">
                    36 <span className="text-xs font-normal text-slate-400">Pendidik Aktif</span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-400">
                    100% tersertifikasi pendidik
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 shadow-soft">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Pesan Belum Dibaca</span>
                    <span className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
                      <MessageSquare className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-white">
                    {messages.filter(m => !m.isRead).length} <span className="text-xs font-normal text-rose-400">Pesan Baru</span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-400">
                    Dari formulir kontak & buku tamu
                  </div>
                </div>
              </div>

              {/* Progress Kuota PPDB per Jalur */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base">Alokasi & Keterisian Kuota PPDB TA 2026/2027</h3>
                    <p className="text-xs text-slate-400">Total Daya Tampung: 6 Rombongan Belajar (192 Siswa)</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    Gelombang 1 Dibuka
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-medium">Jalur Prestasi</span>
                      <span className="text-white font-bold">52 / 60</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: '86%' }}></div>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1.5">Sisa 8 kursi</div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-medium">Jalur Tahfidz</span>
                      <span className="text-white font-bold">36 / 40</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '90%' }}></div>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1.5">Sisa 4 kursi</div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-medium">Jalur Zonasi</span>
                      <span className="text-white font-bold">44 / 72</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '61%' }}></div>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1.5">Sisa 28 kursi</div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-medium">Jalur Afirmasi</span>
                      <span className="text-white font-bold">10 / 20</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full" style={{ width: '50%' }}></div>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1.5">Sisa 10 kursi</div>
                  </div>
                </div>
              </div>

              {/* Quick Table: Pendaftar Terbaru */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary-400" />
                    <span>Pendaftar Siswa Baru Masuk Terakhir</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('ppdb')}
                    className="text-xs text-primary-400 hover:text-primary-300 font-medium flex items-center gap-1"
                  >
                    <span>Lihat Semua ({applicants.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/5 text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
                      <tr>
                        <th className="p-3">Nama Siswa</th>
                        <th className="p-3">Asal Sekolah</th>
                        <th className="p-3">Jalur</th>
                        <th className="p-3">Nilai Rapor</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {applicants.slice(0, 4).map(a => (
                        <tr key={a.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-3 font-semibold text-white">
                            <div>{a.name}</div>
                            <div className="text-[10px] text-slate-400">NISN: {a.nisn}</div>
                          </td>
                          <td className="p-3 text-slate-300">{a.schoolOrigin}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10 text-[11px]">
                              {a.track}
                            </span>
                          </td>
                          <td className="p-3 font-mono font-bold text-accent-gold">{a.averageScore}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${getStatusBadge(a.status)}`}>
                              {a.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              type="button"
                              onClick={() => { setSelectedApplicant(a); }}
                              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] transition-colors"
                            >
                              Detail
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: DATA PPDB */}
          {/* ============================================================== */}
          {activeTab === 'ppdb' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-primary-400" />
                    <span>Kelola Pendaftaran PPDB 2026/2027</span>
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Verifikasi berkas, persetujuan kelulusan seleksi, dan rekapitulasi data pendaftar.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Excel / CSV</span>
                  </button>
                </div>
              </div>

              {/* Filter and Search Bar */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-white/10">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari nama siswa, NISN, atau asal sekolah..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                  <select
                    value={ppdbFilter}
                    onChange={(e) => setPpdbFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-slate-200 text-xs focus:outline-none focus:border-primary-500"
                  >
                    <option value="Semua">Semua Status & Jalur</option>
                    <option value="Menunggu">Status: Menunggu</option>
                    <option value="Terverifikasi">Status: Terverifikasi</option>
                    <option value="Diterima">Status: Diterima</option>
                    <option value="Ditolak">Status: Ditolak</option>
                    <option value="Prestasi">Jalur: Prestasi</option>
                    <option value="Tahfidz">Jalur: Tahfidz</option>
                    <option value="Zonasi">Jalur: Zonasi</option>
                    <option value="Afirmasi">Jalur: Afirmasi</option>
                  </select>
                </div>
              </div>

              {/* Table of Applicants */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/5 text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
                      <tr>
                        <th className="p-3">No. / ID</th>
                        <th className="p-3">Nama Lengkap Siswa</th>
                        <th className="p-3">Asal Sekolah</th>
                        <th className="p-3">Jalur Pendaftaran</th>
                        <th className="p-3">Nilai Rapor</th>
                        <th className="p-3">Status Verifikasi</th>
                        <th className="p-3">Tanggal Daftar</th>
                        <th className="p-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredApplicants.length > 0 ? (
                        filteredApplicants.map((a, idx) => (
                          <tr key={a.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-3 font-mono text-slate-400">{a.id}</td>
                            <td className="p-3 font-semibold text-white">
                              <div>{a.name}</div>
                              <div className="text-[10px] text-slate-400">NISN: {a.nisn} | WA: {a.phone}</div>
                            </td>
                            <td className="p-3 text-slate-300">{a.schoolOrigin}</td>
                            <td className="p-3">
                              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-200 text-[11px] font-medium">
                                {a.track}
                              </span>
                            </td>
                            <td className="p-3 font-mono font-bold text-accent-gold text-sm">{a.averageScore}</td>
                            <td className="p-3">
                              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${getStatusBadge(a.status)}`}>
                                {a.status}
                              </span>
                            </td>
                            <td className="p-3 text-slate-400">{a.date}</td>
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setSelectedApplicant(a)}
                                  className="px-2.5 py-1 rounded-lg bg-primary-600/30 hover:bg-primary-600 text-primary-300 hover:text-white font-medium text-[11px] transition-colors"
                                >
                                  Kelola
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="p-8 text-center text-slate-400">
                            Tidak ditemukan pendaftar yang sesuai pencarian.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: BERITA & PRESTASI */}
          {/* ============================================================== */}
          {activeTab === 'berita' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                    <Newspaper className="w-6 h-6 text-purple-400" />
                    <span>Kelola Warta, Artikel & Prestasi</span>
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Publikasikan kabar terbaru, dokumentasi lomba, dan warta kegiatan sekolah.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddNewsModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold shadow-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tulis Berita Baru</span>
                </button>
              </div>

              {/* News Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsList.map((item) => (
                  <div key={item.id} className="rounded-2xl bg-slate-900 border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all">
                    <div>
                      <div className="relative h-44 w-full bg-slate-800">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-navy-950/80 backdrop-blur-md text-[10px] font-bold text-accent-gold border border-white/10">
                          {item.category}
                        </span>
                      </div>

                      <div className="p-5 space-y-2">
                        <div className="text-[11px] text-slate-400">{item.date} • {item.author}</div>
                        <h3 className="font-bold text-white text-sm sm:text-base leading-snug line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-2">
                          {item.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 border-t border-white/5 flex items-center justify-between text-xs mt-3">
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Terbit Publik
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => triggerToast(`Edit artikel: "${item.title.slice(0, 20)}..."`)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setNewsList(prev => prev.filter(n => n.id !== item.id));
                            triggerToast('Artikel berhasil dihapus');
                          }}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: DEWAN GURU & STAF */}
          {/* ============================================================== */}
          {activeTab === 'guru' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                    <Users className="w-6 h-6 text-emerald-400" />
                    <span>Kelola Dewan Guru & Tenaga Kependidikan</span>
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Daftar pendidik, jabatan, mata pelajaran, dan profil guru Sekolah-Q.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddTeacherModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold shadow-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Guru Baru</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {teachersList.map((teacher) => (
                  <div key={teacher.id} className="rounded-2xl bg-slate-900 border border-white/10 p-5 flex flex-col items-center text-center justify-between hover:border-white/20 transition-all">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary-500/30 bg-slate-800">
                        <Image
                          src={teacher.imageUrl}
                          alt={teacher.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm leading-tight">{teacher.name}</h3>
                        <p className="text-[11px] text-primary-400 font-medium mt-0.5">{teacher.role}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Mapel: {teacher.subject}</p>
                      </div>
                    </div>

                    <div className="w-full pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-slate-400 font-mono">NIP: {teacher.nip.slice(0, 10)}...</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => triggerToast(`Edit data: ${teacher.name}`)}
                          className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setTeachersList(prev => prev.filter(t => t.id !== teacher.id));
                            triggerToast('Data guru dihapus');
                          }}
                          className="p-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 5: GALERI DOKUMENTASI */}
          {/* ============================================================== */}
          {activeTab === 'galeri' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                    <ImageIcon className="w-6 h-6 text-cyan-400" />
                    <span>Galeri & Dokumentasi Kegiatan</span>
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Koleksi dokumentasi foto fasilitas, pembelajaran, ekstrakurikuler, dan kegiatan sekolah.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddPhotoModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold shadow-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Foto Baru</span>
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryList.map((photo) => (
                  <div key={photo.id} className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-white/10 aspect-square">
                    <Image
                      src={photo.imageUrl}
                      alt={photo.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-3.5">
                      <span className="self-start px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] text-accent-gold font-bold">
                        {photo.category}
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-white line-clamp-1">{photo.title}</h4>
                        <p className="text-[10px] text-slate-300 mt-0.5">{photo.date}</p>
                        <div className="flex justify-end pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setGalleryList(prev => prev.filter(g => g.id !== photo.id));
                              triggerToast('Foto berhasil dihapus');
                            }}
                            className="p-1 rounded-md bg-rose-500/30 hover:bg-rose-500 text-white transition-colors"
                            title="Hapus foto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 6: KOTAK PESAN MASUK */}
          {/* ============================================================== */}
          {activeTab === 'pesan' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-rose-400" />
                    <span>Kotak Pesan Masuk & Buku Tamu</span>
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Pesan dan pertanyaan yang dikirimkan oleh wali murid & calon pendaftar via halaman Kontak.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      msg.isRead 
                        ? 'bg-slate-900/60 border-white/5' 
                        : 'bg-slate-900 border-primary-500/40 shadow-soft'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
                      <div className="flex items-center gap-2.5">
                        {!msg.isRead && (
                          <span className="w-2.5 h-2.5 rounded-full bg-primary-400 animate-pulse shrink-0"></span>
                        )}
                        <span className="font-bold text-white text-sm">{msg.sender}</span>
                        <span className="text-[11px] text-slate-400">({msg.email} • {msg.phone})</span>
                      </div>
                      <span className="text-[11px] text-slate-400">{msg.date}</span>
                    </div>

                    <div className="pt-3 space-y-1.5">
                      <div className="font-semibold text-xs sm:text-sm text-accent-gold">{msg.subject}</div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{msg.message}</p>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">ID: {msg.id}</span>
                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${msg.phone.replace(/^0/, '62')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <Send className="w-3 h-3" />
                          <span>Balas via WhatsApp</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, isRead: !m.isRead } : m));
                            triggerToast('Status pesan diperbarui');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs transition-colors"
                        >
                          {msg.isRead ? 'Tandai Belum Dibaca' : 'Tandai Selesai Dibaca'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 7: PENGATURAN WEBSITE */}
          {/* ============================================================== */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="pb-4 border-b border-white/10">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <Settings className="w-6 h-6 text-slate-300" />
                  <span>Pengaturan Identitas & Konten Website</span>
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Ubah data pokok sekolah, pengumuman bar atas, nomor kontak resmi, dan sosial media.
                </p>
              </div>

              {/* Form Settings */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 space-y-6">
                
                {/* Announcement Bar Section */}
                <div className="space-y-3 pb-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white text-sm">Banner Pengumuman Atas (Announcement Bar)</h3>
                      <p className="text-[11px] text-slate-400">Teks berjalan di bar paling atas website</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settingsData.announcementActive}
                        onChange={(e) => setSettingsData({ ...settingsData, announcementActive: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={settingsData.announcementText}
                      onChange={(e) => setSettingsData({ ...settingsData, announcementText: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-primary-500"
                    />
                  </div>
                </div>

                {/* Identitas Pokok */}
                <div className="space-y-4 pb-6 border-b border-white/10">
                  <h3 className="font-bold text-white text-sm">Identitas Pokok Sekolah</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-slate-400 font-medium mb-1">Nama Resmi Sekolah</label>
                      <input
                        type="text"
                        value={settingsData.schoolName}
                        onChange={(e) => setSettingsData({ ...settingsData, schoolName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 font-medium mb-1">Nomor Pokok Sekolah Nasional (NPSN)</label>
                      <input
                        type="text"
                        value={settingsData.npsn}
                        onChange={(e) => setSettingsData({ ...settingsData, npsn: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 font-medium mb-1">Status Akreditasi</label>
                      <input
                        type="text"
                        value={settingsData.akreditasi}
                        onChange={(e) => setSettingsData({ ...settingsData, akreditasi: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 font-medium mb-1">Nomor Telepon & WhatsApp</label>
                      <input
                        type="text"
                        value={settingsData.phone}
                        onChange={(e) => setSettingsData({ ...settingsData, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 font-medium mb-1">Alamat Kampus Lengkap</label>
                    <input
                      type="text"
                      value={settingsData.address}
                      onChange={(e) => setSettingsData({ ...settingsData, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-primary-500"
                    />
                  </div>
                </div>

                {/* Sosial Media Settings */}
                <div className="space-y-4 pb-6 border-b border-white/10">
                  <h3 className="font-bold text-white text-sm">Akun Media Sosial Resmi (Footer)</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] text-slate-400 font-medium mb-1">Instagram (IG)</label>
                      <input
                        type="text"
                        value={settingsData.instagram}
                        onChange={(e) => setSettingsData({ ...settingsData, instagram: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 font-medium mb-1">TikTok</label>
                      <input
                        type="text"
                        value={settingsData.tiktok}
                        onChange={(e) => setSettingsData({ ...settingsData, tiktok: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 font-medium mb-1">YouTube</label>
                      <input
                        type="text"
                        value={settingsData.youtube}
                        onChange={(e) => setSettingsData({ ...settingsData, youtube: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => triggerToast('Pengaturan website berhasil disimpan ke memori!')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold shadow-lg transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Perubahan</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ============================================================== */}
      {/* MODAL 1: DETAIL & VERIFIKASI PENDAFTAR PPDB */}
      {/* ============================================================== */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-white/15 p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-slate-400">ID: {selectedApplicant.id}</span>
                <h3 className="text-base sm:text-lg font-bold text-white">{selectedApplicant.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedApplicant(null)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5">
                <span className="text-slate-400 text-[10px]">NISN</span>
                <div className="font-semibold text-white mt-0.5">{selectedApplicant.nisn}</div>
              </div>

              <div className="p-3 rounded-xl bg-white/5">
                <span className="text-slate-400 text-[10px]">Jalur Seleksi</span>
                <div className="font-semibold text-accent-gold mt-0.5">{selectedApplicant.track}</div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 col-span-2">
                <span className="text-slate-400 text-[10px]">Asal Sekolah (SD/MI)</span>
                <div className="font-semibold text-white mt-0.5">{selectedApplicant.schoolOrigin}</div>
              </div>

              <div className="p-3 rounded-xl bg-white/5">
                <span className="text-slate-400 text-[10px]">Rata-rata Rapor</span>
                <div className="font-bold text-emerald-400 text-sm mt-0.5">{selectedApplicant.averageScore} / 100</div>
              </div>

              <div className="p-3 rounded-xl bg-white/5">
                <span className="text-slate-400 text-[10px]">No. WhatsApp Wali</span>
                <div className="font-semibold text-white mt-0.5">{selectedApplicant.phone}</div>
              </div>
            </div>

            {/* Change Status Action */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-slate-300">Ubah Status Pendaftaran:</label>
              <div className="grid grid-cols-4 gap-2">
                {(['Menunggu', 'Terverifikasi', 'Diterima', 'Ditolak'] as Applicant['status'][]).map(status => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => handleUpdateStatus(selectedApplicant.id, status)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      selectedApplicant.status === status
                        ? 'bg-primary-600 text-white border-primary-400 ring-2 ring-primary-500/50'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-white/10">
              <a
                href={`https://wa.me/${selectedApplicant.phone.replace(/^0/, '62')}?text=Halo%20${encodeURIComponent(selectedApplicant.name)},%20kami%20dari%20Panitia%20PPDB%20Sekolah-Q%20menginformasikan%20status%20berkas%20Anda:%20${selectedApplicant.status}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim WA</span>
              </a>

              <button
                type="button"
                onClick={() => setSelectedApplicant(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: TULIS BERITA BARU */}
      {/* ============================================================== */}
      {showAddNewsModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-white/15 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-purple-400" />
                <span>Publikasikan Berita / Prestasi Baru</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddNewsModal(false)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Judul Artikel</label>
                <input
                  type="text"
                  placeholder="Misal: Tim Robotika Sekolah-Q Raih Juara 1 Nasional..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-primary-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Kategori</label>
                  <select className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-slate-200 text-xs">
                    <option>Prestasi Siswa</option>
                    <option>Akademik</option>
                    <option>Kegiatan Sekolah</option>
                    <option>Pengumuman</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Pilih Gambar Cover (WebP)</label>
                  <select className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-slate-200 text-xs">
                    <option value="/images/indo/teacher-tech.webp">Lab Robotika (WebP)</option>
                    <option value="/images/indo/hero-students.webp">Siswa Berprestasi (WebP)</option>
                    <option value="/images/indo/classroom-lab.webp">Ruang Kelas Lab (WebP)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Ringkasan Singkat (Excerpt)</label>
                <textarea
                  rows={2}
                  placeholder="1-2 kalimat ringkasan yang menarik pembaca..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-primary-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Isi Berita Lengkap</label>
                <textarea
                  rows={4}
                  placeholder="Tuliskan isi berita atau liputan lengkap di sini..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-primary-500"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowAddNewsModal(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddNewsModal(false);
                  triggerToast('Berita baru berhasil diterbitkan!');
                }}
                className="px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold"
              >
                Terbitkan Berita
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3: PANDUAN KONEKSI SUPABASE */}
      {/* ============================================================== */}
      {showSupabaseModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl bg-slate-900 border border-white/15 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-400" />
                <span>Panduan Integrasi Supabase Database</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowSupabaseModal(false)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
              <p>
                Tampilan Admin Panel ini saat ini menggunakan <strong>Mock State Interaktif</strong> sehingga Anda dapat langsung menguji alur kerja (tambah/edit/status/export) tanpa kendala konfigurasi backend.
              </p>
              
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                <strong>File Dokumentasi Backend Siap Digunakan:</strong>
                <p className="mt-1">
                  Buka file <code className="bg-black/40 px-1.5 py-0.5 rounded text-white font-mono">backend.md</code> di root direktori project untuk melihat skema tabel SQL lengkap, RLS policy, storage bucket, dan contoh kode Next.js Server Actions.
                </p>
              </div>

              <div className="space-y-1.5 text-slate-300">
                <div className="font-semibold text-white">4 Langkah Singkat Menyambungkan:</div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-accent-gold shrink-0">1</span>
                  <span>Buat project baru di <strong>supabase.com</strong>.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-accent-gold shrink-0">2</span>
                  <span>Salin script SQL dari <code className="text-accent-gold">backend.md</code> ke Supabase SQL Editor.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-accent-gold shrink-0">3</span>
                  <span>Masukkan URL & Anon Key ke file <code className="text-accent-gold">.env.local</code>.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-accent-gold shrink-0">4</span>
                  <span>Install library: <code className="text-accent-gold font-mono">npm i @supabase/supabase-js @supabase/ssr</code>.</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowSupabaseModal(false)}
                className="px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
