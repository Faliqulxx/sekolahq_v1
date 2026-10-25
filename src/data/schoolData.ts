export interface Program {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  iconName: string;
  badge: string;
  summary: string;
  fullDescription: string;
  highlights: string[];
  features: { title: string; desc: string }[];
  targetOutcome: string;
  imageUrl: string;
}

export interface Extracurricular {
  id: string;
  name: string;
  category: 'Akademik' | 'Olahraga' | 'Seni & Budaya' | 'Kepemimpinan';
  schedule: string;
  mentor: string;
  achievements: string;
  description: string;
  imageUrl: string;
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  subject: string;
  education: string;
  quote: string;
  imageUrl: string;
  category: 'Pimpinan' | 'MIPA & Teknologi' | 'Bahasa & Humaniora' | 'Agama & Karakter';
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  category: 'Prestasi' | 'Kegiatan' | 'Pengumuman' | 'Artikel Guru';
  date: string;
  author: string;
  readTime: string;
  summary: string;
  content: string[];
  imageUrl: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Akademik' | 'Ekstrakurikuler' | 'Fasilitas' | 'Prestasi';
  imageUrl: string;
  date: string;
  caption: string;
}

export interface PPDBPhase {
  phase: string;
  name: string;
  dateRange: string;
  status: 'Sedang Berlangsung' | 'Segera Dibuka' | 'Mendatang';
  quota: string;
  desc: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Pendaftaran' | 'Akademik' | 'Biaya & Beasiswa' | 'Fasilitas';
}

export const SCHOOL_INFO = {
  name: "Sekolah-Q",
  subtitle: "Sekolah Penggerak Berkarakter, Berprestasi, dan Berwawasan Global",
  npsn: "20500412",
  akreditasi: "A (Unggul) - BAN S/M",
  established: "1988",
  yearsOfExcellence: "38",
  address: "Jl. Pendidikan No. 45, Ujungpangkah, Kabupaten Gresik, Jawa Timur 61154",
  phone: "(031) 3948-1234",
  whatsapp: "+62 812-3456-7890",
  email: "info@sekolah-q.sch.id",
  ppdbEmail: "ppdb@sekolah-q.sch.id",
  headmaster: "Drs. H. M. Zainul Arifin, M.Pd.",
  curriculum: "Kurikulum Merdeka Mandiri Berbagi",
  stats: [
    { label: "Total Siswa Aktif", value: "1.250+", note: "Tergabung dalam 36 Rombel" },
    { label: "Tenaga Pendidik & Staf", value: "85+", note: "100% Tersertifikasi & S1/S2" },
    { label: "Tahun Berdiri & Dedikasi", value: "38 Th", note: "Mencetak Generasi Unggul" },
    { label: "Rombongan Belajar", value: "36", note: "Kelas Nyaman & Ber-AC" },
    { label: "Tingkat Kelulusan", value: "100%", note: "98% Tembus SMA/SMK Negeri" },
    { label: "Penghargaan & Juara", value: "140+", note: "Tingkat Kabupaten s.d Internasional" },
  ],
  announcements: [
    "Pendaftaran Peserta Didik Baru (PPDB) Gelombang 1 TA 2026/2027 Resmi Dibuka hingga 30 Mei 2026.",
    "Selamat! Tim Robotika Sekolah-Q Raih Gold Medal di National STEM Olympiad 2026.",
    "Jadwal Open House & Simulasi Tes Minat Bakat Calon Siswa Baru: Sabtu, 16 Mei 2026."
  ]
};

export const FOUR_PILLARS = [
  {
    number: "01",
    title: "Academic Excellence",
    subtitle: "Kurikulum Merdeka Berstandar Nasional & Pengantar Bahasa Global",
    desc: "Pembelajaran terdiferensiasi yang memerdekakan potensi nalar kritis, literasi, dan numerasi siswa secara komprehensif."
  },
  {
    number: "02",
    title: "Holistic Character",
    subtitle: "Pendidikan Karakter & Budi Pekerti Berbasis Nilai Luhur",
    desc: "Program pembiasaan sholat berjamaah, tahfidz juz pilihan, 5S (Senyum, Sapa, Salam, Sopan, Santun), dan kepemimpinan."
  },
  {
    number: "03",
    title: "STEM & Digital Mastery",
    subtitle: "Riset Teknologi, Coding, dan Inovasi Robotika",
    desc: "Fasilitas smart lab komputer dan bimbingan sains aplikatif untuk melatih computational thinking sejak dini."
  },
  {
    number: "04",
    title: "Eco & Global Vision",
    subtitle: "Sekolah Adiwiyata Mandiri & Berwawasan Pesisir Bahari",
    desc: "Kepedulian nyata terhadap kelestarian ekosistem pesisir mangrove Ujungpangkah serta kolaborasi jejaring internasional."
  }
];

