import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Layers, Save, Check, Plus, Trash2, Users, Bookmark, Calendar } from 'lucide-react';

export default function AdminDepartmentsCMS() {
  const [departments, setDepartments] = useState({});
  const [selectedKey, setSelectedKey] = useState('bph');
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const res = await api.getDepartments();
      setDepartments(res.departments || {});
      if (res.departments && res.departments[selectedKey]) {
        setFormData(JSON.parse(JSON.stringify(res.departments[selectedKey])));
      }
    } catch (err) {
      console.error('Failed to load departments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSelectDept = (key) => {
    setSelectedKey(key);
    if (departments[key]) {
      setFormData(JSON.parse(JSON.stringify(departments[key])));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.updateDepartment(selectedKey, formData);
      setMessage(`Departemen ${formData.name} berhasil diperbarui.`);
      await fetchDepartments();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      alert(err.message || 'Gagal menyimpan perubahan');
    } finally {
      setSaving(false);
    }
  };

  const handleCoordinatorChange = (index, field, value) => {
    const list = [...(formData.coordinators || [])];
    list[index][field] = value;
    setFormData({ ...formData, coordinators: list });
  };

  const handleAddCoordinator = () => {
    const list = [...(formData.coordinators || [])];
    list.push({ name: '', role: 'Pengurus / Anggota', phone: '' });
    setFormData({ ...formData, coordinators: list });
  };

  const handleRemoveCoordinator = (index) => {
    const list = [...(formData.coordinators || [])];
    list.splice(index, 1);
    setFormData({ ...formData, coordinators: list });
  };

  const deptKeys = Object.keys(departments);

  return (
    <div className="space-y-6">
      {message && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-2 text-emerald-400 text-xs sm:text-sm">
          <Check size={16} />
          <span>{message}</span>
        </div>
      )}

      {/* Department Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {deptKeys.map((key) => {
          const isSelected = selectedKey === key;
          const d = departments[key];
          return (
            <button
              key={key}
              onClick={() => handleSelectDept(key)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition shrink-0 flex items-center gap-2 ${
                isSelected
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'bg-[#12131b] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <span>{d.code}</span>
              <span className="hidden sm:inline">({d.name})</span>
            </button>
          );
        })}
      </div>

      {formData && (
        <form onSubmit={handleSave} className="bg-[#12131b] border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">KODE DEPARTEMEN: {formData.code}</span>
              <h3 className="text-xl font-bold text-white mt-0.5">{formData.name}</h3>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs sm:text-sm rounded-xl shadow transition flex items-center gap-1.5"
            >
              <Save size={16} />
              <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
            </button>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Nama Lengkap Departemen</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Deskripsi Tugas Pokok & Fungsi</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Pedoman Operasional & Ketentuan Khusus</label>
              <textarea
                rows={4}
                value={formData.guidelines}
                onChange={(e) => setFormData({ ...formData, guidelines: e.target.value })}
                placeholder="Pedoman khusus bagi departemen ini..."
                className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white whitespace-pre-line"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Agenda Rutin & Rencana Kegiatan</label>
              <textarea
                rows={2}
                value={formData.agendas}
                onChange={(e) => setFormData({ ...formData, agendas: e.target.value })}
                className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
              />
            </div>

            {/* Coordinators List CRUD */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-amber-400 font-bold flex items-center gap-1.5">
                  <Users size={16} /> Daftar Pengurus & Koordinator Divisi
                </label>
                <button
                  type="button"
                  onClick={handleAddCoordinator}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-xs flex items-center gap-1"
                >
                  <Plus size={13} /> Tambah Anggota Pengurus
                </button>
              </div>

              <div className="space-y-2.5">
                {formData.coordinators &&
                  formData.coordinators.map((c, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-[#171926] p-3 rounded-xl border border-slate-800 items-center"
                    >
                      <div className="sm:col-span-5">
                        <input
                          type="text"
                          value={c.name}
                          onChange={(e) => handleCoordinatorChange(idx, 'name', e.target.value)}
                          placeholder="Nama Pengurus"
                          className="w-full px-2.5 py-1.5 bg-[#12131b] border border-slate-700 rounded-lg text-white text-xs"
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <input
                          type="text"
                          value={c.role}
                          onChange={(e) => handleCoordinatorChange(idx, 'role', e.target.value)}
                          placeholder="Jabatan / Divisi"
                          className="w-full px-2.5 py-1.5 bg-[#12131b] border border-slate-700 rounded-lg text-white text-xs"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          value={c.phone || ''}
                          onChange={(e) => handleCoordinatorChange(idx, 'phone', e.target.value)}
                          placeholder="No. WA"
                          className="w-full px-2.5 py-1.5 bg-[#12131b] border border-slate-700 rounded-lg text-white text-xs"
                        />
                      </div>
                      <div className="sm:col-span-1 text-right">
                        <button
                          type="button"
                          onClick={() => handleRemoveCoordinator(idx)}
                          className="p-1.5 text-slate-400 hover:text-red-400 transition"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
