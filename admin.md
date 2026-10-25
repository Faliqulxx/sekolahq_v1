# 📘 Dokumentasi Lengkap Admin Panel & Portal Akademik SEKOLAH-Q
*(Materio MUI Next.js Enterprise School Management System)*

Dokumen ini menjelaskan secara menyeluruh seluruh fitur, komponen, tata letak, fungsi, dan arsitektur data yang ada di dalam **Admin Panel SEKOLAH-Q** (`/admin`) dan **Portal Wali Kelas** (`/wali-kelas`).

---

## 📑 Daftar Isi
1. [Ringkasan & Filosofi Desain](#1-ringkasan--filosofi-desain)
2. [Akses Rute & Struktur Navigasi](#2-akses-rute--struktur-navigasi)
3. [Arsitektur Data Dummy Terpusat (academicData.ts)](#3-arsitektur-data-dummy-terpusat-academicdatats)
4. [Tujuh Fitur Utama Admin (Preserved)](#4-tujuh-fitur-utama-admin-preserved)
5. [Sembilan Fitur Baru Manajemen Akademik (Admin Panel)](#5-sembilan-fitur-baru-manajemen-akademik-admin-panel)
   - [5.1 Dashboard Akademik](#51-dashboard-akademik)
   - [5.2 Tahun Ajaran & Semester](#52-tahun-ajaran--semester)
   - [5.3 Data Siswa (Peserta Didik)](#53-data-siswa-peserta-didik)
   - [5.4 Kelas & Rombongan Belajar (Rombel)](#54-kelas--rombongan-belajar-rombel)
   - [5.5 Mata Pelajaran & Kurikulum](#55-mata-pelajaran--kurikulum)
   - [5.6 Penugasan Guru & Wali Kelas](#56-penugasan-guru--wali-kelas)
   - [5.7 Jadwal Pelajaran Mingguan](#57-jadwal-pelajaran-mingguan)
   - [5.8 Akun Pengguna & Hak Akses (Role Permissions)](#58-akun-pengguna--hak-akses-role-permissions)
   - [5.9 Monitoring Presensi Terpadu (Admin Panel)](#59-monitoring-presensi-terpadu-admin-panel)
6. [Portal Pendidik: Wali Kelas & Guru Mata Pelajaran (/wali-kelas)](#6-portal-pendidik-wali-kelas--guru-mata-pelajaran-wali-kelas)
   - [6.1 Dashboard Wali Kelas & Guru](#61-dashboard-wali-kelas--guru)
   - [6.2 Kelas Saya (Roster Siswa & Pengurus Kelas)](#62-kelas-saya-roster-siswa--pengurus-kelas)
   - [6.3 Presensi Harian (Wali Kelas)](#63-presensi-harian-wali-kelas)
   - [6.4 Rekap Presensi Multi-Tab (Wali Kelas)](#64-rekap-presensi-multi-tab-wali-kelas)
   - [6.5 Presensi Mata Pelajaran / KBM (Guru Mapel)](#65-presensi-mata-pelajaran--kbm-guru-mapel)
   - [6.6 Riwayat Presensi Guru (Guru Mapel)](#66-riwayat-presensi-guru-guru-mapel)
   - [6.7 Rekap Presensi Mengajar (Guru Mapel)](#67-rekap-presensi-mengajar-guru-mapel)
   - [6.8 Jadwal Pembelajaran Kelas & Mengajar](#68-jadwal-pembelajaran-kelas--mengajar)
   - [6.9 Rekapitulasi Nilai & Catatan Wali Kelas](#69-rekapitulasi-nilai--catatan-wali-kelas)
   - [6.10 Laporan Leger Siap Cetak](#610-laporan-leger-siap-cetak)
7. [Sistem Presensi Ganda Terpisah & Aturan Bisnis](#7-sistem-presensi-ganda-terpisah--aturan-bisnis)
8. [Simulasi Demo Role Switcher](#8-simulasi-demo-role-switcher)
9. [Panduan Integrasi Database Masa Depan (Backend / Supabase)](#9-panduan-integrasi-database-masa-depan-backend--supabase)

---

## 1. Ringkasan & Filosofi Desain

Sistem dibangun mengadopsi bahasa desain **Materio MUI Next.js Enterprise Admin Template** dengan konsistensi visual:
* **Primary Palette**: `#8C57FF` (ungu Materio) dengan gradasi lembut `#9E6FFF`.
* **Secondary Info Accent**: `#16B1FF` (biru langit untuk portal guru dan data siswa).
* **Canvas Background**: `#F4F5FA` (abu-abu netral terang profesional).
* **Card Surface**: `#FFFFFF` bersih dengan radius sudut membulat `rounded-xl`, border tipis `#E7E7E9`, dan soft drop-shadow.
* **Tonal Chips**: Pill status dengan latar 12% opacity untuk feedback visual instan (Hadir, Sakit, Izin, Alpa, Tuntas, Remedial, Aktif).
* **100% Frontend-Only**: Beroperasi sepenuhnya di sisi klien menggunakan React State terpusat tanpa ketergantungan API/backend produksi.

---

## 2. Akses Rute & Struktur Navigasi

| Rute URL | Pengguna Sasaran | File Komponen | Deskripsi |
|---|---|---|---|
| `http://localhost:3000/admin` | Super Admin / Pimpinan Sekolah | `src/app/admin/page.tsx` | Pusat administrasi sekolah: PPDB, Berita, Dewan Guru, Galeri, Pesan, Konfigurasi, dan 8 Menu Manajemen Akademik. |
| `http://localhost:3000/wali-kelas` | Wali Kelas (Bapak Budi Santoso) | `src/app/wali-kelas/page.tsx` | Portal internal khusus wali kelas: roster siswa rombel, presensi harian, nilai leger, dan laporan cetak. |
| `http://localhost:3000/` | Publik / Calon Siswa | `src/app/page.tsx` | Website landing page publik profil sekolah SMP Sekolah-Q. |

Kedua rute internal (`/admin` dan `/wali-kelas`) ditangani secara otomatis oleh `src/components/SiteShell.tsx` agar tidak memuat navbar/footer publik.

---

## 3. Arsitektur Data Dummy Terpusat (`academicData.ts`)

Seluruh data akademik disimpan secara relasional dan terpusat di file **`src/data/academicData.ts`**:

1. **`MOCK_ACADEMIC_YEARS`**: Data periode tahun ajaran (2026/2027 Ganjil - Aktif, 2025/2026 Genap - Arsip, 2026/2027 Genap - Rencana).
2. **`MOCK_CLASSES`**: 6 rombel (Kelas 7-A, 7-B, 8-A, 8-B, 9-A, 9-B) lengkap dengan wali kelas terdaftar, ruang kelas, dan kapasitas kursi.
3. **`MOCK_STUDENTS`**: Peserta didik fiktif dengan NISN 10-digit, NIS lokal, foto profil, jenis kelamin, asal sekolah, kontak orang tua, dan status aktif.
4. **`MOCK_SUBJECTS`**: 9 mata pelajaran kurikulum (Matematika, IPA, B. Indonesia, B. Inggris, PAI, IPS, PJOK, Informatika & Robotika, Tahfidz).
5. **`MOCK_HOMEROOM_ASSIGNMENTS`**: Penetapan wali kelas 1:1 per rombongan belajar.
6. **`MOCK_TEACHING_ASSIGNMENTS`**: Surat Keputusan (SK) beban jam mengajar guru per mata pelajaran dan kelas sasaran.
7. **`MOCK_SCHEDULES`**: Jadwal pelajaran mingguan (Senin s.d. Jumat) terhindar dari benturan jam dan ruang.
8. **`MOCK_ATTENDANCE`**: Presensi harian siswa (Hadir, Sakit, Izin, Alpa) dan catatan izin.
9. **`MOCK_GRADES`**: Nilai tugas, PTS, PAS, rata-rata, predikat nilai (A/B/C/D), status ketuntasan, dan catatan wali kelas.
10. **`MOCK_USERS`**: Akun pengguna ber-role Admin, Wali Kelas, dan Guru Pengampu.

---

## 4. Tujuh Fitur Utama Admin (Preserved)

Ketujuh modul awal tetap utuh 100% dan dapat diakses melalui kelompok sidebar **MENU UTAMA**:
1. **Dashboard Ringkasan**: Trophy Hero Card pencapaian PPDB 73.9%, 4 micro-KPI cards (+trend %), dan progress meter kuota.
2. **Pendaftar PPDB**: Pencarian multi-kriteria, filter status/jalur, export CSV, tombol hubungi WhatsApp langsung, dan aksi verifikasi berkas.
3. **Berita & Prestasi**: Publikasi warta sekolah, kategori, dan upload foto cover dari perangkat lokal dengan live preview.
4. **Dewan Guru & Staf**: Statistik tenaga pengajar, filter rumpun ilmu, profil pendidik, dan tambah guru baru beserta fotonya.
5. **Galeri Dokumentasi**: Album fasilitas dan kegiatan siswa, pratinjau rasio 4:3, dan modal upload foto.
6. **Kotak Pesan Masuk**: Inbox pesan wali murid dari form kontak, toggle baca/belum baca, dan balas via WA/Email.
7. **Pengaturan Website**: Identitas NPSN, akreditasi, alamat, teks running announcement bar, dan akun media sosial.

---

## 5. Delapan Fitur Baru Manajemen Akademik (Admin Panel)

Dikelompokkan secara rapi di sidebar navigasi dengan label **MANAJEMEN AKADEMIK [BARU]**:

### 5.1 Dashboard Akademik
* Ringkasan eksekutif: Total rombel aktif (6 rombel), total siswa demo (780+ siswa sekolah), wali kelas terisi 100% (6/6), dan total jam tatap muka terjadwal (38 Jam/Minggu).
* Grafik meteran proporsi siswa per tingkat (Tingkat 7: 34%, Tingkat 8: 33%, Tingkat 9: 33%).
* Kartu rombel ringkas dan pintasan cepat (*Quick Actions*) ke pengelolaan kurikulum.

### 5.2 Tahun Ajaran & Semester
* Daftar periode tahun ajaran aktif, arsip, dan rencana.
* Aksi demo **"Pilih Jadi Aktif"**: Mengubah status periode aktif secara real-time dan mengarsipkan periode lainnya.
* Modal tambah periode baru dan modal edit tanggal kalender akademik.

### 5.3 Data Siswa (Peserta Didik)
* Tabel data siswa terintegrasi dengan filter bertingkat (*Semua Tingkat, Semua Rombel, Semua Status*).
* Kotak pencarian responsif (*Nama Siswa, NISN, atau NIS*).
* Aksi **Export CSV**: Mengunduh data siswa tersaring ke format Excel/Spreadsheet.
* Modal **Registrasi Siswa Baru**: Formulir lengkap nama, NISN, NIS, jenis kelamin, pilihan rombel, asal sekolah, dan nomor kontak orang tua.
* Modal **Edit Data Siswa** dan **Pindah Kelas**.
* Modal **Detail Profil Siswa** (dengan link chat WhatsApp langsung ke wali murid).
* Dialog konfirmasi hapus data siswa yang aman.

### 5.4 Kelas & Rombongan Belajar (Rombel)
* Kartu rombel dikelompokkan berdasarkan tab tingkat (*Semua, Tingkat 7, Tingkat 8, Tingkat 9*).
* Progress bar kapasitas kursi kelas (misal: 31 / 32 siswa - 97% terisi).
* Validasi demo cerdas: Mencegah duplikasi nama kelas dalam tingkat dan tahun ajaran yang sama.
* Tombol **"Daftar Siswa"**: Membuka modal roster seluruh siswa yang terdaftar dalam rombel tersebut.
* Modal edit kelas dan ganti penugasan wali kelas.

### 5.5 Mata Pelajaran & Kurikulum
* Kartu mata pelajaran kurikulum merdeka (Matematika, IPA, Bahasa Indonesia, Bahasa Inggris, PAI, IPS, PJOK, Informatika, Tahfidz).
* Informasi kode mapel, rumpun kategori, beban jam mengajar per minggu, dan nilai KKM ketuntasan.
* Modal tambah mata pelajaran, edit beban jam/KKM, dan modal detail silabus pembelajaran.

### 5.6 Penugasan Guru & Wali Kelas
Menerapkan pemisahan 2 tanggung jawab pendidik secara tegas:
1. **Penugasan Wali Kelas**:
   * Penetapan 1 guru membina 1 rombel per tahun ajaran.
   * Indikator status SK Penetapan aktif dan tombol ganti wali kelas.
2. **Penugasan Guru Mata Pelajaran (SK KBM)**:
   * Menugaskan guru mengajar mata pelajaran tertentu pada satu atau beberapa kelas sasaran.
   * Tabel daftar SK Beban Mengajar, alokasi jam/minggu, dan modal tambah penugasan baru.

### 5.7 Jadwal Pelajaran Mingguan
* Dua mode tampilan fleksibel:
  * **Mode per Rombel Kelas**: Memantau jadwal belajar kelas tertentu (misal: Kelas 8-A).
  * **Mode per Guru Pengampu**: Memantau jadwal mengajar seorang guru agar tidak tabrakan jam.
* Tampilan kartu hari (Senin s.d. Jumat) yang ramah layar smartphone maupun desktop.
* Modal tambah sesi jadwal KBM baru (pilihan hari, jam mulai, jam selesai, mapel, kelas, dan ruang kelas).
* **Sistem Deteksi & Pencegahan Bentrokan Jadwal Real-Time (Conflict Prevention)**:
  * **Pencegahan Bentrok Kelas**: Sistem secara otomatis mengecek apakah kelas sasaran sudah memiliki jadwal pelajaran pada hari dan jam yang beririsan. Jika ada, muncul kotak peringatan merah tebal dan tombol simpan dinonaktifkan (disabled).
  * **Pencegahan Bentrok Guru**: Sistem mendeteksi jika guru pengampu sudah memiliki jadwal mengajar di kelas lain pada hari dan jam yang sama/beririsan. Kotak peringatan detail akan menginformasikan nama kelas dan mapel yang bentrok, serta mencegah penyimpanan.
  * **Validasi Rentang Waktu**: Memvalidasi agar jam selesai selalu lebih besar dari jam mulai.
  * **Status Ketersediaan**: Jika slot waktu dan guru aman, muncul indikator hijau *"Waktu & Guru Tersedia"*.
* Tombol cetak jadwal pembelajaran tatap muka (`window.print()`).

### 5.8 Akun Pengguna & Hak Akses (Role Permissions)
* Tabel akun tenaga pendidik lengkap dengan username, email resmi, role akses, status aktif/nonaktif, dan waktu login terakhir.
* Matriks penjelas izin akses (*Super Administrator*, *Wali Kelas*, *Guru Pengampu*).
* Tombol aksi cepat: **"Buka Portal"** untuk menguji coba tampilan sebagai Wali Kelas atau Guru.
* Modal buat akun pengguna baru yang terhubung ke data pendidik.

### 5.9 Monitoring Presensi Terpadu (Admin Panel)
Modul pengawasan kehadiran terpusat di `/admin` dengan navigasi sidebar **"Monitoring Presensi"**:
* **4 Kartu Ringkasan Eksekutif (Live KPI Cards)**:
  1. **Presensi Harian Rata-rata**: Persentase kehadiran seluruh kelas harian (contoh: 96.7%).
  2. **Presensi Mapel KBM**: Persentase kehadiran akumulatif dari semua sesi pelajaran tatap muka (contoh: 94.2%).
  3. **Sesi KBM Terisi**: Jumlah sesi presensi yang sudah selesai dicatat oleh guru mapel.
  4. **Sesi Belum Diisi / Pending**: Peringatan jumlah sesi yang perlu segera ditindaklanjuti.
* **Filter Multi-Kriteria Interaktif**:
  * Filter rentang tanggal presensi.
  * Filter tipe presensi (*Semua Tipe*, *Presensi Harian Rombel*, *Presensi Mata Pelajaran KBM*).
  * Filter kelas sasaran (Semua Kelas, 7-A, 7-B, 8-A, 8-B, 9-A, 9-B).
  * Filter status pencatatan (*Semua Status*, *Sudah Disimpan*, *Belum Diisi*).
  * Kolom pencarian dinamis (nama guru, mata pelajaran, atau kode sesi).
* **Tabel Monitoring Terpadu**:
  * Menampilkan data sesi harian dan sesi pelajaran KBM dalam satu daftar terstruktur.
  * Kolom: Tanggal, Kelas, Tipe Presensi (Badge Tonal Hijau untuk Harian, Ungu untuk Mapel KBM), Mata Pelajaran, Guru Pencatat, Total Siswa, Status Selesai/Belum Diisi, dan Persentase Kehadiran dengan progress bar visual.
* **Modal Inspeksi "Detail Siswa"**:
  * Membuka breakdown lengkap kehadiran per siswa (Nama, NISN, Status Kehadiran, dan Catatan Alasan Izin/Sakit).
* **Export Laporan Presensi (CSV)**:
  * Mengunduh file CSV komprehensif sesuai filter yang sedang aktif, mencakup tanggal, kelas, tipe, guru, statistik hadir/sakit/izin/alpa, dan persentase kehadiran.

---

## 6. Portal Pendidik: Wali Kelas & Guru Mata Pelajaran (`/wali-kelas`)

Portal internal multifungsi yang dirancang khusus untuk tenaga pendidik. Mendukung **peran ganda (Dual Role)** secara bersamaan tanpa perlu logout atau akun terpisah:
* Contoh Nyata: **Bapak Budi Santoso, S.Si., M.Pd.** memegang peran ganda:
  1. Sebagai **Wali Kelas 8-A (Al-Khawarizmi)**.
  2. Sebagai **Guru Mata Pelajaran Ilmu Pengetahuan Alam (IPA)** di kelas 8-A, 8-B, dan 9-A.
* **Tombol Pengalih Peran (Role Switcher Chip)**: Di floating header portal, guru dapat berpindah dengan 1 klik antara mode *"Wali Kelas (8-A)"* dan *"Guru Pengampu (IPA)"*.

---

### Fitur Mode Wali Kelas:

#### 6.1 Dashboard Wali Kelas
* Ucapan salam personalisasi dan profil wali kelas.
* Kartu ringkasan kehadiran hari ini: Hadir, Sakit, Izin, dan Alpa, serta persentase kehadiran kelas.
* Rata-rata nilai rapor kelas saat ini (86.4).
* Jadwal mata pelajaran yang berlangsung hari ini di kelas 8-A.
* Warta pengumuman akademik terbaru dari pihak sekolah.

#### 6.2 Kelas Saya (Roster Siswa & Pengurus Kelas)
* **Struktur Pengurus Kelas Fleksibel & Dinamis**:
  * Pengurus kelas ditentukan penuh oleh Wali Kelas.
  * Penambahan jabatan kustom tanpa batas (Ketua, Wakil, Sekretaris, Bendahara 1 & 2, Seksi Keamanan, Kebersihan, Kerohanian, dll.).
  * Modal "Kelola & Tambah Jabatan" dengan edit nama jabatan, pemilihan siswa, hapus jabatan, dan chip template cepat.
* Tabel roster siswa Kelas 8-A dengan foto profil, NISN, NIS, jenis kelamin, dan nomor WA orang tua.
* Modal laci detail data pribadi siswa.

#### 6.3 Presensi Harian (Wali Kelas)
Sistem presensi masuk sekolah harian khusus untuk kelas bimbingan perwalian:
* **Pemilih Tanggal**: Memilih tanggal kalender untuk menginput atau mengecek absensi.
* **Aksi Cepat "Tandai Semua Hadir"**: Setel status seluruh siswa menjadi Hadir dalam 1 klik.
* **Tombol Status Cepat per Siswa**:
  * `H` (Hadir - Hijau)
  * `S` (Sakit - Oranye)
  * `I` (Izin - Biru)
  * `A` (Alpa - Merah)
* **Pencatatan Alasan / Keterangan**:
  * Input langsung di tabel (*inline text input*).
  * Modal pilihan template cepat (*Demam/Panas, Surat Dokter Terlampir, Izin Acara Keluarga, Dispensasi Lomba, Tanpa Keterangan*).
* **Live Attendance Summary Cards**:
  * Total Siswa, Hadir, Sakit, Izin, Alpa, dan Persentase Kehadiran terhitung otomatis secara reaktif dari state saat ini.
* **Simpan Presensi Harian**: Menyimpan perubahan presensi ke state lokal dengan notifikasi toast sukses instan.

#### 6.4 Rekap Presensi Multi-Tab (Wali Kelas)
Halaman rekapitulasi komprehensif kehadiran siswa kelas bimbingan dengan 3 tab analitik:
* **Tab 1: Presensi Harian**: Log histori presensi harian rombel per tanggal, distribusi status, dan persentase kehadiran harian.
* **Tab 2: Presensi Mata Pelajaran**: Rekap presensi KBM dari berbagai guru mapel yang mengajar di kelas 8-A (IPA, Matematika, B. Inggris, dsb.). Wali kelas dapat memantau kedisiplinan siswa di setiap sesi pelajaran tanpa mengubah data milik guru mapel lain.
* **Tab 3: Rekap Siswa**: Ringkasan akumulatif per individu siswa (Total Hadir, Sakit, Izin, Alpa, Terlambat, dan % Kehadiran Total).
* **Unduh Rekap CSV**: Export data rekapitulasi ke format spreadsheet CSV.

#### 6.8 Jadwal Pembelajaran Kelas
* Jadwal KBM tatap muka kelas dari hari Senin sampai Jumat lengkap dengan nama guru, jam pelajaran, dan ruangan.

#### 6.9 Rekapitulasi Nilai & Catatan Wali Kelas
* Tabel leger nilai per siswa: Nilai Tugas, PTS, PAS, Rata-rata, Predikat Huruf (A/B/C/D), dan Status Ketuntasan (*Tuntas* / *Remedial*).
* Editor catatan perkembangan siswa oleh wali kelas.

#### 6.10 Laporan Leger Siap Cetak
* Format pratinjau dokumen resmi ber-kop surat resmi sekolah dan tanda tangan resmi.
* Tombol "Cetak Laporan" print-friendly (`window.print()`).

---

### Fitur Mode Guru Mata Pelajaran:

#### 6.5 Presensi Mata Pelajaran / KBM (Guru Mapel)
Sistem presensi per sesi jam pelajaran yang otomatis terintegrasi 100% dengan master jadwal dari Admin Pusat:
* **Integrasi Otomatis dari Admin Pusat (Zero Manual Setup)**:
  * Guru tidak perlu menginput kelas, jam, atau ruangan secara manual karena seluruh jadwal KBM ditarik langsung dari Master Timetable yang telah diatur Admin Sekolah di Admin Panel (`MOCK_SCHEDULES`).
* **Deteksi Jadwal Mengajar Hari Ini**:
  * Ketika guru membuka menu presensi:
    * **Kasus 1: Tidak Ada Jadwal Mengajar Hari Ini**
      * Muncul kotak status resmi: *"Tidak Ada Jadwal Mengajar Hari Ini"*.
      * Sistem menjelaskan bahwa berdasarkan master jadwal Admin Pusat, guru tidak memiliki jam KBM tatap muka pada hari dan tanggal tersebut.
      * Disediakan kartu rangkuman hari mengajar lain serta tombol langsung ke menu Jadwal Mengajar Mingguan.
    * **Kasus 2: Terdapat Sesi Mengajar Hari Ini**
      * Muncul **Pilihan Sesi Mengajar Hari Ini**:
        * Menampilkan kartu interaktif untuk setiap sesi pada hari itu (misal pada hari Selasa ada 2 sesi: Sesi 1 jam 07:30 - 09:30 di Kelas 8-A Lab Biologi, dan Sesi 2 jam 10:00 - 11:30 di Kelas 8-B Lab Fisika).
        * Setiap kartu mencakup: Jam KBM, Nama Kelas, Mapel, Ruangan, dan Badge Status (*Sudah Disimpan* / *Belum Diisi*).
        * Guru cukup mengklik sesi yang sedang berlangsung untuk langsung membuka formulir presensi siswa.
* **Formulir Presensi Terkunci Sesuai Jadwal**:
  * Informasi sesi (Kelas, Mapel, Jam Mulai, Jam Selesai, Ruang) terkunci otomatis dan valid sesuai jadwal resmi.
  * Tombol aksi: "Tandai Semua Hadir", "Simpan Presensi Sesi Ini".
  * Live KPI Summary Cards (Total Siswa, Hadir, Terlambat, Izin, Sakit, Alpa, % Kehadiran).
  * Tabel Roster Siswa kelas terkait dengan tombol status cepat dan kolom input catatan alasan.
* **5 Status Kehadiran KBM**:
  * `H` (Hadir - Hijau)
  * `T` (Terlambat - Kuning/Amber)
  * `I` (Izin - Biru)
  * `S` (Sakit - Oranye)
  * `A` (Alpa - Merah)
* **Pencegahan Sesi Duplikat (Duplicate Session Prevention)**:
  * Menggunakan composite session identifier unik: `SES-{classId}-{subjectId}-{date}-{timeKey}`.
  * Jika guru membuka sesi yang telah tersimpan sebelumnya, sistem memuat data presensi yang ada untuk diedit, bukan membuat sesi baru.
* **Simpan Presensi KBM**: Menyimpan log sesi dan rekor kehadiran siswa ke state lokal terpusat.

#### 6.6 Riwayat Presensi Guru (Guru Mapel)
* Daftar histori seluruh sesi KBM yang pernah dicatat oleh guru.
* Filter berdasarkan tanggal dan kelas.
* Informasi persentase kehadiran dan jumlah siswa per sesi.
* Tombol **"Buka Presensi"** untuk meninjau kembali atau mengedit presensi yang telah dicatat.

#### 6.7 Rekap Presensi Mengajar (Guru Mapel)
* Kartu analitik rekapitulasi kehadiran per kelas yang diampu (8-A, 8-B, 9-A).
* Memantau tingkat partisipasi dan kedisiplinan siswa di kelas-kelas ajar guru.

---

## 7. Sistem Presensi Ganda Terpisah & Aturan Bisnis

Sistem mengimplementasikan prinsip ketat pemisahan data presensi (Dual-Attendance Isolation):

1. **Pemisahan Rekor Data**: Rekor `DailyAttendanceRecord` dan `SubjectAttendanceRecord` disimpan dalam struktur data terpisah dan tidak saling menimpa.
2. **Kemandirian Perubahan**: Mengubah status presensi pada suatu jam pelajaran (KBM) tidak akan pernah otomatis merubah status presensi harian siswa yang dicatat wali kelas, begitu pula sebaliknya.
3. **Batasan Hak Akses (Role Scoping)**:
   * Wali Kelas hanya dapat menginput presensi harian untuk kelas bimbingannya (Kelas 8-A).
   * Wali Kelas dapat melihat rekapitulasi presensi mapel di kelasnya namun tidak dapat mengubah rekor milik guru mapel lain.
   * Guru Mapel hanya dapat menginput presensi untuk kelas dan mata pelajaran yang tercantum dalam SK Beban Mengajar miliknya.
   * Admin memiliki akses pemantauan (monitoring) seluruh rekor presensi sekolah secara agregat.
4. **Distingsi Status Alpa vs Belum Diisi**: Sesi yang belum diisi tidak diperlakukan sebagai siswa Alpa, dan persentase kehadiran hanya dihitung dari sesi yang telah dicatat.

---

## 8. Simulasi Demo Role Switcher

Di bagian navigasi atas header (`Floating App Bar`), penguji dan developer dapat berpindah peran kapan saja tanpa autentikasi nyata:
* **Admin Pusat** (`/admin`): Mengelola seluruh sistem sekolah secara komprehensif.
* **Wali Kelas (8-A)** (`/wali-kelas`): Mensimulasikan tugas wali kelas mengelola rombel dan presensi harian.
* **Guru Pengampu (IPA)** (`/wali-kelas` mode Guru): Mensimulasikan guru mata pelajaran mencatat presensi sesi KBM.

---

## 9. Panduan Integrasi Database Masa Depan (Backend / Supabase)

Arsitektur data dummy di file `academicData.ts` telah dirancang bersesuaian dengan panduan di file **`backend.md`**. Jika ingin mengaktifkan database Supabase:

1. **Tabel Relasional di Supabase**:
   * `academic_years` ➡️ `MOCK_ACADEMIC_YEARS`
   * `classes` ➡️ `MOCK_CLASSES`
   * `students` ➡️ `MOCK_STUDENTS`
   * `subjects` ➡️ `MOCK_SUBJECTS`
   * `homeroom_assignments` ➡️ `MOCK_HOMEROOM_ASSIGNMENTS`
   * `teaching_assignments` ➡️ `MOCK_TEACHING_ASSIGNMENTS`
   * `schedules` ➡️ `MOCK_SCHEDULES`
   * `attendance` ➡️ `MOCK_ATTENDANCE`
   * `grades` ➡️ `MOCK_GRADES`
   * `user_profiles` ➡️ `MOCK_USERS`
2. **Koneksi Frontend**:
   Cukup ganti inisialisasi `useState(MOCK_...)` dengan hook fetching `supabase.from('...').select('*')` tanpa perlu mengubah struktur tampilan antarmuka (UI).

---

## 10. Desain Antarmuka: Claymorphism + Glassmorphism Light Theme

Dashboard Admin Pusat telah ditingkatkan secara visual menggunakan sistem desain **Claymorphism + Glassmorphism** dalam balutan **Light Theme** murni (tanpa mode gelap) dengan proporsi estetika profesional:
* **60% Clean Modern UI**: Tipografi sans-serif modern (Plus Jakarta Sans), whitespace lapang, palet netral terpadu selaras Portal Wali Kelas (`#F4F5FA`, `#3A3541`, `#6B6774`), dan hirarki informasi yang jelas.
* **20% Glassmorphism**: Permukaan tembus pandang berdaya pantul lembut (*translucent white* `rgba(255,255,255,0.85)`), efek *backdrop blur* dinamis (`backdrop-blur-md`), border semi-transparan tipis (`#E7E7E9`), dan bayangan difus halus pada Top Header, Sidebar, dan toolbar.
* **20% Claymorphism**: Kedalaman fisik tiga dimensi yang lembut (*soft ambient shadows* + *inner highlight*), sudut kurva membulat ergonomis (`rounded-2xl` & `rounded-3xl`), serta tombol dan kartu taktil bergradien khas biru langit ke ungu (`#16B1FF` ke `#8C57FF`).

### Arsitektur Visual Berkelanjutan (Layered Depth)
1. **Layer 1 (Canvas Base)**: Warna latar off-white yang hangat, bersih, dan ramah di mata (`#F4F5FA`).
2. **Layer 2 (Ambient Glow Blobs)**: Pendaran orbs dekoratif bergradien biru langit, ungu, dan zamrud dengan `blur-3xl` berposisi tetap (`fixed inset-0 pointer-events-none -z-10`) untuk memberi ilusi kedalaman fisik di balik elemen antarmuka.
3. **Layer 3 (Glassmorphic Navigation)**: Floating Header dan Floating Sidebar melayang elegan dengan latar belakang kaca buram dan sudut lengkung modern.
4. **Layer 4 (Claymorphic Content Cards)**: Kartu statistik metrik, alokasi kuota PPDB, daftar rombel, serta tabel data dengan elevasi taktil lembut dan highlight reflektif.
5. **Layer 5 (Interactive Controls & Badges)**: Tombol aksi utama dengan gradien taktil biru-ke-ungu (`clay-btn-primary`), tombol sekunder kaca, dan pill indikator tren.

---

*SEKOLAH-Q Academic & Admin Management System — Dikembangkan dengan standar visual modern, interaktivitas lengkap, dan kesiapan arsitektur masa depan.*