export const PROGRAMS: Program[] = [
  {
    id: "kurikulum-merdeka",
    slug: "kurikulum-merdeka",
    title: "Kurikulum Merdeka Berbasis Proyek",
    subtitle: "Pembelajaran Interaktif yang Berpusat pada Potensi Unik Siswa",
    category: "Akademik Inti",
    iconName: "GraduationCap",
    badge: "Kurikulum Nasional",
    summary: "Implementasi kurikulum terbaru Kemendikbudristek dengan pendekatan Project-Based Learning (PjBL) dan penguatan Profil Pelajar Pancasila.",
    fullDescription: "Di Sekolah-Q, Kurikulum Merdeka diimplementasikan bukan sekadar teori, melainkan pengalaman belajar yang hidup. Siswa diajak memecahkan masalah nyata di lingkungan sekitar, berkolaborasi dalam tim, dan menghasilkan karya nyata melalui Proyek Penguatan Profil Pelajar Pancasila (P5).",
    highlights: [
      "Pembelajaran terdiferensiasi sesuai gaya belajar siswa (Visual, Auditori, Kinestetik)",
      "Proyek bertema kearifan lokal pesisir dan pelestarian mangrove Ujungpangkah",
      "Asesmen diagnostik berkala untuk pemetaan bakat dan minat akademik",
      "Pekan Pameran Karya Siswa (Exhibition Day) setiap akhir semester"
    ],
    features: [
      { title: "Smart Classroom", desc: "Dilengkapi proyektor interaktif, koneksi gigabit wifi, dan sarana multimedia." },
      { title: "Bimbingan Portofolio", desc: "Setiap siswa memiliki rekam jejak digital hasil karya dan capaian kompetensi." }
    ],
    targetOutcome: "Lulusan yang mandiri, kritis, kreatif, dan memiliki fondasi akademik yang kokoh untuk jenjang lanjutan.",
    imageUrl: "/images/indo/classroom-lab.webp"
  },
  {
    id: "program-bilingual",
    slug: "program-bilingual",
    title: "Program Kelas Bilingual",
    subtitle: "Kecakapan Dwi-Bahasa (Indonesia & Inggris) Menuju Generasi Global",
    category: "Bahasa & Global",
    iconName: "Languages",
    badge: "Internasional",
    summary: "Pembelajaran dwi-bahasa terpadu pada mata pelajaran MIPA dan Bahasa Inggris dengan modul standar Cambridge Lower Secondary.",
    fullDescription: "Mempersiapkan siswa agar percaya diri berkomunikasi di pentas dunia. Kelas bilingual menggunakan Bahasa Inggris sebagai pengantar untuk mata pelajaran sains dan matematika terpilih, dilengkapi program Native Speaker Exchange dan English Immersion Week.",
    highlights: [
      "Dual language instruction (Matematika & IPA disampaikan dwibahasa)",
      "Program rutin 'English Speaking Zone' setiap Selasa dan Kamis",
      "Workshop & sesi interaktif bersama penutur asli (Native Speaker)",
      "Persiapan sertifikasi kecakapan bahasa Inggris tingkat remaja"
    ],
    features: [
      { title: "Digital Language Lab", desc: "Laboratorium bahasa digital untuk latihan listening, speaking, dan pronunciation." },
      { title: "Global Pen-Pal", desc: "Program sahabat pena digital bersama sekolah mitra di Asia Tenggara." }
    ],
    targetOutcome: "Kemampuan berbicara dan bernalar dalam bahasa Inggris yang fasih, siap bersaing di SMA internasional/favorit.",
    imageUrl: "/images/indo/students-redtie.webp"
  },
  {
    id: "tahfidz-karakter",
    slug: "tahfidz-karakter",
    title: "Tahfidz Al-Qur'an & Akhlak Mulia",
    subtitle: "Membangun Pondasi Spiritual yang Kokoh dan Berakhlak Karimah",
    category: "Spiritual & Karakter",
    iconName: "BookOpen",
    badge: "Keagamaan",
    summary: "Program bimbingan tahfidz intensif dengan metode mutqin, target minimal 3 Juz selama 3 tahun, dibimbing ustadz/ustadzah bersertifikat.",
    fullDescription: "Menyeimbangkan kecerdasan intelektual dan spiritual. Program Tahfidz Sekolah-Q dirancang dengan suasana yang menggembirakan tanpa membebani siswa, memadukan hafalan Al-Qur'an, tajwid tartil, kajian tafsir tematik, dan pengamalan adab sehari-hari.",
    highlights: [
      "Metode talaqqi dan muroja'ah berjenjang dengan sistem buku pantau santri",
      "Target hafalan Juz 30, Juz 29, dan Juz 1/surah pilihan",
      "Khataman dan Wisuda Tahfidz Akbar bersama orang tua setiap tahun",
      "Pembiasaan Sholat Dhuha, Sholat Dzuhur berjamaah, dan sedekah Jum'at"
    ],
    features: [
      { title: "Musyrif Berpengalaman", desc: "Bimbingan privat rasio 1 ustadz membina 12-15 siswa agar hafalan terjaga." },
      { title: "Audio Al-Qur'an Corner", desc: "Ruang baca khusus dengan perangkat audio tilawah dari qori internasional." }
    ],
    targetOutcome: "Generasi hafiz/hafizah yang berakhlak mulia, rendah hati, dan berbakti kepada orang tua serta masyarakat.",
    imageUrl: "/images/indo/teacher-tahfidz.webp"
  },
  {
    id: "stem-robotik",
    slug: "stem-robotik",
    title: "STEM & Inovasi Robotika",
    subtitle: "Eksplorasi Sains Terapan, Coding, dan Kecerdasan Artifisial",
    category: "Teknologi Terapan",
    iconName: "Cpu",
    badge: "Unggulan Sains",
    summary: "Fasilitas smart lab komputer dan program robotik terstruktur untuk mengasah nalar komputasional, mikrokontroler Arduino, dan coding dasar.",
    fullDescription: "Merangkul masa depan dengan membekali siswa keterampilan abad ke-21. Dalam program STEM & Robotika, siswa belajar logika pemrograman, merakit sensor IoT sederhana, robot line-follower, dan simulasi otomasi yang terbukti mencetak juara lomba tingkat provinsi hingga nasional.",
    highlights: [
      "Pengenalan dasar pemrograman (Scratch, Python, dan C++ Arduino)",
      "Praktek langsung pembuatan robotika mekanik dan otomatisasi sensor",
      "Pendampingan khusus persiapan olimpiade sains (OSN) dan lomba robotika",
      "Proyek pemecahan masalah lingkungan berbasis Internet of Things (IoT)"
    ],
    features: [
      { title: "Robotics Arena & 3D Printer", desc: "Area lintasan uji coba robot serta printer 3D untuk prototipe mekanik siswa." },
      { title: "High-spec Lab PC", desc: "Komputer generasi terbaru untuk pemrograman dan rendering desain ilmiah." }
    ],
    targetOutcome: "Siswa memiliki ketrampilan problem solving logis, fasih teknologi, dan siap menjadi inovator masa depan.",
    imageUrl: "/images/indo/teacher-tech.webp"
  }
];

