'use client';

import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  BookOpen,
  Layers,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import {
  HomeroomAssignment,
  TeachingAssignment,
  ClassRoom,
  Subject
} from '@/data/academicData';
import { Teacher } from '@/data/schoolData';

interface AcademicAssignmentsSectionProps {
  homeroomAssignments: HomeroomAssignment[];
  teachingAssignments: TeachingAssignment[];
  classes: ClassRoom[];
  subjects: Subject[];
  teachers: Teacher[];
  onUpdateHomeroomAssignment: (classId: string, teacherId: string) => void;
  onAddTeachingAssignment: (assignment: TeachingAssignment) => void;
  onDeleteTeachingAssignment: (id: string) => void;
  triggerToast: (msg: string) => void;
}

export default function AcademicAssignmentsSection({
  homeroomAssignments,
  teachingAssignments,
  classes,
  subjects,
  teachers,
  onUpdateHomeroomAssignment,
  onAddTeachingAssignment,
  onDeleteTeachingAssignment,
  triggerToast
}: AcademicAssignmentsSectionProps) {
  const [activeSubTab, setActiveSubTab] = useState<'wali' | 'mapel'>('wali');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [showAddTeachingModal, setShowAddTeachingModal] = useState(false);
  const [editingHomeroomClass, setEditingHomeroomClass] = useState<ClassRoom | null>(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(teachers[0]?.id || '');
  const [deletingAssignmentId, setDeletingAssignmentId] = useState<string | null>(null);

  // New Teaching Assignment Form
  const [newTeachingForm, setNewTeachingForm] = useState({
    teacherId: teachers[0]?.id || '',
    subjectId: subjects[0]?.id || '',
    classId: classes[0]?.id || '',
    hoursPerWeek: 4
  });

  // Filtered Teaching Assignments
  const filteredTeaching = teachingAssignments.filter(t =>
    t.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Save Homeroom Assignment
  const handleSaveHomeroom = () => {
    if (!editingHomeroomClass) return;
    onUpdateHomeroomAssignment(editingHomeroomClass.id, selectedTeacherId);
    setEditingHomeroomClass(null);
    const t = teachers.find(item => item.id === selectedTeacherId);
    triggerToast(`Wali kelas ${editingHomeroomClass.name} diperbarui: ${t?.name}`);
  };

  // Handle Save New Teaching Assignment
  const handleSaveTeaching = () => {
    const t = teachers.find(item => item.id === newTeachingForm.teacherId);
    const sub = subjects.find(item => item.id === newTeachingForm.subjectId);
    const cls = classes.find(item => item.id === newTeachingForm.classId);

    const created: TeachingAssignment = {
      id: `TA-${Date.now()}`,
      teacherId: newTeachingForm.teacherId,
      teacherName: t?.name || 'Guru',
      subjectId: newTeachingForm.subjectId,
      subjectName: sub?.name || 'Mata Pelajaran',
      subjectCode: sub?.code || 'MAPEL',
      classId: newTeachingForm.classId,
      className: cls?.name || 'Kelas',
      academicYearId: 'AY-2026-GANJIL',
      hoursPerWeek: newTeachingForm.hoursPerWeek,
      status: 'Aktif'
    };

    onAddTeachingAssignment(created);
    setShowAddTeachingModal(false);
    triggerToast(`Penugasan ${created.teacherName} pada ${created.subjectName} (${created.className}) berhasil dibuat!`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#3A3541]">
            Penugasan Pendidik & Tenaga Kependidikan
          </h2>
          <p className="text-xs text-[#8A8D93]">
            Tata kelola penetapan Wali Rombel dan Surat Keputusan (SK) Beban Mengajar Guru
          </p>
        </div>

        {activeSubTab === 'mapel' && (
          <button
            type="button"
            onClick={() => setShowAddTeachingModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-semibold shadow-sm transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Beban Mengajar</span>
          </button>
        )}
      </div>

      {/* Info Notice Box */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#8C57FF]/10 to-[#16B1FF]/10 border border-[#8C57FF]/20 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-[#8C57FF] shrink-0 mt-0.5" />
        <div className="text-xs text-[#3A3541] leading-relaxed">
          <strong>Prinsip Penugasan Ganda:</strong> Seorang guru dapat mengemban 2 tanggung jawab sekaligus: sebagai <em>Wali Kelas</em> (pembina kesiswaan dan presensi satu rombel) dan sebagai <em>Guru Pengampu Mata Pelajaran</em> (mengajar di beberapa kelas rombel). Akses wali kelas tidak secara otomatis membuka data penilaian kelas lain.
        </div>
      </div>

      {/* Segmented Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E7E7E9] pb-3">
        <button
          type="button"
          onClick={() => setActiveSubTab('wali')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'wali'
              ? 'bg-[#8C57FF] text-white shadow-xs'
              : 'bg-white text-[#6B6774] hover:bg-[#F4F5FA] border border-[#E7E7E9]'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>1. Penugasan Wali Kelas ({classes.length} Rombel)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('mapel')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'mapel'
              ? 'bg-[#8C57FF] text-white shadow-xs'
              : 'bg-white text-[#6B6774] hover:bg-[#F4F5FA] border border-[#E7E7E9]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>2. Penugasan Guru Mata Pelajaran ({teachingAssignments.length} Beban KBM)</span>
        </button>
      </div>

      {/* SUB-TAB 1: WALI KELAS */}
      {activeSubTab === 'wali' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {classes.map(cls => (
            <div
              key={cls.id}
              className="rounded-xl bg-white border border-[#E7E7E9] shadow-sm p-5 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-[#3A3541]">{cls.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#8C57FF]/10 text-[#8C57FF]">
                    Tingkat {cls.gradeLevel}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F4F5FA] border border-[#E7E7E9]/70 space-y-2">
                  <span className="text-[10px] text-[#8A8D93] uppercase font-bold block">Wali Kelas Aktif:</span>
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#16B1FF]/20 text-[#0288D1] flex items-center justify-center font-bold text-xs shrink-0">
                      WK
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#3A3541]">{cls.homeroomTeacherName}</div>
                      <div className="text-[10px] text-[#8A8D93]">SK Penetapan TA 2026/2027 Ganjil</div>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-[#6B6774] flex justify-between">
                  <span>Ruang Kelas: <strong>{cls.roomNumber}</strong></span>
                  <span>Kapasitas: <strong>{cls.capacity} Siswa</strong></span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F4F5FA] flex justify-between items-center">
                <span className="text-[11px] text-[#56CA00] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> SK Terbit
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setEditingHomeroomClass(cls);
                    setSelectedTeacherId(cls.homeroomTeacherId || teachers[0]?.id || '');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#8C57FF]/10 hover:bg-[#8C57FF]/20 text-[#8C57FF] text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Ganti Wali Kelas</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB 2: GURU MATA PELAJARAN */}
      {activeSubTab === 'mapel' && (
        <div className="space-y-4">
          
          {/* Search bar */}
          <div className="p-3.5 bg-white rounded-xl border border-[#E7E7E9] shadow-xs flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8D93]" />
              <input
                type="text"
                placeholder="Cari guru, mata pelajaran, atau kelas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-xs text-[#3A3541] focus:bg-white focus:outline-none focus:border-[#8C57FF]"
              />
            </div>
            <div className="text-xs text-[#8A8D93]">
              Menampilkan {filteredTeaching.length} penugasan
            </div>
          </div>

          {/* Teaching Assignments Table */}
          <div className="rounded-xl bg-white border border-[#E7E7E9] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] text-[#6B6774] font-semibold border-b border-[#E7E7E9]">
                  <tr>
                    <th className="py-3 px-4">No</th>
                    <th className="py-3 px-4">Guru Pengampu</th>
                    <th className="py-3 px-4">Mata Pelajaran</th>
                    <th className="py-3 px-4">Kelas Sasaran</th>
                    <th className="py-3 px-4 text-center">Beban Mengajar</th>
                    <th className="py-3 px-4">Status SK</th>
                    <th className="py-3 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E7E9] text-[#3A3541]">
                  {filteredTeaching.map((ta, idx) => (
                    <tr key={ta.id} className="hover:bg-[#F4F5FA] transition-colors">
                      <td className="py-3 px-4 text-[#8A8D93]">{idx + 1}</td>
                      <td className="py-3 px-4 font-semibold flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#8C57FF]/15 text-[#8C57FF] flex items-center justify-center font-bold text-[10px]">
                          {ta.teacherName.charAt(0)}
                        </div>
                        <span>{ta.teacherName}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold">{ta.subjectName}</div>
                        <div className="text-[10px] font-mono text-[#8C57FF]">{ta.subjectCode}</div>
                      </td>
                      <td className="py-3 px-4 font-medium text-[#16B1FF]">{ta.className}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="font-bold">{ta.hoursPerWeek}</span> Jam / Minggu
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#56CA00]/12 text-[#46A200] border border-[#56CA00]/30">
                          {ta.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => setDeletingAssignmentId(ta.id)}
                          className="p-1.5 rounded-lg bg-[#FF4C51]/10 hover:bg-[#FF4C51]/20 text-[#FF4C51] transition-colors"
                          title="Hapus Penugasan KBM"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* Modal 1: Ganti Wali Kelas */}
      {editingHomeroomClass && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
              <h3 className="text-base font-bold text-[#3A3541] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#8C57FF]" />
                <span>Tetapkan Wali Kelas ({editingHomeroomClass.name})</span>
              </h3>
              <button
                type="button"
                onClick={() => setEditingHomeroomClass(null)}
                className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Pilih Tenaga Pendidik</label>
                <select
                  value={selectedTeacherId}
                  onChange={(e) => setSelectedTeacherId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] text-xs"
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name} — {t.role}</option>
                  ))}
                </select>
              </div>

              <div className="p-3 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9]/70 text-[11px] text-[#6B6774] leading-relaxed">
                Wali kelas terpilih akan mendapatkan hak akses otomatis ke Portal Wali Kelas untuk mengelola daftar presensi harian, nilai leger, dan komunikasi dengan wali murid kelas ini.
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#F4F5FA]">
              <button
                type="button"
                onClick={() => setEditingHomeroomClass(null)}
                className="px-4 py-2 rounded-lg bg-[#F4F5FA] text-[#6B6774] text-xs font-semibold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveHomeroom}
                className="px-4 py-2 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-bold shadow-sm"
              >
                Simpan Penetapan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Tambah Penugasan Mengajar */}
      {showAddTeachingModal && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
              <h3 className="text-base font-bold text-[#3A3541] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#8C57FF]" />
                <span>Tambah Penugasan Mengajar (SK KBM)</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddTeachingModal(false)}
                className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Guru Pengampu</label>
                <select
                  value={newTeachingForm.teacherId}
                  onChange={(e) => setNewTeachingForm({ ...newTeachingForm, teacherId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Mata Pelajaran</label>
                <select
                  value={newTeachingForm.subjectId}
                  onChange={(e) => setNewTeachingForm({ ...newTeachingForm, subjectId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                >
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Kelas Sasaran KBM</label>
                <select
                  value={newTeachingForm.classId}
                  onChange={(e) => setNewTeachingForm({ ...newTeachingForm, classId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                >
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Alokasi Jam Tatap Muka / Minggu</label>
                <input
                  type="number"
                  value={newTeachingForm.hoursPerWeek}
                  onChange={(e) => setNewTeachingForm({ ...newTeachingForm, hoursPerWeek: parseInt(e.target.value) || 2 })}
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#F4F5FA]">
              <button
                type="button"
                onClick={() => setShowAddTeachingModal(false)}
                className="px-4 py-2 rounded-lg bg-[#F4F5FA] text-[#6B6774] text-xs font-semibold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveTeaching}
                className="px-4 py-2 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-bold shadow-sm"
              >
                Terbitkan SK Penugasan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Konfirmasi Hapus Penugasan */}
      {deletingAssignmentId && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#FF4C51]/10 text-[#FF4C51] flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#3A3541]">Hapus SK Penugasan?</h3>
              <p className="text-xs text-[#6B6774] mt-1">
                Beban mengajar guru ini pada kelas terkait akan dicabut dari sistem penjadwalan.
              </p>
            </div>
            <div className="flex justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingAssignmentId(null)}
                className="px-4 py-2 rounded-lg bg-[#F4F5FA] text-[#6B6774] text-xs font-semibold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteTeachingAssignment(deletingAssignmentId);
                  setDeletingAssignmentId(null);
                  triggerToast('Penugasan mengajar berhasil dicabut!');
                }}
                className="px-4 py-2 rounded-lg bg-[#FF4C51] hover:bg-red-600 text-white text-xs font-bold shadow-sm"
              >
                Ya, Cabut SK
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
