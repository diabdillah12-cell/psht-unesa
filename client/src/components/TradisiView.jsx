import React, { useState } from 'react';
import { BookOpen, Calendar, MapPin, Clock, Award, CheckCircle2, ChevronDown, ChevronUp, Sparkles, Shield, Bookmark, Info } from 'lucide-react';

export default function TradisiView({ data }) {
  const [activeTab, setActiveTab] = useState('jadwal'); // 'jadwal' | 'materi' | 'lambang' | 'tesSabuk'
  const [expandedMateri, setExpandedMateri] = useState('msh_1');

  const jadwal = data?.jadwalLatihan || {
    sessions: [
      {
        day: 'Senin',
        time: '19.22 WIB - Selesai',
        location: 'Halaman Samping LPSP UNESA',
        detail: 'Fokus Senam Dasar (1-90), Jurus Dasar (1-36), Pasang, dan Sambung Tradisi'
      },
      {
        day: 'Kamis',
        time: '19.22 WIB - Selesai',
        location: 'Lapangan Belakang Gema UNESA',
        detail: 'Fokus Penguatan Fisik, Sambutan Jurus, Senjata Tradisional, dan Wejangan Ke-SH-an'
      }
    ],
    dresscode: 'Sakral Lengkap Hitam PSHT, Sabuk sesuai tingkatan, Mori putih bagi Warga.',
    instructors: ['Kangmas Sesepuh Rayon', 'Dewan Pertimbangan', 'Warga Pelatih']
  };

  const materiList = data?.materiSH || [];
  const tesSabukList = data?.tesSabuk || [];
  const maknaLambang = data?.maknaLambang || [
    {
      element: 'Hati Putih Bertepi Merah',
      meaning: 'Melambangkan cinta kasih yang tulus, suci tanpa pamrih (putih), serta keberanian dan ketegasan dalam menegakkan kebenaran dan keadilan (merah).'
    },
    {
      element: 'Pancaran Sinar Melingkar',
      meaning: 'Melambangkan jalannya hukum alam dan petunjuk Sang Maha Pencipta yang menerangi jalan hidup setiap insan Setia Hati di manapun berada.'
    },
    {
      element: 'Bunga Terate Tiga Tahapan',
      meaning: 'Terate kuncup, setengah mekar, dan mekar sempurna melambangkan jenjang kedewasaan siswa (Polos, Jambon, Hijau, Putih, hingga Warga). Bunga terate hidup di lumpur tetapi tetap suci dan menebarkan keharuman budi luhur.'
    },
    {
      element: 'Senjata Silat (Golok, Clurit, Trisula, Toya)',
      meaning: 'Melambangkan penguasaan bela diri pencak silat leluhur nusantara sebagai sarana ikhtiar melindungi diri, menjaga persaudaraan, dan membela yang lemah.'
    },
    {
      element: 'Garis Tegak Lurus Berwarna Merah',
      meaning: 'Melambangkan keteguhan iman, pendirian yang kokoh, dan keberanian istiqomah di jalan yang lurus (kebenaran).'
    },
    {
      element: 'Pita Kotak-Kotak Hitam Putih',
      meaning: 'Melambangkan realitas kehidupan duniawi yang penuh dualisme (benar-salah, suka-duka) yang harus disikapi dengan kedewasaan batin.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171924] via-[#1a1622] to-[#14151e] border border-amber-500/20 p-6 sm:p-8">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
              <Sparkles size={14} /> Pedoman 3: Jiwa & Falsafah Luhur
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Pedoman Tradisi & Ke-SH-an
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Jadwal latihan sakral tradisi, kajian makna lambang pusaka PSHT, pedoman kerohanian
              Setia Hati, serta alur Ujian Kenaikan Tingkat (Tes Sabuk).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-[#12131b] p-1.5 rounded-2xl border border-slate-700/60 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('jadwal')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'jadwal'
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar size={15} /> Jadwal
            </button>
            <button
              onClick={() => setActiveTab('lambang')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'lambang'
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shield size={15} /> Makna Lambang
            </button>
            <button
              onClick={() => setActiveTab('materi')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'materi'
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen size={15} /> Materi Ke-SH-an ({materiList.length})
            </button>
            <button
              onClick={() => setActiveTab('tesSabuk')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'tesSabuk'
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award size={15} /> Tes Sabuk ({tesSabukList.length})
            </button>
          </div>
        </div>
      </div>

      {/* HIGHLIGHT: JADWAL LATIHAN RUTIN TRADISI */}
      {activeTab === 'jadwal' && (
        <div className="space-y-6">
          <div className="relative bg-gradient-to-br from-[#1b1c26] to-[#12131b] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-500/10">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs uppercase tracking-wider mb-2">
                🥋 Jadwal Latihan Tradisi & Kerohanian
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Latihan Rutin Tradisi PSHT UNESA
              </h3>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Diadakan secara rutin untuk pembentukan karakter pesilat berbudi luhur, penguasaan
                senam & jurus baku PSHT, serta pendalaman mental spiritual ke-SH-an.
              </p>
            </div>

            {/* 2 SESSIONS: SENIN (LPSP) & KAMIS (GEMA) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {jadwal.sessions &&
                jadwal.sessions.map((session, idx) => (
                  <div
                    key={idx}
                    className="relative bg-[#111219] border-2 border-amber-500/30 hover:border-amber-400 rounded-2xl p-5 sm:p-6 transition shadow-lg group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-sm rounded-xl">
                        Hari {session.day}
                      </span>
                      <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm">
                        <Clock size={16} />
                        <span>{session.time}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-xs uppercase font-semibold text-slate-400 block mb-1">
                          Lokasi Latihan:
                        </span>
                        <div className="flex items-start gap-2">
                          <MapPin size={18} className="text-amber-400 shrink-0 mt-0.5" />
                          <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition">
                            {session.location}
                          </h4>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800">
                        <span className="text-xs uppercase font-semibold text-slate-400 block mb-1">
                          Materi & Fokus Latihan:
                        </span>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {session.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Dresscode & Guidelines */}
            <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#141622] p-4 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                  <Shield size={14} /> Tata Tertib & Busana Sakral
                </span>
                <p className="text-slate-300 leading-relaxed">{jadwal.dresscode}</p>
              </div>

              <div className="bg-[#141622] p-4 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                  <Bookmark size={14} /> Dewan Pembina & Pelatih
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {jadwal.instructors ? jadwal.instructors.join(', ') : 'Kangmas Sesepuh Komisariat'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: MAKNA LAMBANG PSHT */}
      {activeTab === 'lambang' && (
        <div className="bg-[#13151f] border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
              Khazanah Lambang Pusaka
            </span>
            <h3 className="text-2xl font-black text-white mt-1">
              Bedah Filosofis Lambang Resmi PSHT
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Lambang resmi Persaudaraan Setia Hati Terate sarat dengan simbol kebatinan dan
              pedoman budi pekerti luhur manusia sejati.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 sm:w-72 rounded-2xl overflow-hidden border-2 border-amber-500/60 shadow-2xl bg-black p-2">
                <img
                  src="/psht-logo.jpg"
                  alt="Lambang PSHT Resmi"
                  className="w-full h-auto rounded-xl object-contain"
                />
              </div>
            </div>

            {/* List */}
            <div className="lg:col-span-7 space-y-3.5">
              {maknaLambang.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#171926] border border-slate-800 hover:border-amber-500/40 p-4 rounded-2xl transition"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="font-bold text-white text-sm">{item.element}</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-7">{item.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MATERI KE-SH-AN */}
      {activeTab === 'materi' && (
        <div className="space-y-4">
          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl text-xs sm:text-sm text-amber-300 leading-relaxed">
            🌿 <strong>Wejangan Luhur:</strong> Hakikat pencak silat bukan untuk kesombongan atau
            menyakiti sesama, melainkan sarana mendekatkan diri kepada Tuhan Yang Maha Esa serta
            membentuk insan berbudi luhur tahu benar dan salah.
          </div>

          <div className="space-y-3">
            {materiList.map((m) => {
              const isOpen = expandedMateri === m.id;
              return (
                <div
                  key={m.id}
                  className="bg-[#13151f] border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setExpandedMateri(isOpen ? null : m.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition"
                  >
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300">
                        {m.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">{m.summary}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-800/80 text-amber-400 shrink-0">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-[#161824]/50">
                      <div className="p-4 bg-[#111219] rounded-xl border border-slate-800 mt-3">
                        {m.content}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {materiList.length === 0 && (
              <div className="py-12 text-center text-slate-400">
                Belum ada materi Ke-SH-an yang dipublikasikan.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: INFO TES SABUK */}
      {activeTab === 'tesSabuk' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tesSabukList.map((ts, idx) => (
              <div
                key={ts.id || idx}
                className="bg-[#13151f] border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 sm:p-6 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-semibold text-xs">
                      Tahapan UKT
                    </span>
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                      {ts.status || 'Aktif'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{ts.level}</h3>

                  <div className="mt-3 space-y-2 text-xs sm:text-sm text-slate-300">
                    <div>
                      <span className="text-[11px] uppercase font-bold text-slate-500 block mb-1">
                        Persyaratan & Materi Ujian:
                      </span>
                      <p className="leading-relaxed bg-[#111219] p-3 rounded-xl border border-slate-800">
                        {ts.requirements}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Periode Pelaksanaan:</span>
                  <span className="font-semibold text-amber-400">{ts.period}</span>
                </div>
              </div>
            ))}

            {tesSabukList.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-400">
                Tidak ada informasi tes sabuk saat ini.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
