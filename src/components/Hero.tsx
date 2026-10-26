import React, { useState } from 'react';
import { NavTab } from '../types';
import { ArrowRight, Sun, Wind, BatteryCharging, Gauge, Sparkles } from 'lucide-react';

interface HeroProps {
  onSelectTab: (tab: NavTab) => void;
  onSelectTech?: (techId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectTab, onSelectTech }) => {
  // Interactive mini simulation in the hero card
  const [sunlightFactor, setSunlightFactor] = useState(85); // 0 to 100%
  const [windSpeedFactor, setWindSpeedFactor] = useState(70); // 0 to 100%
  const [storageMode, setStorageMode] = useState<'charging' | 'standby' | 'discharging'>('charging');

  // Calculated dynamic MW output
  const solarOutput = Math.round((sunlightFactor / 100) * 1150); // MW
  const windOutput = Math.round((windSpeedFactor / 100) * 1450); // MW
  const storagePower = storageMode === 'discharging' ? 400 : storageMode === 'charging' ? -250 : 0;
  const netCleanPower = solarOutput + windOutput + storagePower;

  return (
    <header className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20 border-b border-slate-850">
      {/* Subtle radial ambient background glow in warm gold */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-400/10 blur-[140px] rounded-full pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Column: Headline & Action */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs text-amber-400 font-medium">
              <span className="font-mono text-amber-400 font-bold">EBT 2026</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Eksplorasi Sains & Teknologi Bersih Masa Depan</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
              Bumi Lebih Dingin,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200">
                Energi Tanpa Batas.
              </span>
            </h1>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Pernah membayangkan panel surya kristal setipis stiker, turbin terapung di laut dalam, atau kota yang ditenagai hidrogen hijau? Pelajari cara sains membuka jalan energi bersih dunia secara interaktif bersama <strong className="text-white font-semibold">DeLiangTerra</strong>.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => onSelectTab('pengetahuan')}
                className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-amber-400/80 text-white font-medium hover:bg-slate-850 transition-all duration-200 flex items-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <span>Jelajahi Teknologi</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={() => onSelectTab('game')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-400/20 hover:opacity-95 transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <Sparkles className="w-4 h-4" />
                <span>Coba Game Grid Master</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <span>Kurasi Sains Global</span>
              <span aria-hidden="true" className="text-slate-700">/</span>
              <span>100% Bebas Emisi</span>
              <span aria-hidden="true" className="text-slate-700">/</span>
              <span>Simulasi Interaktif</span>
            </div>
          </div>

          {/* Right Column: Live Interactive Clean Energy Resource Board */}
          <div className="flex-1 w-full max-w-lg">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl relative backdrop-blur-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs text-slate-400">
                <span className="font-semibold tracking-wide text-slate-300">SIMULASI RESOURCE HARVESTING</span>
                <span className="font-mono text-amber-400 font-bold tabular-nums">Net: {netCleanPower.toLocaleString()} MW</span>
              </div>

              {/* Sliders to let user test interaction right away */}
              <div className="py-4 space-y-4">
                {/* Solar Card */}
                <div 
                  onClick={() => onSelectTech ? onSelectTech('perovskite-solar') : onSelectTab('pengetahuan')}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-amber-400/70 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                        <Sun className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                          Sel Surya Perovskit Tandem
                        </div>
                        <div className="text-xs text-slate-400">Pemanenan spektrum ganda</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono font-bold text-amber-400 tabular-nums">+{solarOutput} MW</div>
                      <div className="text-[11px] text-slate-400 font-mono">Efisiensi 33.9%</div>
                    </div>
                  </div>
                  {/* Sun Slider */}
                  <div className="mt-2 pt-2 border-t border-slate-800/50 flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 shrink-0">Intensitas Surya:</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sunlightFactor}
                      onChange={(e) => setSunlightFactor(Number(e.target.value))}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <span className="text-xs font-mono text-amber-300 w-9 text-right tabular-nums">{sunlightFactor}%</span>
                  </div>
                </div>

                {/* Wind Card */}
                <div 
                  onClick={() => onSelectTech ? onSelectTech('floating-offshore-wind') : onSelectTab('pengetahuan')}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-400/70 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                        <Wind className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                          Turbin Terapung Laut Lepas
                        </div>
                        <div className="text-xs text-slate-400">Angin samudra dalam 24 jam</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono font-bold text-cyan-400 tabular-nums">+{windOutput} MW</div>
                      <div className="text-[11px] text-slate-400 font-mono">Deep Sea 120m</div>
                    </div>
                  </div>
                  {/* Wind Slider */}
                  <div className="mt-2 pt-2 border-t border-slate-800/50 flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 shrink-0">Kecepatan Angin:</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={windSpeedFactor}
                      onChange={(e) => setWindSpeedFactor(Number(e.target.value))}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <span className="text-xs font-mono text-cyan-300 w-9 text-right tabular-nums">{windSpeedFactor}%</span>
                  </div>
                </div>

                {/* Storage & Hydrogen Card */}
                <div 
                  onClick={() => onSelectTech ? onSelectTech('solid-state-sodium-battery') : onSelectTab('pengetahuan')}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-amber-400/70 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400">
                        <BatteryCharging className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white group-hover:text-yellow-300 transition-colors">
                          Baterai Sodium & Sel Hidrogen
                        </div>
                        <div className="text-xs text-slate-400">Penyimpan daya & peaker bersih</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-mono font-bold tabular-nums ${
                        storagePower > 0 ? 'text-amber-400' : storagePower < 0 ? 'text-yellow-300' : 'text-slate-400'
                      }`}>
                        {storagePower > 0 ? `+${storagePower}` : storagePower < 0 ? storagePower : '0'} MW
                      </div>
                      <div className="text-[11px] text-slate-400 capitalize">{storageMode}</div>
                    </div>
                  </div>
                  {/* Storage Mode Toggle Buttons */}
                  <div className="mt-2 pt-2 border-t border-slate-800/50 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">Status Cadangan:</span>
                    <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setStorageMode('charging'); }}
                        className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors ${
                          storageMode === 'charging' ? 'bg-amber-400/20 text-amber-300 font-semibold' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Isi Daya
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setStorageMode('standby'); }}
                        className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors ${
                          storageMode === 'standby' ? 'bg-slate-700 text-slate-200 font-semibold' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Siaga
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setStorageMode('discharging'); }}
                        className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors ${
                          storageMode === 'discharging' ? 'bg-yellow-400/20 text-yellow-300 font-semibold' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Injeksi
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Callout */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-amber-400" />
                  <span>Stabilitas Frekuensi: 50.02 Hz</span>
                </span>
                <button
                  onClick={() => onSelectTab('game')}
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
                >
                  Uji di Grid Master →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Metric Strip below the hero split */}
        <div className="mt-16 pt-8 border-t border-slate-850 grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums tracking-tight">33.9%</div>
            <div className="text-xs font-semibold text-amber-400 mt-1">Efisiensi Sel Surya Tandem</div>
            <p className="text-xs text-slate-400 mt-1 leading-normal">
              Melompat jauh dari batas silikon konvensional yang tertahan di angka 20-22%.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums tracking-tight">&gt; 60 Meter</div>
            <div className="text-xs font-semibold text-cyan-400 mt-1">Kedalaman Laut Terapung</div>
            <p className="text-xs text-slate-400 mt-1 leading-normal">
              Membuka 80% potensi angin samudra dalam dengan hembusan angin 24 jam nonstop.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums tracking-tight">0 Gram</div>
            <div className="text-xs font-semibold text-yellow-400 mt-1">Emisi Karbon Hidrogen</div>
            <p className="text-xs text-slate-400 mt-1 leading-normal">
              Memecah molekul H2O murni, membakar gas hidrogen hanya menghasilkan uap air.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums tracking-tight">10 Menit</div>
            <div className="text-xs font-semibold text-amber-300 mt-1">Cas Baterai Sodium & Solid</div>
            <p className="text-xs text-slate-400 mt-1 leading-normal">
              Elektrolit padat bebas risiko kebakaran termal dan terjangkau dari garam meja.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
