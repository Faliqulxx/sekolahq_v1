# PRD: Website Sekolah

**Jenis proyek:** Studi kasus portofolio (frontend-only, tanpa backend, data dummy) **Penulis:** Faliqul Ishbah **Status:** Draft v3 **Nama sekolah:** SMP Ujungpangkah **Catatan:** karena memakai nama sekolah nyata, situs diberi label "Konsep desain, bukan situs resmi"; logo, foto, dan data asli sekolah hanya dipakai bila ada izin, selebihnya konten dummy.

## 1. Ringkasan

Website SMP modern yang menampilkan profil, program, berita, galeri, dan informasi pendaftaran (PPDB) dengan tampilan ceria, elegan, cepat, dan responsif. Fokus utama proyek adalah **kualitas frontend**: desain visual, animasi halus, dan pengalaman pengguna, sebagai bukti kemampuan di portofolio. Seluruh data berupa dummy dari file lokal, tanpa backend.

## 2. Tujuan dan Non-tujuan

**Tujuan**

- Menampilkan identitas dan keunggulan sekolah secara menarik dalam hitungan detik.
- Memudahkan calon siswa dan orang tua menemukan informasi pendaftaran.
- Menjadi studi kasus portofolio dengan desain konsisten, performa tinggi, dan kode rapi.

**Non-tujuan (untuk versi awal)**

- Backend, database, atau API (semua data dummy).
- Form pendaftaran PPDB online.
- Chatbot AI.
- Sistem akademik (nilai, absensi, rapor), pembayaran online, dan login multi-peran.

## 3. Target Pengguna

| Pengguna | Kebutuhan utama |
| --- | --- |
| Calon siswa | Melihat program, ekstrakurikuler, suasana sekolah, alur daftar |
| Orang tua | Biaya, jadwal pendaftaran, fasilitas, kontak |
| Siswa dan alumni | Berita, agenda, galeri, prestasi |
| Guru dan staf | Pengumuman, profil guru |
| Perekrut/penilai portofolio | Melihat kualitas desain, animasi, dan struktur kode dengan cepat |

## 4. Ruang Lingkup Fitur

**MVP (wajib)**

1. Beranda dengan hero, statistik sekolah, sorotan program, berita terbaru, CTA pendaftaran.
2. Profil sekolah: sejarah, visi misi, sambutan kepala sekolah.
3. Program unggulan dan ekstrakurikuler.
4. Berita dan pengumuman (daftar dan halaman detail).
5. Galeri foto dengan lightbox.
6. Info PPDB (hanya informasi): alur, syarat, jadwal (timeline), FAQ.
7. Profil guru dan staf.
8. Kontak dengan peta, form pesan (simulasi), dan tautan media sosial.
9. Tema terang saja (tanpa mode gelap) agar desain lebih fokus.

**Tahap lanjutan (opsional, nilai tambah)**

- Kalender agenda interaktif (data dummy).
- Dukungan dua bahasa (ID/EN).
- Halaman 404 kustom dan animasi mikro (hover, transisi antarhalaman).

## 5. Struktur Halaman (Sitemap)

- `/` Beranda
- `/profil` (sejarah, visi misi, sambutan)
- `/program` dan `/program/[slug]`
- `/ekstrakurikuler`
- `/berita` dan `/berita/[slug]`
- `/galeri`
- `/guru`
- `/ppdb` (alur, syarat, jadwal, FAQ)
- `/kontak`

## 6. Kebutuhan Fungsional per Halaman

**Beranda**

- Hero dengan headline kuat, foto/video latar, dan tombol "Info Pendaftaran".
- Bagian angka: jumlah siswa, guru, prestasi, tahun berdiri (animasi hitung naik).
- Kartu program unggulan, berita terbaru (3 item), galeri cuplikan, testimoni alumni.

**Berita**

- Filter kategori, pencarian, paginasi.
- Halaman detail dengan gambar sampul, tanggal, penulis, dan berita terkait.

**Galeri**

- Grid masonry, filter per album, lightbox dengan navigasi keyboard.

**PPDB**

- Timeline jadwal, daftar persyaratan (checklist), FAQ akordeon.

**Kontak**

- Form (nama, email, subjek, pesan) dengan validasi di sisi klien; saat dikirim hanya menampilkan notifikasi sukses simulasi (tanpa backend).
- Peta lokasi, jam layanan, nomor dan email resmi.

## 7. Arah Desain

