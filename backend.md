# Panduan Integrasi Backend Supabase Database (Sekolah-Q)

Dokumen ini adalah panduan teknis lengkap langkah-demi-langkah untuk menghubungkan website **Sekolah-Q** ke database cloud **Supabase** (PostgreSQL, Storage, & Authentication).

Saat ini tampilan Admin Panel pada `/admin` berjalan menggunakan **Mock State Interaktif** di sisi frontend (React State) sehingga UI dan fiturnya dapat langsung dicoba dan diuji tanpa konfigurasi database.

---

## 1. Kebutuhan Awal (Prerequisites)

1. Akun di [Supabase](https://supabase.com/) (Tersedia tier Gratis yang mencakup PostgreSQL, Autentikasi, dan 1 GB Storage).
2. Project Supabase baru (pilih region terdekat: `Singapore (ap-southeast-1)`).
3. Dependency package yang perlu diinstall pada project Next.js:
   ```bash
   npm install @supabase/supabase-js @supabase/ssr
   ```

---

## 2. Pengaturan Environment Variables

Buat atau perbarui file `.env.local` pada root project:

```env
# URL Project Supabase (Dapat ditemukan di Project Settings -> API)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co

# Kunci Anon Publik (Aman untuk frontend)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Kunci Service Role Rahasia (HANYA digunakan di Server Actions / Backend, JANGAN di-expose ke frontend)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 3. Skema Database SQL (Database Migration Script)

Buka dashboard Supabase -> Masuk ke menu **SQL Editor** -> Klik **New Query**, lalu salin dan jalankan (*Run*) seluruh query SQL berikut untuk membuat tabel, relasi, dan indeks:

```sql
-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================================
-- 2. TABEL PENGATURAN SEKOLAH (SINGLE ROW CONFIG)
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.school_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_name VARCHAR(255) NOT NULL DEFAULT 'Sekolah-Q Gresik',
    npsn VARCHAR(50) NOT NULL DEFAULT '20500123',
    akreditasi VARCHAR(10) NOT NULL DEFAULT 'A',
    address TEXT NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    whatsapp VARCHAR(50) NOT NULL,
    announcement_text TEXT NOT NULL,
    announcement_active BOOLEAN NOT NULL DEFAULT true,
    announcement_link VARCHAR(255) DEFAULT '/ppdb',
    instagram VARCHAR(100) DEFAULT '@sekolahq.official',
    tiktok VARCHAR(100) DEFAULT '@sekolahq_id',
    youtube VARCHAR(100) DEFAULT 'Sekolah-Q Official',
    stat_students VARCHAR(50) DEFAULT '780+',
    stat_teachers VARCHAR(50) DEFAULT '36',
    stat_graduates VARCHAR(50) DEFAULT '100%',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================
-- 3. TABEL PENDAFTAR PPDB (PENERIMAAN SISWA BARU)
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.ppdb_applicants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    registration_number VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    nisn VARCHAR(20) NOT NULL,
    school_origin VARCHAR(255) NOT NULL,
    track VARCHAR(50) NOT NULL CHECK (track IN ('Prestasi', 'Zonasi', 'Tahfidz', 'Afirmasi')),
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    average_score NUMERIC(5, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Menunggu' CHECK (status IN ('Menunggu', 'Terverifikasi', 'Diterima', 'Ditolak')),
    notes TEXT,
    birth_date DATE,
    gender VARCHAR(10),
    parent_name VARCHAR(255),
    document_urls JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================
-- 4. TABEL BERITA & PRESTASI
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT NOT NULL,
    author VARCHAR(100) NOT NULL DEFAULT 'Humas Sekolah-Q',
    read_time VARCHAR(20) DEFAULT '3 menit',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    published_at DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================
-- 5. TABEL DEWAN GURU & STAF
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.teachers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nip VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    education VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================
-- 6. TABEL GALERI DOKUMENTASI
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url TEXT NOT NULL,
    event_date VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================
-- 7. TABEL KOTAK PESAN / BUKU TAMU
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_name VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================
ALTER TABLE public.school_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ppdb_applicants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Publik boleh membaca berita, guru, galeri, dan setting
CREATE POLICY "Public Read News" ON public.news FOR SELECT USING (true);
CREATE POLICY "Public Read Teachers" ON public.teachers FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public Read Settings" ON public.school_settings FOR SELECT USING (true);

-- Policy: Publik boleh mengirim pendaftaran PPDB dan pesan kontak
CREATE POLICY "Public Insert PPDB" ON public.ppdb_applicants FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Policy: Admin yang login (Authenticated User) berhak CRUD semua tabel
CREATE POLICY "Admin Full Access Settings" ON public.school_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access PPDB" ON public.ppdb_applicants FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access News" ON public.news FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Teachers" ON public.teachers FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Gallery" ON public.gallery FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Messages" ON public.contact_messages FOR ALL TO authenticated USING (true);
```

---

## 4. Konfigurasi Storage Bucket (Upload File & Gambar)

Di dashboard Supabase -> Masuk ke menu **Storage**:
1. Buat Bucket baru bernama: `media-sekolah`
   - Tandai sebagai **Public Bucket** agar gambar berita, galeri, dan avatar guru dapat langsung diakses via URL publik.
2. Buat Bucket baru bernama: `dokumen-ppdb`
   - Tandai sebagai **Private Bucket** (hanya admin yang dapat mengunduh berkas KK/Rapor pendaftar).

---

## 5. Menyiapkan Client Supabase di Next.js

Buat folder `src/lib/supabase/` dengan dua file helper:

### A. Client Browser (`src/lib/supabase/client.ts`)
```typescript
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

### B. Server Actions / Server Components (`src/lib/supabase/server.ts`)
```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Ditangani middleware jika dipanggil dari server component
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Ditangani middleware
          }
        },
      },
    }
  );
}
```

---

## 6. Contoh Query CRUD yang Siap Dipakai

### A. Ambil Data Pendaftar PPDB ke Admin Panel
```typescript
import { createClient } from '@/lib/supabase/client';

export async function fetchApplicants() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('ppdb_applicants')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) console.error(error);
  return data || [];
}
```

### B. Update Status Pendaftar PPDB
```typescript
export async function updateApplicantStatus(id: string, newStatus: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('ppdb_applicants')
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq('id', id);

  return !error;
}
```

### C. Tambah Berita Baru + Upload Cover Gambar
```typescript
export async function createNews(formData: FormData) {
  const supabase = createClient();
  const file = formData.get('image') as File;
  
  // 1. Upload foto ke Supabase Storage
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('media-sekolah')
    .upload(`berita/${fileName}`, file);

  const { data: { publicUrl } } = supabase.storage
    .from('media-sekolah')
    .getPublicUrl(`berita/${fileName}`);

  // 2. Simpan artikel ke PostgreSQL
  const { error } = await supabase.from('news').insert({
    title: formData.get('title'),
    slug: formData.get('slug'),
    category: formData.get('category'),
    excerpt: formData.get('excerpt'),
    content: formData.get('content'),
    image_url: publicUrl,
  });

  return !error;
}
```

---

## 7. Proteksi Halaman Admin (`middleware.ts`)

Untuk mewajibkan login sebelum membuka `/admin`:
1. Buat file `middleware.ts` pada root project.
2. Gunakan method `supabase.auth.getUser()`.
3. Jika user belum login, redirect ke halaman `/admin/login`.

---

## Rangkuman Status Proyek Saat Ini
- **Frontend Admin Panel**: Sudah selesai dan interaktif pada rute `http://localhost:3000/admin`.
- **Database Supabase**: Siap dihubungkan kapan saja dengan mengikuti 7 langkah di atas tanpa perlu merombak desain UI.
