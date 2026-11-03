const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true' || Boolean(process.env.NOW_REGION);

const LOCAL_DATA_DIR = path.join(__dirname, 'data');
const LOCAL_DB_FILE = path.join(LOCAL_DATA_DIR, 'database.json');
const LOCAL_UPLOAD_DIR = path.join(__dirname, 'uploads');

const DATA_DIR = isVercel ? '/tmp/data' : LOCAL_DATA_DIR;
const DB_FILE = isVercel ? '/tmp/data/database.json' : LOCAL_DB_FILE;
const UPLOAD_DIR = isVercel ? '/tmp/uploads' : LOCAL_UPLOAD_DIR;

try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (e) {
  console.warn('Could not create DATA_DIR:', e.message);
}

try {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
} catch (e) {
  console.warn('Could not create UPLOAD_DIR:', e.message);
}

// In Vercel serverless, copy initial seed database to /tmp if needed
if (isVercel && !fs.existsSync(DB_FILE)) {
  try {
    if (fs.existsSync(LOCAL_DB_FILE)) {
      fs.copyFileSync(LOCAL_DB_FILE, DB_FILE);
    }
  } catch (e) {
    console.warn('Failed to seed DB to /tmp:', e.message);
  }
}

// In Vercel serverless, copy bundled upload assets to /tmp if needed
if (isVercel) {
  try {
    if (fs.existsSync(LOCAL_UPLOAD_DIR)) {
      const items = fs.readdirSync(LOCAL_UPLOAD_DIR);
      items.forEach(file => {
        const src = path.join(LOCAL_UPLOAD_DIR, file);
        const dest = path.join(UPLOAD_DIR, file);
        if (!fs.existsSync(dest) && fs.statSync(src).isFile()) {
          fs.copyFileSync(src, dest);
        }
      });
    }
  } catch (e) {
    console.warn('Failed to seed uploads to /tmp:', e.message);
  }
}

