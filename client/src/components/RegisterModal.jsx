import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, UserPlus, Upload, FileText, CheckCircle2, AlertCircle, Info, Download, Printer, FileCheck } from 'lucide-react';
import SuratIzinModal from './SuratIzinModal';

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  const { registerSiswa, registerWarga } = useAuth();
  const [roleType, setRoleType] = useState('siswa'); // 'siswa' | 'warga'
  const [showSuratModal, setShowSuratModal] = useState(false);

  // Form states
  const [siswaForm, setSiswaForm] = useState({
    name: '',
    nim: '',
    nik: '',
    phone: '',
    parentName: '',
    email: '',
    password: ''
  });
  const [siswaFile, setSiswaFile] = useState(null);
  const [siswaPreview, setSiswaPreview] = useState('');

  const [wargaForm, setWargaForm] = useState({
    name: '',
    originRegion: '',
    sahPlace: '',
    phone: '',
    email: '',
    password: ''
  });
  const [wargaFile, setWargaFile] = useState(null);
  const [wargaPreview, setWargaPreview] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSiswaFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSiswaFile(file);
      const isHeic = file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif');
      const isPdf = file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf';
      if (isHeic || isPdf) {
        setSiswaPreview('');
      } else {
        const reader = new FileReader();
        reader.onloadend = () => setSiswaPreview(reader.result);
        reader.readAsDataURL(file);
      }
    }
  };

  const handleWargaFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setWargaFile(file);
      const isHeic = file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif');
      const isPdf = file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf';
      if (isHeic || isPdf) {
        setWargaPreview('');
      } else {
        const reader = new FileReader();
        reader.onloadend = () => setWargaPreview(reader.result);
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmitSiswa = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!siswaFile && !siswaPreview) {
      setErrorMsg('Wajib mengunggah Surat Izin Latihan yang telah ditandatangani orang tua & siswa.');
      return;
    }

    setIsLoading(true);
    try {
      const fd = new FormData();
      Object.keys(siswaForm).forEach((key) => fd.append(key, siswaForm[key]));
      if (siswaFile) {
        fd.append('signedPermission', siswaFile);
      } else if (siswaPreview) {
        fd.append('signedPermissionBase64', siswaPreview);
      }

      await registerSiswa(fd);
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Gagal mendaftar siswa.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitWarga = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!wargaFile && !wargaPreview) {
      setErrorMsg('Wajib mengunggah Foto Bukti Warga (KTA atau Foto Bersakral Lengkap).');
      return;
    }

    setIsLoading(true);
    try {
      const fd = new FormData();
      Object.keys(wargaForm).forEach((key) => fd.append(key, wargaForm[key]));
      if (wargaFile) {
        fd.append('evidence', wargaFile);
      } else if (wargaPreview) {
        fd.append('evidenceBase64', wargaPreview);
      }

      await registerWarga(fd);
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Gagal mendaftar warga.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto animate-fadeIn">
        <div className="relative w-full max-w-xl my-6 p-6 sm:p-8 bg-[#12131b] border-2 border-amber-500/40 rounded-3xl shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-14 h-16 rounded-xl overflow-hidden border-2 border-amber-500/50 shadow-lg shadow-amber-500/20 mb-2 bg-black p-0.5">
              <img src="/tamplate-konten-stuba.svg" alt="Logo PSHT" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-wide">
              Pendaftaran Akun <span className="text-amber-400">PSHT UNESA</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Sistem Registrasi Berbasis Peran (Siswa & Warga Anggota)
            </p>
          </div>

          {/* Validation Notice Banner */}
          <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-2.5 text-amber-300 text-xs">
            <Info size={16} className="shrink-0 mt-0.5 text-amber-400" />
            <div>
              <span className="font-bold text-amber-200">Logika Validasi:</span> Seluruh akun baru
              berstatus <span className="bg-amber-400/20 px-1.5 py-0.2 rounded font-mono font-bold text-amber-300">Pending</span>.
              Akun baru dapat login & mengakses isi web setelah divalidasi (<span className="text-emerald-400 font-bold">Active</span>) oleh Admin.
            </div>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-2 text-red-400 text-xs">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Role Switcher */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#181a26] border border-slate-700/80 rounded-2xl mb-5">
            <button
              type="button"
              onClick={() => {
                setRoleType('siswa');
                setErrorMsg('');
              }}
              className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition flex items-center justify-center gap-2 ${
                roleType === 'siswa'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🥋</span> Registrasi Siswa
            </button>
            <button
              type="button"
              onClick={() => {
                setRoleType('warga');
                setErrorMsg('');
              }}
              className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition flex items-center justify-center gap-2 ${
                roleType === 'warga'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>📜</span> Registrasi Warga
            </button>
          </div>

          {/* ================= FORM SISWA ================= */}
          {roleType === 'siswa' && (
            <form onSubmit={handleSubmitSiswa} className="space-y-3.5 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={siswaForm.name}
                    onChange={(e) => setSiswaForm({ ...siswaForm, name: e.target.value })}
                    placeholder="Nama Lengkap Siswa"
                    className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Nomor Induk Mahasiswa (NIM) *</label>
                  <input
                    type="text"
                    required
                    value={siswaForm.nim}
                    onChange={(e) => setSiswaForm({ ...siswaForm, nim: e.target.value })}
                    placeholder="Contoh: 2301010045"
                    className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Nomor Induk Kependudukan (NIK) *</label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    value={siswaForm.nik}
                    onChange={(e) => setSiswaForm({ ...siswaForm, nik: e.target.value })}
                    placeholder="16 Digit NIK KTP/KK"
                    className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Nomor WhatsApp Aktif *</label>
                  <input
                    type="tel"
                    required
                    value={siswaForm.phone}
                    onChange={(e) => setSiswaForm({ ...siswaForm, phone: e.target.value })}
                    placeholder="0812xxxxxxxx"
                    className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Nama Orang Tua / Wali *</label>
                <input
                  type="text"
                  required
                  value={siswaForm.parentName}
                  onChange={(e) => setSiswaForm({ ...siswaForm, parentName: e.target.value })}
                  placeholder="Nama Lengkap Orang Tua / Wali"
                  className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Alamat Email *</label>
                  <input
                    type="email"
                    required
                    value={siswaForm.email}
                    onChange={(e) => setSiswaForm({ ...siswaForm, email: e.target.value })}
                    placeholder="siswa@unesa.ac.id"
                    className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Kata Sandi Akun *</label>
                  <input
                    type="password"
                    required
                    value={siswaForm.password}
                    onChange={(e) => setSiswaForm({ ...siswaForm, password: e.target.value })}
                    placeholder="Minimal 6 karakter"
                    className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Unduh Template Surat Izin Box */}
              <div className="p-3.5 bg-gradient-to-r from-[#171927] to-[#1d1b28] border-2 border-amber-500/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <FileText size={20} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block text-xs">Template Surat Izin Latihan</span>
                    <p className="text-[11px] text-slate-300">
                      Wajib diunduh, dicetak, lalu ditandatangani orang tua & siswa
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSuratModal(true)}
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl shadow transition shrink-0 flex items-center justify-center gap-1.5"
                >
                  <Download size={14} /> Unduh Template
                </button>
              </div>

              {/* Upload Surat Izin Bertanda Tangan */}
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Upload Surat Izin yang Sudah Ditandatangani Orang Tua & Siswa *
                </label>
                <div className="relative border-2 border-dashed border-slate-700 hover:border-amber-500/70 rounded-2xl p-3 text-center bg-[#161822] transition">
                  <input
                    type="file"
                    accept="image/*,.heic,.heif,.jpg,.jpeg,.png,.webp,.pdf"
                    onChange={handleSiswaFile}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {siswaFile ? (
                    <div className="flex flex-col items-center py-1">
                      {siswaPreview ? (
                        <img src={siswaPreview} alt="Preview" className="max-h-28 rounded-lg mb-2 border border-slate-700 shadow" />
                      ) : (
                        <div className="flex items-center gap-2.5 p-2.5 px-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl mb-2">
                          <FileCheck className="text-amber-400 shrink-0" size={24} />
                          <div className="text-left">
                            <span className="text-xs text-white font-semibold block truncate max-w-[220px]">{siswaFile.name}</span>
                            <span className="text-[10px] text-amber-300">{(siswaFile.size / (1024 * 1024)).toFixed(2)} MB • Berkas Terpilih</span>
                          </div>
                        </div>
                      )}
                      <span className="text-[11px] text-amber-400 font-medium">Klik untuk mengganti berkas</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-2">
                      <Upload size={24} className="text-amber-400 mb-1" />
                      <span className="text-xs text-slate-300 font-medium">
                        Pilih foto atau berkas scan surat izin bertanda tangan
                      </span>
                      <span className="text-[10px] text-slate-500 mt-0.5">Format Bebas: JPG, HEIC, PNG, PDF (Maks. 30MB)</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold rounded-xl shadow-lg shadow-amber-500/20 text-xs sm:text-sm transition disabled:opacity-60"
              >
                {isLoading ? 'Mengirim Pendaftaran...' : 'Kirim Pendaftaran Siswa (Status: Pending)'}
              </button>
            </form>
          )}

          {/* ================= FORM WARGA ================= */}
          {roleType === 'warga' && (
            <form onSubmit={handleSubmitWarga} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Nama Lengkap & Gelar *</label>
                <input
                  type="text"
                  required
                  value={wargaForm.name}
                  onChange={(e) => setWargaForm({ ...wargaForm, name: e.target.value })}
                  placeholder="Nama Lengkap Warga"
                  className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Asal Daerah *</label>
                  <input
                    type="text"
                    required
                    value={wargaForm.originRegion}
                    onChange={(e) => setWargaForm({ ...wargaForm, originRegion: e.target.value })}
                    placeholder="Contoh: Surabaya / Madiun / Bojonegoro"
                    className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Asal Tempat Pengesahan *</label>
                  <input
                    type="text"
                    required
                    value={wargaForm.sahPlace}
                    onChange={(e) => setWargaForm({ ...wargaForm, sahPlace: e.target.value })}
                    placeholder="Contoh: Padepokan Madiun / Cab. Surabaya"
                    className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Nomor WhatsApp Aktif *</label>
                  <input
                    type="tel"
                    required
                    value={wargaForm.phone}
                    onChange={(e) => setWargaForm({ ...wargaForm, phone: e.target.value })}
                    placeholder="0812xxxxxxxx"
                    className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Alamat Email *</label>
                  <input
                    type="email"
                    required
                    value={wargaForm.email}
                    onChange={(e) => setWargaForm({ ...wargaForm, email: e.target.value })}
                    placeholder="warga@alumni.unesa.ac.id"
                    className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Kata Sandi Akun *</label>
                <input
                  type="password"
                  required
                  value={wargaForm.password}
                  onChange={(e) => setWargaForm({ ...wargaForm, password: e.target.value })}
                  placeholder="Minimal 6 karakter"
                  className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                />
              </div>

              {/* Upload Foto Bukti Warga (KTA / Foto bersakral) */}
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Upload Foto Bukti Warga (KTA / Foto Bersakral Lengkap) *
                </label>
                <div className="relative border-2 border-dashed border-slate-700 hover:border-amber-500/70 rounded-2xl p-3 text-center bg-[#161822] transition">
                  <input
                    type="file"
                    accept="image/*,.heic,.heif,.jpg,.jpeg,.png,.webp,.pdf"
                    onChange={handleWargaFile}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {wargaFile ? (
                    <div className="flex flex-col items-center py-1">
                      {wargaPreview ? (
                        <img src={wargaPreview} alt="Preview" className="max-h-28 rounded-lg mb-2 border border-slate-700 shadow" />
                      ) : (
                        <div className="flex items-center gap-2.5 p-2.5 px-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl mb-2">
                          <FileCheck className="text-amber-400 shrink-0" size={24} />
                          <div className="text-left">
                            <span className="text-xs text-white font-semibold block truncate max-w-[220px]">{wargaFile.name}</span>
                            <span className="text-[10px] text-amber-300">{(wargaFile.size / (1024 * 1024)).toFixed(2)} MB • Berkas Terpilih</span>
                          </div>
                        </div>
                      )}
                      <span className="text-[11px] text-amber-400 font-medium">Klik untuk mengganti berkas</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-2">
                      <Upload size={24} className="text-amber-400 mb-1" />
                      <span className="text-xs text-slate-300 font-medium">
                        Pilih foto KTA Warga atau foto mengenakan sakral mori lengkap
                      </span>
                      <span className="text-[10px] text-slate-500 mt-0.5">Format Bebas: JPG, HEIC, PNG, PDF (Maks. 30MB)</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold rounded-xl shadow-lg shadow-amber-500/20 text-xs sm:text-sm transition disabled:opacity-60"
              >
                {isLoading ? 'Mengirim Pendataan...' : 'Kirim Pendataan Warga (Status: Pending)'}
              </button>
            </form>
          )}

          <div className="mt-4 text-center text-xs text-slate-400">
            Sudah memiliki akun terdaftar?{' '}
            <button
              onClick={() => {
                onClose();
                onSwitchToLogin();
              }}
              className="text-amber-400 font-semibold hover:underline"
            >
              Masuk Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* Modal Unduh Surat Izin */}
      <SuratIzinModal isOpen={showSuratModal} onClose={() => setShowSuratModal(false)} />
    </>
  );
}
