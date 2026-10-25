'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Edit3,
  Trash2,
  X,
  AlertCircle,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  Users
} from 'lucide-react';
import { Subject } from '@/data/academicData';
import { Teacher } from '@/data/schoolData';

interface AcademicSubjectsSectionProps {
  subjects: Subject[];
  teachers: Teacher[];
  onAddSubject: (subject: Subject) => void;
  onUpdateSubject: (subject: Subject) => void;
  onDeleteSubject: (id: string) => void;
  triggerToast: (msg: string) => void;
}

export default function AcademicSubjectsSection({
  subjects,
  teachers,
  onAddSubject,
  onUpdateSubject,
  onDeleteSubject,
  triggerToast
}: AcademicSubjectsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [deletingSubjectId, setDeletingSubjectId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: 'Wajib Umum' as Subject['category'],
    weeklyHours: 4,
    kkm: 78,
    headTeacherId: teachers[0]?.id || 'guru-ipa',
    description: ''
  });

  const filteredSubjects = subjects.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveNew = () => {
    if (!formData.name.trim() || !formData.code.trim()) {
      triggerToast('Mohon masukkan nama dan kode mata pelajaran');
      return;
    }
    const headT = teachers.find(t => t.id === formData.headTeacherId);
    const created: Subject = {
      id: `MAPEL-${Date.now()}`,
      code: formData.code.toUpperCase(),
      name: formData.name,
      category: formData.category,
      weeklyHours: formData.weeklyHours,
      kkm: formData.kkm,
      headTeacherId: formData.headTeacherId,
      headTeacherName: headT?.name || 'Belum Ditentukan',
      description: formData.description || formData.name
    };

    onAddSubject(created);
    setShowAddModal(false);
    setFormData({
      code: '',
      name: '',
      category: 'Wajib Umum',
      weeklyHours: 4,
      kkm: 78,
      headTeacherId: teachers[0]?.id || 'guru-ipa',
      description: ''
    });
    triggerToast(`Mata pelajaran ${created.name} berhasil ditambahkan!`);
  };

  const handleSaveEdit = () => {
    if (!editingSubject) return;
    const headT = teachers.find(t => t.id === editingSubject.headTeacherId);
    const updated: Subject = {
      ...editingSubject,
      headTeacherName: headT?.name || editingSubject.headTeacherName
    };
    onUpdateSubject(updated);
    setEditingSubject(null);
    triggerToast(`Mata pelajaran ${updated.name} berhasil diperbarui!`);
  };

  const handleConfirmDelete = () => {
    if (!deletingSubjectId) return;
    onDeleteSubject(deletingSubjectId);
    setDeletingSubjectId(null);
    triggerToast('Mata pelajaran berhasil dihapus dari kurikulum!');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#3A3541]">
            Mata Pelajaran & Kurikulum
          </h2>
          <p className="text-xs text-[#8A8D93]">
            Daftar muatan kurikulum, KKM acuan, dan koordinator guru mata pelajaran
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-semibold shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Mata Pelajaran</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-white border border-[#E7E7E9] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8D93]" />
          <input
            type="text"
            placeholder="Cari mata pelajaran atau kode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-xs text-[#3A3541] focus:bg-white focus:outline-none focus:border-[#8C57FF]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs overflow-x-auto pb-1 md:pb-0">
          {['Semua', 'Wajib Umum', 'Peminatan / MIPA', 'Bahasa', 'Keagamaan & Karakter'].map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#8C57FF] text-white shadow-xs'
                  : 'bg-[#F4F5FA] text-[#6B6774] hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSubjects.map(sub => (
          <div
            key={sub.id}
            className="rounded-xl bg-white border border-[#E7E7E9] shadow-sm hover:border-[#8C57FF] transition-all p-5 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#8C57FF] bg-[#8C57FF]/10 px-2 py-0.5 rounded">
                  {sub.code}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-[#F4F5FA] text-[#6B6774]">
                  {sub.category}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#3A3541]">{sub.name}</h3>
                <p className="text-xs text-[#6B6774] line-clamp-2 mt-1 leading-relaxed">
                  {sub.description}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9]/70 space-y-1.5 text-xs text-[#6B6774]">
                <div className="flex justify-between">
                  <span className="text-[#8A8D93]">Beban Belajar:</span>
                  <span className="font-bold text-[#3A3541]">{sub.weeklyHours} Jam / Minggu</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A8D93]">KKM Minimum:</span>
                  <span className="font-bold text-[#56CA00]">{sub.kkm} (Skala 100)</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#E7E7E9]">
                  <span className="text-[#8A8D93]">Koordinator:</span>
                  <span className="font-semibold text-[#3A3541] truncate max-w-[150px]">{sub.headTeacherName}</span>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-3 border-t border-[#F4F5FA] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedSubject(sub)}
                className="text-xs font-semibold text-[#16B1FF] hover:underline flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Detail Silabus</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setEditingSubject(sub)}
                  className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774]"
                  title="Edit Mapel"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeletingSubjectId(sub.id)}
                  className="p-1.5 rounded-lg bg-[#FF4C51]/10 hover:bg-[#FF4C51]/20 text-[#FF4C51]"
                  title="Hapus Mapel"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal 1: Tambah Mapel */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
              <h3 className="text-base font-bold text-[#3A3541] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#8C57FF]" />
                <span>Tambah Mata Pelajaran Baru</span>
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
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Kode Mapel</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="BIO-01"
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] font-mono"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[#8A8D93] font-medium mb-1">Nama Mata Pelajaran</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Misal: Biologi Terapan"
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Kategori Rumpun</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                >
                  <option value="Wajib Umum">Wajib Umum</option>
                  <option value="Peminatan / MIPA">Peminatan / MIPA</option>
                  <option value="Bahasa">Bahasa</option>
                  <option value="Keagamaan & Karakter">Keagamaan & Karakter</option>
                  <option value="Kesenian & Kebugaran">Kesenian & Kebugaran</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Beban Jam / Minggu</label>
                  <input
                    type="number"
                    value={formData.weeklyHours}
                    onChange={(e) => setFormData({ ...formData, weeklyHours: parseInt(e.target.value) || 2 })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  />
                </div>
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">KKM Minimum</label>
                  <input
                    type="number"
                    value={formData.kkm}
                    onChange={(e) => setFormData({ ...formData, kkm: parseInt(e.target.value) || 75 })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Koordinator Pengampu</label>
                <select
                  value={formData.headTeacherId}
                  onChange={(e) => setFormData({ ...formData, headTeacherId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Deskripsi Singkat Silabus</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Capaian pembelajaran mata pelajaran..."
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                ></textarea>
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
                Simpan Mata Pelajaran
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Edit Mapel */}
      {editingSubject && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
              <h3 className="text-base font-bold text-[#3A3541] flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#8C57FF]" />
                <span>Edit Mata Pelajaran ({editingSubject.name})</span>
              </h3>
              <button
                type="button"
                onClick={() => setEditingSubject(null)}
                className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Nama Mata Pelajaran</label>
                <input
                  type="text"
                  value={editingSubject.name}
                  onChange={(e) => setEditingSubject({ ...editingSubject, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Jam / Minggu</label>
                  <input
                    type="number"
                    value={editingSubject.weeklyHours}
                    onChange={(e) => setEditingSubject({ ...editingSubject, weeklyHours: parseInt(e.target.value) || 2 })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  />
                </div>
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">KKM Minimum</label>
                  <input
                    type="number"
                    value={editingSubject.kkm}
                    onChange={(e) => setEditingSubject({ ...editingSubject, kkm: parseInt(e.target.value) || 75 })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Koordinator Pengampu</label>
                <select
                  value={editingSubject.headTeacherId}
                  onChange={(e) => setEditingSubject({ ...editingSubject, headTeacherId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.role})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#F4F5FA]">
              <button
                type="button"
                onClick={() => setEditingSubject(null)}
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

      {/* Modal 3: Detail Silabus */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
              <h3 className="text-base font-bold text-[#3A3541] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#8C57FF]" />
                <span>Detail Mata Pelajaran</span>
              </h3>
              <button
                type="button"
                onClick={() => setSelectedSubject(null)}
                className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#F4F5FA] rounded-xl border border-[#E7E7E9] space-y-1">
                <div className="font-mono text-xs font-bold text-[#8C57FF]">{selectedSubject.code}</div>
                <h4 className="font-bold text-sm text-[#3A3541]">{selectedSubject.name}</h4>
                <div className="text-[11px] text-[#6B6774]">{selectedSubject.category}</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between py-1 border-b border-[#F4F5FA]">
                  <span className="text-[#8A8D93]">Beban Belajar:</span>
                  <span className="font-semibold text-[#3A3541]">{selectedSubject.weeklyHours} Jam Tatap Muka / Minggu</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F5FA]">
                  <span className="text-[#8A8D93]">Ketuntasan KKM:</span>
                  <span className="font-semibold text-[#56CA00]">{selectedSubject.kkm} / 100</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F5FA]">
                  <span className="text-[#8A8D93]">Koordinator:</span>
                  <span className="font-semibold text-[#3A3541]">{selectedSubject.headTeacherName}</span>
                </div>
                <div className="py-1">
                  <span className="text-[#8A8D93] block mb-1">Capaian Pembelajaran:</span>
                  <p className="text-[#6B6774] leading-relaxed italic bg-[#F4F5FA] p-2.5 rounded-lg border border-[#E7E7E9]">
                    "{selectedSubject.description}"
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-[#F4F5FA]">
              <button
                type="button"
                onClick={() => setSelectedSubject(null)}
                className="px-4 py-2 rounded-lg bg-[#F4F5FA] text-[#3A3541] text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 4: Konfirmasi Hapus */}
      {deletingSubjectId && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#FF4C51]/10 text-[#FF4C51] flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#3A3541]">Hapus Mata Pelajaran?</h3>
              <p className="text-xs text-[#6B6774] mt-1">
                Tindakan ini akan menghapus mata pelajaran ini dari daftar kurikulum aktif (demo mode).
              </p>
            </div>
            <div className="flex justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingSubjectId(null)}
                className="px-4 py-2 rounded-lg bg-[#F4F5FA] text-[#6B6774] text-xs font-semibold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg bg-[#FF4C51] hover:bg-red-600 text-white text-xs font-bold shadow-sm"
              >
                Ya, Hapus Mapel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