const defaultData = {
  // Separated database entities for Admin, Siswa, and Warga
  admins: [
    {
      id: 'adm_1',
      name: 'Pengurus Utama PSHT UNESA',
      email: 'admin@psht-unesa.ac.id',
      passwordHash: bcrypt.hashSync('admin123', 10),
      role: 'admin',
      phone: '081234567890',
      status: 'Active',
      createdAt: '2024-01-01T00:00:00.000Z'
    }
  ],
  siswa: [
    {
      id: 'sis_1',
      name: 'Bima Arya Pratama',
      nim: '2301010045',
      nik: '3578012304030001',
      phone: '085712345678',
      parentName: 'H. Bambang Sudarsono',
      email: 'siswa.aktif@unesa.ac.id',
      passwordHash: bcrypt.hashSync('password123', 10),
      role: 'siswa',
      signedPermissionUrl: 'https://images.unsplash.com/photo-1589330694653-dad6ef0190b8?auto=format&fit=crop&w=600&q=80',
      status: 'Active',
      createdAt: '2024-02-10T10:15:00.000Z'
    },
    {
      id: 'sis_2',
      name: 'Dewi Ayu Sekar',
      nim: '2402050012',
      nik: '3578016508040003',
      phone: '081398765432',
      parentName: 'Joko Susilo, S.Pd.',
      email: 'siswa.pending@unesa.ac.id',
      passwordHash: bcrypt.hashSync('password123', 10),
      role: 'siswa',
      signedPermissionUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
      status: 'Pending',
      createdAt: '2024-03-01T08:30:00.000Z'
    }
  ],
  warga: [
    {
      id: 'wrg_1',
      name: 'Rahmat Hidayat, S.Or.',
      originRegion: 'Surabaya, Jawa Timur',
      sahPlace: 'Padepokan Agung Madiun (Pusat)',
      phone: '082145678901',
      email: 'warga.aktif@unesa.ac.id',
      passwordHash: bcrypt.hashSync('password123', 10),
      role: 'warga',
      evidenceUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      status: 'Active',
      createdAt: '2024-01-15T12:00:00.000Z'
    },
    {
      id: 'wrg_2',
      name: 'Danang Tri Pamungkas',
      originRegion: 'Bojonegoro',
      sahPlace: 'Cabang Bojonegoro',
      phone: '085899988776',
      email: 'warga.pending@unesa.ac.id',
      passwordHash: bcrypt.hashSync('password123', 10),
      role: 'warga',
      evidenceUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      status: 'Pending',
      createdAt: '2024-03-02T09:40:00.000Z'
    }
  ],
  content: {
    settings: {
      siteTitle: 'PSHT KOMISARIAT UNESA',
      tagline: 'Memayu Hayuning Bawana - Sepiro Gedhening Sengsoro Yen Tinompo Amung Dadi Cobo',
      announcement: '📢 Selamat datang di Portal Komunitas & Sistem Manajemen Organisasi PSHT UNESA. Pendaftaran Siswa & Pendataan Warga Gelombang Gasal telah resmi dibuka!',
      contactWhatsapp: '081234567890',
      contactEmail: 'psht@unesa.ac.id',
      contactInstagram: '@psht_unesa',
      secretariatAddress: 'Gedung Student Center Lt. 2, Kampus UNESA Lidah Wetan, Surabaya, Jawa Timur 60213',
      logoUrl: '/tamplate-konten-stuba.svg'
    },
    beritaNasional: [
      {
        id: 'news_1',
        title: 'Munas & Rakernas PSHT Pusat Madiun 2026: Perteguh Karakter Budi Luhur Generasi Bangsa',
        category: 'Berita Nasional',
        date: '2026-10-28',
        author: 'Humas PB PSHT',
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
        summary: 'Rapat Kerja Nasional menetapkan peta jalan kaderisasi pencak silat budi luhur dan standardisasi kompetisi tanding gelanggang modern.',
        content: 'Madiun – Persaudaraan Setia Hati Terate (PSHT) menyelenggarakan Rapat Kerja Nasional yang dihadiri oleh seluruh Ketua Cabang dan perwakilan Komisariat Perguruan Tinggi se-Indonesia. Dalam amanatnya, Ketua Umum PB PSHT menegaskan bahwa nilai-nilai Panca Dasar SH Terate harus menjadi benteng moral generasi muda bangsa dalam menghadapi disrupsi era digital.',
        location: 'Padepokan Agung Madiun'
      },
      {
        id: 'news_2',
        title: 'Kejuaraan Nasional Pencak Silat Mahasiswa Piala Rektor se-Indonesia Resmi Bergulir',
        category: 'Berita Nasional',
        date: '2026-11-01',
        author: 'Redaksi Silat Nasional',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
        summary: 'Ratusan pesilat mahasiswa perwakilan cabang dan komisariat bertanding pada kategori tanding dan seni Tunggal Ganda Regu.',
        content: 'Surabaya – Kontingen silat mahasiswa perguruan tinggi seluruh Indonesia berkumpul dalam Kejurnas Silat Mahasiswa. Gelaran ini menjadi wadah seleksi resmi atlet binaan perguruan silat untuk persiapan menuju Pekan Olahraga Mahasiswa Nasional (POMNAS).',
        location: 'GOR Internasional UNESA Lidah Wetan'
      },
      {
        id: 'news_3',
        title: 'Bakti Sosial Serentak PSHT Nasional: Donor Darah & Santunan Ribuan Anak Yatim',
        category: 'Berita Nasional',
        date: '2026-09-15',
        author: 'Lembaga Pengabdian Masyarakat PSHT',
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
        summary: 'Wujud nyata falsafah Memayu Hayuning Bawana diselenggarakan serentak di 34 provinsi dengan melibatkan ribuan warga dan siswa.',
        content: 'Sebagai implementasi ajaran berbudi luhur, PSHT di berbagai daerah bergerak bersama masyarakat melaksanakan aksi kemanusiaan. Kegiatan ini menegaskan jati diri pendekar Setia Hati yang selalu hadir memberikan kemanfaatan bagi lingkungan sekitar.',
        location: 'Nasional (Seluruh Cabang)'
      }
    ],
    dokumentasiProker: [
      {
        id: 'prok_1',
        title: 'Pemusatan Latihan Kontingen POMPROV & POMNAS UNESA',
        type: 'Proker',
        category: 'Prestasi',
        date: 'September - Desember 2026',
        lead: 'Departemen Prestasi',
        progress: 'Berjalan (85%)',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
        description: 'Latihan intensif fisik tanding dan teknik gelanggang bagi pesilat kontingen UNESA guna merebut medali emas pada ajang bergengsi tingkat provinsi dan nasional.'
      },
      {
        id: 'prok_2',
        title: 'Ujian Kenaikan Tingkat (UKT) Sabuk Jambon & Hijau Periode Gasal',
        type: 'Dokumentasi',
        category: 'Tradisi',
        date: '18 Oktober 2026',
        lead: 'Departemen Tradisi & Ke-SH-an',
        progress: 'Terlaksana',
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
        description: 'Pengujian materi senam dasar 1-60, jurus 1-25, pasang, serta sarasehan mental spiritual bagi 85 calon siswa di halaman kampus UNESA.'
      },
      {
        id: 'prok_3',
        title: 'Penerbitan Majalah Digital & Buletin Literasi "Suara Terate UNESA"',
        type: 'Proker',
        category: 'Kominfo',
        date: 'Triwulan IV 2026',
        lead: 'Departemen Kominfo',
        progress: 'Tahap Desain (60%)',
        image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
        description: 'Publikasi karya tulis, esai sejarah perguruan, profil atlet berprestasi, dan wawancara sesepuh komisariat untuk memperkaya literasi warga kampus.'
      },
      {
        id: 'prok_4',
        title: 'Latihan Bersama & Sambung Persaudaraan Se-Surabaya Raya',
        type: 'Dokumentasi',
        category: 'PSDM Organisasi',
        date: '5 September 2026',
        lead: 'Departemen PSDM & Humas',
        progress: 'Terlaksana',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
        description: 'Silaturahmi fisik dan sambutan teknik antar-komisariat perguruan tinggi se-Surabaya dengan total peserta 250 pesilat.'
      }
    ],
    departemen: {
      bph: {
        id: 'bph',
        name: 'Badan Pengurus Harian (BPH)',
        code: 'BPH',
        badgeColor: 'border-amber-500 text-amber-400',
        description: 'Pusat kepemimpinan, perumusan kebijakan strategis, administrasi persuratan, dan pengendalian finansial organisasi Komisariat PSHT UNESA.',
        coordinators: [
          { name: 'Mas Arya Dewantara, S.Pd.', role: 'Ketua Umum Komisariat', phone: '081234567891' },
          { name: 'Muhammad Farhan', role: 'Wakil Ketua Umum', phone: '081234567892' },
          { name: 'Nadia Azzahra', role: 'Sekretaris Umum', phone: '081234567893' },
          { name: 'Tiara Kusuma Wardani', role: 'Bendahara Umum', phone: '081234567894' }
        ],
        guidelines: '1. Menjaga ketertiban administrasi dan keterbukaan kas organisasi.\n2. Melaporkan pertanggungjawaban kegiatan secara berkala kepada Pembina dan Pengurus Cabang.\n3. Memimpin rapat pleno dan koordinasi antar-departemen setiap bulan.',
        agendas: 'Rapat Pleno Bulanan, Evaluasi Triwulan, Laporan Pertanggungjawaban Muskom.'
      },
      psdm: {
        id: 'psdm',
        name: 'Pengembangan Sumber Daya Manusia (PSDM)',
        code: 'PSDM',
        badgeColor: 'border-sky-500 text-sky-400',
        description: 'Bertanggung jawab atas kaderisasi anggota, pelatihan kepemimpinan silat, pemetaan bakat minat, serta pengawalan keaktifan warga dan siswa.',
        coordinators: [
          { name: 'Ilham Pratama, S.T.', role: 'Kepala Departemen PSDM', phone: '081234567811' },
          { name: 'Bagas Wicaksono', role: 'Divisi Kaderisasi & Pelatihan', phone: '081234567812' }
        ],
        guidelines: '1. Mengawal proses pembinaan siswa dari sabuk hitam hingga pengesahan warga.\n2. Menyelenggarakan Leadership Camp & Diklat Manajemen Organisasi bagi pengurus baru.\n3. Menjaga kekompakan dan ikatan batin antar-generasi di lingkungan UNESA.',
        agendas: 'Diklat Manajemen Organisasi, Upgrading Kepemimpinan Pendekar, Evaluasi Keaktifan Siswa.'
      },
      kominfo: {
        id: 'kominfo',
        name: 'Komunikasi dan Informasi (Kominfo)',
        code: 'KOMINFO',
        badgeColor: 'border-blue-500 text-blue-400',
        description: 'Mengelola ekosistem media digital, website resmi portal organisasi, dokumentasi audio-visual, desain grafis, dan siaran pers publik.',
        coordinators: [
          { name: 'Zidane Al-Ghifari', role: 'Kepala Departemen Kominfo', phone: '081234567821' },
          { name: 'Putri Maharani', role: 'Divisi Kreatif & Multimedia', phone: '081234567822' }
        ],
        guidelines: '1. Menyajikan konten dakwah silat berbudi luhur yang inspiratif dan beretika.\n2. Mengarsipkan dokumentasi resmi seluruh kegiatan komisariat secara terdigitalisasi.\n3. Menjaga keamanan data pengguna dan operasional web sistem informasi PSHT UNESA.',
        agendas: 'Pengelolaan Website & Portal, Liputan Agenda Rutin, Workshop Desain & Editing Silat.'
      },
      kewirausahaan: {
        id: 'kewirausahaan',
        name: 'Departemen Kewirausahaan',
        code: 'KWU',
        badgeColor: 'border-emerald-500 text-emerald-400',
        description: 'Mewadahi kemandirian finansial organisasi melalui penyediaan atribut resmi PSHT, seragam sakral, kaos silat kontingen, dan unit usaha kreatif.',
        coordinators: [
          { name: 'Rangga Daniswara', role: 'Kepala Departemen Kewirausahaan', phone: '081234567831' },
          { name: 'Sinta Nurfadilah', role: 'Manajer Penjualan & Merchandise', phone: '081234567832' }
        ],
        guidelines: '1. Menjaga kualitas dan standar keaslian atribut resmi persaudaraan.\n2. Mengembangkan unit ekonomi kreatif untuk menyokong dana kas kegiatan dan atlet kontingen.\n3. Mengedepankan prinsip transparansi dan kejujuran dalam berwirausaha.',
        agendas: 'Pre-Order Kaos Kontingen UNESA, Pengadaan Seragam Sakral & Sabuk, Bazar Dies Natalis.'
      },
      humas: {
        id: 'humas',
        name: 'Hubungan Masyarakat (Humas)',
        code: 'HUMAS',
        badgeColor: 'border-purple-500 text-purple-400',
        description: 'Membangun jejaring sinergis dengan pimpinan birokrasi UNESA, BEM/DPM, ormawa kampus, Pengurus Cabang Surabaya, serta masyarakat umum.',
        coordinators: [
          { name: 'Farizky Ramadhan', role: 'Kepala Departemen Humas', phone: '081234567841' },
          { name: 'Dhea Amanda', role: 'Divisi Hubungan Antar Lembaga', phone: '081234567842' }
        ],
        guidelines: '1. Menjaga nama baik dan marwah almamater UNESA serta perguruan PSHT di ruang publik.\n2. Menjalin komunikasi harmonis dengan rektorat dan kepolisian/aparat setempat.\n3. Menginisiasi program bakti sosial dan kemitraan strategis.',
        agendas: 'Audiensi Pimpinan Rektorat UNESA, Silaturahmi Cabang & Ranting, Aksi Pengabdian Masyarakat.'
      },
      tradisi: {
        id: 'tradisi',
        name: 'Departemen Tradisi & Ke-SH-an',
        code: 'TRADISI',
        badgeColor: 'border-amber-600 text-amber-500',
        description: 'Penjaga kemurnian ajaran kerohanian, tata krama tradisi, penguasaan senam dasar 1-90, jurus 1-36, sambung sakral, dan ujian kenaikan sabuk.',
        coordinators: [
          { name: 'Agus Setiawan', role: 'Kepala Departemen Tradisi', phone: '081234567851' },
          { name: 'Kangmas Sesepuh Rayon', role: 'Dewan Penasehat Tradisi', phone: '081234567852' }
        ],
        guidelines: '1. Mengajarkan panca dasar persaudaraan dan falsafah budi luhur secara istiqomah.\n2. Wajib mengenakan pakaian sakral lengkap hitam dan sabuk tingkatan saat latihan tradisi.\n3. Mengatur jadwal Ujian Kenaikan Tingkat (UKT) dan pemantapan mori bagi warga baru.',
        agendas: 'Latihan Rutin Tradisi (Senin 19.22 di LPSP & Kamis 19.22 di Lapangan Belakang Gema), Kajian Malam Jumat Legi, UKT Sabuk.'
      },
      prestasi: {
        id: 'prestasi',
        name: 'Departemen Prestasi & Olahraga',
        code: 'PRESTASI',
        badgeColor: 'border-red-500 text-red-400',
        description: 'Fokus pada pembinaan pesilat gelanggang tanding dan seni TGR (Tunggal Ganda Regu) mahasiswa untuk berkompetisi di kejuaraan daerah dan nasional.',
        coordinators: [
          { name: 'Bambang Triatmojo, S.Pd.', role: 'Kepala Departemen Prestasi / Pelatih', phone: '081234567861' },
          { name: 'Mbak Rini', role: 'Pelatih Tanding Gelanggang', phone: '081234567862' }
        ],
        guidelines: '1. Mewajibkan pemakaian perlengkapan keselamatan (body protector, deker tangan/kaki) saat sesi tanding gelanggang.\n2. Menyelenggarakan seleksi atlet secara objektif dan terukur.\n3. Mengawal nutrisi, fisik, dan kesiapan mental bertanding kontingen silat UNESA.',
        agendas: 'Latihan Rutin Prestasi (Selasa & Kamis 18.00 di Lapangan Silat GOR Inter UNESA Lidah), Try In Antar-Kampus, TC Kontingen POMPROV/POMNAS.'
      }
    }
  }
};

function readDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
    return defaultData;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    // Ensure entities exist
    if (!parsed.admins || !parsed.siswa || !parsed.warga) {
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
      return defaultData;
    }
    return parsed;
  } catch (err) {
    console.error('Error reading DB, falling back to default:', err);
    return defaultData;
  }
}

function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = {
  readDb,
  writeDb,
  defaultData,
  UPLOAD_DIR
};
