# Sistem Komunitas & Manajemen Organisasi PSHT Komisariat UNESA

Aplikasi Web Modern, Dinamis, dan Responsif berbasis **Role-Based Access Control (RBAC)** dengan palet warna khas: **Hitam, Kuning Emas, Merah, dan Putih**.

---

## 🌟 3 Bagian Utama Sistem & Hak Akses Berbasis Peran

### 1. Portal Publik & Registrasi Berbeda Entitas
- **Laman Depan & Akses Masuk**: Menampilkan profil resmi PSHT UNESA, logo resmi SVG `tamplate konten stuba.svg`, falsafah luhur, dan tombol akses cepat.
- **Registrasi Siswa**:
  - Kolom data: **Nama Lengkap**, **NIM**, **NIK**, **Nomor WA**, **Nama Orang Tua**, **Email**, dan **Kata Sandi**.
  - **Unduh Template Surat Izin**: Tersedia tombol/tautan untuk membuka dan mengunduh berkas template resmi `Surat Pernyataan & Izin Orang Tua/Wali Mengikuti Latihan PSHT UNESA` siap cetak (HTML/PDF).
  - Pendaftar diwajibkan mengunggah kembali foto/scan surat izin yang sudah ditandatangani orang tua & siswa.
- **Registrasi Warga**:
  - Kolom data: **Nama Lengkap**, **Asal Daerah**, **Asal Tempat Pengesahan**, **Nomor WA**, **Email**, dan **Kata Sandi**.
  - Wajib mengunggah **Foto Bukti Warga** (KTA / Foto bersakral mori lengkap).
- **Logika Validasi**: Seluruh akun baru yang mendaftar otomatis berstatus **`Pending`**. Pengguna baru dapat login dan mengakses web setelah divalidasi (**`Active`**) oleh Admin.

---

### 2. Dasbor Pengguna (Warga & Siswa - Read Only)
Hanya dapat diakses setelah login dan akun telah berstatus **`Active`**. Menyajikan informasi:
1. **Berita Nasional**: Feed khusus warta PSHT skala nasional yang mudah diidentifikasi dengan label merah **`BERITA NASIONAL`**.
2. **Dokumentasi & Proker**: Galeri foto kegiatan dan daftar program kerja strategis organisasi (disertai status progres dan penanggung jawab).
3. **Struktur Organisasi & Informasi 7 Departemen**:
   - **BPH (Badan Pengurus Harian)**: Ketua Umum, Wakil Ketua, Sekretaris, Bendahara, tupoksi dan koordinasi pleno.
   - **PSDM Organisasi**: Pembinaan SDM, kaderisasi siswa, pelatihan kepemimpinan silat.
   - **Komunikasi dan Informasi (Kominfo)**: Portal web, publikasi media, dan dokumentasi kreatif.
   - **Kewirausahaan**: Pengadaan atribut sakral, kaos kontingen, dan kemandirian finansial.
   - **Hubungan Masyarakat (Humas)**: Kemitraan birokrasi kampus, relasi ormawa, dan pengabdian masyarakat.
   - **Tradisi**: Kemurnian ajaran ke-SH-an, senam dasar 1-90, jurus 1-36, dan jadwal latihan tradisi (*Senin 19.22 di LPSP & Kamis 19.22 di Belakang Gema*).
   - **Prestasi**: Pembinaan atlet tanding & seni TGR, etalase medali, dan jadwal latihan prestasi (*Selasa & Kamis 18.00 di GOR Inter Lidah*).

---

### 3. Dasbor Admin (Full CRUD & CMS)
Akses eksklusif Pengurus Administrator untuk mengelola seluruh basis data dan tampilan antarmuka:
- **Manajemen Basis Data & Pengguna (CRUD)**:
  - Database terstruktur memisahkan entitas **Siswa** dan **Warga**.
  - Melihat pendaftar baru, meninjau berkas surat izin / bukti KTA secara langsung.
  - Aksi validasi: mengubah status dari **`Pending`** menjadi **`Active`** (*Approve*) atau **`Rejected`** (*Tolak*).
  - Fitur sunting (*edit*) dan hapus (*delete*) pengguna.
- **Manajemen Konten (CRUD)**:
  - Mengunggah, mengedit, dan menghapus artikel **Berita Nasional**.
  - Mengunggah foto dokumentasi kegiatan dan mengelola target **Program Kerja (Proker)**.
- **Manajemen Departemen**:
  - Memperbarui deskripsi, pedoman khusus, agenda rutin, dan daftar koordinator divisi di masing-masing **7 Departemen**.
- **Manajemen Tampilan (CMS Layout)**:
  - Mengatur teks judul beranda, motto, teks berjalan (*running announcement banner*) di dasbor pengguna, dan kontak sekretariat.

---

## 🔑 Akun Demo Pengujian Cepat

| Peran | Alamat Email | Kata Sandi | Status Akses |
|---|---|---|---|
| **Admin (Pengurus)** | `admin@psht-unesa.ac.id` | `admin123` | Akses Penuh Dasbor Admin CMS |
| **Warga (Anggota)** | `warga.aktif@unesa.ac.id` | `password123` | **`Active`** (Dasbor Pengguna Read-Only) |
| **Siswa** | `siswa.aktif@unesa.ac.id` | `password123` | **`Active`** (Dasbor Pengguna Read-Only) |
| **Siswa (Pending)** | `siswa.pending@unesa.ac.id` | `password123` | **`Pending`** (Layar Menunggu Verifikasi) |
| **Warga (Pending)** | `warga.pending@unesa.ac.id` | `password123` | **`Pending`** (Layar Menunggu Verifikasi) |

---

## 🚀 Menjalankan Aplikasi

Aplikasi aktif berjalan di:
👉 **`http://localhost:5000`**

Dapat dijalankan kapan saja melalui file [run.bat](file:///C:/PSHT%20UNESA/run.bat) atau terminal PowerShell:
```powershell
$env:Path = "C:\Program Files\nodejs;" + $env:Path
node server/index.js
```
