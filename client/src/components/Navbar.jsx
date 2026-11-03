import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Menu,
  X,
  LogOut,
  User,
  ShieldCheck,
  UserPlus,
  LogIn,
  ChevronRight,
  Shield
} from 'lucide-react';

export default function Navbar({ onOpenLogin, onOpenRegister, activeView, setActiveView }) {
  const { user, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#090a0f]/90 backdrop-blur-xl border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveView('home')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            {/* Official PSHT UNESA Logo (tamplate konten stuba.svg) */}
            <div className="relative w-12 h-14 rounded-xl overflow-hidden border-2 border-amber-500/50 shadow-lg shadow-amber-500/25 group-hover:border-amber-400 group-hover:scale-105 transition bg-black shrink-0 flex items-center justify-center p-0.5">
              <img
                src="/tamplate-konten-stuba.svg"
                onError={(e) => {
                  e.currentTarget.src = '/uploads/tamplate%20konten%20stuba.svg';
                }}
                alt="Logo PSHT UNESA"
                className="w-full h-full object-contain"
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black tracking-wider text-white group-hover:text-amber-400 transition">
                  PSHT UNESA
                </span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full">
                  Komisariat
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-tight">
                Universitas Negeri Surabaya
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#13151f] border border-slate-800 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveView('home')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeView === 'home'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Beranda Portal
            </button>

            {/* If logged in, button to go to member dashboard */}
            {user && (
              <button
                onClick={() => setActiveView('dashboard')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
                  activeView === 'dashboard'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {isAdmin ? (
                  <>
                    <ShieldCheck size={16} />
                    <span>Dasbor Admin CMS</span>
                  </>
                ) : (
                  <>
                    <Shield size={16} />
                    <span>Dasbor Anggota</span>
                  </>
                )}
              </button>
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs font-bold text-white block leading-tight">
                    {user.name}
                  </span>
                  <span className="text-[11px] text-amber-400 font-mono">
                    {user.role === 'admin'
                      ? 'Administrator'
                      : `${user.memberType} (${user.status})`}
                  </span>
                </div>

                <button
                  onClick={logout}
                  title="Keluar dari akun"
                  className="p-2.5 bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-slate-700 rounded-xl transition"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <button
                  onClick={onOpenLogin}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-[#13151f] hover:bg-[#1a1c29] border border-slate-800 rounded-xl transition flex items-center gap-2"
                >
                  <LogIn size={15} />
                  <span>Masuk</span>
                </button>
                <button
                  onClick={onOpenRegister}
                  className="px-4 py-2 text-xs sm:text-sm font-bold text-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center gap-2"
                >
                  <UserPlus size={15} />
                  <span>Daftar</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            {user && (
              <button
                onClick={() => setActiveView('dashboard')}
                className="px-2.5 py-1.5 bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded-lg text-xs font-bold"
              >
                {isAdmin ? 'Admin' : 'Dasbor'}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-[#13151f] border border-slate-800 rounded-xl"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d0e14] border-b border-amber-500/20 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="flex items-center gap-3 p-2.5 bg-[#12141f] rounded-xl border border-slate-800 mb-2">
            <div className="w-9 h-11 rounded-lg overflow-hidden border border-amber-500/50 bg-black shrink-0 flex items-center justify-center p-0.5">
              <img
                src="/tamplate-konten-stuba.svg"
                onError={(e) => { e.currentTarget.src = '/uploads/tamplate%20konten%20stuba.svg'; }}
                alt="Logo PSHT UNESA"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-sm font-black text-white block leading-tight">PSHT UNESA</span>
              <span className="text-[11px] text-amber-400 font-medium">Komisariat Universitas Negeri Surabaya</span>
            </div>
          </div>

          <button
            onClick={() => {
              setActiveView('home');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left p-3 rounded-xl text-sm font-semibold ${
              activeView === 'home'
                ? 'bg-amber-500 text-black font-bold'
                : 'text-slate-300 bg-[#141622]'
            }`}
          >
            Beranda Portal
          </button>

          {user && (
            <button
              onClick={() => {
                setActiveView('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left p-3 rounded-xl text-sm font-semibold flex items-center justify-between ${
                activeView === 'dashboard'
                  ? 'bg-amber-500 text-black font-bold'
                  : 'text-slate-300 bg-[#141622]'
              }`}
            >
              <span>{isAdmin ? 'Dasbor Admin (CMS)' : 'Dasbor Anggota'}</span>
              <ChevronRight size={16} />
            </button>
          )}

          <div className="pt-3 border-t border-slate-800">
            {user ? (
              <div className="space-y-3">
                <div className="p-3 bg-[#161826] rounded-xl text-xs">
                  <span className="font-bold text-white block">{user.name}</span>
                  <span className="text-amber-400 font-mono">
                    {user.role === 'admin'
                      ? 'Administrator'
                      : `${user.memberType} (${user.status})`}
                  </span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <LogOut size={16} />
                  <span>Keluar Akun</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="py-2.5 bg-[#161826] border border-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
                >
                  <LogIn size={15} /> Masuk
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister();
                  }}
                  className="py-2.5 bg-amber-500 text-black text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md"
                >
                  <UserPlus size={15} /> Daftar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
