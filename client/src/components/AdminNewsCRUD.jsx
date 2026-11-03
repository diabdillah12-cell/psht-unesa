import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Newspaper, Plus, Edit2, Trash2, X, Calendar, MapPin, Check, Upload } from 'lucide-react';
import ImageUploader from './ImageUploader';

export default function AdminNewsCRUD() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
  const [activeItem, setActiveItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    author: 'Pengurus PSHT',
    location: 'Surabaya / Nasional',
    summary: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
  });
  const [message, setMessage] = useState('');

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await api.getNews();
      setNews(res.news || []);
    } catch (err) {
      console.error('Failed to load news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      author: 'Pengurus PSHT UNESA',
      location: 'Surabaya / Nasional',
      summary: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
    });
    setActiveItem(null);
    setModalMode('add');
  };

  const handleOpenEdit = (item) => {
    setFormData({ ...item });
    setActiveItem(item);
    setModalMode('edit');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'add') {
        await api.createNews(formData);
        setMessage('Artikel Berita Nasional berhasil diterbitkan.');
      } else {
        await api.updateNews(activeItem.id, formData);
        setMessage('Artikel Berita Nasional berhasil diperbarui.');
      }
      setModalMode(null);
      await fetchNews();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      alert(err.message || 'Gagal menyimpan artikel');
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Hapus artikel berita "${title}"?`)) return;
    try {
      await api.deleteNews(id);
      setMessage('Artikel berita berhasil dihapus.');
      await fetchNews();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      alert(err.message || 'Gagal menghapus');
    }
  };

  return (
    <div className="space-y-6">
      {message && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-2 text-emerald-400 text-xs sm:text-sm">
          <Check size={16} />
          <span>{message}</span>
        </div>
      )}

      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#12131b] border border-slate-800 p-4 sm:p-5 rounded-2xl">
        <div>
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Newspaper size={18} className="text-red-500" />
            <span>Manajemen Berita Nasional (Full CRUD)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Publikasikan, sunting, atau hapus warta resmi PSHT skala nasional.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Tambah Berita Baru</span>
        </button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-[#12131b] border border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase">
                  BERITA NASIONAL
                </span>
                <span className="absolute bottom-2 left-2.5 text-[11px] text-slate-300 font-mono">
                  🗓️ {item.date} • {item.location}
                </span>
              </div>

              <div className="p-4 space-y-1.5">
                <h4 className="font-bold text-white text-base line-clamp-2">{item.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-3">{item.summary}</p>
              </div>
            </div>

            <div className="p-4 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500">{item.author}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-xs"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-1.5 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg text-xs"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#12131b] border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalMode(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition"
            >
              <X size={20} />
            </button>

            <h3 className="text-base font-bold text-white mb-4">
              {modalMode === 'add' ? 'Tambah Berita Nasional Baru' : 'Edit Artikel Berita'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Judul Berita *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Judul artikel berita nasional..."
                  className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Tanggal</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Lokasi / Cabang</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Madiun / Surabaya"
                    className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Penulis / Redaksi</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Humas PB PSHT"
                  className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                />
              </div>

              {/* Direct File Upload (JPG, HEIC, PNG, etc) */}
              <ImageUploader
                label="Upload Foto / Gambar Berita (Bebas: JPG, HEIC, PNG, dll)"
                value={formData.image}
                onChange={(uploadedUrl) => setFormData({ ...formData, image: uploadedUrl })}
              />

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Ringkasan Berita *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Ringkasan singkat yang menarik..."
                  className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Isi Lengkap Berita *</label>
                <textarea
                  rows={6}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Isi narasi berita..."
                  className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white whitespace-pre-line"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl"
                >
                  Simpan Berita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
