'use client';

import React, { useState } from 'react';
import {
  CalendarDays,
  Plus,
  CheckCircle2,
  Clock,
  Archive,
  Edit3,
  Trash2,
  Check,
  X,
  Sparkles,
  Layers,
  BookOpen
} from 'lucide-react';
import { AcademicYear } from '@/data/academicData';

interface AcademicYearsSectionProps {
  academicYears: AcademicYear[];
  onSetActiveYear: (id: string) => void;
  onAddYear: (newYear: AcademicYear) => void;
  onUpdateYear: (updated: AcademicYear) => void;
  triggerToast: (msg: string) => void;
}

export default function AcademicYearsSection({
  academicYears,
  onSetActiveYear,
  onAddYear,
  onUpdateYear,
  triggerToast
}: AcademicYearsSectionProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingYear, setEditingYear] = useState<AcademicYear | null>(null);

  const [formData, setFormData] = useState({
    name: '2027/2028 Ganjil',
    semester: 'Ganjil' as 'Ganjil' | 'Genap',
    startDate: '2027-07-12',
    endDate: '2027-12-17',
    curriculum: 'Kurikulum Merdeka Mandiri Berbagi'
  });

  const handleSaveNew = () => {
    if (!formData.name.trim()) {
      triggerToast('Mohon masukkan nama tahun ajaran');
      return;
    }
    const created: AcademicYear = {
      id: `AY-${Date.now()}`,
      name: formData.name,
      semester: formData.semester,
      startDate: formData.startDate,
      endDate: formData.endDate,
      isActive: false,
      status: 'Rencana',
      curriculum: formData.curriculum
    };
    onAddYear(created);
    setShowAddModal(false);
    triggerToast(`Tahun Ajaran ${created.name} berhasil ditambahkan!`);
  };

  const handleSaveEdit = () => {
    if (!editingYear) return;
    onUpdateYear(editingYear);
    setEditingYear(null);
    triggerToast(`Perubahan tahun ajaran ${editingYear.name} disimpan!`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#3A3541]">
            Tahun Ajaran & Semester
          </h2>
          <p className="text-xs text-[#8A8D93]">
            Kelola periode kalender akademik, semester berjalan, dan kurikulum acuan
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-semibold shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Periode Baru</span>
        </button>
      </div>

      {/* Academic Years List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {academicYears.map(ay => (
          <div
            key={ay.id}
            className={`rounded-xl bg-white border p-5 shadow-sm transition-all flex flex-col justify-between ${
              ay.isActive
                ? 'border-[#8C57FF] ring-2 ring-[#8C57FF]/20 shadow-[0_4px_18px_rgba(140,87,255,0.1)]'
                : 'border-[#E7E7E9] hover:border-slate-300'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  ay.status === 'Aktif'
                    ? 'bg-[#56CA00]/12 text-[#46A200] border border-[#56CA00]/30'
                    : ay.status === 'Arsip'
                    ? 'bg-[#8A8D93]/12 text-[#8A8D93] border border-[#8A8D93]/30'
                    : 'bg-[#FFB400]/12 text-[#B37F00] border border-[#FFB400]/30'
                }`}>
                  {ay.status === 'Aktif' ? '● Aktif Berjalan' : ay.status}
                </span>

                <span className="text-[11px] font-mono text-[#8A8D93]">{ay.id}</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#3A3541]">{ay.name}</h3>
                <div className="text-xs font-medium text-[#8C57FF] mt-0.5">Semester {ay.semester}</div>
              </div>

              <div className="p-3 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9]/70 space-y-1.5 text-xs text-[#6B6774]">
                <div className="flex justify-between">
                  <span className="text-[#8A8D93]">Mulai:</span>
                  <span className="font-semibold text-[#3A3541]">{ay.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A8D93]">Selesai:</span>
                  <span className="font-semibold text-[#3A3541]">{ay.endDate}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#E7E7E9]">
                  <span className="text-[#8A8D93]">Kurikulum:</span>
                  <span className="font-semibold text-[#3A3541] truncate max-w-[150px]">{ay.curriculum}</span>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-4 mt-4 border-t border-[#F4F5FA] flex items-center justify-between gap-2">
              {ay.isActive ? (
                <div className="text-xs font-bold text-[#56CA00] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Periode Sedang Aktif</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onSetActiveYear(ay.id)}
                  className="px-3 py-1.5 rounded-lg bg-[#8C57FF]/10 hover:bg-[#8C57FF]/20 text-[#8C57FF] text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Pilih Jadi Aktif</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setEditingYear(ay)}
                className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774] transition-colors"
                title="Edit Tahun Ajaran"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Tambah Periode */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
              <h3 className="text-base font-bold text-[#3A3541] flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-[#8C57FF]" />
                <span>Tambah Tahun Ajaran Baru</span>
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
                <label className="block text-[#8A8D93] font-medium mb-1">Nama Periode</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Misal: 2027/2028 Ganjil"
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] focus:bg-white focus:border-[#8C57FF]"
                />
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Semester</label>
                <select
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                >
                  <option value="Ganjil">Ganjil (Juli - Desember)</option>
                  <option value="Genap">Genap (Januari - Juni)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Tanggal Mulai</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  />
                </div>
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Tanggal Selesai</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Kurikulum Acuan</label>
                <input
                  type="text"
                  value={formData.curriculum}
                  onChange={(e) => setFormData({ ...formData, curriculum: e.target.value })}
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
                Simpan Periode
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Periode */}
      {editingYear && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
              <h3 className="text-base font-bold text-[#3A3541] flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#8C57FF]" />
                <span>Edit Tahun Ajaran ({editingYear.name})</span>
              </h3>
              <button
                type="button"
                onClick={() => setEditingYear(null)}
                className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Nama Periode</label>
                <input
                  type="text"
                  value={editingYear.name}
                  onChange={(e) => setEditingYear({ ...editingYear, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                />
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Status Periode</label>
                <select
                  value={editingYear.status}
                  onChange={(e) => setEditingYear({ ...editingYear, status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Arsip">Arsip</option>
                  <option value="Rencana">Rencana</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Tanggal Mulai</label>
                  <input
                    type="date"
                    value={editingYear.startDate}
                    onChange={(e) => setEditingYear({ ...editingYear, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  />
                </div>
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Tanggal Selesai</label>
                  <input
                    type="date"
                    value={editingYear.endDate}
                    onChange={(e) => setEditingYear({ ...editingYear, endDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#F4F5FA]">
              <button
                type="button"
                onClick={() => setEditingYear(null)}
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

    </div>
  );
}
