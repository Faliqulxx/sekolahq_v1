'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  GraduationCap,
  Search,
  Plus,
  Download,
  Filter,
  Edit3,
  Trash2,
  Eye,
  X,
  Phone,
  CheckCircle2,
  AlertCircle,
  Upload
} from 'lucide-react';
import { Student, ClassRoom } from '@/data/academicData';

interface AcademicStudentsSectionProps {
  students: Student[];
  classes: ClassRoom[];
  onAddStudent: (student: Student) => void;
  onUpdateStudent: (student: Student) => void;
  onDeleteStudent: (id: string) => void;
  triggerToast: (msg: string) => void;
}

export default function AcademicStudentsSection({
  students,
  classes,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
  triggerToast
}: AcademicStudentsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('Semua');
  const [classFilter, setClassFilter] = useState('Semua');
  const [statusFilter, setStatusFilter] = useState('Semua');

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudentId, setDeletingStudentId] = useState<string | null>(null);

  // New Student Form state
  const [formData, setFormData] = useState({
    name: '',
    nisn: '',
    nis: '',
    gender: 'L' as 'L' | 'P',
    gradeLevel: '7' as '7' | '8' | '9',
    classId: classes[0]?.id || 'KLS-7A',
    birthPlace: 'Gresik',
    birthDate: '2013-05-10',
    previousSchool: 'SD Negeri 1 Ujungpangkah',
    parentName: '',
    parentPhone: '',
    address: 'Ujungpangkah, Gresik',
    status: 'Aktif' as const,
    avatarUrl: '/images/indo/hero-students.webp'
  });

  // Filter students
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.nisn.includes(searchQuery) ||
                          s.nis.includes(searchQuery);
    const matchesGrade = gradeFilter === 'Semua' || s.gradeLevel === gradeFilter;
    const matchesClass = classFilter === 'Semua' || s.classId === classFilter;
    const matchesStatus = statusFilter === 'Semua' || s.status === statusFilter;
    return matchesSearch && matchesGrade && matchesClass && matchesStatus;
  });

  // Handle Save New Student
  const handleSaveNew = () => {
    if (!formData.name.trim() || !formData.nisn.trim()) {
      triggerToast('Mohon lengkapi nama dan NISN siswa');
      return;
    }
    const targetClass = classes.find(c => c.id === formData.classId);
    const created: Student = {
      id: `SIS-${Date.now()}`,
      name: formData.name,
      nisn: formData.nisn,
      nis: formData.nis || `${Math.floor(1000000 + Math.random() * 9000000)}`,
      gender: formData.gender,
      gradeLevel: formData.gradeLevel,
      classId: formData.classId,
      className: targetClass?.name || 'Kelas Belum Ditentukan',
      birthPlace: formData.birthPlace,
      birthDate: formData.birthDate,
      previousSchool: formData.previousSchool,
      parentName: formData.parentName || 'Wali Murid',
      parentPhone: formData.parentPhone || '081234567890',
      address: formData.address,
      status: formData.status,
      avatarUrl: formData.avatarUrl
    };
    onAddStudent(created);
    setShowAddModal(false);
    setFormData({
      name: '',
      nisn: '',
      nis: '',
      gender: 'L',
      gradeLevel: '7',
      classId: classes[0]?.id || 'KLS-7A',
      birthPlace: 'Gresik',
      birthDate: '2013-05-10',
      previousSchool: 'SD Negeri 1 Ujungpangkah',
      parentName: '',
      parentPhone: '',
      address: 'Ujungpangkah, Gresik',
      status: 'Aktif',
      avatarUrl: '/images/indo/hero-students.webp'
    });
    triggerToast(`Siswa ${created.name} berhasil didaftarkan!`);
  };

  // Handle Save Edit
  const handleSaveEdit = () => {
    if (!editingStudent) return;
    onUpdateStudent(editingStudent);
    setEditingStudent(null);
    triggerToast(`Data siswa ${editingStudent.name} berhasil diperbarui!`);
  };

  // Handle Delete
  const handleConfirmDelete = () => {
    if (!deletingStudentId) return;
    onDeleteStudent(deletingStudentId);
    setDeletingStudentId(null);
    triggerToast('Data siswa berhasil dihapus dari sistem!');
  };

  // Handle CSV Export
  const handleExportCSV = () => {
    const headers = 'ID,Nama Siswa,NISN,NIS,L/P,Tingkat,Kelas,Asal Sekolah,Nama Ortu,No. Telp Ortu,Status\n';
    const rows = filteredStudents.map(s => 
      `"${s.id}","${s.name}","${s.nisn}","${s.nis}","${s.gender}","${s.gradeLevel}","${s.className}","${s.previousSchool}","${s.parentName}","${s.parentPhone}","${s.status}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Data_Siswa_SekolahQ_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('File CSV data siswa berhasil diunduh!');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header & Primary Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#3A3541]">
            Manajemen Data Siswa (Peserta Didik)
          </h2>
          <p className="text-xs text-[#8A8D93]">
            Total {students.length} data siswa terdaftar di seluruh rombongan belajar
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-[#F4F5FA] text-[#3A3541] border border-[#E7E7E9] text-xs font-semibold shadow-xs transition-all"
          >
            <Download className="w-3.5 h-3.5 text-[#16B1FF]" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Siswa Baru</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-white border border-[#E7E7E9] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8D93]" />
          <input
            type="text"
            placeholder="Cari nama siswa, NISN, atau NIS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-xs text-[#3A3541] focus:bg-white focus:outline-none focus:border-[#8C57FF]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Grade filter */}
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#6B6774] text-xs focus:outline-none focus:border-[#8C57FF]"
          >
            <option value="Semua">Semua Tingkat</option>
            <option value="7">Kelas 7</option>
            <option value="8">Kelas 8</option>
            <option value="9">Kelas 9</option>
          </select>

          {/* Class filter */}
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#6B6774] text-xs focus:outline-none focus:border-[#8C57FF]"
          >
            <option value="Semua">Semua Kelas</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#6B6774] text-xs focus:outline-none focus:border-[#8C57FF]"
          >
            <option value="Semua">Semua Status</option>
            <option value="Aktif">Aktif</option>
            <option value="Mutasi">Mutasi</option>
            <option value="Lulus">Lulus</option>
          </select>
        </div>
      </div>

      {/* Student Table */}
      <div className="rounded-xl bg-white border border-[#E7E7E9] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[#6B6774] font-semibold border-b border-[#E7E7E9]">
              <tr>
                <th className="py-3 px-4">No</th>
                <th className="py-3 px-4">Nama Siswa</th>
                <th className="py-3 px-4">NISN / NIS</th>
                <th className="py-3 px-4">Kelas</th>
                <th className="py-3 px-4">L/P</th>
                <th className="py-3 px-4">Kontak Orang Tua</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E7E9] text-[#3A3541]">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((s, idx) => (
                  <tr key={s.id} className="hover:bg-[#F4F5FA] transition-colors">
                    <td className="py-3 px-4 text-[#8A8D93]">{idx + 1}</td>
                    <td className="py-3 px-4 font-semibold flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 relative shrink-0 border border-[#E7E7E9]">
                        <Image src={s.avatarUrl} alt={s.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div>{s.name}</div>
                        <div className="text-[10px] text-[#8A8D93]">{s.previousSchool}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-mono text-xs">{s.nisn}</div>
                      <div className="text-[10px] text-[#8A8D93] font-mono">NIS: {s.nis}</div>
                    </td>
                    <td className="py-3 px-4 font-medium text-[#8C57FF]">{s.className}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        s.gender === 'L' ? 'bg-[#16B1FF]/10 text-[#0288D1]' : 'bg-[#FF4C51]/10 text-[#FF4C51]'
                      }`}>
                        {s.gender === 'L' ? 'L' : 'P'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div>{s.parentName}</div>
                      <div className="text-[10px] text-[#8A8D93] flex items-center gap-1">
                        <Phone className="w-2.5 h-2.5 text-[#56CA00]" />
                        <span>{s.parentPhone}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#56CA00]/12 text-[#46A200] border border-[#56CA00]/30">
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setSelectedStudent(s)}
                          className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774] transition-colors"
                          title="Lihat Detail"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#16B1FF]" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingStudent(s)}
                          className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774] transition-colors"
                          title="Edit Data Siswa"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingStudentId(s.id)}
                          className="p-1.5 rounded-lg bg-[#FF4C51]/10 hover:bg-[#FF4C51]/20 text-[#FF4C51] transition-colors"
                          title="Hapus Siswa"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-xs text-[#8A8D93] italic">
                    Tidak ada data siswa yang cocok dengan filter pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal 1: Tambah Siswa */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
              <h3 className="text-base font-bold text-[#3A3541] flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#8C57FF]" />
                <span>Registrasi Siswa Baru</span>
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
                <label className="block text-[#8A8D93] font-medium mb-1">Nama Lengkap Siswa</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Misal: Muhammad Daffa Ramadhan"
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] focus:bg-white focus:border-[#8C57FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">NISN (10 Digit)</label>
                  <input
                    type="text"
                    value={formData.nisn}
                    onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                    placeholder="0098765432"
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  />
                </div>
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">NIS Lokal</label>
                  <input
                    type="text"
                    value={formData.nis}
                    onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                    placeholder="2607001"
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Jenis Kelamin</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  >
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Pilih Kelas / Rombel</label>
                  <select
                    value={formData.classId}
                    onChange={(e) => {
                      const selectedC = classes.find(c => c.id === e.target.value);
                      setFormData({ 
                        ...formData, 
                        classId: e.target.value,
                        gradeLevel: (selectedC?.gradeLevel || '7') as any
                      });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Nama Orang Tua / Wali</label>
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="Nama bapak/ibu"
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  />
                </div>
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Nomor WhatsApp Ortu</label>
                  <input
                    type="text"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    placeholder="081234567890"
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Asal Sekolah SD/MI</label>
                <input
                  type="text"
                  value={formData.previousSchool}
                  onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                  placeholder="SD Negeri 1 Ujungpangkah"
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
                Daftarkan Siswa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Edit Siswa */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
              <h3 className="text-base font-bold text-[#3A3541] flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#8C57FF]" />
                <span>Edit Data Siswa ({editingStudent.name})</span>
              </h3>
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Status Siswa</label>
                  <select
                    value={editingStudent.status}
                    onChange={(e) => setEditingStudent({ ...editingStudent, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Mutasi">Mutasi</option>
                    <option value="Lulus">Lulus</option>
                    <option value="Cuti">Cuti</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Pindah Kelas</label>
                  <select
                    value={editingStudent.classId}
                    onChange={(e) => {
                      const targetClass = classes.find(c => c.id === e.target.value);
                      setEditingStudent({
                        ...editingStudent,
                        classId: e.target.value,
                        className: targetClass?.name || editingStudent.className,
                        gradeLevel: (targetClass?.gradeLevel || editingStudent.gradeLevel) as any
                      });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">No. WhatsApp Orang Tua</label>
                <input
                  type="text"
                  value={editingStudent.parentPhone}
                  onChange={(e) => setEditingStudent({ ...editingStudent, parentPhone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#F4F5FA]">
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                className="px-4 py-2 rounded-lg bg-[#F4F5FA] text-[#6B6774] text-xs font-semibold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="px-4 py-2 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-bold shadow-sm"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: View Detail Siswa */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
              <h3 className="text-base font-bold text-[#3A3541] flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#8C57FF]" />
                <span>Profil Peserta Didik</span>
              </h3>
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[#F4F5FA] rounded-xl border border-[#E7E7E9]">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-white relative border-2 border-[#8C57FF]/30 shrink-0">
                <Image src={selectedStudent.avatarUrl} alt={selectedStudent.name} fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#3A3541]">{selectedStudent.name}</h4>
                <div className="text-xs text-[#8A8D93]">NISN: {selectedStudent.nisn} • NIS: {selectedStudent.nis}</div>
                <div className="text-[11px] font-semibold text-[#8C57FF]">{selectedStudent.className}</div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#F4F5FA]">
                <span className="text-[#8A8D93]">Tempat, Tgl Lahir:</span>
                <span className="font-semibold text-[#3A3541]">{selectedStudent.birthPlace}, {selectedStudent.birthDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F4F5FA]">
                <span className="text-[#8A8D93]">Asal Sekolah SD/MI:</span>
                <span className="font-semibold text-[#3A3541]">{selectedStudent.previousSchool}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F4F5FA]">
                <span className="text-[#8A8D93]">Nama Orang Tua:</span>
                <span className="font-semibold text-[#3A3541]">{selectedStudent.parentName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F4F5FA]">
                <span className="text-[#8A8D93]">WhatsApp Ortu:</span>
                <a
                  href={`https://wa.me/${selectedStudent.parentPhone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#56CA00] hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>{selectedStudent.parentPhone}</span>
                </a>
              </div>
              <div className="py-1">
                <span className="text-[#8A8D93] block mb-0.5">Alamat Domisili:</span>
                <span className="font-medium text-[#3A3541]">{selectedStudent.address}</span>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-[#F4F5FA]">
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#3A3541] text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 4: Konfirmasi Hapus */}
      {deletingStudentId && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#FF4C51]/10 text-[#FF4C51] flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#3A3541]">Hapus Data Siswa?</h3>
              <p className="text-xs text-[#6B6774] mt-1">
                Tindakan ini akan menghapus siswa dari daftar kelas aktif. Tindakan ini hanya bersifat simulasi demo frontend.
              </p>
            </div>
            <div className="flex justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingStudentId(null)}
                className="px-4 py-2 rounded-lg bg-[#F4F5FA] text-[#6B6774] text-xs font-semibold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg bg-[#FF4C51] hover:bg-red-600 text-white text-xs font-bold shadow-sm"
              >
                Ya, Hapus Data
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
