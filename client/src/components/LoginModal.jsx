import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, Eye, EyeOff, ShieldCheck, UserCheck, AlertCircle } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      await login(email, password);
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Gagal masuk. Periksa kembali email dan kata sandi Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md p-6 sm:p-8 bg-[#12131b] border-2 border-amber-500/40 rounded-3xl shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-20 rounded-xl overflow-hidden border-2 border-amber-500/50 shadow-lg shadow-amber-500/20 mb-2 bg-black p-0.5">
            <img src="/tamplate-konten-stuba.svg" alt="Logo PSHT" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-wide">
            Masuk Portal <span className="text-amber-400">PSHT UNESA</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Hak Akses Berbasis Peran: Admin (Pengurus), Warga, & Siswa
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-2.5 text-red-400 text-xs">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Email Terdaftar
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@unesa.ac.id"
                className="w-full pl-10 pr-4 py-2.5 bg-[#191b26] border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Kata Sandi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-[#191b26] border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold rounded-xl shadow-lg shadow-amber-500/20 active:scale-[0.99] transition disabled:opacity-60 text-sm"
          >
            {isLoading ? 'Memproses Masuk...' : 'Masuk Sekarang'}
          </button>
        </form>

        {/* Quick Demo Fill Buttons */}
        <div className="mt-5 pt-4 border-t border-slate-800">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center mb-2">
            Akun Demo Pengujian Cepat:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickLogin('admin@psht-unesa.ac.id', 'admin123')}
              className="px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-left transition flex items-center gap-1.5"
            >
              <ShieldCheck size={14} className="text-amber-400 shrink-0" />
              <span className="truncate">Admin (Pengurus)</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('warga.aktif@unesa.ac.id', 'password123')}
              className="px-2.5 py-1.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-lg text-left transition flex items-center gap-1.5"
            >
              <span className="text-sky-400 font-bold text-xs">📜</span>
              <span className="truncate">Warga (Active)</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('siswa.aktif@unesa.ac.id', 'password123')}
              className="px-2.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-left transition flex items-center gap-1.5"
            >
              <UserCheck size={14} className="text-emerald-400 shrink-0" />
              <span className="truncate">Siswa (Active)</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('siswa.pending@unesa.ac.id', 'password123')}
              className="px-2.5 py-1.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-lg text-left transition flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
              <span className="truncate">Siswa (Pending)</span>
            </button>
          </div>
        </div>

        {/* Footer switch */}
        <div className="mt-4 text-center text-xs text-slate-400">
          Belum terdaftar?{' '}
          <button
            onClick={() => {
              onClose();
              onSwitchToRegister();
            }}
            className="text-amber-400 font-semibold hover:underline"
          >
            Daftar Akun Baru
          </button>
        </div>
      </div>
    </div>
  );
}