- **Karakter visual:** ceria-modern namun tetap elegan: palet cerah yang terkendali, ruang kosong lega, foto dan ilustrasi yang hangat, animasi halus. Hindari kesan kekanak-kanakan atau terlalu ramai; sasaran utamanya orang tua dan siswa SMP.
- **Warna:** tema terang dengan Primary #2563EB, Dark #1E3A8A, Light #EFF6FF, Background #FFFFFF, Text #111827, dan Accent amber #F59E0B untuk tombol dan sorotan (bukan untuk teks di atas putih karena kontrasnya rendah). Jaga kontras agar tetap elegan dan terbaca. Definisikan sebagai design token agar mudah ganti tema.
- **Tipografi:** judul dengan huruf display yang ramah namun berkelas (misal rounded atau serif modern), isi dengan sans-serif bersih. Hindari font bawaan yang generik.
- **Layout:** grid yang jelas, whitespace lega, kartu bersudut membulat besar, bentuk organik dan ikon sederhana sebagai aksen, foto besar.
- **Animasi (Framer Motion):** transisi halaman halus, efek muncul saat scroll, hover kartu, hitung naik angka. Hormati `prefers-reduced-motion`.
- **Komponen reusable:** Navbar, Footer, Hero, Section header, Card (program/berita/guru), Timeline, Accordion, Lightbox, Button, Form field.
- **Aset:** gunakan foto stok dan ilustrasi berlisensi atau buatan sendiri; hindari logo dan foto sekolah asli tanpa izin.

## 8. Kebutuhan Non-fungsional

- **Responsif:** mobile-first, diuji di lebar 360, 768, 1280 px.
- **Performa:** target Lighthouse Performance 90+; gambar dioptimasi (`next/image`, format WebP/AVIF), font dimuat efisien.
- **Aksesibilitas:** target Lighthouse Accessibility 95+; kontras warna memadai, navigasi keyboard, teks alternatif gambar, label form.
- **SEO:** metadata per halaman, Open Graph, sitemap.xml, robots.txt, heading terstruktur.
- **Keamanan dasar:** validasi input form di sisi klien; tidak ada data pribadi yang disimpan atau dikirim.

## 9. Stack Teknologi (usulan)

| Kebutuhan | Pilihan |
| --- | --- |
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Animasi | Framer Motion |
| Konten | File JSON/MDX lokal (data dummy) |
| Form | React Hook Form + Zod |
| Backend | Tidak ada; seluruh data dummy dari file lokal |
| Deploy | Vercel |
| Desain | Figma (wireframe dan design system) |

## 10. Model Data Dummy (ringkas)

- **Berita:** judul, slug, kategori, ringkasan, isi, gambar, tanggal, penulis.
- **Program:** nama, slug, deskripsi, gambar.
- **Ekstrakurikuler:** nama, deskripsi, jadwal, pembina, gambar.
- **Guru:** nama, mata pelajaran, jabatan, foto.
- **Galeri:** album, judul, gambar, tanggal.
- **Agenda:** judul, tanggal, lokasi, deskripsi.

Semua data disimpan sebagai file JSON/TypeScript di folder `/data` dan diimpor langsung ke komponen.

## 11. Metrik Keberhasilan

- Lighthouse: Performance 90+, Accessibility 95+, SEO 95+.
- Seluruh halaman MVP tampil baik di mobile dan desktop.
- Studi kasus di portofolio memuat: masalah, proses desain, keputusan teknis, hasil, tautan demo dan repo.
- Waktu pemuatan halaman utama di bawah 2 detik pada koneksi normal.

## 12. Rencana dan Milestone

| Minggu | Target |
| --- | --- |
| 1 | Riset referensi, moodboard, sitemap, wireframe, pilih warna dan font |
| 2 | Design system dan desain UI Figma (beranda, PPDB, berita) |
| 3 | Setup proyek, komponen dasar, Beranda dan Profil |
| 4 | Program, Berita, Galeri, Guru |
| 5 | PPDB, Kontak, mode gelap, animasi |
| 6 | Optimasi performa/aksesibilitas, SEO, deploy, tulis studi kasus portofolio |

## 13. Risiko dan Mitigasi

| Risiko | Mitigasi |
| --- | --- |
| Godaan menambah backend atau fitur di luar lingkup | Kunci keputusan tanpa backend; semua data dari file dummy lokal |
| Animasi berlebihan memperlambat situs | Anggaran performa, uji Lighthouse tiap milestone |
| Tampilan terlalu generik/template | Tetapkan identitas visual dan moodboard di minggu 1 |
| Aset gambar tidak berlisensi | Pakai foto stok berlisensi atau buatan sendiri |
| Tema ceria terkesan kekanak-kanakan | Batasi palet, pakai tipografi rapi dan whitespace lega, uji di Figma sebelum coding |

## 14. Keputusan dan Pertanyaan Terbuka

- **Diputuskan:** jenjang SMP; gaya ceria-modern namun elegan; tanpa backend (data dummy); PPDB online dan chatbot AI tidak masuk lingkup.
- **Diputuskan:** nama sekolah SMP Ujungpangkah; tema terang saja; palet Primary `#2563EB`, Dark `#1E3A8A`, Light `#EFF6FF`, Background `#FFFFFF`, Text `#111827`, Accent `#F59E0B`.
- Font judul dan isi: pilih dari 2-3 opsi (usulan menyusul).
- Apakah sekolah mengizinkan memakai logo dan foto aslinya, atau tetap memakai aset stok?

&#32;SMP Ujungpangkah

&#32;Palet:

Primary: #2563EB

Dark: #1E3A8A

Light: #EFF6FF

Background: #FFFFFF

Text: #111827

Accent: #F59E0B

&#32;terang saja
