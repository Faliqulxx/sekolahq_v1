'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoginView, { AuthenticatedUser } from '@/components/auth/LoginView';
import {
  LayoutDashboard,
  GraduationCap,
  Newspaper,
  Users,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  Bell,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Eye,
  Trash2,
  Edit3,
  Save,
  Download,
  ExternalLink,
  ShieldCheck,
  Award,
  ChevronRight,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X,
  Database,
  ArrowUpRight,
  Send,
  FileSpreadsheet,
  Check,
  RefreshCw,
  Sparkles,
  Upload,
  Camera,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  School,
  BookOpen,
  Layers,
  CalendarDays,
  Key,
  CalendarCheck,
  LogOut
} from 'lucide-react';
import { SCHOOL_INFO, TEACHERS, NEWS, GALLERY, TESTIMONIALS, Teacher, NewsItem, GalleryItem } from '@/data/schoolData';
import {
  AcademicYear,
  ClassRoom,
  Student,
  Subject,
  HomeroomAssignment,
  TeachingAssignment,
  ScheduleItem,
  UserAccount,
  DailyAttendanceRecord,
  SubjectAttendanceSession,
  SubjectAttendanceRecord,
  MOCK_ACADEMIC_YEARS,
  MOCK_CLASSES,
  MOCK_STUDENTS,
  MOCK_SUBJECTS,
  MOCK_HOMEROOM_ASSIGNMENTS,
  MOCK_TEACHING_ASSIGNMENTS,
  MOCK_SCHEDULES,
  MOCK_USERS,
  MOCK_DAILY_ATTENDANCE,
  MOCK_SUBJECT_ATTENDANCE_SESSIONS,
  MOCK_SUBJECT_ATTENDANCE_RECORDS
} from '@/data/academicData';

import AcademicDashboard from '@/components/admin/academic/AcademicDashboard';
import AcademicYearsSection from '@/components/admin/academic/AcademicYearsSection';
import AcademicStudentsSection from '@/components/admin/academic/AcademicStudentsSection';
import AcademicClassesSection from '@/components/admin/academic/AcademicClassesSection';
import AcademicSubjectsSection from '@/components/admin/academic/AcademicSubjectsSection';
import AcademicAssignmentsSection from '@/components/admin/academic/AcademicAssignmentsSection';
import AcademicSchedulesSection from '@/components/admin/academic/AcademicSchedulesSection';
import AcademicAccountsSection from '@/components/admin/academic/AcademicAccountsSection';
import AcademicAttendanceMonitoringSection from '@/components/admin/academic/AcademicAttendanceMonitoringSection';

// Types for Mock State
type ActiveTab = 
  // Existing 7 sections
  | 'dashboard' 
  | 'ppdb' 
  | 'berita' 
  | 'guru' 
  | 'galeri' 
  | 'pesan' 
  | 'settings'
  // New 8 Academic sections + Attendance Monitoring
  | 'academic-dashboard'
  | 'academic-years'
  | 'academic-students'
  | 'academic-classes'
  | 'academic-subjects'
  | 'academic-assignments'
  | 'academic-schedules'
  | 'academic-accounts'
  | 'academic-attendance-monitoring';

interface Applicant {
  id: string;
  name: string;
  nisn: string;
  schoolOrigin: string;
  track: 'Prestasi' | 'Zonasi' | 'Tahfidz' | 'Afirmasi';
  phone: string;
  status: 'Menunggu' | 'Terverifikasi' | 'Diterima' | 'Ditolak';
  date: string;
  averageScore: number;
}

