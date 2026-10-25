'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarDays,
  FileSpreadsheet,
  FileText,
  Search,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Clock,
  ChevronRight,
  Printer,
  Download,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Phone,
  Mail,
  Award,
  BookOpen,
  Edit3,
  Save,
  X,
  Filter,
  Check,
  ArrowRight,
  TrendingUp,
  UserCheck,
  GraduationCap,
  ShieldCheck,
  Menu,
  Plus,
  Trash2,
  Eye,
  Percent,
  Layers,
  RefreshCw,
  Zap,
  CalendarX,
  LogOut
} from 'lucide-react';
import {
  MOCK_ACADEMIC_YEARS,
  MOCK_CLASSES,
  MOCK_STUDENTS,
  MOCK_SCHEDULES,
  MOCK_TEACHING_ASSIGNMENTS,
  MOCK_DAILY_ATTENDANCE,
  MOCK_SUBJECT_ATTENDANCE_SESSIONS,
  MOCK_SUBJECT_ATTENDANCE_RECORDS,
  MOCK_GRADES,
  MOCK_USERS,
  MOCK_ACADEMIC_ANNOUNCEMENTS,
  Student,
  DailyAttendanceRecord,
  SubjectAttendanceSession,
  SubjectAttendanceRecord,
  StudentGrade
} from '@/data/academicData';

type TeacherRole = 'wali' | 'guru';

type TeacherTab = 
  // Wali Kelas Tabs
  | 'dashboard' 
  | 'kelas-saya' 
  | 'absensi-harian' 
  | 'rekap-presensi' 
  | 'jadwal' 
  | 'rekap-nilai' 
  | 'laporan'
  // Guru Mapel Tabs
  | 'guru-dashboard' 
  | 'guru-jadwal' 
  | 'guru-presensi-mapel' 
  | 'guru-riwayat' 
  | 'guru-rekap';

interface ClassOfficerItem {
  id: string;
  role: string;
  studentId: string;
}