export const EXTRACURRICULARS: Extracurricular[] = [
  {
    id: "pramuka",
    name: "Pramuka Inti (Gudep 04.115)",
    category: "Kepemimpinan",
    schedule: "Jumat, 14.30 - 16.30 WIB",
    mentor: "Kak Bambang Prasetyo & Tim Pembina Kwarda",
    achievements: "Juara Umum Jambore Cabang Gresik 2024 & 2025",
    description: "Membentuk kemandirian, kedisiplinan, ketangkasan bertahan di alam bebas, dan jiwa kepemimpinan ksatria berjiwa Pancasila.",
    imageUrl: "/images/indo/hero-students.webp"
  },
  {
    id: "robotik-club",
    name: "Robotics & Coding Club",
    category: "Akademik",
    schedule: "Rabu, 15.00 - 17.00 WIB",
    mentor: "M. Rizal Kurniawan, S.Kom.",
    achievements: "Gold Medal Indonesian Youth Robotics Competition 2025",
    description: "Wadah riset mini bagi siswa pencinta perakitan robot, sensor pintar, dan pemrograman mikrokontroler.",
    imageUrl: "/images/indo/teacher-tech.webp"
  },
  {
    id: "tari-tradisional",
    name: "Sanggar Seni Tari Tradisional",
    category: "Seni & Budaya",
    schedule: "Kamis, 15.00 - 17.00 WIB",
    mentor: "Ny. Sri Wahyuni, S.Sn.",
    achievements: "Penyaji Terbaik FLS2N Tingkat Kabupaten Gresik",
    description: "Melestarikan khazanah tari Nusantara, khususnya tari pesisir Jawa Timur dan kreasi modern bernilai luhur.",
    imageUrl: "/images/indo/students-redtie.webp"
  },
  {
    id: "futsal",
    name: "Futsal & Sepakbola Madya",
    category: "Olahraga",
    schedule: "Senin & Sabtu, 15.30 - 17.30 WIB",
    mentor: "Coach Hendra Setiawan (Lisensi D PSSI)",
    achievements: "Juara 1 Liga Pelajar SMP Se-Pantura 2025",
    description: "Latihan fisik terstruktur, teknik bermain tim, sportivitas, dan strategi pertandingan lapangan futsal berstandar.",
    imageUrl: "/images/indo/campus-front.webp"
  },
  {
    id: "english-club",
    name: "English Debate & Speech Society",
    category: "Akademik",
    schedule: "Selasa, 14.30 - 16.00 WIB",
    mentor: "Fitria Anindita, M.Pd.",
    achievements: "Juara 2 English Debate Competition UNESA 2025",
    description: "Mengembangkan kepercayaan diri berbicara publik, public speaking, story telling, dan debat kritis berbahasa Inggris.",
    imageUrl: "/images/indo/teacher-english.webp"
  },
  {
    id: "paskibra",
    name: "Paskibraka Satya Wira",
    category: "Kepemimpinan",
    schedule: "Selasa & Sabtu, 15.30 - 17.00 WIB",
    mentor: "Serka (Purn) Sudarsono",
    achievements: "Juara 1 LKBB Purna Widya Tingkat Jawa Timur",
    description: "Latihan baris-berbaris presisi, pembentukan postur tegap, loyalitas, dan penanaman rasa cinta tanah air.",
    imageUrl: "/images/indo/campus-front.webp"
  },
  {
    id: "pmr",
    name: "Palang Merah Remaja (PMR)",
    category: "Kepemimpinan",
    schedule: "Rabu, 14.30 - 16.30 WIB",
    mentor: "Siti Rahmawati, S.Kep.",
    achievements: "Kontingen Teladan Jumbara PMI Kab. Gresik",
    description: "Kecakapan pertolongan pertama, donor darah remaja, tanggap darurat bencana, dan kepedulian sosial kemanusiaan.",
    imageUrl: "/images/indo/students-redtie.webp"
  },
  {
    id: "hadrah-qasidah",
    name: "Seni Hadrah & Musik Islami",
    category: "Seni & Budaya",
    schedule: "Kamis, 15.30 - 17.00 WIB",
    mentor: "Ust. M. Sholihin",
    achievements: "Juara 1 Festival Banjari Pelajar Kabupaten",
    description: "Apresiasi seni tabuh rebana klasik & kontemporer, lantunan shalawat merdu, dan mempererat ukhuwah islamiyah.",
    imageUrl: "/images/indo/teacher-tahfidz.webp"
  }
];

