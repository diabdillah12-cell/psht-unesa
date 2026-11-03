import React, { useState } from 'react';
import {
  Users,
  Shield,
  Layers,
  Sparkles,
  Award,
  Phone,
  Bookmark,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Megaphone,
  Briefcase,
  Share2
} from 'lucide-react';

export default function DepartemenView({ departments = {} }) {
  const deptKeys = Object.keys(departments);
  const [activeDept, setActiveDept] = useState(deptKeys[0] || 'bph');

  const current = departments[activeDept] || {};

  const getIcon = (code) => {
    switch (code) {
      case 'BPH':
        return <Users size={18} />;
      case 'PSDM':
        return <Layers size={18} />;
      case 'KOMINFO':
        return <Megaphone size={18} />;
      case 'KWU':
        return <Briefcase size={18} />;
      case 'HUMAS':
        return <Share2 size={18} />;
      case 'TRADISI':
        return <Sparkles size={18} />;
      case 'PRESTASI':
        return <Award size={18} />;
      default:
        return <Shield size={18} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171926] via-[#1f1d2b] to-[#12131b] border-2 border-amber-500/30 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-2">
              <Shield size={14} /> Struktur & Pembagian Tugas Organisasi
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Struktur Organisasi & 7 Departemen
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Klasifikasi struktur pengurus, pedoman kerja, koordinator divisi, dan agenda resmi
              komisariat PSHT Universitas Negeri Surabaya.
            </p>
          </div>
        </div>
      </div>

      {/* 7 Department Pills Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {deptKeys.map((key) => {
          const dept = departments[key];
          const isSelected = activeDept === key;
          return (
            <button
              key={key}
              onClick={() => setActiveDept(key)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition shrink-0 flex items-center gap-2 ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/20'
                  : 'bg-[#12131b] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {getIcon(dept.code)}
              <span>{dept.name}</span>
            </button>
          );
        })}
      </div>

      {/* Detailed Department View */}
      <div className="bg-[#12131b] border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">
        {/* Dept Title & Desc */}
        <div className="border-b border-slate-800 pb-5">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold text-xs">
              KODE: {current.code}
            </span>
            <span className="text-xs text-slate-400">• Komisariat PSHT UNESA</span>
          </div>
          <h3 className="text-2xl font-black text-white">{current.name}</h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
            {current.description}
          </p>
        </div>

        {/* Specific Training Schedule Box if Tradisi or Prestasi */}
        {current.code === 'TRADISI' && (
          <div className="bg-gradient-to-br from-[#1b1928] to-[#111219] border-2 border-amber-500/40 rounded-2xl p-5 space-y-4">
            <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider flex items-center gap-1.5">
              <Sparkles size={14} /> Jadwal Resmi Latihan Tradisi & Kerohanian
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-[#141624] rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-amber-300 block">Sesi 1: Hari Senin</span>
                <p className="text-sm font-black text-white mt-0.5">Pukul 19.22 WIB - Selesai</p>
                <p className="text-xs text-slate-300 mt-1">📍 Halaman Samping LPSP UNESA (Lidah Wetan)</p>
                <p className="text-[11px] text-slate-400 mt-1">Materi: Senam Dasar 1-90, Jurus 1-36, dan Sambung Tradisi.</p>
              </div>

              <div className="p-3.5 bg-[#141624] rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-amber-300 block">Sesi 2: Hari Kamis</span>
                <p className="text-sm font-black text-white mt-0.5">Pukul 19.22 WIB - Selesai</p>
                <p className="text-xs text-slate-300 mt-1">📍 Lapangan Belakang Gema UNESA (Ketintang)</p>
                <p className="text-[11px] text-slate-400 mt-1">Materi: Penguatan Fisik, Senjata Tradisional, Wejangan Ke-SH-an.</p>
              </div>
            </div>
            <div className="text-[11px] text-amber-200/90 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
              🥋 <strong>Ketentuan:</strong> Wajib mengenakan pakaian sakral hitam lengkap, sabuk tingkatan, dan mori putih bagi warga.
            </div>
          </div>
        )}

        {current.code === 'PRESTASI' && (
          <div className="bg-gradient-to-br from-[#1b1928] to-[#111219] border-2 border-red-500/40 rounded-2xl p-5 space-y-4">
            <span className="text-xs uppercase font-extrabold text-red-400 tracking-wider flex items-center gap-1.5">
              <Award size={14} /> Jadwal Resmi Latihan Prestasi & Gelanggang
            </span>
            <div className="p-4 bg-[#141624] rounded-xl border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <span className="text-xs font-bold text-amber-300">Hari Latihan:</span>
                  <p className="text-base font-black text-white">Setiap Hari Selasa & Kamis</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs font-bold text-amber-300">Waktu Latihan:</span>
                  <p className="text-base font-black text-white">18.00 WIB - Selesai</p>
                </div>
              </div>
              <p className="text-xs text-slate-300">
                📍 <strong>Lokasi:</strong> Lapangan Silat GOR Internasional UNESA Kampus Lidah Wetan Surabaya.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Fokus latihan: Fisik tanding gelanggang, teknik bantingan, sapuan, counter-attack, dan pemantapan nomor Seni Tunggal Ganda Regu (TGR).
              </p>
            </div>
          </div>
        )}

        {/* 2-Columns: Coordinators & Guidelines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coordinators */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-extrabold text-amber-400 tracking-wider flex items-center gap-1.5">
              <Users size={15} /> Koordinator & Pengurus Departemen
            </h4>
            <div className="space-y-2.5">
              {current.coordinators &&
                current.coordinators.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#171926] border border-slate-800 rounded-2xl flex items-center justify-between"
                  >
                    <div>
                      <h5 className="font-bold text-white text-sm">{c.name}</h5>
                      <span className="text-xs text-amber-400/90">{c.role}</span>
                    </div>
                    {c.phone && (
                      <a
                        href={`https://wa.me/${c.phone.replace(/^0/, '62')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs flex items-center gap-1"
                      >
                        <Phone size={12} />
                        <span>Kontak</span>
                      </a>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Guidelines & Agenda */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-xs uppercase font-extrabold text-amber-400 tracking-wider flex items-center gap-1.5">
                <Bookmark size={15} /> Pedoman & Tugas Pokok
              </h4>
              <div className="p-4 bg-[#171926] border border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                {current.guidelines || 'Pedoman departemen disesuaikan dengan AD/ART dan arahan Ketua Umum.'}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs uppercase font-extrabold text-amber-400 tracking-wider flex items-center gap-1.5">
                <Calendar size={15} /> Agenda & Rencana Kegiatan
              </h4>
              <div className="p-3.5 bg-[#171926] border border-slate-800 rounded-2xl text-xs text-slate-300">
                {current.agendas || 'Agenda rutin departemen.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
