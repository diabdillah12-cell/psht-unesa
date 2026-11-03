import React from 'react';
import { MapPin, Phone, Mail, Instagram, Shield, Heart } from 'lucide-react';

export default function Footer({ settings }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#07080b] border-t border-amber-500/20 text-slate-400 text-xs sm:text-sm mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Falsafah */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-14 rounded-xl overflow-hidden border-2 border-amber-500/50 bg-black shrink-0 shadow-md">
                <img src="/psht-logo.jpg" alt="Logo PSHT" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-black text-white text-base tracking-wide">
                  PSHT KOMISARIAT UNESA
                </h3>
                <p className="text-xs text-amber-400 font-medium">Universitas Negeri Surabaya</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-md">
              {settings?.aboutText ||
                'Wadah resmi pencak silat mahasiswa UNESA yang berorientasi pada pelestarian tradisi luhur pencak silat, pembinaan karakter berbudi luhur, dan pencapaian prestasi gelanggang nasional.'}
            </p>

            <div className="p-3.5 bg-[#12131b] border border-amber-500/20 rounded-2xl max-w-md">
              <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold block mb-0.5">
                Falsafah Luhur:
              </span>
              <p className="text-xs italic text-slate-200 font-serif">
                "Sepiro Gedhening Sengsoro Yen Tinompo Amung Dadi Cobo"
              </p>
            </div>
          </div>

          {/* Col 2: Jadwal Latihan Ringkas */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-extrabold text-white tracking-wider flex items-center gap-1.5">
              <Shield size={14} className="text-amber-400" /> Jadwal Latihan Resmi
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-[#10121a] rounded-xl border border-slate-800">
                <span className="font-bold text-amber-300 block">Latihan Rutin Prestasi:</span>
                <span className="text-slate-300">Selasa & Kamis, 18.00 WIB</span>
                <span className="text-[11px] text-slate-400 block">Lapangan Silat GOR Inter Lidah</span>
              </div>

              <div className="p-2.5 bg-[#10121a] rounded-xl border border-slate-800">
                <span className="font-bold text-amber-300 block">Latihan Rutin Tradisi:</span>
                <span className="text-slate-300">Senin 19.22 WIB (LPSP)</span>
                <span className="text-slate-300 block">Kamis 19.22 WIB (Belakang Gema)</span>
              </div>
            </div>
          </div>

          {/* Col 3: Kontak Sekretariat */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-extrabold text-white tracking-wider">
              Sekretariat & Narahubung
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {settings?.secretariatAddress ||
                    'Student Center UNESA Kampus Lidah Wetan, Surabaya'}
                </span>
              </div>

              {settings?.contactWhatsapp && (
                <div className="flex items-center gap-2">
                  <Phone size={15} className="text-emerald-400 shrink-0" />
                  <a
                    href={`https://wa.me/${settings.contactWhatsapp.replace(/^0/, '62')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-amber-400 transition"
                  >
                    {settings.contactWhatsapp}
                  </a>
                </div>
              )}

              {settings?.contactInstagram && (
                <div className="flex items-center gap-2">
                  <Instagram size={15} className="text-pink-400 shrink-0" />
                  <span className="text-slate-300">{settings.contactInstagram}</span>
                </div>
              )}

              {settings?.contactEmail && (
                <div className="flex items-center gap-2">
                  <Mail size={15} className="text-sky-400 shrink-0" />
                  <span>{settings.contactEmail}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {currentYear} PSHT Komisariat Universitas Negeri Surabaya. Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1">
            <span>Dikembangkan untuk Persaudaraan Setia Hati Terate UNESA</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
