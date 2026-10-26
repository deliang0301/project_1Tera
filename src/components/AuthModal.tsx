import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, Lock, Mail, User, Shield, Sparkles, Zap, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Mahasiswa / Pelajar');

  if (!isOpen) return null;

  const handleQuickDemoLogin = () => {
    const demoUser: UserProfile = {
      id: 'user_demo_1',
      name: 'Salman Al-Farisi',
      email: 'salman.ebt@deliangterra.id',
      role: 'Inovator Energi Terbarukan',
      avatarInitials: 'SA',
      bio: 'Peminat teknologi sel surya tandem dan baterai sodium-ion untuk elektrifikasi Nusantara.',
      joinedDate: 'Oktober 2026',
      completedModules: ['perovskite-solar', 'floating-offshore-wind', 'green-hydrogen'],
      bestGridScore: 92,
      carbonQuizScore: 8,
      hasCertificate: true,
      certificateDate: '21 Okt 2026',
      diyProjectsCount: 2,
      badges: [
        {
          id: 'b1',
          name: 'Pionir Surya DeLiang',
          description: 'Mempelajari teknologi tandem perovskit',
          unlockedAt: '21 Okt 2026'
        },
        {
          id: 'b2',
          name: 'Grid Master 50Hz',
          description: 'Menjaga kestabilan jaringan kota tanpa pemadaman',
          unlockedAt: '21 Okt 2026'
        },
        {
          id: 'b3',
          name: 'Detektif Karbon Bersertifikat',
          description: 'Meraih skor sempurna dalam kuis sains',
          unlockedAt: '21 Okt 2026'
        }
      ]
    };
    onLogin(demoUser);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    const displayName = isRegister && name.trim() ? name.trim() : email.split('@')[0];
    const initials = displayName
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const newUser: UserProfile = {
      id: `user_${Date.now()}`,
      name: displayName,
      email: email.trim(),
      role: role,
      avatarInitials: initials || 'DL',
      bio: 'Semangat belajar sains energi baru & terbarukan bersama DeLiangTerra.',
      joinedDate: 'Oktober 2026',
      completedModules: ['perovskite-solar'],
      bestGridScore: 80,
      carbonQuizScore: 6,
      hasCertificate: false,
      diyProjectsCount: 0,
      badges: [
        {
          id: 'b_welcome',
          name: 'Pionir DeLiangTerra',
          description: 'Bergabung dalam inisiatif energi bersih masa depan',
          unlockedAt: 'Hari ini'
        }
      ]
    };

    onLogin(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center pb-6 border-b border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mx-auto mb-3">
            <Zap className="w-6 h-6 fill-amber-400" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">
            {isRegister ? 'Daftar Akun DeLiangTerra' : 'Masuk ke DeLiangTerra'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Simpan rekor simulator Grid Master, peroleh sertifikat resmi, dan bagikan karya DIY.
          </p>
        </div>

        {/* Quick Demo Login Option */}
        <div className="pt-4 pb-2">
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/40 text-amber-300 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Masuk Cepat Demo (1-Klik)</span>
          </button>
          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <span className="relative bg-slate-900 px-3 text-[11px] text-slate-400 font-mono">
              atau gunakan formulir
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Nama Lengkap:</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required={isRegister}
                  placeholder="Contoh: Salman Al-Farisi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Alamat Email:</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Kata Sandi:</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-10 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Peran / Minat Utama:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Mahasiswa / Pelajar">Mahasiswa / Pelajar</option>
                <option value="Inovator & Peneliti EBT">Inovator & Peneliti EBT</option>
                <option value="Guru / Dosen Akademisi">Guru / Dosen Akademisi</option>
                <option value="Pegiat Lingkungan & DIY">Pegiat Lingkungan & DIY</option>
                <option value="Masyarakat Umum">Masyarakat Umum</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-colors shadow-sm"
          >
            {isRegister ? 'Buat Akun DeLiangTerra' : 'Masuk ke Dashboard'}
          </button>
        </form>

        {/* Toggle between Login and Register */}
        <div className="pt-4 text-center text-xs text-slate-400 border-t border-slate-800/80 mt-5">
          {isRegister ? (
            <span>
              Sudah punya akun?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="text-amber-400 hover:text-amber-300 font-semibold"
              >
                Masuk di sini
              </button>
            </span>
          ) : (
            <span>
              Belum memiliki akun?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-amber-400 hover:text-amber-300 font-semibold"
              >
                Daftar sekarang
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
