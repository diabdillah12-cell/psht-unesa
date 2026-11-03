import React, { useState } from 'react';
import { Users, Calendar, Target, Clock, MapPin, Search, ChevronRight, Phone, Shield } from 'lucide-react';

export default function OrganisasiView({ data }) {
  const [activeTab, setActiveTab] = useState('pengurus'); // 'pengurus' | 'agenda' | 'proker'
  const [searchTerm, setSearchTerm] = useState('');

  const pengurusList = data?.pengurus || [];
  const agendaList = data?.agenda || [];
  const prokerList = data?.proker || [];

  const filteredPengurus = pengurusList.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.division.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAgenda = agendaList.filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProker = prokerList.filter(
    (prk) =>
      prk.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prk.lead.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171924] via-[#1b1e2c] to-[#14151e] border border-amber-500/20 p-6 sm:p-8">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
              <Shield size={14} /> Pedoman 1: Struktur & Perencanaan
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Pedoman Organisasi PSHT UNESA
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Mengenal jajaran kepengurusan komisariat, agenda silaturahmi & latihan bersama, serta
              program kerja strategis tahunan organisasi.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#12131b] p-1.5 rounded-2xl border border-slate-700/60 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('pengurus')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'pengurus'
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users size={16} /> Pengurus ({pengurusList.length})
            </button>
            <button
              onClick={() => setActiveTab('agenda')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'agenda'
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar size={16} /> Agenda ({agendaList.length})
            </button>
            <button
              onClick={() => setActiveTab('proker')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'proker'
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Target size={16} /> Proker ({prokerList.length})
            </button>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Cari dalam ${activeTab}...`}
            className="w-full pl-10 pr-4 py-2.5 bg-[#141520] border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition"
          />
        </div>
      </div>

      {/* TAB 1: PENGURUS */}
      {activeTab === 'pengurus' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPengurus.map((p) => (
            <div
              key={p.id}
              className="group bg-[#13151f] hover:bg-[#171a27] border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 transition duration-300 shadow-lg flex flex-col justify-between"
            >
              <div className="flex items-start gap-4">
                <img
                  src={p.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                  alt={p.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/30 group-hover:border-amber-400 transition shrink-0"
                />
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 text-[11px] font-semibold mb-1">
                    {p.division}
                  </span>
                  <h3 className="font-bold text-white text-base leading-snug group-hover:text-amber-300 transition">
                    {p.name}
                  </h3>
                  <p className="text-xs text-amber-400/90 font-medium">{p.role}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>{p.faculty || 'UNESA'}</span>
                {p.contact && (
                  <a
                    href={`https://wa.me/${p.contact.replace(/^0/, '62')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition font-medium"
                  >
                    <Phone size={13} /> Kontak
                  </a>
                )}
              </div>
            </div>
          ))}

          {filteredPengurus.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-400">
              Tidak ada data pengurus yang cocok dengan kata kunci.
            </div>
          )}
        </div>
      )}

      {/* TAB 2: AGENDA */}
      {activeTab === 'agenda' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAgenda.map((agd) => (
            <div
              key={agd.id}
              className="bg-[#13151f] border border-slate-800 hover:border-amber-500/30 rounded-2xl p-6 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                    {agd.status || 'Agenda'}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar size={14} className="text-amber-400" />
                    <span>{agd.date}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{agd.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {agd.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-amber-400 shrink-0" />
                  <span>{agd.time || 'Waktu dikonfirmasi'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-amber-400 shrink-0" />
                  <span className="truncate">{agd.location}</span>
                </div>
              </div>
            </div>
          ))}

          {filteredAgenda.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-400">
              Tidak ada agenda kegiatan yang ditemukan.
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PROGRAM KERJA */}
      {activeTab === 'proker' && (
        <div className="space-y-4">
          {filteredProker.map((prk) => (
            <div
              key={prk.id}
              className="bg-[#13151f] border border-slate-800 hover:border-amber-500/30 rounded-2xl p-5 sm:p-6 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white">{prk.name}</h3>
                <span className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-300 font-semibold text-xs rounded-full self-start sm:self-auto">
                  {prk.period}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300 mb-4">
                <div>
                  <span className="text-slate-500 block text-xs uppercase mb-1">Target Capaian:</span>
                  <p>{prk.target}</p>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs uppercase mb-1">Penanggung Jawab:</span>
                  <p className="font-medium text-amber-400">{prk.lead}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Status Progres:</span>
                <span className="font-semibold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg">
                  {prk.progress}
                </span>
              </div>
            </div>
          ))}

          {filteredProker.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              Tidak ada data program kerja yang cocok.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