export const TEACHERS: Teacher[] = [
  {
    id: "kepala-sekolah",
    name: "Drs. H. M. Zainul Arifin, M.Pd.",
    role: "Kepala Sekolah",
    subject: "Manajemen Pendidikan & Pembina Utama",
    education: "S2 Manajemen Pendidikan Universitas Negeri Surabaya",
    quote: "Pendidikan sejati bukan sekadar mengisi wadah, melainkan menyalakan api rasa ingin tahu dan keteguhan budi pekerti.",
    imageUrl: "/images/indo/headmaster.webp",
    category: "Pimpinan"
  },
  {
    id: "wakasek-kurikulum",
    name: "Hj. Nurul Hidayati, S.Pd., M.M.",
    role: "Wakil Kepala Sekolah Bidang Kurikulum",
    subject: "Matematika & Koordinator Kurikulum Merdeka",
    education: "S2 Manajemen Universitas Airlangga",
    quote: "Setiap anak memiliki ritme belajar masing-masing. Kurikulum Merdeka hadir untuk memeluk keunikan tersebut.",
    imageUrl: "/images/indo/wakasek.webp",
    category: "Pimpinan"
  },
  {
    id: "wakasek-kesiswaan",
    name: "Drs. Eko Prasetyo",
    role: "Wakil Kepala Sekolah Bidang Kesiswaan",
    subject: "Pendidikan Pancasila & Pembina OSIS",
    education: "S1 PPKn Universitas Negeri Malang",
    quote: "Disiplin lahir dari kesadaran hati, bukan paksaan. Kami mendidik dengan teladan dan ketulusan.",
    imageUrl: "/images/indo/teacher-senior.webp",
    category: "Pimpinan"
  },
  {
    id: "guru-ipa",
    name: "Budi Santoso, S.Si., M.Pd.",
    role: "Koordinator Lab Sains & STEM",
    subject: "Ilmu Pengetahuan Alam (Fisika & Biologi)",
    education: "S2 Pendidikan Sains Universitas Negeri Yogyakarta",
    quote: "Sains itu seru ketika disentuh langsung lewat eksperimen dan observasi lingkungan hidup kita.",
    imageUrl: "/images/indo/teacher-science.webp",
    category: "MIPA & Teknologi"
  },
  {
    id: "guru-bilingual",
    name: "Fitria Anindita, M.Pd.",
    role: "Koordinator Program Bilingual",
    subject: "Bahasa Inggris & Public Speaking",
    education: "S2 Pendidikan Bahasa Inggris Universitas Brawijaya",
    quote: "Language is a passport to the world. Make every word an inspiring bridge of connections.",
    imageUrl: "/images/indo/teacher-english.webp",
    category: "Bahasa & Humaniora"
  },
  {
    id: "guru-tahfidz",
    name: "Ust. Ahmad Farhan Al-Hafidz, S.Ag.",
    role: "Pembina Tahfidz & Keagamaan",
    subject: "Pendidikan Agama Islam & Al-Qur'an",
    education: "S1 UIN Sunan Ampel & Sanad Tahfidz 30 Juz",
    quote: "Al-Qur'an adalah cahaya hidup. Ketika menghafalnya dengan cinta, jalan masa depan akan dilapangkan.",
    imageUrl: "/images/indo/teacher-tahfidz.webp",
    category: "Agama & Karakter"
  },
  {
    id: "guru-informatika",
    name: "M. Rizal Kurniawan, S.Kom.",
    role: "Instruktur Robotika & Komputasi",
    subject: "Informatika & Coding Remaja",
    education: "S1 Teknik Informatika ITS Surabaya",
    quote: "Jangan cuma jadi konsumen teknologi, jadilah pencipta dan perancang solusi digital masa depan.",
    imageUrl: "/images/indo/teacher-tech.webp",
    category: "MIPA & Teknologi"
  },
  {
    id: "guru-bahasa-indo",
    name: "Dewi Lestari, S.Pd.",
    role: "Pembina Majalah Dinding & Literasi",
    subject: "Bahasa Indonesia & Penulisan Kreatif",
    education: "S1 Sastra Indonesia Universitas Airlangga",
    quote: "Dengan membaca kita mengenal dunia, dengan menulis kita mencatatkan jejak di dunia.",
    imageUrl: "/images/indo/wakasek.webp",
    category: "Bahasa & Humaniora"
  }
];

