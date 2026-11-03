import React, { useState } from 'react';
import { api } from '../services/api';
import { Upload, X, Check, Image as ImageIcon, FileCheck, Loader2 } from 'lucide-react';

export default function ImageUploader({
  label = 'Upload Gambar (JPG, HEIC, PNG, dll)',
  value = '',
  onChange,
  accept = 'image/*,.heic,.heif,.jpg,.jpeg,.png,.webp,.svg,.pdf',
  required = false
}) {
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [error, setError] = useState('');

  const isHeic = (filename = '') => {
    const ext = filename.toLowerCase().split('.').pop();
    return ext === 'heic' || ext === 'heif';
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');
    setUploading(true);

    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
    setFileInfo({
      name: file.name,
      size: `${sizeMb} MB`,
      isHeic: isHeic(file.name)
    });

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await api.uploadFile(formData);

      if (res && res.url) {
        onChange(res.url);
      } else {
        throw new Error('Gagal mendapatkan URL berkas');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Gagal mengunggah berkas. Pastikan ukuran file tidak melebihi 30MB.');
    } finally {
      setUploading(false);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
    setFileInfo(null);
  };

  return (
    <div className="space-y-1.5 text-xs sm:text-sm">
      <label className="text-slate-300 font-semibold block">
        {label} {required && <span className="text-red-400">*</span>}
      </label>

      {error && <p className="text-[11px] text-red-400 font-medium">{error}</p>}

      {/* Upload Zone */}
      <div className="relative border-2 border-dashed border-slate-700 hover:border-amber-500/70 rounded-2xl p-4 bg-[#161824] transition text-center group cursor-pointer">
        <input
          type="file"
          accept={accept}
          onChange={handleFile}
          disabled={uploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />

        {uploading ? (
          <div className="flex flex-col items-center justify-center py-4 space-y-2 text-amber-400">
            <Loader2 size={28} className="animate-spin" />
            <span className="text-xs font-semibold">Mengunggah berkas ({fileInfo?.name})...</span>
          </div>
        ) : value ? (
          <div className="flex flex-col items-center">
            {/* If it is a HEIC or PDF or non-previewable format */}
            {fileInfo?.isHeic || isHeic(value) ? (
              <div className="flex items-center gap-3 bg-[#111219] p-3 rounded-xl border border-amber-500/40 text-left mb-2">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs uppercase">
                  HEIC
                </div>
                <div>
                  <span className="font-bold text-white text-xs block truncate max-w-xs">
                    {fileInfo?.name || value.split('/').pop()}
                  </span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <Check size={11} /> Berkas format HEIC/HEIF tersimpan
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative max-h-36 overflow-hidden rounded-xl border border-slate-700 mb-2 bg-black">
                <img
                  src={value}
                  alt="Preview"
                  className="max-h-36 w-auto object-contain"
                  onError={(e) => {
                    // Fallback to placeholder box
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-400 font-medium">Klik untuk mengganti gambar</span>
              <button
                type="button"
                onClick={handleClear}
                className="p-1 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-md transition"
                title="Hapus gambar"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-2 group-hover:scale-105 transition">
              <Upload size={20} />
            </div>
            <p className="text-xs text-slate-200 font-semibold">
              Pilih Berkas Langsung <span className="text-amber-400 font-bold">(JPG, HEIC, PNG, WEBP)</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Klik atau tarik file dari galeri / kamera perangkat (Maks. 30MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
