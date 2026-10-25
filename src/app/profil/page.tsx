import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Award, 
  Target, 
  Eye, 
  Compass, 
  BookOpen, 
  Heart, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  Users 
} from 'lucide-react';
import { SCHOOL_INFO, TEACHERS } from '@/data/schoolData';

export const metadata = {
  title: "Profil Sekolah | Sekolah-Q Gresik",
  description: "Sejarah, visi misi, dan sambutan Kepala Sekolah Sekolah-Q Kabupaten Gresik.",
};

export default function ProfilPage() {
  const headmaster = TEACHERS.find(t => t.id === 'kepala-sekolah')!;

  const coreValues = [
    { title: "Religius & Beradab", desc: "Menjadikan nilai-nilai ketuhanan dan adab mulia sebagai kompas setiap tindakan dan ucapan." },
    { title: "Integritas & Kejujuran", desc: "Mendidik kejujuran akademis dan tanggung jawab moral di setiap aspek kehidupan sekolah." },
    { title: "Nalar Kritis & Inovatif", desc: "Mendorong keberanian bertanya, mengeksplorasi ide baru, dan memecahkan masalah kontekstual." },
    { title: "Peduli Lingkungan Bahari", desc: "Mewujudkan kecintaan nyata terhadap kelestarian alam pesisir dan ekosistem mangrove sekitar." },
  ];

  const milestones = [
    { year: "1988", title: "Pendirian Sekolah", desc: "Didirikan atas aspirasi para tokoh pendidikan dan masyarakat Ujungpangkah untuk memperluas akses belajar berkualitas di wilayah pesisir utara Gresik." },
    { year: "2005", title: "Akreditasi A & Perluasan Kampus", desc: "Meraih predikat Akreditasi A pertama kali dan membangun gedung laboratorium terpadu serta aula serbaguna." },
    { year: "2018", title: "Sekolah Adiwiyata Mandiri", desc: "Menerima penghargaan Sekolah Peduli & Berbudaya Lingkungan tingkat provinsi atas aksi nyata konservasi mangrove." },
    { year: "2023", title: "Penetapan Sekolah Penggerak", desc: "Terpilih sebagai salah satu Sekolah Penggerak di Jawa Timur yang mengimplementasikan Kurikulum Merdeka secara mandiri dan berbagi praktik baik." },
    { year: "2026", title: "Pusat Riset STEM & Ekosistem Digital", desc: "Mengembangkan program bilingual dan laboratorium kecerdasan buatan & robotika yang mengantarkan siswa juara nasional." }
  ];

  return (
    <div className="bg-white text-slate-900 pb-24">
      
      {/* Top Page Header (Aurevia & BMSC Style) */}
      <div className="bg-navy-950 text-white py-14 sm:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-primary-950/70 to-navy-900" />
        <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-accent-gold uppercase tracking-wider">
            <Link href="/" className="hover:underline">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Profil Sekolah</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Profil & Visi Misi Sekolah
          </h1>
          <p className="text-slate-300 text-xs sm:text-base max-w-2xl">
            Mengenal lebih dekat dedikasi {SCHOOL_INFO.name} dalam mencetak insan berilmu, berbudi luhur, dan siap memimpin peradaban.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-12 sm:pt-16 space-y-16 sm:space-y-24">
        
        {/* Sambutan Kepala Sekolah (Editorial Feature) */}
        <div className="bg-slate-50/70 rounded-2xl sm:rounded-3xl p-5 sm:p-10 lg:p-12 border border-slate-200/80 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Foto Kepala Sekolah */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-44 sm:w-56 h-56 sm:h-72 rounded-2xl overflow-hidden shadow-card border-4 border-white mb-3 sm:mb-4">
                <Image
                  src={headmaster.imageUrl}
                  alt={headmaster.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-navy-950">{headmaster.name}</h3>
              <p className="text-xs text-primary-700 font-semibold">{headmaster.role}</p>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">{headmaster.education}</p>
            </div>

            {/* Isi Sambutan */}
            <div className="lg:col-span-8 space-y-3 sm:space-y-4">
              <h2 className="text-xl sm:text-3xl font-extrabold text-navy-950 tracking-tight leading-snug">
                &ldquo;Menyalakan Pelita Rasa Ingin Tahu, Meneguhkan Keteladanan Budi Pekerti.&rdquo;
              </h2>

              <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
                Assalamu’alaikum Warahmatullahi Wabarakatuh. Selamat datang di {SCHOOL_INFO.name}. Pendidikan tingkat menengah pertama adalah jembatan emas transisi dari masa kanak-kanak menuju kedewasaan nalar. Di era keterbukaan informasi ini, anak-anak kita tidak hanya dituntut pintar menguasai teknologi, melainkan harus memiliki fondasi keimanan yang kokoh dan kepekaan nurani terhadap sesama.
              </p>

              <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
                Melalui Kurikulum Merdeka yang kami perkuat dengan pembinaan tahfidz Al-Qur&apos;an, kelas bilingual berstandar internasional, serta riset sains dan robotika terapan, kami berkomitmen mendampingi setiap siswa agar bertumbuh dengan penuh percaya diri sesuai kodrat dan potensinya.
              </p>

              <div className="pt-1 text-xs font-semibold text-slate-500 italic">
                Wassalamu’alaikum Warahmatullahi Wabarakatuh.
              </div>
            </div>

          </div>
        </div>

        {/* Visi, Misi & Tujuan (Grid 2-Col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card Visi */}
          <div className="bg-gradient-to-br from-primary-900 to-navy-950 text-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-card relative overflow-hidden">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center text-accent-gold mb-4 sm:mb-6 border border-white/15">
              <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-2 sm:mb-3 text-white">
              Visi Sekolah
            </h3>

            <p className="text-sm sm:text-base italic text-slate-200 leading-relaxed mb-4">
              &ldquo;Terwujudnya Generasi Unggul yang Berakhlak Karimah, Cerdas Bernalar Kritis, Berprestasi Global, dan Peduli Kelestarian Lingkungan.&rdquo;
            </p>

            <p className="text-xs text-slate-300 leading-relaxed">
              Visi ini menjadi jiwa dari seluruh proses kurikuler, kokurikuler, dan ekstrakurikuler yang berlangsung di lingkungan kampus Sekolah-Q Gresik.
            </p>
          </div>

          {/* Card Misi */}
          <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-soft border border-slate-200/90 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 sm:mb-6 border border-primary-200">
                <Target className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-navy-950 mb-2 sm:mb-3">
                Misi Sekolah
              </h3>

              <p className="text-xs sm:text-sm font-semibold text-slate-500 mb-4">
                Langkah Nyata Mencapai Visi
              </p>

              <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">1</span>
                  <span>Menumbuhkembangkan penghayatan ajaran agama dan budi pekerti luhur dalam keseharian.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">2</span>
                  <span>Melaksanakan pembelajaran aktif, inovatif, dan berdiferensiasi berbasis proyek pemecahan masalah nyata.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">3</span>
                  <span>Memfasilitasi penguasaan bahasa internasional dan literasi digital generasi masa depan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">4</span>
                  <span>Menanamkan kesadaran ekologis dan kepedulian pelestarian keanekaragaman hayati pesisir pantura.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Nilai-Nilai Utama (Core Values) - 2 Columns on Mobile, 4 on Desktop */}
        <div className="space-y-6 sm:space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">Nilai Karakter Inti</h2>
            <p className="text-xs sm:text-sm text-slate-600">Pondasi pembiasaan watak dan etika seluruh warga sekolah.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {coreValues.map((val, i) => (
              <div key={i} className="p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 hover:border-primary-300 hover:shadow-soft transition-all">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-accent-gold/20 text-accent-amber flex items-center justify-center font-bold text-xs sm:text-sm mb-2.5 sm:mb-3">
                  0{i + 1}
                </div>
                <h4 className="font-bold text-xs sm:text-base text-navy-950 mb-1 sm:mb-2">{val.title}</h4>
                <p className="text-[10px] sm:text-xs text-slate-600 leading-relaxed line-clamp-3 sm:line-clamp-none">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Perjalanan Sejarah (Timeline Milestones) */}
        <div className="space-y-6 sm:space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">Rekam Jejak & Sejarah</h2>
            <p className="text-xs sm:text-sm text-slate-600">Perjalanan transformasi sejak masa perintisan 1988 hingga menjadi sekolah rujukan terdepan.</p>
          </div>

          <div className="relative border-l-2 border-primary-200 ml-3 sm:ml-32 space-y-6 sm:space-y-8 py-2 sm:py-4">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative pl-5 sm:pl-8 group">
                {/* Year Marker Badge */}
                <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-white border-4 border-primary-600 flex items-center justify-center text-[10px] sm:text-xs font-bold text-primary-700 shadow-sm group-hover:scale-110 transition-transform" />
                
                <div className="hidden sm:block absolute -left-28 top-1.5 text-sm font-extrabold text-primary-700">
                  {m.year}
                </div>

                <div className="bg-slate-50 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 hover:bg-white hover:shadow-soft transition-all">
                  <div className="sm:hidden text-xs font-bold text-primary-600 mb-1">Tahun {m.year}</div>
                  <h4 className="font-bold text-sm sm:text-base text-navy-950 mb-1 sm:mb-1.5">{m.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
