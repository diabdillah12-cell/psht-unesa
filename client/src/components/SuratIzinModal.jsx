import React from 'react';
import { X, Printer, Download, FileText, CheckCircle2 } from 'lucide-react';

export default function SuratIzinModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    const printWindow = window.open('/surat-izin-latihan-psht-unesa.html', '_blank');
    if (printWindow) {
      printWindow.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#12131b] border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-14 rounded-xl overflow-hidden border border-amber-500/60 bg-black shrink-0 p-0.5">
            <img src="/tamplate-konten-stuba.svg" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 block">
              DOKUMEN RESMI PENDAFTARAN SISWA
            </span>
            <h3 className="text-xl font-black text-white">Surat Izin Mengikuti Latihan</h3>
            <p className="text-xs text-slate-400">Wajib ditandatangani oleh Orang Tua/Wali dan Calon Siswa</p>
          </div>
        </div>

        <div className="bg-[#181a26] border border-slate-800 rounded-2xl p-4 sm:p-5 text-xs text-slate-300 space-y-3 max-h-72 overflow-y-auto">
          <p className="font-semibold text-white">Panduan Pengisian:</p>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
            <li>Unduh atau cetak template surat izin resmi dengan tombol di bawah.</li>
            <li>Isi data diri orang tua/wali dan data calon siswa secara lengkap dan benar.</li>
            <li>Bubuhkan tanda tangan orang tua/wali serta calon siswa.</li>
            <li>Foto atau scan surat yang sudah ditandatangani, lalu unggah pada form pendaftaran siswa.</li>
          </ol>

          <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-amber-300 text-[11px]">
            <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
            <span>Format yang didukung untuk upload: JPG, PNG, atau PDF (maksimal 10MB).</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2"
          >
            <Printer size={16} />
            <span>Buka & Cetak Surat Izin (PDF)</span>
          </button>

          <a
            href="/api/download/template-surat-izin"
            download="Template-Surat-Izin-Latihan-PSHT-UNESA.html"
            className="w-full sm:w-auto px-5 py-2.5 bg-[#191b26] hover:bg-[#202332] text-amber-300 border border-amber-500/30 font-bold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2"
          >
            <Download size={16} />
            <span>Unduh Berkas Template</span>
          </a>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold rounded-xl transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