export const NEWS: NewsItem[] = [
  {
    id: "robotik-emas-2026",
    slug: "tim-robotik-smp-ujungpangkah-raih-medali-emas-nasional",
    title: "Tim Robotik Sekolah-Q Raih Medali Emas di National STEM Olympiad 2026",
    category: "Prestasi",
    date: "18 April 2026",
    author: "Tim Humas SMP",
    readTime: "4 menit baca",
    featured: true,
    summary: "Prestasi membanggakan kembali diukir siswa Sekolah-Q dalam ajang bergengsi National STEM Olympiad di Jakarta dengan inovasi perahu drone pemantau kualitas air pesisir.",
    content: [
      "Jakarta — Prestasi membanggakan ditorehkan oleh kontingen robotik Sekolah-Q dalam ajang National STEM Olympiad 2026 yang berlangsung di Balai Sidang Jakarta akhir pekan lalu.",
      "Karya inovatif berjudul 'Autonomous Marine Drone for Coastal Water Monitoring' berhasil memikat dewan juri dan menyisihkan lebih dari 120 tim sekolah menengah dari seluruh Indonesia.",
      "Ketua tim, Muhammad Zaki (Kelas 8-A), mengungkapkan bahwa ide ini lahir dari kepedulian terhadap kelestarian kawasan pesisir Ujungpangkah. Robot perahu mini ini dilengkapi sensor pH, kekeruhan air, dan transmisi data GPS otomatis via IoT.",
      "Kepala Sekolah Sekolah-Q menyampaikan apresiasi mendalam: 'Ini bukti nyata bahwa pembelajaran berbasis proyek dan sains terapan di sekolah kami melahirkan solusi aplikatif bagi lingkungan hidup. Selamat kepada seluruh siswa dan guru pembina!'"
    ],
    imageUrl: "/images/indo/teacher-tech.webp"
  },
  {
    id: "ppdb-gelombang-1-buka",
    slug: "penerimaan-peserta-didik-baru-gelombang-1-resmi-dibuka",
    title: "PPDB Tahun Ajaran 2026/2027 Gelombang 1 Resmi Dibuka: Simak Alur & Syaratnya",
    category: "Pengumuman",
    date: "12 April 2026",
    author: "Panitia PPDB 2026",
    readTime: "3 menit baca",
    featured: true,
    summary: "Pendaftaran siswa baru Sekolah-Q telah dibuka melalui jalur Zonasi, Prestasi, dan Afirmasi. Dapatkan beasiswa pendidikan bagi pendaftar berprestasi.",
    content: [
      "Sekolah-Q secara resmi membuka Penerimaan Peserta Didik Baru (PPDB) Tahun Pelajaran 2026/2027 untuk Gelombang 1 mulai tanggal 15 April hingga 30 Mei 2026.",
      "Tahun ini sekolah menyediakan kuota sebanyak 360 kursi yang terbagi dalam 10 rombongan belajar unggulan, termasuk Kelas Bilingual dan Kelas Riset STEM.",
      "Jalur pendaftaran terbagi menjadi 4: Jalur Prestasi Akademik/Non-Akademik, Jalur Zonasi Domisili, Jalur Afirmasi Keluarga Sejahtera, serta Jalur Perpindahan Tugas Orang Tua.",
      "Orang tua dan calon siswa dapat mengunduh formulir, mengecek syarat kelengkapan berkas, atau datang langsung ke sekretariat PPDB di Gedung Utama sekolah setiap hari kerja pukul 08.00 - 15.00 WIB."
    ],
    imageUrl: "/images/indo/hero-students.webp"
  },
  {
    id: "proyek-p5-mangrove",
    slug: "gelar-karya-p5-eksplorasi-ekosistem-mangrove-ujungpangkah",
    title: "Gelar Karya P5: Ratusan Siswa Tanam 1.000 Bibit Mangrove & Pameran Olahan Pesisir",
    category: "Kegiatan",
    date: "05 April 2026",
    author: "Koordinator P5",
    readTime: "5 menit baca",
    summary: "Wujud nyata Kurikulum Merdeka, siswa kelas 7 dan 8 mengadakan aksi konservasi penanaman mangrove serta memamerkan inovasi produk olahan berbahan dasar kekayaan laut lokal.",
    content: [
      "Kawasan Pesisir Banyuurip, Ujungpangkah — Sebanyak 380 siswa Sekolah-Q memenuhi pesisir mangrove dalam gelaran puncak Proyek Penguatan Profil Pelajar Pancasila (P5) bertema 'Gaya Hidup Berkelanjutan'.",
      "Selain menanam 1.000 bibit mangrove jenis Rhizophora, para siswa juga melakukan presentasi ilmiah mengenai dampak ekologis hutan bakau terhadap pencegahan abrasi pantai.",
      "Di area sekolah, kegiatan dilanjutkan dengan pameran kuliner kreatif dan kerajinan siswa yang memanfaatkan potensi lokal secara bijak tanpa merusak lingkungan.",
      "'Kami ingin anak-anak tidak hanya cerdas di dalam kelas ber-AC, tetapi memiliki ikatan batin dan tanggung jawab terhadap tanah kelahiran mereka,' tutur Ibu Hj. Nurul Hidayati."
    ],
    imageUrl: "/images/indo/classroom-lab.webp"
  },
  {
    id: "wisuda-tahfidz-angkatan-vi",
    slug: "wisuda-tahfidz-angkatan-ke-6-sebanyak-75-siswa-khatam-3-juz",
    title: "Wisuda Tahfidz Angkatan Ke-6: 75 Siswa Berhasil Mengkhatamkan Hafalan Mutqin 3 Juz",
    category: "Prestasi",
    date: "25 Maret 2026",
    author: "Tim Keagamaan",
    readTime: "3 menit baca",
    summary: "Suasana haru menyelimuti Graha Utama saat para wisudawan tahfidz menyematkan mahkota kehormatan kepada kedua orang tua masing-masing.",
    content: [
      "Acara Wisuda Tahfidz ke-6 Sekolah-Q diselenggarakan khidmat dengan dihadiri jajaran pengawas dinas pendidikan dan seluruh wali murid wisudawan.",
      "Sebanyak 75 siswa resmi diwisuda setelah dinyatakan lulus dalam ujian tasmi' sekali duduk 3 Juz (Juz 30, 29, dan 28) di hadapan para hafiz dan ulama pembina.",
      "Program tahfidz terbukti membantu siswa mengasah konsentrasi belajar sehingga tetap berprestasi gemilang di mata pelajaran eksakta dan umum."
    ],
    imageUrl: "/images/indo/teacher-tahfidz.webp"
  },
  {
    id: "tips-belajar-efektif",
    slug: "tips-belajar-efektif-dan-menyenangkan-ala-guru-penggerak",
    title: "Membangun Nalar Kritis: Tips Belajar Menyenangkan untuk Remaja Abad 21",
    category: "Artikel Guru",
    date: "14 Maret 2026",
    author: "Dewi Lestari, S.Pd.",
    readTime: "4 menit baca",
    summary: "Bagaimana cara mendampingi remaja usia SMP agar gemar membaca, mampu menyaring informasi digital secara bijak, dan tidak stres menghadapi ujian?",
    content: [
      "Masa remaja di jenjang SMP adalah fase krusial pembentukan jati diri dan kemampuan berpikir abstrak.",
      "Kunci belajar efektif bukan hafalan berjam-jam, melainkan pemahaman konsep mendalam dan kemampuan menghubungkan materi dengan keseharian.",
      "Simak 5 strategi belajar berbasis 'Feynman Technique' dan manajemen waktu Pomodoro yang diterapkan guru-guru di Sekolah-Q."
    ],
    imageUrl: "/images/indo/teacher-english.webp"
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: "g1",
    title: "Upacara Hari Kemerdekaan & Parade Seragam Paskibra",
    category: "Ekstrakurikuler",
    imageUrl: "/images/indo/campus-front.webp",
    date: "Agustus 2025",
    caption: "Kekhidmatan tim Paskibraka Sekolah-Q dalam mengibarkan Sang Merah Putih di lapangan utama."
  },
  {
    id: "g2",
    title: "Eksperimen Fisika & Kimia di Laboratorium IPA Modern",
    category: "Akademik",
    imageUrl: "/images/indo/teacher-science.webp",
    date: "Oktober 2025",
    caption: "Siswa kelas 8 mengamati struktur mikroskopis alga laut dan reaksi fotosintesis."
  },
  {
    id: "g3",
    title: "Final Liga Futsal Antar-Sekolah Menengah Tingkat Kabupaten",
    category: "Ekstrakurikuler",
    imageUrl: "/images/indo/campus-front.webp",
    date: "November 2025",
    caption: "Detik-detik kemenangan tim futsal Sekolah-Q mengangkat trofi kejuaraan."
  },
  {
    id: "g4",
    title: "Perpustakaan Digital 'Cahaya Ilmu' yang Nyaman & Lengkap",
    category: "Fasilitas",
    imageUrl: "/images/indo/teacher-english.webp",
    date: "Desember 2025",
    caption: "Koleksi lebih dari 8.000 buku fisik dan ribuan e-book literasi yang bisa diakses dengan tablet sekolah."
  },
  {
    id: "g5",
    title: "Penerimaan Medali Emas National STEM Olympiad",
    category: "Prestasi",
    imageUrl: "/images/indo/teacher-tech.webp",
    date: "April 2026",
    caption: "Tim Robotika bersama Kepala Sekolah di podium kehormatan juara 1 nasional."
  },
  {
    id: "g6",
    title: "Smart Classroom Berpendingin Udara & Multimedia Interaktif",
    category: "Fasilitas",
    imageUrl: "/images/indo/classroom-lab.webp",
    date: "Januari 2026",
    caption: "Suasana ruang kelas representatif yang mendukung konsentrasi belajar maksimal."
  },
  {
    id: "g7",
    title: "Pementasan Seni Siswa Sekolah-Q",
    category: "Ekstrakurikuler",
    imageUrl: "/images/indo/students-redtie.webp",
    date: "Februari 2026",
    caption: "Keanggunan gerak seni dan kreativitas siswa Sekolah-Q."
  },
  {
    id: "g8",
    title: "Aksi Konservasi Pesisir dan Gerakan Sekolah Adiwiyata",
    category: "Akademik",
    imageUrl: "/images/indo/hero-students.webp",
    date: "April 2026",
    caption: "Pembelajaran luar kelas menjaga keanekaragaman hayati pesisir Jawa Timur."
  }
];

