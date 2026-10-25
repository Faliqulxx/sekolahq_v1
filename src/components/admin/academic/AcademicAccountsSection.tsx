'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  ShieldCheck,
  Search,
  Plus,
  Key,
  CheckCircle2,
  Lock,
  ExternalLink,
  Edit3,
  X,
  Sparkles,
  Award,
  School
} from 'lucide-react';
import { UserAccount } from '@/data/academicData';
import { Teacher } from '@/data/schoolData';

interface AcademicAccountsSectionProps {
  users: UserAccount[];
  teachers: Teacher[];
  onAddUser: (user: UserAccount) => void;
  onToggleStatus: (userId: string) => void;
  triggerToast: (msg: string) => void;
}

export default function AcademicAccountsSection({
  users,
  teachers,
  onAddUser,
  onToggleStatus,
  triggerToast
}: AcademicAccountsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('Semua');

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    role: 'Guru' as UserAccount['role'],
    teacherId: teachers[0]?.id || '',
    avatarUrl: '/images/indo/teacher-tech.webp'
  });

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'Semua' || u.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleSaveNew = () => {
    if (!formData.username.trim() || !formData.name.trim()) {
      triggerToast('Mohon lengkapi username dan nama pengguna');
      return;
    }
    const created: UserAccount = {
      id: `USR-${Date.now()}`,
      username: formData.username.toLowerCase().replace(/\s+/g, '.'),
      name: formData.name,
      email: formData.email || `${formData.username}@sekolah-q.sch.id`,
      role: formData.role,
      status: 'Aktif',
      teacherId: formData.teacherId,
      avatarUrl: formData.avatarUrl,
      lastLogin: 'Baru Dibuat',
      permissions: formData.role === 'Admin'
        ? ['all_access', 'ppdb_manage', 'academic_manage', 'settings_manage']
        : formData.role === 'Wali Kelas'
        ? ['homeroom_dashboard', 'homeroom_roster', 'homeroom_attendance', 'homeroom_grades']
        : ['teacher_schedule', 'subject_grading']
    };

    onAddUser(created);
    setShowAddModal(false);
    setFormData({
      username: '',
      name: '',
      email: '',
      role: 'Guru',
      teacherId: teachers[0]?.id || '',
      avatarUrl: '/images/indo/teacher-tech.webp'
    });
    triggerToast(`Akun pengguna ${created.username} (${created.role}) berhasil dibuat!`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#3A3541]">
            Akun Pengguna & Hak Akses (Role Permissions)
          </h2>
          <p className="text-xs text-[#8A8D93]">
            Simulasi manajemen akun tenaga pendidik, wali kelas, dan super administrator sekolah
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-semibold shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Akun Baru</span>
        </button>
      </div>

      {/* Role Permission Matrix Card */}
      <div className="p-5 rounded-xl bg-white border border-[#E7E7E9] shadow-sm space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#F4F5FA]">
          <Key className="w-4 h-4 text-[#8C57FF]" />
          <h3 className="font-bold text-sm text-[#3A3541]">Hak Akses Berdasarkan Peran (Role Architecture)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Admin Role */}
          <div className="p-3.5 rounded-xl bg-[#8C57FF]/8 border border-[#8C57FF]/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#8C57FF] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Super Administrator
              </span>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded font-bold text-[#8C57FF] border border-[#8C57FF]/30">
                Penuh
              </span>
            </div>
            <p className="text-[11px] text-[#6B6774] leading-relaxed">
              Memiliki wewenang menyeluruh atas konfigurasi identitas sekolah, seleksi PPDB, struktur kurikulum, penugasan guru, jadwal KBM, dan manajemen database.
            </p>
          </div>

          {/* Wali Kelas Role */}
          <div className="p-3.5 rounded-xl bg-[#16B1FF]/8 border border-[#16B1FF]/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#0288D1] flex items-center gap-1.5">
                <School className="w-4 h-4" />
                Wali Kelas (Homeroom)
              </span>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded font-bold text-[#0288D1] border border-[#16B1FF]/30">
                Khusus Rombel
              </span>
            </div>
            <p className="text-[11px] text-[#6B6774] leading-relaxed">
              Diberikan akses khusus ke <strong>Portal Wali Kelas</strong> untuk mengelola presensi harian, buku induk siswa rombelnya, catatan leger nilai, dan laporan akhir semester.
            </p>
          </div>

          {/* Guru Pengampu Role */}
          <div className="p-3.5 rounded-xl bg-[#56CA00]/8 border border-[#56CA00]/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#46A200] flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                Guru Mata Pelajaran
              </span>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded font-bold text-[#46A200] border border-[#56CA00]/30">
                KBM Terkait
              </span>
            </div>
            <p className="text-[11px] text-[#6B6774] leading-relaxed">
              Hanya dapat melihat jadwal mengajar pribadi dan menginput nilai tugas/ujian mata pelajaran yang diampunya pada kelas yang ditugaskan dalam SK KBM.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-white border border-[#E7E7E9] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8D93]" />
          <input
            type="text"
            placeholder="Cari nama, username, atau email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-xs text-[#3A3541] focus:bg-white focus:outline-none focus:border-[#8C57FF]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          {['Semua', 'Admin', 'Wali Kelas', 'Guru'].map(roleName => (
            <button
              key={roleName}
              type="button"
              onClick={() => setSelectedRole(roleName)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedRole === roleName
                  ? 'bg-[#8C57FF] text-white shadow-xs'
                  : 'bg-[#F4F5FA] text-[#6B6774] hover:bg-slate-200'
              }`}
            >
              {roleName}
            </button>
          ))}
        </div>
      </div>

      {/* User Accounts Table */}
      <div className="rounded-xl bg-white border border-[#E7E7E9] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[#6B6774] font-semibold border-b border-[#E7E7E9]">
              <tr>
                <th className="py-3 px-4">Pengguna</th>
                <th className="py-3 px-4">Username & Email</th>
                <th className="py-3 px-4">Peran Utama (Role)</th>
                <th className="py-3 px-4">Penugasan Terkait</th>
                <th className="py-3 px-4">Login Terakhir</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Uji Coba Akses</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E7E9] text-[#3A3541]">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-[#F4F5FA] transition-colors">
                  <td className="py-3 px-4 font-semibold flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 relative shrink-0 border border-[#E7E7E9]">
                      <Image src={user.avatarUrl} alt={user.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div>{user.name}</div>
                      <div className="text-[10px] text-[#8A8D93]">ID: {user.id}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-mono text-xs text-[#8C57FF]">@{user.username}</div>
                    <div className="text-[11px] text-[#8A8D93]">{user.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      user.role === 'Admin'
                        ? 'bg-[#8C57FF]/12 text-[#8C57FF] border border-[#8C57FF]/30'
                        : user.role === 'Wali Kelas'
                        ? 'bg-[#16B1FF]/12 text-[#0288D1] border border-[#16B1FF]/30'
                        : 'bg-[#56CA00]/12 text-[#46A200] border border-[#56CA00]/30'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#6B6774]">
                    {user.assignedClassName ? (
                      <span className="font-semibold text-[#0288D1]">{user.assignedClassName}</span>
                    ) : (
                      <span className="text-[#8A8D93] italic">Hak Akses Umum</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-[#8A8D93] font-mono text-[11px]">{user.lastLogin}</td>
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => {
                        onToggleStatus(user.id);
                        triggerToast(`Status akun @${user.username} diperbarui!`);
                      }}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-colors ${
                        user.status === 'Aktif'
                          ? 'bg-[#56CA00]/12 text-[#46A200] border border-[#56CA00]/30'
                          : 'bg-[#FF4C51]/12 text-[#FF4C51] border border-[#FF4C51]/30'
                      }`}
                      title="Klik untuk ubah status aktif/nonaktif"
                    >
                      {user.status}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {user.role === 'Wali Kelas' ? (
                      <Link
                        href="/wali-kelas"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#16B1FF]/10 hover:bg-[#16B1FF]/20 text-[#0288D1] text-xs font-semibold transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Buka Portal</span>
                      </Link>
                    ) : user.role === 'Guru' ? (
                      <Link
                        href="/wali-kelas?role=guru"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#56CA00]/10 hover:bg-[#56CA00]/20 text-[#46A200] text-xs font-semibold transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Simulasi Guru</span>
                      </Link>
                    ) : (
                      <span className="text-[11px] text-[#8C57FF] font-semibold">
                        Sesi Saat Ini
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah User */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
              <h3 className="text-base font-bold text-[#3A3541] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#8C57FF]" />
                <span>Buat Akun Pengguna Baru</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Tautkan ke Data Guru</label>
                <select
                  value={formData.teacherId}
                  onChange={(e) => {
                    const selTeacher = teachers.find(t => t.id === e.target.value);
                    setFormData({
                      ...formData,
                      teacherId: e.target.value,
                      name: selTeacher?.name || formData.name,
                      username: selTeacher?.name.toLowerCase().replace(/[^a-z]/g, '').slice(0, 10) || formData.username
                    });
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nama Lengkap & Gelar"
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Username Login</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="nama.user"
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Peran Akses (Role)</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  >
                    <option value="Guru">Guru Mata Pelajaran</option>
                    <option value="Wali Kelas">Wali Kelas</option>
                    <option value="Admin">Super Administrator</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Alamat Email Resmi</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="user@sekolah-q.sch.id"
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#F4F5FA]">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg bg-[#F4F5FA] text-[#6B6774] text-xs font-semibold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveNew}
                className="px-4 py-2 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-bold shadow-sm"
              >
                Buat Akun
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
