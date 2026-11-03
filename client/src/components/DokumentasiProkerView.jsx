import React, { useState } from 'react';
import { Camera, Calendar, Target, CheckCircle2, Search, Filter, Shield } from 'lucide-react';

export default function DokumentasiProkerView({ list = [] }) {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'Dokumentasi' | 'Proker'
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = list.filter((item) => {
    const matchType = filterType === 'all' || item.type === filterType;
    const matchSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lead.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171926] via-[#1a1d2e] to-[#12131b] border-2 border-amber-500/30 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-2">
              <Camera size={14} /> Arsip & Rencana Strategis
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Dokumentasi Kegiatan & Program Kerja
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Galeri rekam jejak pelaksanaan agenda serta target capaian program kerja organisasi
              PSHT Komisariat Universitas Negeri Surabaya.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#12131b] p-1.5 rounded-2xl border border-slate-700/60 self-start md:self-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                filterType === 'all'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Semua ({list.length})
            </button>
            <button
              onClick={() => setFilterType('Dokumentasi')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                filterType === 'Dokumentasi'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Dokumentasi
            </button>
            <button
              onClick={() => setFilterType('Proker')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                filterType === 'Proker'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Program Kerja
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari dokumentasi atau proker..."
            className="w-full pl-9 pr-3.5 py-2.5 bg-[#12131b] border border-slate-700 rounded-xl text-white placeholder-slate-500 text-xs sm:text-sm focus:border-amber-400 outline-none"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-[#12131b] border border-slate-800 hover:border-amber-500/40 rounded-3xl overflow-hidden transition shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img
                  src={item.image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80'}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12131b] via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      item.type === 'Proker'
                        ? 'bg-amber-500 text-black'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {item.type}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30">
                    {item.category}
                  </span>
                </div>

                <div className="absolute bottom-2 left-3 text-[11px] text-slate-300 font-mono">
                  🗓️ {item.date}
                </div>
              </div>

              <div className="p-5 space-y-2.5">
                <h3 className="font-extrabold text-white text-base leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="px-5 pb-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">PJ: <strong className="text-white">{item.lead}</strong></span>
              <span className="font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                {item.progress}
              </span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-400">
            Tidak ada dokumentasi atau program kerja yang sesuai.
          </div>
        )}
      </div>
    </div>
  );
}
