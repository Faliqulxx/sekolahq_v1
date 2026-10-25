'use client';

import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Users,
  Edit3,
  Trash2,
  X,
  Check,
  UserCheck,
  AlertCircle,
  Eye,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { ClassRoom, Student } from '@/data/academicData';
import { Teacher } from '@/data/schoolData';

interface AcademicClassesSectionProps {
  classes: ClassRoom[];
  students: Student[];
  teachers: Teacher[];
  onAddClass: (newClass: ClassRoom) => void;
  onUpdateClass: (updated: ClassRoom) => void;
  triggerToast: (msg: string) => void;
}

export default function AcademicClassesSection({
  classes,
  students,
  teachers,
  onAddClass,
  onUpdateClass,
  triggerToast
}: AcademicClassesSectionProps) {
  const [selectedGrade, setSelectedGrade] = useState<'Semua' | '7' | '8' | '9'>('Semua');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassRoom | null>(null);
  const [rosterClass, setRosterClass] = useState<ClassRoom | null>(null);

  // New Class Form
  const [formData, setFormData] = useState({
    name: '',
    gradeLevel: '7' as '7' | '8' | '9',
    homeroomTeacherId: teachers[0]?.id || 'guru-it',
    roomNumber: 'R.103',
    capacity: 32
  });

  // Filtered classes
  const filteredClasses = classes.filter(c => selectedGrade === 'Semua' || c.gradeLevel === selectedGrade);

  // Handle Save New Class with duplicate prevention
  const handleSaveNew = () => {
    if (!formData.name.trim()) {
      triggerToast('Mohon masukkan nama kelas');
      return;
    }
    // Prevent duplicate name in same grade
    const duplicate = classes.some(
      c => c.name.toLowerCase() === formData.name.toLowerCase() && c.gradeLevel === formData.gradeLevel
    );
    if (duplicate) {
      triggerToast(`Nama kelas "${formData.name}" sudah ada di Tingkat ${formData.gradeLevel}!`);
      return;
    }

    const assignedTeacher = teachers.find(t => t.id === formData.homeroomTeacherId);
    const created: ClassRoom = {
      id: `KLS-${Date.now()}`,
      name: formData.name,
      gradeLevel: formData.gradeLevel,
      academicYearId: 'AY-2026-GANJIL',
      homeroomTeacherId: formData.homeroomTeacherId,
      homeroomTeacherName: assignedTeacher?.name || 'Belum Ditentukan',
      roomNumber: formData.roomNumber,
      capacity: formData.capacity,
      studentCount: 0
    };

    onAddClass(created);
    setShowAddModal(false);
    setFormData({
      name: '',
      gradeLevel: '7',
      homeroomTeacherId: teachers[0]?.id || 'guru-it',
      roomNumber: 'R.103',
      capacity: 32
    });
    triggerToast(`Kelas ${created.name} berhasil dibuat!`);
  };

  // Handle Save Edit Class
  const handleSaveEdit = () => {
    if (!editingClass) return;
    const assignedTeacher = teachers.find(t => t.id === editingClass.homeroomTeacherId);
    const updated: ClassRoom = {
      ...editingClass,
      homeroomTeacherName: assignedTeacher?.name || editingClass.homeroomTeacherName
    };
    onUpdateClass(updated);
    setEditingClass(null);
    triggerToast(`Data kelas ${updated.name} berhasil diperbarui!`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#3A3541]">
            Kelas & Rombongan Belajar (Rombel)
          </h2>
          <p className="text-xs text-[#8A8D93]">
            Pengelompokan siswa per tingkat, penetapan wali kelas, dan kuota ruang kelas
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-semibold shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Kelas Baru</span>
        </button>
      </div>

      {/* Grade Level Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E7E7E9] pb-3">
        {(['Semua', '7', '8', '9'] as const).map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setSelectedGrade(tab)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedGrade === tab
                ? 'bg-[#8C57FF] text-white shadow-xs'
                : 'bg-white text-[#6B6774] hover:bg-[#F4F5FA] border border-[#E7E7E9]'
            }`}
          >
            {tab === 'Semua' ? 'Semua Tingkat' : `Tingkat ${tab}`}
          </button>
        ))}
      </div>

      {/* Grid of Class Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredClasses.map(cls => {
          // Dynamic count of students belonging to this class
          const currentStudentCount = students.filter(s => s.classId === cls.id).length || cls.studentCount || 0;
          const percentageFilled = Math.min(100, Math.round((currentStudentCount / cls.capacity) * 100));

          return (
            <div
              key={cls.id}
              className="rounded-xl bg-white border border-[#E7E7E9] shadow-sm hover:border-[#8C57FF] transition-all p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#8C57FF]/10 text-[#8C57FF]">
                    Tingkat {cls.gradeLevel}
                  </span>
                  <span className="text-[11px] font-mono text-[#8A8D93]">{cls.roomNumber}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#3A3541]">{cls.name}</h3>
                  <div className="text-xs text-[#8A8D93] mt-0.5">Kapasitas Maks: {cls.capacity} Kursi</div>
                </div>

                {/* Homeroom Teacher Box */}
                <div className="p-3 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9]/70 space-y-1">
                  <span className="text-[10px] font-bold text-[#8A8D93] uppercase block">Wali Kelas:</span>
                  {cls.homeroomTeacherId ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#16B1FF]/20 text-[#0288D1] flex items-center justify-center text-xs font-bold shrink-0">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-semibold text-[#3A3541] truncate" title={cls.homeroomTeacherName}>
                        {cls.homeroomTeacherName}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-[#FFB400] font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Belum ada wali kelas</span>
                    </div>
                  )}
                </div>

                {/* Capacity Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-[#6B6774]">
                    <span>Keterisian Rombel:</span>
                    <span className="font-bold text-[#3A3541]">{currentStudentCount} / {cls.capacity} Siswa</span>
                  </div>
                  <div className="w-full bg-[#E7E7E9] h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        percentageFilled >= 90 ? 'bg-[#56CA00]' : 'bg-[#16B1FF]'
                      }`}
                      style={{ width: `${percentageFilled}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-[#F4F5FA] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setRosterClass(cls)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#16B1FF] hover:underline"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Daftar Siswa ({currentStudentCount})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEditingClass(cls)}
                  className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774] transition-colors"
                  title="Edit Rombel & Ganti Wali Kelas"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal 1: Tambah Kelas Baru */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
              <h3 className="text-base font-bold text-[#3A3541] flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#8C57FF]" />
                <span>Tambah Rombel Kelas Baru</span>
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
                <label className="block text-[#8A8D93] font-medium mb-1">Nama Rombel</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Misal: Kelas 7-C (Ibnu Rusyd)"
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] focus:bg-white focus:border-[#8C57FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Tingkat Kelas</label>
                  <select
                    value={formData.gradeLevel}
                    onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  >
                    <option value="7">Kelas 7</option>
                    <option value="8">Kelas 8</option>
                    <option value="9">Kelas 9</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Nomor Ruang Kelas</label>
                  <input
                    type="text"
                    value={formData.roomNumber}
                    onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                    placeholder="R.103"
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Pilih Wali Kelas</label>
                <select
                  value={formData.homeroomTeacherId}
                  onChange={(e) => setFormData({ ...formData, homeroomTeacherId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Kapasitas Kursi</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 32 })}
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
                Simpan Kelas
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Edit Kelas & Ganti Wali Kelas */}
      {editingClass && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
              <h3 className="text-base font-bold text-[#3A3541] flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#8C57FF]" />
                <span>Edit Rombel ({editingClass.name})</span>
              </h3>
              <button
                type="button"
                onClick={() => setEditingClass(null)}
                className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Nama Rombel</label>
                <input
                  type="text"
                  value={editingClass.name}
                  onChange={(e) => setEditingClass({ ...editingClass, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                />
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Wali Kelas Ditugaskan</label>
                <select
                  value={editingClass.homeroomTeacherId}
                  onChange={(e) => setEditingClass({ ...editingClass, homeroomTeacherId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.role})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Ruang Kelas</label>
                  <input
                    type="text"
                    value={editingClass.roomNumber}
                    onChange={(e) => setEditingClass({ ...editingClass, roomNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  />
                </div>
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Kapasitas</label>
                  <input
                    type="number"
                    value={editingClass.capacity}
                    onChange={(e) => setEditingClass({ ...editingClass, capacity: parseInt(e.target.value) || 32 })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#F4F5FA]">
              <button
                type="button"
                onClick={() => setEditingClass(null)}
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

      {/* Modal 3: Roster Siswa Kelas */}
      {rosterClass && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
              <div>
                <h3 className="text-base font-bold text-[#3A3541] flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#8C57FF]" />
                  <span>Roster Siswa — {rosterClass.name}</span>
                </h3>
                <div className="text-xs text-[#8A8D93]">Wali Kelas: {rosterClass.homeroomTeacherName}</div>
              </div>
              <button
                type="button"
                onClick={() => setRosterClass(null)}
                className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {students.filter(s => s.classId === rosterClass.id).length > 0 ? (
                students.filter(s => s.classId === rosterClass.id).map((stu, i) => (
                  <div key={stu.id} className="p-3 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9]/70 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 text-[#8A8D93] text-center font-mono">{i + 1}</span>
                      <div>
                        <div className="font-bold text-[#3A3541]">{stu.name}</div>
                        <div className="text-[10px] text-[#8A8D93]">NISN: {stu.nisn} • {stu.previousSchool}</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#56CA00]/12 text-[#46A200]">
                      {stu.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-[#8A8D93] italic">
                  Belum ada siswa terdaftar dalam rombel ini.
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#F4F5FA] flex justify-end">
              <button
                type="button"
                onClick={() => setRosterClass(null)}
                className="px-4 py-2 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#3A3541] text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
