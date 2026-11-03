import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import AdminUsersCRUD from './AdminUsersCRUD';
import AdminNewsCRUD from './AdminNewsCRUD';
import AdminProkerCRUD from './AdminProkerCRUD';
import AdminDepartmentsCMS from './AdminDepartmentsCMS';
import AdminLayoutCMS from './AdminLayoutCMS';
import {
  ShieldCheck,
  Users,
  Newspaper,
  Camera,
  Layers,
  Layout,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'news' | 'proker' | 'departments' | 'layout'
  const [stats, setStats] = useState({
    totalSiswa: 0,
    totalWarga: 0,
    totalPending: 0,
    totalNews: 0,
    totalProker: 0
  });

  const loadStats = async () => {
    try {
      const [usersRes, newsRes, prokerRes] = await Promise.all([
        api.getAdminUsers(),
        api.getNews(),
        api.getProker()
      ]);

      const siswaCount = usersRes.siswa?.length || 0;
      const wargaCount = usersRes.warga?.length || 0;
      const pendingCount = usersRes.totalPending || 0;
      const newsCount = newsRes.news?.length || 0;
      const prokerCount = prokerRes.proker?.length || 0;

      setStats({
        totalSiswa: siswaCount,
        totalWarga: wargaCount,
        totalPending: pendingCount,
        totalNews: newsCount,
        totalProker: prokerCount
      });
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn pb-16">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171926] via-[#201d2d] to-[#12131b] border-2 border-amber-500/40 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold mb-2">
              <ShieldCheck size={14} className="text-amber-400" /> Pusat Kontrol Administrator (CMS)
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Dasbor Manajemen <span className="text-amber-400">PSHT UNESA</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Hak akses penuh Administrator mengelola basis data Siswa & Warga, memvalidasi pendaftaran,
              menerbitkan Berita Nasional, mengelola Dokumentasi/Proker, serta konfigurasi 7 Departemen.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#111219] p-3 rounded-2xl border border-slate-800 self-start md:self-auto">
            <div className="w-12 h-14 rounded-xl overflow-hidden border border-amber-500/60 bg-black shrink-0 p-0.5">
              <img src="/tamplate-konten-stuba.svg" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-bold text-amber-400">
                Pengurus Admin
              </span>
              <strong className="text-white block font-semibold">{user?.name}</strong>
              <span className="text-[11px] text-slate-400 font-mono">{user?.email}</span>
            </div>
          </div>
        </div>

        {/* Quick Stat Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mt-6 pt-5 border-t border-slate-800/80">
          <div
            onClick={() => setActiveTab('users')}
            className={`p-3.5 rounded-2xl border cursor-pointer transition ${
              stats.totalPending > 0
                ? 'bg-yellow-500/10 border-yellow-500/50 hover:bg-yellow-500/20'
                : 'bg-[#12131b]/80 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Clock size={16} className={stats.totalPending > 0 ? 'text-yellow-400 animate-pulse' : 'text-slate-400'} />
              <span className="text-[11px] font-bold uppercase text-yellow-300">Pending Validasi</span>
            </div>
            <span className="text-xl sm:text-2xl font-black text-yellow-400 block mt-1">
              {stats.totalPending}
            </span>
          </div>

          <div
            onClick={() => setActiveTab('users')}
            className="p-3.5 bg-[#12131b]/80 border border-slate-800 rounded-2xl cursor-pointer hover:border-amber-500/40 transition"
          >
            <span className="text-[11px] font-semibold uppercase text-slate-400 block">Total Siswa</span>
            <span className="text-xl sm:text-2xl font-black text-white block mt-1">{stats.totalSiswa}</span>
          </div>

          <div
            onClick={() => setActiveTab('users')}
            className="p-3.5 bg-[#12131b]/80 border border-slate-800 rounded-2xl cursor-pointer hover:border-amber-500/40 transition"
          >
            <span className="text-[11px] font-semibold uppercase text-slate-400 block">Total Warga</span>
            <span className="text-xl sm:text-2xl font-black text-white block mt-1">{stats.totalWarga}</span>
          </div>

          <div
            onClick={() => setActiveTab('news')}
            className="p-3.5 bg-[#12131b]/80 border border-slate-800 rounded-2xl cursor-pointer hover:border-amber-500/40 transition"
          >
            <span className="text-[11px] font-semibold uppercase text-slate-400 block">Berita Nasional</span>
            <span className="text-xl sm:text-2xl font-black text-red-400 block mt-1">{stats.totalNews}</span>
          </div>

          <div
            onClick={() => setActiveTab('proker')}
            className="p-3.5 bg-[#12131b]/80 border border-slate-800 rounded-2xl cursor-pointer hover:border-amber-500/40 transition col-span-2 lg:col-span-1"
          >
            <span className="text-[11px] font-semibold uppercase text-slate-400 block">Dokumentasi/Proker</span>
            <span className="text-xl sm:text-2xl font-black text-amber-400 block mt-1">{stats.totalProker}</span>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition shrink-0 flex items-center gap-2 ${
            activeTab === 'users'
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
              : 'bg-[#12131b] text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Users size={16} />
          <span>Manajemen Basis Data & Pengguna (CRUD)</span>
          {stats.totalPending > 0 && (
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                activeTab === 'users' ? 'bg-black text-amber-400' : 'bg-yellow-400 text-black'
              }`}
            >
              {stats.totalPending}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('news')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition shrink-0 flex items-center gap-2 ${
            activeTab === 'news'
              ? 'bg-red-600 text-white shadow-lg'
              : 'bg-[#12131b] text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Newspaper size={16} />
          <span>Berita Nasional (CRUD)</span>
        </button>

        <button
          onClick={() => setActiveTab('proker')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition shrink-0 flex items-center gap-2 ${
            activeTab === 'proker'
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
              : 'bg-[#12131b] text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Camera size={16} />
          <span>Dokumentasi & Proker (CRUD)</span>
        </button>

        <button
          onClick={() => setActiveTab('departments')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition shrink-0 flex items-center gap-2 ${
            activeTab === 'departments'
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
              : 'bg-[#12131b] text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Layers size={16} />
          <span>Manajemen 7 Departemen</span>
        </button>

        <button
          onClick={() => setActiveTab('layout')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition shrink-0 flex items-center gap-2 ${
            activeTab === 'layout'
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
              : 'bg-[#12131b] text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Layout size={16} />
          <span>Manajemen Tampilan (CMS)</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'users' && <AdminUsersCRUD onUserUpdated={loadStats} />}
        {activeTab === 'news' && <AdminNewsCRUD />}
        {activeTab === 'proker' && <AdminProkerCRUD />}
        {activeTab === 'departments' && <AdminDepartmentsCMS />}
        {activeTab === 'layout' && <AdminLayoutCMS onSettingsUpdated={loadStats} />}
      </div>
    </div>
  );
}
