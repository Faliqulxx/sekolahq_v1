// Centralized Dummy Data Layer for School Academic Management System
// SEKOLAH-Q SMP - Designed for seamless transition to Supabase / Backend

export interface AcademicYear {
  id: string;
  name: string;
  semester: 'Ganjil' | 'Genap';
  startDate: string;
  endDate: string;
  isActive: boolean;
  status: 'Aktif' | 'Arsip' | 'Rencana';
  curriculum: string;
}

export interface ClassRoom {
  id: string;
  name: string;
  gradeLevel: '7' | '8' | '9';
  academicYearId: string;
  homeroomTeacherId: string;
  homeroomTeacherName: string;
  roomNumber: string;
  capacity: number;
  studentCount?: number;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  category: 'Wajib Umum' | 'Peminatan / MIPA' | 'Bahasa' | 'Keagamaan & Karakter' | 'Kesenian & Kebugaran';
  weeklyHours: number;
  kkm: number;
  headTeacherId: string;
  headTeacherName: string;
  description: string;
}

export interface Student {
  id: string;
  nisn: string;
  nis: string;
  name: string;
  gender: 'L' | 'P';
  gradeLevel: '7' | '8' | '9';
  classId: string;
  className: string;
  birthPlace: string;
  birthDate: string;
  previousSchool: string;
  parentName: string;
  parentPhone: string;
  address: string;
  status: 'Aktif' | 'Mutasi' | 'Lulus' | 'Cuti';
  avatarUrl: string;
}

export interface HomeroomAssignment {
  id: string;
  teacherId: string;
  teacherName: string;
  teacherRole: string;
  classId: string;
  className: string;
  academicYearId: string;
  assignedDate: string;
  status: 'Aktif' | 'Selesai';
}

export interface TeachingAssignment {
  id: string;
  teacherId: string;
  teacherName: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  classId: string;
  className: string;
  academicYearId: string;
  hoursPerWeek: number;
  status: 'Aktif' | 'Nonaktif';
}

export interface ScheduleItem {
  id: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';
  timeStart: string;
  timeEnd: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  teacherId: string;
  teacherName: string;
  room: string;
}

export interface DailyAttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className?: string;
  academicYearId?: string;
  date: string; // YYYY-MM-DD
  status: 'Hadir' | 'Sakit' | 'Izin' | 'Alpa';
  note?: string;
  notes?: string;
  recordedBy?: string;
  updatedAt?: string;
}

export type AttendanceRecord = DailyAttendanceRecord;

export interface SubjectAttendanceSession {
  id: string;
  teachingAssignmentId: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  teacherId: string;
  teacherName: string;
  academicYearId: string;
  date: string; // YYYY-MM-DD
  lessonPeriod: string; // e.g. "Jam Ke-1 s.d 2"
  startTime: string; // "07:30"
  endTime: string; // "09:00"
  room: string;
  status: 'Sudah Disimpan' | 'Belum Diisi';
  totalStudents: number;
  presentCount: number;
  lateCount: number;
  excusedCount: number;
  sickCount: number;
  absentCount: number;
  attendancePercentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface SubjectAttendanceRecord {
  id: string;
  sessionId: string;
  studentId: string;
  studentName: string;
  status: 'Hadir' | 'Terlambat' | 'Izin' | 'Sakit' | 'Alpa';
  notes?: string;
  updatedAt: string;
}

export interface StudentGrade {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  subjectId: string;
  subjectName: string;
  assignmentScore: number;
  midtermScore: number;
  finalScore: number;
  averageScore: number;
  letterGrade: 'A' | 'B' | 'C' | 'D';
  status: 'Tuntas' | 'Remedial';
  homeroomNotes?: string;
}

export interface UserAccount {
  id: string;
  username: string;
  name: string;
  email: string;
  role: 'Admin' | 'Wali Kelas' | 'Guru';
  status: 'Aktif' | 'Nonaktif';
  teacherId?: string;
  assignedClassId?: string;
  assignedClassName?: string;
  avatarUrl: string;
  lastLogin: string;
  permissions: string[];
}

// -------------------------------------------------------------
// DUMMY DATA COLLECTIONS (Internally consistent and relational)
// -------------------------------------------------------------

export const MOCK_ACADEMIC_YEARS: AcademicYear[] = [
  {
    id: 'AY-2026-GANJIL',
    name: '2026/2027 Ganjil',
    semester: 'Ganjil',
    startDate: '2026-07-13',
    endDate: '2026-12-18',
    isActive: true,
    status: 'Aktif',
    curriculum: 'Kurikulum Merdeka Mandiri Berbagi'
  },
  {
    id: 'AY-2025-GENAP',
    name: '2025/2026 Genap',
    semester: 'Genap',
    startDate: '2026-01-05',
    endDate: '2026-06-20',
    isActive: false,
    status: 'Arsip',
    curriculum: 'Kurikulum Merdeka'
  },
  {
    id: 'AY-2026-GENAP',
    name: '2026/2027 Genap',
    semester: 'Genap',
    startDate: '2027-01-04',
    endDate: '2027-06-19',
    isActive: false,
    status: 'Rencana',
    curriculum: 'Kurikulum Merdeka Mandiri Berbagi'
  }
];

export const MOCK_CLASSES: ClassRoom[] = [
  {
    id: 'KLS-7A',
    name: 'Kelas 7-A (Al-Biruni)',
    gradeLevel: '7',
    academicYearId: 'AY-2026-GANJIL',
    homeroomTeacherId: 'guru-it',
    homeroomTeacherName: 'M. Rizal Kurniawan, S.Kom.',
    roomNumber: 'R.101',
    capacity: 32,
    studentCount: 30
  },
  {
    id: 'KLS-7B',
    name: 'Kelas 7-B (Ibnu Sina)',
    gradeLevel: '7',
    academicYearId: 'AY-2026-GANJIL',
    homeroomTeacherId: 'guru-bilingual',
    homeroomTeacherName: 'Fitria Anindita, M.Pd.',
    roomNumber: 'R.102',
    capacity: 32,
    studentCount: 30
  },
  {
    id: 'KLS-8A',
    name: 'Kelas 8-A (Al-Khawarizmi)',
    gradeLevel: '8',
    academicYearId: 'AY-2026-GANJIL',
    homeroomTeacherId: 'guru-ipa',
    homeroomTeacherName: 'Budi Santoso, S.Si., M.Pd.',
    roomNumber: 'R.201',
    capacity: 32,
    studentCount: 31
  },
  {
    id: 'KLS-8B',
    name: 'Kelas 8-B (Jabir Hayyan)',
    gradeLevel: '8',
    academicYearId: 'AY-2026-GANJIL',
    homeroomTeacherId: 'guru-ips',
    homeroomTeacherName: 'Dewi Sartika, S.Pd.',
    roomNumber: 'R.202',
    capacity: 32,
    studentCount: 29
  },
  {
    id: 'KLS-9A',
    name: 'Kelas 9-A (Ar-Razi)',
    gradeLevel: '9',
    academicYearId: 'AY-2026-GANJIL',
    homeroomTeacherId: 'guru-tahfidz',
    homeroomTeacherName: 'Ust. Ahmad Farhan, Lc., M.Ag.',
    roomNumber: 'R.301',
    capacity: 32,
    studentCount: 32
  },
  {
    id: 'KLS-9B',
    name: 'Kelas 9-B (Ibnu Khaldun)',
    gradeLevel: '9',
    academicYearId: 'AY-2026-GANJIL',
    homeroomTeacherId: 'wakasek-kesiswaan',
    homeroomTeacherName: 'Drs. Eko Prasetyo',
    roomNumber: 'R.302',
    capacity: 32,
    studentCount: 30
  }
];

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 'MAPEL-MAT',
    code: 'MAT-01',
    name: 'Matematika Terpadu',
    category: 'Peminatan / MIPA',
    weeklyHours: 4,
    kkm: 78,
    headTeacherId: 'wakasek-kurikulum',
    headTeacherName: 'Hj. Nurul Hidayati, S.Pd., M.M.',
    description: 'Nalar logika matematika, aljabar, statistika data, dan pemecahan masalah komputasional.'
  },
  {
    id: 'MAPEL-IPA',
    code: 'IPA-01',
    name: 'Ilmu Pengetahuan Alam (IPA)',
    category: 'Peminatan / MIPA',
    weeklyHours: 4,
    kkm: 78,
    headTeacherId: 'guru-ipa',
    headTeacherName: 'Budi Santoso, S.Si., M.Pd.',
    description: 'Eksplorasi biologi ekosistem pesisir, fisika terapan, dan praktikum laboratorium sains.'
  },
  {
    id: 'MAPEL-BINA',
    code: 'BIN-01',
    name: 'Bahasa Indonesia & Literasi',
    category: 'Wajib Umum',
    weeklyHours: 4,
    kkm: 75,
    headTeacherId: 'guru-bilingual',
    headTeacherName: 'Fitria Anindita, M.Pd.',
    description: 'Penguasaan literasi membaca, penulisan karya ilmiah remaja, dan retorika pidato.'
  },
  {
    id: 'MAPEL-BING',
    code: 'ENG-01',
    name: 'Bahasa Inggris Komunikatif',
    category: 'Bahasa',
    weeklyHours: 4,
    kkm: 76,
    headTeacherId: 'guru-bilingual',
    headTeacherName: 'Fitria Anindita, M.Pd.',
    description: 'Kemampuan public speaking, debate, listening interaktif, dan komunikasi internasional.'
  },
  {
    id: 'MAPEL-PAI',
    code: 'PAI-01',
    name: 'Pendidikan Agama Islam & Budi Pekerti',
    category: 'Keagamaan & Karakter',
    weeklyHours: 3,
    kkm: 80,
    headTeacherId: 'guru-tahfidz',
    headTeacherName: 'Ust. Ahmad Farhan, Lc., M.Ag.',
    description: 'Fiqih ibadah, akidah akhlak, tarikh peradaban Islam, dan penanaman budi pekerti luhur.'
  },
  {
    id: 'MAPEL-TFZ',
    code: 'TFZ-01',
    name: 'Tahfidz & Tahsin Al-Qur\'an',
    category: 'Keagamaan & Karakter',
    weeklyHours: 2,
    kkm: 82,
    headTeacherId: 'guru-tahfidz',
    headTeacherName: 'Ust. Ahmad Farhan, Lc., M.Ag.',
    description: 'Bimbingan talaqqi, makharijul huruf, tajwid mutqin, dan hafalan juz 30 / juz pilihan.'
  },
  {
    id: 'MAPEL-INF',
    code: 'INF-01',
    name: 'Informatika & Robotika',
    category: 'Peminatan / MIPA',
    weeklyHours: 3,
    kkm: 78,
    headTeacherId: 'guru-it',
    headTeacherName: 'M. Rizal Kurniawan, S.Kom.',
    description: 'Dasar pemrograman Python, pengenalan IoT & mikrokontroler, serta literasi keamanan siber.'
  },
  {
    id: 'MAPEL-IPS',
    code: 'IPS-01',
    name: 'Ilmu Pengetahuan Sosial (IPS)',
    category: 'Wajib Umum',
    weeklyHours: 3,
    kkm: 75,
    headTeacherId: 'guru-ips',
    headTeacherName: 'Dewi Sartika, S.Pd.',
    description: 'Geografi maritim nusantara, dinamika ekonomi syariah, dan sejarah kebangsaan Indonesia.'
  },
  {
    id: 'MAPEL-PJOK',
    code: 'PJK-01',
    name: 'Pendidikan Jasmani & Olahraga',
    category: 'Kesenian & Kebugaran',
    weeklyHours: 3,
    kkm: 75,
    headTeacherId: 'guru-pjok',
    headTeacherName: 'Fajar Wicaksono, S.Pd.',
    description: 'Pengembangan kebugaran jasmani, sportivitas, renang, futsal, dan cabang atletik.'
  }
];

