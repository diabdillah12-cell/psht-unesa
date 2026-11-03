import React, { useState } from 'react';
import { Newspaper, Calendar, MapPin, User, Search, Eye, X, ArrowRight } from 'lucide-react';

export default function BeritaNasionalView({ newsList = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredNews = newsList.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (n.location && n.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171926] via-[#1e1b29] to-[#12131b] border-2 border-red-500/30 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-black uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
              <span>Warta Pusat & Daerah</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Feed Berita Nasional PSHT
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Kanal resmi pemberitaan skala nasional mengenai perkembangan perguruan, agenda PB Madiun,
              kejuaraan silat mahasiswa, dan bakti sosial masyarakat.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari berita nasional..."
              className="w-full pl-9 pr-3.5 py-2.5 bg-[#12131b] border border-slate-700 rounded-xl text-white placeholder-slate-500 text-xs sm:text-sm focus:border-amber-400 outline-none"
            />
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((article) => (
          <article
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="group bg-[#12131b] hover:bg-[#161824] border border-slate-800 hover:border-amber-500/50 rounded-3xl overflow-hidden transition duration-300 cursor-pointer shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={article.image || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80'}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12131b] via-transparent to-transparent"></div>

                {/* PROMINENT LABEL "BERITA NASIONAL" */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white font-extrabold text-[11px] shadow-lg tracking-wider uppercase border border-red-400/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    BERITA NASIONAL
                  </span>
                </div>

                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-amber-400" /> {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-amber-400" /> {article.location}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-extrabold text-white text-base leading-snug group-hover:text-amber-300 transition line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>
            </div>

            <div className="px-5 pb-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <User size={13} className="text-amber-400" /> {article.author}
              </span>
              <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                Baca Lengkap <ArrowRight size={13} />
              </span>
            </div>
          </article>
        ))}

        {filteredNews.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-400">
            Tidak ada berita nasional yang sesuai dengan kata kunci pencarian.
          </div>
        )}
      </div>

      {/* Modal Baca Artikel Lengkap */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#12131b] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition"
            >
              <X size={20} />
            </button>

            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-red-600 text-white font-black text-xs uppercase tracking-wider mb-2">
                BERITA NASIONAL PSHT
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                {selectedArticle.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2 pb-3 border-b border-slate-800">
                <span>🗓️ {selectedArticle.date}</span>
                <span>📍 {selectedArticle.location}</span>
                <span>✍️ {selectedArticle.author}</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden mb-5 border border-slate-700 bg-black max-h-72">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-3 whitespace-pre-line">
              <p className="font-semibold text-amber-200 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                {selectedArticle.summary}
              </p>
              <p>{selectedArticle.content}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition"
              >
                Tutup Artikel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
