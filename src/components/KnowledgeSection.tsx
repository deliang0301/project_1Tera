import React, { useState } from 'react';
import { ENERGY_TECHNOLOGIES } from '../data/energyData';
import { 
  Sun, Wind, Battery, Droplets, Cpu, Sparkles, CheckCircle2, 
  ArrowRight, Sliders, Info, ShieldCheck, Zap
} from 'lucide-react';

interface KnowledgeSectionProps {
  initialTechId?: string;
  onOpenGame?: () => void;
}

export const KnowledgeSection: React.FC<KnowledgeSectionProps> = ({ 
  initialTechId = 'perovskite-solar',
  onOpenGame 
}) => {
  const [selectedTechId, setSelectedTechId] = useState<string>(initialTechId);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Selected tech object
  const currentTech = ENERGY_TECHNOLOGIES.find(t => t.id === selectedTechId) || ENERGY_TECHNOLOGIES[0];

  // Simulator parameters state
  // Solar simulator
  const [solarIrradiance, setSolarIrradiance] = useState<number>(850); // W/m2
  const [perovskiteThickness, setPerovskiteThickness] = useState<number>(450); // nm
  // Wind simulator
  const [windSpeed, setWindSpeed] = useState<number>(14); // m/s
  const [waveHeight, setWaveHeight] = useState<number>(3.5); // meters
  // Hydrogen simulator
  const [electrolyzerInputMw, setElectrolyzerInputMw] = useState<number>(20); // MW
  // Battery simulator
  const [batteryTemp, setBatteryTemp] = useState<number>(25); // Celsius
  const [chargeRateC, setChargeRateC] = useState<number>(2.5); // C-rate
  // Smart Grid simulator
  const [cloudCoverPct, setCloudCoverPct] = useState<number>(30); // %

  // Filtered list
  const filteredTechs = categoryFilter === 'all'
    ? ENERGY_TECHNOLOGIES
    : ENERGY_TECHNOLOGIES.filter(t => t.category === categoryFilter);

  // Dynamic calculations for the active simulator
  const calculateSolarResults = () => {
    const siliconOutput = (solarIrradiance * 0.20) * (perovskiteThickness / 450);
    const tandemOutput = (solarIrradiance * 0.335) * (perovskiteThickness / 450);
    const efficiencyGainPct = Math.round(((tandemOutput - siliconOutput) / siliconOutput) * 100);
    return {
      siliconW: Math.round(siliconOutput),
      tandemW: Math.round(tandemOutput),
      gain: efficiencyGainPct
    };
  };

  const calculateWindResults = () => {
    const basePower = Math.round(0.5 * 1.225 * Math.PI * Math.pow(110, 2) * Math.pow(windSpeed, 3) / 1000000 * 0.45);
    const waveStabilityIndex = waveHeight > 5 ? 'Terkendali (Damped Ballast)' : 'Optimal Sangat Tenang';
    return {
      powerMw: Math.max(1, basePower),
      status: waveStabilityIndex
    };
  };

  const calculateHydrogenResults = () => {
    const h2KgPerHour = Math.round((electrolyzerInputMw * 1000) / 50);
    const o2KgPerHour = Math.round(h2KgPerHour * 8);
    return {
      h2Output: h2KgPerHour,
      o2Output: o2KgPerHour,
      dieselEquivalentLiters: Math.round(h2KgPerHour * 3.7)
    };
  };

  const calculateBatteryResults = () => {
    const chargeMinutes = Math.round((0.8 / chargeRateC) * 60);
    const healthStatus = batteryTemp > 45 ? 'Stabil (Solid Electrolyte Tahan Panas)' : 'Suhu Nominal Prima';
    return {
      chargeMinutes,
      healthStatus,
      safetyRisk: '0% (Tanpa Risiko Kebakaran Termal)'
    };
  };

  const calculateGridResults = () => {
    const solarLossMw = Math.round(400 * (cloudCoverPct / 100));
    const aiDispatchSpeedMs = 38;
    const gridFrequencyHz = (50.00 + (Math.sin(cloudCoverPct / 10) * 0.02)).toFixed(2);
    return {
      solarLossMw,
      aiDispatchSpeedMs,
      gridFrequencyHz
    };
  };

  const solarRes = calculateSolarResults();
  const windRes = calculateWindResults();
  const h2Res = calculateHydrogenResults();
  const battRes = calculateBatteryResults();
  const gridRes = calculateGridResults();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="text-xs text-amber-400 font-mono tracking-wider uppercase mb-2">
          ENSIKLOPEDIA & SIMULATOR SAINS
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Pengetahuan EBT Masa Depan
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
          Pahami konsep ilmiah, cara kerja mendalam, dan lakukan simulasi parameter langsung dengan analogi kehidupan sehari-hari bersama DeLiangTerra.
        </p>
      </div>

      {/* Interactive Category Filter Tabs (Segmented Controls) */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl max-w-2xl mx-auto">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            categoryFilter === 'all'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Semua Modul (5)
        </button>
        <button
          onClick={() => setCategoryFilter('surya')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            categoryFilter === 'surya'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Matahari & Tandem
        </button>
        <button
          onClick={() => setCategoryFilter('angin')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            categoryFilter === 'angin'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Angin Terapung
        </button>
        <button
          onClick={() => setCategoryFilter('hidrogen')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            categoryFilter === 'hidrogen'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Hidrogen Hijau
        </button>
        <button
          onClick={() => setCategoryFilter('baterai')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            categoryFilter === 'baterai'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Baterai Sodium
        </button>
        <button
          onClick={() => setCategoryFilter('grid')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            categoryFilter === 'grid'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Jaringan AI & VPP
        </button>
      </div>

      {/* Module Selector Thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {filteredTechs.map((tech) => {
          const isSelected = tech.id === selectedTechId;
          return (
            <button
              key={tech.id}
              onClick={() => setSelectedTechId(tech.id)}
              className={`p-3 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800 border-amber-400 text-white shadow-md shadow-amber-400/10'
                  : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                  {tech.categoryLabel}
                </div>
                <div className="font-bold text-white mt-1 line-clamp-1">
                  {tech.title}
                </div>
              </div>
              <div className="mt-2 text-[11px] font-mono text-slate-300">
                {tech.efficiencyText}
              </div>
            </button>
          );
        })}
      </div>

      {/* Two-Zone Sandbox Layout */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Top visual strip with real photograph & title lockup */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden border-b border-slate-800">
          <img
            src={currentTech.image}
            alt={currentTech.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-amber-400 tracking-wider font-mono">
                {currentTech.categoryLabel.toUpperCase()}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {currentTech.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                {currentTech.subtitle}
              </p>
            </div>
            
            <div className="shrink-0 flex items-center gap-3">
              <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-4 py-2 text-right">
                <div className="text-xs text-slate-400">Efisiensi Tercatat</div>
                <div className="text-lg font-bold font-mono text-amber-400 tabular-nums">
                  {currentTech.efficiencyText}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Interactive Workspace */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Zone 1): Conceptual Science & Analogy */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-400" />
                <span>Ringkasan Konsep Sains</span>
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed mt-2">
                {currentTech.concept}
              </p>
            </div>

            {/* Analogy Callout */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 text-sm">
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Analogi Sederhana Sehari-hari</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                "{currentTech.analogy}"
              </p>
            </div>

            {/* Key Advantages */}
            <div>
              <h4 className="text-sm font-bold text-white mb-3">Keunggulan & Inovasi Kunci:</h4>
              <div className="space-y-2.5">
                {currentTech.advantages.map((adv, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{adv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scientific Mechanism note */}
            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Mekanisme Reaksi & Fisika:</span>{' '}
              {currentTech.scientificMechanism}
            </div>

            {/* Real world applications */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Penerapan Dunia Nyata:
              </h4>
              <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                {currentTech.realWorldApplications.map((app, i) => (
                  <div key={i} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                    {app}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Zone 2): Interactive Parameter Sandbox */}
          <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Sandbox Parameter Dinamis
                </span>
              </div>
              <span className="text-[11px] font-mono text-amber-400 font-semibold">Kalkulasi Nyata</span>
            </div>

            {/* Solar Simulator Controls */}
            {currentTech.simulatorType === 'solar' && (
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                    <span>Intensitas Sinar Matahari:</span>
                    <span className="font-mono text-amber-400 font-bold tabular-nums">{solarIrradiance} W/m²</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="1100"
                    step="25"
                    value={solarIrradiance}
                    onChange={(e) => setSolarIrradiance(Number(e.target.value))}
                    className="w-full accent-amber-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>Mendung (300 W/m²)</span>
                    <span>Cerah Tropis (850 W/m²)</span>
                    <span>Puncak (1000+)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                    <span>Ketebalan Lapisan Perovskit:</span>
                    <span className="font-mono text-amber-400 font-bold tabular-nums">{perovskiteThickness} nm</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="800"
                    step="25"
                    value={perovskiteThickness}
                    onChange={(e) => setPerovskiteThickness(Number(e.target.value))}
                    className="w-full accent-amber-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>Ultra-tipis 200nm</span>
                    <span>Optimal 450nm</span>
                    <span>Tebal 800nm</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Hasil Perbandingan Output per m²:
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Panel Silikon Standar:</span>
                    <span className="font-mono text-slate-300 font-bold tabular-nums">{solarRes.siliconW} Watt</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-amber-400 font-semibold">Sel Tandem Perovskit:</span>
                    <span className="font-mono text-amber-400 font-bold tabular-nums">{solarRes.tandemW} Watt</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Peningkatan Hasil Daya:</span>
                    <span className="font-mono text-amber-300 font-bold tabular-nums">+{solarRes.gain}% Ekstra Daya</span>
                  </div>
                </div>
              </div>
            )}

            {/* Wind Simulator Controls */}
            {currentTech.simulatorType === 'wind' && (
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                    <span>Kecepatan Angin Samudra:</span>
                    <span className="font-mono text-cyan-400 font-bold tabular-nums">{windSpeed} m/s ({Math.round(windSpeed * 3.6)} km/jam)</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="28"
                    step="1"
                    value={windSpeed}
                    onChange={(e) => setWindSpeed(Number(e.target.value))}
                    className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                    <span>Ketinggian Ombak Laut Lepas:</span>
                    <span className="font-mono text-slate-200 font-bold tabular-nums">{waveHeight} meter</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={waveHeight}
                    onChange={(e) => setWaveHeight(Number(e.target.value))}
                    className="w-full accent-slate-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Hasil Daya Turbin 15 MW:
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Produksi Listrik Real-Time:</span>
                    <span className="font-mono text-cyan-400 font-bold tabular-nums">{windRes.powerMw} MW</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Stabilitas Platform Apung:</span>
                    <span className="font-mono text-amber-400 font-bold">{windRes.status}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Hydrogen Simulator Controls */}
            {currentTech.simulatorType === 'hydrogen' && (
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                    <span>Input Daya Listrik EBT (Elektroliser PEM):</span>
                    <span className="font-mono text-amber-400 font-bold tabular-nums">{electrolyzerInputMw} MW</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="100"
                    step="2"
                    value={electrolyzerInputMw}
                    onChange={(e) => setElectrolyzerInputMw(Number(e.target.value))}
                    className="w-full accent-amber-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Hasil Pemecahan Molekul H2O per Jam:
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Produksi Hidrogen Murni (H2):</span>
                    <span className="font-mono text-amber-400 font-bold tabular-nums">{h2Res.h2Output} kg / jam</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Produk Samping Oksigen (O2):</span>
                    <span className="font-mono text-cyan-400 font-bold tabular-nums">{h2Res.o2Output} kg / jam</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Substitusi Solar Mesin Kapal:</span>
                    <span className="font-mono text-yellow-300 font-bold tabular-nums">{h2Res.dieselEquivalentLiters} Liter Solar / jam</span>
                  </div>
                </div>
              </div>
            )}

            {/* Battery Simulator Controls */}
            {currentTech.simulatorType === 'battery' && (
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                    <span>Kecepatan Arus Pengisian (C-Rate):</span>
                    <span className="font-mono text-amber-400 font-bold tabular-nums">{chargeRateC}C</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="6"
                    step="0.5"
                    value={chargeRateC}
                    onChange={(e) => setChargeRateC(Number(e.target.value))}
                    className="w-full accent-amber-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                    <span>Suhu Ruang Operasi:</span>
                    <span className="font-mono text-slate-200 font-bold tabular-nums">{batteryTemp} °C</span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="60"
                    step="5"
                    value={batteryTemp}
                    onChange={(e) => setBatteryTemp(Number(e.target.value))}
                    className="w-full accent-slate-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Performa Baterai Elektrolit Padat:
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Waktu Cas 0% s/d 80%:</span>
                    <span className="font-mono text-amber-400 font-bold tabular-nums">{battRes.chargeMinutes} Menit</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Integritas Termal:</span>
                    <span className="font-mono text-yellow-300 font-bold">{battRes.healthStatus}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Tingkat Risiko Ledakan:</span>
                    <span className="font-mono text-amber-300 font-bold">{battRes.safetyRisk}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Smart Grid Controls */}
            {currentTech.simulatorType === 'smartgrid' && (
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                    <span>Tutupan Awan Mendung Tiba-Tiba:</span>
                    <span className="font-mono text-amber-400 font-bold tabular-nums">{cloudCoverPct}% Tutupan</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    step="5"
                    value={cloudCoverPct}
                    onChange={(e) => setCloudCoverPct(Number(e.target.value))}
                    className="w-full accent-amber-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Respons Orkestrasi Agen AI:
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Defisit Surya Akibat Awan:</span>
                    <span className="font-mono text-amber-400 font-bold tabular-nums">-{gridRes.solarLossMw} MW</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Kecepatan Kompensasi Baterai AI:</span>
                    <span className="font-mono text-amber-300 font-bold tabular-nums">{gridRes.aiDispatchSpeedMs} milidetik</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Stabilitas Frekuensi Grid:</span>
                    <span className="font-mono text-yellow-300 font-bold tabular-nums">{gridRes.gridFrequencyHz} Hz (Normal)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Simulator Action CTA */}
            <div className="pt-2">
              <button
                onClick={onOpenGame}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Uji Keahlian di Game Grid Master</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