interface MessageItem {
  id: string;
  sender: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

export default function AdminPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    try {
      const session = sessionStorage.getItem('sekolahq_auth_user');
      if (session) {
        const user = JSON.parse(session);
        if (user.roleCategory === 'Admin Pusat' || user.username === 'admin') {
          setCurrentUser(user);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAuthChecking(false);
    }
  }, []);

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('sekolahq_auth_user');
    } catch {}
    setCurrentUser(null);
  };

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Toggleable sidebar (desktop & mobile)
  
  // Collapsible category accordions (bisa disembunyikan dan ditampilkan)
  const [menuUtamaOpen, setMenuUtamaOpen] = useState(true);
  const [akademikOpen, setAkademikOpen] = useState(true);
  const [konfigurasiOpen, setKonfigurasiOpen] = useState(true);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [ppdbFilter, setPpdbFilter] = useState<string>('Semua');
  const [newsFilter, setNewsFilter] = useState<string>('Semua');

  // Modal States
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  // Form State for Adding Teacher
  const [newTeacher, setNewTeacher] = useState<{
    name: string;
    role: string;
    subject: string;
    education: string;
    category: Teacher['category'];
    imageUrl: string;
  }>({
    name: '',
    role: '',
    subject: '',
    education: '',
    category: 'MIPA & Teknologi',
    imageUrl: '/images/indo/teacher-tech.webp'
  });

  // Form State for Adding News
  const [newNews, setNewNews] = useState<{
    title: string;
    category: NewsItem['category'];
    excerpt: string;
    content: string;
    imageUrl: string;
  }>({
    title: '',
    category: 'Prestasi',
    excerpt: '',
    content: '',
    imageUrl: '/images/indo/hero-students.webp'
  });

  // Form State for Adding Photo
  const [newPhoto, setNewPhoto] = useState<{
    title: string;
    category: GalleryItem['category'];
    imageUrl: string;
  }>({
    title: '',
    category: 'Fasilitas',
    imageUrl: '/images/indo/classroom-lab.webp'
  });

  // Reusable File Upload to Data URL / Preview Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setter(reader.result as string);
        triggerToast('Foto berhasil dimuat!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Mock PPDB Applicants Data
  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: 'PPDB-001',
      name: 'Muhammad Rizky Ramadhan',
      nisn: '0098765432',
      schoolOrigin: 'SD Negeri 1 Ujungpangkah',
      track: 'Prestasi',
      phone: '081234567890',
      status: 'Terverifikasi',
      date: '24 Okt 2026',
      averageScore: 92.4
    },
    {
      id: 'PPDB-002',
      name: 'Aisyah Putri Nurhaliza',
      nisn: '0098765433',
      schoolOrigin: 'MI Ma\'arif NU Ujungpangkah',
      track: 'Tahfidz',
      phone: '082198765432',
      status: 'Diterima',
      date: '24 Okt 2026',
      averageScore: 89.8
    },
    {
      id: 'PPDB-003',
      name: 'Fauzan Akbar Pratama',
      nisn: '0098765434',
      schoolOrigin: 'SD Negeri 2 Sedagaran',
      track: 'Zonasi',
      phone: '085712345678',
      status: 'Menunggu',
      date: '25 Okt 2026',
      averageScore: 86.5
    },
    {
      id: 'PPDB-004',
      name: 'Nabila Azzahra Fitri',
      nisn: '0098765435',
      schoolOrigin: 'SD Islam Terpadu Gresik',
      track: 'Prestasi',
      phone: '081398761234',
      status: 'Terverifikasi',
      date: '25 Okt 2026',
      averageScore: 94.1
    },
    {
      id: 'PPDB-005',
      name: 'Bagas Aditya Wicaksono',
      nisn: '0098765436',
      schoolOrigin: 'SD Negeri Pangkahwetan',
      track: 'Afirmasi',
      phone: '087812349087',
      status: 'Menunggu',
      date: '25 Okt 2026',
      averageScore: 84.0
    }
  ]);

  // Mock News Data (derived from initial schoolData)
  const [newsList, setNewsList] = useState(NEWS);

  // Mock Teachers Data
  const [teachersList, setTeachersList] = useState(TEACHERS);

  // Mock Gallery Data
  const [galleryList, setGalleryList] = useState(GALLERY);

  // Mock Messages Data
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'MSG-01',
      sender: 'Bambang Sudibyo (Wali Murid)',
      email: 'bambang.s@gmail.com',
      phone: '081299887766',
      subject: 'Konfirmasi Tes Seleksi Tahfidz Gelombang 1',
      message: 'Selamat siang panitia PPDB Sekolah-Q, apakah tes seleksi tahfidz dilakukan secara offline di kampus atau virtual via video call? Terima kasih.',
      date: 'Hari ini, 09:30 WIB',
      isRead: false
    },
    {
      id: 'MSG-02',
      sender: 'Ibu Ratna Dewi',
      email: 'ratnadewi_gresik@yahoo.com',
      phone: '085611223344',
      subject: 'Jadwal Tur Kampus Akhir Pekan',
      message: 'Halo admin, kami berencana berkunjung ke kampus Sekolah-Q hari Sabtu besok untuk melihat fasilitas lab robotik. Apakah kantor sekretariat buka?',
      date: 'Kemarin, 14:15 WIB',
      isRead: true
    },
    {
      id: 'MSG-03',
      sender: 'Hasan Basri',
      email: 'hasan.b@outlook.com',
      phone: '082233445566',
      subject: 'Pertanyaan Program Beasiswa Tahfidz',
      message: 'Anak saya memiliki sertifikat juz 30 dan juz 1, apakah memenuhi syarat untuk beasiswa penuh di jalur tahfidz? Mohon arahannya.',
      date: '23 Okt 2026',
      isRead: true
    }
  ]);

  // Mock Settings State
  const [settingsData, setSettingsData] = useState({
    schoolName: SCHOOL_INFO.name,
    npsn: SCHOOL_INFO.npsn,
    akreditasi: SCHOOL_INFO.akreditasi,
    address: SCHOOL_INFO.address,
    phone: SCHOOL_INFO.phone,
    email: SCHOOL_INFO.email,
    announcementText: 'Pendaftaran Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027 Gelombang 1 Resmi Dibuka!',
    announcementActive: true,
    instagram: '@sekolahq.official',
    tiktok: '@sekolahq_id',
    youtube: 'Sekolah-Q Official',
    totalStudents: '780+',
    totalTeachers: '36',
    totalGraduates: '100%'
  });

  // Centralized Academic Management Mock State
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>(MOCK_ACADEMIC_YEARS);
  const [classes, setClasses] = useState<ClassRoom[]>(MOCK_CLASSES);
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [subjects, setSubjects] = useState<Subject[]>(MOCK_SUBJECTS);
  const [homeroomAssignments, setHomeroomAssignments] = useState<HomeroomAssignment[]>(MOCK_HOMEROOM_ASSIGNMENTS);
  const [teachingAssignments, setTeachingAssignments] = useState<TeachingAssignment[]>(MOCK_TEACHING_ASSIGNMENTS);
  const [schedules, setSchedules] = useState<ScheduleItem[]>(MOCK_SCHEDULES);
  const [academicUsers, setAcademicUsers] = useState<UserAccount[]>(MOCK_USERS);
  const [dailyAttendance, setDailyAttendance] = useState<DailyAttendanceRecord[]>(MOCK_DAILY_ATTENDANCE);
  const [subjectSessions, setSubjectSessions] = useState<SubjectAttendanceSession[]>(MOCK_SUBJECT_ATTENDANCE_SESSIONS);
  const [subjectRecords, setSubjectRecords] = useState<SubjectAttendanceRecord[]>(MOCK_SUBJECT_ATTENDANCE_RECORDS);

  const activeAcademicYear = academicYears.find(y => y.isActive) || academicYears[0];

  // Academic Action Handlers
  const handleSetActiveAcademicYear = (id: string) => {
    setAcademicYears(prev => prev.map(y => ({
      ...y,
      isActive: y.id === id,
      status: y.id === id ? 'Aktif' : y.status === 'Aktif' ? 'Arsip' : y.status
    })));
    const target = academicYears.find(y => y.id === id);
    triggerToast(`Tahun Ajaran aktif diubah ke: ${target?.name}`);
  };

  const handleAddAcademicYear = (newYear: AcademicYear) => {
    setAcademicYears(prev => [newYear, ...prev]);
  };

  const handleUpdateAcademicYear = (updated: AcademicYear) => {
    setAcademicYears(prev => prev.map(y => y.id === updated.id ? updated : y));
  };

  const handleAddStudent = (newStudent: Student) => {
    setStudents(prev => [newStudent, ...prev]);
    // Also update class count
    setClasses(prev => prev.map(c => c.id === newStudent.classId ? { ...c, studentCount: (c.studentCount || 0) + 1 } : c));
  };

  const handleUpdateStudent = (updated: Student) => {
    setStudents(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  const handleDeleteStudent = (id: string) => {
    const student = students.find(s => s.id === id);
    setStudents(prev => prev.filter(s => s.id !== id));
    if (student) {
      setClasses(prev => prev.map(c => c.id === student.classId ? { ...c, studentCount: Math.max(0, (c.studentCount || 1) - 1) } : c));
    }
  };

  const handleAddClass = (newClass: ClassRoom) => {
    setClasses(prev => [newClass, ...prev]);
  };

  const handleUpdateClass = (updated: ClassRoom) => {
    setClasses(prev => prev.map(c => c.id === updated.id ? updated : c));
    setHomeroomAssignments(prev => prev.map(h => h.classId === updated.id ? {
      ...h,
      teacherId: updated.homeroomTeacherId,
      teacherName: updated.homeroomTeacherName
    } : h));
  };

  const handleAddSubject = (newSubject: Subject) => {
    setSubjects(prev => [newSubject, ...prev]);
  };

  const handleUpdateSubject = (updated: Subject) => {
    setSubjects(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  const handleUpdateHomeroomAssignment = (classId: string, teacherId: string) => {
    const targetTeacher = teachersList.find(t => t.id === teacherId);
    setClasses(prev => prev.map(c => c.id === classId ? {
      ...c,
      homeroomTeacherId: teacherId,
      homeroomTeacherName: targetTeacher?.name || c.homeroomTeacherName
    } : c));
    setHomeroomAssignments(prev => {
      const exists = prev.find(h => h.classId === classId);
      if (exists) {
        return prev.map(h => h.classId === classId ? {
          ...h,
          teacherId,
          teacherName: targetTeacher?.name || h.teacherName
        } : h);
      } else {
        const targetClass = classes.find(c => c.id === classId);
        return [
          ...prev,
          {
            id: `HR-${Date.now()}`,
            teacherId,
            teacherName: targetTeacher?.name || 'Guru',
            teacherRole: targetTeacher?.role || 'Guru',
            classId,
            className: targetClass?.name || 'Kelas',
            academicYearId: activeAcademicYear.id,
            assignedDate: '2026-10-25',
            status: 'Aktif'
          }
        ];
      }
    });
  };

  const handleAddTeachingAssignment = (assignment: TeachingAssignment) => {
    setTeachingAssignments(prev => [assignment, ...prev]);
  };

  const handleDeleteTeachingAssignment = (id: string) => {
    setTeachingAssignments(prev => prev.filter(t => t.id !== id));
  };

  const handleAddSchedule = (schedule: ScheduleItem) => {
    setSchedules(prev => [schedule, ...prev]);
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
  };

  const handleAddAcademicUser = (user: UserAccount) => {
    setAcademicUsers(prev => [user, ...prev]);
  };

  const handleToggleUserStatus = (userId: string) => {
    setAcademicUsers(prev => prev.map(u => u.id === userId ? {
      ...u,
      status: u.status === 'Aktif' ? 'Nonaktif' : 'Aktif'
    } : u));
  };

  // Helper Toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Status badge styling helper (Materio MUI Chip Style)
  const getStatusBadge = (status: Applicant['status']) => {
    switch (status) {
      case 'Diterima':
        return 'bg-[#56CA00]/12 text-[#46A200] border border-[#56CA00]/30';
      case 'Terverifikasi':
        return 'bg-[#16B1FF]/12 text-[#0288D1] border border-[#16B1FF]/30';
      case 'Menunggu':
        return 'bg-[#FFB400]/12 text-[#B37F00] border border-[#FFB400]/30';
      case 'Ditolak':
        return 'bg-[#FF4C51]/12 text-[#FF4C51] border border-[#FF4C51]/30';
      default:
        return 'bg-[#8A8D93]/12 text-[#8A8D93] border border-[#8A8D93]/30';
    }
  };

  // Export CSV Handler
  const handleExportCSV = () => {
    const headers = 'ID,Nama Siswa,NISN,Asal Sekolah,Jalur,Rata-rata Rapor,No. HP,Status,Tanggal\n';
    const rows = applicants.map(a => 
      `"${a.id}","${a.name}","${a.nisn}","${a.schoolOrigin}","${a.track}",${a.averageScore},"${a.phone}","${a.status}","${a.date}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `PPDB_Sekolah-Q_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('File CSV pendaftar PPDB berhasil diunduh!');
  };

  // Update applicant status
  const handleUpdateStatus = (id: string, newStatus: Applicant['status']) => {
    setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    if (selectedApplicant && selectedApplicant.id === id) {
      setSelectedApplicant(prev => prev ? { ...prev, status: newStatus } : null);
    }
    triggerToast(`Status ${id} diubah menjadi "${newStatus}"`);
  };

  // Save New Teacher with uploaded or selected photo
  const handleSaveTeacher = () => {
    if (!newTeacher.name.trim()) {
      triggerToast('Mohon masukkan nama guru');
      return;
    }
    const created: Teacher = {
      id: `guru-${Date.now()}`,
      name: newTeacher.name,
      role: newTeacher.role || 'Guru Mata Pelajaran',
      subject: newTeacher.subject || 'Pengajar',
      education: newTeacher.education || 'S1 Kependidikan',
      category: newTeacher.category,
      quote: 'Mendidik dengan hati untuk masa depan generasi bangsa.',
      imageUrl: newTeacher.imageUrl
    };
    setTeachersList(prev => [created, ...prev]);
    setShowAddTeacherModal(false);
    setNewTeacher({
      name: '',
      role: '',
      subject: '',
      education: '',
      category: 'MIPA & Teknologi',
      imageUrl: '/images/indo/teacher-tech.webp'
    });
    triggerToast('Guru baru berhasil ditambahkan beserta fotonya!');
  };

  // Save New News with uploaded or selected cover
  const handleSaveNews = () => {
    if (!newNews.title.trim()) {
      triggerToast('Mohon masukkan judul berita');
      return;
    }
    const created: NewsItem = {
      id: `news-${Date.now()}`,
      slug: newNews.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: newNews.title,
      category: newNews.category,
      date: 'Hari ini',
      author: 'Humas Sekolah-Q',
      summary: newNews.excerpt || newNews.title,
      content: [newNews.content || newNews.excerpt || newNews.title],
      imageUrl: newNews.imageUrl,
      readTime: '3 menit',
      featured: true
    };
    setNewsList(prev => [created, ...prev]);
    setShowAddNewsModal(false);
    setNewNews({
      title: '',
      category: 'Prestasi',
      excerpt: '',
      content: '',
      imageUrl: '/images/indo/hero-students.webp'
    });
    triggerToast('Berita baru berhasil diterbitkan beserta foto cover!');
  };

  // Save New Photo to Gallery
  const handleSavePhoto = () => {
    if (!newPhoto.title.trim()) {
      triggerToast('Mohon masukkan judul foto');
      return;
    }
    const created: GalleryItem = {
      id: `galeri-${Date.now()}`,
      title: newPhoto.title,
      category: newPhoto.category,
      date: 'Okt 2026',
      imageUrl: newPhoto.imageUrl,
      caption: newPhoto.title
    };
    setGalleryList(prev => [created, ...prev]);
    setShowAddPhotoModal(false);
    setNewPhoto({
      title: '',
      category: 'Fasilitas',
      imageUrl: '/images/indo/classroom-lab.webp'
    });
    triggerToast('Foto baru berhasil diunggah ke Galeri!');
  };

  // Filtered applicants
  const filteredApplicants = applicants.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.nisn.includes(searchQuery) ||
                          a.schoolOrigin.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = ppdbFilter === 'Semua' || a.status === ppdbFilter || a.track === ppdbFilter;
    return matchesSearch && matchesFilter;
  });

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#F4F5FA] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-3 border-[#8C57FF] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-[#8A8D93] font-medium">Memverifikasi sesi admin...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <LoginView
        onLoginSuccess={(user) => {
          if (user.roleCategory === 'Admin Pusat') {
            setCurrentUser(user);
          } else {
            router.push('/wali-kelas');
          }
        }}
        subtitleNote="Ketik /admin di peramban Anda untuk mengakses portal admin & dewan guru Sekolah-Q."
      />
    );
  }

  return (
    <div className="h-screen bg-[#F4F5FA] text-[#3A3541] flex flex-col font-sans relative overflow-hidden selection:bg-[#16B1FF]/15 selection:text-[#0288D1]">
      
      {/* ============================================================== */}
      {/* Ambient Decorative Light Glow Blobs for Depth (Wali Kelas Theme) */}
      {/* ============================================================== */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft Sky Blue Glow (Top Left) */}
        <div className="absolute -top-48 -left-48 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#16B1FF]/10 via-[#16B1FF]/4 to-transparent blur-3xl" />
        
        {/* Soft Purple Glow (Top Right) */}
        <div className="absolute -top-24 right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#8C57FF]/10 via-[#8C57FF]/3 to-transparent blur-3xl" />
        
        {/* Soft Emerald/Teal Glow (Bottom Center) */}
        <div className="absolute bottom-[-15%] left-[20%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#56CA00]/7 via-[#16B1FF]/5 to-transparent blur-3xl" />
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#3A3541] text-white rounded-xl shadow-[0_6px_20px_rgba(58,53,65,0.3)] border border-slate-700 backdrop-blur-md animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#56CA00] shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* ============================================================== */}
      {/* Top Floating App Bar (Wali Kelas / Materio Style) */}
      {/* ============================================================== */}
      <header className="h-16 shrink-0 px-4 sm:px-6 lg:px-8 pt-2.5 z-30">
        <div className="h-14 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E7E7E9] shadow-[0_2px_10px_rgba(76,78,100,0.06)] px-4 sm:px-5 flex items-center justify-between transition-all">
          <div className="flex items-center gap-3">
            {/* Desktop Sidebar Toggle Button */}
            <button 
              type="button" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all text-xs font-semibold ${
                sidebarOpen 
                  ? 'border-[#E7E7E9] text-[#6B6774] hover:bg-[#F4F5FA] hover:text-[#16B1FF]' 
                  : 'bg-[#16B1FF]/10 border-[#16B1FF]/30 text-[#0288D1] hover:bg-[#16B1FF]/20 shadow-xs'
              }`}
              aria-label="Toggle Sidebar"
              title={sidebarOpen ? "Tutup Menu Sidebar" : "Buka Menu Sidebar"}
            >
              {sidebarOpen ? (
                <PanelLeftClose className="w-4 h-4" />
              ) : (
                <>
                  <PanelLeftOpen className="w-4 h-4 text-[#0288D1]" />
                  <span className="text-[11px] font-bold text-[#0288D1]">Menu</span>
                </>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button 
              type="button" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl hover:bg-[#F4F5FA] active:scale-95 lg:hidden text-[#6B6774] transition-all"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#16B1FF] to-[#8C57FF] flex items-center justify-center font-black text-white text-base shadow-[0_2px_6px_rgba(22,177,255,0.4)]">
                Q
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-[#3A3541]">
                  SEKOLAH-Q
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#16B1FF]/10 text-[#0288D1] border border-[#16B1FF]/20 shadow-xs">
                  ADMIN PUSAT
                </span>
              </div>
            </div>
          </div>

          {/* Top Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Direct Link to Dedicated Homeroom Teacher Portal */}
            <Link
              href="/wali-kelas"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#16B1FF]/10 hover:bg-[#16B1FF]/20 text-[#0288D1] border border-[#16B1FF]/30 text-xs font-semibold shadow-xs transition-all hover:-translate-y-0.5 active:scale-95"
              title="Buka Portal Khusus Wali Kelas"
            >
              <School className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Portal Wali Kelas</span>
              <span className="md:hidden">Wali Kelas</span>
            </Link>

            {/* Quick link to public website */}
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#F4F5FA] text-[#6B6774] hover:text-[#3A3541] border border-[#E7E7E9] text-xs font-medium shadow-xs transition-all hover:-translate-y-0.5 active:scale-95"
              title="Buka Website Utama"
            >
              <span>Lihat Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8A8D93]" />
            </Link>

            {/* Admin Profile */}
            <div className="flex items-center gap-2.5 pl-2.5 sm:pl-3 border-l border-[#E7E7E9]">
              <div className="relative">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-[#E7E7E9] shadow-sm bg-slate-100 relative">
                  <Image
                    src="/images/indo/headmaster.webp"
                    alt="Admin"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Online Status Pill */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#56CA00] ring-2 ring-white"></span>
              </div>
              <div className="hidden md:block text-left text-xs leading-tight">
                <div className="font-semibold text-[#3A3541]">Drs. H. M. Zainul Arifin</div>
                <div className="text-[#8A8D93] text-[10px]">Super Administrator</div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="p-2 rounded-xl text-[#8A8D93] hover:text-[#FF4C51] hover:bg-[#FF4C51]/10 border border-transparent hover:border-[#FF4C51]/20 transition-all ml-1 cursor-pointer"
              title="Keluar / Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Container (Sidebar + Content Area with Independent Scrolling) */}
      <div className="flex-1 flex overflow-hidden px-2 sm:px-4 lg:px-6 pt-2 pb-3 gap-5 min-h-0 relative">
        
        {/* Mobile Backdrop Overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-30 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}


        {/* ============================================================== */}
        {/* LAYER 3: Sidebar Navigation (Floating Glass Panel) */}
        {/* ============================================================== */}
        <aside className={`
          fixed lg:static inset-y-16 left-2 sm:left-4 z-40 h-[calc(100vh-5rem)] lg:h-full rounded-2xl bg-white/95 backdrop-blur-md border border-[#E7E7E9] shadow-[0_4px_18px_rgba(76,78,100,0.04)] flex flex-col justify-between shrink-0 overflow-hidden transition-all duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
          ${!sidebarOpen ? 'lg:w-0 lg:p-0 lg:border-0 lg:opacity-0 lg:pointer-events-none' : 'lg:w-64'}
        `}>
          
          {/* Top Panel Bar inside Sidebar (Title + Close Button) */}
          <div className="px-4 py-2.5 border-b border-[#E7E7E9] flex items-center justify-between shrink-0 bg-[#F4F5FA]/60">
            <span className="text-[11px] font-bold text-[#8A8D93] uppercase tracking-wider flex items-center gap-1.5">
              <LayoutDashboard className="w-3.5 h-3.5 text-[#16B1FF]" />
              <span>Navigasi Admin</span>
            </span>
            <div className="flex items-center gap-1">
              {/* Close sidebar on desktop */}
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="hidden lg:flex p-1.5 rounded-lg hover:bg-white text-[#8A8D93] hover:text-[#3A3541] transition-colors"
                title="Tutup Menu Sidebar"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
              {/* Close menu on mobile */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden p-1.5 rounded-lg hover:bg-white text-[#8A8D93] hover:text-[#3A3541] transition-colors"
                title="Tutup Menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Independent Scrollable Navigation Body */}
          <div className="p-3 space-y-2 overflow-y-auto flex-1 overscroll-contain">
            
            {/* KATEGORI 1: MENU UTAMA (Interactive Collapsible Accordion Button) */}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setMenuUtamaOpen(!menuUtamaOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-bold text-[#8A8D93] hover:text-[#3A3541] hover:bg-[#F4F5FA] transition-all cursor-pointer select-none group"
                title="Sembunyikan / Tampilkan Menu Utama"
              >
                <span className="uppercase tracking-wider">Menu Utama</span>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-[#8A8D93] font-normal">{menuUtamaOpen ? 'Tutup' : 'Buka'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#8A8D93] group-hover:text-[#3A3541] transition-transform duration-200 ${menuUtamaOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {menuUtamaOpen && (
                <nav className="space-y-1 text-sm font-medium pt-0.5 animate-in fade-in duration-200">
                  <button
                    type="button"
                    onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left ${
                      activeTab === 'dashboard'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4 shrink-0" />
                    <span>Dashboard Ringkasan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setActiveTab('ppdb'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all text-left ${
                      activeTab === 'ppdb'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-4 h-4 shrink-0" />
                      <span>Pendaftar PPDB</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      activeTab === 'ppdb' ? 'bg-white/20 text-white' : 'bg-[#16B1FF]/10 text-[#0288D1]'
                    }`}>
                      {applicants.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setActiveTab('berita'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left ${
                      activeTab === 'berita'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <Newspaper className="w-4 h-4 shrink-0" />
                    <span>Berita & Prestasi</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setActiveTab('guru'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left ${
                      activeTab === 'guru'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <Users className="w-4 h-4 shrink-0" />
                    <span>Dewan Guru & Staf</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setActiveTab('galeri'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left ${
                      activeTab === 'galeri'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4 shrink-0" />
                    <span>Galeri Dokumentasi</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setActiveTab('pesan'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all text-left ${
                      activeTab === 'pesan'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-4 h-4 shrink-0" />
                      <span>Kotak Pesan Masuk</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#FF4C51] ring-2 ring-white"></span>
                  </button>
                </nav>
              )}
            </div>

            {/* KATEGORI 2: MANAJEMEN AKADEMIK (Interactive Collapsible Accordion Button) */}
            <div className="space-y-1 pt-1 border-t border-[#E7E7E9]">
              <button
                type="button"
                onClick={() => setAkademikOpen(!akademikOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-bold text-[#0288D1] hover:bg-[#16B1FF]/8 transition-all cursor-pointer select-none group"
                title="Sembunyikan / Tampilkan Manajemen Akademik"
              >
                <span className="uppercase tracking-wider">Manajemen Akademik</span>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-[#0288D1]/70 font-normal">{akademikOpen ? 'Tutup' : 'Buka'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#0288D1]/70 group-hover:text-[#0288D1] transition-transform duration-200 ${akademikOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {akademikOpen && (
                <nav className="space-y-1 text-sm font-medium pt-0.5 animate-in fade-in duration-200">
                  {/* 1. Dashboard Akademik */}
                  <button
                    type="button"
                    onClick={() => { setActiveTab('academic-dashboard'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left ${
                      activeTab === 'academic-dashboard'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <School className="w-4 h-4 shrink-0" />
                    <span>Dashboard Akademik</span>
                  </button>

                  {/* 2. Tahun Ajaran & Semester */}
                  <button
                    type="button"
                    onClick={() => { setActiveTab('academic-years'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left ${
                      activeTab === 'academic-years'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <CalendarDays className="w-4 h-4 shrink-0" />
                    <span>Tahun Ajaran & Semester</span>
                  </button>

                  {/* 3. Data Siswa */}
                  <button
                    type="button"
                    onClick={() => { setActiveTab('academic-students'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all text-left ${
                      activeTab === 'academic-students'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-4 h-4 shrink-0" />
                      <span>Data Siswa</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      activeTab === 'academic-students' ? 'bg-white/20 text-white' : 'bg-[#16B1FF]/10 text-[#0288D1]'
                    }`}>
                      {students.length}
                    </span>
                  </button>

                  {/* 4. Kelas & Rombongan Belajar */}
                  <button
                    type="button"
                    onClick={() => { setActiveTab('academic-classes'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all text-left ${
                      activeTab === 'academic-classes'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Layers className="w-4 h-4 shrink-0" />
                      <span>Kelas & Rombel</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      activeTab === 'academic-classes' ? 'bg-white/20 text-white' : 'bg-[#8C57FF]/10 text-[#8C57FF]'
                    }`}>
                      {classes.length}
                    </span>
                  </button>

                  {/* 5. Mata Pelajaran */}
                  <button
                    type="button"
                    onClick={() => { setActiveTab('academic-subjects'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left ${
                      activeTab === 'academic-subjects'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 shrink-0" />
                    <span>Mata Pelajaran</span>
                  </button>

                  {/* 6. Penugasan Guru */}
                  <button
                    type="button"
                    onClick={() => { setActiveTab('academic-assignments'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left ${
                      activeTab === 'academic-assignments'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <Users className="w-4 h-4 shrink-0" />
                    <span>Penugasan Guru</span>
                  </button>

                  {/* 7. Jadwal Pelajaran */}
                  <button
                    type="button"
                    onClick={() => { setActiveTab('academic-schedules'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left ${
                      activeTab === 'academic-schedules'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <CalendarDays className="w-4 h-4 shrink-0" />
                    <span>Jadwal Pelajaran</span>
                  </button>

                  {/* 8. Akun & Hak Akses */}
                  <button
                    type="button"
                    onClick={() => { setActiveTab('academic-accounts'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left ${
                      activeTab === 'academic-accounts'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <Key className="w-4 h-4 shrink-0" />
                    <span>Akun & Hak Akses</span>
                  </button>

                  {/* 9. Monitoring Presensi */}
                  <button
                    type="button"
                    onClick={() => { setActiveTab('academic-attendance-monitoring'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left ${
                      activeTab === 'academic-attendance-monitoring'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <CalendarCheck className="w-4 h-4 shrink-0" />
                    <span>Monitoring Presensi</span>
                  </button>
                </nav>
              )}
            </div>

            {/* KATEGORI 3: KONFIGURASI (Interactive Collapsible Accordion Button) */}
            <div className="space-y-1 pt-1 border-t border-[#E7E7E9]">
              <button
                type="button"
                onClick={() => setKonfigurasiOpen(!konfigurasiOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-bold text-[#8A8D93] hover:text-[#3A3541] hover:bg-[#F4F5FA] transition-all cursor-pointer select-none group"
                title="Sembunyikan / Tampilkan Menu Konfigurasi"
              >
                <span className="uppercase tracking-wider">Konfigurasi</span>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-[#8A8D93] font-normal">{konfigurasiOpen ? 'Tutup' : 'Buka'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#8A8D93] group-hover:text-[#3A3541] transition-transform duration-200 ${konfigurasiOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {konfigurasiOpen && (
                <nav className="space-y-1 text-sm font-medium pt-0.5 animate-in fade-in duration-200">
                  <button
                    type="button"
                    onClick={() => { setActiveTab('settings'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left ${
                      activeTab === 'settings'
                        ? 'bg-gradient-to-r from-[#16B1FF] to-[#8C57FF] text-white shadow-[0_4px_10px_0_rgba(22,177,255,0.35)] font-semibold'
                        : 'text-[#585461] hover:bg-[#F4F5FA] hover:text-[#16B1FF]'
                    }`}
                  >
                    <Settings className="w-4 h-4 shrink-0" />
                    <span>Pengaturan Website</span>
                  </button>
                </nav>
              )}
            </div>
          </div>

        </aside>

        {/* ============================================================== */}
        {/* Main Content Body Area (Independent Scrolling Pane) */}
        {/* ============================================================== */}
        <main className="flex-1 h-full overflow-y-auto pb-12 pr-1 min-h-0 overscroll-contain">
          
          {/* ============================================================== */}
          {/* TAB 1: DASHBOARD OVERVIEW (Claymorphism + Glassmorphism Grid) */}
          {/* ============================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              
              {/* Row 1: Welcome Hero Card + 4 Micro Stat Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* Hero / Welcome Area (Wali Kelas Theme) */}
                <div className="lg:col-span-8 rounded-3xl bg-gradient-to-br from-white via-white to-[#16B1FF]/8 border border-[#E7E7E9] shadow-[0_2px_12px_rgba(76,78,100,0.06)] p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between">
                  <div className="relative z-10 max-w-lg space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16B1FF]/10 text-[#0288D1] border border-[#16B1FF]/20 text-xs font-semibold shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#0288D1]" />
                      <span>Sistem Informasi Terpadu SMP Sekolah-Q</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#3A3541] tracking-tight">
                      Selamat Datang, Bapak Kepala Sekolah! 🎉
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6B6774] leading-relaxed">
                      Pendaftaran PPDB TA 2026/2027 Gelombang 1 berlangsung lancar. Capaian kuota telah terisi <strong className="text-[#0288D1] font-bold">73.9%</strong> dari total daya tampung 6 rombongan belajar.
                    </p>
                    
                    <div className="pt-1">
                      <div className="text-2xl sm:text-3xl font-black text-[#0288D1] tracking-tight flex items-baseline gap-2">
                        <span>142</span>
                        <span className="text-xs font-medium text-[#8A8D93]">/ 192 Kuota Siswa Terdaftar</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveTab('ppdb')}
                        className="clay-btn-primary px-4 py-2.5 rounded-xl text-white text-xs font-semibold flex items-center gap-2"
                      >
                        <GraduationCap className="w-4 h-4" />
                        <span>Kelola Pendaftar PPDB</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('berita')}
                        className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F4F5FA] text-[#3A3541] border border-[#E7E7E9] text-xs font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-95"
                      >
                        <Newspaper className="w-4 h-4 text-[#8C57FF]" />
                        <span>Publikasi Warta</span>
                      </button>
                      <Link
                        href="/wali-kelas"
                        className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F4F5FA] text-[#0288D1] border border-[#E7E7E9] text-xs font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-95"
                      >
                        <School className="w-4 h-4 text-[#16B1FF]" />
                        <span>Portal Wali Kelas</span>
                      </Link>
                    </div>
                  </div>

                  {/* Decorative Award / Trophy Badge */}
                  <div className="hidden sm:block absolute right-6 bottom-4 opacity-90 pointer-events-none">
                    <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-[#16B1FF]/15 via-[#8C57FF]/10 to-[#56CA00]/15 backdrop-blur-sm border border-white/80 shadow-[0_8px_20px_rgba(22,177,255,0.15)] flex items-center justify-center p-4">
                      <Award className="w-20 h-20 text-[#16B1FF] drop-shadow-sm" />
                    </div>
                  </div>
                </div>

                {/* 4 Micro Stat Cards (Wali Kelas Style) */}
                <div className="lg:col-span-4 grid grid-cols-2 gap-4">
                  
                  {/* Stat 1: PPDB */}
                  <div className="rounded-2xl p-4 sm:p-5 flex flex-col justify-between bg-white border border-[#E7E7E9] shadow-[0_2px_8px_rgba(76,78,100,0.04)] hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#8C57FF]/12 flex items-center justify-center text-[#8C57FF]">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-[#46A200] bg-[#56CA00]/12 px-2 py-0.5 rounded-full border border-[#56CA00]/25 flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" /> +12%
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="text-2xl font-black text-[#3A3541] tracking-tight">142</div>
                      <div className="text-[11px] font-medium text-[#8A8D93] mt-0.5">Pendaftar Baru</div>
                    </div>
                  </div>

                  {/* Stat 2: Berita */}
                  <div className="rounded-2xl p-4 sm:p-5 flex flex-col justify-between bg-white border border-[#E7E7E9] shadow-[0_2px_8px_rgba(76,78,100,0.04)] hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#16B1FF]/12 flex items-center justify-center text-[#0288D1]">
                        <Newspaper className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-[#0288D1] bg-[#16B1FF]/10 px-2 py-0.5 rounded-full border border-[#16B1FF]/20">
                        3 Unggulan
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="text-2xl font-black text-[#3A3541] tracking-tight">{newsList.length}</div>
                      <div className="text-[11px] font-medium text-[#8A8D93] mt-0.5">Artikel Terbit</div>
                    </div>
                  </div>

                  {/* Stat 3: Guru */}
                  <div className="rounded-2xl p-4 sm:p-5 flex flex-col justify-between bg-white border border-[#E7E7E9] shadow-[0_2px_8px_rgba(76,78,100,0.04)] hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#56CA00]/12 flex items-center justify-center text-[#46A200]">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-[#46A200] bg-[#56CA00]/12 px-2 py-0.5 rounded-full border border-[#56CA00]/25">
                        100% Aktif
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="text-2xl font-black text-[#3A3541] tracking-tight">{teachersList.length}</div>
                      <div className="text-[11px] font-medium text-[#8A8D93] mt-0.5">Dewan Guru</div>
                    </div>
                  </div>

                  {/* Stat 4: Pesan Masuk */}
                  <div className="rounded-2xl p-4 sm:p-5 flex flex-col justify-between bg-white border border-[#E7E7E9] shadow-[0_2px_8px_rgba(76,78,100,0.04)] hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#FF4C51]/12 flex items-center justify-center text-[#E53935]">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-[#E53935] bg-[#FF4C51]/12 px-2 py-0.5 rounded-full border border-[#FF4C51]/25">
                        Baru
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="text-2xl font-black text-[#3A3541] tracking-tight">
                        {messages.filter(m => !m.isRead).length}
                      </div>
                      <div className="text-[11px] font-medium text-[#8A8D93] mt-0.5">Pesan Masuk</div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Row 2: PPDB Analytics Allocation Card (Wali Kelas Style) */}
              <div className="rounded-3xl p-6 sm:p-7 space-y-4 bg-white border border-[#E7E7E9] shadow-[0_2px_10px_rgba(76,78,100,0.06)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E7E7E9]">
                  <div>
                    <h3 className="font-bold text-[#3A3541] text-base flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#0288D1]" />
                      <span>Alokasi & Ketersediaan Kuota PPDB TA 2026/2027</span>
                    </h3>
                    <p className="text-xs text-[#8A8D93] mt-0.5">Distribusi 192 daya tampung siswa baru berdasarkan jalur penerimaan</p>
                  </div>
                  <span className="self-start sm:self-auto px-3.5 py-1 rounded-full bg-[#56CA00]/12 text-[#3D8F00] text-xs font-semibold border border-[#56CA00]/30 shadow-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#56CA00] animate-pulse"></span>
                    <span>Gelombang 1 Dibuka</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                  {/* Prestasi */}
                  <div className="p-4 rounded-2xl bg-[#F4F5FA]/60 border border-[#E7E7E9] space-y-2.5 hover:bg-white transition-all">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-[#3A3541] flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#8C57FF] shadow-2xs"></span>
                        Jalur Prestasi
                      </span>
                      <span className="font-bold text-[#8C57FF]">52 / 60</span>
                    </div>
                    <div className="w-full bg-[#E7E7E9] h-2.5 rounded-full overflow-hidden p-0.5">
                      <div className="bg-gradient-to-r from-[#8C57FF] to-[#9E6FFF] h-full rounded-full shadow-2xs transition-all duration-500" style={{ width: '86%' }}></div>
                    </div>
                    <div className="flex justify-between text-[11px] text-[#8A8D93] font-medium">
                      <span>86% terisi</span>
                      <span className="font-bold text-[#8C57FF] bg-[#8C57FF]/10 px-1.5 py-0.2 rounded">Sisa 8 kursi</span>
                    </div>
                  </div>

                  {/* Tahfidz */}
                  <div className="p-4 rounded-2xl bg-[#F4F5FA]/60 border border-[#E7E7E9] space-y-2.5 hover:bg-white transition-all">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-[#3A3541] flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#56CA00] shadow-2xs"></span>
                        Jalur Tahfidz
                      </span>
                      <span className="font-bold text-[#46A200]">36 / 40</span>
                    </div>
                    <div className="w-full bg-[#E7E7E9] h-2.5 rounded-full overflow-hidden p-0.5">
                      <div className="bg-gradient-to-r from-[#56CA00] to-[#6DE600] h-full rounded-full shadow-2xs transition-all duration-500" style={{ width: '90%' }}></div>
                    </div>
                    <div className="flex justify-between text-[11px] text-[#8A8D93] font-medium">
                      <span>90% terisi</span>
                      <span className="font-bold text-[#46A200] bg-[#56CA00]/12 px-1.5 py-0.2 rounded">Sisa 4 kursi</span>
                    </div>
                  </div>

                  {/* Zonasi */}
                  <div className="p-4 rounded-2xl bg-[#F4F5FA]/60 border border-[#E7E7E9] space-y-2.5 hover:bg-white transition-all">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-[#3A3541] flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FFB400] shadow-2xs"></span>
                        Jalur Zonasi
                      </span>
                      <span className="font-bold text-amber-600">44 / 72</span>
                    </div>
                    <div className="w-full bg-[#E7E7E9] h-2.5 rounded-full overflow-hidden p-0.5">
                      <div className="bg-gradient-to-r from-[#FFB400] to-[#FFC733] h-full rounded-full shadow-2xs transition-all duration-500" style={{ width: '61%' }}></div>
                    </div>
                    <div className="flex justify-between text-[11px] text-[#8A8D93] font-medium">
                      <span>61% terisi</span>
                      <span className="font-bold text-amber-600 bg-amber-500/10 px-1.5 py-0.2 rounded">Sisa 28 kursi</span>
                    </div>
                  </div>

                  {/* Afirmasi */}
                  <div className="p-4 rounded-2xl bg-[#F4F5FA]/60 border border-[#E7E7E9] space-y-2.5 hover:bg-white transition-all">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-[#3A3541] flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#16B1FF] shadow-2xs"></span>
                        Jalur Afirmasi
                      </span>
                      <span className="font-bold text-[#0288D1]">10 / 20</span>
                    </div>
                    <div className="w-full bg-[#E7E7E9] h-2.5 rounded-full overflow-hidden p-0.5">
                      <div className="bg-gradient-to-r from-[#16B1FF] to-[#42C3FF] h-full rounded-full shadow-2xs transition-all duration-500" style={{ width: '50%' }}></div>
                    </div>
                    <div className="flex justify-between text-[11px] text-[#8A8D93] font-medium">
                      <span>50% terisi</span>
                      <span className="font-bold text-[#0288D1] bg-[#16B1FF]/10 px-1.5 py-0.2 rounded">Sisa 10 kursi</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Recent Applicants Table Card (Wali Kelas Table Style) */}
              <div className="rounded-3xl overflow-hidden bg-white border border-[#E7E7E9] shadow-[0_2px_10px_rgba(76,78,100,0.06)]">
                <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E7E7E9]">
                  <div>
                    <h3 className="font-bold text-[#3A3541] text-base">Pendaftar Siswa Baru Masuk Terakhir</h3>
                    <p className="text-xs text-[#8A8D93] mt-0.5">5 dari {applicants.length} calon siswa yang mendaftar secara online</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('ppdb')}
                    className="text-xs text-[#0288D1] hover:text-[#01579B] font-semibold flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#16B1FF]/10 hover:bg-[#16B1FF]/20 transition-all self-start sm:self-auto shadow-2xs active:scale-95"
                  >
                    <span>Lihat Semua ({applicants.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F4F5FA] text-[#8A8D93] uppercase font-semibold text-[10px] tracking-wider border-b border-[#E7E7E9]">
                      <tr>
                        <th className="p-4">Nama Siswa</th>
                        <th className="p-4">Asal Sekolah</th>
                        <th className="p-4">Jalur</th>
                        <th className="p-4">Nilai Rapor</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7E7E9]">
                      {applicants.slice(0, 4).map(a => (
                        <tr key={a.id} className="hover:bg-[#F4F5FA]/80 transition-colors">
                          <td className="p-4 font-semibold text-[#3A3541]">
                            <div>{a.name}</div>
                            <div className="text-[10px] text-[#8A8D93] font-mono mt-0.5">NISN: {a.nisn}</div>
                          </td>
                          <td className="p-4 text-[#6B6774]">{a.schoolOrigin}</td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-full bg-[#16B1FF]/10 text-[#0288D1] border border-[#16B1FF]/20 text-[11px] font-semibold">
                              {a.track}
                            </span>
                          </td>
                          <td className="p-4 font-mono font-bold text-[#8C57FF] text-sm">{a.averageScore}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-2xs ${getStatusBadge(a.status)}`}>
                              {a.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              type="button"
                              onClick={() => { setSelectedApplicant(a); }}
                              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#16B1FF] text-[#0288D1] hover:text-white border border-[#16B1FF]/30 font-semibold text-xs shadow-xs transition-all active:scale-95"
                            >
                              Detail
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
          {/* TAB 2: DATA PPDB (Materio Table View) */}
          {/* ============================================================== */}
          {activeTab === 'ppdb' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-[#8C57FF]" />
                    <span>Kelola Pendaftaran PPDB 2026/2027</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Verifikasi berkas, persetujuan kelulusan seleksi, dan rekapitulasi data pendaftar.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="clay-btn-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-semibold"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Excel / CSV</span>
                  </button>
                </div>
              </div>

              {/* Filter and Search Bar (Claymorphic Elevated Filter Bar) */}
              <div className="clay-card rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari nama siswa, NISN, atau asal sekolah..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-[#8C57FF] transition-all"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                  <select
                    value={ppdbFilter}
                    onChange={(e) => setPpdbFilter(e.target.value)}
                    className="px-3.5 py-2 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-700 text-xs focus:bg-white focus:outline-none focus:border-[#8C57FF] transition-all"
                  >
                    <option value="Semua">Semua Status & Jalur</option>
                    <option value="Menunggu">Status: Menunggu</option>
                    <option value="Terverifikasi">Status: Terverifikasi</option>
                    <option value="Diterima">Status: Diterima</option>
                    <option value="Ditolak">Status: Ditolak</option>
                    <option value="Prestasi">Jalur: Prestasi</option>
                    <option value="Tahfidz">Jalur: Tahfidz</option>
                    <option value="Zonasi">Jalur: Zonasi</option>
                    <option value="Afirmasi">Jalur: Afirmasi</option>
                  </select>
                </div>
              </div>

              {/* Table of Applicants (Claymorphic Rounded-3xl Card) */}
              <div className="clay-card rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/80 backdrop-blur-sm text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200/70">
                      <tr>
                        <th className="p-4">No. / ID</th>
                        <th className="p-4">Nama Lengkap Siswa</th>
                        <th className="p-4">Asal Sekolah</th>
                        <th className="p-4">Jalur Pendaftaran</th>
                        <th className="p-4">Nilai Rapor</th>
                        <th className="p-4">Status Verifikasi</th>
                        <th className="p-4">Tanggal Daftar</th>
                        <th className="p-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredApplicants.length > 0 ? (
                        filteredApplicants.map((a) => (
                          <tr key={a.id} className="hover:bg-[#8C57FF]/[0.02] transition-colors">
                            <td className="p-4 font-mono text-slate-400">{a.id}</td>
                            <td className="p-4 font-semibold text-slate-800">
                              <div>{a.name}</div>
                              <div className="text-[10px] text-slate-400 font-normal mt-0.5">NISN: {a.nisn} | WA: {a.phone}</div>
                            </td>
                            <td className="p-4 text-slate-600">{a.schoolOrigin}</td>
                            <td className="p-4">
                              <span className="px-2.5 py-1 rounded-full bg-[#8C57FF]/10 border border-[#8C57FF]/20 text-[#8C57FF] text-[11px] font-semibold shadow-2xs">
                                {a.track}
                              </span>
                            </td>
                            <td className="p-4 font-mono font-bold text-[#8C57FF] text-sm">{a.averageScore}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-2xs ${getStatusBadge(a.status)}`}>
                                {a.status}
                              </span>
                            </td>
                            <td className="p-4 text-slate-400 font-mono text-[11px]">{a.date}</td>
                            <td className="p-4 text-right">
                              <button
                                type="button"
                                onClick={() => setSelectedApplicant(a)}
                                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#8C57FF] text-[#8C57FF] hover:text-white border border-[#8C57FF]/30 font-semibold text-xs shadow-xs transition-all active:scale-95"
                              >
                                Kelola
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="p-10 text-center text-slate-400">
                            Tidak ditemukan pendaftar yang sesuai pencarian.
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
          {/* TAB 3: BERITA & PRESTASI (Clay/Glass Cards) */}
          {/* ============================================================== */}
          {activeTab === 'berita' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                    <Newspaper className="w-6 h-6 text-[#16B1FF]" />
                    <span>Kelola Warta, Artikel & Prestasi</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Publikasikan kabar terbaru, dokumentasi lomba, dan warta kegiatan sekolah.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddNewsModal(true)}
                  className="clay-btn-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tulis Berita Baru</span>
                </button>
              </div>

              {/* News Grid (Claymorphic Elevated Cards) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {newsList.map((item) => (
                  <div key={item.id} className="clay-card rounded-3xl overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="relative h-44 w-full bg-slate-100">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-[#8C57FF] border border-white/80 shadow-xs">
                          {item.category}
                        </span>
                      </div>

                      <div className="p-5 sm:p-6 space-y-2">
                        <div className="text-[11px] font-medium text-slate-400">{item.date} • {item.author}</div>
                        <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-snug line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {item.summary}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
                      <span className="text-[11px] text-[#46A200] font-semibold flex items-center gap-1 bg-[#56CA00]/10 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" /> Terbit Publik
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => triggerToast(`Edit artikel: "${item.title.slice(0, 20)}..."`)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setNewsList(prev => prev.filter(n => n.id !== item.id));
                            triggerToast('Artikel berhasil dihapus');
                          }}
                          className="p-2 rounded-xl bg-[#FF4C51]/10 hover:bg-[#FF4C51]/20 text-[#E53935] transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: DEWAN GURU & STAF (Clay Profiles) */}
          {/* ============================================================== */}
          {activeTab === 'guru' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                    <Users className="w-6 h-6 text-[#56CA00]" />
                    <span>Kelola Dewan Guru & Tenaga Kependidikan</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Daftar pendidik, jabatan, mata pelajaran, dan profil guru Sekolah-Q.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddTeacherModal(true)}
                  className="clay-btn-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Guru Baru</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {teachersList.map((teacher) => (
                  <div key={teacher.id} className="clay-card rounded-3xl p-5 sm:p-6 flex flex-col items-center text-center justify-between">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="relative w-22 h-22 rounded-2xl overflow-hidden border-2 border-[#8C57FF]/30 bg-slate-100 shadow-[0_4px_12px_rgba(140,87,255,0.15)]">
                        <Image
                          src={teacher.imageUrl}
                          alt={teacher.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm leading-tight">{teacher.name}</h3>
                        <p className="text-[11px] text-[#8C57FF] font-semibold mt-1">{teacher.role}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Mapel: {teacher.subject}</p>
                      </div>
                    </div>

                    <div className="w-full pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-slate-600 font-medium px-2.5 py-0.5 rounded-full bg-slate-100/80 border border-slate-200">
                        {teacher.category || 'Pendidik'}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => triggerToast(`Edit data: ${teacher.name}`)}
                          className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setTeachersList(prev => prev.filter(t => t.id !== teacher.id));
                            triggerToast('Data guru dihapus');
                          }}
                          className="p-1.5 rounded-xl bg-[#FF4C51]/10 hover:bg-[#FF4C51]/20 text-[#E53935] transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 5: GALERI DOKUMENTASI (Clay / Glass Gallery) */}
          {/* ============================================================== */}
          {activeTab === 'galeri' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                    <ImageIcon className="w-6 h-6 text-[#16B1FF]" />
                    <span>Galeri & Dokumentasi Kegiatan</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Koleksi dokumentasi foto fasilitas, pembelajaran, ekstrakurikuler, dan kegiatan sekolah.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddPhotoModal(true)}
                  className="clay-btn-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Foto Baru</span>
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryList.map((photo) => (
                  <div key={photo.id} className="clay-card group relative rounded-3xl overflow-hidden bg-white aspect-square shadow-sm">
                    <Image
                      src={photo.imageUrl}
                      alt={photo.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-4">
                      <span className="self-start px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] text-[#8C57FF] font-bold border border-white/20 shadow-xs">
                        {photo.category}
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-white line-clamp-1">{photo.title}</h4>
                        <p className="text-[10px] text-slate-300 mt-0.5">{photo.date}</p>
                        <div className="flex justify-end pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setGalleryList(prev => prev.filter(g => g.id !== photo.id));
                              triggerToast('Foto berhasil dihapus');
                            }}
                            className="p-1.5 rounded-lg bg-[#FF4C51]/80 hover:bg-[#FF4C51] text-white transition-colors"
                            title="Hapus foto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 6: KOTAK PESAN MASUK */}
          {/* ============================================================== */}
          {activeTab === 'pesan' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-[#FF4C51]" />
                    <span>Kotak Pesan Masuk & Buku Tamu</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Pesan dan pertanyaan yang dikirimkan oleh wali murid & calon pendaftar via halaman Kontak.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`clay-card p-5 sm:p-6 rounded-3xl transition-all ${
                      msg.isRead 
                        ? 'border-slate-200/80' 
                        : 'border-[#8C57FF]/40 ring-2 ring-[#8C57FF]/10 shadow-md'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        {!msg.isRead && (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#8C57FF] animate-pulse shrink-0"></span>
                        )}
                        <span className="font-bold text-slate-800 text-sm">{msg.sender}</span>
                        <span className="text-[11px] text-slate-400">({msg.email} • {msg.phone})</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">{msg.date}</span>
                    </div>

                    <div className="pt-3 space-y-1.5">
                      <div className="font-semibold text-xs sm:text-sm text-[#8C57FF]">{msg.subject}</div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{msg.message}</p>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[10px] text-slate-400 font-mono">ID: {msg.id}</span>
                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${msg.phone.replace(/^0/, '62')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#56CA00] to-[#46A200] hover:brightness-105 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
                        >
                          <Send className="w-3 h-3" />
                          <span>Balas via WhatsApp</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, isRead: !m.isRead } : m));
                            triggerToast('Status pesan diperbarui');
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors border border-slate-200"
                        >
                          {msg.isRead ? 'Tandai Belum Dibaca' : 'Tandai Selesai Dibaca'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 7: PENGATURAN WEBSITE */}
          {/* ============================================================== */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="pb-4 border-b border-slate-200/80">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                  <Settings className="w-6 h-6 text-[#8C57FF]" />
                  <span>Pengaturan Identitas & Konten Website</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Ubah data pokok sekolah, pengumuman bar atas, nomor kontak resmi, dan sosial media.
                </p>
              </div>

              {/* Form Settings Card (Claymorphic Elevated Container) */}
              <div className="clay-card p-6 sm:p-8 rounded-3xl space-y-6">
                
                {/* Announcement Bar Section */}
                <div className="space-y-3 pb-6 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">Banner Pengumuman Atas (Announcement Bar)</h3>
                      <p className="text-[11px] text-slate-400">Teks berjalan di bar paling atas website</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settingsData.announcementActive}
                        onChange={(e) => setSettingsData({ ...settingsData, announcementActive: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8C57FF]"></div>
                    </label>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={settingsData.announcementText}
                      onChange={(e) => setSettingsData({ ...settingsData, announcementText: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-800 text-xs focus:bg-white focus:outline-none focus:border-[#8C57FF] transition-all"
                    />
                  </div>
                </div>

                {/* Identitas Pokok */}
                <div className="space-y-4 pb-6 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800 text-sm">Identitas Pokok Sekolah</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-slate-500 font-medium mb-1">Nama Resmi Sekolah</label>
                      <input
                        type="text"
                        value={settingsData.schoolName}
                        onChange={(e) => setSettingsData({ ...settingsData, schoolName: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-800 text-xs focus:bg-white focus:outline-none focus:border-[#8C57FF] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-500 font-medium mb-1">Nomor Pokok Sekolah Nasional (NPSN)</label>
                      <input
                        type="text"
                        value={settingsData.npsn}
                        onChange={(e) => setSettingsData({ ...settingsData, npsn: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-800 text-xs focus:bg-white focus:outline-none focus:border-[#8C57FF] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-500 font-medium mb-1">Status Akreditasi</label>
                      <input
                        type="text"
                        value={settingsData.akreditasi}
                        onChange={(e) => setSettingsData({ ...settingsData, akreditasi: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-800 text-xs focus:bg-white focus:outline-none focus:border-[#8C57FF] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-500 font-medium mb-1">Nomor Telepon & WhatsApp</label>
                      <input
                        type="text"
                        value={settingsData.phone}
                        onChange={(e) => setSettingsData({ ...settingsData, phone: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-800 text-xs focus:bg-white focus:outline-none focus:border-[#8C57FF] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-500 font-medium mb-1">Alamat Kampus Lengkap</label>
                    <input
                      type="text"
                      value={settingsData.address}
                      onChange={(e) => setSettingsData({ ...settingsData, address: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-800 text-xs focus:bg-white focus:outline-none focus:border-[#8C57FF] transition-all"
                    />
                  </div>
                </div>

                {/* Sosial Media Settings */}
                <div className="space-y-4 pb-6 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800 text-sm">Akun Media Sosial Resmi (Footer)</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] text-slate-500 font-medium mb-1">Instagram (IG)</label>
                      <input
                        type="text"
                        value={settingsData.instagram}
                        onChange={(e) => setSettingsData({ ...settingsData, instagram: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-800 text-xs focus:bg-white focus:outline-none focus:border-[#8C57FF] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-500 font-medium mb-1">TikTok</label>
                      <input
                        type="text"
                        value={settingsData.tiktok}
                        onChange={(e) => setSettingsData({ ...settingsData, tiktok: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-800 text-xs focus:bg-white focus:outline-none focus:border-[#8C57FF] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-500 font-medium mb-1">YouTube</label>
                      <input
                        type="text"
                        value={settingsData.youtube}
                        onChange={(e) => setSettingsData({ ...settingsData, youtube: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-800 text-xs focus:bg-white focus:outline-none focus:border-[#8C57FF] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => triggerToast('Pengaturan website berhasil disimpan ke memori!')}
                    className="clay-btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-bold"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Perubahan</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 8: DASHBOARD AKADEMIK */}
          {/* ============================================================== */}
          {activeTab === 'academic-dashboard' && (
            <AcademicDashboard
              activeYear={activeAcademicYear}
              classes={classes}
              students={students}
              subjects={subjects}
              homeroomAssignments={homeroomAssignments}
              teachingAssignments={teachingAssignments}
              onNavigateTab={(tabKey) => setActiveTab(tabKey)}
            />
          )}

          {/* ============================================================== */}
          {/* TAB 9: TAHUN AJARAN & SEMESTER */}
          {/* ============================================================== */}
          {activeTab === 'academic-years' && (
            <AcademicYearsSection
              academicYears={academicYears}
              onSetActiveYear={handleSetActiveAcademicYear}
              onAddYear={handleAddAcademicYear}
              onUpdateYear={handleUpdateAcademicYear}
              triggerToast={triggerToast}
            />
          )}

          {/* ============================================================== */}
          {/* TAB 10: DATA SISWA */}
          {/* ============================================================== */}
          {activeTab === 'academic-students' && (
            <AcademicStudentsSection
              students={students}
              classes={classes}
              onAddStudent={handleAddStudent}
              onUpdateStudent={handleUpdateStudent}
              onDeleteStudent={handleDeleteStudent}
              triggerToast={triggerToast}
            />
          )}

          {/* ============================================================== */}
          {/* TAB 11: KELAS & ROMBEL */}
          {/* ============================================================== */}
          {activeTab === 'academic-classes' && (
            <AcademicClassesSection
              classes={classes}
              students={students}
              teachers={teachersList}
              onAddClass={handleAddClass}
              onUpdateClass={handleUpdateClass}
              triggerToast={triggerToast}
            />
          )}

          {/* ============================================================== */}
          {/* TAB 12: MATA PELAJARAN */}
          {/* ============================================================== */}
          {activeTab === 'academic-subjects' && (
            <AcademicSubjectsSection
              subjects={subjects}
              teachers={teachersList}
              onAddSubject={handleAddSubject}
              onUpdateSubject={handleUpdateSubject}
              onDeleteSubject={handleDeleteSubject}
              triggerToast={triggerToast}
            />
          )}

          {/* ============================================================== */}
          {/* TAB 13: PENUGASAN GURU */}
          {/* ============================================================== */}
          {activeTab === 'academic-assignments' && (
            <AcademicAssignmentsSection
              homeroomAssignments={homeroomAssignments}
              teachingAssignments={teachingAssignments}
              classes={classes}
              subjects={subjects}
              teachers={teachersList}
              onUpdateHomeroomAssignment={handleUpdateHomeroomAssignment}
              onAddTeachingAssignment={handleAddTeachingAssignment}
              onDeleteTeachingAssignment={handleDeleteTeachingAssignment}
              triggerToast={triggerToast}
            />
          )}

          {/* ============================================================== */}
          {/* TAB 14: JADWAL PELAJARAN */}
          {/* ============================================================== */}
          {activeTab === 'academic-schedules' && (
            <AcademicSchedulesSection
              schedules={schedules}
              classes={classes}
              subjects={subjects}
              teachers={teachersList}
              onAddSchedule={handleAddSchedule}
              onDeleteSchedule={handleDeleteSchedule}
              triggerToast={triggerToast}
            />
          )}

          {/* ============================================================== */}
          {/* TAB 15: AKUN & HAK AKSES */}
          {/* ============================================================== */}
          {activeTab === 'academic-accounts' && (
            <AcademicAccountsSection
              users={academicUsers}
              teachers={teachersList}
              onAddUser={handleAddAcademicUser}
              onToggleStatus={handleToggleUserStatus}
              triggerToast={triggerToast}
            />
          )}

          {/* ============================================================== */}
          {/* TAB 16: MONITORING PRESENSI */}
          {/* ============================================================== */}
          {activeTab === 'academic-attendance-monitoring' && (
            <AcademicAttendanceMonitoringSection
              classes={classes}
              teachers={teachersList}
              subjects={subjects}
              academicYears={academicYears}
              dailyAttendance={dailyAttendance}
              subjectSessions={subjectSessions}
              subjectRecords={subjectRecords}
              triggerToast={triggerToast}
            />
          )}

        </main>
      </div>

      {/* ============================================================== */}
      {/* MODAL 1: DETAIL & VERIFIKASI PENDAFTAR PPDB */}
      {/* ============================================================== */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
              <div>
                <span className="text-[10px] font-mono text-[#8A8D93]">ID: {selectedApplicant.id}</span>
                <h3 className="text-base sm:text-lg font-bold text-[#3A3541]">{selectedApplicant.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedApplicant(null)}
                className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#F4F5FA] border border-[#E7E7E9]">
                <span className="text-[#8A8D93] text-[10px]">NISN</span>
                <div className="font-semibold text-[#3A3541] mt-0.5">{selectedApplicant.nisn}</div>
              </div>

              <div className="p-3 rounded-xl bg-[#F4F5FA] border border-[#E7E7E9]">
                <span className="text-[#8A8D93] text-[10px]">Jalur Seleksi</span>
                <div className="font-semibold text-[#8C57FF] mt-0.5">{selectedApplicant.track}</div>
              </div>

              <div className="p-3 rounded-xl bg-[#F4F5FA] border border-[#E7E7E9] col-span-2">
                <span className="text-[#8A8D93] text-[10px]">Asal Sekolah (SD/MI)</span>
                <div className="font-semibold text-[#3A3541] mt-0.5">{selectedApplicant.schoolOrigin}</div>
              </div>

              <div className="p-3 rounded-xl bg-[#F4F5FA] border border-[#E7E7E9]">
                <span className="text-[#8A8D93] text-[10px]">Rata-rata Rapor</span>
                <div className="font-bold text-[#56CA00] text-sm mt-0.5">{selectedApplicant.averageScore} / 100</div>
              </div>

              <div className="p-3 rounded-xl bg-[#F4F5FA] border border-[#E7E7E9]">
                <span className="text-[#8A8D93] text-[10px]">No. WhatsApp Wali</span>
                <div className="font-semibold text-[#3A3541] mt-0.5">{selectedApplicant.phone}</div>
              </div>
            </div>

            {/* Change Status Action */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-[#6B6774]">Ubah Status Pendaftaran:</label>
              <div className="grid grid-cols-4 gap-2">
                {(['Menunggu', 'Terverifikasi', 'Diterima', 'Ditolak'] as Applicant['status'][]).map(status => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => handleUpdateStatus(selectedApplicant.id, status)}
                    className={`py-2 rounded-lg text-xs font-bold transition-all border ${
                      selectedApplicant.status === status
                        ? 'bg-[#8C57FF] text-white border-[#8C57FF] shadow-[0_2px_6px_rgba(140,87,255,0.4)]'
                        : 'bg-white hover:bg-[#F4F5FA] text-[#6B6774] border-[#E7E7E9]'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-[#F4F5FA]">
              <a
                href={`https://wa.me/${selectedApplicant.phone.replace(/^0/, '62')}?text=Halo%20${encodeURIComponent(selectedApplicant.name)},%20kami%20dari%20Panitia%20PPDB%20Sekolah-Q%20menginformasikan%20status%20berkas%20Anda:%20${selectedApplicant.status}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-[#56CA00] hover:bg-[#46A200] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim WA</span>
              </a>

              <button
                type="button"
                onClick={() => setSelectedApplicant(null)}
                className="px-4 py-2 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774] text-xs font-semibold transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: TULIS BERITA BARU */}
      {/* ============================================================== */}
      {showAddNewsModal && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
              <h3 className="text-base font-bold text-[#3A3541] flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-[#8C57FF]" />
                <span>Publikasikan Berita / Prestasi Baru</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddNewsModal(false)}
                className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Judul Artikel</label>
                <input
                  type="text"
                  value={newNews.title}
                  onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                  placeholder="Misal: Tim Robotika Sekolah-Q Raih Juara 1 Nasional..."
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] text-xs focus:bg-white focus:outline-none focus:border-[#8C57FF]"
                />
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Kategori</label>
                <select
                  value={newNews.category}
                  onChange={(e) => setNewNews({ ...newNews, category: e.target.value as NewsItem['category'] })}
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] text-xs focus:outline-none focus:border-[#8C57FF]"
                >
                  <option value="Prestasi">Prestasi</option>
                  <option value="Kegiatan">Kegiatan Sekolah</option>
                  <option value="Pengumuman">Pengumuman</option>
                  <option value="Artikel Guru">Artikel Guru</option>
                </select>
              </div>

              {/* Upload Foto Cover Berita */}
              <div>
                <label className="block text-[#8A8D93] font-medium mb-1.5">Gambar Cover Berita</label>
                <div className="p-3.5 rounded-xl bg-[#F4F5FA] border border-[#E7E7E9] space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-white border border-[#E7E7E9] shrink-0 shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={newNews.imageUrl}
                        alt="Preview Cover"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-semibold cursor-pointer transition-colors shadow-[0_2px_6px_rgba(140,87,255,0.35)]">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Pilih Foto dari Perangkat</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, (url) => setNewNews(prev => ({ ...prev, imageUrl: url })))}
                        />
                      </label>
                      <div className="text-[10px] text-[#8A8D93]">
                        Format: JPG, PNG, atau WebP
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#E7E7E9]">
                    <span className="text-[10px] text-[#8A8D93] block mb-1">Atau pilih dari koleksi bawaan:</span>
                    <select
                      value={newNews.imageUrl}
                      onChange={(e) => setNewNews({ ...newNews, imageUrl: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#E7E7E9] text-[#6B6774] text-[11px] focus:outline-none focus:border-[#8C57FF]"
                    >
                      <option value="/images/indo/hero-students.webp">Siswa Berprestasi (WebP)</option>
                      <option value="/images/indo/teacher-tech.webp">Lab Robotika & Komputer (WebP)</option>
                      <option value="/images/indo/classroom-lab.webp">Ruang Kelas & Sains (WebP)</option>
                      <option value="/images/indo/campus-front.webp">Gedung Sekolah (WebP)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Ringkasan Singkat (Excerpt)</label>
                <textarea
                  rows={2}
                  value={newNews.excerpt}
                  onChange={(e) => setNewNews({ ...newNews, excerpt: e.target.value })}
                  placeholder="1-2 kalimat ringkasan yang menarik pembaca..."
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] text-xs focus:bg-white focus:outline-none focus:border-[#8C57FF]"
                ></textarea>
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Isi Berita Lengkap</label>
                <textarea
                  rows={3}
                  value={newNews.content}
                  onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                  placeholder="Tuliskan isi berita atau liputan lengkap di sini..."
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] text-xs focus:bg-white focus:outline-none focus:border-[#8C57FF]"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#F4F5FA]">
              <button
                type="button"
                onClick={() => setShowAddNewsModal(false)}
                className="px-4 py-2 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774] text-xs font-semibold transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveNews}
                className="px-4 py-2 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-bold shadow-[0_2px_8px_rgba(140,87,255,0.35)] transition-colors"
              >
                Terbitkan Berita
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3: TAMBAH DEWAN GURU BARU */}
      {/* ============================================================== */}
      {showAddTeacherModal && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
              <h3 className="text-base font-bold text-[#3A3541] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#8C57FF]" />
                <span>Tambah Dewan Guru & Staf Baru</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddTeacherModal(false)}
                className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                  placeholder="Misal: Ahmad Fauzi, S.Pd., M.Si."
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] text-xs focus:bg-white focus:outline-none focus:border-[#8C57FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Jabatan / Peran</label>
                  <input
                    type="text"
                    value={newTeacher.role}
                    onChange={(e) => setNewTeacher({ ...newTeacher, role: e.target.value })}
                    placeholder="Misal: Guru MIPA / Pembina OSIS"
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] text-xs focus:outline-none focus:border-[#8C57FF]"
                  />
                </div>

                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Kategori</label>
                  <select
                    value={newTeacher.category}
                    onChange={(e) => setNewTeacher({ ...newTeacher, category: e.target.value as Teacher['category'] })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] text-xs focus:outline-none focus:border-[#8C57FF]"
                  >
                    <option value="Pimpinan">Pimpinan</option>
                    <option value="MIPA & Teknologi">MIPA & Teknologi</option>
                    <option value="Bahasa & Humaniora">Bahasa & Humaniora</option>
                    <option value="Agama & Karakter">Agama & Karakter</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Mata Pelajaran</label>
                  <input
                    type="text"
                    value={newTeacher.subject}
                    onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                    placeholder="Misal: Matematika & Robotika"
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] text-xs focus:outline-none focus:border-[#8C57FF]"
                  />
                </div>

                <div>
                  <label className="block text-[#8A8D93] font-medium mb-1">Pendidikan Terakhir</label>
                  <input
                    type="text"
                    value={newTeacher.education}
                    onChange={(e) => setNewTeacher({ ...newTeacher, education: e.target.value })}
                    placeholder="Misal: S2 Pendidikan Matematika UNESA"
                    className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] text-xs focus:outline-none focus:border-[#8C57FF]"
                  />
                </div>
              </div>

              {/* Upload Foto Guru */}
              <div>
                <label className="block text-[#8A8D93] font-medium mb-1.5">Foto Profil Guru</label>
                <div className="p-3.5 rounded-xl bg-[#F4F5FA] border border-[#E7E7E9] space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white border-2 border-[#8C57FF]/30 shrink-0 shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={newTeacher.imageUrl}
                        alt="Preview Guru"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-semibold cursor-pointer transition-colors shadow-[0_2px_6px_rgba(140,87,255,0.35)]">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Pilih Foto dari Perangkat</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, (url) => setNewTeacher(prev => ({ ...prev, imageUrl: url })))}
                        />
                      </label>
                      <div className="text-[10px] text-[#8A8D93]">
                        Upload foto resmi (PNG, JPG, atau WebP)
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#E7E7E9]">
                    <span className="text-[10px] text-[#8A8D93] block mb-1">Atau gunakan foto dewan guru bawaan:</span>
                    <select
                      value={newTeacher.imageUrl}
                      onChange={(e) => setNewTeacher({ ...newTeacher, imageUrl: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#E7E7E9] text-[#6B6774] text-[11px] focus:outline-none focus:border-[#8C57FF]"
                    >
                      <option value="/images/indo/teacher-tech.webp">M. Rizal Kurniawan, S.Kom. (Guru IT)</option>
                      <option value="/images/indo/teacher-science.webp">Budi Santoso, S.Si., M.Pd. (Guru Sains)</option>
                      <option value="/images/indo/teacher-english.webp">Fitria Anindita, M.Pd. (Guru Bahasa)</option>
                      <option value="/images/indo/teacher-tahfidz.webp">Ust. Ahmad Farhan (Guru Tahfidz)</option>
                      <option value="/images/indo/teacher-senior.webp">Drs. Eko Prasetyo (Guru Senior)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#F4F5FA]">
              <button
                type="button"
                onClick={() => setShowAddTeacherModal(false)}
                className="px-4 py-2 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774] text-xs font-semibold transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveTeacher}
                className="px-4 py-2 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-bold shadow-[0_2px_8px_rgba(140,87,255,0.35)] transition-colors"
              >
                Simpan Guru
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 4: UPLOAD FOTO GALERI BARU */}
      {/* ============================================================== */}
      {showAddPhotoModal && (
        <div className="fixed inset-0 z-50 bg-[#3A3541]/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-[#E7E7E9] p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F5FA]">
              <h3 className="text-base font-bold text-[#3A3541] flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#8C57FF]" />
                <span>Upload Foto Dokumentasi Baru</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddPhotoModal(false)}
                className="p-1.5 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Judul / Keterangan Foto</label>
                <input
                  type="text"
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                  placeholder="Misal: Praktikum Kimia Dasar di Lab IPA Terpadu..."
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] text-xs focus:bg-white focus:outline-none focus:border-[#8C57FF]"
                />
              </div>

              <div>
                <label className="block text-[#8A8D93] font-medium mb-1">Kategori Dokumentasi</label>
                <select
                  value={newPhoto.category}
                  onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value as GalleryItem['category'] })}
                  className="w-full px-3 py-2 rounded-lg bg-[#F4F5FA] border border-[#E7E7E9] text-[#3A3541] text-xs focus:outline-none focus:border-[#8C57FF]"
                >
                  <option value="Fasilitas">Fasilitas</option>
                  <option value="Akademik">Akademik</option>
                  <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                  <option value="Prestasi">Prestasi</option>
                </select>
              </div>

              {/* Upload Foto Dokumentasi */}
              <div>
                <label className="block text-[#8A8D93] font-medium mb-1.5">File Foto Dokumentasi</label>
                <div className="p-3.5 rounded-xl bg-[#F4F5FA] border border-[#E7E7E9] space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white border border-[#E7E7E9] shrink-0 shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={newPhoto.imageUrl}
                        alt="Preview Foto"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-semibold cursor-pointer transition-colors shadow-[0_2px_6px_rgba(140,87,255,0.35)]">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Pilih Foto dari Perangkat</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, (url) => setNewPhoto(prev => ({ ...prev, imageUrl: url })))}
                        />
                      </label>
                      <div className="text-[10px] text-[#8A8D93]">
                        Format: JPG, PNG, atau WebP
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#E7E7E9]">
                    <span className="text-[10px] text-[#8A8D93] block mb-1">Atau gunakan foto fasilitas bawaan:</span>
                    <select
                      value={newPhoto.imageUrl}
                      onChange={(e) => setNewPhoto({ ...newPhoto, imageUrl: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#E7E7E9] text-[#6B6774] text-[11px] focus:outline-none focus:border-[#8C57FF]"
                    >
                      <option value="/images/indo/classroom-lab.webp">Ruang Lab & Belajar</option>
                      <option value="/images/indo/campus-front.webp">Gedung Kampus Depan</option>
                      <option value="/images/indo/hero-students.webp">Upacara & Siswa Berprestasi</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#F4F5FA]">
              <button
                type="button"
                onClick={() => setShowAddPhotoModal(false)}
                className="px-4 py-2 rounded-lg bg-[#F4F5FA] hover:bg-slate-200 text-[#6B6774] text-xs font-semibold transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSavePhoto}
                className="px-4 py-2 rounded-lg bg-[#8C57FF] hover:bg-[#7E4EE6] text-white text-xs font-bold shadow-[0_2px_8px_rgba(140,87,255,0.35)] transition-colors"
              >
                Upload Foto
              </button>
            </div>
          </div>
        </div>
      )}



    </div>
  );
}
