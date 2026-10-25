'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  GraduationCap,
  Users,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  KeyRound
} from 'lucide-react';

export interface AuthenticatedUser {
  name: string;
  roleCategory: 'Admin Pusat' | 'Wali Kelas' | 'Guru Mapel';
  username: string;
  title: string;
  avatarUrl: string;
}

export interface DemoAccount {
  roleCategory: 'Admin Pusat' | 'Wali Kelas' | 'Guru Mapel';
  roleBadgeColor: string;
  name: string;
  title: string;
  username: string;
  password: string;
  targetUrl: string;
  avatarUrl: string;
  icon: any;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  // 1 Akun Admin Pusat
  {
    roleCategory: 'Admin Pusat',
    roleBadgeColor: 'bg-[#8C57FF]/10 text-[#8C57FF] border-[#8C57FF]/25',
    name: 'Drs. H. M. Zainul Arifin, M.Pd.',
    title: 'Kepala Sekolah & Super Administrator',
    username: 'admin',
    password: 'admin123',
    targetUrl: '/admin',
    avatarUrl: '/images/indo/headmaster.webp',
    icon: ShieldCheck
  },
  // 2 Akun Wali Kelas
  {
    roleCategory: 'Wali Kelas',
    roleBadgeColor: 'bg-[#16B1FF]/10 text-[#0288D1] border-[#16B1FF]/25',
    name: 'Budi Santoso, S.Si., M.Pd.',
    title: 'Wali Kelas 8-A (Al-Khawarizmi) & Guru IPA',
    username: 'wali.budi',
    password: 'wali123',
    targetUrl: '/wali-kelas',
    avatarUrl: '/images/indo/teacher-science.webp',
    icon: GraduationCap
  },
  {
    roleCategory: 'Wali Kelas',
    roleBadgeColor: 'bg-[#16B1FF]/10 text-[#0288D1] border-[#16B1FF]/25',
    name: 'Ust. Ahmad Farhan, Lc., M.Ag.',
    title: 'Wali Kelas 9-A (Ar-Razi) & Guru PAI Tahfidz',
    username: 'wali.farhan',
    password: 'wali123',
    targetUrl: '/wali-kelas',
    avatarUrl: '/images/indo/teacher-tahfidz.webp',
    icon: GraduationCap
  },
  // 2 Akun Guru Mapel
  {
    roleCategory: 'Guru Mapel',
    roleBadgeColor: 'bg-[#56CA00]/10 text-[#46A200] border-[#56CA00]/25',
    name: 'Fitria Anindita, M.Pd.',
    title: 'Guru Bahasa Indonesia & Kelas Bilingual',
    username: 'guru.fitria',
    password: 'guru123',
    targetUrl: '/wali-kelas',
    avatarUrl: '/images/indo/teacher-english.webp',
    icon: Users
  },
  {
    roleCategory: 'Guru Mapel',
    roleBadgeColor: 'bg-[#FFB400]/10 text-[#B37F00] border-[#FFB400]/25',
    name: 'H. Zainal Abidin, S.Pd.',
    title: 'Guru PJOK & Koordinator Ekstrakurikuler',
    username: 'guru.zainal',
    password: 'guru123',
    targetUrl: '/wali-kelas',
    avatarUrl: '/images/indo/teacher-tech.webp',
    icon: Users
  }
];

interface LoginViewProps {
  onLoginSuccess?: (user: AuthenticatedUser) => void;
  subtitleNote?: string;
}