export const PPDB_PHASES: PPDBPhase[] = [
  {
    phase: "Gelombang 1",
    name: "Jalur Prestasi & Minat Bakat",
    dateRange: "15 April – 30 Mei 2026",
    status: "Sedang Berlangsung",
    quota: "160 Siswa",
    desc: "Bagi calon siswa pemilik sertifikat kejuaraan akademik/non-akademik minimal tingkat kabupaten atau sertifikat hafalan Qur'an minimal 1 Juz. Bebas biaya pendaftaran dan beasiswa SPP."
  },
  {
    phase: "Gelombang 2",
    name: "Jalur Reguler & Zonasi Lingkungan",
    dateRange: "01 Juni – 05 Juli 2026",
    status: "Segera Dibuka",
    quota: "160 Siswa",
    desc: "Terbuka bagi lulusan SD/MI di wilayah kecamatan Ujungpangkah dan sekitarnya berdasarkan nilai rapor dan jarak domisili."
  },
  {
    phase: "Gelombang 3",
    name: "Jalur Afirmasi & Pemenuhan Kuota",
    dateRange: "07 Juli – 12 Juli 2026",
    status: "Mendatang",
    quota: "40 Siswa",
    desc: "Khusus bagi siswa dari keluarga prasejahtera pemilik KIP/PKH dan perpindahan domisili tugas dinas orang tua."
  }
];

