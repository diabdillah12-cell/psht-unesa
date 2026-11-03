import React, { useState } from 'react';
import { api } from '../services/api';
import { Trophy, Calendar, Users, Award, Plus, Edit2, Trash2, X, Clock, MapPin, Check } from 'lucide-react';
import ImageUploader from './ImageUploader';

export default function AdminCMSPrestasi({ data, onContentUpdated }) {
  const [activeTab, setActiveTab] = useState('jadwal'); // 'jadwal' | 'atlet' | 'medali'
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const jadwal = data?.jadwalLatihan || {};
  const [jadwalForm, setJadwalForm] = useState({
    title: jadwal.title || 'Jadwal Latihan Rutin Prestasi',
    days: jadwal.days || 'Selasa & Kamis',
    time: jadwal.time || '18.00 WIB - Selesai',
    location: jadwal.location || 'Lapangan Silat GOR Inter UNESA Lidah',
    coaches: (jadwal.coaches || []).join('\n'),
    gearRequired: (jadwal.gearRequired || []).join('\n'),
    notes: jadwal.notes || ''
  });

  const atletList = data?.atlet || [];
  const medaliList = data?.medali || [];

  const handleSaveJadwal = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title: jadwalForm.title,
        days: jadwalForm.days,
        time: jadwalForm.time,
        location: jadwalForm.location,
        coaches: jadwalForm.coaches.split('\n').filter(Boolean),
        gearRequired: jadwalForm.gearRequired.split('\n').filter(Boolean),
        notes: jadwalForm.notes
      };
      await api.updateJadwal('prestasi', payload);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      if (onContentUpdated) onContentUpdated();
    } catch (err) {
      alert(err.message || 'Gagal menyimpan jadwal latihan');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    if (activeTab === 'atlet') {
      setFormData({
        name: '',
        category: 'Tanding Kelas E Putra (65-70 Kg)',
        faculty: 'FIO UNESA',
        achievements: '',
        photo: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=400&q=80'
      });
    } else if (activeTab === 'medali') {
      setFormData({
        event: '',
        year: '2024',
        gold: 1,
        silver: 0,
        bronze: 0,
        rank: 'Juara Umum',
        description: ''
      });
    }
    setModalMode('add');
    setEditItem(null);
  };

  const handleOpenEdit = (item) => {
    setFormData({ ...item });
    setEditItem(item);
    setModalMode('edit');
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (modalMode === 'add') {
        await api.addContentItem('prestasi', activeTab, formData);
      } else {
        await api.updateContentItem('prestasi', activeTab, editItem.id, formData);
      }
      setModalMode(null);
      if (onContentUpdated) onContentUpdated();
    } catch (err) {
      alert(err.message || 'Gagal menyimpan item');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (itemId, title) => {
    if (!window.confirm(`Hapus "${title}" dari Pedoman Prestasi?`)) return;
    try {
      await api.deleteContentItem('prestasi', activeTab, itemId);
      if (onContentUpdated) onContentUpdated();
    } catch (err) {
      alert(err.message || 'Gagal menghapus');
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#13151f] border border-slate-800 p-4 sm:p-5 rounded-2xl">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('jadwal')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'jadwal'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar size={16} /> Edit Jadwal Latihan Prestasi
          </button>
          <button
            onClick={() => setActiveTab('atlet')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'atlet'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users size={16} /> Kelola Data Atlet ({atletList.length})
          </button>
          <button
            onClick={() => setActiveTab('medali')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'medali'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award size={16} /> Kelola Medali ({medaliList.length})
          </button>
        </div>

        {activeTab !== 'jadwal' && (
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>Tambah {activeTab === 'atlet' ? 'Atlet' : 'Medali'}</span>
          </button>
        )}
      </div>

      {/* TAB 1: EDIT JADWAL LATIHAN PRESTASI */}
      {activeTab === 'jadwal' && (
        <form onSubmit={handleSaveJadwal} className="bg-[#13151f] border border-amber-500/30 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-white text-lg">Konfigurasi Jadwal Latihan Prestasi</h3>
              <p className="text-xs text-slate-400">
                Data ini tampil langsung di Dasbor Anggota pada menu Pedoman Prestasi.
              </p>
            </div>
            {saveSuccess && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full flex items-center gap-1">
                <Check size={14} /> Berhasil disimpan
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Hari Latihan Rutin</label>
              <input
                type="text"
                required
                value={jadwalForm.days}
                onChange={(e) => setJadwalForm({ ...jadwalForm, days: e.target.value })}
                placeholder="Selasa & Kamis"
                className="w-full px-3 py-2.5 bg-[#191b26] border border-slate-700 rounded-xl text-white font-bold"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Waktu / Jam Latihan</label>
              <input
                type="text"
                required
                value={jadwalForm.time}
                onChange={(e) => setJadwalForm({ ...jadwalForm, time: e.target.value })}
                placeholder="18.00 WIB - Selesai"
                className="w-full px-3 py-2.5 bg-[#191b26] border border-slate-700 rounded-xl text-white font-bold"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Tempat / Lokasi Latihan Prestasi
            </label>
            <input
              type="text"
              required
              value={jadwalForm.location}
              onChange={(e) => setJadwalForm({ ...jadwalForm, location: e.target.value })}
              placeholder="Lapangan Silat GOR Inter UNESA Lidah"
              className="w-full px-3 py-2.5 bg-[#191b26] border border-slate-700 rounded-xl text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Daftar Pelatih (1 per baris)
              </label>
              <textarea
                rows={3}
                value={jadwalForm.coaches}
                onChange={(e) => setJadwalForm({ ...jadwalForm, coaches: e.target.value })}
                className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Perlengkapan Wajib (1 per baris)
              </label>
              <textarea
                rows={3}
                value={jadwalForm.gearRequired}
                onChange={(e) => setJadwalForm({ ...jadwalForm, gearRequired: e.target.value })}
                className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Catatan Tambahan Pelatih</label>
            <textarea
              rows={2}
              value={jadwalForm.notes}
              onChange={(e) => setJadwalForm({ ...jadwalForm, notes: e.target.value })}
              className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition"
          >
            {loading ? 'Menyimpan Jadwal...' : 'Simpan Perubahan Jadwal'}
          </button>
        </form>
      )}

      {/* TAB 2: DATA ATLET */}
      {activeTab === 'atlet' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {atletList.map((a) => (
            <div
              key={a.id}
              className="bg-[#13151f] border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                <img src={a.photo} alt={a.name} className="w-full h-36 object-cover" />
                <div className="p-3.5 space-y-1">
                  <span className="text-[11px] font-bold text-amber-400 block truncate">{a.category}</span>
                  <h4 className="font-bold text-white text-sm">{a.name}</h4>
                  <p className="text-xs text-slate-400">{a.faculty}</p>
                  <p className="text-[11px] text-slate-300 line-clamp-2 mt-1">{a.achievements}</p>
                </div>
              </div>

              <div className="p-3.5 pt-0 flex items-center justify-end gap-2 border-t border-slate-800/80 mt-2">
                <button
                  onClick={() => handleOpenEdit(a)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-xs"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDeleteItem(a.id, a.name)}
                  className="p-1.5 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg text-xs"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: DATA MEDALI */}
      {activeTab === 'medali' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {medaliList.map((m) => (
            <div
              key={m.id}
              className="bg-[#13151f] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-amber-400">{m.rank}</span>
                  <span className="text-slate-400">{m.year}</span>
                </div>
                <h4 className="font-bold text-white text-base mb-2">{m.event}</h4>
                <p className="text-xs text-slate-300 mb-3">{m.description}</p>

                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="text-amber-400">🥇 {m.gold} Emas</span>
                  <span className="text-slate-300">🥈 {m.silver} Perak</span>
                  <span className="text-amber-600">🥉 {m.bronze} Perunggu</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2 mt-3">
                <button
                  onClick={() => handleOpenEdit(m)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-xs"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDeleteItem(m.id, m.event)}
                  className="p-1.5 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg text-xs"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Atlet & Medali */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#12131b] border border-amber-500/40 rounded-3xl p-6 shadow-2xl">
            <button
              onClick={() => setModalMode(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-bold text-white mb-4">
              {modalMode === 'add' ? 'Tambah' : 'Edit'}{' '}
              {activeTab === 'atlet' ? 'Data Atlet' : 'Data Medali & Prestasi'}
            </h3>

            <form onSubmit={handleSaveItem} className="space-y-3.5 text-xs sm:text-sm">
              {activeTab === 'atlet' && (
                <>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Nama Atlet</label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Kategori Tanding / Seni</label>
                    <input
                      type="text"
                      required
                      value={formData.category || ''}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="Tanding Kelas E Putra / Tunggal Seni"
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Fakultas / Prodi</label>
                    <input
                      type="text"
                      value={formData.faculty || ''}
                      onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Raihan Prestasi / Medali</label>
                    <textarea
                      rows={2}
                      value={formData.achievements || ''}
                      onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                      placeholder="Emas POMPROV 2024, dll."
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <ImageUploader
                      label="Foto Atlet (JPG, PNG, HEIC, Bebas)"
                      value={formData.photo || ''}
                      onChange={(uploadedUrl) => setFormData({ ...formData, photo: uploadedUrl })}
                    />
                  </div>
                </>
              )}

              {activeTab === 'medali' && (
                <>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Nama Kejuaraan / Event</label>
                    <input
                      type="text"
                      required
                      value={formData.event || ''}
                      onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                      placeholder="POMPROV Jatim 2024"
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Tahun</label>
                      <input
                        type="text"
                        required
                        value={formData.year || ''}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Gelar / Peringkat</label>
                      <input
                        type="text"
                        value={formData.rank || ''}
                        onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                        placeholder="Juara Umum II"
                        className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-amber-400 font-semibold block mb-1">Emas 🥇</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.gold || 0}
                        onChange={(e) => setFormData({ ...formData, gold: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Perak 🥈</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.silver || 0}
                        onChange={(e) => setFormData({ ...formData, silver: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-amber-600 font-semibold block mb-1">Perunggu 🥉</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.bronze || 0}
                        onChange={(e) => setFormData({ ...formData, bronze: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white font-bold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Deskripsi Tambahan</label>
                    <textarea
                      rows={2}
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                </>
              )}

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl"
                >
                  {loading ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
