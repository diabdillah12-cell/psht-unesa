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

## 🚀 Menjalankan Aplikasi Lokal

Aplikasi aktif berjalan di:
👉 **`http://localhost:5000`**

Dapat dijalankan kapan saja melalui file [run.bat](file:///C:/PSHT%20UNESA/run.bat) atau terminal:
```bash
node server/index.js
```

---

## 📦 Panduan Push ke GitHub

Repositori Git lokal sudah diinisialisasi pada cabang `main` dan file `.gitignore` telah dipersiapkan dengan rapi.

Untuk menghubungkan dan mem-push ke akun GitHub Anda:

1. **Buat Repositori Baru di GitHub**:
   - Buka [github.com/new](https://github.com/new).
   - Beri nama repositori (contoh: `psht-unesa`).
   - Pilih **Public** atau **Private** (bebas).
   - **Jangan** centang *"Initialize this repository with a README, .gitignore, or license"* (karena proyek lokal sudah memilikinya).
   - Klik **Create repository**.

2. **Jalankan Perintah Push di Terminal Proyek**:
   Ganti `USERNAME` dengan username GitHub Anda:
   ```bash
   git remote add origin https://github.com/USERNAME/psht-unesa.git
   git branch -M main
   git push -u origin main
   ```

---

## ☁️ Panduan Deploy ke Vercel

Proyek ini telah dikonfigurasi penuh dengan [`vercel.json`](file:///C:/PSHT%20UNESA/vercel.json) dan Serverless Function [`api/index.js`](file:///C:/PSHT%20UNESA/api/index.js).

### Metode Rekomendasi (Terhubung Langsung dengan GitHub):
1. Buka [vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
2. Klik tombol **"Add New..."** lalu pilih **"Project"**.
3. Pilih repositori `psht-unesa` yang telah Anda push ke GitHub, lalu klik **"Import"**.
4. Di halaman konfigurasi proyek:
   - **Framework Preset**: Biarkan *Other* atau *Vite*.
   - **Build and Output Settings**: Konfigurasi otomatis terbaca dari `vercel.json`:
     - *Build Command*: `npm run build`
     - *Output Directory*: `client/dist`
   - **Environment Variables** (Opsional):
     - `JWT_SECRET`: `psht_unesa_rbac_secret_2026` (atau kunci rahasia pilihan Anda).
5. Klik **"Deploy"**.
6. Selesai! Web PSHT UNESA Anda akan langsung aktif dengan URL resmi Vercel (contoh: `https://psht-unesa.vercel.app`).
   Setiap kali Anda melakukan `git push`, Vercel akan otomatis melakukan update dan deploy ulang secara real-time.