export const PPDB_REQUIREMENTS = [
  { id: "req1", title: "Fotokopi Ijazah / Surat Keterangan Lulus (SKL) SD/MI yang telah dilegalisir (2 lembar)" },
  { id: "req2", title: "Fotokopi Rapor Kelas 4, 5, dan 6 Semester Ganjil dilegalisir kepala sekolah" },
  { id: "req3", title: "Fotokopi Akta Kelahiran & Kartu Keluarga (KK) terbaru (2 lembar)" },
  { id: "req4", title: "Pasfoto terbaru ukuran 3x4 berwarna dengan latar belakang biru (4 lembar)" },
  { id: "req5", title: "Fotokopi Piagam/Sertifikat Kejuaraan minimal tingkat kecamatan/kabupaten (khusus Jalur Prestasi)" },
  { id: "req6", title: "Fotokopi Kartu Indonesia Pintar (KIP) atau bukti PKH (khusus Jalur Afirmasi)" }
];

export const FAQ_LIST: FAQItem[] = [
  {
    question: "Bagaimana alur pendaftaran PPDB di Sekolah-Q?",
    answer: "Alur pendaftaran sangat mudah: (1) Mengisi formulir pendaftaran baik secara daring di website ini atau langsung ke loket sekolah; (2) Menyerahkan berkas persyaratan verifikasi; (3) Mengikuti observasi minat bakat dan tes diagnostik; (4) Pengumuman hasil seleksi; (5) Daftar ulang dan pembagian atribut seragam sekolah.",
    category: "Pendaftaran"
  },
  {
    question: "Apa saja program unggulan pembeda di Sekolah-Q?",
    answer: "Sekolah-Q memiliki 4 pilar keunggulan utama: Kurikulum Merdeka Berbasis Proyek (P5), Program Kelas Bilingual (dwibahasa MIPA & Bahasa Inggris dengan modul standar internasional), Program Tahfidz Al-Qur'an 3 Juz mutqin, serta Laboratorium STEM & Inovasi Robotika yang telah berprestasi tingkat nasional.",
    category: "Akademik"
  },
  {
    question: "Apakah tersedia program beasiswa bagi siswa berprestasi atau prasejahtera?",
    answer: "Ya, kami berkomitmen tidak ada anak putus sekolah karena kendala biaya. Tersedia Beasiswa Prestasi Bebas Biaya Pengembangan untuk juara OSN/FLS2N/O2SN tingkat kabupaten ke atas, Beasiswa Hafiz Qur'an, serta program Beasiswa Peduli Asuh untuk siswa pemegang KIP/PKH.",
    category: "Biaya & Beasiswa"
  },
  {
    question: "Fasilitas apa saja yang disediakan untuk mendukung kenyamanan belajar?",
    answer: "Seluruh ruang kelas berpendingin udara (AC) dengan smart projector interaktif, Laboratorium Sains terpadu, Laboratorium Komputer & STEM berkecepatan tinggi, Perpustakaan Digital, Lapangan Futsal & Basket representatif, Masjid Sekolah 'Al-Hikmah', Kantin Sehat, serta area parkir aman dan diawasi CCTV 24 jam.",
    category: "Fasilitas"
  },
  {
    question: "Apakah siswa diperbolehkan mengikuti lebih dari satu kegiatan ekstrakurikuler?",
    answer: "Setiap siswa diwajibkan mengikuti Ekstrakurikuler Wajib Pramuka (kelas 7), serta dapat memilih maksimal 2 ekstrakurikuler peminatan (misalnya Robotika dan Futsal) asalkan jadwal kegiatan tidak saling bertabrakan.",
    category: "Akademik"
  },
  {
    question: "Kapan jadwal jam belajar reguler di Sekolah-Q?",
    answer: "Pembelajaran reguler berlangsung selama 5 hari sekolah (Senin sampai Jumat), mulai pukul 07.00 WIB diawali dengan pembiasaan sholat dhuha / literasi pagi, dan berakhir pada pukul 14.30 WIB (dilanjutkan kegiatan ekstrakurikuler bagi yang memiliki jadwal). Hari Sabtu diperuntukkan bagi pembinaan prestasi dan kegiatan kepramukaan.",
    category: "Akademik"
  }
];