export const MOCK_STUDENTS: Student[] = [
  // Kelas 8-A (Homeroom: Budi Santoso)
  {
    id: 'SIS-2026-001',
    nisn: '0098765401',
    nis: '2508001',
    name: 'Ahmad Faiz Al-Faruq',
    gender: 'L',
    gradeLevel: '8',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    birthPlace: 'Gresik',
    birthDate: '2012-05-14',
    previousSchool: 'SD Negeri 1 Ujungpangkah',
    parentName: 'H. Suwandi, S.E.',
    parentPhone: '081234567801',
    address: 'Jl. Raya Pangkahwetan No. 12, Ujungpangkah',
    status: 'Aktif',
    avatarUrl: '/images/indo/hero-students.webp'
  },
  {
    id: 'SIS-2026-002',
    nisn: '0098765402',
    nis: '2508002',
    name: 'Annisa Nurul Ramadhani',
    gender: 'P',
    gradeLevel: '8',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    birthPlace: 'Surabaya',
    birthDate: '2012-08-22',
    previousSchool: 'SD Islam Terpadu Gresik',
    parentName: 'dr. H. Rahmat Hidayat',
    parentPhone: '081234567802',
    address: 'Perum GKB Blok G-14, Gresik',
    status: 'Aktif',
    avatarUrl: '/images/indo/students-redtie.webp'
  },
  {
    id: 'SIS-2026-003',
    nisn: '0098765403',
    nis: '2508003',
    name: 'Bima Satria Wicaksono',
    gender: 'L',
    gradeLevel: '8',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    birthPlace: 'Gresik',
    birthDate: '2012-03-10',
    previousSchool: 'SD Negeri 2 Sedagaran',
    parentName: 'Bambang Supriyanto',
    parentPhone: '081234567803',
    address: 'Desa Cangaan RT 03/RW 01, Ujungpangkah',
    status: 'Aktif',
    avatarUrl: '/images/indo/classroom-lab.webp'
  },
  {
    id: 'SIS-2026-004',
    nisn: '0098765404',
    nis: '2508004',
    name: 'Dewi Sekar Arum',
    gender: 'P',
    gradeLevel: '8',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    birthPlace: 'Lamongan',
    birthDate: '2012-11-05',
    previousSchool: 'MI Ma\'arif NU Ujungpangkah',
    parentName: 'H. Mas\'ud Ali',
    parentPhone: '081234567804',
    address: 'Jl. Merdeka No. 45, Ujungpangkah',
    status: 'Aktif',
    avatarUrl: '/images/indo/students-redtie.webp'
  },
  {
    id: 'SIS-2026-005',
    nisn: '0098765405',
    nis: '2508005',
    name: 'Farhan Maulana Akbar',
    gender: 'L',
    gradeLevel: '8',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    birthPlace: 'Gresik',
    birthDate: '2012-01-19',
    previousSchool: 'SD Negeri Sekapuk',
    parentName: 'Agus Salim',
    parentPhone: '081234567805',
    address: 'Desa Sekapuk RT 01/RW 02, Ujungpangkah',
    status: 'Aktif',
    avatarUrl: '/images/indo/hero-students.webp'
  },
  {
    id: 'SIS-2026-006',
    nisn: '0098765406',
    nis: '2508006',
    name: 'Khansa Naura Syakira',
    gender: 'P',
    gradeLevel: '8',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    birthPlace: 'Gresik',
    birthDate: '2012-07-30',
    previousSchool: 'MI Muhammadiyah 1 Golokan',
    parentName: 'H. Mustofa Kamal',
    parentPhone: '081234567806',
    address: 'Jl. Kyai Sahid No. 8, Sidayu',
    status: 'Aktif',
    avatarUrl: '/images/indo/students-redtie.webp'
  },
  {
    id: 'SIS-2026-007',
    nisn: '0098765407',
    nis: '2508007',
    name: 'Muhammad Rayhan Pratama',
    gender: 'L',
    gradeLevel: '8',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    birthPlace: 'Tuban',
    birthDate: '2012-09-15',
    previousSchool: 'SD Negeri 1 Palang',
    parentName: 'Ir. Didik Hariyadi',
    parentPhone: '081234567807',
    address: 'Jl. Pelabuhan Karangrejo, Ujungpangkah',
    status: 'Aktif',
    avatarUrl: '/images/indo/classroom-lab.webp'
  },
  {
    id: 'SIS-2026-008',
    nisn: '0098765408',
    nis: '2508008',
    name: 'Zahra Almira Putri',
    gender: 'P',
    gradeLevel: '8',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    birthPlace: 'Gresik',
    birthDate: '2012-12-11',
    previousSchool: 'SD Negeri 1 Ujungpangkah',
    parentName: 'Dra. Hj. Siti Fatimah',
    parentPhone: '081234567808',
    address: 'Jl. Sunan Giri No. 19, Ujungpangkah',
    status: 'Aktif',
    avatarUrl: '/images/indo/students-redtie.webp'
  },

  // Kelas 7-A
  {
    id: 'SIS-2026-009',
    nisn: '0098765409',
    nis: '2607001',
    name: 'Aditya Bagus Purnomo',
    gender: 'L',
    gradeLevel: '7',
    classId: 'KLS-7A',
    className: 'Kelas 7-A (Al-Biruni)',
    birthPlace: 'Gresik',
    birthDate: '2013-04-12',
    previousSchool: 'SD Negeri Pangkahwetan',
    parentName: 'Suryo Pranoto',
    parentPhone: '081234567809',
    address: 'Dusun Banyu Urip, Ujungpangkah',
    status: 'Aktif',
    avatarUrl: '/images/indo/hero-students.webp'
  },
  {
    id: 'SIS-2026-010',
    nisn: '0098765410',
    nis: '2607002',
    name: 'Cantika Putri Maharanie',
    gender: 'P',
    gradeLevel: '7',
    classId: 'KLS-7A',
    className: 'Kelas 7-A (Al-Biruni)',
    birthPlace: 'Surabaya',
    birthDate: '2013-06-08',
    previousSchool: 'SD Negeri 1 Kebomas',
    parentName: 'H. Bambang Irawan',
    parentPhone: '081234567810',
    address: 'Jl. Veteran No. 78, Gresik',
    status: 'Aktif',
    avatarUrl: '/images/indo/students-redtie.webp'
  },

  // Kelas 9-A
  {
    id: 'SIS-2026-011',
    nisn: '0098765411',
    nis: '2409001',
    name: 'Daffa Rizky Saputra',
    gender: 'L',
    gradeLevel: '9',
    classId: 'KLS-9A',
    className: 'Kelas 9-A (Ar-Razi)',
    birthPlace: 'Gresik',
    birthDate: '2011-02-18',
    previousSchool: 'SD Negeri 1 Ujungpangkah',
    parentName: 'M. Syarifuddin',
    parentPhone: '081234567811',
    address: 'Jl. Pantai Gosari No. 2, Ujungpangkah',
    status: 'Aktif',
    avatarUrl: '/images/indo/hero-students.webp'
  },
  {
    id: 'SIS-2026-012',
    nisn: '0098765412',
    nis: '2409002',
    name: 'Salma Aulia Rachman',
    gender: 'P',
    gradeLevel: '9',
    classId: 'KLS-9A',
    className: 'Kelas 9-A (Ar-Razi)',
    birthPlace: 'Malang',
    birthDate: '2011-08-29',
    previousSchool: 'SD Islam Al-Azhar Gresik',
    parentName: 'Drs. H. Rachman Hakim',
    parentPhone: '081234567812',
    address: 'Jl. Basuki Rahmat No. 10, Gresik',
    status: 'Aktif',
    avatarUrl: '/images/indo/students-redtie.webp'
  }
];

