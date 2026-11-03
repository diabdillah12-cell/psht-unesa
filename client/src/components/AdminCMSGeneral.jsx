import React, { useState } from 'react';
import { api } from '../services/api';
import { Settings, Bell, MessageSquare, Instagram, Mail, MapPin, Check, Save } from 'lucide-react';

export default function AdminCMSGeneral({ data, onContentUpdated }) {
  const [formData, setFormData] = useState({
    siteTitle: data?.siteTitle || 'PSHT KOMISARIAT UNESA',
    tagline: data?.tagline || 'Memayu Hayuning Bawana - Sepiro Gedhening Sengsoro Yen Tinompo Amung Dadi Cobo',
    announcement: data?.announcement || '',
    contactWhatsapp: data?.contactWhatsapp || '',
    contactEmail: data?.contactEmail || '',
    contactInstagram: data?.contactInstagram || '',
    secretariatAddress: data?.secretariatAddress || '',
    aboutText: data?.aboutText || ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.updateContentSection('settings', formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      if (onContentUpdated) onContentUpdated();
    } catch (err) {
      alert(err.message || 'Gagal menyimpan pengaturan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#13151f] border border-amber-500/30 rounded-3xl p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <Settings size={18} className="text-amber-400" />
            <span>Pengaturan Umum & Konten Tampilan UI</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Kelola pengumuman running banner, motto, dan informasi sekretariat komisariat.
          </p>
        </div>
        {success && (
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full flex items-center gap-1">
            <Check size={14} /> Berhasil disimpan
          </span>
        )}
      </div>

      {/* Running Announcement Banner */}
      <div className="space-y-1.5">
        <label className="text-xs sm:text-sm font-bold text-amber-400 flex items-center gap-1.5">
          <Bell size={15} /> Banner Pengumuman Dasbor Anggota (Running Text)
        </label>
        <textarea
          rows={2}
          value={formData.announcement}
          onChange={(e) => setFormData({ ...formData, announcement: e.target.value })}
          placeholder="Teks berjalan di dasbor anggota..."
          className="w-full px-3.5 py-2.5 bg-[#191b26] border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:border-amber-400 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
        <div>
          <label className="text-slate-300 font-semibold block mb-1">Judul Situs / Organisasi</label>
          <input
            type="text"
            value={formData.siteTitle}
            onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
            className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
          />
        </div>
        <div>
          <label className="text-slate-300 font-semibold block mb-1">Tagline / Motto Luhur</label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
        <div>
          <label className="text-slate-300 font-semibold block mb-1 flex items-center gap-1">
            <MessageSquare size={13} className="text-emerald-400" /> No. WhatsApp Admin
          </label>
          <input
            type="text"
            value={formData.contactWhatsapp}
            onChange={(e) => setFormData({ ...formData, contactWhatsapp: e.target.value })}
            className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
          />
        </div>
        <div>
          <label className="text-slate-300 font-semibold block mb-1 flex items-center gap-1">
            <Instagram size={13} className="text-pink-400" /> Instagram Resmi
          </label>
          <input
            type="text"
            value={formData.contactInstagram}
            onChange={(e) => setFormData({ ...formData, contactInstagram: e.target.value })}
            className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
          />
        </div>
        <div>
          <label className="text-slate-300 font-semibold block mb-1 flex items-center gap-1">
            <Mail size={13} className="text-sky-400" /> Email Resmi
          </label>
          <input
            type="email"
            value={formData.contactEmail}
            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
            className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
          />
        </div>
      </div>

      <div className="space-y-1.5 text-xs sm:text-sm">
        <label className="text-slate-300 font-semibold flex items-center gap-1">
          <MapPin size={13} className="text-amber-400" /> Alamat Sekretariat Komisariat
        </label>
        <input
          type="text"
          value={formData.secretariatAddress}
          onChange={(e) => setFormData({ ...formData, secretariatAddress: e.target.value })}
          className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white text-xs sm:text-sm"
        />
      </div>

      <div className="space-y-1.5 text-xs sm:text-sm">
        <label className="text-slate-300 font-semibold block">Tentang PSHT Komisariat UNESA</label>
        <textarea
          rows={3}
          value={formData.aboutText}
          onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
          className="w-full px-3.5 py-2.5 bg-[#191b26] border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:border-amber-400 outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center gap-2"
      >
        <Save size={16} />
        <span>{loading ? 'Menyimpan...' : 'Simpan Pengaturan'}</span>
      </button>
    </form>
  );
}
