import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, Award, Trophy, Zap, Shield, LogOut, CheckCircle2, Edit3, Save } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onLogout: () => void;
  onNavigateToTab: (tab: any) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  onLogout,
  onNavigateToTab
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);
  const [bio, setBio] = useState(user.bio);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const updated: UserProfile = {
      ...user,
      name: name.trim() || user.name,
      role: role.trim() || user.role,
      bio: bio.trim() || user.bio,
      avatarInitials: initials || user.avatarInitials
    };

    onUpdateUser(updated);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-6 border-b border-slate-800 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center font-display font-extrabold text-2xl text-amber-300 shrink-0 shadow-lg shadow-amber-400/10">
            {user.avatarInitials}
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-xl font-bold text-white font-display">
                {user.name}
              </h3>
              <span className="text-[11px] font-mono text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-full font-semibold">
                {user.role}
              </span>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              {user.email} <span className="text-slate-600">·</span> Bergabung {user.joinedDate}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              {user.bio}
            </p>
          </div>

          <div className="shrink-0 pt-2 sm:pt-0">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs flex items-center gap-1.5 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>{isEditing ? 'Batal' : 'Edit Profil'}</span>
            </button>
          </div>
        </div>

        {/* Edit Form Section */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="py-4 border-b border-slate-800 space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Nama Tampilan:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Profesi / Peran:</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Bio Singkat:</label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold flex items-center gap-1.5 text-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </form>
        )}

        {/* Stats Grid */}
        <div className="py-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[11px] text-slate-400">Modul Sains</div>
            <div className="text-xl font-bold font-mono text-amber-400 mt-1 tabular-nums">
              {user.completedModules.length} / 5
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Tuntas Dipelajari</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[11px] text-slate-400">Skor Grid Master</div>
            <div className="text-xl font-bold font-mono text-white mt-1 tabular-nums">
              {user.bestGridScore} Poin
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Stabilitas 50 Hz</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[11px] text-slate-400">Kuis Detektif</div>
            <div className="text-xl font-bold font-mono text-white mt-1 tabular-nums">
              {user.carbonQuizScore} / 8
            </div>
            <div className="text-[10px] text-cyan-400 mt-0.5">
              {user.hasCertificate ? 'Bersertifikat' : 'Siap Diuji'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[11px] text-slate-400">Proyek DIY</div>
            <div className="text-xl font-bold font-mono text-amber-400 mt-1 tabular-nums">
              {user.diyProjectsCount}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Karya Dibagikan</div>
          </div>
        </div>

        {/* Badges & Achievements */}
        <div className="space-y-3 pb-6 border-b border-slate-800">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Lencana Prestasi DeLiangTerra:</span>
            <span className="font-mono text-amber-400">{user.badges.length} Diraih</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {user.badges.map((badge) => (
              <div
                key={badge.id}
                className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{badge.name}</div>
                  <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
                    {badge.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-300 border border-slate-700 hover:border-red-500/40 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Akun (Logout)</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onNavigateToTab('game');
              }}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors"
            >
              Mainkan Grid Master
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
