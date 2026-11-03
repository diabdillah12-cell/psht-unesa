import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Layout, Save, Check, Bell, MessageSquare, Instagram, Mail, MapPin } from 'lucide-react';
import ImageUploader from './ImageUploader';

export default function AdminLayoutCMS({ onSettingsUpdated }) {
  const [formData, setFormData] = useState({
    siteTitle: 'PSHT KOMISARIAT UNESA',
    tagline: 'Memayu Hayuning Bawana - Sepiro Gedhening Sengsoro Yen Tinompo Amung Dadi Cobo',
    announcement: '',
    contactWhatsapp: '081234567890',
    contactEmail: 'psht@unesa.ac.id',
    contactInstagram: '@psht_unesa',
    secretariatAddress: 'Gedung Student Center Lt. 2, Kampus UNESA Lidah Wetan, Surabaya, Jawa Timur 60213',
    logoUrl: '/tamplate-konten-stuba.svg'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const res = await api.getSettings();
        if (res.settings) {
          setFormData(res.settings);
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.updateSettings(formData);
      setMessage('Pengaturan tampilan & tata letak CMS berhasil disimpan.');
      if (onSettingsUpdated) onSettingsUpdated();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      alert(err.message || 'Gagal menyimpan pengaturan');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="bg-[#12131b] border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <Layout size={18} className="text-amber-400" />
            <span>Manajemen Tampilan & Tata Letak Web (CMS Layout)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Hak penuh Administrator mengatur pesan beranda, teks berjalan, logo, dan identitas kontak.
          </p>
        </div>
        {message && (
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full flex items-center gap-1">
            <Check size={14} /> {message}
          </span>
        )}
      </div>

      <div className="space-y-4 text-xs sm:text-sm">
        {/* Banner Pengumuman Running Text */}
        <div>
          <label className="text-amber-400 font-bold block mb-1 flex items-center gap-1.5">
            <Bell size={15} /> Banner Pengumuman Dasbor Pengguna (Teks Berjalan)
          </label>
          <textarea
            rows={2}
            value={formData.announcement}
            onChange={(e) => setFormData({ ...formData, announcement: e.target.value })}
            placeholder="Teks pengumuman penting yang akan tampil di Dasbor Pengguna..."
            className="w-full px-3.5 py-2.5 bg-[#191b26] border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Nama Situs / Organisasi</label>
            <input
              type="text"
              value={formData.siteTitle}
              onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
              className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
            />
          </div>
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Moto / Falsafah Utama</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
            />
          </div>
        </div>

        {/* Direct File Upload for Logo */}
        <ImageUploader
          label="Upload Logo Resmi Organisasi (Bebas: SVG, PNG, JPG, HEIC, dll)"
          value={formData.logoUrl}
          onChange={(uploadedUrl) => setFormData({ ...formData, logoUrl: uploadedUrl })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-slate-300 font-semibold block mb-1 flex items-center gap-1">
              <MessageSquare size={13} className="text-emerald-400" /> WhatsApp Pengurus
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

        <div>
          <label className="text-slate-300 font-semibold block mb-1 flex items-center gap-1">
            <MapPin size={13} className="text-amber-400" /> Alamat Sekretariat Komisariat
          </label>
          <input
            type="text"
            value={formData.secretariatAddress}
            onChange={(e) => setFormData({ ...formData, secretariatAddress: e.target.value })}
            className="w-full px-3 py-2 bg-[#191b26] border border-slate-700 rounded-xl text-white"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center gap-2"
      >
        <Save size={16} />
        <span>{saving ? 'Menyimpan...' : 'Simpan Tata Letak & Tampilan'}</span>
      </button>
    </form>
  );
}
