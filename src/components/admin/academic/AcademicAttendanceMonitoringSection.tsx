'use client';

import React, { useState, useMemo } from 'react';
import {
  CalendarCheck,
  Search,
  Filter,
  Download,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  Users,
  BookOpen,
  ArrowRight,
  Eye,
  FileSpreadsheet,
  X,
  Sparkles,
  TrendingUp,
  Percent,
  Calendar
} from 'lucide-react';
import {
  ClassRoom,
  Subject,
  AcademicYear,
  DailyAttendanceRecord,
  SubjectAttendanceSession,
  SubjectAttendanceRecord
} from '@/data/academicData';
import { Teacher } from '@/data/schoolData';

interface AcademicAttendanceMonitoringProps {
  classes: ClassRoom[];
  teachers: Teacher[];
  subjects: Subject[];
  academicYears: AcademicYear[];
  dailyAttendance: DailyAttendanceRecord[];
  subjectSessions: SubjectAttendanceSession[];
  subjectRecords: SubjectAttendanceRecord[];
  triggerToast: (msg: string) => void;
}

export default function AcademicAttendanceMonitoringSection({
  classes,
  teachers,
  subjects,
  academicYears,
  dailyAttendance,
  subjectSessions,
  subjectRecords,
  triggerToast
}: AcademicAttendanceMonitoringProps) {
  // Filters
  const [selectedYearId, setSelectedYearId] = useState<string>(academicYears.find(y => y.isActive)?.id || 'AY-2026-GANJIL');
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-25');
  const [selectedClassId, setSelectedClassId] = useState<string>('Semua');
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>('Semua');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('Semua');
  const [selectedType, setSelectedType] = useState<'Semua' | 'Harian' | 'Mapel'>('Semua');
  const [selectedStatus, setSelectedStatus] = useState<'Semua' | 'Sudah Disimpan' | 'Belum Diisi'>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Item for Detail Modal
  const [detailItem, setDetailItem] = useState<{
    type: 'Harian' | 'Mapel';
    title: string;
    classId: string;
    className: string;
    date: string;
    teacherName: string;
    status: string;
    sessionInfo?: SubjectAttendanceSession;
  } | null>(null);

  // Group daily attendance by date & class for monitoring rows
  const dailySessionsList = useMemo(() => {
    // Unique pairs of classId and date
    const map = new Map<string, {
      id: string;
      classId: string;
      className: string;
      date: string;
      teacherName: string;
      records: DailyAttendanceRecord[];
    }>();

    dailyAttendance.forEach(rec => {
      const key = `${rec.classId}_${rec.date}`;
      const cls = classes.find(c => c.id === rec.classId);
      if (!map.has(key)) {
        map.set(key, {
          id: `DAILY-${key}`,
          classId: rec.classId,
          className: cls?.name || rec.className || rec.classId,
          date: rec.date,
          teacherName: rec.recordedBy || 'Wali Kelas',
          records: []
        });
      }
      map.get(key)!.records.push(rec);
    });

    return Array.from(map.values()).map(item => {
      const total = item.records.length;
      const present = item.records.filter(r => r.status === 'Hadir').length;
      const sick = item.records.filter(r => r.status === 'Sakit').length;
      const excused = item.records.filter(r => r.status === 'Izin').length;
      const absent = item.records.filter(r => r.status === 'Alpa').length;
      const pct = total > 0 ? Math.round(((present + excused * 0.8) / total) * 100) : 0;

      return {
        id: item.id,
        type: 'Harian' as const,
        date: item.date,
        classId: item.classId,
        className: item.className,
        subjectName: 'Presensi Harian Pagi (Wali Kelas)',
        subjectId: 'DAILY-ATT',
        teacherName: item.teacherName,
        teacherId: 'wali-kelas',
        totalStudents: total,
        presentCount: present,
        lateCount: 0,
        sickCount: sick,
        excusedCount: excused,
        absentCount: absent,
        attendancePercentage: pct,
        status: 'Sudah Disimpan' as const
      };
    });
  }, [dailyAttendance, classes]);

  // Combined Monitoring Rows
  const combinedRows = useMemo(() => {
    const list: Array<{
      id: string;
      type: 'Harian' | 'Mapel';
      date: string;
      classId: string;
      className: string;
      subjectName: string;
      subjectId: string;
      teacherName: string;
      teacherId: string;
      totalStudents: number;
      presentCount: number;
      lateCount: number;
      sickCount: number;
      excusedCount: number;
      absentCount: number;
      attendancePercentage: number;
      status: 'Sudah Disimpan' | 'Belum Diisi';
      rawSession?: SubjectAttendanceSession;
    }> = [];

    // Add daily sessions
    dailySessionsList.forEach(d => list.push(d));

    // Add subject sessions
    subjectSessions.forEach(s => {
      list.push({
        id: s.id,
        type: 'Mapel',
        date: s.date,
        classId: s.classId,
        className: s.className,
        subjectName: `${s.subjectName} (${s.lessonPeriod})`,
        subjectId: s.subjectId,
        teacherName: s.teacherName,
        teacherId: s.teacherId,
        totalStudents: s.totalStudents,
        presentCount: s.presentCount,
        lateCount: s.lateCount,
        sickCount: s.sickCount,
        excusedCount: s.excusedCount,
        absentCount: s.absentCount,
        attendancePercentage: s.attendancePercentage,
        status: s.status,
        rawSession: s
      });
    });

    return list;
  }, [dailySessionsList, subjectSessions]);

  // Filtered Rows
  const filteredRows = useMemo(() => {
    return combinedRows.filter(row => {
      const matchDate = !selectedDate || row.date === selectedDate;
      const matchClass = selectedClassId === 'Semua' || row.classId === selectedClassId;
      const matchTeacher = selectedTeacherId === 'Semua' || row.teacherId === selectedTeacherId || row.teacherName.toLowerCase().includes(selectedTeacherId.toLowerCase());
      const matchSubject = selectedSubjectId === 'Semua' || row.subjectId === selectedSubjectId;
      const matchType = selectedType === 'Semua' || row.type === selectedType;
      const matchStatus = selectedStatus === 'Semua' || row.status === selectedStatus;
      const matchSearch = !searchQuery || 
        row.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.teacherName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchDate && matchClass && matchTeacher && matchSubject && matchType && matchStatus && matchSearch;
    });
  }, [combinedRows, selectedDate, selectedClassId, selectedTeacherId, selectedSubjectId, selectedType, selectedStatus, searchQuery]);

  // Overall KPIs calculation (based on active date)
  const stats = useMemo(() => {
    const targetRows = combinedRows.filter(r => !selectedDate || r.date === selectedDate);
    const dailyRows = targetRows.filter(r => r.type === 'Harian');
    const mapelRows = targetRows.filter(r => r.type === 'Mapel');

    const avgDaily = dailyRows.length > 0
      ? Math.round(dailyRows.reduce((acc, r) => acc + r.attendancePercentage, 0) / dailyRows.length)
      : 96;

    const completedMapel = mapelRows.filter(r => r.status === 'Sudah Disimpan');
    const pendingMapel = mapelRows.filter(r => r.status === 'Belum Diisi');

    const avgSubject = completedMapel.length > 0
      ? Math.round(completedMapel.reduce((acc, r) => acc + r.attendancePercentage, 0) / completedMapel.length)
      : 92;

    const incompleteClasses = Array.from(new Set(pendingMapel.map(r => r.className)));

    return {
      avgDaily,
      avgSubject,
      completedCount: completedMapel.length + dailyRows.length,
      pendingCount: pendingMapel.length,
      incompleteClasses
    };
  }, [combinedRows, selectedDate]);

  // Export CSV handler
  const handleExportCSV = () => {
    const headers = 'Tanggal,Tipe Presensi,Kelas,Mata Pelajaran / Sesi,Guru Pengampu,Total Siswa,Hadir,Terlambat/Izin,Sakit,Alpa,Persentase,Status\n';
    const rows = filteredRows.map(r => 
      `"${r.date}","${r.type}","${r.className}","${r.subjectName}","${r.teacherName}",${r.totalStudents},${r.presentCount},${r.lateCount + r.excusedCount},${r.sickCount},${r.absentCount},"${r.attendancePercentage}%","${r.status}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Monitoring_Presensi_${selectedDate || 'Semua'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Rekap monitoring presensi berhasil diexport ke CSV!');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E7E7E9] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#8C57FF]/10 text-[#8C57FF] uppercase tracking-wider">
              Pusat Pengawasan Akademik
            </span>
            <span className="text-xs text-[#8A8D93]">• Tahun Ajaran 2026/2027 Ganjil</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#3A3541] mt-1">
            Monitoring Presensi Sekolah & KBM
          </h2>
          <p className="text-xs sm:text-sm text-[#8A8D93] mt-0.5">
            Pantau kehadiran harian perwalian dan presensi mata pelajaran tatap muka secara terpadu real-time.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F4F5FA] text-[#3A3541] border border-[#E7E7E9] text-xs font-semibold flex items-center gap-2 transition-all shadow-xs"
          >
            <Download className="w-4 h-4 text-[#8C57FF]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Overview KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Overall Daily Attendance */}
        <div className="p-5 rounded-2xl bg-white border border-[#E7E7E9] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-[#8A8D93] block font-medium">Tingkat Kehadiran Harian</span>
            <div className="text-2xl font-bold text-[#56CA00] mt-1">{stats.avgDaily}%</div>
            <div className="text-[11px] text-[#8A8D93] mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-[#56CA00]" />
              <span>Target sekolah: &gt;95%</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#56CA00]/10 text-[#56CA00] flex items-center justify-center">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 2: Overall Subject Attendance */}
        <div className="p-5 rounded-2xl bg-white border border-[#E7E7E9] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-[#8A8D93] block font-medium">Kehadiran Sesi Mapel (KBM)</span>
            <div className="text-2xl font-bold text-[#8C57FF] mt-1">{stats.avgSubject}%</div>
            <div className="text-[11px] text-[#8A8D93] mt-0.5 flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-[#8C57FF]" />
              <span>Dari sesi selesai diisi</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#8C57FF]/10 text-[#8C57FF] flex items-center justify-center">
            <Percent className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 3: Sesi Lengkap vs Belum */}
        <div className="p-5 rounded-2xl bg-white border border-[#E7E7E9] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-[#8A8D93] block font-medium">Status Pengisian Sesi</span>
            <div className="text-2xl font-bold text-[#3A3541] mt-1">
              <span className="text-[#56CA00]">{stats.completedCount}</span>
              <span className="text-xs text-[#8A8D93] font-normal mx-1">Selesai /</span>
              <span className="text-[#FF4C51]">{stats.pendingCount}</span>
              <span className="text-xs text-[#8A8D93] font-normal ml-1">Pending</span>
            </div>
            <div className="text-[11px] text-[#8A8D93] mt-0.5">
              {stats.pendingCount === 0 ? 'Semua guru tertib menginput' : `${stats.pendingCount} sesi belum tercatat`}
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#16B1FF]/10 text-[#16B1FF] flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 4: Incomplete Classes Alert */}
        <div className="p-5 rounded-2xl bg-white border border-[#E7E7E9] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-[#8A8D93] block font-medium">Kelas Belum Lengkap</span>
            <div className="text-base font-bold text-[#FFB400] mt-1">
              {stats.incompleteClasses.length > 0 ? stats.incompleteClasses.join(', ') : 'Nihil (Lengkap)'}
            </div>
            <div className="text-[11px] text-[#8A8D93] mt-0.5">
              Perlu follow-up guru pengampu
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FFB400]/10 text-[#FFB400] flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Filter Toolbar */}
      <div className="p-5 rounded-2xl bg-white border border-[#E7E7E9] shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#F4F5FA]">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#8C57FF]" />
            <span className="text-xs font-bold text-[#3A3541] uppercase tracking-wider">
              Filter Monitoring Presensi
            </span>
          </div>

          <div className="text-xs text-[#8A8D93]">
            Menampilkan <strong className="text-[#3A3541]">{filteredRows.length}</strong> data presensi
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-xs">
          
          {/* Date Picker */}
          <div>
            <label className="block text-[#8A8D93] font-bold text-[10px] uppercase mb-1">Tanggal</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] font-semibold focus:bg-white focus:outline-none focus:border-[#8C57FF]"
            />
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-[#8A8D93] font-bold text-[10px] uppercase mb-1">Jenis Presensi</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="w-full px-3 py-1.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] font-semibold focus:bg-white focus:outline-none focus:border-[#8C57FF]"
            >
              <option value="Semua">Semua Jenis</option>
              <option value="Harian">Presensi Harian (Wali Kelas)</option>
              <option value="Mapel">Presensi Mata Pelajaran</option>
            </select>
          </div>

          {/* Class Filter */}
          <div>
            <label className="block text-[#8A8D93] font-bold text-[10px] uppercase mb-1">Kelas Rombel</label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] font-semibold focus:bg-white focus:outline-none focus:border-[#8C57FF]"
            >
              <option value="Semua">Semua Kelas</option>
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Teacher Filter */}
          <div>
            <label className="block text-[#8A8D93] font-bold text-[10px] uppercase mb-1">Guru Pengampu</label>
            <select
              value={selectedTeacherId}
              onChange={(e) => setSelectedTeacherId(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] font-semibold focus:bg-white focus:outline-none focus:border-[#8C57FF]"
            >
              <option value="Semua">Semua Guru</option>
              {teachers.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[#8A8D93] font-bold text-[10px] uppercase mb-1">Status Pengisian</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="w-full px-3 py-1.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] font-semibold focus:bg-white focus:outline-none focus:border-[#8C57FF]"
            >
              <option value="Semua">Semua Status</option>
              <option value="Sudah Disimpan">Sudah Disimpan</option>
              <option value="Belum Diisi">Belum Diisi</option>
            </select>
          </div>

          {/* Search Box */}
          <div>
            <label className="block text-[#8A8D93] font-bold text-[10px] uppercase mb-1">Cari Kategori</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#8A8D93] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari kelas, mapel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] focus:bg-white focus:outline-none focus:border-[#8C57FF]"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Monitoring Table */}
      <div className="rounded-2xl bg-white border border-[#E7E7E9] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#F4F5FA] flex justify-between items-center">
          <h3 className="font-bold text-sm text-[#3A3541] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#8C57FF]" />
            <span>Daftar Sesi Presensi & Log Aktivitas Kehadiran</span>
          </h3>
          <span className="text-xs text-[#8A8D93]">Tanggal Aktif: {selectedDate || 'Semua'}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[#6B6774] font-semibold border-b border-[#E7E7E9]">
              <tr>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">Jenis</th>
                <th className="py-3 px-4">Kelas</th>
                <th className="py-3 px-4">Mata Pelajaran / Aktivitas</th>
                <th className="py-3 px-4">Pendidik / Pengampu</th>
                <th className="py-3 px-4 text-center">Rincian Siswa</th>
                <th className="py-3 px-4 text-center">Persentase</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E7E9] text-[#3A3541]">
              {filteredRows.length > 0 ? (
                filteredRows.map((row) => (
                  <tr key={row.id} className="hover:bg-[#F4F5FA] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-[#6B6774]">
                      {row.date}
                    </td>

                    {/* Type Badge */}
                    <td className="py-3.5 px-4">
                      {row.type === 'Harian' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#16B1FF]/10 text-[#0288D1] border border-[#16B1FF]/25 whitespace-nowrap">
                          Harian
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#8C57FF]/10 text-[#8C57FF] border border-[#8C57FF]/25 whitespace-nowrap">
                          Mapel KBM
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-[#3A3541]">
                      {row.className}
                    </td>

                    <td className="py-3.5 px-4 font-medium text-[#3A3541]">
                      {row.subjectName}
                    </td>

                    <td className="py-3.5 px-4 text-[#6B6774]">
                      {row.teacherName}
                    </td>

                    {/* Breakdown */}
                    <td className="py-3.5 px-4 text-center">
                      {row.status === 'Sudah Disimpan' ? (
                        <div className="inline-flex items-center gap-1.5 text-[11px]">
                          <span className="text-[#56CA00] font-bold">{row.presentCount} H</span>
                          {row.lateCount > 0 && <span className="text-[#8C57FF] font-semibold">{row.lateCount} T</span>}
                          {row.sickCount > 0 && <span className="text-[#FFB400] font-semibold">{row.sickCount} S</span>}
                          {row.excusedCount > 0 && <span className="text-[#16B1FF] font-semibold">{row.excusedCount} I</span>}
                          {row.absentCount > 0 && <span className="text-[#FF4C51] font-bold">{row.absentCount} A</span>}
                        </div>
                      ) : (
                        <span className="text-[#A8A8A8] text-[11px] italic">-</span>
                      )}
                    </td>

                    {/* Attendance Percentage */}
                    <td className="py-3.5 px-4 text-center">
                      {row.status === 'Sudah Disimpan' ? (
                        <div className="inline-flex flex-col items-center">
                          <span className={`font-bold ${row.attendancePercentage >= 85 ? 'text-[#56CA00]' : 'text-[#FFB400]'}`}>
                            {row.attendancePercentage}%
                          </span>
                          <div className="w-14 h-1.5 rounded-full bg-slate-200 overflow-hidden mt-0.5">
                            <div
                              className={`h-full rounded-full ${row.attendancePercentage >= 85 ? 'bg-[#56CA00]' : 'bg-[#FFB400]'}`}
                              style={{ width: `${row.attendancePercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-[#A8A8A8] text-[11px]">-</span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 text-center">
                      {row.status === 'Sudah Disimpan' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#56CA00]/10 text-[#46A200] border border-[#56CA00]/25 flex items-center justify-center gap-1 mx-auto w-fit">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Sudah Disimpan</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FF4C51]/10 text-[#FF4C51] border border-[#FF4C51]/25 flex items-center justify-center gap-1 mx-auto w-fit">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Belum Diisi</span>
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => setDetailItem({
                          type: row.type,
                          title: row.subjectName,
                          classId: row.classId,
                          className: row.className,
                          date: row.date,
                          teacherName: row.teacherName,
                          status: row.status,
                          sessionInfo: row.rawSession
                        })}
                        className="px-2.5 py-1 rounded-md bg-[#8C57FF]/10 hover:bg-[#8C57FF]/20 text-[#8C57FF] text-xs font-semibold transition-colors flex items-center gap-1 mx-auto shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Lihat Rincian</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[#8A8D93]">
                    <Layers className="w-8 h-8 text-[#A8A8A8] mx-auto mb-2 opacity-50" />
                    <p className="font-semibold text-sm">Tidak ada data presensi yang sesuai kriteria filter.</p>
                    <p className="text-xs text-[#A8A8A8] mt-0.5">Silakan ubah tanggal atau pilih kelas lain.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {detailItem && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-white border border-[#E7E7E9] shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-[#F4F5FA] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    detailItem.type === 'Harian' ? 'bg-[#16B1FF]/10 text-[#0288D1]' : 'bg-[#8C57FF]/10 text-[#8C57FF]'
                  }`}>
                    {detailItem.type === 'Harian' ? 'Presensi Harian' : 'Presensi Mata Pelajaran'}
                  </span>
                  <span className="text-xs text-[#8A8D93]">• {detailItem.date}</span>
                </div>
                <h3 className="text-base font-bold text-[#3A3541] mt-1">
                  {detailItem.title} — {detailItem.className}
                </h3>
                <p className="text-xs text-[#8A8D93]">
                  Pendidik / Pengampu: <strong className="text-[#3A3541]">{detailItem.teacherName}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDetailItem(null)}
                className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Student Records List */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              {detailItem.status === 'Belum Diisi' ? (
                <div className="p-6 text-center text-[#8A8D93] space-y-2">
                  <AlertTriangle className="w-8 h-8 text-[#FF4C51] mx-auto opacity-75" />
                  <p className="font-bold text-sm text-[#3A3541]">Sesi Presensi Ini Belum Diisi</p>
                  <p className="text-xs">Guru pengampu ({detailItem.teacherName}) belum menginput data kehadiran untuk sesi KBM ini.</p>
                </div>
              ) : (
                <div className="rounded-xl border border-[#E7E7E9] overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAFC] text-[#6B6774] font-semibold border-b border-[#E7E7E9]">
                      <tr>
                        <th className="py-2.5 px-3">No</th>
                        <th className="py-2.5 px-3">Nama Siswa</th>
                        <th className="py-2.5 px-3 text-center">Status Kehadiran</th>
                        <th className="py-2.5 px-3">Keterangan / Catatan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7E7E9]">
                      {detailItem.type === 'Harian' ? (
                        dailyAttendance
                          .filter(r => r.classId === detailItem.classId && r.date === detailItem.date)
                          .map((r, idx) => (
                            <tr key={r.id} className="hover:bg-[#F4F5FA]">
                              <td className="py-2 px-3 text-[#8A8D93]">{idx + 1}</td>
                              <td className="py-2 px-3 font-semibold text-[#3A3541]">{r.studentName}</td>
                              <td className="py-2 px-3 text-center">
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                  r.status === 'Hadir' ? 'bg-[#56CA00]/10 text-[#46A200]' :
                                  r.status === 'Sakit' ? 'bg-[#FFB400]/10 text-[#B37F00]' :
                                  r.status === 'Izin' ? 'bg-[#16B1FF]/10 text-[#0288D1]' : 'bg-[#FF4C51]/10 text-[#FF4C51]'
                                }`}>
                                  {r.status}
                                </span>
                              </td>
                              <td className="py-2 px-3 text-[#8A8D93] italic">
                                {r.note || r.notes || '-'}
                              </td>
                            </tr>
                          ))
                      ) : (
                        subjectRecords
                          .filter(r => r.sessionId === detailItem.sessionInfo?.id)
                          .map((r, idx) => (
                            <tr key={r.id} className="hover:bg-[#F4F5FA]">
                              <td className="py-2 px-3 text-[#8A8D93]">{idx + 1}</td>
                              <td className="py-2 px-3 font-semibold text-[#3A3541]">{r.studentName}</td>
                              <td className="py-2 px-3 text-center">
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                  r.status === 'Hadir' ? 'bg-[#56CA00]/10 text-[#46A200]' :
                                  r.status === 'Terlambat' ? 'bg-[#8C57FF]/10 text-[#8C57FF]' :
                                  r.status === 'Sakit' ? 'bg-[#FFB400]/10 text-[#B37F00]' :
                                  r.status === 'Izin' ? 'bg-[#16B1FF]/10 text-[#0288D1]' : 'bg-[#FF4C51]/10 text-[#FF4C51]'
                                }`}>
                                  {r.status}
                                </span>
                              </td>
                              <td className="py-2 px-3 text-[#8A8D93] italic">
                                {r.notes || '-'}
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#F4F5FA] flex justify-end bg-[#F8FAFC]">
              <button
                type="button"
                onClick={() => setDetailItem(null)}
                className="px-4 py-2 rounded-lg bg-white hover:bg-slate-100 border border-[#E7E7E9] text-[#6B6774] text-xs font-semibold"
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
