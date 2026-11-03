import React, { useState } from 'react';
import { Trophy, Calendar, MapPin, Clock, Award, Users, Search, CheckCircle, Shield, AlertTriangle } from 'lucide-react';

export default function PrestasiView({ data }) {
  const [activeTab, setActiveTab] = useState('jadwal'); // 'jadwal' | 'atlet' | 'medali'
  const [searchTerm, setSearchTerm] = useState('');

  const jadwal = data?.jadwalLatihan || {
    days: 'Selasa & Kamis',
    time: '18.00 WIB - Selesai',
    location: 'Lapangan Silat GOR Inter UNESA Lidah',
    coaches: ['Mas Bambang S.Pd.', 'Mbak Rini'],
    gearRequired: ['Pakaian Silat / Kaos Kontingen', 'Body Protector', 'Deker Kaki & Tangan'],
    notes: 'Latihan pengasahan fisik tanding gelanggang, teknik bantingan, sapuan, dan seni TGR.'
  };

  const atletList = data?.atlet || [];
  const medaliList = data?.medali || [];

  const filteredAtlet = atletList.filter(
    (atl) =>
      atl.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      atl.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      atl.faculty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMedali = medaliList.filter(
    (m) =>
      m.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.rank && m.rank.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171924] via-[#201d24] to-[#14151e] border border-amber-500/20 p-6 sm:p-8">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
              <Trophy size={14} /> Pedoman 2: Pembinaan & Kejuaraan
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Pedoman Prestasi PSHT UNESA
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Jadwal pemusatan latihan atlet, profil pesilat gelanggang UNESA, serta torehan medali
              kejuaraan tingkat daerah dan nasional.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#12131b] p-1.5 rounded-2xl border border-slate-700/60 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('jadwal')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'jadwal'
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar size={16} /> Jadwal Latihan
            </button>
            <button
              onClick={() => setActiveTab('atlet')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'atlet'
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users size={16} /> Data Atlet ({atletList.length})
            </button>
            <button
              onClick={() => setActiveTab('medali')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'medali'
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award size={16} /> Etalase Medali ({medaliList.length})
            </button>
          </div>
        </div>
      </div>

      {/* HIGHLIGHT BOX: JADWAL LATIHAN RUTIN PRESTASI */}
      {activeTab === 'jadwal' && (
        <div className="space-y-6">
          <div className="relative bg-gradient-to-br from-[#1b1c26] to-[#12131b] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-500/10 overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-4 max-w-2xl">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs uppercase tracking-wider">
                  🔥 Wajib Bagi Calon Atlet & Pesilat Prestasi
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Jadwal Latihan Rutin Prestasi
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Pemusatan latihan tanding dan seni TGR (Tunggal Ganda Regu) binaan UKM PSHT UNESA
                  untuk persiapan kejuaraan mahasiswa, Pomda, Pomnas, hingga Kejurprov IPSI.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start gap-3 bg-[#111219] p-4 rounded-2xl border border-slate-800">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                      <Clock size={22} />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Hari & Waktu</span>
                      <p className="text-base font-bold text-amber-300">
                        {jadwal.days}
                      </p>
                      <p className="text-xs text-slate-300">{jadwal.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#111219] p-4 rounded-2xl border border-slate-800">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Lokasi Latihan</span>
                      <p className="text-base font-bold text-white leading-tight">
                        {jadwal.location}
                      </p>
                      <p className="text-xs text-slate-400">Kampus Lidah Wetan Surabaya</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Requirements & Coaches */}
              <div className="lg:w-80 bg-[#141622] border border-amber-500/20 rounded-2xl p-5 space-y-4 shrink-0">
                <div>
                  <h4 className="text-xs uppercase font-bold text-amber-400 tracking-wider mb-2 flex items-center gap-1.5">
                    <Shield size={14} /> Pelatih / Instruktur
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-1.5">
                    {jadwal.coaches &&
                      jadwal.coaches.map((c, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                          <span>{c}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <h4 className="text-xs uppercase font-bold text-amber-400 tracking-wider mb-2">
                    Perlengkapan Latihan
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-1.5">
                    {jadwal.gearRequired &&
                      jadwal.gearRequired.map((g, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle size={13} className="text-emerald-400 shrink-0" />
                          <span>{g}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>

            {jadwal.notes && (
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-300 bg-amber-500/5 p-3 rounded-xl border border-amber-500/20">
                <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-amber-300">Catatan Pelatih:</strong> {jadwal.notes}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: DATA ATLET */}
      {activeTab === 'atlet' && (
        <div className="space-y-4">
          <div className="max-w-md">
            <div className="relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama atlet, kelas tanding, fakultas..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#141520] border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredAtlet.map((atl) => (
              <div
                key={atl.id}
                className="group bg-[#13151f] hover:bg-[#171a27] border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden transition duration-300 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img
                      src={atl.photo || 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=400&q=80'}
                      alt={atl.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#13151f] via-transparent to-transparent"></div>
                    <span className="absolute bottom-2 left-3 px-2 py-0.5 bg-black/70 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[11px] font-semibold rounded-md">
                      {atl.category}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-white text-base group-hover:text-amber-300 transition">
                      {atl.name}
                    </h3>
                    <p className="text-xs text-slate-400">{atl.faculty}</p>
                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-[11px] uppercase tracking-wider text-slate-500 block">
                        Raihan Prestasi:
                      </span>
                      <p className="text-xs text-amber-300/90 font-medium leading-relaxed">
                        {atl.achievements}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredAtlet.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-400">
                Tidak ada data atlet yang ditemukan.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: ETALASE MEDALI */}
      {activeTab === 'medali' && (
        <div className="space-y-4">
          <div className="max-w-md">
            <div className="relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari kejuaraan / turnamen..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#141520] border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMedali.map((m) => (
              <div
                key={m.id}
                className="bg-[#13151f] border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-semibold text-xs">
                      Tahun {m.year}
                    </span>
                    <span className="text-xs font-bold text-amber-400">{m.rank}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3">{m.event}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {m.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-amber-500/10 border border-amber-500/20 p-2 rounded-xl">
                    <span className="block text-xl font-black text-amber-400">{m.gold || 0}</span>
                    <span className="text-[10px] uppercase font-bold text-amber-300">Emas 🥇</span>
                  </div>
                  <div className="bg-slate-300/10 border border-slate-400/20 p-2 rounded-xl">
                    <span className="block text-xl font-black text-slate-200">{m.silver || 0}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-300">Perak 🥈</span>
                  </div>
                  <div className="bg-amber-700/10 border border-amber-700/30 p-2 rounded-xl">
                    <span className="block text-xl font-black text-amber-600">{m.bronze || 0}</span>
                    <span className="text-[10px] uppercase font-bold text-amber-600">Perunggu 🥉</span>
                  </div>
                </div>
              </div>
            ))}

            {filteredMedali.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-400">
                Tidak ada data medali yang sesuai.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
