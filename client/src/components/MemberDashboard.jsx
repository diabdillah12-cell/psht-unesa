import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import OrganisasiView from './OrganisasiView';
import PrestasiView from './PrestasiView';
import TradisiView from './TradisiView';
import PendingNotice from './PendingNotice';
import {
  Users,
  Trophy,
  BookOpen,
  Bell,
  Shield,
  Award,
  CheckCircle2,
  CreditCard,
  QrCode,
  Sparkles,
  Download
} from 'lucide-react';

export default function MemberDashboard() {
  const { user, isUnlocked, isPending, isRejected } = useAuth();
  const [activeMenu, setActiveMenu] = useState('organisasi'); // 'organisasi' | 'prestasi' | 'tradisi' | 'kta'
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const res = await api.getContent();
        setContent(res.content);
      } catch (err) {
        console.error('Failed to load content for member dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  // If status is Pending or Rejected, show dedicated status screen
  if (isPending || isRejected) {
    return <PendingNotice />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn pb-24 md:pb-12">
      {/* Top Welcome Bar with Profile Pill & Official Logo */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 sm:p-6 bg-[#13151f] border-2 border-amber-500/30 rounded-3xl shadow-xl">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-20 rounded-xl overflow-hidden border-2 border-amber-500/60 bg-black shadow-lg shadow-amber-500/20 shrink-0">
            <img
              src="/psht-logo.jpg"
              alt="Logo PSHT"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-white">{user?.name}</h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                <CheckCircle2 size={12} /> {user?.status || 'Unlocked'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              <span className="text-amber-400 font-semibold">{user?.memberType}</span> (
              {user?.beltLevel || 'Polos'}) • NIM:{' '}
              <span className="font-mono text-amber-300 font-semibold">{user?.nim || '-'}</span> •{' '}
              {user?.faculty || user?.rayonAsal || 'UNESA'}
            </p>
          </div>
        </div>

        {/* Action badges */}
        <div className="flex items-center gap-2.5 flex-wrap self-start md:self-auto">
          <button
            onClick={() => setActiveMenu('kta')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeMenu === 'kta'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
            }`}
          >
            <CreditCard size={15} />
            <span>KTA Digital</span>
          </button>

          <div className="flex items-center gap-2 text-xs bg-black/50 border border-slate-800 px-3.5 py-2 rounded-xl text-slate-300">
            <Shield size={14} className="text-amber-400 shrink-0" />
            <span>Mode: <strong className="text-white">Read-Only</strong></span>
          </div>
        </div>
      </div>

      {/* Announcement Running Banner */}
      {content?.settings?.announcement && (
        <div className="flex items-center gap-3 px-4 py-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs sm:text-sm text-amber-300">
          <Bell size={18} className="shrink-0 text-amber-400 animate-bounce" />
          <span className="font-medium truncate">{content.settings.announcement}</span>
        </div>
      )}

      {/* 3 Main Menu Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setActiveMenu('organisasi')}
          className={`p-4 rounded-2xl border text-left transition duration-200 flex items-center gap-4 ${
            activeMenu === 'organisasi'
              ? 'bg-[#191b28] border-amber-500/80 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50'
              : 'bg-[#12131b] border-slate-800 hover:border-slate-700 text-slate-400'
          }`}
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              activeMenu === 'organisasi'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-slate-800 text-slate-300'
            }`}
          >
            <Users size={22} />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-amber-400/80 font-bold block">
              Menu 1
            </span>
            <h3 className="font-bold text-white text-base">Pedoman Organisasi</h3>
            <p className="text-xs text-slate-400">Pengurus, Agenda & Proker</p>
          </div>
        </button>

        <button
          onClick={() => setActiveMenu('prestasi')}
          className={`p-4 rounded-2xl border text-left transition duration-200 flex items-center gap-4 ${
            activeMenu === 'prestasi'
              ? 'bg-[#191b28] border-amber-500/80 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50'
              : 'bg-[#12131b] border-slate-800 hover:border-slate-700 text-slate-400'
          }`}
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              activeMenu === 'prestasi'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-slate-800 text-slate-300'
            }`}
          >
            <Trophy size={22} />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-amber-400/80 font-bold block">
              Menu 2
            </span>
            <h3 className="font-bold text-white text-base">Pedoman Prestasi</h3>
            <p className="text-xs text-slate-400">Jadwal GOR Inter, Atlet & Medali</p>
          </div>
        </button>

        <button
          onClick={() => setActiveMenu('tradisi')}
          className={`p-4 rounded-2xl border text-left transition duration-200 flex items-center gap-4 ${
            activeMenu === 'tradisi'
              ? 'bg-[#191b28] border-amber-500/80 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50'
              : 'bg-[#12131b] border-slate-800 hover:border-slate-700 text-slate-400'
          }`}
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              activeMenu === 'tradisi'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-slate-800 text-slate-300'
            }`}
          >
            <BookOpen size={22} />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-amber-400/80 font-bold block">
              Menu 3
            </span>
            <h3 className="font-bold text-white text-base">Pedoman Tradisi</h3>
            <p className="text-xs text-slate-400">Jadwal LPSP/Gema, Materi & UKT</p>
          </div>
        </button>
      </div>

      {/* VIEW: KTA DIGITAL MODAL / CARD */}
      {activeMenu === 'kta' && (
        <div className="bg-[#12131b] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 text-center space-y-6 max-w-xl mx-auto shadow-2xl">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
              IDENTITAS RESMI ANGGOTA
            </span>
            <h3 className="text-2xl font-black text-white mt-1">Kartu Tanda Anggota Digital</h3>
            <p className="text-xs text-slate-400">Bukti keanggotaan sah dan terverifikasi di PSHT UNESA</p>
          </div>

          {/* Realistic Membership Card */}
          <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden p-6 bg-gradient-to-br from-[#1b1c28] via-[#101119] to-[#0a0a0f] border-2 border-amber-500/50 shadow-2xl text-left space-y-5">
            {/* Card Header */}
            <div className="flex items-center justify-between pb-3 border-b border-amber-500/30">
              <div className="flex items-center gap-3">
                <div className="w-9 h-11 rounded-lg overflow-hidden border border-amber-400/60 bg-black shrink-0">
                  <img src="/psht-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-black tracking-wider text-white">
                    PERSAUDARAAN SETIA HATI TERATE
                  </h4>
                  <p className="text-[10px] text-amber-400 font-bold">KOMISARIAT UNIVERSITAS NEGERI SURABAYA</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                AKTIF
              </span>
            </div>

            {/* Card Body */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Nama Anggota:</span>
                  <span className="font-extrabold text-white text-base block">{user?.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">NIM / Identitas:</span>
                    <span className="font-mono text-amber-300 font-bold">{user?.nim || '-'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Tingkatan:</span>
                    <span className="text-white font-semibold">{user?.beltLevel}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Kategori & Rayon:</span>
                  <span className="text-slate-200">
                    {user?.memberType} • {user?.faculty || user?.rayonAsal || 'UNESA'}
                  </span>
                </div>
              </div>

              {/* QR Mock */}
              <div className="p-2.5 bg-white rounded-xl shrink-0 flex flex-col items-center shadow">
                <QrCode size={56} className="text-black" />
                <span className="text-[8px] font-mono text-slate-800 font-bold mt-0.5">VALID</span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>ID: {user?.id}</span>
              <span className="text-amber-400 italic font-serif">"Memayu Hayuning Bawana"</span>
            </div>
          </div>

          <button
            onClick={() => setActiveMenu('organisasi')}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition"
          >
            Kembali ke Dasbor Pedoman
          </button>
        </div>
      )}

      {/* Main Content Area */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">Memuat data pedoman...</div>
      ) : (
        <div className="pt-2">
          {activeMenu === 'organisasi' && <OrganisasiView data={content?.organisasi} />}
          {activeMenu === 'prestasi' && <PrestasiView data={content?.prestasi} />}
          {activeMenu === 'tradisi' && <TradisiView data={content?.tradisi} />}
        </div>
      )}

      {/* Mobile Floating Bottom Bar for Fast Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#090a0f]/95 backdrop-blur-xl border-t border-amber-500/20 py-2 px-4 md:hidden flex items-center justify-around">
        <button
          onClick={() => setActiveMenu('organisasi')}
          className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-semibold ${
            activeMenu === 'organisasi' ? 'text-amber-400' : 'text-slate-400'
          }`}
        >
          <Users size={18} />
          <span>Organisasi</span>
        </button>

        <button
          onClick={() => setActiveMenu('prestasi')}
          className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-semibold ${
            activeMenu === 'prestasi' ? 'text-amber-400' : 'text-slate-400'
          }`}
        >
          <Trophy size={18} />
          <span>Prestasi</span>
        </button>

        <button
          onClick={() => setActiveMenu('tradisi')}
          className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-semibold ${
            activeMenu === 'tradisi' ? 'text-amber-400' : 'text-slate-400'
          }`}
        >
          <BookOpen size={18} />
          <span>Tradisi</span>
        </button>

        <button
          onClick={() => setActiveMenu('kta')}
          className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-semibold ${
            activeMenu === 'kta' ? 'text-amber-400' : 'text-slate-400'
          }`}
        >
          <CreditCard size={18} />
          <span>KTA</span>
        </button>
      </div>
    </div>
  );
}
