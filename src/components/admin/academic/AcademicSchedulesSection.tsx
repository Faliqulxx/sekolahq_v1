'use client';

import React, { useState } from 'react';
import {
  CalendarDays,
  Plus,
  Filter,
  Clock,
  Printer,
  Users,
  BookOpen,
  MapPin,
  Edit3,
  Trash2,
  X,
  Layers,
  Sparkles,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { ScheduleItem, ClassRoom, Subject } from '@/data/academicData';
import { Teacher } from '@/data/schoolData';

interface AcademicSchedulesSectionProps {
  schedules: ScheduleItem[];
  classes: ClassRoom[];
  subjects: Subject[];
  teachers: Teacher[];
  onAddSchedule: (schedule: ScheduleItem) => void;
  onDeleteSchedule: (id: string) => void;
  triggerToast: (msg: string) => void;
}

export default function AcademicSchedulesSection({
  schedules,
  classes,
  subjects,
  teachers,
  onAddSchedule,
  onDeleteSchedule,
  triggerToast
}: AcademicSchedulesSectionProps) {
  const [viewMode, setViewMode] = useState<'class' | 'teacher'>('class');
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[2]?.id || classes[0]?.id || 'KLS-8A');
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(teachers[3]?.id || teachers[0]?.id || 'guru-ipa');
  const [selectedDay, setSelectedDay] = useState<string>('Semua');

  const [showAddModal, setShowAddModal] = useState(false);

  // New Schedule form
  const [formData, setFormData] = useState({
    day: 'Senin' as ScheduleItem['day'],
    timeStart: '07:30',
    timeEnd: '09:00',
    classId: classes[0]?.id || '',
    subjectId: subjects[0]?.id || '',
    teacherId: teachers[0]?.id || '',
    room: 'R.201'
  });

  // Filtered schedules based on view mode
  const filteredSchedules = schedules.filter(sch => {
    const matchesView = viewMode === 'class'
      ? sch.classId === selectedClassId
      : sch.teacherId === selectedTeacherId;
    const matchesDay = selectedDay === 'Semua' || sch.day === selectedDay;
    return matchesView && matchesDay;
  });

  const daysList: ScheduleItem['day'][] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

  // Helper to convert HH:MM to minutes
  const timeToMinutes = (t: string) => {
    if (!t) return 0;
    const [h, m] = t.split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
  };

  // Helper to check if two time ranges overlap
  const isTimeOverlapping = (start1: string, end1: string, start2: string, end2: string) => {
    const s1 = timeToMinutes(start1);
    const e1 = timeToMinutes(end1);
    const s2 = timeToMinutes(start2);
    const e2 = timeToMinutes(end2);
    return s1 < e2 && e1 > s2;
  };

  // Real-time conflict checks
  const isInvalidTimeRange = timeToMinutes(formData.timeStart) >= timeToMinutes(formData.timeEnd);

  // 1. Conflict Check: Kelas sudah ada jadwal di hari dan jam yang sama / beririsan
  const classConflict = schedules.find(sch =>
    sch.day === formData.day &&
    sch.classId === formData.classId &&
    isTimeOverlapping(sch.timeStart, sch.timeEnd, formData.timeStart, formData.timeEnd)
  );

  // 2. Conflict Check: Guru sudah ada jadwal di kelas lain di hari dan jam yang sama / beririsan
  const teacherConflict = schedules.find(sch =>
    sch.day === formData.day &&
    sch.teacherId === formData.teacherId &&
    isTimeOverlapping(sch.timeStart, sch.timeEnd, formData.timeStart, formData.timeEnd)
  );

  const hasConflict = !!classConflict || !!teacherConflict || isInvalidTimeRange;

  const handleSaveNew = () => {
    if (isInvalidTimeRange) {
      triggerToast('Jam selesai harus lebih besar dari jam mulai!');
      return;
    }
    if (classConflict) {
      triggerToast(`BENTROK: ${classConflict.className} sudah ada jadwal ${classConflict.subjectName} (${classConflict.timeStart}-${classConflict.timeEnd})!`);
      return;
    }
    if (teacherConflict) {
      triggerToast(`BENTROK: ${teacherConflict.teacherName} sudah mengajar di ${teacherConflict.className} pada jam tersebut!`);
      return;
    }

    const targetClass = classes.find(c => c.id === formData.classId);
    const targetSubject = subjects.find(s => s.id === formData.subjectId);
    const targetTeacher = teachers.find(t => t.id === formData.teacherId);

    const created: ScheduleItem = {
      id: `SCH-${Date.now()}`,
      day: formData.day,
      timeStart: formData.timeStart,
      timeEnd: formData.timeEnd,
      classId: formData.classId,
      className: targetClass?.name || 'Kelas',
      subjectId: formData.subjectId,
      subjectName: targetSubject?.name || 'Mata Pelajaran',
      teacherId: formData.teacherId,
      teacherName: targetTeacher?.name || 'Guru',
      room: formData.room
    };

    onAddSchedule(created);
    setShowAddModal(false);
    triggerToast(`Jadwal ${created.subjectName} (${created.day}) berhasil ditambahkan!`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#3A3541]">
            Jadwal Pembelajaran Tatap Muka
          </h2>
          <p className="text-xs text-[#8A8D93]">
            Penyusunan jadwal KBM mingguan terhindar dari tabrakan jam mengajar guru dan ruang kelas
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-[#F4F5FA] text-[#3A3541] border border-[#E7E7E9] text-xs font-semibold shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-[#8C57FF]" />
            <span>Cetak Jadwal</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Sesi Jadwal</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Mode Toggle and Filter Selectors */}
      <div className="p-4 rounded-xl bg-white border border-[#E7E7E9] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Toggle Mode */}
        <div className="flex items-center p-1 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-xs self-start md:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('class')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'class'
                ? 'bg-white text-[#8C57FF] shadow-xs'
                : 'text-[#6B6774] hover:text-[#3A3541]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Lihat per Rombel Kelas</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('teacher')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'teacher'
                ? 'bg-white text-[#16B1FF] shadow-xs'
                : 'text-[#6B6774] hover:text-[#3A3541]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Lihat per Guru Pengampu</span>
          </button>
        </div>

        {/* Dynamic Selector based on Mode */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {viewMode === 'class' ? (
            <div className="flex items-center gap-1.5">
              <span className="text-[#8A8D93] text-[11px] font-medium">Pilih Kelas:</span>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] font-semibold focus:outline-none focus:border-[#8C57FF]"
              >
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="text-[#8A8D93] text-[11px] font-medium">Pilih Guru:</span>
              <select
                value={selectedTeacherId}
                onChange={(e) => setSelectedTeacherId(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] font-semibold focus:outline-none focus:border-[#16B1FF]"
              >
                {teachers.map(t => (
                  <option key={t.id} value={t.id}>{t.name} ({t.role})</option>
                ))}
              </select>
            </div>
          )}

          {/* Filter Day */}
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#6B6774] text-xs focus:outline-none focus:border-[#8C57FF]"
          >
            <option value="Semua">Semua Hari</option>
            {daysList.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Timetable Cards (Mobile-friendly and Desktop responsive) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {daysList
          .filter(d => selectedDay === 'Semua' || selectedDay === d)
          .map(dayName => {
            const dayItems = filteredSchedules.filter(sch => sch.day === dayName);

            return (
              <div
                key={dayName}
                className="rounded-xl bg-white border border-[#E7E7E9] shadow-sm p-4 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#F4F5FA]">
                    <span className="font-bold text-sm text-[#3A3541] flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#8C57FF]"></span>
                      {dayName}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#F4F5FA] font-medium text-[#8A8D93]">
                      {dayItems.length} Sesi Terjadwal
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {dayItems.length > 0 ? (
                      dayItems.map(item => (
                        <div
                          key={item.id}
                          className="p-3 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9]/70 space-y-1.5 relative group hover:border-[#8C57FF] transition-all"
                        >
                          <div className="flex justify-between items-start text-xs">
                            <span className="font-bold text-[#3A3541]">{item.subjectName}</span>
                            <span className="font-mono text-[10px] text-[#8C57FF] bg-white px-1.5 py-0.5 rounded border border-[#E7E7E9]">
                              {item.timeStart} - {item.timeEnd}
                            </span>
                          </div>

                          <div className="text-[11px] text-[#6B6774] flex justify-between items-center">
                            <span className="truncate max-w-[160px]">{viewMode === 'class' ? item.teacherName : item.className}</span>
                            <span className="text-[#8A8D93] flex items-center gap-0.5">
                              <MapPin className="w-3 h-3 text-[#16B1FF]" />
                              <span>{item.room}</span>
                            </span>
                          </div>

                          {/* Quick Delete Schedule Button */}
                          <button
                            type="button"
                            onClick={() => {
                              onDeleteSchedule(item.id);
                              triggerToast('Sesi jadwal berhasil dihapus');
                            }}
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded bg-[#FF4C51]/10 text-[#FF4C51] hover:bg-[#FF4C51]/20 transition-opacity"
                            title="Hapus Sesi"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-xs text-[#8A8D93] italic">
                        Tidak ada jam tatap muka terjadwal
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F4F5FA] text-[10px] text-[#8A8D93] text-center">
                  Jam Pembelajaran Standar 40 Menit / JP
                </div>
              </div>
            );
          })}
      </div>

      {/* Modal: Tambah Sesi Jadwal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
              <h3 className="text-base font-bold text-[#3A3541] flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-[#8C57FF]" />
                <span>Tambah Sesi Jadwal Pelajaran</span>
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
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Hari</label>
                  <select
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value as any })}
                    className="w-full px-2.5 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  >
                    {daysList.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Mulai</label>
                  <input
                    type="time"
                    value={formData.timeStart}
                    onChange={(e) => setFormData({ ...formData, timeStart: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  />
                </div>
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Selesai</label>
                  <input
                    type="time"
                    value={formData.timeEnd}
                    onChange={(e) => setFormData({ ...formData, timeEnd: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Kelas Rombel</label>
                <select
                  value={formData.classId}
                  onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                >
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Mata Pelajaran</label>
                <select
                  value={formData.subjectId}
                  onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                >
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Guru Pengajar</label>
                <select
                  value={formData.teacherId}
                  onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Ruang Pembelajaran</label>
                <input
                  type="text"
                  value={formData.room}
                  onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                  placeholder="R.201 / Lab Komputer"
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541]"
                />
              </div>

              {/* REAL-TIME CONFLICT DETECTOR NOTIFICATION BOX */}
              <div className="pt-2">
                {isInvalidTimeRange ? (
                  <div className="p-3 rounded-xl bg-[#FF4C51]/10 border border-[#FF4C51]/30 text-xs space-y-1 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 font-bold text-[#FF4C51]">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>Rentang Waktu Tidak Valid</span>
                    </div>
                    <p className="text-[11px] text-[#3A3541]">
                      Jam selesai ({formData.timeEnd}) harus lebih besar daripada jam mulai ({formData.timeStart}).
                    </p>
                  </div>
                ) : classConflict ? (
                  <div className="p-3 rounded-xl bg-[#FF4C51]/10 border border-[#FF4C51]/30 text-xs space-y-1.5 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 font-bold text-[#FF4C51]">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>Bentrokan Jadwal Kelas Terdeteksi!</span>
                    </div>
                    <div className="text-[11px] text-[#3A3541] leading-relaxed">
                      <strong className="text-[#FF4C51]">{classConflict.className}</strong> sudah memiliki jadwal pelajaran <strong>{classConflict.subjectName}</strong> bersama <strong>{classConflict.teacherName}</strong> pada hari <strong>{classConflict.day}</strong> jam <strong>{classConflict.timeStart} - {classConflict.timeEnd}</strong> di {classConflict.room}.
                    </div>
                    <div className="text-[10px] font-bold text-[#FF4C51] flex items-center gap-1">
                      <span>⛔ Tidak dapat menambahkan jadwal pada kelas dan waktu tersebut.</span>
                    </div>
                  </div>
                ) : teacherConflict ? (
                  <div className="p-3 rounded-xl bg-[#FF4C51]/10 border border-[#FF4C51]/30 text-xs space-y-1.5 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 font-bold text-[#FF4C51]">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>Bentrokan Jadwal Guru Terdeteksi!</span>
                    </div>
                    <div className="text-[11px] text-[#3A3541] leading-relaxed">
                      Guru <strong>{teacherConflict.teacherName}</strong> sudah terjadwal mengajar di <strong className="text-[#FF4C51]">{teacherConflict.className}</strong> ({teacherConflict.subjectName}) pada hari <strong>{teacherConflict.day}</strong> jam <strong>{teacherConflict.timeStart} - {teacherConflict.timeEnd}</strong>.
                    </div>
                    <div className="text-[10px] font-bold text-[#FF4C51] flex items-center gap-1">
                      <span>⛔ Guru tidak dapat mengajar di 2 kelas berbeda pada waktu yang sama.</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-[#56CA00]/10 border border-[#56CA00]/25 text-xs flex items-center gap-2 text-[#46A200] animate-in fade-in duration-200">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#56CA00]" />
                    <span className="text-[11px] font-semibold">
                      Waktu & Guru Tersedia — Tidak ada bentrokan jadwal pada hari dan jam ini.
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-[#F4F5FA]">
              <div className="text-[11px] text-[#8A8D93]">
                {hasConflict ? (
                  <span className="text-[#FF4C51] font-medium flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Bentrokan aktif terdeteksi
                  </span>
                ) : (
                  <span className="text-[#56CA00] font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Siap disimpan
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-[#F4F5FA] text-[#6B6774] text-xs font-semibold hover:bg-slate-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSaveNew}
                  disabled={hasConflict}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm ${
                    hasConflict
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300 shadow-none'
                      : 'bg-[#8C57FF] hover:bg-[#7E4EE6] text-white shadow-[0_2px_8px_rgba(140,87,255,0.35)]'
                  }`}
                  title={hasConflict ? 'Jadwal bentrok atau rentang waktu tidak valid' : 'Simpan sesi jadwal'}
                >
                  {hasConflict ? 'Simpan Jadwal (Bentrok)' : 'Simpan Jadwal'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
