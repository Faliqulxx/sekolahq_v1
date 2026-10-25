'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Users,
  BookOpen,
  CalendarDays,
  CalendarCheck,
  CheckCircle2,
  Clock,
  TrendingUp,
  Award,
  ArrowRight,
  Sparkles,
  School,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import {
  AcademicYear,
  ClassRoom,
  Student,
  Subject,
  HomeroomAssignment,
  TeachingAssignment,
  MOCK_ACADEMIC_ANNOUNCEMENTS
} from '@/data/academicData';

interface AcademicDashboardProps {
  activeYear: AcademicYear;
  classes: ClassRoom[];
  students: Student[];
  subjects: Subject[];
  homeroomAssignments: HomeroomAssignment[];
  teachingAssignments: TeachingAssignment[];
  onNavigateTab: (tabKey: any) => void;
}

export default function AcademicDashboard({
  activeYear,
  classes,
  students,
  subjects,
  homeroomAssignments,
  teachingAssignments,
  onNavigateTab
}: AcademicDashboardProps) {
  // Compute derived metrics
  const totalClasses = classes.length;
  const assignedHomerooms = homeroomAssignments.filter(h => h.status === 'Aktif').length;
  const totalSubjects = subjects.length;
  const totalTeachingHours = teachingAssignments.reduce((acc, curr) => acc + curr.hoursPerWeek, 0);

  // Grade level distribution
  const grade7Count = students.filter(s => s.gradeLevel === '7').length;
  const grade8Count = students.filter(s => s.gradeLevel === '8').length;
  const grade9Count = students.filter(s => s.gradeLevel === '9').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Banner: Academic Year & Status (Wali Kelas Light Hero) */}
      <div className="rounded-3xl bg-gradient-to-br from-white via-white to-[#16B1FF]/8 border border-[#E7E7E9] shadow-[0_2px_12px_rgba(76,78,100,0.06)] p-6 sm:p-7 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16B1FF]/10 text-[#0288D1] border border-[#16B1FF]/20 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tahun Ajaran Aktif: {activeYear.name} ({activeYear.semester})</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#3A3541] tracking-tight">
            Pusat Kendali Manajemen Akademik
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6774] leading-relaxed">
            Sistem tata kelola kurikulum, kelas rombel, penugasan guru, jadwal pembelajaran, dan pemantauan peserta didik terpadu SMP Sekolah-Q.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onNavigateTab('academic-classes')}
              className="clay-btn-primary px-4 py-2.5 rounded-xl text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Kelola Kelas & Rombel</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('academic-assignments')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F4F5FA] text-[#3A3541] border border-[#E7E7E9] text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
            >
              <Users className="w-3.5 h-3.5 text-[#16B1FF]" />
              <span>Penugasan Guru</span>
            </button>
            <Link
              href="/wali-kelas"
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F4F5FA] text-[#0288D1] border border-[#E7E7E9] text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
            >
              <School className="w-3.5 h-3.5" />
              <span>Buka Portal Wali Kelas</span>
            </Link>
          </div>
        </div>

        {/* Academic Trophy / Pill Overview */}
        <div className="hidden lg:flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-[#E7E7E9] shadow-sm text-center min-w-[200px]">
          <div className="w-12 h-12 rounded-xl bg-[#16B1FF]/10 flex items-center justify-center mb-1">
            <Award className="w-6 h-6 text-[#16B1FF]" />
          </div>
          <span className="text-[11px] font-bold text-[#3A3541]">Kurikulum Berjalan</span>
          <span className="text-xs font-bold text-[#0288D1] mt-0.5">Kurikulum Merdeka</span>
          <span className="text-[10px] text-[#8A8D93] mt-1">Status: Mandiri Berbagi</span>
        </div>
      </div>

      {/* 4 Micro-KPI Stat Cards (Claymorphic Tactile Cards - 2 Columns on Mobile) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Rombel */}
        <div 
          onClick={() => onNavigateTab('academic-classes')}
          className="clay-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8C57FF]/15 to-[#8C57FF]/5 border border-[#8C57FF]/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] flex items-center justify-center text-[#8C57FF] group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-[#46A200] bg-[#56CA00]/12 px-2 py-0.5 rounded-full border border-[#56CA00]/25 flex items-center gap-0.5 shadow-2xs">
              <CheckCircle2 className="w-3 h-3" /> 100% Aktif
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-800 tracking-tight">{totalClasses} Rombel</div>
            <div className="text-[11px] font-medium text-slate-500 mt-0.5">Tingkat 7, 8, dan 9</div>
          </div>
        </div>

        {/* Siswa Terdaftar */}
        <div 
          onClick={() => onNavigateTab('academic-students')}
          className="clay-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#16B1FF]/15 to-[#16B1FF]/5 border border-[#16B1FF]/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] flex items-center justify-center text-[#0288D1] group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-[#0288D1] bg-[#16B1FF]/10 px-2 py-0.5 rounded-full border border-[#16B1FF]/20 shadow-2xs">
              Roster Aktif
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-800 tracking-tight">{students.length} Siswa Demo</div>
            <div className="text-[11px] font-medium text-slate-500 mt-0.5">780+ Total Siswa Sekolah</div>
          </div>
        </div>

        {/* Wali Kelas Terpenuhi */}
        <div 
          onClick={() => onNavigateTab('academic-assignments')}
          className="clay-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#56CA00]/15 to-[#56CA00]/5 border border-[#56CA00]/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] flex items-center justify-center text-[#46A200] group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-[#46A200] bg-[#56CA00]/12 px-2 py-0.5 rounded-full border border-[#56CA00]/25 shadow-2xs">
              Lengkap
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-800 tracking-tight">{assignedHomerooms} / {totalClasses}</div>
            <div className="text-[11px] font-medium text-slate-500 mt-0.5">Wali Kelas Terisi</div>
          </div>
        </div>

        {/* Mata Pelajaran & Jam */}
        <div 
          onClick={() => onNavigateTab('academic-subjects')}
          className="clay-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FFB400]/15 to-[#FFB400]/5 border border-[#FFB400]/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-slate-700 font-mono bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 shadow-2xs">
              {totalTeachingHours} Jam/Mgg
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-800 tracking-tight">{totalSubjects} Mapel</div>
            <div className="text-[11px] font-medium text-slate-500 mt-0.5">Kurikulum Terpadu</div>
          </div>
        </div>

      </div>

      {/* Grid: Grade Distribution & Classes Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Classes Overview List (8 Cols) */}
        <div className="lg:col-span-8 clay-card rounded-3xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#8C57FF]" />
                <span>Rombongan Belajar & Wali Kelas Terpilih</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Distribusi rombel kelas 7, 8, dan 9 semester ini</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('academic-classes')}
              className="text-xs text-[#8C57FF] font-semibold hover:text-[#7E4EE6] flex items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-[#8C57FF]/10 transition-all shadow-2xs"
            >
              <span>Semua Rombel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {classes.map(cls => (
              <div key={cls.id} className="p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_8px_rgba(15,23,42,0.02)] space-y-2.5 hover:bg-white transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-sm text-slate-800 block">{cls.name}</span>
                    <span className="text-[10px] text-slate-400">Ruang {cls.roomNumber} • Kapasitas {cls.capacity}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#8C57FF]/10 text-[#8C57FF] border border-[#8C57FF]/20 shadow-2xs">
                    Tingkat {cls.gradeLevel}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Users className="w-3.5 h-3.5 text-[#16B1FF]" />
                    <span className="text-[11px] truncate max-w-[150px] font-medium" title={cls.homeroomTeacherName}>
                      {cls.homeroomTeacherName}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#46A200] bg-[#56CA00]/10 px-2 py-0.5 rounded-full">
                    {cls.studentCount || 30} Siswa
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Distribution & Quick Shortcuts (4 Cols) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Grade Distribution Meter */}
          <div className="clay-card rounded-3xl p-6 sm:p-7 space-y-4">
            <h3 className="font-bold text-slate-800 text-base">Distribusi Tingkat Siswa</h3>
            
            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8C57FF]"></span>
                    Kelas 7 (Fase D1)
                  </span>
                  <span className="font-bold text-[#8C57FF]">34%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                  <div className="bg-gradient-to-r from-[#8C57FF] to-[#9E6FFF] h-full rounded-full shadow-2xs" style={{ width: '34%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16B1FF]"></span>
                    Kelas 8 (Fase D2)
                  </span>
                  <span className="font-bold text-[#0288D1]">33%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                  <div className="bg-gradient-to-r from-[#16B1FF] to-[#42C3FF] h-full rounded-full shadow-2xs" style={{ width: '33%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#56CA00]"></span>
                    Kelas 9 (Fase D3)
                  </span>
                  <span className="font-bold text-[#46A200]">33%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                  <div className="bg-gradient-to-r from-[#56CA00] to-[#6DE600] h-full rounded-full shadow-2xs" style={{ width: '33%' }}></div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed font-medium">
              Proporsi kapasitas ruang belajar seimbang dan siap menampung pembelajaran terdiferensiasi.
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="clay-card rounded-3xl p-5 sm:p-6 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Pintasan Manajemen</h4>
            
            <button
              type="button"
              onClick={() => onNavigateTab('academic-years')}
              className="w-full text-left p-2.5 rounded-xl hover:bg-white text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center justify-between transition-all border border-transparent hover:border-slate-200/80 hover:shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#8C57FF]/10 flex items-center justify-center">
                  <CalendarDays className="w-4 h-4 text-[#8C57FF]" />
                </div>
                <span>Atur Tahun Ajaran & Semester</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => onNavigateTab('academic-schedules')}
              className="w-full text-left p-2.5 rounded-xl hover:bg-white text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center justify-between transition-all border border-transparent hover:border-slate-200/80 hover:shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#16B1FF]/10 flex items-center justify-center">
                  <CalendarCheck className="w-4 h-4 text-[#16B1FF]" />
                </div>
                <span>Jadwal Pelajaran Mingguan</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => onNavigateTab('academic-accounts')}
              className="w-full text-left p-2.5 rounded-xl hover:bg-white text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center justify-between transition-all border border-transparent hover:border-slate-200/80 hover:shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#56CA00]/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-[#56CA00]" />
                </div>
                <span>Hak Akses Guru & Wali Kelas</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
