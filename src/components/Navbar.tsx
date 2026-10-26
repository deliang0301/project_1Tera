import React, { useState } from 'react';
import { NavTab, UserProfile } from '../types';
import { Zap, Menu, X, Gamepad2, User, LogIn, Bot } from 'lucide-react';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  onSelectTab,
  currentUser,
  onOpenAuth,
  onOpenProfile
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/90 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Single text element brand wordmark */}
        <button
          onClick={() => handleNav('beranda')}
          className="flex items-center gap-2.5 text-left text-lg sm:text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg p-1"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform duration-200">
            <Zap className="w-4 h-4 fill-amber-400" />
          </div>
          <span className="font-display">
            DeLiang<span className="text-amber-400 font-extrabold">Terra</span>
          </span>
        </button>

        {/* Zone 2: Clean single-line navigation links */}
        <div className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNav('beranda')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'beranda'
                ? 'text-amber-400 font-bold'
                : 'text-slate-300 hover:text-yellow-100'
            }`}
          >
            Beranda
            {activeTab === 'beranda' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNav('pengetahuan')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'pengetahuan'
                ? 'text-amber-400 font-bold'
                : 'text-slate-300 hover:text-yellow-100'
            }`}
          >
            Pengetahuan & Lab
            {activeTab === 'pengetahuan' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNav('info')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'info'
                ? 'text-amber-400 font-bold'
                : 'text-slate-300 hover:text-yellow-100'
            }`}
          >
            Info & Bauran EBT
            {activeTab === 'info' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNav('sharing')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'sharing'
                ? 'text-amber-400 font-bold'
                : 'text-slate-300 hover:text-yellow-100'
            }`}
          >
            Ruang Berbagi
            {activeTab === 'sharing' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNav('game')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'game'
                ? 'text-amber-400 font-bold'
                : 'text-slate-300 hover:text-yellow-100'
            }`}
          >
            Game Edukasi
            {activeTab === 'game' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          {/* Bantu AI Menu Item */}
          <button
            onClick={() => handleNav('bantu-ai')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 relative ${
              activeTab === 'bantu-ai'
                ? 'text-amber-400 font-bold'
                : 'text-yellow-300/90 hover:text-amber-300'
            }`}
          >
            <Bot className="w-4 h-4 text-amber-400" />
            <span>Bantu AI</span>
            {activeTab === 'bantu-ai' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNav('feedback')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'feedback'
                ? 'text-amber-400 font-bold'
                : 'text-slate-300 hover:text-yellow-100'
            }`}
          >
            Feedback
            {activeTab === 'feedback' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>
        </div>

        {/* Zone 3: 1 primary action / Auth & Profile & AI trigger */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => handleNav('bantu-ai')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 whitespace-nowrap shrink-0 ${
              activeTab === 'bantu-ai'
                ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                : 'bg-slate-900 hover:bg-slate-850 text-yellow-300 border-amber-400/40 hover:border-amber-400'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Bantu AI</span>
          </button>

          {currentUser ? (
            <button
              onClick={onOpenProfile}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-850 border border-amber-400/50 text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group"
            >
              <div className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 font-extrabold flex items-center justify-center text-[11px]">
                {currentUser.avatarInitials}
              </div>
              <span className="text-slate-200 group-hover:text-amber-300 max-w-[110px] truncate">
                {currentUser.name}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400/60 text-slate-200 hover:text-amber-300 transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-400" />
              <span>Masuk</span>
            </button>
          )}

          <button
            onClick={() => handleNav('game')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 transition-all duration-200 transform hover:scale-[1.02] shadow-sm whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Mulai Bermain</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            onClick={() => handleNav('bantu-ai')}
            className="p-1.5 rounded-lg bg-slate-900 text-amber-400 border border-amber-400/40 text-xs flex items-center gap-1"
            title="Bantu AI"
          >
            <Bot className="w-4 h-4" />
          </button>

          {currentUser ? (
            <button
              onClick={onOpenProfile}
              className="p-1 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs px-2 flex items-center gap-1"
            >
              <User className="w-3.5 h-3.5" />
              <span>{currentUser.avatarInitials}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="p-1.5 rounded-lg bg-slate-900 text-amber-400 border border-slate-800 text-xs flex items-center gap-1"
            >
              <LogIn className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-2">
          <button
            onClick={() => handleNav('beranda')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'beranda' ? 'bg-slate-900 text-amber-400' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => handleNav('pengetahuan')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'pengetahuan' ? 'bg-slate-900 text-amber-400' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            Pengetahuan & Lab Interaktif
          </button>
          <button
            onClick={() => handleNav('info')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'info' ? 'bg-slate-900 text-amber-400' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            Info & Bauran EBT
          </button>
          <button
            onClick={() => handleNav('sharing')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'sharing' ? 'bg-slate-900 text-amber-400' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            Ruang Berbagi (DIY Komunitas)
          </button>
          <button
            onClick={() => handleNav('game')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'game' ? 'bg-slate-900 text-amber-400' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            Game Edukasi (Grid Master & Kuis)
          </button>
          
          {/* Mobile Bantu AI Button */}
          <button
            onClick={() => handleNav('bantu-ai')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 ${
              activeTab === 'bantu-ai' ? 'bg-slate-900 text-amber-400' : 'text-yellow-300 hover:bg-slate-900'
            }`}
          >
            <Bot className="w-4 h-4 text-amber-400" />
            <span>Bantu AI (Asisten Sains EBT)</span>
          </button>

          <button
            onClick={() => handleNav('feedback')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'feedback' ? 'bg-slate-900 text-amber-400' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            Feedback & Saran
          </button>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            {currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProfile();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 border border-amber-400/40 text-amber-300"
              >
                <User className="w-4 h-4" />
                <span>Lihat Profil ({currentUser.name})</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-700 text-slate-200"
              >
                <LogIn className="w-4 h-4 text-amber-400" />
                <span>Masuk ke Akun Anda</span>
              </button>
            )}

            <button
              onClick={() => handleNav('game')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Mainkan Simulator Grid Master</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
