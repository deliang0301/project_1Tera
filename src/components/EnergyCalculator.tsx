import React, { useState } from 'react';
import { Calculator, Zap, TreePine, DollarSign, CloudRain } from 'lucide-react';

export const EnergyCalculator: React.FC = () => {
  const [monthlyBill, setMonthlyBill] = useState<number>(750000); // Rp
  const [selectedTech, setSelectedTech] = useState<'standard' | 'perovskite'>('perovskite');
  const [hasBattery, setHasBattery] = useState<boolean>(true);

  // Tarif PLN R1 Non-subsidi approx Rp 1.444,70 / kWh
  const tariffPerKwh = 1445;
  const monthlyKwh = Math.round(monthlyBill / tariffPerKwh);
  const annualKwh = monthlyKwh * 12;

  // If battery included, self-consumption is 90%, otherwise 60%
  const selfConsumptionRate = hasBattery ? 0.90 : 0.60;

  // Output calculations
  const annualSavingsRp = Math.round(monthlyBill * 12 * selfConsumptionRate);
  // Grid emission factor Indonesia approx 0.85 kg CO2 / kWh
  const annualCo2AvoidedKg = Math.round(annualKwh * selfConsumptionRate * 0.85);
  // 1 mature tree absorbs ~22 kg CO2 per year
  const equivalentTrees = Math.max(1, Math.round(annualCo2AvoidedKg / 22));
  // Roof area required
  const targetKwp = (monthlyKwh / (30 * 3.8)); // 3.8 Peak Sun Hours
  const roofAreaM2 = Math.round((targetKwp * (selectedTech === 'perovskite' ? 5.8 : 8.9)) * 10) / 10;
  
  // Payback period
  const estimatedCapex = Math.round(targetKwp * (selectedTech === 'perovskite' ? 12000000 : 14000000) + (hasBattery ? 12000000 : 0));
  const paybackYears = Math.round((estimatedCapex / Math.max(1, annualSavingsRp)) * 10) / 10;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <Calculator className="w-4 h-4" />
              <span>Simulasi Mandiri</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Kalkulator Jejak & Potensi EBT Mikro
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Hitung seberapa banyak biaya listrik rumah tangga Anda terpangkas dan dampak langsung penurunan emisi karbon bila mengadopsi teknologi terbarukan generasi baru.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2 text-xs text-slate-400 bg-slate-950 p-2 rounded-xl border border-slate-800">
            <span>Standar Tarif Listrik:</span>
            <span className="font-mono text-amber-400 font-bold">Rp 1.445 / kWh</span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Monthly bill input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200">
                  Tagihan Listrik Bulanan Anda:
                </label>
                <span className="text-sm font-mono font-bold text-amber-400 tabular-nums">
                  Rp {monthlyBill.toLocaleString('id-ID')}
                </span>
              </div>
              <input
                type="range"
                min="200000"
                max="5000000"
                step="50000"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full accent-amber-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span>Rp 200rb (R-1 900VA)</span>
                <span>Rp 2.5jt (2200-3500VA)</span>
                <span>Rp 5jt+</span>
              </div>
              <p className="text-xs text-slate-400 mt-1.5">
                Konsumsi rata-rata rumah tangga Anda: <span className="font-mono text-slate-200">{monthlyKwh} kWh / bulan</span>
              </p>
            </div>

            {/* Solar Tech Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Pilihan Teknologi Fotovoltaik:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedTech('standard')}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    selectedTech === 'standard'
                      ? 'bg-slate-800 border-amber-400 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold text-white">Panel Silikon Standar</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Efisiensi ~20%</div>
                  <div className="text-[10px] text-amber-400/90 mt-1">Butuh atap lebih luas</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTech('perovskite')}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    selectedTech === 'perovskite'
                      ? 'bg-slate-800 border-amber-400 text-white shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>Perovskit Tandem</span>
                    <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded font-mono font-bold">33.9%</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Spektrum Biru + IR</div>
                  <div className="text-[10px] text-amber-400 mt-1">Hemat 40% area atap</div>
                </button>
              </div>
            </div>

            {/* Battery option toggle */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">Integrasi Baterai Sodium-Ion</div>
                <div className="text-xs text-slate-400">Menyimpan surplus siang untuk pemakaian AC malam hari</div>
              </div>
              <button
                type="button"
                onClick={() => setHasBattery(!hasBattery)}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  hasBattery ? 'bg-amber-400' : 'bg-slate-800'
                }`}
                aria-label="Toggle battery storage"
              >
                <div
                  className={`w-5 h-5 rounded-full bg-slate-950 transition-transform ${
                    hasBattery ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7 bg-slate-950/90 border border-slate-800 rounded-xl p-6 sm:p-7 space-y-6">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>ESTIMASI DAMPAK EKONOMI & LINGKUNGAN</span>
              <span className="font-mono text-amber-400">Proyeksi 12 Bulan</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Savings Card */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  <span>Potensi Hemat per Tahun</span>
                </div>
                <div className="text-2xl font-mono font-extrabold text-amber-400 mt-2 tabular-nums">
                  Rp {annualSavingsRp.toLocaleString('id-ID')}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Memangkas hingga <span className="text-slate-200 font-semibold">{Math.round(selfConsumptionRate * 100)}%</span> tagihan listrik PLN Anda.
                </div>
              </div>

              {/* Carbon Reduction */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <CloudRain className="w-4 h-4 text-cyan-400" />
                  <span>Reduksi Karbon CO2</span>
                </div>
                <div className="text-2xl font-mono font-extrabold text-cyan-400 mt-2 tabular-nums">
                  {annualCo2AvoidedKg.toLocaleString('id-ID')} kg
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Emisi gas rumah kaca yang dicegah masuk ke atmosfer.
                </div>
              </div>

              {/* Equivalent Trees */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <TreePine className="w-4 h-4 text-yellow-400" />
                  <span>Dampak Setara Hutan</span>
                </div>
                <div className="text-2xl font-mono font-extrabold text-yellow-400 mt-2 tabular-nums">
                  {equivalentTrees} Pohon
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Setara kemampuan serap pohon trembesi dewasa selama 1 tahun.
                </div>
              </div>

              {/* Roof Area Needed */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Kebutuhan Luas Atap</span>
                </div>
                <div className="text-2xl font-mono font-extrabold text-amber-400 mt-2 tabular-nums">
                  {roofAreaM2} m²
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Kapasitas sistem: <span className="font-mono text-slate-200 font-bold">{Math.round(targetKwp * 10) / 10} kWp</span>
                </div>
              </div>
            </div>

            {/* Payback period notice */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-semibold text-white">Estimasi Periode Balik Modal (BEP):</span>{' '}
                <span className="text-slate-300 font-mono">Sekitar {paybackYears} Tahun</span>
              </div>
              <div className="text-slate-400">
                Garansi masa pakai modul: <span className="text-amber-400 font-semibold">25 Tahun</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