export default function LoginView({ onLoginSuccess, subtitleNote }: LoginViewProps) {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDemoIndex, setSelectedDemoIndex] = useState<number | null>(null);

  // Quick fill demo credentials
  const handleSelectDemo = (account: DemoAccount, index: number) => {
    setUsername(account.username);
    setPassword(account.password);
    setSelectedDemoIndex(index);
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Silakan isi username dan password Anda.');
      return;
    }

    setIsLoading(true);

    // Verify against registered accounts
    const match = DEMO_ACCOUNTS.find(
      acc => acc.username.toLowerCase() === username.trim().toLowerCase() && acc.password === password
    );

    setTimeout(() => {
      if (match) {
        const authData: AuthenticatedUser = {
          name: match.name,
          roleCategory: match.roleCategory,
          username: match.username,
          title: match.title,
          avatarUrl: match.avatarUrl
        };

        // Save current user to sessionStorage
        try {
          sessionStorage.setItem('sekolahq_auth_user', JSON.stringify(authData));
        } catch {
          // ignore storage fail
        }

        setSuccessMessage(`Login Berhasil! Selamat datang, ${match.name}.`);

        setTimeout(() => {
          if (onLoginSuccess) {
            onLoginSuccess(authData);
          } else {
            router.push(match.targetUrl);
          }
        }, 700);
      } else {
        setIsLoading(false);
        setErrorMessage('Username atau password salah. Silakan periksa kembali atau gunakan tombol isi cepat akun demo di bawah.');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F4F5FA] text-[#3A3541] flex flex-col font-sans relative overflow-x-hidden selection:bg-[#16B1FF]/15 selection:text-[#0288D1]">
      
      {/* Ambient Decorative Light Glow Blobs for Depth */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#16B1FF]/12 via-[#16B1FF]/4 to-transparent blur-3xl" />
        <div className="absolute top-1/4 -right-48 w-[650px] h-[650px] rounded-full bg-gradient-to-bl from-[#8C57FF]/10 via-[#8C57FF]/3 to-transparent blur-3xl" />
        <div className="absolute -bottom-36 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#56CA00]/7 via-[#16B1FF]/4 to-transparent blur-3xl" />
      </div>

      {/* Top Navigation Bar */}
      <header className="w-full px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B6774] hover:text-[#0288D1] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Kembali ke Website Utama</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#8A8D93] hidden sm:inline">Pusat Layanan Terpadu</span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#16B1FF]/10 text-[#0288D1] border border-[#16B1FF]/20">
            TA 2026/2027
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto w-full">
        
        {/* Brand Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#16B1FF] to-[#8C57FF] text-white font-black text-2xl shadow-[0_4px_16px_rgba(22,177,255,0.35)] mb-1">
            Q
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3A3541] tracking-tight">
            Portal Masuk SIM Sekolah-Q
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6774] max-w-md mx-auto">
            {subtitleNote || 'Satu pintu masuk untuk Admin Pusat, Wali Kelas, dan Dewan Guru Pengampu SMP Sekolah-Q Ujungpangkah.'}
          </p>
        </div>

        {/* Login Box & Quick Accounts Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Form Card (Left/Main Pane) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E9] shadow-[0_4px_24px_rgba(76,78,100,0.06)] space-y-5">
            <div>
              <h2 className="text-lg font-bold text-[#3A3541]">Masuk ke Akun Anda</h2>
              <p className="text-xs text-[#8A8D93] mt-0.5">Masukkan username dan password yang telah didaftarkan.</p>
            </div>

            {/* Error Feedback */}
            {errorMessage && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#FF4C51]/10 border border-[#FF4C51]/25 text-[#E53935] text-xs animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            {/* Success Feedback */}
            {successMessage && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#56CA00]/12 border border-[#56CA00]/30 text-[#46A200] text-xs animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-snug">{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Field: Username */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3A3541] block">
                  Username atau Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8D93]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={e => {
                      setUsername(e.target.value);
                      setSelectedDemoIndex(null);
                    }}
                    placeholder="Contoh: admin / wali.budi / guru.fitria"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F4F5FA] border border-[#E7E7E9] text-xs text-[#3A3541] placeholder:text-[#8A8D93] focus:bg-white focus:outline-none focus:border-[#16B1FF] focus:ring-2 focus:ring-[#16B1FF]/20 transition-all font-medium"
                    required
                  />
                </div>
              </div>

              {/* Field: Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#3A3541] block">
                    Kata Sandi (Password)
                  </label>
                  <span className="text-[11px] text-[#0288D1] cursor-pointer hover:underline" onClick={() => alert('Untuk akun demonstrasi, silakan klik salah satu kartu akun di panel sebelah kanan.')}>
                    Lupa Password?
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8D93]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value);
                      setSelectedDemoIndex(null);
                    }}
                    placeholder="Masukkan kata sandi"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#F4F5FA] border border-[#E7E7E9] text-xs text-[#3A3541] placeholder:text-[#8A8D93] focus:bg-white focus:outline-none focus:border-[#16B1FF] focus:ring-2 focus:ring-[#16B1FF]/20 transition-all font-medium"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8A8D93] hover:text-[#3A3541] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#16B1FF] border-[#E7E7E9] focus:ring-[#16B1FF]"
                  />
                  <span className="text-xs text-[#6B6774]">Ingat sesi masuk di perangkat ini</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] hover:from-[#0FA0E6] hover:to-[#7E4EE6] text-white font-bold text-xs sm:text-sm shadow-[0_4px_14px_rgba(22,177,255,0.35)] hover:shadow-[0_6px_20px_rgba(140,87,255,0.45)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.99] cursor-pointer mt-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Memverifikasi Akun...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk ke Sistem</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Helper Tip */}
            <div className="pt-3 border-t border-[#F4F5FA] flex items-center gap-2 text-[11px] text-[#8A8D93]">
              <KeyRound className="w-3.5 h-3.5 text-[#16B1FF] shrink-0" />
              <span>Gunakan kredensial yang telah didaftarkan oleh Super Admin.</span>
            </div>
          </div>

          {/* Quick Demo Accounts Helper (Right Pane) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-[#E7E7E9] shadow-[0_4px_24px_rgba(76,78,100,0.06)] space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#F4F5FA]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#8C57FF]/10 text-[#8C57FF] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#3A3541]">Uji Coba Cepat (5 Akun)</h3>
                  <p className="text-[10px] text-[#8A8D93]">Klik kartu untuk mengisi kredensial otomatis:</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {DEMO_ACCOUNTS.map((acc, idx) => {
                const IconComponent = acc.icon;
                const isSelected = selectedDemoIndex === idx;

                return (
                  <div
                    key={acc.username}
                    onClick={() => handleSelectDemo(acc, idx)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer text-left relative group ${
                      isSelected
                        ? 'bg-[#16B1FF]/8 border-[#16B1FF] shadow-xs ring-1 ring-[#16B1FF]'
                        : 'bg-[#F4F5FA] hover:bg-white hover:border-[#16B1FF]/40 border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${acc.roleBadgeColor}`}>
                        {acc.roleCategory}
                      </span>
                      <span className="text-[10px] font-mono text-[#8A8D93] group-hover:text-[#0288D1] transition-colors">
                        user: <strong className="text-[#3A3541]">{acc.username}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-white border border-[#E7E7E9] shrink-0 flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-[#8C57FF]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-[#3A3541] truncate">{acc.name}</div>
                        <div className="text-[10px] text-[#8A8D93] truncate">{acc.title}</div>
                      </div>
                    </div>

                    <div className="mt-2 pt-1.5 border-t border-[#E7E7E9]/60 flex items-center justify-between text-[10px] text-[#6B6774]">
                      <span>Password: <code className="bg-white px-1.5 py-0.5 rounded text-[#3A3541] font-mono border border-[#E7E7E9]">{acc.password}</code></span>
                      <span className="text-[#0288D1] font-semibold flex items-center gap-0.5 group-hover:underline">
                        Gunakan <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-[10px] text-[#8A8D93] text-center pt-2 border-t border-[#F4F5FA]">
              Akses Admin langsung menuju ke dashboard lengkap.
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-[11px] text-[#8A8D93] border-t border-[#E7E7E9]/70 bg-white/40">
        &copy; 2026 SMP Sekolah-Q Ujungpangkah Gresik. Hak Cipta Dilindungi.
      </footer>

    </div>
  );
}
