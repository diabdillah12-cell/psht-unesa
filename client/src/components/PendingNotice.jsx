import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Clock, ShieldAlert, RefreshCw, MessageSquare, LogOut, FileCheck } from 'lucide-react';

export default function PendingNotice() {
  const { user, logout, refreshProfile, isSiswa, isWarga } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshProfile();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const isRejected = user?.status === 'Rejected';
  const proofUrl = isSiswa ? user?.signedPermissionUrl : user?.evidenceUrl;

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#12131b] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 text-center shadow-2xl">
        {/* Animated Icon */}
        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full mb-5">
          {isRejected ? (
            <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <ShieldAlert size={40} />
            </div>
          ) : (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400/20 opacity-75"></span>
              <div className="relative w-20 h-20 rounded-full bg-amber-500/10 border-2 border-amber-500/40 flex items-center justify-center text-amber-400">
                <Clock size={38} />
              </div>
            </>
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
          {isRejected ? (
            <span className="text-red-400">Pendaftaran Ditolak / Perlu Diperbaiki</span>
          ) : (
            <>
              Status Akun: <span className="text-amber-400">Menunggu Validasi (Pending)</span>
            </>
          )}
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          {isRejected
            ? 'Berkas pendaftaran atau data yang diunggah belum memenuhi verifikasi pengurus. Silakan hubungi admin komisariat.'
            : 'Pendaftaran Anda telah tercatat dalam sistem basis data. Anda dapat mengakses penuh Dasbor Pengguna setelah akun divalidasi oleh Pengurus Admin.'}
        </p>

        {/* Application Summary Card */}
        <div className="mt-6 bg-[#181a26] border border-slate-800 rounded-2xl p-4 sm:p-5 text-left text-xs sm:text-sm space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-slate-400">Nama Lengkap</span>
            <span className="font-bold text-white">{user?.name}</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-slate-400">Peran Akun</span>
            <span className="font-extrabold uppercase text-amber-300">
              {isSiswa ? 'Siswa' : 'Warga (Anggota)'}
            </span>
          </div>

          {isSiswa ? (
            <>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">NIM / NIK</span>
                <span className="font-mono text-slate-200">
                  {user?.nim} / {user?.nik}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Nama Orang Tua</span>
                <span className="text-slate-200">{user?.parentName}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Asal Daerah</span>
                <span className="text-slate-200">{user?.originRegion}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Tempat Pengesahan</span>
                <span className="text-slate-200">{user?.sahPlace}</span>
              </div>
            </>
          )}

          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-slate-400">Status Akun</span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-xs ${
                isRejected
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-yellow-500/20 text-yellow-300 animate-pulse'
              }`}
            >
              ● {user?.status}
            </span>
          </div>

          {proofUrl && (
            <div className="pt-2">
              <span className="text-slate-400 block mb-1.5">Berkas yang Diunggah:</span>
              <a
                href={proofUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs transition font-semibold"
              >
                <FileCheck size={14} />
                <span>
                  {isSiswa ? 'Lihat Surat Izin Bertanda Tangan' : 'Lihat Foto Bukti Warga (KTA)'}
                </span>
              </a>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow transition disabled:opacity-60"
          >
            <RefreshCw size={15} className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Memeriksa...' : 'Cek Status Validasi'}
          </button>

          <a
            href="https://wa.me/6281234567890?text=Halo%20Admin%20PSHT%20UNESA,%20saya%20sudah%20mendaftar%20dan%20ingin%20konfirmasi%20validasi%20akun."
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition"
          >
            <MessageSquare size={15} /> Konfirmasi Admin via WA
          </a>

          <button
            onClick={logout}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition"
          >
            <LogOut size={15} /> Keluar
          </button>
        </div>

        <p className="mt-5 text-[11px] text-slate-500">
          💡 Tips: Anda dapat login menggunakan akun <b>Admin (Pengurus)</b> untuk memvalidasi akun
          ini menjadi <b>Active</b> melalui menu Manajemen Pengguna.
        </p>
      </div>
    </div>
  );
}