export const MOCK_HOMEROOM_ASSIGNMENTS: HomeroomAssignment[] = [
  {
    id: 'HR-001',
    teacherId: 'guru-it',
    teacherName: 'M. Rizal Kurniawan, S.Kom.',
    teacherRole: 'Guru Informatika & Koordinator IT',
    classId: 'KLS-7A',
    className: 'Kelas 7-A (Al-Biruni)',
    academicYearId: 'AY-2026-GANJIL',
    assignedDate: '2026-07-10',
    status: 'Aktif'
  },
  {
    id: 'HR-002',
    teacherId: 'guru-bilingual',
    teacherName: 'Fitria Anindita, M.Pd.',
    teacherRole: 'Koordinator Program Bilingual',
    classId: 'KLS-7B',
    className: 'Kelas 7-B (Ibnu Sina)',
    academicYearId: 'AY-2026-GANJIL',
    assignedDate: '2026-07-10',
    status: 'Aktif'
  },
  {
    id: 'HR-003',
    teacherId: 'guru-ipa',
    teacherName: 'Budi Santoso, S.Si., M.Pd.',
    teacherRole: 'Koordinator Lab Sains & STEM',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    academicYearId: 'AY-2026-GANJIL',
    assignedDate: '2026-07-10',
    status: 'Aktif'
  },
  {
    id: 'HR-004',
    teacherId: 'guru-ips',
    teacherName: 'Dewi Sartika, S.Pd.',
    teacherRole: 'Guru IPS & Pembina PMR',
    classId: 'KLS-8B',
    className: 'Kelas 8-B (Jabir Hayyan)',
    academicYearId: 'AY-2026-GANJIL',
    assignedDate: '2026-07-10',
    status: 'Aktif'
  },
  {
    id: 'HR-005',
    teacherId: 'guru-tahfidz',
    teacherName: 'Ust. Ahmad Farhan, Lc., M.Ag.',
    teacherRole: 'Koordinator Keagamaan & Tahfidz',
    classId: 'KLS-9A',
    className: 'Kelas 9-A (Ar-Razi)',
    academicYearId: 'AY-2026-GANJIL',
    assignedDate: '2026-07-10',
    status: 'Aktif'
  },
  {
    id: 'HR-006',
    teacherId: 'wakasek-kesiswaan',
    teacherName: 'Drs. Eko Prasetyo',
    teacherRole: 'Wakil Kepala Sekolah Bidang Kesiswaan',
    classId: 'KLS-9B',
    className: 'Kelas 9-B (Ibnu Khaldun)',
    academicYearId: 'AY-2026-GANJIL',
    assignedDate: '2026-07-10',
    status: 'Aktif'
  }
];