export const TESTIMONIALS = [
  {
    id: "t1",
    name: "Dr. Rizky Ramadhan, S.T., M.Eng.",
    role: "Alumni 2012 — Dosen & Peneliti Robotika",
    quote: "Kecintaan saya pada dunia teknologi pertama kali dipupuk di laboratorium komputer dan bimbingan guru-guru hebat Sekolah-Q. Nilai kemandirian dan integritas yang ditanamkan sangat membentuk karier saya hingga menyelesaikan studi di Jepang.",
    image: "/images/indo/teacher-tech.webp"
  },
  {
    id: "t2",
    name: "Nabila Zahra Khairunnisa",
    role: "Alumni 2023 — Juara 1 Debat Bahasa Inggris Prov. Jatim",
    quote: "Program Bilingual di Sekolah-Q membuat saya berani berbicara di depan khalayak ramai tanpa ragu. Guru-gurunya begitu suportif dan fasilitasnya setara sekolah swasta internasional di kota besar.",
    image: "/images/indo/teacher-english.webp"
  },
  {
    id: "t3",
    name: "H. Sulaiman & Hj. Wardah",
    role: "Wali Murid Siswa Kelas 9",
    quote: "Alhamdulillah putra kami tidak hanya pintar mata pelajaran sains, hafalan Al-Qur'annya juga bertambah 3 Juz dengan bacaan yang fasih dan adab kepada orang tua yang semakin santun. Sangat bersyukur menyekolahkan anak di sini.",
    image: "/images/indo/headmaster.webp"
  },
  {
    id: "t4",
    name: "Farhan Maulana Al-Ghifari",
    role: "Alumni 2024 — Peraih Medali Emas OSN Matematika",
    quote: "Bimbingan intensif dari para guru MIPA sangat berkesan. Di sini kami tidak dipaksa menghafal rumus, melainkan dilatih memahami konsep dengan logika yang menyenangkan.",
    image: "/images/indo/students-redtie.webp"
  },
  {
    id: "t5",
    name: "Ibu Ratna Kusuma, S.E.",
    role: "Wali Murid Siswa Kelas 8",
    quote: "Lingkungan belajarnya sangat ramah dan positif. Perkembangan karakter putri kami luar biasa mandiri, santun dalam bertutur kata, dan selalu antusias berangkat sekolah.",
    image: "/images/indo/wakasek.webp"
  },
  {
    id: "t6",
    name: "M. Zidan Prasetya",
    role: "Alumni 2021 — Siswa Teladan & Hafiz Qur'an",
    quote: "Keseimbangan antara tahfidz, sains, dan pembinaan karakter di Sekolah-Q menjadi bekal terbaik saya untuk melanjutkan ke jenjang SMA favorit dengan penuh percaya diri.",
    image: "/images/indo/hero-students.webp"
  }
];
