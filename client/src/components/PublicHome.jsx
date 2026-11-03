import React from 'react';
import {
  Shield,
  Newspaper,
  Camera,
  Layers,
  CheckCircle2,
  ArrowRight,
  UserPlus,
  LogIn,
  Download,
  Printer,
  Sparkles,
  Lock,
  Clock,
  MapPin
} from 'lucide-react';

export default function PublicHome({ onOpenLogin, onOpenRegister, onOpenSuratModal, onGoToDashboard, user, content }) {
  const settings = content?.settings || {};

  return (
    <div className="space-y-16 animate-fadeIn pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-16">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600/20 via-amber-500/20 to-black border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-black tracking-wide shadow-sm">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span>KOMUNITAS & MANAJEMEN ORGANISASI PSHT KOMISARIAT UNESA</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Menempa Insan Berbudi Luhur, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                  Mengabdi untuk Perguruan & Bangsa
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Sistem informasi dan manajemen organisasi terpadu berbasis peran (RBAC) untuk{' '}
                <strong className="text-white">Admin (Pengurus)</strong>,{' '}
                <strong className="text-white">Warga (Anggota)</strong>, dan{' '}
                <strong className="text-white">Siswa</strong> di lingkungan Universitas Negeri Surabaya.
              </p>

              {/* Falsafah Pill */}
              <div className="p-3.5 bg-[#12131b] border-l-4 border-amber-500 rounded-xl text-xs sm:text-sm italic text-amber-200/90 max-w-lg mx-auto lg:mx-0 shadow-inner">
                "Sepiro Gedhening Sengsoro Yen Tinompo Amung Dadi Cobo - Memayu Hayuning Bawana"
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                {user ? (
                  <button
                    onClick={onGoToDashboard}
                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-amber-500/25 active:scale-95 transition flex items-center justify-center gap-2"
                  >
                    <span>Masuk ke Dasbor ({user.role.toUpperCase()})</span>
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={onOpenRegister}
                      className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-amber-500/25 active:scale-95 transition flex items-center justify-center gap-2"
                    >
                      <UserPlus size={18} />
                      <span>Daftar Akun (Siswa / Warga)</span>
                    </button>

                    <button
                      onClick={onOpenSuratModal}
                      className="w-full sm:w-auto px-6 py-3.5 bg-[#181a28] hover:bg-[#202336] text-amber-300 border-2 border-amber-500/40 font-bold text-sm sm:text-base rounded-2xl active:scale-95 transition flex items-center justify-center gap-2"
                    >
                      <Download size={18} className="text-amber-400" />
                      <span>Template Surat Izin</span>
                    </button>
                  </>
                )}
              </div>

              <p className="text-xs text-slate-400">
                🔒 Sistem Keamanan RBAC: Akun pendaftar baru berstatus{' '}
                <span className="text-amber-400 font-mono font-bold">Pending</span> dan diverifikasi oleh Admin.
              </p>
            </div>

            {/* Right: Official Logo Frame */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-red-600 via-amber-500 to-amber-700 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition duration-500"></div>
              <div className="relative w-64 sm:w-80 rounded-2xl overflow-hidden border-2 border-amber-500/60 bg-black shadow-2xl p-2.5">
                <img
                  src="/tamplate-konten-stuba.svg"
                  alt="Lambang PSHT UNESA"
                  className="w-full h-auto rounded-xl object-contain drop-shadow"
                />
                <div className="mt-2.5 text-center py-1.5 bg-[#111219] rounded-lg border border-slate-800">
                  <span className="text-[11px] font-black tracking-widest text-amber-400 uppercase">
                    PSHT KOMISARIAT UNESA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 BAGIAN UTAMA APLIKASI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-red-500">
            SISTEM MANAJEMEN TERINTEGRASI
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            3 Bagian Utama Sistem PSHT UNESA
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto leading-relaxed">
            Menjamin akurasi pendataan anggota, kemudahan akses informasi bagi warga & siswa, serta
            kendali penuh bagi pengurus admin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bagian 1 */}
          <div className="bg-[#12131b] border-2 border-amber-500/30 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-amber-400/60 transition shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-4 font-black text-lg">
                1
              </div>
              <span className="text-[10px] font-black uppercase text-amber-400 block mb-1">
                PORTAL PUBLIK & REGISTRASI
              </span>
              <h3 className="text-xl font-bold text-white mb-2">Pendaftaran Terpisah</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
                <span>
                  • <strong>Siswa:</strong> Nama, NIM, NIK, No WA, Nama Orang Tua, Email, dan unggah
                  Surat Izin bertanda tangan.
                </span>
                <br />
                <span>
                  • <strong>Warga:</strong> Nama, Asal Daerah, Tempat Pengesahan, No WA, Email, dan
                  unggah bukti KTA / foto bersakral.
                </span>
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={onOpenRegister}
                className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1"
              >
                Buka Formulir Pendaftaran <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Bagian 2 */}
          <div className="bg-[#12131b] border-2 border-red-500/30 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-red-400/60 transition shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 mb-4 font-black text-lg">
                2
              </div>
              <span className="text-[10px] font-black uppercase text-red-400 block mb-1">
                DASBOR PENGGUNA (READ-ONLY)
              </span>
              <h3 className="text-xl font-bold text-white mb-2">Informasi Warga & Siswa</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Hanya dapat diakses setelah login dan akun dinyatakan Active. Menampilkan{' '}
                <strong className="text-white">Berita Nasional PSHT</strong>, galeri{' '}
                <strong className="text-white">Dokumentasi & Proker</strong>, serta pedoman lengkap{' '}
                <strong className="text-white">7 Departemen</strong>.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={user ? onGoToDashboard : onOpenLogin}
                className="text-xs text-red-400 font-bold hover:underline flex items-center gap-1"
              >
                Masuk ke Dasbor Pengguna <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Bagian 3 */}
          <div className="bg-[#12131b] border-2 border-amber-500/30 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-amber-400/60 transition shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-4 font-black text-lg">
                3
              </div>
              <span className="text-[10px] font-black uppercase text-amber-400 block mb-1">
                DASBOR ADMIN (FULL CRUD & CMS)
              </span>
              <h3 className="text-xl font-bold text-white mb-2">Pusat Kendali Pengurus</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Akses eksklusif Pengurus Admin mengelola data pendaftar Siswa & Warga (Approve/Reject),
                menerbitkan Berita Nasional, mengunggah Dokumentasi/Proker, mengatur 7 Departemen, dan
                mengatur tata letak tampilan (CMS).
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={user ? onGoToDashboard : onOpenLogin}
                className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1"
              >
                Login Pengurus Admin <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* KLASIFIKASI 7 DEPARTEMEN RINGKAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#11121a] border-2 border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
              STRUKTUR DIVISI RESMI
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              7 Pilar Departemen PSHT UNESA
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
            <div className="p-3 bg-[#171926] rounded-2xl border border-slate-800">
              <span className="text-lg block">👑</span>
              <span className="text-xs font-bold text-white block mt-1">BPH</span>
              <span className="text-[10px] text-slate-400">Badan Pengurus Harian</span>
            </div>

            <div className="p-3 bg-[#171926] rounded-2xl border border-slate-800">
              <span className="text-lg block">🌱</span>
              <span className="text-xs font-bold text-white block mt-1">PSDM</span>
              <span className="text-[10px] text-slate-400">Kaderisasi & Pelatihan</span>
            </div>

            <div className="p-3 bg-[#171926] rounded-2xl border border-slate-800">
              <span className="text-lg block">📡</span>
              <span className="text-xs font-bold text-white block mt-1">Kominfo</span>
              <span className="text-[10px] text-slate-400">Media & Publikasi</span>
            </div>

            <div className="p-3 bg-[#171926] rounded-2xl border border-slate-800">
              <span className="text-lg block">💼</span>
              <span className="text-xs font-bold text-white block mt-1">KWU</span>
              <span className="text-[10px] text-slate-400">Kewirausahaan</span>
            </div>

            <div className="p-3 bg-[#171926] rounded-2xl border border-slate-800">
              <span className="text-lg block">🤝</span>
              <span className="text-xs font-bold text-white block mt-1">Humas</span>
              <span className="text-[10px] text-slate-400">Kemitraan & Relasi</span>
            </div>

            <div className="p-3 bg-[#171926] rounded-2xl border border-slate-800">
              <span className="text-lg block">🥋</span>
              <span className="text-xs font-bold text-white block mt-1">Tradisi</span>
              <span className="text-[10px] text-slate-400">Ke-SH-an & UKT Sabuk</span>
            </div>

            <div className="p-3 bg-[#171926] rounded-2xl border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-lg block">🏆</span>
              <span className="text-xs font-bold text-white block mt-1">Prestasi</span>
              <span className="text-[10px] text-slate-400">Atlet & Gelanggang</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
