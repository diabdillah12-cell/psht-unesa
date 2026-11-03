import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { api } from './services/api';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PublicHome from './components/PublicHome';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import SuratIzinModal from './components/SuratIzinModal';

export default function App() {
  const { user, isAdmin, loading } = useAuth();
  const [activeView, setActiveView] = useState('home'); // 'home' | 'dashboard'
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSuratModalOpen, setIsSuratModalOpen] = useState(false);
  const [settings, setSettings] = useState(null);

  const loadGlobalSettings = async () => {
    try {
      const res = await api.getSettings();
      setSettings(res.settings);
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
  };

  useEffect(() => {
    loadGlobalSettings();
  }, []);

  // When user logs in, auto switch to dashboard
  useEffect(() => {
    if (user) {
      setActiveView('dashboard');
    }
  }, [user?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090a0f] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-20 rounded-2xl overflow-hidden border-2 border-amber-500/50 bg-black mx-auto p-1 animate-pulse">
            <img src="/tamplate-konten-stuba.svg" alt="PSHT UNESA" className="w-full h-full object-contain" />
          </div>
          <p className="text-amber-400 text-xs font-bold uppercase tracking-widest">
            Memuat Sistem PSHT UNESA...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f] text-slate-100 selection:bg-amber-500 selection:text-black">
      {/* Navigation Header */}
      <Navbar
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main Body */}
      <main className="flex-1">
        {activeView === 'home' ? (
          <PublicHome
            onOpenLogin={() => setIsLoginOpen(true)}
            onOpenRegister={() => setIsRegisterOpen(true)}
            onOpenSuratModal={() => setIsSuratModalOpen(true)}
            onGoToDashboard={() => setActiveView('dashboard')}
            user={user}
            content={{ settings }}
          />
        ) : (
          <>
            {isAdmin ? (
              <AdminDashboard />
            ) : user ? (
              <UserDashboard />
            ) : (
              <div className="py-24 text-center px-4 space-y-4">
                <p className="text-sm text-slate-400">
                  Silakan masuk terlebih dahulu untuk mengakses Dasbor Pengguna PSHT UNESA.
                </p>
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-sm rounded-xl"
                >
                  Masuk Sekarang
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer settings={settings} />

      {/* Login & Register Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />

      <SuratIzinModal
        isOpen={isSuratModalOpen}
        onClose={() => setIsSuratModalOpen(false)}
      />
    </div>
  );
}
