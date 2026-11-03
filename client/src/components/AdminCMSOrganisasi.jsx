import React, { useState } from 'react';
import { api } from '../services/api';
import { Users, Calendar, Target, Plus, Edit2, Trash2, X, Check, AlertCircle } from 'lucide-react';
import ImageUploader from './ImageUploader';

export default function AdminCMSOrganisasi({ data, onContentUpdated }) {
  const [activeTab, setActiveTab] = useState('pengurus'); // 'pengurus' | 'agenda' | 'proker'
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const pengurusList = data?.pengurus || [];
  const agendaList = data?.agenda || [];
  const prokerList = data?.proker || [];

  const handleOpenAdd = () => {
    if (activeTab === 'pengurus') {
      setFormData({
        name: '',
        role: '',
        division: 'Badan Pengurus Harian (BPH)',
        faculty: 'UNESA',
        contact: '',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
      });
    } else if (activeTab === 'agenda') {
      setFormData({
        title: '',
        date: new Date().toISOString().split('T')[0],
        time: '19.00 WIB - Selesai',
        location: 'Kampus Lidah Wetan UNESA',
        description: '',
        status: 'Akan Datang'
      });
    } else if (activeTab === 'proker') {
      setFormData({
        name: '',
        period: 'Semester Gasal',
        target: '',
        progress: 'Terencana',
        lead: 'Bidang Organisasi'
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

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (modalMode === 'add') {
        await api.addContentItem('organisasi', activeTab, formData);
      } else {
        await api.updateContentItem('organisasi', activeTab, editItem.id, formData);
      }
      setModalMode(null);
      if (onContentUpdated) onContentUpdated();
    } catch (err) {
      alert(err.message || 'Gagal menyimpan data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId, title) => {
    if (!window.confirm(`Hapus "${title}" dari Pedoman Organisasi?`)) return;
    try {
      await api.deleteContentItem('organisasi', activeTab, itemId);
      if (onContentUpdated) onContentUpdated();
    } catch (err) {
      alert(err.message || 'Gagal menghapus data');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top sub-tabs & add button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#13151f] border border-slate-800 p-4 sm:p-5 rounded-2xl">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('pengurus')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'pengurus'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users size={16} /> Kelola Pengurus ({pengurusList.length})
          </button>
          <button
            onClick={() => setActiveTab('agenda')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'agenda'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar size={16} /> Kelola Agenda ({agendaList.length})
          </button>
          <button
            onClick={() => setActiveTab('proker')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'proker'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Target size={16} /> Kelola Proker ({prokerList.length})
          </button>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Tambah {activeTab === 'pengurus' ? 'Pengurus' : activeTab === 'agenda' ? 'Agenda' : 'Proker'}</span>
        </button>
      </div>

      {/* LIST ITEMS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeTab === 'pengurus' &&
          pengurusList.map((p) => (
            <div
              key={p.id}
              className="bg-[#13151f] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between"
            >
              <div className="flex items-start gap-3">
                <img
                  src={p.photo}
                  alt={p.name}
                  className="w-14 h-14 rounded-xl object-cover border border-amber-500/30 shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-amber-400 block truncate">
                    {p.division}
                  </span>
                  <h4 className="font-bold text-white text-sm truncate">{p.name}</h4>
                  <p className="text-xs text-slate-300">{p.role}</p>
                  <p className="text-[11px] text-slate-500">{p.faculty}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(p)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-xs transition"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(p.id, p.name)}
                  className="p-1.5 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg text-xs transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

        {activeTab === 'agenda' &&
          agendaList.map((a) => (
            <div
              key={a.id}
              className="bg-[#13151f] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-1">
                  <span>{a.date}</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-[10px]">{a.status}</span>
                </div>
                <h4 className="font-bold text-white text-base mb-1">{a.title}</h4>
                <p className="text-xs text-slate-400 mb-2">{a.location} • {a.time}</p>
                <p className="text-xs text-slate-300 line-clamp-2">{a.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(a)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-xs transition"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(a.id, a.title)}
                  className="p-1.5 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg text-xs transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

        {activeTab === 'proker' &&
          prokerList.map((prk) => (
            <div
              key={prk.id}
              className="bg-[#13151f] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-amber-400 block mb-1">{prk.period}</span>
                <h4 className="font-bold text-white text-base mb-2">{prk.name}</h4>
                <p className="text-xs text-slate-300 mb-2">
                  <span className="text-slate-500">Target:</span> {prk.target}
                </p>
                <div className="text-xs text-slate-400 flex items-center justify-between">
                  <span>PJ: {prk.lead}</span>
                  <span className="text-amber-300 font-bold">{prk.progress}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(prk)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-xs transition"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(prk.id, prk.name)}
                  className="p-1.5 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg text-xs transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Add / Edit Modal */}
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
              {activeTab === 'pengurus' ? 'Pengurus' : activeTab === 'agenda' ? 'Agenda' : 'Program Kerja'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs sm:text-sm">
              {activeTab === 'pengurus' && (
                <>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Nama Lengkap & Gelar</label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Jabatan / Role</label>
                    <input
                      type="text"
                      required
                      value={formData.role || ''}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="Ketua Umum / Sekretaris / dll."
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Divisi / Bidang</label>
                    <input
                      type="text"
                      required
                      value={formData.division || ''}
                      onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Fakultas / Asal</label>
                    <input
                      type="text"
                      value={formData.faculty || ''}
                      onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">No. Kontak (WhatsApp)</label>
                    <input
                      type="text"
                      value={formData.contact || ''}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <ImageUploader
                      label="Foto Pengurus (JPG, PNG, HEIC, Bebas)"
                      value={formData.photo || ''}
                      onChange={(uploadedUrl) => setFormData({ ...formData, photo: uploadedUrl })}
                    />
                  </div>
                </>
              )}

              {activeTab === 'agenda' && (
                <>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Judul Agenda Kegiatan</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Tanggal</label>
                      <input
                        type="date"
                        required
                        value={formData.date || ''}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Waktu</label>
                      <input
                        type="text"
                        value={formData.time || ''}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        placeholder="19.00 WIB"
                        className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Lokasi</label>
                    <input
                      type="text"
                      required
                      value={formData.location || ''}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Deskripsi Kegiatan</label>
                    <textarea
                      rows={3}
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                </>
              )}

              {activeTab === 'proker' && (
                <>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Nama Program Kerja</label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Periode / Waktu</label>
                    <input
                      type="text"
                      value={formData.period || ''}
                      onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Target Capaian</label>
                    <textarea
                      rows={2}
                      value={formData.target || ''}
                      onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Status Progres</label>
                      <input
                        type="text"
                        value={formData.progress || ''}
                        onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                        placeholder="Berjalan (50%)"
                        className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Penanggung Jawab</label>
                      <input
                        type="text"
                        value={formData.lead || ''}
                        onChange={(e) => setFormData({ ...formData, lead: e.target.value })}
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