export const MOCK_TEACHING_ASSIGNMENTS: TeachingAssignment[] = [
  {
    id: 'TA-001',
    teacherId: 'guru-ipa',
    teacherName: 'Budi Santoso, S.Si., M.Pd.',
    subjectId: 'MAPEL-IPA',
    subjectName: 'Ilmu Pengetahuan Alam (IPA)',
    subjectCode: 'IPA-01',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    academicYearId: 'AY-2026-GANJIL',
    hoursPerWeek: 4,
    status: 'Aktif'
  },
  {
    id: 'TA-002',
    teacherId: 'guru-ipa',
    teacherName: 'Budi Santoso, S.Si., M.Pd.',
    subjectId: 'MAPEL-IPA',
    subjectName: 'Ilmu Pengetahuan Alam (IPA)',
    subjectCode: 'IPA-01',
    classId: 'KLS-8B',
    className: 'Kelas 8-B (Jabir Hayyan)',
    academicYearId: 'AY-2026-GANJIL',
    hoursPerWeek: 4,
    status: 'Aktif'
  },
  {
    id: 'TA-003',
    teacherId: 'wakasek-kurikulum',
    teacherName: 'Hj. Nurul Hidayati, S.Pd., M.M.',
    subjectId: 'MAPEL-MAT',
    subjectName: 'Matematika Terpadu',
    subjectCode: 'MAT-01',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    academicYearId: 'AY-2026-GANJIL',
    hoursPerWeek: 4,
    status: 'Aktif'
  },
  {
    id: 'TA-004',
    teacherId: 'guru-bilingual',
    teacherName: 'Fitria Anindita, M.Pd.',
    subjectId: 'MAPEL-BING',
    subjectName: 'Bahasa Inggris Komunikatif',
    subjectCode: 'ENG-01',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    academicYearId: 'AY-2026-GANJIL',
    hoursPerWeek: 4,
    status: 'Aktif'
  },
  {
    id: 'TA-005',
    teacherId: 'guru-tahfidz',
    teacherName: 'Ust. Ahmad Farhan, Lc., M.Ag.',
    subjectId: 'MAPEL-TFZ',
    subjectName: 'Tahfidz & Tahsin Al-Qur\'an',
    subjectCode: 'TFZ-01',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    academicYearId: 'AY-2026-GANJIL',
    hoursPerWeek: 2,
    status: 'Aktif'
  },
  {
    id: 'TA-006',
    teacherId: 'guru-it',
    teacherName: 'M. Rizal Kurniawan, S.Kom.',
    subjectId: 'MAPEL-INF',
    subjectName: 'Informatika & Robotika',
    subjectCode: 'INF-01',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    academicYearId: 'AY-2026-GANJIL',
    hoursPerWeek: 3,
    status: 'Aktif'
  },
  {
    id: 'TA-007',
    teacherId: 'guru-ips',
    teacherName: 'Dewi Sartika, S.Pd.',
    subjectId: 'MAPEL-IPS',
    subjectName: 'Ilmu Pengetahuan Sosial (IPS)',
    subjectCode: 'IPS-01',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    academicYearId: 'AY-2026-GANJIL',
    hoursPerWeek: 3,
    status: 'Aktif'
  },
  {
    id: 'TA-008',
    teacherId: 'guru-pjok',
    teacherName: 'Fajar Wicaksono, S.Pd.',
    subjectId: 'MAPEL-PJOK',
    subjectName: 'Pendidikan Jasmani & Olahraga',
    subjectCode: 'PJK-01',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    academicYearId: 'AY-2026-GANJIL',
    hoursPerWeek: 3,
    status: 'Aktif'
  }
];

export const MOCK_SCHEDULES: ScheduleItem[] = [
  // Senin - Kelas 8-A
  {
    id: 'SCH-001',
    day: 'Senin',
    timeStart: '07:30',
    timeEnd: '09:00',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    subjectId: 'MAPEL-PAI',
    subjectName: 'Pendidikan Agama Islam',
    teacherId: 'guru-tahfidz',
    teacherName: 'Ust. Ahmad Farhan, Lc., M.Ag.',
    room: 'R.201'
  },
  {
    id: 'SCH-002',
    day: 'Senin',
    timeStart: '09:15',
    timeEnd: '10:45',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    subjectId: 'MAPEL-MAT',
    subjectName: 'Matematika Terpadu',
    teacherId: 'wakasek-kurikulum',
    teacherName: 'Hj. Nurul Hidayati, S.Pd., M.M.',
    room: 'R.201'
  },
  {
    id: 'SCH-003',
    day: 'Senin',
    timeStart: '11:00',
    timeEnd: '12:30',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    subjectId: 'MAPEL-BINA',
    subjectName: 'Bahasa Indonesia',
    teacherId: 'guru-bilingual',
    teacherName: 'Fitria Anindita, M.Pd.',
    room: 'R.201'
  },

  // Selasa - Kelas 8-A
  {
    id: 'SCH-004',
    day: 'Selasa',
    timeStart: '07:30',
    timeEnd: '09:30',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    subjectId: 'MAPEL-IPA',
    subjectName: 'IPA (Praktikum Lab Sains)',
    teacherId: 'guru-ipa',
    teacherName: 'Budi Santoso, S.Si., M.Pd.',
    room: 'Lab Biologi / Kimia'
  },
  // Selasa - Kelas 8-B (Sesi Siang)
  {
    id: 'SCH-004B',
    day: 'Selasa',
    timeStart: '10:00',
    timeEnd: '11:30',
    classId: 'KLS-8B',
    className: 'Kelas 8-B (Jabir Hayyan)',
    subjectId: 'MAPEL-IPA',
    subjectName: 'IPA (Teori & Eksperimen)',
    teacherId: 'guru-ipa',
    teacherName: 'Budi Santoso, S.Si., M.Pd.',
    room: 'Lab Fisika'
  },
  {
    id: 'SCH-005',
    day: 'Selasa',
    timeStart: '09:45',
    timeEnd: '11:15',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    subjectId: 'MAPEL-BING',
    subjectName: 'Bahasa Inggris Komunikatif',
    teacherId: 'guru-bilingual',
    teacherName: 'Fitria Anindita, M.Pd.',
    room: 'R.201'
  },

  // Rabu - Kelas 8-A
  {
    id: 'SCH-006',
    day: 'Rabu',
    timeStart: '07:30',
    timeEnd: '09:00',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    subjectId: 'MAPEL-TFZ',
    subjectName: 'Tahfidz Al-Qur\'an',
    teacherId: 'guru-tahfidz',
    teacherName: 'Ust. Ahmad Farhan, Lc., M.Ag.',
    room: 'Masjid Sekolah'
  },
  {
    id: 'SCH-007',
    day: 'Rabu',
    timeStart: '09:15',
    timeEnd: '11:15',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    subjectId: 'MAPEL-INF',
    subjectName: 'Informatika & Robotika',
    teacherId: 'guru-it',
    teacherName: 'M. Rizal Kurniawan, S.Kom.',
    room: 'Smart Lab Komputer'
  },

  // Kamis - Kelas 8-A
  {
    id: 'SCH-008',
    day: 'Kamis',
    timeStart: '07:30',
    timeEnd: '09:00',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    subjectId: 'MAPEL-IPS',
    subjectName: 'Ilmu Pengetahuan Sosial',
    teacherId: 'guru-ips',
    teacherName: 'Dewi Sartika, S.Pd.',
    room: 'R.201'
  },
  {
    id: 'SCH-009',
    day: 'Kamis',
    timeStart: '09:15',
    timeEnd: '11:15',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    subjectId: 'MAPEL-PJOK',
    subjectName: 'PJOK & Kebugaran Jasmani',
    teacherId: 'guru-pjok',
    teacherName: 'Fajar Wicaksono, S.Pd.',
    room: 'Lapangan Olahraga Utama'
  },

  // Jumat - Kelas 8-A
  {
    id: 'SCH-010',
    day: 'Jumat',
    timeStart: '07:30',
    timeEnd: '09:00',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    subjectId: 'MAPEL-IPA',
    subjectName: 'Ilmu Pengetahuan Alam (IPA)',
    teacherId: 'guru-ipa',
    teacherName: 'Budi Santoso, S.Si., M.Pd.',
    room: 'Lab Biologi / Kimia'
  },

  // Rabu - Kelas 8-B
  {
    id: 'SCH-011',
    day: 'Rabu',
    timeStart: '09:15',
    timeEnd: '10:45',
    classId: 'KLS-8B',
    className: 'Kelas 8-B (Jabir Hayyan)',
    subjectId: 'MAPEL-IPA',
    subjectName: 'Ilmu Pengetahuan Alam (IPA)',
    teacherId: 'guru-ipa',
    teacherName: 'Budi Santoso, S.Si., M.Pd.',
    room: 'Lab Fisika'
  },

  // Kamis - Kelas 8-B
  {
    id: 'SCH-012',
    day: 'Kamis',
    timeStart: '07:30',
    timeEnd: '09:00',
    classId: 'KLS-8B',
    className: 'Kelas 8-B (Jabir Hayyan)',
    subjectId: 'MAPEL-IPA',
    subjectName: 'Ilmu Pengetahuan Alam (IPA)',
    teacherId: 'guru-ipa',
    teacherName: 'Budi Santoso, S.Si., M.Pd.',
    room: 'Lab Fisika'
  }
];

