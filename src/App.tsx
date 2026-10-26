/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavTab, UserProfile } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EnergyCalculator } from './components/EnergyCalculator';
import { KnowledgeSection } from './components/KnowledgeSection';
import { InfoSection } from './components/InfoSection';
import { CommunitySection } from './components/CommunitySection';
import { EducationalGames } from './components/EducationalGames';
import { FeedbackSection } from './components/FeedbackSection';
import { AiAssistant } from './components/AiAssistant';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';
import { ArrowRight, Sparkles, Gamepad2, Users, Bot, MessageSquare } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('beranda');
  const [focusedTechId, setFocusedTechId] = useState<string>('perovskite-solar');

  // Auth & Profile State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('deliangterra_current_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Persist user
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('deliangterra_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('deliangterra_current_user');
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInspectTech = (techId: string) => {
    setFocusedTechId(techId);
    setActiveTab('pengetahuan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setCurrentUser(updatedUser);
  };

  const handleRecordGameScore = (gridScore: number, quizScore: number) => {
    if (!currentUser) return;

    const isScoreImproved = gridScore > currentUser.bestGridScore || quizScore > currentUser.carbonQuizScore;
    const isNewCertificate = quizScore >= 7 && !currentUser.hasCertificate;

    if (isScoreImproved || isNewCertificate) {
      const updated: UserProfile = {
        ...currentUser,
        bestGridScore: Math.max(currentUser.bestGridScore, gridScore),
        carbonQuizScore: Math.max(currentUser.carbonQuizScore, quizScore),
        hasCertificate: currentUser.hasCertificate || quizScore >= 7,
        certificateDate: currentUser.certificateDate || (quizScore >= 7 ? 'Hari ini' : undefined)
      };

      if (gridScore >= 85 && !currentUser.badges.some(b => b.id === 'b_grid_expert')) {
        updated.badges.push({
          id: 'b_grid_expert',
          name: 'Pakar Frekuensi 50Hz',
          description: 'Berhasil menjaga stabilitas grid di atas 85 poin',
          unlockedAt: 'Hari ini'
        });
      }

      setCurrentUser(updated);
    }
  };

  const handleProjectAdded = () => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        diyProjectsCount: currentUser.diyProjectsCount + 1
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Navigation Bar with Bantu AI */}
      <Navbar 
        activeTab={activeTab} 
        onSelectTab={handleSelectTab}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* ================= VIEW 1: BERANDA (HOME / LANDING) ================= */}
        {activeTab === 'beranda' && (
          <div>
            {/* Interactive Hero with Resource Simulator */}
            <Hero 
              onSelectTab={handleSelectTab}
              onSelectTech={handleInspectTech}
            />

            {/* CURATED TECHNOLOGY HIGHLIGHTS */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <div className="text-xs font-mono text-amber-300 uppercase tracking-wider mb-2 font-semibold">
                  LITERASI TERBARU
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-silver tracking-tight">
                  Teknologi Terbarukan Masa Depan
                </h2>
                <p className="text-slate-300 mt-2 text-sm sm:text-base leading-relaxed">
                  Disajikan dengan visual autentik, analogi ilmiah santai, dan parameter interaktif agar mudah dipahami siapa pun di DeLiangTerra.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Item 1: Perovskite Solar */}
                <div className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-lg">
                  <div>
                    <div className="h-52 bg-slate-800 relative overflow-hidden">
                      <img
                        src="/src/assets/images/perovskite_solar_tandem_1792632426063.jpg"
                        alt="Sel Surya Perovskit-Silikon Tandem"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                      />
                      <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur border border-slate-800 text-amber-300 text-xs px-2.5 py-1 rounded-md font-mono font-semibold">
                        Fotovoltaik Spektrum Ganda
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-yellow-100 mb-2 leading-snug">
                        Perovskit: Kristal Pembangkit Efisiensi 33.9%
                      </h3>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                        Bukan lagi sekadar panel kaca tebal. Kristal perovskit memungkinkan jendela kaca transparan gedung dan kanopi mobil berubah menjadi pembangkit listrik.
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-0">
                    <button
                      onClick={() => handleInspectTech('perovskite-solar')}
                      className="text-xs font-bold text-amber-300 flex items-center gap-1.5 hover:text-yellow-200 transition-colors"
                    >
                      <span>Pelajari Cara Kerjanya & Coba Simulator</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Item 2: Floating Offshore Wind */}
                <div className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-lg">
                  <div>
                    <div className="h-52 bg-slate-800 relative overflow-hidden">
                      <img
                        src="/src/assets/images/floating_wind_ocean_1792632426656.jpg"
                        alt="Turbin Angin Terapung Lepas Pantai"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                      />
                      <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur border border-slate-800 text-cyan-300 text-xs px-2.5 py-1 rounded-md font-mono font-semibold">
                        Energi Samudra Dalam
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-yellow-100 mb-2 leading-snug">
                        Turbin Terapung di Kedalaman Laut Lepas
                      </h3>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                        Mengapa di laut dalam? Karena hembusan angin samudra terbuka tidak pernah berhenti berhembus 24 jam nonstop, bebas hambatan daratan pantai.
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-0">
                    <button
                      onClick={() => handleInspectTech('floating-offshore-wind')}
                      className="text-xs font-bold text-amber-300 flex items-center gap-1.5 hover:text-yellow-200 transition-colors"
                    >
                      <span>Pelajari Cara Kerjanya & Coba Simulator</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Item 3: Green Hydrogen */}
                <div className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-lg">
                  <div>
                    <div className="h-52 bg-slate-800 relative overflow-hidden">
                      <img
                        src="/src/assets/images/green_hydrogen_electrolysis_1792632426987.jpg"
                        alt="Hidrogen Hijau & Power-to-X"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                      />
                      <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur border border-slate-800 text-yellow-300 text-xs px-2.5 py-1 rounded-md font-mono font-semibold">
                        Bahan Bakar Bersih H2
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-yellow-100 mb-2 leading-snug">
                        Hidrogen Hijau: Dekarbonisasi Industri Berat
                      </h3>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                        Memecah molekul air (H2O) dengan listrik EBT. Menjadi bahan bakar nol emisi untuk kapal laut kargo, pabrik baja, dan pesawat masa depan.
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-0">
                    <button
                      onClick={() => handleInspectTech('green-hydrogen')}
                      className="text-xs font-bold text-amber-300 flex items-center gap-1.5 hover:text-yellow-200 transition-colors"
                    >
                      <span>Pelajari Cara Kerjanya & Coba Simulator</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* View all modules CTA */}
              <div className="text-center mt-12">
                <button
                  onClick={() => handleSelectTab('pengetahuan')}
                  className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400 text-xs sm:text-sm font-semibold text-white transition-colors inline-flex items-center gap-2"
                >
                  <span>Buka Semua 5 Modul Sains Lengkap & Simulator Interaktif</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </section>

            {/* Micro-Energy Footprint Calculator Component */}
            <EnergyCalculator />

            {/* BANNER INVITATION: BANTU AI ASSISTANT */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-amber-400/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-300 font-semibold">
                    <Bot className="w-4 h-4 text-amber-400" />
                    <span>FITUR BARU: KONSULTASI SAINS TERBUKA</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-yellow-silver">
                    Punya Pertanyaan Spesifik Seputar Energi Masa Depan?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    Gunakan <strong>Bantu AI DeLiangTerra</strong> yang didukung model Gemini untuk membedah rumus kimia elektrolisis, kalkulasi atap surya, hingga konsultasi mikrokontroler IoT DIY.
                  </p>
                </div>

                <button
                  onClick={() => handleSelectTab('bantu-ai')}
                  className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-amber-400/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Buka Menu Bantu AI</span>
                </button>
              </div>
            </section>

            {/* QUICK PREVIEW: GAME & COMMUNITY */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Game Preview Card */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-300 mb-2 font-bold">
                      <Gamepad2 className="w-4 h-4" />
                      <span>SIMULASI GAMIFIKASI</span>
                    </div>
                    <h3 className="text-2xl font-bold text-yellow-100 mb-2">
                      Mainkan Simulator "Grid Master"
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                      Uji kemampuan Anda menjaga keseimbangan pasokan listrik kota dari hembusan angin laut dan sinar matahari. Cegah pemadaman blackout pada frekuensi 50 Hz!
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={() => handleSelectTab('game')}
                      className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm"
                    >
                      <span>Masuk ke Arena Game Grid Master</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Community Preview Card */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-yellow-300 mb-2 font-bold">
                      <Users className="w-4 h-4" />
                      <span>RUANG BERBAGI MAKER</span>
                    </div>
                    <h3 className="text-2xl font-bold text-yellow-100 mb-2">
                      Eksperimen DIY Mandiri Komunitas
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                      Mulai dari lampu taman tenaga surya bekas, telemetri ESP32, hingga turbin angin mini 3D print. Berbagi skema rangkaian dan berdiskusi bersama pegiat lainnya.
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={() => handleSelectTab('sharing')}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-semibold text-xs sm:text-sm transition-colors border border-slate-700 flex items-center gap-2"
                    >
                      <span>Jelajahi Ruang Berbagi DIY</span>
                      <ArrowRight className="w-4 h-4 text-amber-400" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================= VIEW 2: PENGETAHUAN & LAB ================= */}
        {activeTab === 'pengetahuan' && (
          <KnowledgeSection 
            initialTechId={focusedTechId}
            onOpenGame={() => handleSelectTab('game')}
          />
        )}

        {/* ================= VIEW 3: INFO TERKINI & BAURAN EBT ================= */}
        {activeTab === 'info' && (
          <InfoSection />
        )}

        {/* ================= VIEW 4: RUANG BERBAGI (COMMUNITY DIY) ================= */}
        {activeTab === 'sharing' && (
          <CommunitySection 
            currentUser={currentUser}
            onProjectAdded={handleProjectAdded}
          />
        )}

        {/* ================= VIEW 5: GAME EDUKASI (GRID MASTER & KUIS) ================= */}
        {activeTab === 'game' && (
          <EducationalGames 
            currentUser={currentUser}
            onRecordScore={handleRecordGameScore}
          />
        )}

        {/* ================= VIEW 6: BANTU AI (AI ASSISTANT) ================= */}
        {activeTab === 'bantu-ai' && (
          <AiAssistant 
            currentUser={currentUser}
            onNavigateToTab={handleSelectTab}
          />
        )}

        {/* ================= VIEW 7: FEEDBACK ================= */}
        {activeTab === 'feedback' && (
          <FeedbackSection currentUser={currentUser} />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={handleSelectTab} />

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      {/* Profile Modal */}
      {currentUser && (
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          user={currentUser}
          onUpdateUser={handleUpdateUser}
          onLogout={handleLogout}
          onNavigateToTab={handleSelectTab}
        />
      )}
    </div>
  );
}