export default function WaliKelasPage() {
  // Current Role: Wali Kelas or Guru Mapel
  const [currentRole, setCurrentRole] = useState<TeacherRole>('wali');
  const [activeTab, setActiveTab] = useState<TeacherTab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Selected Demo Homeroom Class (Kelas 8-A Al-Khawarizmi)
  const currentClass = MOCK_CLASSES.find(c => c.id === 'KLS-8A') || MOCK_CLASSES[2];
  const activeYear = MOCK_ACADEMIC_YEARS.find(y => y.isActive) || MOCK_ACADEMIC_YEARS[0];

  // Global Mock Attendance State
  const [dailyAttendanceList, setDailyAttendanceList] = useState<DailyAttendanceRecord[]>(MOCK_DAILY_ATTENDANCE);
  const [subjectSessionsList, setSubjectSessionsList] = useState<SubjectAttendanceSession[]>(MOCK_SUBJECT_ATTENDANCE_SESSIONS);
  const [subjectRecordsList, setSubjectRecordsList] = useState<SubjectAttendanceRecord[]>(MOCK_SUBJECT_ATTENDANCE_RECORDS);

  // Interactive Grades State
  const [gradesList, setGradesList] = useState<StudentGrade[]>(MOCK_GRADES);
  const [editingGradeNote, setEditingGradeNote] = useState<{ id: string; note: string } | null>(null);

  // Search & Filter state for Roster
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Helper Toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Helper to get students for a class
  const getStudentsForClass = (classId: string): Student[] => {
    const list = MOCK_STUDENTS.filter(s => s.classId === classId);
    return list.length > 0 ? list : MOCK_STUDENTS.slice(0, 8);
  };

  const classStudents = getStudentsForClass(currentClass.id);
  const filteredStudents = classStudents.filter(s =>
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.nisn.includes(studentSearch) ||
    s.nis.includes(studentSearch)
  );

  // ==============================================================
  // FEATURE 1: DYNAMIC CLASS OFFICERS (Wali Kelas)
  // ==============================================================
  const [classOfficers, setClassOfficers] = useState<ClassOfficerItem[]>([
    { id: 'off-1', role: 'Ketua Kelas', studentId: classStudents[0]?.id || '' },
    { id: 'off-2', role: 'Wakil Ketua', studentId: classStudents[1]?.id || '' },
    { id: 'off-3', role: 'Sekretaris', studentId: classStudents[3]?.id || '' },
    { id: 'off-4', role: 'Bendahara 1', studentId: classStudents[5]?.id || '' },
  ]);
  const [showEditOfficersModal, setShowEditOfficersModal] = useState(false);
  const [tempOfficers, setTempOfficers] = useState<ClassOfficerItem[]>(classOfficers);
  const [newRoleInput, setNewRoleInput] = useState('');
  const [newStudentInput, setNewStudentInput] = useState(classStudents[0]?.id || '');

  const OFFICER_COLOR_THEMES = [
    { bg: 'bg-[#16B1FF]/8', border: 'border-[#16B1FF]/25', text: 'text-[#0288D1]' },
    { bg: 'bg-[#8C57FF]/8', border: 'border-[#8C57FF]/25', text: 'text-[#8C57FF]' },
    { bg: 'bg-[#56CA00]/8', border: 'border-[#56CA00]/25', text: 'text-[#46A200]' },
    { bg: 'bg-[#FFB400]/8', border: 'border-[#FFB400]/25', text: 'text-[#B37F00]' },
    { bg: 'bg-[#FF4C51]/8', border: 'border-[#FF4C51]/25', text: 'text-[#FF4C51]' },
    { bg: 'bg-[#9E6FFF]/8', border: 'border-[#9E6FFF]/25', text: 'text-[#7E4EE6]' },
    { bg: 'bg-[#00B5B5]/8', border: 'border-[#00B5B5]/25', text: 'text-[#008B8B]' },
    { bg: 'bg-[#E91E63]/8', border: 'border-[#E91E63]/25', text: 'text-[#C2185B]' },
  ];

  const handleAddCustomOfficer = () => {
    if (!newRoleInput.trim()) {
      triggerToast('Ketik nama jabatan terlebih dahulu!');
      return;
    }
    const newOfficer: ClassOfficerItem = {
      id: `off-${Date.now()}`,
      role: newRoleInput.trim(),
      studentId: newStudentInput || classStudents[0]?.id || ''
    };
    setTempOfficers(prev => [...prev, newOfficer]);
    setNewRoleInput('');
    triggerToast(`Jabatan "${newOfficer.role}" berhasil ditambahkan!`);
  };

  const handleRemoveOfficer = (id: string, roleName: string) => {
    if (tempOfficers.length <= 1) {
      triggerToast('Minimal harus ada 1 pengurus kelas!');
      return;
    }
    setTempOfficers(prev => prev.filter(o => o.id !== id));
    triggerToast(`Jabatan "${roleName}" dihapus.`);
  };

  // ==============================================================
  // FEATURE A: PRESENSI HARIAN (Wali Kelas)
  // ==============================================================
  const [dailyClassId, setDailyClassId] = useState<string>(currentClass.id);
  const [dailyDate, setDailyDate] = useState<string>('2026-10-25');
  const [editingDailyNote, setEditingDailyNote] = useState<{
    studentId: string;
    studentName: string;
    currentStatus: DailyAttendanceRecord['status'];
    note: string;
  } | null>(null);

  // Active student list for selected daily class
  const activeDailyStudents = useMemo(() => getStudentsForClass(dailyClassId), [dailyClassId]);

  // Set individual daily status
  const handleSetDailyStatus = (studentId: string, status: DailyAttendanceRecord['status'], studentName: string) => {
    setDailyAttendanceList(prev => {
      const existing = prev.find(a => a.studentId === studentId && a.date === dailyDate && a.classId === dailyClassId);
      if (existing) {
        return prev.map(a => (a.studentId === studentId && a.date === dailyDate && a.classId === dailyClassId) ? { ...a, status, updatedAt: 'Hari ini, baru saja' } : a);
      } else {
        const cls = MOCK_CLASSES.find(c => c.id === dailyClassId);
        return [
          ...prev,
          {
            id: `ATT-${Date.now()}-${studentId}`,
            date: dailyDate,
            classId: dailyClassId,
            className: cls?.name || dailyClassId,
            academicYearId: activeYear.id,
            studentId,
            studentName,
            status,
            recordedBy: 'Budi Santoso, S.Si., M.Pd.',
            updatedAt: 'Hari ini, baru saja'
          }
        ];
      }
    });
    triggerToast(`Presensi ${studentName.split(' ')[0]} diset: ${status}`);
  };

  // Update daily note
  const handleUpdateDailyNote = (studentId: string, note: string, studentName: string) => {
    setDailyAttendanceList(prev => {
      const existing = prev.find(a => a.studentId === studentId && a.date === dailyDate && a.classId === dailyClassId);
      if (existing) {
        return prev.map(a => (a.studentId === studentId && a.date === dailyDate && a.classId === dailyClassId) ? { ...a, note } : a);
      } else {
        const cls = MOCK_CLASSES.find(c => c.id === dailyClassId);
        return [
          ...prev,
          {
            id: `ATT-${Date.now()}-${studentId}`,
            date: dailyDate,
            classId: dailyClassId,
            className: cls?.name || dailyClassId,
            academicYearId: activeYear.id,
            studentId,
            studentName,
            status: 'Hadir',
            note,
            recordedBy: 'Budi Santoso, S.Si., M.Pd.',
            updatedAt: 'Hari ini, baru saja'
          }
        ];
      }
    });
  };

  // Mark all present (Daily)
  const handleMarkAllDailyPresent = () => {
    const cls = MOCK_CLASSES.find(c => c.id === dailyClassId);
    const updated = activeDailyStudents.map(s => ({
      id: `ATT-${Date.now()}-${s.id}`,
      date: dailyDate,
      classId: dailyClassId,
      className: cls?.name || dailyClassId,
      academicYearId: activeYear.id,
      studentId: s.id,
      studentName: s.name,
      status: 'Hadir' as const,
      recordedBy: 'Budi Santoso, S.Si., M.Pd.',
      updatedAt: 'Hari ini, baru saja'
    }));
    setDailyAttendanceList(prev => [
      ...prev.filter(a => !(a.date === dailyDate && a.classId === dailyClassId)),
      ...updated
    ]);
    triggerToast(`Seluruh siswa ${cls?.name || dailyClassId} ditandai "Hadir"`);
  };

  // Reset/Clear daily attendance
  const handleResetDailyAttendance = () => {
    setDailyAttendanceList(prev => prev.filter(a => !(a.date === dailyDate && a.classId === dailyClassId)));
    triggerToast('Presensi harian tanggal ini direset.');
  };

  // Save daily attendance action
  const handleSaveDailyAttendance = () => {
    triggerToast(`Presensi Harian ${currentClass.name} tanggal ${dailyDate} berhasil disimpan!`);
  };

  // Export Daily Attendance CSV
  const handleExportDailyCSV = () => {
    const headers = 'Tanggal,Kelas,NISN,NIS,Nama Siswa,Status Presensi,Catatan,Pencatat\n';
    const rows = activeDailyStudents.map(s => {
      const att = dailyAttendanceList.find(a => a.studentId === s.id && a.date === dailyDate && a.classId === dailyClassId);
      const status = att ? att.status : 'Belum Input';
      const note = att?.note || '-';
      return `"${dailyDate}","${currentClass.name}","${s.nisn}","${s.nis}","${s.name}","${status}","${note}","Budi Santoso, M.Pd."`;
    }).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Presensi_Harian_${dailyClassId}_${dailyDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('File CSV presensi harian berhasil diunduh!');
  };

  // Calculate daily statistics dynamically
  const dailyStats = useMemo(() => {
    const records = activeDailyStudents.map(s => {
      return dailyAttendanceList.find(a => a.studentId === s.id && a.date === dailyDate && a.classId === dailyClassId)?.status || 'Belum Diisi';
    });
    const total = activeDailyStudents.length;
    const hadir = records.filter(s => s === 'Hadir').length;
    const sakit = records.filter(s => s === 'Sakit').length;
    const izin = records.filter(s => s === 'Izin').length;
    const alpa = records.filter(s => s === 'Alpa').length;
    const belumDiisi = records.filter(s => s === 'Belum Diisi').length;
    const pct = total > 0 ? Math.round(((hadir + izin * 0.7) / total) * 100) : 0;

    return { total, hadir, sakit, izin, alpa, belumDiisi, pct };
  }, [activeDailyStudents, dailyAttendanceList, dailyDate, dailyClassId]);

  // ==============================================================
  // FEATURE B: PRESENSI MATA PELAJARAN (Guru Mapel)
  // ==============================================================
  // Teaching assignments for Budi Santoso (IPA in 8-A and 8-B)
  const budiAssignments = useMemo(() => {
    return MOCK_TEACHING_ASSIGNMENTS.filter(t => t.teacherId === 'guru-ipa');
  }, []);

  // Official teaching schedules for Budi Santoso from master timetable
  const budiOfficialSchedules = useMemo(() => {
    return MOCK_SCHEDULES.filter(s => s.teacherId === 'guru-ipa');
  }, []);

  // Helper to determine day of week in Indonesian from YYYY-MM-DD
  const getIndonesianDayName = (dateStr: string): 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | 'Minggu' => {
    if (!dateStr) return 'Senin';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return 'Senin';
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    const days: ('Minggu' | 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu')[] = [
      'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
    ];
    return days[d.getDay()];
  };

  const [selectedMapelAssignmentId, setSelectedMapelAssignmentId] = useState<string>(budiAssignments[0]?.id || 'TA-001');
  const [mapelDate, setMapelDate] = useState<string>('2026-10-30'); // Default to Friday
  const [mapelPeriod, setMapelPeriod] = useState<string>('07:30 - 09:00');
  const [mapelRoom, setMapelRoom] = useState<string>('Lab Biologi / Kimia');
  const [autoSyncSchedule, setAutoSyncSchedule] = useState<boolean>(true);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>('SCH-010');

  // Active Indonesian Day for selected date
  const activeDayName = useMemo(() => getIndonesianDayName(mapelDate), [mapelDate]);

  // Master schedules for this teacher on the selected day from Admin Timetable
  const schedulesForSelectedDay = useMemo(() => {
    return budiOfficialSchedules.filter(s => s.day === activeDayName);
  }, [budiOfficialSchedules, activeDayName]);

  // Active schedule session currently chosen by teacher
  const activeSchedule = useMemo(() => {
    if (schedulesForSelectedDay.length === 0) return null;
    const found = schedulesForSelectedDay.find(s => s.id === selectedScheduleId);
    return found || schedulesForSelectedDay[0];
  }, [schedulesForSelectedDay, selectedScheduleId]);

  // Synchronize assignment, room, and period with the active schedule
  const activeAssignment = useMemo(() => {
    if (activeSchedule) {
      const match = budiAssignments.find(a => a.classId === activeSchedule.classId);
      if (match) return match;
    }
    return budiAssignments.find(a => a.id === selectedMapelAssignmentId) || budiAssignments[0];
  }, [budiAssignments, activeSchedule, selectedMapelAssignmentId]);

  // Handle mapel date change with auto-sync
  const handleMapelDateChange = (newDate: string) => {
    setMapelDate(newDate);
    const day = getIndonesianDayName(newDate);
    const matches = budiOfficialSchedules.filter(s => s.day === day);
    if (matches.length > 0) {
      setSelectedScheduleId(matches[0].id);
      triggerToast(`⚡ Hari ${day}: Ditemukan ${matches.length} sesi mengajar resmi`);
    } else {
      setSelectedScheduleId(null);
      triggerToast(`Hari ${day}: Tidak ada jadwal mengajar KBM`);
    }
  };

  // Quick Day Selector helper (Senin s.d. Sabtu)
  const handleSelectDay = (dayName: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu') => {
    const dayMap: Record<string, number> = {
      'Minggu': 0, 'Senin': 1, 'Selasa': 2, 'Rabu': 3, 'Kamis': 4, 'Jumat': 5, 'Sabtu': 6
    };
    const targetDayIndex = dayMap[dayName];
    // Base reference week: 2026-10-25 is Sunday
    const baseSunday = new Date(2026, 9, 25);
    const targetDate = new Date(baseSunday);
    targetDate.setDate(baseSunday.getDate() + targetDayIndex);
    const yyyy = targetDate.getFullYear();
    const mm = String(targetDate.getMonth() + 1).padStart(2, '0');
    const dd = String(targetDate.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    handleMapelDateChange(formattedDate);
  };

  // Unique session identifier for duplicate prevention
  const currentSessionId = useMemo(() => {
    const timeKey = (activeSchedule ? activeSchedule.timeStart : mapelPeriod.match(/(\d\d:\d\d)/)?.[1] || '07:30').replace(':', '');
    const dateClean = mapelDate.replace(/-/g, '');
    const classShort = activeAssignment.classId.replace('KLS-', '');
    return `SES-${classShort}-IPA-${dateClean}-${timeKey}`;
  }, [activeAssignment, mapelDate, activeSchedule, mapelPeriod]);

  // Check if session already exists
  const existingSession = useMemo(() => {
    return subjectSessionsList.find(s => s.id === currentSessionId);
  }, [subjectSessionsList, currentSessionId]);

  // Students for the active mapel class
  const activeMapelStudents = useMemo(() => {
    return getStudentsForClass(activeAssignment.classId);
  }, [activeAssignment]);

  // Mapel attendance records in temporary working state
  const [tempMapelRecords, setTempMapelRecords] = useState<Record<string, { status: SubjectAttendanceRecord['status']; notes: string }>>({});

  // Sync tempMapelRecords whenever currentSessionId changes
  React.useEffect(() => {
    const existingRecords = subjectRecordsList.filter(r => r.sessionId === currentSessionId);
    const newMap: Record<string, { status: SubjectAttendanceRecord['status']; notes: string }> = {};

    activeMapelStudents.forEach(s => {
      const found = existingRecords.find(r => r.studentId === s.id);
      if (found) {
        newMap[s.id] = { status: found.status, notes: found.notes || '' };
      } else {
        // Default fresh
        newMap[s.id] = { status: 'Hadir', notes: '' };
      }
    });

    setTempMapelRecords(newMap);
  }, [currentSessionId, activeMapelStudents, subjectRecordsList]);

  // Set student status in mapel session
  const handleSetMapelStatus = (studentId: string, status: SubjectAttendanceRecord['status'], studentName: string) => {
    setTempMapelRecords(prev => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || { notes: '' }),
        status
      }
    }));
    triggerToast(`${studentName.split(' ')[0]} diset: ${status}`);
  };

  // Update student note in mapel session
  const handleUpdateMapelNote = (studentId: string, notes: string) => {
    setTempMapelRecords(prev => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || { status: 'Hadir' }),
        notes
      }
    }));
  };

  // Mark all present in Mapel session
  const handleMarkAllMapelPresent = () => {
    const newMap: Record<string, { status: SubjectAttendanceRecord['status']; notes: string }> = {};
    activeMapelStudents.forEach(s => {
      newMap[s.id] = { status: 'Hadir', notes: tempMapelRecords[s.id]?.notes || '' };
    });
    setTempMapelRecords(newMap);
    triggerToast('Seluruh siswa ditandai "Hadir" pada sesi KBM ini');
  };

  // Dynamic Mapel Session Stats
  const mapelStats = useMemo(() => {
    const total = activeMapelStudents.length;
    let present = 0;
    let late = 0;
    let sick = 0;
    let excused = 0;
    let absent = 0;

    activeMapelStudents.forEach(s => {
      const rec = tempMapelRecords[s.id];
      const st = rec?.status || 'Hadir';
      if (st === 'Hadir') present++;
      else if (st === 'Terlambat') late++;
      else if (st === 'Sakit') sick++;
      else if (st === 'Izin') excused++;
      else if (st === 'Alpa') absent++;
    });

    const pct = total > 0 ? Math.round(((present + late * 0.8 + excused * 0.5) / total) * 100) : 0;
    return { total, present, late, sick, excused, absent, pct };
  }, [activeMapelStudents, tempMapelRecords]);

  // Save Subject Attendance Action (Prevents Duplication)
  const handleSaveMapelAttendance = () => {
    const startTime = activeSchedule ? activeSchedule.timeStart : (mapelPeriod.match(/(\d\d:\d\d)/)?.[1] || '07:30');
    const endTime = activeSchedule ? activeSchedule.timeEnd : (mapelPeriod.match(/-\s*(\d\d:\d\d)/)?.[1] || '09:00');
    const room = activeSchedule ? activeSchedule.room : mapelRoom;

    const newSession: SubjectAttendanceSession = {
      id: currentSessionId,
      teachingAssignmentId: activeAssignment.id,
      classId: activeAssignment.classId,
      className: activeAssignment.className,
      subjectId: activeAssignment.subjectId,
      subjectName: activeAssignment.subjectName,
      teacherId: activeAssignment.teacherId,
      teacherName: activeAssignment.teacherName,
      academicYearId: activeYear.id,
      date: mapelDate,
      lessonPeriod: `Jam ${startTime} - ${endTime}`,
      startTime,
      endTime,
      room,
      status: 'Sudah Disimpan',
      totalStudents: mapelStats.total,
      presentCount: mapelStats.present,
      lateCount: mapelStats.late,
      excusedCount: mapelStats.excused,
      sickCount: mapelStats.sick,
      absentCount: mapelStats.absent,
      attendancePercentage: mapelStats.pct,
      createdAt: existingSession ? existingSession.createdAt : 'Hari ini, baru saja',
      updatedAt: 'Hari ini, baru saja'
    };

    // Update sessions list
    setSubjectSessionsList(prev => {
      const filtered = prev.filter(s => s.id !== currentSessionId);
      return [newSession, ...filtered];
    });

    // Update records list
    const newRecords: SubjectAttendanceRecord[] = activeMapelStudents.map(s => ({
      id: `SAR-${currentSessionId}-${s.id}`,
      sessionId: currentSessionId,
      studentId: s.id,
      studentName: s.name,
      status: tempMapelRecords[s.id]?.status || 'Hadir',
      notes: tempMapelRecords[s.id]?.notes || '',
      updatedAt: 'Hari ini, baru saja'
    }));

    setSubjectRecordsList(prev => {
      const filtered = prev.filter(r => r.sessionId !== currentSessionId);
      return [...newRecords, ...filtered];
    });

    triggerToast(`Presensi KBM ${activeAssignment.subjectName} (${activeAssignment.className}) berhasil disimpan!`);
  };

  // ==============================================================
  // FEATURE C: RIWAYAT PRESENSI GURU (Guru Mapel)
  // ==============================================================
  const [historyClassFilter, setHistoryClassFilter] = useState<string>('Semua');
  const [historyStatusFilter, setHistoryStatusFilter] = useState<string>('Semua');
  const [historySearch, setHistorySearch] = useState<string>('');

  const budiSessions = useMemo(() => {
    return subjectSessionsList.filter(s => s.teacherId === 'guru-ipa');
  }, [subjectSessionsList]);

  const filteredHistorySessions = useMemo(() => {
    return budiSessions.filter(s => {
      const matchClass = historyClassFilter === 'Semua' || s.classId === historyClassFilter;
      const matchStatus = historyStatusFilter === 'Semua' || s.status === historyStatusFilter;
      const matchSearch = !historySearch || s.className.toLowerCase().includes(historySearch.toLowerCase()) || s.date.includes(historySearch);
      return matchClass && matchStatus && matchSearch;
    });
  }, [budiSessions, historyClassFilter, historyStatusFilter, historySearch]);

  // Open existing session in editor
  const handleOpenSessionInEditor = (session: SubjectAttendanceSession) => {
    setSelectedMapelAssignmentId(session.teachingAssignmentId);
    setMapelDate(session.date);
    setMapelPeriod(`${session.lessonPeriod} (${session.startTime} - ${session.endTime})`);
    setMapelRoom(session.room);
    setActiveTab('guru-presensi-mapel');
    triggerToast(`Membuka sesi presensi ${session.className} - ${session.date}`);
  };

  // ==============================================================
  // FEATURE D: REKAP PRESENSI WALI KELAS (Wali Kelas)
  // ==============================================================
  const [rekapSegment, setRekapSegment] = useState<'harian' | 'mapel' | 'siswa'>('harian');
  const [rekapSearch, setRekapSearch] = useState('');

  // Overview stats for Homeroom 8-A
  const homeroom8ADailyRecords = useMemo(() => {
    return dailyAttendanceList.filter(r => r.classId === 'KLS-8A');
  }, [dailyAttendanceList]);

  const homeroom8AMapelSessions = useMemo(() => {
    return subjectSessionsList.filter(s => s.classId === 'KLS-8A');
  }, [subjectSessionsList]);

  const homeroom8AMapelRecords = useMemo(() => {
    const sessionIds = new Set(homeroom8AMapelSessions.map(s => s.id));
    return subjectRecordsList.filter(r => sessionIds.has(r.sessionId));
  }, [homeroom8AMapelSessions, subjectRecordsList]);

  const rekapOverview = useMemo(() => {
    const totalDaily = homeroom8ADailyRecords.length;
    const dailyPresent = homeroom8ADailyRecords.filter(r => r.status === 'Hadir').length;
    const dailyAlpa = homeroom8ADailyRecords.filter(r => r.status === 'Alpa').length;
    const dailyRate = totalDaily > 0 ? Math.round((dailyPresent / totalDaily) * 100) : 96;

    const completedMapel = homeroom8AMapelSessions.filter(s => s.status === 'Sudah Disimpan');
    const mapelRate = completedMapel.length > 0
      ? Math.round(completedMapel.reduce((acc, s) => acc + s.attendancePercentage, 0) / completedMapel.length)
      : 92;

    const totalLateInMapel = homeroom8AMapelRecords.filter(r => r.status === 'Terlambat').length;

    // Students with frequent absences
    const highAbsenceStudents = classStudents.filter(s => {
      const studentDailyAlpa = homeroom8ADailyRecords.filter(r => r.studentId === s.id && r.status === 'Alpa').length;
      const studentMapelLate = homeroom8AMapelRecords.filter(r => r.studentId === s.id && r.status === 'Terlambat').length;
      return studentDailyAlpa >= 1 || studentMapelLate >= 2;
    });

    return {
      dailyRate,
      mapelRate,
      totalAlpa: dailyAlpa,
      totalLate: totalLateInMapel,
      highAbsenceStudents
    };
  }, [homeroom8ADailyRecords, homeroom8AMapelSessions, homeroom8AMapelRecords, classStudents]);

  // Export Rekap Wali Kelas CSV
  const handleExportRekapCSV = () => {
    const headers = 'NISN,Nama Siswa,Kelas,Total Hadir Harian,Total Sakit,Total Izin,Total Alpa,Terlambat di Mapel,Persentase Kehadiran,Status Evaluasi\n';
    const rows = classStudents.map(s => {
      const sDaily = homeroom8ADailyRecords.filter(r => r.studentId === s.id);
      const hadir = sDaily.filter(r => r.status === 'Hadir').length;
      const sakit = sDaily.filter(r => r.status === 'Sakit').length;
      const izin = sDaily.filter(r => r.status === 'Izin').length;
      const alpa = sDaily.filter(r => r.status === 'Alpa').length;
      const late = homeroom8AMapelRecords.filter(r => r.studentId === s.id && r.status === 'Terlambat').length;
      const total = sDaily.length || 1;
      const pct = Math.round((hadir / total) * 100);
      const evalStatus = alpa >= 1 ? 'Perhatian Khusus' : pct >= 90 ? 'Sangat Baik' : 'Cukup';

      return `"${s.nisn}","${s.name}","Kelas 8-A",${hadir},${sakit},${izin},${alpa},${late},"${pct}%","${evalStatus}"`;
    }).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Rekap_Presensi_Kelas8A.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Rekapitulasi presensi kelas berhasil diexport!');
  };

  // Save Homeroom Grade Note
  const handleSaveGradeNote = (id: string, noteText: string) => {
    setGradesList(prev => prev.map(g => g.id === id ? { ...g, homeroomNotes: noteText } : g));
    setEditingGradeNote(null);
    triggerToast('Catatan perkembangan siswa berhasil diperbarui!');
  };

  return (
    <div className="min-h-screen bg-[#F4F5FA] text-[#3A3541] flex flex-col font-sans">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#3A3541] text-white rounded-xl shadow-[0_6px_20px_rgba(58,53,65,0.3)] border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#56CA00] shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Floating Top App Bar (Materio Style) */}
      <header className="h-16 px-4 sm:px-6 lg:px-8 pt-2 sticky top-0 z-30">
        <div className="h-14 rounded-xl bg-white/95 backdrop-blur-md border border-[#E7E7E9] shadow-[0_2px_10px_rgba(76,78,100,0.06)] px-4 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <button 
              type="button" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-[#F4F5FA] lg:hidden text-[#6B6774] transition-colors"
              aria-label="Toggle Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#16B1FF] to-[#8C57FF] flex items-center justify-center font-black text-white text-base shadow-[0_2px_6px_rgba(22,177,255,0.4)]">
                WK
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-[#3A3541]">
                  PORTAL AKADEMIK GURU
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#16B1FF]/10 text-[#0288D1] border border-[#16B1FF]/20">
                  {currentRole === 'wali' ? 'Wali Kelas 8-A' : 'Guru Mapel IPA'}
                </span>
              </div>
            </div>
          </div>

          {/* Top Actions: Role Switcher & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Demo Role Switcher Dropdown */}
            <div className="relative flex items-center gap-1.5 p-1 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-xs">
              <span className="text-[10px] text-[#8A8D93] hidden md:inline px-1.5 font-medium">Peran Aktif:</span>
              <button
                type="button"
                onClick={() => {
                  setCurrentRole('wali');
                  setActiveTab('dashboard');
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  currentRole === 'wali'
                    ? 'bg-white text-[#8C57FF] shadow-sm border border-[#E7E7E9]'
                    : 'text-[#6B6774] hover:text-[#3A3541]'
                }`}
              >
                🎓 Wali Kelas (8-A)
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentRole('guru');
                  setActiveTab('guru-dashboard');
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  currentRole === 'guru'
                    ? 'bg-white text-[#16B1FF] shadow-sm border border-[#E7E7E9]'
                    : 'text-[#6B6774] hover:text-[#3A3541]'
                }`}
              >
                👨‍🏫 Guru Pengampu (IPA)
              </button>
            </div>

            {/* Link back to Main Admin Panel */}
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8C57FF]/10 hover:bg-[#8C57FF]/20 text-[#8C57FF] border border-[#8C57FF]/25 text-xs font-semibold transition-colors"
              title="Kembali ke Super Admin Panel"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admin Pusat</span>
            </Link>

            {/* Teacher Profile Avatar */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-[#E7E7E9]">
              <div className="relative">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-[#E7E7E9] bg-slate-100 relative shadow-sm">
                  <Image
                    src="/images/indo/teacher-science.webp"
                    alt="Budi Santoso, S.Si., M.Pd."
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#56CA00] border-2 border-white"></span>
              </div>
              <div className="hidden lg:block text-left text-xs leading-tight">
                <div className="font-semibold text-[#3A3541]">Budi Santoso, M.Pd.</div>
                <div className="text-[#8A8D93] text-[10px]">Wali Kelas 8-A & Guru IPA</div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              type="button"
              onClick={() => {
                try {
                  sessionStorage.removeItem('sekolahq_auth_user');
                } catch {}
                window.location.href = '/admin';
              }}
              className="p-2 rounded-xl text-[#8A8D93] hover:text-[#FF4C51] hover:bg-[#FF4C51]/10 border border-transparent hover:border-[#FF4C51]/20 transition-all ml-1 cursor-pointer"
              title="Keluar / Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>
        </div>
      </header>

      {/* Main Container: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden pt-3">
        
        {/* Sidebar Nav */}
        <aside className={`
          fixed lg:static inset-y-16 left-0 z-20 w-64 bg-white border-r border-[#E7E7E9] flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-[0_4px_18px_rgba(76,78,100,0.04)]
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4 space-y-1">
            
            {/* Sidebar Role Header */}
            <div className="px-3 py-2 text-[10px] font-bold text-[#8A8D93] uppercase tracking-wider flex items-center justify-between">
              <span>{currentRole === 'wali' ? 'Menu Wali Kelas (8-A)' : 'Menu Guru Pengampu (IPA)'}</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                currentRole === 'wali' ? 'bg-[#8C57FF]/10 text-[#8C57FF]' : 'bg-[#16B1FF]/10 text-[#0288D1]'
              }`}>
                {currentRole === 'wali' ? 'PERWALIAN' : 'KBM'}
              </span>
            </div>

            <nav className="space-y-1.5 text-sm font-medium">
              
              {/* ============================================================== */}
              {/* NAVIGATION: WALI KELAS MODE (7 Menus) */}
              {/* ============================================================== */}
              {currentRole === 'wali' ? (
                <>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-left ${
                      activeTab === 'dashboard'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4 shrink-0" />
                    <span>Dashboard Wali Kelas</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setActiveTab('kelas-saya'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg transition-all text-left ${
                      activeTab === 'kelas-saya'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 shrink-0" />
                      <span>Kelas Saya</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      activeTab === 'kelas-saya' ? 'bg-white/20 text-white' : 'bg-[#16B1FF]/10 text-[#0288D1]'
                    }`}>
                      {classStudents.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setActiveTab('absensi-harian'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg transition-all text-left ${
                      activeTab === 'absensi-harian'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CalendarCheck className="w-4 h-4 shrink-0" />
                      <span>Presensi Harian</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#56CA00]"></span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setActiveTab('rekap-presensi'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-left ${
                      activeTab === 'rekap-presensi'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <FileSpreadsheet className="w-4 h-4 shrink-0" />
                    <span>Rekap Presensi</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setActiveTab('jadwal'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-left ${
                      activeTab === 'jadwal'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <CalendarDays className="w-4 h-4 shrink-0" />
                    <span>Jadwal Pelajaran</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setActiveTab('rekap-nilai'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-left ${
                      activeTab === 'rekap-nilai'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <Award className="w-4 h-4 shrink-0" />
                    <span>Rekap Akademik</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setActiveTab('laporan'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-left ${
                      activeTab === 'laporan'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <FileText className="w-4 h-4 shrink-0" />
                    <span>Laporan Kelas</span>
                  </button>
                </>
              ) : (
                /* ============================================================== */
                /* NAVIGATION: GURU MATA PELAJARAN MODE (5 Menus) */
                /* ============================================================== */
                <>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('guru-dashboard'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-left ${
                      activeTab === 'guru-dashboard'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4 shrink-0" />
                    <span>Dashboard Guru</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setActiveTab('guru-jadwal'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-left ${
                      activeTab === 'guru-jadwal'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <CalendarDays className="w-4 h-4 shrink-0" />
                    <span>Jadwal Mengajar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setActiveTab('guru-presensi-mapel'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg transition-all text-left ${
                      activeTab === 'guru-presensi-mapel'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CalendarCheck className="w-4 h-4 shrink-0" />
                      <span>Presensi Mata Pelajaran</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#8C57FF]"></span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setActiveTab('guru-riwayat'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-left ${
                      activeTab === 'guru-riwayat'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>Riwayat Presensi</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setActiveTab('guru-rekap'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-left ${
                      activeTab === 'guru-rekap'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <FileSpreadsheet className="w-4 h-4 shrink-0" />
                    <span>Rekap Presensi Mengajar</span>
                  </button>
                </>
              )}

            </nav>
          </div>

          {/* Sidebar Quick Role Switcher Banner */}
          <div className="p-4 border-t border-[#E7E7E9]">
            <div className="p-3 rounded-xl bg-[#F4F5FA] border border-[#E7E7E9] space-y-2">
              <div className="text-[10px] text-[#8A8D93] uppercase font-bold flex items-center justify-between">
                <span>Ganti Peran Cepat</span>
                <Sparkles className="w-3 h-3 text-[#8C57FF]" />
              </div>
              <p className="text-[11px] text-[#6B6774] leading-tight">
                Anda memiliki peran ganda sebagai Wali Kelas dan Guru IPA.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (currentRole === 'wali') {
                    setCurrentRole('guru');
                    setActiveTab('guru-dashboard');
                    triggerToast('Beralih ke mode Guru Mata Pelajaran (IPA)');
                  } else {
                    setCurrentRole('wali');
                    setActiveTab('dashboard');
                    triggerToast('Beralih ke mode Wali Kelas (8-A)');
                  }
                }}
                className="w-full py-1.5 rounded-lg bg-white hover:bg-slate-100 text-[#3A3541] border border-[#E7E7E9] text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3 h-3 text-[#16B1FF]" />
                <span>{currentRole === 'wali' ? 'Buka Menu Guru Mapel' : 'Buka Menu Wali Kelas'}</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          
          {/* ============================================================== */}
          {/* TAB 1: DASHBOARD WALI KELAS */}
          {/* ============================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              
              {/* Hero Banner */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] p-6 sm:p-8 text-white shadow-[0_4px_20px_rgba(22,177,255,0.25)]">
                <div className="relative z-10 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Selamat Bertugas, Bapak Budi Santoso</span>
                  </div>
                  <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                    Dashboard Wali Kelas 8-A (Al-Khawarizmi)
                  </h1>
                  <p className="text-xs sm:text-sm text-white/90 max-w-2xl leading-relaxed">
                    Tahun Ajaran 2026/2027 Ganjil • Kurikulum Merdeka Mandiri Berbagi. Pantau kehadiran harian siswa bimbingan Anda hari ini.
                  </p>
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#E7E7E9] shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#8A8D93]">Hadir Hari Ini</div>
                    <div className="text-2xl font-bold text-[#56CA00]">{dailyStats.hadir}</div>
                    <div className="text-[10px] text-[#8A8D93]">{dailyStats.pct}% dari {dailyStats.total} siswa</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#56CA00]/12 flex items-center justify-center text-[#56CA00]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E7E7E9] shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#8A8D93]">Sakit & Izin</div>
                    <div className="text-2xl font-bold text-[#FFB400]">{dailyStats.sakit + dailyStats.izin}</div>
                    <div className="text-[10px] text-[#8A8D93]">{dailyStats.sakit} Sakit, {dailyStats.izin} Izin</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#FFB400]/12 flex items-center justify-center text-[#FFB400]">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E7E7E9] shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#8A8D93]">Alpa (Tanpa Ket)</div>
                    <div className="text-2xl font-bold text-[#FF4C51]">{dailyStats.alpa}</div>
                    <div className="text-[10px] text-[#8A8D93]">{dailyStats.alpa === 0 ? 'Tertib 100%' : 'Perlu ditindaklanjuti'}</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#FF4C51]/12 flex items-center justify-center text-[#FF4C51]">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E7E7E9] shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#8A8D93]">Rata-rata Rapor</div>
                    <div className="text-2xl font-bold text-[#8C57FF]">86.4</div>
                    <div className="text-[10px] text-[#56CA00] flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" /> Sangat Baik
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#8C57FF]/12 flex items-center justify-center text-[#8C57FF]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Class Schedule Today & Announcements */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-7 rounded-xl bg-white border border-[#E7E7E9] shadow-sm p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
                    <div>
                      <h3 className="font-bold text-[#3A3541] text-base">Jadwal KBM Hari Ini (Kelas 8-A)</h3>
                      <p className="text-xs text-[#8A8D93]">Mata pelajaran yang terjadwal berlangsung hari ini</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('jadwal')}
                      className="text-xs text-[#16B1FF] font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Lihat Seminggu</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {MOCK_SCHEDULES.slice(0, 3).map((sch, idx) => (
                      <div key={sch.id} className="p-3.5 rounded-xl bg-[#F4F5FA] border border-[#E7E7E9] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-white border border-[#E7E7E9] flex flex-col items-center justify-center text-[#3A3541] shadow-xs">
                            <span className="text-[10px] text-[#8A8D93]">Jam ke</span>
                            <span className="text-sm font-bold text-[#8C57FF]">{idx + 1}</span>
                          </div>
                          <div>
                            <div className="font-bold text-sm text-[#3A3541]">{sch.subjectName}</div>
                            <div className="text-xs text-[#6B6774] flex items-center gap-2">
                              <span>{sch.teacherName}</span>
                              <span>•</span>
                              <span className="text-[#8A8D93]">{sch.room}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="px-2.5 py-1 rounded-md bg-white border border-[#E7E7E9] text-xs font-semibold text-[#3A3541]">
                            {sch.timeStart} - {sch.timeEnd}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-xl bg-white border border-[#E7E7E9] shadow-sm p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
                    <h3 className="font-bold text-[#3A3541] text-base">Pengumuman Akademik</h3>
                    <span className="text-xs text-[#8A8D93]">{MOCK_ACADEMIC_ANNOUNCEMENTS.length} Baru</span>
                  </div>

                  <div className="space-y-3">
                    {MOCK_ACADEMIC_ANNOUNCEMENTS.map(ann => (
                      <div key={ann.id} className="p-3 rounded-xl bg-[#F4F5FA] border border-[#E7E7E9]/70 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-[#8C57FF]">{ann.author}</span>
                          <span className="text-[#8A8D93]">{ann.date}</span>
                        </div>
                        <div className="text-xs font-bold text-[#3A3541] leading-snug">{ann.title}</div>
                        <p className="text-[11px] text-[#6B6774] line-clamp-2 leading-relaxed">{ann.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: KELAS SAYA (ROSTER SISWA & PENGURUS KELAS) */}
          {/* ============================================================== */}
          {activeTab === 'kelas-saya' && (
            <div className="space-y-5 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#3A3541]">
                    Roster Siswa Perwalian — {currentClass.name}
                  </h2>
                  <p className="text-xs text-[#8A8D93]">
                    Total {classStudents.length} siswa terdaftar aktif pada Tahun Ajaran {activeYear.name}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8D93]" />
                    <input
                      type="text"
                      placeholder="Cari siswa, NISN, atau NIS..."
                      value={studentSearch}
                      onChange={(e) => setStudentSearch(e.target.value)}
                      className="pl-9 pr-3 py-1.5 rounded-lg bg-white border border-[#E7E7E9] text-xs text-[#3A3541] focus:outline-none focus:border-[#16B1FF] w-64 shadow-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Class Officers Highlight Box */}
              <div className="p-4 rounded-xl bg-white border border-[#E7E7E9] shadow-xs space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#8C57FF]" />
                    <span className="text-xs font-bold text-[#3A3541] uppercase tracking-wider">
                      Struktur Pengurus Kelas {currentClass.name} ({classOfficers.length} Jabatan)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8C57FF]/10 text-[#8C57FF] font-semibold">
                      Ditetapkan Wali Kelas
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setTempOfficers(classOfficers);
                      setNewRoleInput('');
                      setNewStudentInput(classStudents[0]?.id || '');
                      setShowEditOfficersModal(true);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#8C57FF]/10 hover:bg-[#8C57FF]/20 text-[#8C57FF] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Kelola & Tambah Jabatan</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {classOfficers.map((officer, idx) => {
                    const student = classStudents.find(s => s.id === officer.studentId);
                    const color = OFFICER_COLOR_THEMES[idx % OFFICER_COLOR_THEMES.length];
                    return (
                      <div
                        key={officer.id}
                        className={`p-3 rounded-lg ${color.bg} border ${color.border} hover:shadow-xs transition-all`}
                      >
                        <div className={`text-[10px] font-bold ${color.text} uppercase truncate`} title={officer.role}>
                          {officer.role}
                        </div>
                        <div className="text-xs font-bold text-[#3A3541] mt-0.5 truncate" title={student?.name || '-'}>
                          {student?.name || '-'}
                        </div>
                        <div className="text-[10px] text-[#8A8D93]">NIS: {student?.nis || '-'}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Table of Students */}
              <div className="rounded-xl bg-white border border-[#E7E7E9] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAFC] text-[#6B6774] font-semibold border-b border-[#E7E7E9]">
                      <tr>
                        <th className="py-3 px-4">No</th>
                        <th className="py-3 px-4">Siswa</th>
                        <th className="py-3 px-4">NISN / NIS</th>
                        <th className="py-3 px-4">L/P</th>
                        <th className="py-3 px-4">Asal Sekolah</th>
                        <th className="py-3 px-4">Kontak Orang Tua</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7E7E9] text-[#3A3541]">
                      {filteredStudents.map((s, idx) => (
                        <tr key={s.id} className="hover:bg-[#F4F5FA] transition-colors">
                          <td className="py-3 px-4 text-[#8A8D93]">{idx + 1}</td>
                          <td className="py-3 px-4 font-semibold flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 relative shrink-0 border border-[#E7E7E9]">
                              <Image src={s.avatarUrl} alt={s.name} fill className="object-cover" />
                            </div>
                            <div>
                              <div>{s.name}</div>
                              <div className="text-[10px] text-[#8A8D93]">{s.birthPlace}, {s.birthDate}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono text-xs text-[#6B6774]">
                            <div>{s.nisn}</div>
                            <div className="text-[10px] text-[#8A8D93]">NIS: {s.nis}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              s.gender === 'L' ? 'bg-[#16B1FF]/10 text-[#0288D1]' : 'bg-[#FF4C51]/10 text-[#FF4C51]'
                            }`}>
                              {s.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[#6B6774]">{s.previousSchool}</td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-[#3A3541]">{s.parentName}</div>
                            <a
                              href={`https://wa.me/62${s.parentPhone.replace(/^0/, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-[#56CA00] font-semibold hover:underline flex items-center gap-1"
                            >
                              <Phone className="w-3 h-3" />
                              <span>{s.parentPhone}</span>
                            </a>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#56CA00]/12 text-[#46A200] border border-[#56CA00]/30">
                              {s.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => setSelectedStudent(s)}
                              className="px-2.5 py-1 rounded-md bg-[#16B1FF]/10 hover:bg-[#16B1FF]/20 text-[#0288D1] text-xs font-semibold transition-colors"
                            >
                              Detail Profil
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

          {/* ============================================================== */}
          {/* FEATURE A: TAB 3 - PRESENSI HARIAN (Wali Kelas) */}
          {/* ============================================================== */}
          {activeTab === 'absensi-harian' && (
            <div className="space-y-5 max-w-7xl mx-auto">
              
              {/* Header Presensi & Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E7E7E9] shadow-xs">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Class Selector */}
                  <div>
                    <label className="text-[10px] text-[#8A8D93] uppercase font-bold block mb-1">Pilih Kelas:</label>
                    <select
                      value={dailyClassId}
                      onChange={(e) => setDailyClassId(e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-xs font-bold text-[#3A3541] focus:bg-white focus:outline-none focus:border-[#8C57FF]"
                    >
                      <option value="KLS-8A">Kelas 8-A (Al-Khawarizmi) — Perwalian Anda</option>
                      <option value="KLS-8B">Kelas 8-B (Jabir Hayyan)</option>
                      <option value="KLS-7A">Kelas 7-A (Al-Biruni)</option>
                    </select>
                  </div>

                  {/* Date Picker */}
                  <div>
                    <label className="text-[10px] text-[#8A8D93] uppercase font-bold block mb-1">Tanggal Presensi:</label>
                    <input
                      type="date"
                      value={dailyDate}
                      onChange={(e) => setDailyDate(e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-xs font-semibold text-[#3A3541] focus:bg-white focus:outline-none focus:border-[#16B1FF]"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
                  <button
                    type="button"
                    onClick={handleMarkAllDailyPresent}
                    className="px-3 py-2 rounded-lg bg-[#56CA00] hover:bg-[#46A200] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Tandai Semua Hadir</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetDailyAttendance}
                    className="px-3 py-2 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774] text-xs font-semibold transition-all border border-[#E7E7E9]"
                    title="Reset presensi tanggal ini"
                  >
                    Reset
                  </button>

                  <button
                    type="button"
                    onClick={handleExportDailyCSV}
                    className="px-3 py-2 rounded-lg bg-white hover:bg-[#F4F5FA] text-[#3A3541] border border-[#E7E7E9] text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5 text-[#16B1FF]" />
                    <span>Unduh CSV</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveDailyAttendance}
                    className="px-4 py-2 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Simpan Presensi</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Daily Attendance Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-[#E7E7E9] shadow-xs">
                  <div className="text-[10px] text-[#8A8D93] uppercase font-bold">Total Siswa</div>
                  <div className="text-xl font-bold text-[#3A3541] mt-0.5">{dailyStats.total}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#E7E7E9] shadow-xs">
                  <div className="text-[10px] text-[#56CA00] uppercase font-bold">Hadir</div>
                  <div className="text-xl font-bold text-[#56CA00] mt-0.5">{dailyStats.hadir}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#E7E7E9] shadow-xs">
                  <div className="text-[10px] text-[#FFB400] uppercase font-bold">Sakit</div>
                  <div className="text-xl font-bold text-[#FFB400] mt-0.5">{dailyStats.sakit}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#E7E7E9] shadow-xs">
                  <div className="text-[10px] text-[#16B1FF] uppercase font-bold">Izin</div>
                  <div className="text-xl font-bold text-[#16B1FF] mt-0.5">{dailyStats.izin}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#E7E7E9] shadow-xs">
                  <div className="text-[10px] text-[#FF4C51] uppercase font-bold">Alpa</div>
                  <div className="text-xl font-bold text-[#FF4C51] mt-0.5">{dailyStats.alpa}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#E7E7E9] shadow-xs">
                  <div className="text-[10px] text-[#8C57FF] uppercase font-bold">Persentase</div>
                  <div className="text-xl font-bold text-[#8C57FF] mt-0.5">{dailyStats.pct}%</div>
                </div>
              </div>

              {/* Daily Attendance Table */}
              <div className="rounded-xl bg-white border border-[#E7E7E9] shadow-sm overflow-hidden">
                <div className="p-4 border-b border-[#F4F5FA] flex justify-between items-center">
                  <h3 className="font-bold text-sm text-[#3A3541] flex items-center gap-2">
                    <CalendarCheck className="w-4 h-4 text-[#56CA00]" />
                    <span>Daftar Presensi Harian Siswa ({dailyDate})</span>
                  </h3>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-[#56CA00] font-semibold">{dailyStats.hadir} Hadir</span>
                    <span className="text-[#FFB400] font-semibold">{dailyStats.sakit} Sakit</span>
                    <span className="text-[#16B1FF] font-semibold">{dailyStats.izin} Izin</span>
                    <span className="text-[#FF4C51] font-semibold">{dailyStats.alpa} Alpa</span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAFC] text-[#6B6774] font-semibold border-b border-[#E7E7E9]">
                      <tr>
                        <th className="py-3 px-4">No</th>
                        <th className="py-3 px-4">Nama Siswa</th>
                        <th className="py-3 px-4">NISN</th>
                        <th className="py-3 px-4 text-center">Set Status Presensi</th>
                        <th className="py-3 px-4">Keterangan / Alasan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7E7E9] text-[#3A3541]">
                      {activeDailyStudents.map((s, idx) => {
                        const record = dailyAttendanceList.find(a => a.studentId === s.id && a.date === dailyDate && a.classId === dailyClassId);
                        const currentStatus = record?.status || 'Hadir';

                        return (
                          <tr key={s.id} className="hover:bg-[#F4F5FA] transition-colors">
                            <td className="py-3 px-4 text-[#8A8D93]">{idx + 1}</td>
                            <td className="py-3 px-4 font-semibold">{s.name}</td>
                            <td className="py-3 px-4 font-mono text-xs text-[#6B6774]">{s.nisn}</td>
                            
                            {/* Interactive Attendance Pill Selector */}
                            <td className="py-3 px-4">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleSetDailyStatus(s.id, 'Hadir', s.name)}
                                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                                    currentStatus === 'Hadir'
                                      ? 'bg-[#56CA00] text-white shadow-xs'
                                      : 'bg-[#56CA00]/10 text-[#46A200] hover:bg-[#56CA00]/20'
                                  }`}
                                >
                                  H
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSetDailyStatus(s.id, 'Sakit', s.name)}
                                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                                    currentStatus === 'Sakit'
                                      ? 'bg-[#FFB400] text-white shadow-xs'
                                      : 'bg-[#FFB400]/10 text-[#B37F00] hover:bg-[#FFB400]/20'
                                  }`}
                                >
                                  S
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSetDailyStatus(s.id, 'Izin', s.name)}
                                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                                    currentStatus === 'Izin'
                                      ? 'bg-[#16B1FF] text-white shadow-xs'
                                      : 'bg-[#16B1FF]/10 text-[#0288D1] hover:bg-[#16B1FF]/20'
                                  }`}
                                >
                                  I
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSetDailyStatus(s.id, 'Alpa', s.name)}
                                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                                    currentStatus === 'Alpa'
                                      ? 'bg-[#FF4C51] text-white shadow-xs'
                                      : 'bg-[#FF4C51]/10 text-[#FF4C51] hover:bg-[#FF4C51]/20'
                                  }`}
                                >
                                  A
                                </button>
                              </div>
                            </td>

                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="text"
                                  value={record?.note || ''}
                                  onChange={(e) => handleUpdateDailyNote(s.id, e.target.value, s.name)}
                                  placeholder={currentStatus === 'Hadir' ? 'Catatan (opsional)...' : 'Ketik alasan...'}
                                  className="w-full min-w-[140px] max-w-[210px] px-2.5 py-1 text-xs rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] placeholder:text-[#A8A8A8] focus:bg-white focus:border-[#16B1FF] focus:outline-none transition-all"
                                />
                                <button
                                  type="button"
                                  onClick={() => setEditingDailyNote({
                                    studentId: s.id,
                                    studentName: s.name,
                                    currentStatus,
                                    note: record?.note || ''
                                  })}
                                  title="Input keterangan / pilih template alasan"
                                  className="px-2 py-1 rounded-md bg-[#16B1FF]/10 hover:bg-[#16B1FF]/20 text-[#0288D1] transition-colors shrink-0 flex items-center gap-1 font-semibold text-[11px]"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  <span>Alasan</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* FEATURE D: TAB 4 - REKAP PRESENSI WALI KELAS */}
          {/* ============================================================== */}
          {activeTab === 'rekap-presensi' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              
              {/* Header Rekap */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#E7E7E9] shadow-sm">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#3A3541] flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-[#8C57FF]" />
                    <span>Rekapitulasi Kehadiran Siswa — {currentClass.name}</span>
                  </h2>
                  <p className="text-xs text-[#8A8D93] mt-0.5">
                    Kombinasi data presensi harian perwalian dan presensi seluruh mata pelajaran di kelas ini
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleExportRekapCSV}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F4F5FA] text-[#3A3541] border border-[#E7E7E9] text-xs font-semibold flex items-center gap-2 transition-all shadow-xs self-start sm:self-auto"
                >
                  <Download className="w-4 h-4 text-[#8C57FF]" />
                  <span>Export Rekap CSV</span>
                </button>
              </div>

              {/* Rekap Overview KPIs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#E7E7E9] shadow-sm">
                  <div className="text-[11px] text-[#8A8D93] uppercase font-bold">Tingkat Hadir Harian</div>
                  <div className="text-2xl font-bold text-[#56CA00] mt-1">{rekapOverview.dailyRate}%</div>
                  <div className="text-[10px] text-[#8A8D93] mt-0.5">Rata-rata kehadiran harian</div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E7E7E9] shadow-sm">
                  <div className="text-[11px] text-[#8A8D93] uppercase font-bold">Tingkat Hadir KBM Mapel</div>
                  <div className="text-2xl font-bold text-[#8C57FF] mt-1">{rekapOverview.mapelRate}%</div>
                  <div className="text-[10px] text-[#8A8D93] mt-0.5">Rata-rata seluruh mapel</div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E7E7E9] shadow-sm">
                  <div className="text-[11px] text-[#8A8D93] uppercase font-bold">Total Alpa Tercatat</div>
                  <div className="text-2xl font-bold text-[#FF4C51] mt-1">{rekapOverview.totalAlpa}</div>
                  <div className="text-[10px] text-[#8A8D93] mt-0.5">Tanpa konfirmasi izin</div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E7E7E9] shadow-sm">
                  <div className="text-[11px] text-[#8A8D93] uppercase font-bold">Siswa Terlambat di Mapel</div>
                  <div className="text-2xl font-bold text-[#FFB400] mt-1">{rekapOverview.totalLate}</div>
                  <div className="text-[10px] text-[#8A8D93] mt-0.5">Frekuensi keterlambatan</div>
                </div>
              </div>

              {/* High Absence Alert Banner */}
              {rekapOverview.highAbsenceStudents.length > 0 && (
                <div className="p-4 rounded-xl bg-[#FF4C51]/8 border border-[#FF4C51]/25 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#FF4C51] shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <span className="font-bold text-[#FF4C51]">Perhatian Wali Kelas: Siswa dengan Catatan Absensi</span>
                    <p className="text-[#3A3541]">
                      Siswa berikut memiliki riwayat alpa atau sering terlambat: {' '}
                      <strong>{rekapOverview.highAbsenceStudents.map(s => s.name).join(', ')}</strong>. Disarankan untuk follow-up ke orang tua/BK.
                    </p>
                  </div>
                </div>
              )}

              {/* Segmented View Tabs */}
              <div className="space-y-4">
                <div className="flex border-b border-[#E7E7E9] gap-4 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setRekapSegment('harian')}
                    className={`pb-2.5 transition-colors relative ${
                      rekapSegment === 'harian'
                        ? 'text-[#8C57FF] border-b-2 border-[#8C57FF]'
                        : 'text-[#8A8D93] hover:text-[#3A3541]'
                    }`}
                  >
                    1. Log Presensi Harian ({homeroom8ADailyRecords.length} Data)
                  </button>

                  <button
                    type="button"
                    onClick={() => setRekapSegment('mapel')}
                    className={`pb-2.5 transition-colors relative ${
                      rekapSegment === 'mapel'
                        ? 'text-[#8C57FF] border-b-2 border-[#8C57FF]'
                        : 'text-[#8A8D93] hover:text-[#3A3541]'
                    }`}
                  >
                    2. Sesi Mata Pelajaran Kelas 8-A ({homeroom8AMapelSessions.length} Sesi)
                  </button>

                  <button
                    type="button"
                    onClick={() => setRekapSegment('siswa')}
                    className={`pb-2.5 transition-colors relative ${
                      rekapSegment === 'siswa'
                        ? 'text-[#8C57FF] border-b-2 border-[#8C57FF]'
                        : 'text-[#8A8D93] hover:text-[#3A3541]'
                    }`}
                  >
                    3. Rekapitulasi Per Siswa ({classStudents.length} Siswa)
                  </button>
                </div>

                {/* Segment 1: Log Presensi Harian */}
                {rekapSegment === 'harian' && (
                  <div className="rounded-xl bg-white border border-[#E7E7E9] shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#F8FAFC] text-[#6B6774] font-semibold border-b border-[#E7E7E9]">
                          <tr>
                            <th className="py-3 px-4">Tanggal</th>
                            <th className="py-3 px-4">Nama Siswa</th>
                            <th className="py-3 px-4 text-center">Status</th>
                            <th className="py-3 px-4">Keterangan</th>
                            <th className="py-3 px-4">Dicatat Oleh</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E7E7E9] text-[#3A3541]">
                          {homeroom8ADailyRecords.map((r) => (
                            <tr key={r.id} className="hover:bg-[#F4F5FA]">
                              <td className="py-3 px-4 font-mono font-medium text-[#6B6774]">{r.date}</td>
                              <td className="py-3 px-4 font-semibold">{r.studentName}</td>
                              <td className="py-3 px-4 text-center">
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                  r.status === 'Hadir' ? 'bg-[#56CA00]/10 text-[#46A200]' :
                                  r.status === 'Sakit' ? 'bg-[#FFB400]/10 text-[#B37F00]' :
                                  r.status === 'Izin' ? 'bg-[#16B1FF]/10 text-[#0288D1]' : 'bg-[#FF4C51]/10 text-[#FF4C51]'
                                }`}>
                                  {r.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-[#8A8D93] italic">{r.note || r.notes || '-'}</td>
                              <td className="py-3 px-4 text-[#6B6774]">{r.recordedBy}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Segment 2: Sesi Mata Pelajaran Kelas 8-A */}
                {rekapSegment === 'mapel' && (
                  <div className="rounded-xl bg-white border border-[#E7E7E9] shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#F8FAFC] text-[#6B6774] font-semibold border-b border-[#E7E7E9]">
                          <tr>
                            <th className="py-3 px-4">Tanggal & Sesi</th>
                            <th className="py-3 px-4">Mata Pelajaran</th>
                            <th className="py-3 px-4">Guru Pengampu</th>
                            <th className="py-3 px-4 text-center">Kehadiran Siswa</th>
                            <th className="py-3 px-4 text-center">Persentase</th>
                            <th className="py-3 px-4 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E7E7E9] text-[#3A3541]">
                          {homeroom8AMapelSessions.map((s) => (
                            <tr key={s.id} className="hover:bg-[#F4F5FA]">
                              <td className="py-3 px-4 font-mono font-medium text-[#6B6774]">
                                <div>{s.date}</div>
                                <div className="text-[10px] text-[#8A8D93]">{s.lessonPeriod} ({s.startTime}-{s.endTime})</div>
                              </td>
                              <td className="py-3 px-4 font-bold text-[#3A3541]">{s.subjectName}</td>
                              <td className="py-3 px-4 text-[#6B6774]">{s.teacherName}</td>
                              <td className="py-3 px-4 text-center">
                                {s.status === 'Sudah Disimpan' ? (
                                  <span className="font-semibold text-xs">
                                    <span className="text-[#56CA00]">{s.presentCount} H</span> •{' '}
                                    <span className="text-[#8C57FF]">{s.lateCount} T</span> •{' '}
                                    <span className="text-[#FFB400]">{s.sickCount + s.excusedCount} S/I</span>
                                  </span>
                                ) : (
                                  <span className="text-[#A8A8A8] italic">Belum Diinput</span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-center font-bold">
                                {s.status === 'Sudah Disimpan' ? (
                                  <span className={s.attendancePercentage >= 85 ? 'text-[#56CA00]' : 'text-[#FFB400]'}>
                                    {s.attendancePercentage}%
                                  </span>
                                ) : '-'}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  s.status === 'Sudah Disimpan' ? 'bg-[#56CA00]/10 text-[#46A200]' : 'bg-[#FF4C51]/10 text-[#FF4C51]'
                                }`}>
                                  {s.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Segment 3: Rekap Per Siswa */}
                {rekapSegment === 'siswa' && (
                  <div className="rounded-xl bg-white border border-[#E7E7E9] shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#F8FAFC] text-[#6B6774] font-semibold border-b border-[#E7E7E9]">
                          <tr>
                            <th className="py-3 px-4">No</th>
                            <th className="py-3 px-4">Nama Siswa</th>
                            <th className="py-3 px-4">NISN</th>
                            <th className="py-3 px-4 text-center">Hadir</th>
                            <th className="py-3 px-4 text-center">Sakit</th>
                            <th className="py-3 px-4 text-center">Izin</th>
                            <th className="py-3 px-4 text-center">Alpa</th>
                            <th className="py-3 px-4 text-center">Terlambat Mapel</th>
                            <th className="py-3 px-4 text-center">Persentase</th>
                            <th className="py-3 px-4 text-center">Evaluasi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E7E7E9] text-[#3A3541]">
                          {classStudents.map((s, idx) => {
                            const sDaily = homeroom8ADailyRecords.filter(r => r.studentId === s.id);
                            const hadir = sDaily.filter(r => r.status === 'Hadir').length;
                            const sakit = sDaily.filter(r => r.status === 'Sakit').length;
                            const izin = sDaily.filter(r => r.status === 'Izin').length;
                            const alpa = sDaily.filter(r => r.status === 'Alpa').length;
                            const late = homeroom8AMapelRecords.filter(r => r.studentId === s.id && r.status === 'Terlambat').length;
                            const total = sDaily.length || 1;
                            const pct = Math.round((hadir / total) * 100);

                            return (
                              <tr key={s.id} className="hover:bg-[#F4F5FA]">
                                <td className="py-3 px-4 text-[#8A8D93]">{idx + 1}</td>
                                <td className="py-3 px-4 font-semibold">{s.name}</td>
                                <td className="py-3 px-4 font-mono text-xs text-[#6B6774]">{s.nisn}</td>
                                <td className="py-3 px-4 text-center font-bold text-[#56CA00]">{hadir}</td>
                                <td className="py-3 px-4 text-center text-[#FFB400]">{sakit}</td>
                                <td className="py-3 px-4 text-center text-[#16B1FF]">{izin}</td>
                                <td className="py-3 px-4 text-center font-bold text-[#FF4C51]">{alpa}</td>
                                <td className="py-3 px-4 text-center text-[#8C57FF] font-semibold">{late}</td>
                                <td className="py-3 px-4 text-center font-bold">
                                  <span className={pct >= 90 ? 'text-[#56CA00]' : 'text-[#FFB400]'}>{pct}%</span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    alpa >= 1 ? 'bg-[#FF4C51]/10 text-[#FF4C51]' :
                                    pct >= 90 ? 'bg-[#56CA00]/10 text-[#46A200]' : 'bg-[#FFB400]/10 text-[#B37F00]'
                                  }`}>
                                    {alpa >= 1 ? 'Perhatian' : pct >= 90 ? 'Sangat Baik' : 'Cukup'}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 5: JADWAL PELAJARAN KELAS 8-A */}
          {/* ============================================================== */}
          {activeTab === 'jadwal' && (
            <div className="space-y-5 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#3A3541]">
                    Jadwal Pelajaran KBM — {currentClass.name}
                  </h2>
                  <p className="text-xs text-[#8A8D93]">
                    Jadwal tatap muka resmi Tahun Ajaran 2026/2027 Ganjil
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-lg bg-white hover:bg-[#F4F5FA] border border-[#E7E7E9] text-xs font-semibold text-[#3A3541] flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5 text-[#16B1FF]" />
                  <span>Cetak Jadwal</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].map(day => {
                  const daySchedules = MOCK_SCHEDULES.filter(s => s.classId === currentClass.id && s.day === day);
                  return (
                    <div key={day} className="rounded-xl bg-white border border-[#E7E7E9] shadow-sm overflow-hidden">
                      <div className="px-4 py-3 bg-[#F8FAFC] border-b border-[#E7E7E9] flex items-center justify-between">
                        <span className="font-bold text-xs text-[#3A3541]">{day}</span>
                        <span className="text-[10px] text-[#8A8D93]">{daySchedules.length} Sesi KBM</span>
                      </div>
                      <div className="p-3 space-y-2.5">
                        {daySchedules.length > 0 ? (
                          daySchedules.map(sch => (
                            <div key={sch.id} className="p-2.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9]/70 space-y-1">
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="font-bold text-[#3A3541]">{sch.subjectName}</span>
                                <span className="text-[10px] font-semibold text-[#8C57FF]">{sch.timeStart} - {sch.timeEnd}</span>
                              </div>
                              <div className="text-[10px] text-[#8A8D93] flex items-center justify-between">
                                <span>{sch.teacherName}</span>
                                <span className="font-medium text-[#6B6774]">{sch.room}</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="py-6 text-center text-xs text-[#A8A8A8] italic">Tidak ada jadwal</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 6: REKAP AKADEMIK (NILAI LEGER) */}
          {/* ============================================================== */}
          {activeTab === 'rekap-nilai' && (
            <div className="space-y-5 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#3A3541]">
                    Rekapitulasi Nilai Akademik — {currentClass.name}
                  </h2>
                  <p className="text-xs text-[#8A8D93]">
                    Leger nilai tugas, PTS, PAS, dan catatan perkembangan kepribadian siswa
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-white border border-[#E7E7E9] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAFC] text-[#6B6774] font-semibold border-b border-[#E7E7E9]">
                      <tr>
                        <th className="py-3 px-4">No</th>
                        <th className="py-3 px-4">Nama Siswa</th>
                        <th className="py-3 px-4 text-center">Tugas</th>
                        <th className="py-3 px-4 text-center">PTS</th>
                        <th className="py-3 px-4 text-center">PAS</th>
                        <th className="py-3 px-4 text-center">Rata-rata</th>
                        <th className="py-3 px-4 text-center">Predikat</th>
                        <th className="py-3 px-4">Catatan Wali Kelas</th>
                        <th className="py-3 px-4 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7E7E9] text-[#3A3541]">
                      {gradesList.map((g, idx) => (
                        <tr key={g.id} className="hover:bg-[#F4F5FA] transition-colors">
                          <td className="py-3 px-4 text-[#8A8D93]">{idx + 1}</td>
                          <td className="py-3 px-4 font-semibold">{g.studentName}</td>
                          <td className="py-3 px-4 text-center font-mono">{g.assignmentScore}</td>
                          <td className="py-3 px-4 text-center font-mono">{g.midtermScore}</td>
                          <td className="py-3 px-4 text-center font-mono">{g.finalScore}</td>
                          <td className="py-3 px-4 text-center font-mono font-bold text-[#8C57FF]">{g.averageScore}</td>
                          <td className="py-3 px-4 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#56CA00]/10 text-[#46A200]">
                              {g.letterGrade} ({g.status})
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[#6B6774] max-w-xs">
                            <p className="line-clamp-2 italic">{g.homeroomNotes || 'Belum ada catatan...'}</p>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => setEditingGradeNote({ id: g.id, note: g.homeroomNotes || '' })}
                              className="px-2.5 py-1 rounded-md bg-[#8C57FF]/10 hover:bg-[#8C57FF]/20 text-[#8C57FF] text-xs font-semibold transition-colors flex items-center gap-1 mx-auto"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Catatan</span>
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

          {/* ============================================================== */}
          {/* TAB 7: LAPORAN KELAS & SIAP CETAK */}
          {/* ============================================================== */}
          {activeTab === 'laporan' && (
            <div className="space-y-5 max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#3A3541]">Laporan Leger Hasil Belajar Siswa</h2>
                  <p className="text-xs text-[#8A8D93]">Format cetak dokumen resmi perwalian</p>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Dokumen Resmi</span>
                </button>
              </div>

              {/* Official Paper Sheet Preview */}
              <div className="p-8 rounded-2xl bg-white border border-[#E7E7E9] shadow-sm space-y-6">
                <div className="text-center pb-4 border-b-2 border-slate-900 space-y-1">
                  <h3 className="font-bold text-sm tracking-widest uppercase text-slate-800">
                    PEMERINTAH KABUPATEN GRESIK • DINAS PENDIDIKAN
                  </h3>
                  <h2 className="text-lg font-black tracking-tight text-[#8C57FF]">
                    SMP SEKOLAH-Q UJUNGPANGKAH
                  </h2>
                  <p className="text-[11px] text-[#6B6774]">
                    NPSN: 20501234 • Terakreditasi A • Jl. Raya Pendidikan No. 45, Ujungpangkah, Gresik
                  </p>
                </div>

                <div className="text-center space-y-1">
                  <h4 className="font-bold text-sm uppercase underline decoration-2 underline-offset-4 text-slate-800">
                    LEGER REKAPITULASI CAPAIAN PERWALIAN
                  </h4>
                  <p className="text-xs text-[#6B6774]">
                    Kelas: <strong>{currentClass.name}</strong> • Semester: <strong>Ganjil 2026/2027</strong> • Wali Kelas: <strong>Budi Santoso, S.Si., M.Pd.</strong>
                  </p>
                </div>

                <table className="w-full text-left text-xs border border-slate-300">
                  <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                    <tr>
                      <th className="py-2 px-3 border-r border-slate-300">No</th>
                      <th className="py-2 px-3 border-r border-slate-300">Nama Siswa</th>
                      <th className="py-2 px-3 border-r border-slate-300 text-center">NISN</th>
                      <th className="py-2 px-3 border-r border-slate-300 text-center">Rata-rata Nilai</th>
                      <th className="py-2 px-3 border-r border-slate-300 text-center">Predikat</th>
                      <th className="py-2 px-3">Catatan Wali Kelas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {gradesList.map((g, idx) => (
                      <tr key={g.id}>
                        <td className="py-2 px-3 border-r border-slate-300">{idx + 1}</td>
                        <td className="py-2 px-3 border-r border-slate-300 font-semibold">{g.studentName}</td>
                        <td className="py-2 px-3 border-r border-slate-300 font-mono text-center">{g.studentId}</td>
                        <td className="py-2 px-3 border-r border-slate-300 text-center font-bold">{g.averageScore}</td>
                        <td className="py-2 px-3 border-r border-slate-300 text-center font-bold">{g.letterGrade}</td>
                        <td className="py-2 px-3 text-[11px] italic">{g.homeroomNotes || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Signature Columns */}
                <div className="grid grid-cols-2 pt-8 text-center text-xs">
                  <div>
                    <p className="text-[#8A8D93]">Mengetahui,</p>
                    <p className="font-bold text-[#3A3541]">Kepala Sekolah SMP Sekolah-Q</p>
                    <div className="h-16"></div>
                    <p className="font-bold underline text-[#3A3541]">Drs. H. Miftahul Huda, M.M.</p>
                    <p className="text-[10px] text-[#8A8D93]">NIP. 19740512 199903 1 004</p>
                  </div>
                  <div>
                    <p className="text-[#8A8D93]">Gresik, 25 Oktober 2026</p>
                    <p className="font-bold text-[#3A3541]">Wali Kelas 8-A</p>
                    <div className="h-16"></div>
                    <p className="font-bold underline text-[#3A3541]">Budi Santoso, S.Si., M.Pd.</p>
                    <p className="text-[10px] text-[#8A8D93]">NIP. 19820715 200801 1 012</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* GURU MAPEL TAB 1: DASHBOARD GURU */}
          {/* ============================================================== */}
          {activeTab === 'guru-dashboard' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Guru Hero */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#8C57FF] to-[#16B1FF] p-6 sm:p-8 text-white shadow-[0_4px_20px_rgba(140,87,255,0.25)]">
                <div className="relative z-10 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Mode Pengampu Mata Pelajaran: Ilmu Pengetahuan Alam (IPA)</span>
                  </div>
                  <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                    Dashboard KBM Guru — Budi Santoso, M.Pd.
                  </h1>
                  <p className="text-xs sm:text-sm text-white/90 max-w-2xl leading-relaxed">
                    Kelola sesi tatap muka laboratorium, catat presensi setiap jam pelajaran (KBM), dan tinjau riwayat kehadiran siswa di kelas yang Anda ajar.
                  </p>
                </div>
              </div>

              {/* Guru KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#E7E7E9] shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#8A8D93]">Jam Mengajar Mingguan</div>
                    <div className="text-2xl font-bold text-[#8C57FF]">8 Jam</div>
                    <div className="text-[10px] text-[#8A8D93]">2 Rombel (8-A & 8-B)</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#8C57FF]/12 flex items-center justify-center text-[#8C57FF]">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E7E7E9] shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#8A8D93]">Sesi Presensi Selesai</div>
                    <div className="text-2xl font-bold text-[#56CA00]">
                      {budiSessions.filter(s => s.status === 'Sudah Disimpan').length}
                    </div>
                    <div className="text-[10px] text-[#56CA00]">Sudah disimpan ke sistem</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#56CA00]/12 flex items-center justify-center text-[#56CA00]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E7E7E9] shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#8A8D93]">Sesi Belum Diisi</div>
                    <div className="text-2xl font-bold text-[#FFB400]">
                      {budiSessions.filter(s => s.status === 'Belum Diisi').length}
                    </div>
                    <div className="text-[10px] text-[#8A8D93]">Perlu input kehadiran</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#FFB400]/12 flex items-center justify-center text-[#FFB400]">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E7E7E9] shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#8A8D93]">Kehadiran Rata-rata</div>
                    <div className="text-2xl font-bold text-[#16B1FF]">91.7%</div>
                    <div className="text-[10px] text-[#56CA00] flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" /> Sangat Baik
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#16B1FF]/12 flex items-center justify-center text-[#16B1FF]">
                    <Percent className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Sessions */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-7 rounded-xl bg-white border border-[#E7E7E9] shadow-sm p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
                    <div>
                      <h3 className="font-bold text-[#3A3541] text-base">Sesi Presensi Mengajar Hari Ini</h3>
                      <p className="text-xs text-[#8A8D93]">Jadwal KBM yang memerlukan penginputan presensi</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('guru-presensi-mapel')}
                      className="px-3 py-1.5 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Input Presensi</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {budiSessions.map(sess => (
                      <div key={sess.id} className="p-3.5 rounded-xl bg-[#F4F5FA] border border-[#E7E7E9] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center border shadow-2xs ${
                            sess.status === 'Sudah Disimpan'
                              ? 'bg-[#56CA00]/10 border-[#56CA00]/30 text-[#46A200]'
                              : 'bg-[#FFB400]/10 border-[#FFB400]/30 text-[#B37F00]'
                          }`}>
                            <span className="text-[9px] font-bold uppercase">IPA</span>
                            <span className="text-xs font-bold">{sess.startTime}</span>
                          </div>
                          <div>
                            <div className="font-bold text-sm text-[#3A3541]">{sess.className}</div>
                            <div className="text-xs text-[#6B6774] flex items-center gap-2">
                              <span>{sess.date}</span>
                              <span>•</span>
                              <span>{sess.room}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            sess.status === 'Sudah Disimpan'
                              ? 'bg-[#56CA00]/10 text-[#46A200]'
                              : 'bg-[#FF4C51]/10 text-[#FF4C51]'
                          }`}>
                            {sess.status}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleOpenSessionInEditor(sess)}
                            className="p-1.5 rounded-lg bg-white border border-[#E7E7E9] hover:bg-[#F4F5FA] text-[#8C57FF] transition-colors"
                            title="Buka Presensi Sesi Ini"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-xl bg-white border border-[#E7E7E9] shadow-sm p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
                    <h3 className="font-bold text-[#3A3541] text-base">SK Penugasan Mengajar (KBM)</h3>
                    <span className="text-xs font-bold text-[#8C57FF]">{budiAssignments.length} Rombel</span>
                  </div>

                  <div className="space-y-3">
                    {budiAssignments.map(asg => (
                      <div key={asg.id} className="p-3.5 rounded-xl bg-[#F4F5FA] border border-[#E7E7E9] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#3A3541]">{asg.className}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#16B1FF]/10 text-[#0288D1]">
                            {asg.hoursPerWeek} Jam/Minggu
                          </span>
                        </div>
                        <p className="text-xs text-[#6B6774]">{asg.subjectName} ({asg.subjectCode})</p>
                        <div className="pt-2 flex justify-between items-center text-[11px] text-[#8A8D93]">
                          <span>Status: Aktif</span>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedMapelAssignmentId(asg.id);
                              setActiveTab('guru-presensi-mapel');
                            }}
                            className="font-semibold text-[#8C57FF] hover:underline flex items-center gap-1"
                          >
                            <span>Input Presensi</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* GURU MAPEL TAB 2: JADWAL MENGAJAR GURU */}
          {/* ============================================================== */}
          {activeTab === 'guru-jadwal' && (
            <div className="space-y-5 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#3A3541]">
                    Jadwal Mengajar Guru — Budi Santoso, S.Si., M.Pd.
                  </h2>
                  <p className="text-xs text-[#8A8D93]">
                    Daftar jam mengajar mata pelajaran IPA di seluruh rombel yang ditugaskan
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-lg bg-white hover:bg-[#F4F5FA] border border-[#E7E7E9] text-xs font-semibold text-[#3A3541] flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5 text-[#8C57FF]" />
                  <span>Cetak Jadwal Guru</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].map(day => {
                  const daySchedules = MOCK_SCHEDULES.filter(s => s.teacherId === 'guru-ipa' && s.day === day);
                  return (
                    <div key={day} className="rounded-xl bg-white border border-[#E7E7E9] shadow-sm overflow-hidden">
                      <div className="px-4 py-3 bg-[#F8FAFC] border-b border-[#E7E7E9] flex items-center justify-between">
                        <span className="font-bold text-xs text-[#3A3541]">{day}</span>
                        <span className="text-[10px] text-[#8A8D93]">{daySchedules.length} Sesi KBM</span>
                      </div>
                      <div className="p-3 space-y-2.5">
                        {daySchedules.length > 0 ? (
                          daySchedules.map(sch => (
                            <div key={sch.id} className="p-3 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9]/70 space-y-1.5">
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="font-bold text-[#3A3541]">{sch.className}</span>
                                <span className="text-[10px] font-semibold text-[#8C57FF]">{sch.timeStart} - {sch.timeEnd}</span>
                              </div>
                              <div className="text-[10px] text-[#8A8D93] flex items-center justify-between">
                                <span>{sch.subjectName}</span>
                                <span className="font-medium text-[#6B6774]">{sch.room}</span>
                              </div>
                              <div className="pt-1 border-t border-[#E7E7E9]/50 flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const asg = budiAssignments.find(a => a.classId === sch.classId);
                                    if (asg) setSelectedMapelAssignmentId(asg.id);
                                    setMapelPeriod(`${sch.timeStart} - ${sch.timeEnd}`);
                                    setMapelRoom(sch.room);
                                    setActiveTab('guru-presensi-mapel');
                                    triggerToast(`Siap mengisi presensi untuk ${sch.className}`);
                                  }}
                                  className="text-[10px] font-bold text-[#16B1FF] hover:underline flex items-center gap-1"
                                >
                                  <span>Catat Presensi</span>
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="py-6 text-center text-xs text-[#A8A8A8] italic">Tidak ada jam mengajar</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* FEATURE B: GURU MAPEL TAB 3 - PRESENSI MATA PELAJARAN */}
          {/* ============================================================== */}
          {activeTab === 'guru-presensi-mapel' && (
            <div className="space-y-5 max-w-7xl mx-auto">
              
              {/* Top Navigation Bar: Date & Quick Day Switcher */}
              <div className="p-4 rounded-2xl bg-white border border-[#E7E7E9] shadow-sm flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#8C57FF]/10 text-[#8C57FF] flex items-center justify-center shrink-0">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#3A3541] flex items-center gap-2">
                      <span>Presensi Sesi Pembelajaran (KBM)</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#8C57FF]/15 text-[#8C57FF] border border-[#8C57FF]/30">
                        Jadwal Otomatis Admin Pusat
                      </span>
                    </h2>
                    <p className="text-xs text-[#8A8D93]">
                      Jadwal mengajar ditarik langsung dari Master Timetable yang telah diatur oleh Admin Sekolah
                    </p>
                  </div>
                </div>

                {/* Date Picker & Quick Days */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center bg-[#F4F5FA] border border-[#E7E7E9] rounded-xl px-2.5 py-1 text-xs">
                    <span className="text-[#8A8D93] font-bold text-[10px] uppercase mr-2">Pilih Tanggal:</span>
                    <input
                      type="date"
                      value={mapelDate}
                      onChange={(e) => handleMapelDateChange(e.target.value)}
                      className="bg-transparent text-[#3A3541] font-bold focus:outline-none text-xs"
                    />
                    <span className="ml-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#8C57FF] text-white">
                      Hari {activeDayName}
                    </span>
                  </div>

                  {/* Quick Day Switchers for testing/navigating schedule */}
                  <div className="flex items-center gap-1 bg-[#F4F5FA] p-1 rounded-xl border border-[#E7E7E9] text-xs">
                    <span className="text-[10px] font-bold uppercase text-[#8A8D93] px-1.5">Hari:</span>
                    {(['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'] as const).map(day => {
                      const isActive = activeDayName === day;
                      const dayCount = budiOfficialSchedules.filter(s => s.day === day).length;
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => handleSelectDay(day)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                            isActive
                              ? 'bg-[#8C57FF] text-white shadow-xs'
                              : 'bg-white hover:bg-gray-100 text-[#3A3541]'
                          }`}
                          title={`Cek jadwal hari ${day} (${dayCount} sesi KBM)`}
                        >
                          <span>{day}</span>
                          {dayCount > 0 ? (
                            <span className={`text-[9px] px-1 py-0.2 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-[#8C57FF]/10 text-[#8C57FF]'}`}>
                              {dayCount}
                            </span>
                          ) : (
                            <span className="text-[9px] text-[#8A8D93]">•</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ============================================================== */}
              {/* KONDISI 1: JIKA HARI INI TIDAK ADA JADWAL MENGAJAR */}
              {/* ============================================================== */}
              {schedulesForSelectedDay.length === 0 ? (
                <div className="p-8 sm:p-12 rounded-2xl bg-white border border-[#E7E7E9] shadow-sm text-center max-w-2xl mx-auto my-6 space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-[#8C57FF]/10 text-[#8C57FF] flex items-center justify-center mx-auto shadow-inner">
                    <CalendarX className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#3A3541]">
                      Tidak Ada Jadwal Mengajar Hari Ini
                    </h3>
                    <p className="text-sm text-[#8A8D93] max-w-md mx-auto leading-relaxed">
                      Berdasarkan master jadwal yang telah diatur oleh <strong className="text-[#3A3541]">Admin Pusat</strong>, Anda tidak memiliki sesi kegiatan belajar mengajar (KBM) pada hari <strong className="text-[#8C57FF]">Hari {activeDayName}, {mapelDate}</strong>.
                    </p>
                  </div>

                  {/* Summary of days with official schedule */}
                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E7E7E9] text-left max-w-lg mx-auto space-y-3">
                    <div className="text-xs font-bold text-[#3A3541] flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="w-4 h-4 text-[#8C57FF]" />
                        <span>Jadwal Mengajar Anda di Hari Lain (Admin Timetable):</span>
                      </span>
                      <span className="text-[10px] text-[#8C57FF] font-semibold">Klik Hari untuk Buka</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => handleSelectDay('Selasa')}
                        className="p-2.5 rounded-lg bg-white hover:bg-[#8C57FF]/5 border border-[#E7E7E9] hover:border-[#8C57FF] text-left transition-all group"
                      >
                        <div className="font-bold text-[#3A3541] group-hover:text-[#8C57FF] flex items-center justify-between">
                          <span>Selasa (2 Sesi KBM)</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-[11px] text-[#8A8D93] mt-0.5">
                          07:30 (8-A Lab IPA) & 10:00 (8-B)
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelectDay('Rabu')}
                        className="p-2.5 rounded-lg bg-white hover:bg-[#8C57FF]/5 border border-[#E7E7E9] hover:border-[#8C57FF] text-left transition-all group"
                      >
                        <div className="font-bold text-[#3A3541] group-hover:text-[#8C57FF] flex items-center justify-between">
                          <span>Rabu (1 Sesi KBM)</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-[11px] text-[#8A8D93] mt-0.5">
                          09:15 - 10:45 • Kelas 8-B (Lab Fisika)
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelectDay('Kamis')}
                        className="p-2.5 rounded-lg bg-white hover:bg-[#8C57FF]/5 border border-[#E7E7E9] hover:border-[#8C57FF] text-left transition-all group"
                      >
                        <div className="font-bold text-[#3A3541] group-hover:text-[#8C57FF] flex items-center justify-between">
                          <span>Kamis (1 Sesi KBM)</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-[11px] text-[#8A8D93] mt-0.5">
                          07:30 - 09:00 • Kelas 8-B (Lab Fisika)
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelectDay('Jumat')}
                        className="p-2.5 rounded-lg bg-white hover:bg-[#8C57FF]/5 border border-[#E7E7E9] hover:border-[#8C57FF] text-left transition-all group"
                      >
                        <div className="font-bold text-[#3A3541] group-hover:text-[#8C57FF] flex items-center justify-between">
                          <span>Jumat (1 Sesi KBM)</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-[11px] text-[#8A8D93] mt-0.5">
                          07:30 - 09:00 • Kelas 8-A (Lab Biologi)
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('guru-jadwal')}
                      className="px-4 py-2 rounded-xl bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
                    >
                      <CalendarDays className="w-4 h-4" />
                      <span>Lihat Jadwal Mengajar Mingguan</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* ============================================================== */
                /* KONDISI 2: JIKA HARI INI ADA JADWAL MENGAJAR */
                /* ============================================================== */
                <div className="space-y-5">
                  {/* Session Selector Cards: Pilihan Jadwal Apa dan di Jam Berapa */}
                  <div className="p-5 rounded-2xl bg-white border border-[#E7E7E9] shadow-sm space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#F4F5FA]">
                      <div>
                        <h3 className="text-sm font-bold text-[#3A3541] flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#8C57FF]" />
                          <span>Pilihan Sesi Mengajar Hari Ini — Hari {activeDayName} ({schedulesForSelectedDay.length} Sesi Terdaftar)</span>
                        </h3>
                        <p className="text-xs text-[#8A8D93]">
                          Klik pada sesi yang sedang Anda ajar untuk langsung membuka formulir presensi siswa
                        </p>
                      </div>

                      {/* Duplicate Prevention Status Badge for selected session */}
                      {existingSession ? (
                        <div className="px-3 py-1 rounded-full text-xs font-semibold bg-[#56CA00]/10 text-[#46A200] border border-[#56CA00]/30 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Sesi Ini: Sudah Disimpan Sebelumnya (Mode Edit)</span>
                        </div>
                      ) : (
                        <div className="px-3 py-1 rounded-full text-xs font-semibold bg-[#16B1FF]/10 text-[#0288D1] border border-[#16B1FF]/30 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Sesi Ini: Baru (Belum Disimpan)</span>
                        </div>
                      )}
                    </div>

                    {/* Interactive Session Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                      {schedulesForSelectedDay.map((sched, sIdx) => {
                        const isCurrentActive = activeSchedule?.id === sched.id;
                        // Check if session has saved records in state
                        const sessionSaved = subjectSessionsList.find(s => 
                          s.classId === sched.classId && 
                          s.date === mapelDate && 
                          s.startTime === sched.timeStart
                        );

                        return (
                          <div
                            key={sched.id}
                            onClick={() => setSelectedScheduleId(sched.id)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all relative ${
                              isCurrentActive
                                ? 'bg-[#8C57FF]/5 border-[#8C57FF] shadow-md ring-2 ring-[#8C57FF]/20'
                                : 'bg-white hover:bg-gray-50 border-[#E7E7E9] hover:border-gray-300 shadow-xs'
                            }`}
                          >
                            {/* Active indicator badge */}
                            <div className="flex items-center justify-between mb-2">
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#8C57FF] text-white flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>Jam {sched.timeStart} - {sched.timeEnd}</span>
                              </span>

                              {sessionSaved ? (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#56CA00]/15 text-[#46A200] border border-[#56CA00]/30 flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Sudah Disimpan</span>
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#16B1FF]/15 text-[#0288D1] border border-[#16B1FF]/30 flex items-center gap-1">
                                  <Sparkles className="w-3 h-3" />
                                  <span>Belum Diisi</span>
                                </span>
                              )}
                            </div>

                            <div className="font-bold text-sm text-[#3A3541] mb-1">
                              {sched.className}
                            </div>
                            <div className="text-xs text-[#8C57FF] font-semibold mb-2">
                              {sched.subjectName}
                            </div>

                            <div className="flex items-center justify-between text-xs text-[#8A8D93] pt-2 border-t border-[#E7E7E9]">
                              <span className="flex items-center gap-1">
                                <span>📍 Ruang:</span>
                                <strong className="text-[#3A3541]">{sched.room}</strong>
                              </span>

                              {isCurrentActive ? (
                                <span className="font-bold text-[#8C57FF] text-xs flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Sedang Dibuka</span>
                                </span>
                              ) : (
                                <span className="text-[#8C57FF] font-semibold text-xs hover:underline">
                                  Pilih Sesi Ini →
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Active Selected Session Strip */}
                    {activeSchedule && (
                      <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E7E7E9] flex flex-wrap items-center justify-between text-xs gap-3 mt-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-bold text-[#3A3541] flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-[#56CA00]" />
                            <span>Sesi Aktif:</span>
                          </span>
                          <span>Kelas: <strong className="text-[#3A3541]">{activeSchedule.className}</strong></span>
                          <span>•</span>
                          <span>Mata Pelajaran: <strong className="text-[#8C57FF]">{activeSchedule.subjectName}</strong></span>
                          <span>•</span>
                          <span>Waktu: <strong className="text-[#3A3541]">{activeSchedule.timeStart} - {activeSchedule.timeEnd}</strong></span>
                          <span>•</span>
                          <span>Ruangan: <strong className="text-[#3A3541]">{activeSchedule.room}</strong></span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleMarkAllMapelPresent}
                            className="px-3 py-1.5 rounded-lg bg-[#56CA00] hover:bg-[#46A200] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Tandai Semua Hadir</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleSaveMapelAttendance}
                            className="px-4 py-1.5 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Simpan Presensi Sesi Ini</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

              {/* Mapel Summary KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-7 gap-3">
                <div className="p-3 rounded-xl bg-white border border-[#E7E7E9] shadow-xs">
                  <div className="text-[10px] text-[#8A8D93] uppercase font-bold">Total Siswa</div>
                  <div className="text-xl font-bold text-[#3A3541] mt-0.5">{mapelStats.total}</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#E7E7E9] shadow-xs">
                  <div className="text-[10px] text-[#56CA00] uppercase font-bold">Hadir</div>
                  <div className="text-xl font-bold text-[#56CA00] mt-0.5">{mapelStats.present}</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#E7E7E9] shadow-xs">
                  <div className="text-[10px] text-[#8C57FF] uppercase font-bold">Terlambat</div>
                  <div className="text-xl font-bold text-[#8C57FF] mt-0.5">{mapelStats.late}</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#E7E7E9] shadow-xs">
                  <div className="text-[10px] text-[#16B1FF] uppercase font-bold">Izin</div>
                  <div className="text-xl font-bold text-[#16B1FF] mt-0.5">{mapelStats.excused}</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#E7E7E9] shadow-xs">
                  <div className="text-[10px] text-[#FFB400] uppercase font-bold">Sakit</div>
                  <div className="text-xl font-bold text-[#FFB400] mt-0.5">{mapelStats.sick}</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#E7E7E9] shadow-xs">
                  <div className="text-[10px] text-[#FF4C51] uppercase font-bold">Alpa</div>
                  <div className="text-xl font-bold text-[#FF4C51] mt-0.5">{mapelStats.absent}</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#E7E7E9] shadow-xs">
                  <div className="text-[10px] text-[#0288D1] uppercase font-bold">Kehadiran</div>
                  <div className="text-xl font-bold text-[#0288D1] mt-0.5">{mapelStats.pct}%</div>
                </div>
              </div>

              {/* Student Roster Table for Subject Attendance */}
              <div className="rounded-xl bg-white border border-[#E7E7E9] shadow-sm overflow-hidden">
                <div className="p-4 border-b border-[#F4F5FA] flex justify-between items-center">
                  <h3 className="font-bold text-sm text-[#3A3541] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#8C57FF]" />
                    <span>Roster Kehadiran Siswa — {activeAssignment.className} ({mapelDate})</span>
                  </h3>
                  <span className="text-xs text-[#8A8D93]">
                    {mapelStats.present} Hadir, {mapelStats.late} Terlambat
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAFC] text-[#6B6774] font-semibold border-b border-[#E7E7E9]">
                      <tr>
                        <th className="py-3 px-4">No</th>
                        <th className="py-3 px-4">Nama Siswa</th>
                        <th className="py-3 px-4">NISN</th>
                        <th className="py-3 px-4 text-center">Set Status Kehadiran KBM</th>
                        <th className="py-3 px-4">Catatan Perkembangan Sesi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7E7E9] text-[#3A3541]">
                      {activeMapelStudents.map((s, idx) => {
                        const currentRecord = tempMapelRecords[s.id] || { status: 'Hadir', notes: '' };
                        return (
                          <tr key={s.id} className="hover:bg-[#F4F5FA] transition-colors">
                            <td className="py-3 px-4 text-[#8A8D93]">{idx + 1}</td>
                            <td className="py-3 px-4 font-semibold">{s.name}</td>
                            <td className="py-3 px-4 font-mono text-xs text-[#6B6774]">{s.nisn}</td>
                            
                            {/* Status Buttons: H, T, I, S, A */}
                            <td className="py-3 px-4">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleSetMapelStatus(s.id, 'Hadir', s.name)}
                                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                                    currentRecord.status === 'Hadir'
                                      ? 'bg-[#56CA00] text-white shadow-xs'
                                      : 'bg-[#56CA00]/10 text-[#46A200] hover:bg-[#56CA00]/20'
                                  }`}
                                  title="Hadir tepat waktu"
                                >
                                  H
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSetMapelStatus(s.id, 'Terlambat', s.name)}
                                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                                    currentRecord.status === 'Terlambat'
                                      ? 'bg-[#8C57FF] text-white shadow-xs'
                                      : 'bg-[#8C57FF]/10 text-[#8C57FF] hover:bg-[#8C57FF]/20'
                                  }`}
                                  title="Terlambat masuk kelas"
                                >
                                  T
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSetMapelStatus(s.id, 'Izin', s.name)}
                                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                                    currentRecord.status === 'Izin'
                                      ? 'bg-[#16B1FF] text-white shadow-xs'
                                      : 'bg-[#16B1FF]/10 text-[#0288D1] hover:bg-[#16B1FF]/20'
                                  }`}
                                  title="Izin keluar / dispensasi"
                                >
                                  I
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSetMapelStatus(s.id, 'Sakit', s.name)}
                                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                                    currentRecord.status === 'Sakit'
                                      ? 'bg-[#FFB400] text-white shadow-xs'
                                      : 'bg-[#FFB400]/10 text-[#B37F00] hover:bg-[#FFB400]/20'
                                  }`}
                                  title="Sakit di UKS"
                                >
                                  S
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSetMapelStatus(s.id, 'Alpa', s.name)}
                                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                                    currentRecord.status === 'Alpa'
                                      ? 'bg-[#FF4C51] text-white shadow-xs'
                                      : 'bg-[#FF4C51]/10 text-[#FF4C51] hover:bg-[#FF4C51]/20'
                                  }`}
                                  title="Tanpa keterangan di jam pelajaran"
                                >
                                  A
                                </button>
                              </div>
                            </td>

                            <td className="py-3 px-4">
                              <input
                                type="text"
                                value={currentRecord.notes}
                                onChange={(e) => handleUpdateMapelNote(s.id, e.target.value)}
                                placeholder="Catatan keaktifan / alasan terlambat..."
                                className="w-full min-w-[160px] max-w-[240px] px-2.5 py-1 text-xs rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] placeholder:text-[#A8A8A8] focus:bg-white focus:border-[#8C57FF] focus:outline-none transition-all"
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

          {/* ============================================================== */}
          {/* FEATURE C: GURU MAPEL TAB 4 - RIWAYAT PRESENSI GURU */}
          {/* ============================================================== */}
          {activeTab === 'guru-riwayat' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              
              {/* Header Riwayat */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#E7E7E9] shadow-sm">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#3A3541] flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#8C57FF]" />
                    <span>Riwayat Presensi Mengajar — Guru IPA</span>
                  </h2>
                  <p className="text-xs text-[#8A8D93] mt-0.5">
                    Daftar seluruh sesi presensi KBM yang telah dicatat atau dijadwalkan untuk Budi Santoso, M.Pd.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('guru-presensi-mapel')}
                  className="px-4 py-2.5 rounded-xl bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Input Sesi Baru</span>
                </button>
              </div>

              {/* Filters */}
              <div className="p-4 rounded-xl bg-white border border-[#E7E7E9] shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-3">
                  <div>
                    <label className="text-[10px] text-[#8A8D93] uppercase font-bold block mb-1">Filter Kelas:</label>
                    <select
                      value={historyClassFilter}
                      onChange={(e) => setHistoryClassFilter(e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] font-semibold focus:bg-white focus:outline-none focus:border-[#8C57FF]"
                    >
                      <option value="Semua">Semua Kelas</option>
                      <option value="KLS-8A">Kelas 8-A (Al-Khawarizmi)</option>
                      <option value="KLS-8B">Kelas 8-B (Jabir Hayyan)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-[#8A8D93] uppercase font-bold block mb-1">Status Pengisian:</label>
                    <select
                      value={historyStatusFilter}
                      onChange={(e) => setHistoryStatusFilter(e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] font-semibold focus:bg-white focus:outline-none focus:border-[#8C57FF]"
                    >
                      <option value="Semua">Semua Status</option>
                      <option value="Sudah Disimpan">Sudah Disimpan</option>
                      <option value="Belum Diisi">Belum Diisi</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-[#8A8D93] uppercase font-bold block mb-1">Cari Sesi:</label>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-[#8A8D93] absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Cari tanggal / kelas..."
                      value={historySearch}
                      onChange={(e) => setHistorySearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-xs text-[#3A3541] focus:bg-white focus:outline-none focus:border-[#8C57FF] w-48"
                    />
                  </div>
                </div>
              </div>

              {/* Sessions Table */}
              <div className="rounded-xl bg-white border border-[#E7E7E9] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAFC] text-[#6B6774] font-semibold border-b border-[#E7E7E9]">
                      <tr>
                        <th className="py-3 px-4">Tanggal & Sesi</th>
                        <th className="py-3 px-4">Kelas Rombel</th>
                        <th className="py-3 px-4">Ruangan</th>
                        <th className="py-3 px-4 text-center">Kehadiran Siswa</th>
                        <th className="py-3 px-4 text-center">Persentase</th>
                        <th className="py-3 px-4 text-center">Status</th>
                        <th className="py-3 px-4 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7E7E9] text-[#3A3541]">
                      {filteredHistorySessions.length > 0 ? (
                        filteredHistorySessions.map((sess) => (
                          <tr key={sess.id} className="hover:bg-[#F4F5FA] transition-colors">
                            <td className="py-3 px-4 font-mono font-medium text-[#6B6774]">
                              <div>{sess.date}</div>
                              <div className="text-[10px] text-[#8A8D93]">{sess.lessonPeriod} ({sess.startTime} - {sess.endTime})</div>
                            </td>
                            <td className="py-3 px-4 font-bold text-[#3A3541]">{sess.className}</td>
                            <td className="py-3 px-4 text-[#6B6774]">{sess.room}</td>
                            <td className="py-3 px-4 text-center">
                              {sess.status === 'Sudah Disimpan' ? (
                                <span className="font-semibold text-xs">
                                  <span className="text-[#56CA00]">{sess.presentCount} H</span> •{' '}
                                  <span className="text-[#8C57FF]">{sess.lateCount} T</span> •{' '}
                                  <span className="text-[#FFB400]">{sess.sickCount + sess.excusedCount} S/I</span>
                                </span>
                              ) : (
                                <span className="text-[#A8A8A8] italic">Belum Diisi</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-center font-bold">
                              {sess.status === 'Sudah Disimpan' ? (
                                <span className={sess.attendancePercentage >= 85 ? 'text-[#56CA00]' : 'text-[#FFB400]'}>
                                  {sess.attendancePercentage}%
                                </span>
                              ) : '-'}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                sess.status === 'Sudah Disimpan' ? 'bg-[#56CA00]/10 text-[#46A200]' : 'bg-[#FF4C51]/10 text-[#FF4C51]'
                              }`}>
                                {sess.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <button
                                type="button"
                                onClick={() => handleOpenSessionInEditor(sess)}
                                className="px-2.5 py-1 rounded-md bg-[#8C57FF]/10 hover:bg-[#8C57FF]/20 text-[#8C57FF] text-xs font-semibold transition-colors flex items-center gap-1 mx-auto"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>Buka / Edit</span>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-xs text-[#8A8D93]">
                            Tidak ada riwayat sesi yang sesuai kriteria filter.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* GURU MAPEL TAB 5: REKAP PRESENSI MENGAJAR */}
          {/* ============================================================== */}
          {activeTab === 'guru-rekap' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#E7E7E9] shadow-sm">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#3A3541] flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-[#8C57FF]" />
                    <span>Rekapitulasi Beban Mengajar & Kehadiran Siswa</span>
                  </h2>
                  <p className="text-xs text-[#8A8D93] mt-0.5">
                    Laporan kompilasi keaktifan mengajar dan presensi peserta didik di mata pelajaran IPA
                  </p>
                </div>
              </div>

              {/* Rombel Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {budiAssignments.map(asg => {
                  const asgSessions = budiSessions.filter(s => s.classId === asg.classId);
                  const completed = asgSessions.filter(s => s.status === 'Sudah Disimpan');
                  const avg = completed.length > 0
                    ? Math.round(completed.reduce((a, b) => a + b.attendancePercentage, 0) / completed.length)
                    : 90;

                  return (
                    <div key={asg.id} className="p-6 rounded-2xl bg-white border border-[#E7E7E9] shadow-sm space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
                        <div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#8C57FF]/10 text-[#8C57FF]">
                            {asg.hoursPerWeek} Jam / Minggu
                          </span>
                          <h3 className="text-base font-bold text-[#3A3541] mt-1">{asg.className}</h3>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-[#8A8D93]">Rata-rata Kehadiran</span>
                          <div className="text-xl font-bold text-[#56CA00]">{avg}%</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2.5 rounded-xl bg-[#F4F5FA]">
                          <span className="text-[10px] text-[#8A8D93]">Total Sesi</span>
                          <div className="text-sm font-bold text-[#3A3541] mt-0.5">{asgSessions.length} Sesi</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[#56CA00]/10 text-[#46A200]">
                          <span className="text-[10px]">Tersimpan</span>
                          <div className="text-sm font-bold mt-0.5">{completed.length} Sesi</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[#FF4C51]/10 text-[#FF4C51]">
                          <span className="text-[10px]">Pending</span>
                          <div className="text-sm font-bold mt-0.5">{asgSessions.length - completed.length} Sesi</div>
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedMapelAssignmentId(asg.id);
                            setActiveTab('guru-presensi-mapel');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                        >
                          <span>Input Presensi Kelas Ini</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </main>
      </div>

      {/* ============================================================== */}
      {/* MODAL 1: DETAIL PROFIL SISWA */}
      {/* ============================================================== */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
              <h3 className="text-base font-bold text-[#3A3541]">Detail Data Siswa Perwalian</h3>
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 relative shrink-0 border border-[#E7E7E9]">
                <Image src={selectedStudent.avatarUrl} alt={selectedStudent.name} fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#3A3541]">{selectedStudent.name}</h4>
                <p className="text-xs text-[#8A8D93]">NISN: {selectedStudent.nisn} • NIS: {selectedStudent.nis}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#16B1FF]/10 text-[#0288D1]">
                  Kelas 8-A (Al-Khawarizmi)
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs divide-y divide-[#F4F5FA]">
              <div className="pt-2 flex justify-between">
                <span className="text-[#8A8D93]">Tempat, Tgl Lahir:</span>
                <span className="font-semibold text-[#3A3541]">{selectedStudent.birthPlace}, {selectedStudent.birthDate}</span>
              </div>
              <div className="py-1 flex justify-between">
                <span className="text-[#8A8D93]">Asal Sekolah SD:</span>
                <span className="font-semibold text-[#3A3541]">{selectedStudent.previousSchool}</span>
              </div>
              <div className="py-1 flex justify-between">
                <span className="text-[#8A8D93]">Nama Orang Tua / Wali:</span>
                <span className="font-semibold text-[#3A3541]">{selectedStudent.parentName}</span>
              </div>
              <div className="py-1 flex justify-between items-center">
                <span className="text-[#8A8D93]">WhatsApp Wali Murid:</span>
                <a
                  href={`https://wa.me/62${selectedStudent.parentPhone.replace(/^0/, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#56CA00] hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>{selectedStudent.parentPhone}</span>
                </a>
              </div>
              <div className="py-1">
                <span className="text-[#8A8D93] block mb-0.5">Alamat Tempat Tinggal:</span>
                <span className="font-medium text-[#3A3541]">{selectedStudent.address}</span>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-[#F4F5FA]">
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#3A3541] text-xs font-semibold transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: TULIS CATATAN WALI KELAS */}
      {/* ============================================================== */}
      {editingGradeNote && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
              <h3 className="text-base font-bold text-[#3A3541] flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#8C57FF]" />
                <span>Catatan Perkembangan Siswa</span>
              </h3>
              <button
                type="button"
                onClick={() => setEditingGradeNote(null)}
                className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-xs text-[#8A8D93] font-medium">
                Tuliskan motivasi, catatan akhlak, atau saran penguatan belajar untuk siswa:
              </label>
              <textarea
                rows={4}
                value={editingGradeNote.note}
                onChange={(e) => setEditingGradeNote({ ...editingGradeNote, note: e.target.value })}
                placeholder="Contoh: Sangat aktif dalam praktikum sains dan diskusi kelas..."
                className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] text-xs focus:bg-white focus:outline-none focus:border-[#8C57FF]"
              ></textarea>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#F4F5FA]">
              <button
                type="button"
                onClick={() => setEditingGradeNote(null)}
                className="px-4 py-2 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774] text-xs font-semibold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleSaveGradeNote(editingGradeNote.id, editingGradeNote.note)}
                className="px-4 py-2 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-bold shadow-sm"
              >
                Simpan Catatan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3: INPUT KETERANGAN / ALASAN PRESENSI HARIAN */}
      {/* ============================================================== */}
      {editingDailyNote && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
              <div>
                <h3 className="text-base font-bold text-[#3A3541] flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#16B1FF]" />
                  <span>Keterangan Presensi Harian Siswa</span>
                </h3>
                <p className="text-xs text-[#8A8D93] mt-0.5">
                  {editingDailyNote.studentName} — Status: <strong className="text-[#3A3541]">{editingDailyNote.currentStatus}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingDailyNote(null)}
                className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick reason template chips */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-[#8A8D93] uppercase">Pilihan Cepat Template Alasan:</label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Demam / Panas',
                  'Surat Dokter Terlampir',
                  'Izin Acara Keluarga',
                  'Dispensasi Lomba Sekolah',
                  'Keperluan Mendesak',
                  'Tanpa Keterangan'
                ].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setEditingDailyNote({ ...editingDailyNote, note: chip })}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#F4F5FA] hover:bg-[#16B1FF]/10 hover:text-[#0288D1] border border-[#E7E7E9] text-[#6B6774] transition-colors"
                  >
                    + {chip}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs text-[#8A8D93] font-medium">
                Tulis / Edit Keterangan Alasan:
              </label>
              <textarea
                rows={3}
                value={editingDailyNote.note}
                onChange={(e) => setEditingDailyNote({ ...editingDailyNote, note: e.target.value })}
                placeholder="Contoh: Izin tidak masuk karena demam tinggi, surat dokter terlampir..."
                className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] text-xs focus:bg-white focus:outline-none focus:border-[#16B1FF]"
              ></textarea>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#F4F5FA]">
              <button
                type="button"
                onClick={() => setEditingDailyNote(null)}
                className="px-4 py-2 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774] text-xs font-semibold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  handleUpdateDailyNote(
                    editingDailyNote.studentId,
                    editingDailyNote.note,
                    editingDailyNote.studentName
                  );
                  triggerToast(`Keterangan ${editingDailyNote.studentName.split(' ')[0]} disimpan!`);
                  setEditingDailyNote(null);
                }}
                className="px-4 py-2 rounded-lg bg-[#16B1FF] hover:bg-[#0288D1] text-white text-xs font-bold shadow-sm"
              >
                Simpan Keterangan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 4: ATUR STRUKTUR PENGURUS KELAS */}
      {/* ============================================================== */}
      {showEditOfficersModal && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl max-h-[90vh] flex flex-col rounded-2xl bg-white border border-[#E7E7E9] shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-[#F4F5FA] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#3A3541] flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#8C57FF]" />
                  <span>Kelola Pengurus Kelas {currentClass.name}</span>
                </h3>
                <p className="text-xs text-[#8A8D93] mt-0.5">
                  Wali Kelas dapat menambah jabatan baru, mengubah nama jabatan, atau menghapusnya
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowEditOfficersModal(false)}
                className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-5 text-xs">
              
              {/* Existing Officers List */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-[#8A8D93] uppercase tracking-wider">
                    Daftar Jabatan Saat Ini ({tempOfficers.length})
                  </label>
                  <span className="text-[10px] text-[#8A8D93]">Bisa edit nama jabatan & pilih siswa</span>
                </div>

                <div className="space-y-2">
                  {tempOfficers.map((officer) => (
                    <div
                      key={officer.id}
                      className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E7E7E9] flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                    >
                      {/* Officer Role Name Input */}
                      <div className="sm:w-1/3">
                        <label className="text-[9px] text-[#8A8D93] uppercase font-bold block mb-0.5 sm:hidden">
                          Nama Jabatan:
                        </label>
                        <input
                          type="text"
                          value={officer.role}
                          onChange={(e) => {
                            const val = e.target.value;
                            setTempOfficers(prev => prev.map(o => o.id === officer.id ? { ...o, role: val } : o));
                          }}
                          placeholder="Nama Jabatan..."
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#E7E7E9] text-xs font-semibold text-[#3A3541] focus:outline-none focus:border-[#8C57FF]"
                        />
                      </div>

                      {/* Student Select Dropdown */}
                      <div className="flex-1">
                        <label className="text-[9px] text-[#8A8D93] uppercase font-bold block mb-0.5 sm:hidden">
                          Siswa yang Menjabat:
                        </label>
                        <select
                          value={officer.studentId}
                          onChange={(e) => {
                            const val = e.target.value;
                            setTempOfficers(prev => prev.map(o => o.id === officer.id ? { ...o, studentId: val } : o));
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#E7E7E9] text-xs text-[#3A3541] focus:outline-none focus:border-[#8C57FF]"
                        >
                          {classStudents.map(s => (
                            <option key={s.id} value={s.id}>{s.name} (NIS: {s.nis})</option>
                          ))}
                        </select>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveOfficer(officer.id, officer.role)}
                        title="Hapus jabatan ini"
                        className="p-1.5 rounded-lg text-[#FF4C51] hover:bg-[#FF4C51]/10 transition-colors self-end sm:self-center shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box to Add New Position */}
              <div className="p-4 rounded-xl bg-[#8C57FF]/5 border border-[#8C57FF]/20 space-y-3">
                <div className="flex items-center gap-2 font-bold text-xs text-[#8C57FF]">
                  <Plus className="w-4 h-4" />
                  <span>Tambah Jabatan / Seksi Baru</span>
                </div>

                {/* Suggestions Chips */}
                <div className="space-y-1">
                  <span className="text-[10px] text-[#8A8D93]">Pilihan Cepat:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Bendahara 2',
                      'Seksi Keamanan',
                      'Seksi Kebersihan',
                      'Seksi Kerohanian',
                      'Seksi Olahraga',
                      'Seksi Perlengkapan',
                      'Humas Kelas'
                    ].map(sug => (
                      <button
                        key={sug}
                        type="button"
                        onClick={() => setNewRoleInput(sug)}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white hover:bg-[#8C57FF]/10 text-[#6B6774] hover:text-[#8C57FF] border border-[#E7E7E9] transition-colors"
                      >
                        + {sug}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-1">
                  <div className="sm:col-span-5">
                    <input
                      type="text"
                      placeholder="Nama Jabatan Baru..."
                      value={newRoleInput}
                      onChange={(e) => setNewRoleInput(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#E7E7E9] text-xs text-[#3A3541] focus:outline-none focus:border-[#8C57FF]"
                    />
                  </div>
                  <div className="sm:col-span-5">
                    <select
                      value={newStudentInput}
                      onChange={(e) => setNewStudentInput(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#E7E7E9] text-xs text-[#3A3541] focus:outline-none focus:border-[#8C57FF]"
                    >
                      {classStudents.map(s => (
                        <option key={s.id} value={s.id}>{s.name} (NIS: {s.nis})</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="button"
                      onClick={handleAddCustomOfficer}
                      className="w-full py-1.5 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#F4F5FA] flex justify-between items-center bg-[#F8FAFC]">
              <span className="text-[11px] text-[#8A8D93]">
                Total {tempOfficers.length} jabatan akan disimpan
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditOfficersModal(false)}
                  className="px-4 py-2 rounded-lg bg-white hover:bg-slate-100 border border-[#E7E7E9] text-[#6B6774] text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setClassOfficers(tempOfficers);
                    setShowEditOfficersModal(false);
                    triggerToast(`Berhasil menyimpan ${tempOfficers.length} pengurus kelas!`);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-bold shadow-sm"
                >
                  Simpan Semua Pengurus
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
