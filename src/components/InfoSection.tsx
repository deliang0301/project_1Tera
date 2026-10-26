import React, { useState } from 'react';
import { TIMELINE_BREAKTHROUGHS, ENERGY_MIX_DATA, UPCOMING_EVENTS } from '../data/energyData';
import { BarChart3, Calendar, Bell, Check, TrendingUp, Globe2, Compass } from 'lucide-react';

export const InfoSection: React.FC = () => {
  const [selectedMixView, setSelectedMixView] = useState<'current' | 'target2030' | 'global'>('target2030');
  const [remindedEvents, setRemindedEvents] = useState<Record<string, boolean>>({});

  const handleToggleReminder = (eventTitle: string) => {
    setRemindedEvents(prev => ({
      ...prev,
      [eventTitle]: !prev[eventTitle]
    }));
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="text-xs text-amber-400 font-mono tracking-wider uppercase mb-2">
          DATA, STATISTIK & AGENDA
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Info Terkini & Bauran Energi
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
          Pantau peta jalan transisi energi Indonesia menuju Net Zero Emission 2060, komparasi data global, dan agenda webinar bersama DeLiangTerra.
        </p>
      </div>

      {/* Part 1: Interactive Energy Mix Comparison */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <BarChart3 className="w-4 h-4" />
              <span>Transisi Bauran Energi Nasional</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Komparasi Bauran Energi: Indonesia vs Dunia
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Berdasarkan Rencana Umum Energi Nasional (RUEN) Dewan Energi Nasional & data benchmark International Energy Agency (IEA).
            </p>
          </div>

          {/* Segmented View Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl self-start lg:self-auto">
            <button
              onClick={() => setSelectedMixView('current')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedMixView === 'current'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Indonesia Saat Ini
            </button>
            <button
              onClick={() => setSelectedMixView('target2030')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedMixView === 'target2030'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Target 2030 (23% EBT)
            </button>
            <button
              onClick={() => setSelectedMixView('global')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedMixView === 'global'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Rata-rata Global (IEA)
            </button>
          </div>
        </div>

        {/* Visual Bar Breakdown */}
        <div className="mt-8 space-y-5">
          {ENERGY_MIX_DATA.map((item, index) => {
            const activeValue = selectedMixView === 'current'
              ? item.indonesiaCurrent
              : selectedMixView === 'target2030'
              ? item.indonesiaTarget2030
              : item.globalAverage;

            return (
              <div key={index} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-sm shrink-0" 
                      style={{ backgroundColor: item.color }} 
                    />
                    <span className="font-semibold text-white">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      {selectedMixView === 'target2030' ? `Kenaikan ${(item.indonesiaTarget2030 - item.indonesiaCurrent).toFixed(1)}%` : ''}
                    </span>
                    <span className="font-mono font-bold text-white tabular-nums w-14 text-right">
                      {activeValue.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Progress bar line */}
                <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800/80">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${Math.min(100, Math.max(2, activeValue))}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Insights Footer Box */}
        <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/70">
            <span className="font-bold text-amber-400 block mb-1 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              Potensi Surya & Geotermal
            </span>
            <p className="text-slate-400 leading-normal">
              Indonesia memiliki lebih dari 3.200 GW potensi energi terbarukan tropis, dengan 40% cadangan panas bumi dunia.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/70">
            <span className="font-bold text-cyan-400 block mb-1 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              Fase Early Retirement PLTU
            </span>
            <p className="text-slate-400 leading-normal">
              Skema JETP dan Energy Transition Mechanism (ETM) secara bertahap memensiunkan pembangkit fosil sebelum 2040.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/70">
            <span className="font-bold text-yellow-300 block mb-1 flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5" />
              Komitmen Net Zero 2060
            </span>
            <p className="text-slate-400 leading-normal">
              Dekarbonisasi penuh sistem kelistrikan dengan interkoneksi super-grid antarpulau Sumatera, Jawa, Kalimantan, & Bali.
            </p>
          </div>
        </div>
      </div>

      {/* Part 2: Timeline Penemuan EBT 2024 - 2030 */}
      <div className="space-y-8">
        <div>
          <div className="text-xs text-amber-400 font-mono tracking-wider uppercase mb-1">
            ROADMAP INOVASI GLOBAL
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Timeline Terobosan Sains & Teknologi (2024 - 2030)
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Dari laboratorium riset hingga pabrik skala gigawatt: berikut tonggak sejarah yang sedang dan akan membentuk ekosistem energi bersih.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TIMELINE_BREAKTHROUGHS.map((event, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono font-bold text-amber-400 text-sm">
                    {event.year} {event.quarter ? `· ${event.quarter}` : ''}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {event.category}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white mb-2 leading-snug">
                  {event.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800/80">
                <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wide mb-1">
                  Dampak Nyata:
                </div>
                <div className="text-xs text-amber-300/90 leading-relaxed">
                  {event.impact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 3: Upcoming Events & Webinars */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <Calendar className="w-4 h-4" />
              <span>Agenda & Webinar EBT</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Kalender Kolaborasi & Edukasi
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Ikuti diskusi terbuka bersama praktisi, akademisi, dan inovator iklim nasional.
            </p>
          </div>
        </div>

        <div className="mt-6 divide-y divide-slate-800">
          {UPCOMING_EVENTS.map((item, index) => {
            const isReminded = !!remindedEvents[item.title];
            return (
              <div key={index} className="py-5 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-amber-400 font-bold">{item.date}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-slate-400">{item.location}</span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => handleToggleReminder(item.title)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      isReminded
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                        : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700'
                    }`}
                  >
                    {isReminded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-amber-400" />
                        <span>Pengingat Disimpan</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-3.5 h-3.5 text-amber-400" />
                        <span>Pasang Pengingat</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
