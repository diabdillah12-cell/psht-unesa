import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Camera, Plus, Edit2, Trash2, X, Check, Calendar, Target } from 'lucide-react';
import ImageUploader from './ImageUploader';

export default function AdminProkerCRUD() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
  const [activeItem, setActiveItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Proker',
    category: 'Prestasi',
    date: 'Semester Gasal',
    lead: 'Departemen Terkait',
    progress: 'Terencana (25%)',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    description: ''
  });
  const [message, setMessage] = useState('');

  const fetchProker = async () => {
    try {
      setLoading(true);
      const res = await api.getProker();
      setItems(res.proker || []);
    } catch (err) {
      console.error('Failed to load proker:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProker();
  }, []);

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      type: 'Proker',
      category: 'Prestasi',
      date: 'Semester Gasal',
      lead: 'Departemen Terkait',
      progress: 'Terencana (25%)',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
      description: ''
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
        await api.createProker(formData);
        setMessage('Dokumentasi/Proker berhasil ditambahkan.');
      } else {
        await api.updateProker(activeItem.id, formData);
        setMessage('Dokumentasi/Proker berhasil diperbarui.');
      }
      setModalMode(null);
      await fetchProker();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      alert(err.message || 'Gagal menyimpan data');
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Hapus "${title}"?`)) return;
    try {
      await api.deleteProker(id);
      setMessage('Item berhasil dihapus.');
      await fetchProker();
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
            <Camera size={18} className="text-amber-400" />
            <span>Manajemen Dokumentasi & Program Kerja (Full CRUD)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Unggah foto dokumentasi kegiatan atau perbarui rencana program kerja organisasi.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs sm:text-sm rounded-xl shadow transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Tambah Dokumentasi / Proker</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-[#12131b] border border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-black uppercase">
                  {item.type}
                </span>
                <span className="absolute bottom-2 left-2.5 text-[11px] text-slate-300 font-mono">
                  {item.date} • {item.category}
                </span>
              </div>

              <div className="p-4 space-y-1.5">
                <h4 className="font-bold text-white text-base line-clamp-2">{item.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-3">{item.description}</p>
              </div>
            </div>

            <div className="p-4 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500">PJ: {item.lead}</span>
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

      {/* Modal */}
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
              {modalMode === 'add' ? 'Tambah Dokumentasi / Proker' : 'Edit Dokumentasi / Proker'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Judul Kegiatan / Proker *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Tipe</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                  >
                    <option value="Proker">Program Kerja (Proker)</option>
                    <option value="Dokumentasi">Dokumentasi Kegiatan</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Kategori Departemen</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Prestasi / Tradisi / Kominfo / PSDM"
                    className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Waktu / Periode</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="Contoh: Triwulan IV 2026"
                    className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Status Progres</label>
                  <input
                    type="text"
                    value={formData.progress}
                    onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                    placeholder="Berjalan (75%) / Terlaksana"
                    className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Penanggung Jawab (PJ)</label>
                <input
                  type="text"
                  value={formData.lead}
                  onChange={(e) => setFormData({ ...formData, lead: e.target.value })}
                  placeholder="Departemen Prestasi / Ketua Panitia"
                  className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                />
              </div>

              {/* Direct File Upload (JPG, HEIC, PNG, etc) */}
              <ImageUploader
                label="Upload Foto Dokumentasi (Bebas: JPG, HEIC, PNG, dll)"
                value={formData.image}
                onChange={(uploadedUrl) => setFormData({ ...formData, image: uploadedUrl })}
              />

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Deskripsi Kegiatan / Target Proker</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
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
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
