import React, { useState, useEffect } from 'react';
import { CARBON_QUIZ_QUESTIONS } from '../data/energyData';
import { UserProfile } from '../types';
import { 
  Gamepad2, Award, Zap, Sun, Wind, Battery, Droplets, CheckCircle, 
  XCircle, RotateCcw, ArrowRight, ShieldCheck, Trophy, Sparkles, AlertTriangle
} from 'lucide-react';

interface EducationalGamesProps {
  currentUser?: UserProfile | null;
  onRecordScore?: (gridScore: number, quizScore: number) => void;
}

export const EducationalGames: React.FC<EducationalGamesProps> = ({
  currentUser,
  onRecordScore
}) => {
  const [activeGame, setActiveGame] = useState<'grid-master' | 'carbon-quiz'>('grid-master');

  // ================= GRID MASTER STATE =================
  const [dayPhase, setDayPhase] = useState<number>(0);
  const phases = [
    {
      name: 'Fase 1: Pagi Menjelang Siang (08:00)',
      demandMw: 1100,
      sunCondition: 'Matahari mulai naik cerah (Intensitas 65%)',
      solarBaseMw: 600,
      windCondition: 'Hembusan angin pesisir sedang (10 m/s)',
      windCapacityMw: 700,
      description: 'Pabrik dan perkantoran mulai beroperasi. Beban listrik kota merangkak naik ke 1.100 MW.'
    },
    {
      name: 'Fase 2: Siang Terik Panas (13:00)',
      demandMw: 1600,
      sunCondition: 'Matahari terik puncak (Intensitas 100%)',
      solarBaseMw: 1100,
      windCondition: 'Angin laut lepas berhembus stabil (12 m/s)',
      windCapacityMw: 800,
      description: 'Puncak pemakaian pendingin ruangan (AC). Manfaatkan sel surya tandem untuk memenuhi permintaan dan simpan kelebihannya!'
    },
    {
      name: 'Fase 3: Senja Beban Puncak (18:30)',
      demandMw: 1850,
      sunCondition: 'Matahari terbenam (Intensitas 5%)',
      solarBaseMw: 50,
      windCondition: 'Angin laut kencang mulai berhembus (16 m/s)',
      windCapacityMw: 900,
      description: 'Matahari menghilang namun konsumsi kota mencapai titik tertinggi saat warga pulang menyalakan lampu dan memasak. Butuh bantuan baterai & peaker hidrogen!'
    },
    {
      name: 'Fase 4: Larut Malam Tenang (01:00)',
      demandMw: 750,
      sunCondition: 'Gelap malam (0%)',
      solarBaseMw: 0,
      windCondition: 'Angin laut dalam 24 jam berhembus kencang (18 m/s)',
      windCapacityMw: 950,
      description: 'Sebagian besar warga tidur. Angin lepas pantai melimpah; gunakan untuk mengisi ulang cadangan baterai sodium!'
    }
  ];

  const currentPhase = phases[dayPhase];

  // User dispatch controls for current phase
  const [windSliderPct, setWindSliderPct] = useState<number>(75);
  const [batteryMode, setBatteryMode] = useState<'charge' | 'standby' | 'discharge'>('standby');
  const [batteryDischargeMw, setBatteryDischargeMw] = useState<number>(400);
  const [hydrogenPeakerMw, setHydrogenPeakerMw] = useState<number>(100);

  // Results & Game Score
  const [gridScore, setGridScore] = useState<number>(0);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [phaseHistory, setPhaseHistory] = useState<Array<{
    phaseName: string;
    supplyMw: number;
    demandMw: number;
    deviation: number;
    frequencyHz: number;
    passed: boolean;
  }>>([]);

  // Calculate live power for current phase
  const windPower = Math.round((windSliderPct / 100) * currentPhase.windCapacityMw);
  const batteryPower = batteryMode === 'discharge' ? batteryDischargeMw : batteryMode === 'charge' ? -250 : 0;
  const totalCleanSupply = currentPhase.solarBaseMw + windPower + batteryPower + hydrogenPeakerMw;
  const netDifference = totalCleanSupply - currentPhase.demandMw;
  const deviationPct = Math.abs(netDifference / currentPhase.demandMw) * 100;
  const frequencyHz = (50.00 + (netDifference / currentPhase.demandMw) * 1.5).toFixed(2);
  
  const isGridBalanced = deviationPct <= 7.0;
  const isBlackoutRisk = netDifference < -currentPhase.demandMw * 0.15;

  const handleNextPhase = () => {
    const passed = isGridBalanced;
    const earnedPoints = passed ? 25 : Math.max(5, Math.round(25 - deviationPct));

    const newRecord = {
      phaseName: currentPhase.name,
      supplyMw: totalCleanSupply,
      demandMw: currentPhase.demandMw,
      deviation: Math.round(deviationPct * 10) / 10,
      frequencyHz: Number(frequencyHz),
      passed
    };

    const updatedScore = gridScore + earnedPoints;
    setPhaseHistory(prev => [...prev, newRecord]);
    setGridScore(updatedScore);

    if (dayPhase < phases.length - 1) {
      setDayPhase(dayPhase + 1);
      setWindSliderPct(70);
      setBatteryMode('standby');
      setHydrogenPeakerMw(0);
    } else {
      setGameCompleted(true);
      if (onRecordScore) onRecordScore(updatedScore, quizScore);
    }
  };

  const handleResetGridMaster = () => {
    setDayPhase(0);
    setGridScore(0);
    setGameCompleted(false);
    setPhaseHistory([]);
    setWindSliderPct(75);
    setBatteryMode('standby');
    setBatteryDischargeMw(400);
    setHydrogenPeakerMw(100);
  };

  // ================= CARBON DETECTIVE QUIZ STATE =================
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [candidateName, setCandidateName] = useState<string>(currentUser?.name || '');

  useEffect(() => {
    if (currentUser?.name && !candidateName) {
      setCandidateName(currentUser.name);
    }
  }, [currentUser]);

  const currentQ = CARBON_QUIZ_QUESTIONS[currentQuizIdx];

  const handleSelectQuizOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitQuizAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    if (currentQuizIdx < CARBON_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIdx(currentQuizIdx + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      if (onRecordScore) onRecordScore(gridScore, quizScore + (selectedOption === currentQ.correctIndex ? 1 : 0));
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="text-xs text-amber-400 font-mono tracking-wider uppercase mb-2">
          GAMIFIKASI & ASESMEN EDUKASI
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Game Interaktif Energi Bersih
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
          Uji keterampilan taktis Anda sebagai operator jaringan listrik masa depan, atau asah pengetahuan sains Anda di Kuis Detektif Karbon DeLiangTerra.
        </p>

        {/* Tab selection */}
        <div className="mt-6 inline-flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveGame('grid-master')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
              activeGame === 'grid-master'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Grid Master: Penyeimbang Kota</span>
          </button>
          <button
            onClick={() => setActiveGame('carbon-quiz')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
              activeGame === 'carbon-quiz'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Kuis Detektif Karbon ({CARBON_QUIZ_QUESTIONS.length} Soal)</span>
          </button>
        </div>
      </div>

      {/* ================= GAME 1: GRID MASTER ================= */}
      {activeGame === 'grid-master' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl">
          {!gameCompleted ? (
            <div className="space-y-8">
              {/* Mission briefing */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
                    <span className="font-bold">MISI KOTA DELIANGTERRA</span>
                    <span aria-hidden="true">·</span>
                    <span>Siklus 24 Jam Mandiri 100% EBT</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    {currentPhase.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                    {currentPhase.description}
                  </p>
                </div>

                {/* Score & Progress */}
                <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800 self-start md:self-auto text-xs">
                  <div>
                    <div className="text-slate-400">Progres Fase:</div>
                    <div className="font-mono font-bold text-white text-sm">
                      {dayPhase + 1} / {phases.length}
                    </div>
                  </div>
                  <div className="h-8 w-px bg-slate-800" />
                  <div>
                    <div className="text-slate-400">Poin Stabilitas:</div>
                    <div className="font-mono font-bold text-amber-400 text-sm tabular-nums">
                      {gridScore} Poin
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid Live Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Demand */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-xs text-slate-400">Beban Konsumsi Kota (Demand):</div>
                  <div className="text-2xl font-mono font-bold text-white mt-1 tabular-nums">
                    {currentPhase.demandMw} MW
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Target pasokan yang harus dipenuhi secara presisi
                  </div>
                </div>

                {/* Clean Supply */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-xs text-slate-400">Total Pasokan EBT Anda (Supply):</div>
                  <div className={`text-2xl font-mono font-bold mt-1 tabular-nums ${
                    isGridBalanced ? 'text-amber-400' : isBlackoutRisk ? 'text-red-400' : 'text-yellow-300'
                  }`}>
                    {totalCleanSupply} MW
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono">
                    Deviasi: {netDifference > 0 ? `+${netDifference}` : netDifference} MW ({deviationPct.toFixed(1)}%)
                  </div>
                </div>

                {/* Frequency & Stability */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-xs text-slate-400">Frekuensi Grid Jaringan:</div>
                  <div className={`text-2xl font-mono font-bold mt-1 tabular-nums ${
                    isGridBalanced ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    {frequencyHz} Hz
                  </div>
                  <div className="text-[11px] font-semibold mt-1">
                    {isGridBalanced ? (
                      <span className="text-amber-400 flex items-center gap-1 font-bold">
                        <CheckCircle className="w-3 h-3" /> Grid Seimbang & Stabil 50 Hz
                      </span>
                    ) : isBlackoutRisk ? (
                      <span className="text-red-400 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Bahaya Pemadaman (Defisit Daya)
                      </span>
                    ) : (
                      <span className="text-yellow-300 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Peringatan Overload (Kelebihan Daya)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Operator Controls Deck */}
              <div className="space-y-6 pt-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Panel Pengendali Dispatch Energi Terbarukan:
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Solar Status */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-400 flex items-center gap-1.5">
                        <Sun className="w-4 h-4" />
                        Sel Surya Perovskit Tandem
                      </span>
                      <span className="font-mono text-white font-bold tabular-nums">+{currentPhase.solarBaseMw} MW</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Kondisi alam: {currentPhase.sunCondition}. Panel bekerja otomatis menyerap foton.
                    </p>
                  </div>

                  {/* Wind Dispatch */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                        <Wind className="w-4 h-4" />
                        Turbin Angin Terapung Laut
                      </span>
                      <span className="font-mono text-cyan-300 font-bold tabular-nums">+{windPower} MW</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={windSliderPct}
                        onChange={(e) => setWindSliderPct(Number(e.target.value))}
                        className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      />
                      <span className="text-xs font-mono text-slate-300 w-10 text-right tabular-nums">{windSliderPct}%</span>
                    </div>
                  </div>

                  {/* Battery Dispatch */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-yellow-400 flex items-center gap-1.5">
                        <Battery className="w-4 h-4" />
                        Baterai Sodium-Ion & Solid-State
                      </span>
                      <span className="font-mono text-yellow-300 font-bold tabular-nums">
                        {batteryPower > 0 ? `+${batteryPower}` : batteryPower < 0 ? batteryPower : '0'} MW
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setBatteryMode('charge')}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                          batteryMode === 'charge'
                            ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        Isi Daya (-250 MW)
                      </button>
                      <button
                        type="button"
                        onClick={() => setBatteryMode('standby')}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                          batteryMode === 'standby'
                            ? 'bg-slate-800 text-white border-slate-600'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        Standby (0 MW)
                      </button>
                      <button
                        type="button"
                        onClick={() => setBatteryMode('discharge')}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                          batteryMode === 'discharge'
                            ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        Lepas (+{batteryDischargeMw} MW)
                      </button>
                    </div>
                  </div>

                  {/* Clean Hydrogen Peaker Plant */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-400 flex items-center gap-1.5">
                        <Droplets className="w-4 h-4" />
                        Pembangkit Peaker Hidrogen Bersih
                      </span>
                      <span className="font-mono text-amber-300 font-bold tabular-nums">+{hydrogenPeakerMw} MW</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="800"
                        step="50"
                        value={hydrogenPeakerMw}
                        onChange={(e) => setHydrogenPeakerMw(Number(e.target.value))}
                        className="w-full accent-amber-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      />
                      <span className="text-xs font-mono text-slate-300 w-14 text-right tabular-nums">{hydrogenPeakerMw} MW</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase Completion Button */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  Toleransi deviasi grid maksimal <span className="font-bold text-slate-200">±7%</span> untuk menjaga kestabilan 50 Hz.
                </div>
                <button
                  onClick={handleNextPhase}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Kunci Aliran & Lanjut ke Fase Berikutnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Game Over / Summary Screen */
            <div className="text-center py-8 space-y-6 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 mx-auto">
                <Trophy className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white">
                  Misi 24 Jam Grid Kota Selesai!
                </h3>
                <p className="text-sm text-slate-300 mt-1">
                  Anda telah mengendalikan jaringan Kota DeLiangTerra melewati 4 siklus cuaca ekstrem dan fluktuasi konsumsi.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-left">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Total Skor Stabilitas Jaringan:</span>
                  <span className="font-mono text-xl font-extrabold text-amber-400 tabular-nums">
                    {gridScore} / 100 Poin
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {phaseHistory.map((rec, i) => (
                    <div key={i} className="flex items-center justify-between text-slate-300">
                      <span>{rec.phaseName.split(':')[0]}</span>
                      <span className="font-mono text-slate-400">
                        {rec.supplyMw} / {rec.demandMw} MW
                      </span>
                      <span className={`font-semibold ${rec.passed ? 'text-amber-400 font-bold' : 'text-yellow-300'}`}>
                        {rec.passed ? 'Stabil (Lolos)' : `Deviasi ${rec.deviation}%`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleResetGridMaster}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-semibold text-xs transition-colors inline-flex items-center gap-2 border border-slate-700"
                >
                  <RotateCcw className="w-4 h-4 text-amber-400" />
                  <span>Mainkan Ulang Grid Master</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= GAME 2: CARBON DETECTIVE QUIZ ================= */}
      {activeGame === 'carbon-quiz' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl">
          {!quizFinished ? (
            <div className="space-y-6">
              {/* Question Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                <span className="font-mono text-amber-400 font-bold uppercase tracking-wider">
                  PERTANYAAN {currentQuizIdx + 1} DARI {CARBON_QUIZ_QUESTIONS.length}
                </span>
                <span className="text-slate-400 font-mono">
                  Skor Sementara: <span className="text-white font-bold">{quizScore}</span>
                </span>
              </div>

              {/* Question Text */}
              <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;

                  let optionStyle = 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      optionStyle = 'bg-amber-400/20 border-amber-400 text-amber-200 font-semibold';
                    } else if (isSelected) {
                      optionStyle = 'bg-red-500/20 border-red-500 text-red-200 font-semibold';
                    } else {
                      optionStyle = 'bg-slate-950/40 border-slate-850 text-slate-500';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-slate-800 border-amber-400 text-white font-semibold';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuizOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm flex items-start gap-3 ${optionStyle}`}
                    >
                      <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center font-mono text-xs shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="leading-normal flex-1">{opt}</span>
                      {isAnswerSubmitted && isCorrect && (
                        <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Fun Fact */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2 text-xs">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Penjelasan Ilmiah:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 text-slate-400 italic">
                    💡 <span className="font-semibold text-slate-300">Tahukah Anda?</span> {currentQ.funFact}
                  </div>
                </div>
              )}

              {/* Submit or Next Question Button */}
              <div className="pt-4 border-t border-slate-800 flex justify-end">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitQuizAnswer}
                    disabled={selectedOption === null}
                    className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-xs transition-colors"
                  >
                    Kunci Jawaban
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuizQuestion}
                    className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2"
                  >
                    <span>{currentQuizIdx < CARBON_QUIZ_QUESTIONS.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Certificate & Completion */
            <div className="text-center py-6 space-y-8 max-w-2xl mx-auto">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs text-amber-400 font-mono">
                  <Award className="w-4 h-4" />
                  <span>KUIS SELESAI</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Lencana Peneliti Energi Bersih
                </h3>
                <p className="text-sm text-slate-300">
                  Skor Anda: <span className="text-amber-400 font-bold font-mono text-lg">{quizScore}</span> dari {CARBON_QUIZ_QUESTIONS.length} pertanyaan terjawab benar!
                </p>
              </div>

              {/* Interactive Certificate Preview Box */}
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border-2 border-amber-400/50 text-left space-y-4 shadow-2xl relative overflow-hidden">
                <div className="text-center pb-4 border-b border-slate-800">
                  <div className="text-[10px] font-mono text-amber-400 tracking-widest uppercase font-bold">
                    SERTIFIKAT DIGITAL KOMPETENSI
                  </div>
                  <div className="text-lg font-bold text-white mt-1">
                    DeLiangTerra Green Energy Ambassador
                  </div>
                </div>

                <div className="space-y-2 text-center py-2">
                  <div className="text-xs text-slate-400">Diberikan secara terhormat kepada:</div>
                  <input
                    type="text"
                    placeholder="Ketik Nama Anda di Sini..."
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="w-full text-center font-display font-extrabold text-xl text-amber-400 bg-transparent border-b border-slate-700 pb-1 focus:outline-none focus:border-amber-400"
                  />
                  <div className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                    Telah berhasil menuntaskan modul literasi sains teknologi energi masa depan: Sel Surya Tandem, Turbin Terapung Lepas Pantai, Hidrogen Hijau, Baterai Sodium, dan AI Smart Grids bersama DeLiangTerra.
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>ID: DLT-{Math.floor(100000 + Math.random() * 900000)}</span>
                  <span>Verifikasi: DeLiangTerra Science Initiative</span>
                </div>
              </div>

              <div>
                <button
                  onClick={handleResetQuiz}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-semibold text-xs transition-colors inline-flex items-center gap-2 border border-slate-700"
                >
                  <RotateCcw className="w-4 h-4 text-amber-400" />
                  <span>Ulangi Kuis</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
