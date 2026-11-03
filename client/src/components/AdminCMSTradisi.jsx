import React, { useState } from 'react';
import { api } from '../services/api';
import { BookOpen, Calendar, Award, Plus, Edit2, Trash2, X, Clock, MapPin, Check } from 'lucide-react';

export default function AdminCMSTradisi({ data, onContentUpdated }) {
  const [activeTab, setActiveTab] = useState('jadwal'); // 'jadwal' | 'materi' | 'tesSabuk'
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const jadwal = data?.jadwalLatihan || {};
  const [jadwalForm, setJadwalForm] = useState({
    title: jadwal.title || 'Jadwal Latihan Rutin Tradisi & Ke-SH-an',
    session1Day: jadwal.sessions?.[0]?.day || 'Senin',
    session1Time: jadwal.sessions?.[0]?.time || '19.22 WIB - Selesai',
    session1Loc: jadwal.sessions?.[0]?.location || 'Halaman Samping LPSP UNESA',
    session1Detail: jadwal.sessions?.[0]?.detail || 'Fokus Senam Dasar (1-90), Jurus Dasar (1-36), Pasang, dan Sambung Tradisi',
    session2Day: jadwal.sessions?.[1]?.day || 'Kamis',
    session2Time: jadwal.sessions?.[1]?.time || '19.22 WIB - Selesai',
    session2Loc: jadwal.sessions?.[1]?.location || 'Lapangan Belakang Gema UNESA',
    session2Detail: jadwal.sessions?.[1]?.detail || 'Fokus Penguatan Fisik, Sambutan Jurus, Senjata Tradisional, dan Wejangan Ke-SH-an',
    dresscode: jadwal.dresscode || 'Sakral Lengkap Hitam PSHT, Sabuk sesuai tingkatan, Mori bagi Warga.',
    instructors: (jadwal.instructors || []).join('\n')
  });

  const materiList = data?.materiSH || [];
  const tesSabukList = data?.tesSabuk || [];

  const handleSaveJadwal = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title: jadwalForm.title,
        sessions: [
          {
            day: jadwalForm.session1Day,
            time: jadwalForm.session1Time,
            location: jadwalForm.session1Loc,
            detail: jadwalForm.session1Detail
          },
          {
            day: jadwalForm.session2Day,
            time: jadwalForm.session2Time,
            location: jadwalForm.session2Loc,
            detail: jadwalForm.session2Detail
          }
        ],
        dresscode: jadwalForm.dresscode,
        instructors: jadwalForm.instructors.split('\n').filter(Boolean)
      };
      await api.updateJadwal('tradisi', payload);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      if (onContentUpdated) onContentUpdated();
    } catch (err) {
      alert(err.message || 'Gagal menyimpan jadwal tradisi');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    if (activeTab === 'materi') {
      setFormData({
        title: '',
        summary: '',
        content: ''
      });
    } else if (activeTab === 'tesSabuk') {
      setFormData({
        level: '',
        requirements: '',
        period: 'Semester Gasal / Suro',
        status: 'Terbuka'
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
        await api.addContentItem('tradisi', activeTab === 'materi' ? 'materiSH' : 'tesSabuk', formData);
      } else {
        await api.updateContentItem(
          'tradisi',
          activeTab === 'materi' ? 'materiSH' : 'tesSabuk',
          editItem.id,
          formData
        );
      }
      setModalMode(null);
      if (onContentUpdated) onContentUpdated();
    } catch (err) {
      alert(err.message || 'Gagal menyimpan');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (itemId, title) => {
    if (!window.confirm(`Hapus "${title}" dari Pedoman Tradisi?`)) return;
    try {
      await api.deleteContentItem(
        'tradisi',
        activeTab === 'materi' ? 'materiSH' : 'tesSabuk',
        itemId
      );
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
            <Calendar size={16} /> Edit Jadwal Latihan Tradisi
          </button>
          <button
            onClick={() => setActiveTab('materi')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'materi'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen size={16} /> Materi Ke-SH-an ({materiList.length})
          </button>
          <button
            onClick={() => setActiveTab('tesSabuk')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'tesSabuk'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award size={16} /> Info Tes Sabuk ({tesSabukList.length})
          </button>
        </div>

        {activeTab !== 'jadwal' && (
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>Tambah {activeTab === 'materi' ? 'Materi Ke-SH-an' : 'Info Tes Sabuk'}</span>
          </button>
        )}
      </div>

      {/* TAB 1: EDIT JADWAL TRADISI (SENIN LPSP & KAMIS BELAKANG GEMA) */}
      {activeTab === 'jadwal' && (
        <form onSubmit={handleSaveJadwal} className="bg-[#13151f] border border-amber-500/30 rounded-3xl p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-white text-lg">Konfigurasi Jadwal Latihan Tradisi</h3>
              <p className="text-xs text-slate-400">
                Data jadwal Senin di LPSP & Kamis di Belakang Gema dapat diubah sewaktu-waktu oleh Admin.
              </p>
            </div>
            {saveSuccess && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full flex items-center gap-1">
                <Check size={14} /> Berhasil disimpan
              </span>
            )}
          </div>

          {/* Sesi 1: Senin di Halaman Samping LPSP */}
          <div className="bg-[#181a26] border border-slate-800 rounded-2xl p-4 space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              📍 Sesi 1: Hari Senin (LPSP)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Hari</label>
                <input
                  type="text"
                  required
                  value={jadwalForm.session1Day}
                  onChange={(e) => setJadwalForm({ ...jadwalForm, session1Day: e.target.value })}
                  className="w-full px-3 py-2 bg-[#12131b] border border-slate-700 rounded-xl text-white font-bold"
                />
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Waktu</label>
                <input
                  type="text"
                  required
                  value={jadwalForm.session1Time}
                  onChange={(e) => setJadwalForm({ ...jadwalForm, session1Time: e.target.value })}
                  className="w-full px-3 py-2 bg-[#12131b] border border-slate-700 rounded-xl text-white font-bold"
                />
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Lokasi Latihan</label>
                <input
                  type="text"
                  required
                  value={jadwalForm.session1Loc}
                  onChange={(e) => setJadwalForm({ ...jadwalForm, session1Loc: e.target.value })}
                  className="w-full px-3 py-2 bg-[#12131b] border border-slate-700 rounded-xl text-white"
                />
              </div>
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1 text-xs">Fokus / Detail Latihan</label>
              <input
                type="text"
                value={jadwalForm.session1Detail}
                onChange={(e) => setJadwalForm({ ...jadwalForm, session1Detail: e.target.value })}
                className="w-full px-3 py-2 bg-[#12131b] border border-slate-700 rounded-xl text-white text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Sesi 2: Kamis di Lapangan Belakang Gema */}
          <div className="bg-[#181a26] border border-slate-800 rounded-2xl p-4 space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              📍 Sesi 2: Hari Kamis (Gema)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Hari</label>
                <input
                  type="text"
                  required
                  value={jadwalForm.session2Day}
                  onChange={(e) => setJadwalForm({ ...jadwalForm, session2Day: e.target.value })}
                  className="w-full px-3 py-2 bg-[#12131b] border border-slate-700 rounded-xl text-white font-bold"
                />
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Waktu</label>
                <input
                  type="text"
                  required
                  value={jadwalForm.session2Time}
                  onChange={(e) => setJadwalForm({ ...jadwalForm, session2Time: e.target.value })}
                  className="w-full px-3 py-2 bg-[#12131b] border border-slate-700 rounded-xl text-white font-bold"
                />
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Lokasi Latihan</label>
                <input
                  type="text"
                  required
                  value={jadwalForm.session2Loc}
                  onChange={(e) => setJadwalForm({ ...jadwalForm, session2Loc: e.target.value })}
                  className="w-full px-3 py-2 bg-[#12131b] border border-slate-700 rounded-xl text-white"
                />
              </div>
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1 text-xs">Fokus / Detail Latihan</label>
              <input
                type="text"
                value={jadwalForm.session2Detail}
                onChange={(e) => setJadwalForm({ ...jadwalForm, session2Detail: e.target.value })}
                className="w-full px-3 py-2 bg-[#12131b] border border-slate-700 rounded-xl text-white text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Busana Sakral & Tata Tertib</label>
              <textarea
                rows={2}
                value={jadwalForm.dresscode}
                onChange={(e) => setJadwalForm({ ...jadwalForm, dresscode: e.target.value })}
                className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Dewan Pembina / Instruktur</label>
              <textarea
                rows={2}
                value={jadwalForm.instructors}
                onChange={(e) => setJadwalForm({ ...jadwalForm, instructors: e.target.value })}
                className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition"
          >
            {loading ? 'Menyimpan Jadwal...' : 'Simpan Perubahan Jadwal Tradisi'}
          </button>
        </form>
      )}

      {/* TAB 2: MATERI KE-SH-AN */}
      {activeTab === 'materi' && (
        <div className="space-y-4">
          {materiList.map((m) => (
            <div
              key={m.id}
              className="bg-[#13151f] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between"
            >
              <div>
                <h4 className="font-bold text-white text-base mb-1">{m.title}</h4>
                <p className="text-xs text-amber-400 mb-2">{m.summary}</p>
                <div className="bg-[#171926] p-3 rounded-xl border border-slate-800 text-xs text-slate-300 whitespace-pre-line">
                  {m.content}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-end gap-2 mt-3">
                <button
                  onClick={() => handleOpenEdit(m)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-xs"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDeleteItem(m.id, m.title)}
                  className="p-1.5 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg text-xs"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: INFO TES SABUK */}
      {activeTab === 'tesSabuk' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tesSabukList.map((ts) => (
            <div
              key={ts.id}
              className="bg-[#13151f] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-amber-400 font-bold">{ts.period}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px]">
                    {ts.status}
                  </span>
                </div>
                <h4 className="font-bold text-white text-base mb-2">{ts.level}</h4>
                <p className="text-xs text-slate-300 bg-[#171926] p-2.5 rounded-xl border border-slate-800">
                  {ts.requirements}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2 mt-3">
                <button
                  onClick={() => handleOpenEdit(ts)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-xs"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDeleteItem(ts.id, ts.level)}
                  className="p-1.5 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg text-xs"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Materi & Tes Sabuk */}
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
              {activeTab === 'materi' ? 'Materi Ke-SH-an' : 'Info Ujian Sabuk'}
            </h3>

            <form onSubmit={handleSaveItem} className="space-y-3.5 text-xs sm:text-sm">
              {activeTab === 'materi' && (
                <>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Judul Materi</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Contoh: Panca Dasar PSHT"
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Ringkasan / Makna Pokok</label>
                    <input
                      type="text"
                      value={formData.summary || ''}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Isi Lengkap Wejangan</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.content || ''}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white whitespace-pre-line"
                    />
                  </div>
                </>
              )}

              {activeTab === 'tesSabuk' && (
                <>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Tingkatan UKT</label>
                    <input
                      type="text"
                      required
                      value={formData.level || ''}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      placeholder="Sabuk Polos ke Jambon"
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Persyaratan & Materi</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.requirements || ''}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder="Kehadiran 80%, Senam 1-30, Jurus 1-12..."
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Periode</label>
                      <input
                        type="text"
                        value={formData.period || ''}
                        onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                        placeholder="Maret & September"
                        className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Status</label>
                      <input
                        type="text"
                        value={formData.status || ''}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        placeholder="Terbuka"
                        className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                      />
                    </div>
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
