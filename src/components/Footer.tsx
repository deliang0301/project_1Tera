import React from 'react';
import { NavTab } from '../types';
import { Zap } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand & Mission */}
        <div className="space-y-2 max-w-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Zap className="w-4 h-4 fill-amber-400" />
            </div>
            <span className="font-display font-bold text-lg text-white">
              DeLiang<span className="text-amber-400">Terra</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Inisiatif literasi terbuka sains energi baru dan terbarukan (EBT) masa depan untuk generasi inovator iklim Indonesia dan dunia.
          </p>
        </div>

        {/* Clean Text Navigation Links */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
          <button
            onClick={() => onSelectTab('beranda')}
            className="hover:text-amber-400 transition-colors"
          >
            Beranda
          </button>
          <button
            onClick={() => onSelectTab('pengetahuan')}
            className="hover:text-amber-400 transition-colors"
          >
            Pengetahuan & Lab
          </button>
          <button
            onClick={() => onSelectTab('info')}
            className="hover:text-amber-400 transition-colors"
          >
            Info & Bauran EBT
          </button>
          <button
            onClick={() => onSelectTab('sharing')}
            className="hover:text-amber-400 transition-colors"
          >
            Ruang Berbagi
          </button>
          <button
            onClick={() => onSelectTab('game')}
            className="hover:text-amber-400 transition-colors"
          >
            Game Edukasi
          </button>
          <button
            onClick={() => onSelectTab('bantu-ai')}
            className="hover:text-amber-400 text-yellow-300 font-semibold transition-colors"
          >
            Bantu AI
          </button>
          <button
            onClick={() => onSelectTab('feedback')}
            className="hover:text-amber-400 transition-colors"
          >
            Feedback
          </button>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-500 font-mono">
          © 2026 DeLiangTerra. Sains Terbuka untuk Bumi Bersih.
        </div>
      </div>
    </footer>
  );
};