export const MOCK_DAILY_ATTENDANCE: DailyAttendanceRecord[] = [
  // Kelas 8-A: Tanggal 25 Okt 2026 (Hari ini)
  { id: 'ATT-20261025-001', date: '2026-10-25', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-001', studentName: 'Ahmad Faiz Al-Faruq', status: 'Hadir', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-25 07:15' },
  { id: 'ATT-20261025-002', date: '2026-10-25', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-002', studentName: 'Annisa Nurul Ramadhani', status: 'Hadir', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-25 07:15' },
  { id: 'ATT-20261025-003', date: '2026-10-25', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-003', studentName: 'Bima Satria Wicaksono', status: 'Sakit', note: 'Demam tinggi, surat dokter terlampir', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-25 07:15' },
  { id: 'ATT-20261025-004', date: '2026-10-25', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-004', studentName: 'Dewi Sekar Arum', status: 'Hadir', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-25 07:15' },
  { id: 'ATT-20261025-005', date: '2026-10-25', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-005', studentName: 'Farhan Maulana Akbar', status: 'Hadir', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-25 07:15' },
  { id: 'ATT-20261025-006', date: '2026-10-25', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-006', studentName: 'Khansa Naura Syakira', status: 'Izin', note: 'Mengikuti Lomba Debat Bahasa Inggris UNESA', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-25 07:15' },
  { id: 'ATT-20261025-007', date: '2026-10-25', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-007', studentName: 'Muhammad Rayhan Pratama', status: 'Hadir', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-25 07:15' },
  { id: 'ATT-20261025-008', date: '2026-10-25', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-008', studentName: 'Zahra Almira Putri', status: 'Hadir', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-25 07:15' },

  // Kelas 8-A: Tanggal 24 Okt 2026 (Kemarin)
  { id: 'ATT-20261024-001', date: '2026-10-24', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-001', studentName: 'Ahmad Faiz Al-Faruq', status: 'Hadir', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-24 07:10' },
  { id: 'ATT-20261024-002', date: '2026-10-24', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-002', studentName: 'Annisa Nurul Ramadhani', status: 'Hadir', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-24 07:10' },
  { id: 'ATT-20261024-003', date: '2026-10-24', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-003', studentName: 'Bima Satria Wicaksono', status: 'Hadir', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-24 07:10' },
  { id: 'ATT-20261024-004', date: '2026-10-24', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-004', studentName: 'Dewi Sekar Arum', status: 'Hadir', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-24 07:10' },
  { id: 'ATT-20261024-005', date: '2026-10-24', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-005', studentName: 'Farhan Maulana Akbar', status: 'Alpa', note: 'Tanpa konfirmasi orang tua', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-24 07:10' },
  { id: 'ATT-20261024-006', date: '2026-10-24', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-006', studentName: 'Khansa Naura Syakira', status: 'Hadir', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-24 07:10' },
  { id: 'ATT-20261024-007', date: '2026-10-24', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-007', studentName: 'Muhammad Rayhan Pratama', status: 'Hadir', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-24 07:10' },
  { id: 'ATT-20261024-008', date: '2026-10-24', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-008', studentName: 'Zahra Almira Putri', status: 'Hadir', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-24 07:10' },

  // Kelas 8-A: Tanggal 23 Okt 2026
  { id: 'ATT-20261023-001', date: '2026-10-23', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-001', studentName: 'Ahmad Faiz Al-Faruq', status: 'Hadir', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-23 07:05' },
  { id: 'ATT-20261023-002', date: '2026-10-23', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-002', studentName: 'Annisa Nurul Ramadhani', status: 'Izin', note: 'Izin acara keluarga', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-23 07:05' },
  { id: 'ATT-20261023-003', date: '2026-10-23', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-003', studentName: 'Bima Satria Wicaksono', status: 'Sakit', note: 'Sakit flu', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-23 07:05' },
  { id: 'ATT-20261023-004', date: '2026-10-23', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-004', studentName: 'Dewi Sekar Arum', status: 'Hadir', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-23 07:05' },
  { id: 'ATT-20261023-005', date: '2026-10-23', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-005', studentName: 'Farhan Maulana Akbar', status: 'Hadir', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-23 07:05' },
  { id: 'ATT-20261023-006', date: '2026-10-23', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-006', studentName: 'Khansa Naura Syakira', status: 'Hadir', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-23 07:05' },
  { id: 'ATT-20261023-007', date: '2026-10-23', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-007', studentName: 'Muhammad Rayhan Pratama', status: 'Hadir', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-23 07:05' },
  { id: 'ATT-20261023-008', date: '2026-10-23', classId: 'KLS-8A', className: 'Kelas 8-A (Al-Khawarizmi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-008', studentName: 'Zahra Almira Putri', status: 'Hadir', recordedBy: 'Budi Santoso, S.Si., M.Pd.', updatedAt: '2026-10-23 07:05' },

  // Kelas 7-A: Tanggal 25 Okt 2026
  { id: 'ATT-20261025-009', date: '2026-10-25', classId: 'KLS-7A', className: 'Kelas 7-A (Al-Biruni)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-009', studentName: 'Bagas Aditya Rahman', status: 'Hadir', recordedBy: 'M. Rizal Kurniawan, S.Kom.', updatedAt: '2026-10-25 07:20' },
  { id: 'ATT-20261025-010', date: '2026-10-25', classId: 'KLS-7A', className: 'Kelas 7-A (Al-Biruni)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-010', studentName: 'Cantika Putri Maharanie', status: 'Hadir', recordedBy: 'M. Rizal Kurniawan, S.Kom.', updatedAt: '2026-10-25 07:20' },

  // Kelas 9-A: Tanggal 25 Okt 2026
  { id: 'ATT-20261025-011', date: '2026-10-25', classId: 'KLS-9A', className: 'Kelas 9-A (Ar-Razi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-011', studentName: 'Daffa Rizky Saputra', status: 'Hadir', recordedBy: 'Ust. Ahmad Farhan, Lc., M.Ag.', updatedAt: '2026-10-25 07:20' },
  { id: 'ATT-20261025-012', date: '2026-10-25', classId: 'KLS-9A', className: 'Kelas 9-A (Ar-Razi)', academicYearId: 'AY-2026-GANJIL', studentId: 'SIS-2026-012', studentName: 'Salma Aulia Rachman', status: 'Hadir', recordedBy: 'Ust. Ahmad Farhan, Lc., M.Ag.', updatedAt: '2026-10-25 07:20' }
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = MOCK_DAILY_ATTENDANCE;

// -------------------------------------------------------------
// SUBJECT ATTENDANCE SESSIONS & RECORDS (Presensi Mata Pelajaran)
// -------------------------------------------------------------
export const MOCK_SUBJECT_ATTENDANCE_SESSIONS: SubjectAttendanceSession[] = [
  {
    id: 'SES-8A-IPA-20261025-0730',
    teachingAssignmentId: 'TA-001',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    subjectId: 'MAPEL-IPA',
    subjectName: 'Ilmu Pengetahuan Alam (IPA)',
    teacherId: 'guru-ipa',
    teacherName: 'Budi Santoso, S.Si., M.Pd.',
    academicYearId: 'AY-2026-GANJIL',
    date: '2026-10-25',
    lessonPeriod: 'Jam Ke-1 s.d 2',
    startTime: '07:30',
    endTime: '09:00',
    room: 'Lab Biologi / Kimia',
    status: 'Sudah Disimpan',
    totalStudents: 8,
    presentCount: 6,
    lateCount: 1,
    excusedCount: 1,
    sickCount: 0,
    absentCount: 0,
    attendancePercentage: 87.5,
    createdAt: '2026-10-25 07:35',
    updatedAt: '2026-10-25 08:50'
  },
  {
    id: 'SES-8A-BING-20261025-0915',
    teachingAssignmentId: 'TA-004',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    subjectId: 'MAPEL-BING',
    subjectName: 'Bahasa Inggris Komunikatif',
    teacherId: 'guru-bilingual',
    teacherName: 'Fitria Anindita, M.Pd.',
    academicYearId: 'AY-2026-GANJIL',
    date: '2026-10-25',
    lessonPeriod: 'Jam Ke-3 s.d 4',
    startTime: '09:15',
    endTime: '10:45',
    room: 'R.201',
    status: 'Sudah Disimpan',
    totalStudents: 8,
    presentCount: 7,
    lateCount: 1,
    excusedCount: 0,
    sickCount: 0,
    absentCount: 0,
    attendancePercentage: 100,
    createdAt: '2026-10-25 09:20',
    updatedAt: '2026-10-25 10:40'
  },
  {
    id: 'SES-8A-MAT-20261025-1100',
    teachingAssignmentId: 'TA-003',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    subjectId: 'MAPEL-MAT',
    subjectName: 'Matematika Terpadu',
    teacherId: 'wakasek-kurikulum',
    teacherName: 'Hj. Nurul Hidayati, S.Pd., M.M.',
    academicYearId: 'AY-2026-GANJIL',
    date: '2026-10-25',
    lessonPeriod: 'Jam Ke-5 s.d 6',
    startTime: '11:00',
    endTime: '12:30',
    room: 'R.201',
    status: 'Belum Diisi',
    totalStudents: 8,
    presentCount: 0,
    lateCount: 0,
    excusedCount: 0,
    sickCount: 0,
    absentCount: 0,
    attendancePercentage: 0,
    createdAt: '2026-10-25 07:00',
    updatedAt: '2026-10-25 07:00'
  },
  {
    id: 'SES-8B-IPA-20261024-0915',
    teachingAssignmentId: 'TA-002',
    classId: 'KLS-8B',
    className: 'Kelas 8-B (Jabir Hayyan)',
    subjectId: 'MAPEL-IPA',
    subjectName: 'Ilmu Pengetahuan Alam (IPA)',
    teacherId: 'guru-ipa',
    teacherName: 'Budi Santoso, S.Si., M.Pd.',
    academicYearId: 'AY-2026-GANJIL',
    date: '2026-10-24',
    lessonPeriod: 'Jam Ke-3 s.d 4',
    startTime: '09:15',
    endTime: '10:45',
    room: 'Lab Fisika',
    status: 'Sudah Disimpan',
    totalStudents: 8,
    presentCount: 7,
    lateCount: 0,
    excusedCount: 0,
    sickCount: 1,
    absentCount: 0,
    attendancePercentage: 87.5,
    createdAt: '2026-10-24 09:20',
    updatedAt: '2026-10-24 10:45'
  },
  {
    id: 'SES-8A-IPA-20261023-0730',
    teachingAssignmentId: 'TA-001',
    classId: 'KLS-8A',
    className: 'Kelas 8-A (Al-Khawarizmi)',
    subjectId: 'MAPEL-IPA',
    subjectName: 'Ilmu Pengetahuan Alam (IPA)',
    teacherId: 'guru-ipa',
    teacherName: 'Budi Santoso, S.Si., M.Pd.',
    academicYearId: 'AY-2026-GANJIL',
    date: '2026-10-23',
    lessonPeriod: 'Jam Ke-1 s.d 2',
    startTime: '07:30',
    endTime: '09:00',
    room: 'Lab Biologi / Kimia',
    status: 'Sudah Disimpan',
    totalStudents: 8,
    presentCount: 8,
    lateCount: 0,
    excusedCount: 0,
    sickCount: 0,
    absentCount: 0,
    attendancePercentage: 100,
    createdAt: '2026-10-23 07:35',
    updatedAt: '2026-10-23 08:55'
  },
  {
    id: 'SES-7A-INF-20261025-0730',
    teachingAssignmentId: 'TA-006',
    classId: 'KLS-7A',
    className: 'Kelas 7-A (Al-Biruni)',
    subjectId: 'MAPEL-INF',
    subjectName: 'Informatika & Robotika',
    teacherId: 'guru-it',
    teacherName: 'M. Rizal Kurniawan, S.Kom.',
    academicYearId: 'AY-2026-GANJIL',
    date: '2026-10-25',
    lessonPeriod: 'Jam Ke-1 s.d 2',
    startTime: '07:30',
    endTime: '09:00',
    room: 'Smart Lab Komputer',
    status: 'Sudah Disimpan',
    totalStudents: 2,
    presentCount: 2,
    lateCount: 0,
    excusedCount: 0,
    sickCount: 0,
    absentCount: 0,
    attendancePercentage: 100,
    createdAt: '2026-10-25 07:35',
    updatedAt: '2026-10-25 08:50'
  }
];

export const MOCK_SUBJECT_ATTENDANCE_RECORDS: SubjectAttendanceRecord[] = [
  // Sesi SES-8A-IPA-20261025-0730 (Kelas 8-A IPA hari ini)
  { id: 'SAR-001', sessionId: 'SES-8A-IPA-20261025-0730', studentId: 'SIS-2026-001', studentName: 'Ahmad Faiz Al-Faruq', status: 'Hadir', updatedAt: '2026-10-25 08:50' },
  { id: 'SAR-002', sessionId: 'SES-8A-IPA-20261025-0730', studentId: 'SIS-2026-002', studentName: 'Annisa Nurul Ramadhani', status: 'Hadir', updatedAt: '2026-10-25 08:50' },
  { id: 'SAR-003', sessionId: 'SES-8A-IPA-20261025-0730', studentId: 'SIS-2026-003', studentName: 'Bima Satria Wicaksono', status: 'Hadir', updatedAt: '2026-10-25 08:50' },
  { id: 'SAR-004', sessionId: 'SES-8A-IPA-20261025-0730', studentId: 'SIS-2026-004', studentName: 'Dewi Sekar Arum', status: 'Hadir', updatedAt: '2026-10-25 08:50' },
  { id: 'SAR-005', sessionId: 'SES-8A-IPA-20261025-0730', studentId: 'SIS-2026-005', studentName: 'Farhan Maulana Akbar', status: 'Terlambat', notes: 'Terlambat 15 menit karena ban bocor', updatedAt: '2026-10-25 08:50' },
  { id: 'SAR-006', sessionId: 'SES-8A-IPA-20261025-0730', studentId: 'SIS-2026-006', studentName: 'Khansa Naura Syakira', status: 'Izin', notes: 'Dispensasi persiapan lomba debat', updatedAt: '2026-10-25 08:50' },
  { id: 'SAR-007', sessionId: 'SES-8A-IPA-20261025-0730', studentId: 'SIS-2026-007', studentName: 'Muhammad Rayhan Pratama', status: 'Hadir', updatedAt: '2026-10-25 08:50' },
  { id: 'SAR-008', sessionId: 'SES-8A-IPA-20261025-0730', studentId: 'SIS-2026-008', studentName: 'Zahra Almira Putri', status: 'Hadir', updatedAt: '2026-10-25 08:50' },

  // Sesi SES-8A-BING-20261025-0915 (Kelas 8-A B. Inggris hari ini)
  { id: 'SAR-009', sessionId: 'SES-8A-BING-20261025-0915', studentId: 'SIS-2026-001', studentName: 'Ahmad Faiz Al-Faruq', status: 'Hadir', updatedAt: '2026-10-25 10:40' },
  { id: 'SAR-010', sessionId: 'SES-8A-BING-20261025-0915', studentId: 'SIS-2026-002', studentName: 'Annisa Nurul Ramadhani', status: 'Hadir', updatedAt: '2026-10-25 10:40' },
  { id: 'SAR-011', sessionId: 'SES-8A-BING-20261025-0915', studentId: 'SIS-2026-003', studentName: 'Bima Satria Wicaksono', status: 'Hadir', updatedAt: '2026-10-25 10:40' },
  { id: 'SAR-012', sessionId: 'SES-8A-BING-20261025-0915', studentId: 'SIS-2026-004', studentName: 'Dewi Sekar Arum', status: 'Hadir', updatedAt: '2026-10-25 10:40' },
  { id: 'SAR-013', sessionId: 'SES-8A-BING-20261025-0915', studentId: 'SIS-2026-005', studentName: 'Farhan Maulana Akbar', status: 'Hadir', updatedAt: '2026-10-25 10:40' },
  { id: 'SAR-014', sessionId: 'SES-8A-BING-20261025-0915', studentId: 'SIS-2026-006', studentName: 'Khansa Naura Syakira', status: 'Terlambat', notes: 'Terlambat 10 menit usai rapat OSIS', updatedAt: '2026-10-25 10:40' },
  { id: 'SAR-015', sessionId: 'SES-8A-BING-20261025-0915', studentId: 'SIS-2026-007', studentName: 'Muhammad Rayhan Pratama', status: 'Hadir', updatedAt: '2026-10-25 10:40' },
  { id: 'SAR-016', sessionId: 'SES-8A-BING-20261025-0915', studentId: 'SIS-2026-008', studentName: 'Zahra Almira Putri', status: 'Hadir', updatedAt: '2026-10-25 10:40' },

  // Sesi SES-8B-IPA-20261024-0915 (Kelas 8-B IPA kemarin)
  { id: 'SAR-017', sessionId: 'SES-8B-IPA-20261024-0915', studentId: 'SIS-2026-001', studentName: 'Ahmad Faiz Al-Faruq', status: 'Hadir', updatedAt: '2026-10-24 10:45' },
  { id: 'SAR-018', sessionId: 'SES-8B-IPA-20261024-0915', studentId: 'SIS-2026-002', studentName: 'Annisa Nurul Ramadhani', status: 'Hadir', updatedAt: '2026-10-24 10:45' },
  { id: 'SAR-019', sessionId: 'SES-8B-IPA-20261024-0915', studentId: 'SIS-2026-003', studentName: 'Bima Satria Wicaksono', status: 'Sakit', notes: 'Izin ke UKS sakit kepala', updatedAt: '2026-10-24 10:45' },
  { id: 'SAR-020', sessionId: 'SES-8B-IPA-20261024-0915', studentId: 'SIS-2026-004', studentName: 'Dewi Sekar Arum', status: 'Hadir', updatedAt: '2026-10-24 10:45' },
  { id: 'SAR-021', sessionId: 'SES-8B-IPA-20261024-0915', studentId: 'SIS-2026-005', studentName: 'Farhan Maulana Akbar', status: 'Hadir', updatedAt: '2026-10-24 10:45' },
  { id: 'SAR-022', sessionId: 'SES-8B-IPA-20261024-0915', studentId: 'SIS-2026-006', studentName: 'Khansa Naura Syakira', status: 'Hadir', updatedAt: '2026-10-24 10:45' },
  { id: 'SAR-023', sessionId: 'SES-8B-IPA-20261024-0915', studentId: 'SIS-2026-007', studentName: 'Muhammad Rayhan Pratama', status: 'Hadir', updatedAt: '2026-10-24 10:45' },
  { id: 'SAR-024', sessionId: 'SES-8B-IPA-20261024-0915', studentId: 'SIS-2026-008', studentName: 'Zahra Almira Putri', status: 'Hadir', updatedAt: '2026-10-24 10:45' },

  // Sesi SES-8A-IPA-20261023-0730
  { id: 'SAR-025', sessionId: 'SES-8A-IPA-20261023-0730', studentId: 'SIS-2026-001', studentName: 'Ahmad Faiz Al-Faruq', status: 'Hadir', updatedAt: '2026-10-23 08:55' },
  { id: 'SAR-026', sessionId: 'SES-8A-IPA-20261023-0730', studentId: 'SIS-2026-002', studentName: 'Annisa Nurul Ramadhani', status: 'Hadir', updatedAt: '2026-10-23 08:55' },
  { id: 'SAR-027', sessionId: 'SES-8A-IPA-20261023-0730', studentId: 'SIS-2026-003', studentName: 'Bima Satria Wicaksono', status: 'Hadir', updatedAt: '2026-10-23 08:55' },
  { id: 'SAR-028', sessionId: 'SES-8A-IPA-20261023-0730', studentId: 'SIS-2026-004', studentName: 'Dewi Sekar Arum', status: 'Hadir', updatedAt: '2026-10-23 08:55' },
  { id: 'SAR-029', sessionId: 'SES-8A-IPA-20261023-0730', studentId: 'SIS-2026-005', studentName: 'Farhan Maulana Akbar', status: 'Hadir', updatedAt: '2026-10-23 08:55' },
  { id: 'SAR-030', sessionId: 'SES-8A-IPA-20261023-0730', studentId: 'SIS-2026-006', studentName: 'Khansa Naura Syakira', status: 'Hadir', updatedAt: '2026-10-23 08:55' },
  { id: 'SAR-031', sessionId: 'SES-8A-IPA-20261023-0730', studentId: 'SIS-2026-007', studentName: 'Muhammad Rayhan Pratama', status: 'Hadir', updatedAt: '2026-10-23 08:55' },
  { id: 'SAR-032', sessionId: 'SES-8A-IPA-20261023-0730', studentId: 'SIS-2026-008', studentName: 'Zahra Almira Putri', status: 'Hadir', updatedAt: '2026-10-23 08:55' },

  // Sesi SES-7A-INF-20261025-0730
  { id: 'SAR-033', sessionId: 'SES-7A-INF-20261025-0730', studentId: 'SIS-2026-009', studentName: 'Bagas Aditya Rahman', status: 'Hadir', updatedAt: '2026-10-25 08:50' },
  { id: 'SAR-034', sessionId: 'SES-7A-INF-20261025-0730', studentId: 'SIS-2026-010', studentName: 'Cantika Putri Maharanie', status: 'Hadir', updatedAt: '2026-10-25 08:50' }
];

export const MOCK_GRADES: StudentGrade[] = [
  {
    id: 'GRD-001',
    studentId: 'SIS-2026-001',
    studentName: 'Ahmad Faiz Al-Faruq',
    classId: 'KLS-8A',
    subjectId: 'MAPEL-IPA',
    subjectName: 'Ilmu Pengetahuan Alam',
    assignmentScore: 92,
    midtermScore: 90,
    finalScore: 94,
    averageScore: 92.0,
    letterGrade: 'A',
    status: 'Tuntas',
    homeroomNotes: 'Sangat tekun dalam eksperimen lab sains, pertahankan kepemimpinan belajarnya.'
  },
  {
    id: 'GRD-002',
    studentId: 'SIS-2026-002',
    studentName: 'Annisa Nurul Ramadhani',
    classId: 'KLS-8A',
    subjectId: 'MAPEL-IPA',
    subjectName: 'Ilmu Pengetahuan Alam',
    assignmentScore: 88,
    midtermScore: 86,
    finalScore: 90,
    averageScore: 88.0,
    letterGrade: 'A',
    status: 'Tuntas',
    homeroomNotes: 'Aktif bertanya dan cermat dalam penyusunan laporan ilmiah.'
  },
  {
    id: 'GRD-003',
    studentId: 'SIS-2026-003',
    studentName: 'Bima Satria Wicaksono',
    classId: 'KLS-8A',
    subjectId: 'MAPEL-IPA',
    subjectName: 'Ilmu Pengetahuan Alam',
    assignmentScore: 76,
    midtermScore: 74,
    finalScore: 78,
    averageScore: 76.0,
    letterGrade: 'C',
    status: 'Remedial',
    homeroomNotes: 'Perlu pendampingan tutor sebaya untuk materi hukum Newton dan gaya gesek.'
  },
  {
    id: 'GRD-004',
    studentId: 'SIS-2026-004',
    studentName: 'Dewi Sekar Arum',
    classId: 'KLS-8A',
    subjectId: 'MAPEL-IPA',
    subjectName: 'Ilmu Pengetahuan Alam',
    assignmentScore: 86,
    midtermScore: 84,
    finalScore: 88,
    averageScore: 86.0,
    letterGrade: 'B',
    status: 'Tuntas',
    homeroomNotes: 'Daya nalar analitis baik, tingkatkan kontribusi diskusi kelompok.'
  },
  {
    id: 'GRD-005',
    studentId: 'SIS-2026-005',
    studentName: 'Farhan Maulana Akbar',
    classId: 'KLS-8A',
    subjectId: 'MAPEL-IPA',
    subjectName: 'Ilmu Pengetahuan Alam',
    assignmentScore: 82,
    midtermScore: 80,
    finalScore: 85,
    averageScore: 82.3,
    letterGrade: 'B',
    status: 'Tuntas',
    homeroomNotes: 'Disiplin mengumpulkan tugas proyek mandiri tepat waktu.'
  },
  {
    id: 'GRD-006',
    studentId: 'SIS-2026-006',
    studentName: 'Khansa Naura Syakira',
    classId: 'KLS-8A',
    subjectId: 'MAPEL-IPA',
    subjectName: 'Ilmu Pengetahuan Alam',
    assignmentScore: 94,
    midtermScore: 92,
    finalScore: 96,
    averageScore: 94.0,
    letterGrade: 'A',
    status: 'Tuntas',
    homeroomNotes: 'Prestasi gemilang, unggul dalam penguasaan sains bilingual.'
  },
  {
    id: 'GRD-007',
    studentId: 'SIS-2026-007',
    studentName: 'Muhammad Rayhan Pratama',
    classId: 'KLS-8A',
    subjectId: 'MAPEL-IPA',
    subjectName: 'Ilmu Pengetahuan Alam',
    assignmentScore: 80,
    midtermScore: 78,
    finalScore: 83,
    averageScore: 80.3,
    letterGrade: 'B',
    status: 'Tuntas',
    homeroomNotes: 'Tunjukkan potensi besar pada praktikum pengamatan sel mikroskopis.'
  },
  {
    id: 'GRD-008',
    studentId: 'SIS-2026-008',
    studentName: 'Zahra Almira Putri',
    classId: 'KLS-8A',
    subjectId: 'MAPEL-IPA',
    subjectName: 'Ilmu Pengetahuan Alam',
    assignmentScore: 90,
    midtermScore: 88,
    finalScore: 92,
    averageScore: 90.0,
    letterGrade: 'A',
    status: 'Tuntas',
    homeroomNotes: 'Sangat teliti, berakhlak mulia, dan selalu siap membantu rekan kelas.'
  }
];

export const MOCK_USERS: UserAccount[] = [
  {
    id: 'USR-001',
    username: 'admin.utama',
    name: 'Drs. H. M. Zainul Arifin, M.Pd.',
    email: 'kepsek@sekolah-q.sch.id',
    role: 'Admin',
    status: 'Aktif',
    teacherId: 'kepala-sekolah',
    avatarUrl: '/images/indo/headmaster.webp',
    lastLogin: 'Hari ini, 07:15 WIB',
    permissions: ['all_access', 'ppdb_manage', 'academic_manage', 'settings_manage', 'user_manage']
  },
  {
    id: 'USR-002',
    username: 'wali.budi',
    name: 'Budi Santoso, S.Si., M.Pd.',
    email: 'budi.santoso@sekolah-q.sch.id',
    role: 'Wali Kelas',
    status: 'Aktif',
    teacherId: 'guru-ipa',
    assignedClassId: 'KLS-8A',
    assignedClassName: 'Kelas 8-A (Al-Khawarizmi)',
    avatarUrl: '/images/indo/teacher-science.webp',
    lastLogin: 'Hari ini, 07:45 WIB',
    permissions: ['homeroom_dashboard', 'homeroom_roster', 'homeroom_attendance', 'homeroom_grades', 'homeroom_reports']
  },
  {
    id: 'USR-003',
    username: 'guru.fitria',
    name: 'Fitria Anindita, M.Pd.',
    email: 'fitria.anindita@sekolah-q.sch.id',
    role: 'Guru',
    status: 'Aktif',
    teacherId: 'guru-bilingual',
    avatarUrl: '/images/indo/teacher-english.webp',
    lastLogin: 'Kemarin, 16:30 WIB',
    permissions: ['teacher_schedule', 'subject_grading', 'class_materials']
  },
  {
    id: 'USR-004',
    username: 'wali.farhan',
    name: 'Ust. Ahmad Farhan, Lc., M.Ag.',
    email: 'ahmad.farhan@sekolah-q.sch.id',
    role: 'Wali Kelas',
    status: 'Aktif',
    teacherId: 'guru-tahfidz',
    assignedClassId: 'KLS-9A',
    assignedClassName: 'Kelas 9-A (Ar-Razi)',
    avatarUrl: '/images/indo/teacher-tahfidz.webp',
    lastLogin: '24 Okt 2026, 11:20 WIB',
    permissions: ['homeroom_dashboard', 'homeroom_roster', 'homeroom_attendance', 'homeroom_grades', 'homeroom_reports']
  }
];

export const MOCK_ACADEMIC_ANNOUNCEMENTS = [
  {
    id: 'ANN-001',
    title: 'Pelaksanaan Penilaian Tengah Semester (PTS) Ganjil TA 2026/2027',
    content: 'Diberitahukan kepada seluruh bapak/ibu wali kelas dan dewan guru bahwa PTS Ganjil akan diselenggarakan pada 10 - 16 November 2026 berbasis Digital CBT di Smart Lab Komputer.',
    date: '25 Okt 2026',
    author: 'Waka Kurikulum'
  },
  {
    id: 'ANN-002',
    title: 'Batas Akhir Input Presensi Harian Bulan Oktober',
    content: 'Mohon seluruh wali kelas memastikan rekap presensi siswa bulan Oktober telah terinput 100% sebelum tanggal 31 Oktober 2026 pukul 14.00 WIB.',
    date: '24 Okt 2026',
    author: 'Biro Administrasi Akademik'
  },
  {
    id: 'ANN-003',
    title: 'Bimbingan Tahfidz Intensif Menjelang Ujian Tasmi\'',
    content: 'Santri kelas 7 dan 8 dengan target juz 30 dijadwalkan mengikuti tasmi\' sekali duduk mulai pekan depan di Masjid Kampus Sekolah-Q.',
    date: '22 Okt 2026',
    author: 'Koordinator Tahfidz'
  }
];
