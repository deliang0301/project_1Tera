import React, { useState, useEffect } from 'react';
import { UserFeedback, UserProfile } from '../types';
import { MessageSquarePlus, Star, ThumbsUp, CheckCircle, Send, Sparkles } from 'lucide-react';

const INITIAL_FEEDBACKS: UserFeedback[] = [
  {
    id: 'f1',
    name: 'Dimas Prasetyo',
    rating: 5,
    category: 'Game & Simulator',
    desiredTopic: 'Fusi Nuklir Bersih (Tokamak)',
    message: 'Simulator Grid Master sangat seru! Menyadarkan betapa krusialnya menjaga stabilitas 50 Hz saat matahari terbenam. Penjelasan analoginya juga sangat ramah pemula.',
    createdAt: 'Kemarin'
  },
  {
    id: 'f2',
    name: 'Anisa Wardani',
    rating: 5,
    category: 'Materi Pengetahuan',
    desiredTopic: 'Biofuel Alga Mikro Laut',
    message: 'Baru paham kalau sel surya perovskit bisa menangkap spektrum cahaya yang berbeda dari silikon biasa. Tampilan tema kuning emas DeLiangTerra sangat futuristik dan nyaman di mata.',
    createdAt: '2 hari lalu'
  }
];

interface FeedbackSectionProps {
  currentUser?: UserProfile | null;
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({ currentUser }) => {
  const [feedbacks, setFeedbacks] = useState<UserFeedback[]>(() => {
    try {
      const saved = localStorage.getItem('deliangterra_feedbacks') || localStorage.getItem('terranova_feedbacks');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_FEEDBACKS;
  });

  const [rating, setRating] = useState<number>(5);
  const [category, setCategory] = useState<string>('Materi Pengetahuan');
  const [desiredTopic, setDesiredTopic] = useState<string>('Fusi Nuklir Terkendali (Tokamak)');
  const [name, setName] = useState<string>(currentUser?.name || '');
  const [email, setEmail] = useState<string>(currentUser?.email || '');
  const [message, setMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      if (!name) setName(currentUser.name);
      if (!email) setEmail(currentUser.email);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('deliangterra_feedbacks', JSON.stringify(feedbacks));
    } catch {
      // ignore
    }
  }, [feedbacks]);

  const ratingLabels: Record<number, string> = {
    1: 'Perlu Banyak Pembenahan',
    2: 'Cukup, Perlu Tambahan Data',
    3: 'Bagus & Bermanfaat',
    4: 'Sangat Menarik & Informatif',
    5: 'Luar Biasa Inspiratif & Edukatif!'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newFeedback: UserFeedback = {
      id: `fb_${Date.now()}`,
      name: name.trim() || 'Pengunjung Edukasi',
      email: email.trim(),
      rating,
      category,
      desiredTopic,
      message: message.trim(),
      createdAt: 'Baru saja'
    };

    setFeedbacks([newFeedback, ...feedbacks]);
    setIsSubmitted(true);
    setMessage('');
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="text-xs text-amber-400 font-mono tracking-wider uppercase mb-2">
          EVALUASI & SARAN PENGEMBANGAN
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Suara Anda Membangun DeLiangTerra
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
          Bantu kami menyempurnakan platform ini: sampaikan masukan, beri penilaian, dan pilih materi sains masa depan mana yang ingin Anda pelajari selanjutnya.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Feedback Form */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-2 text-white font-bold text-lg mb-6 pb-4 border-b border-slate-800">
            <MessageSquarePlus className="w-5 h-5 text-amber-400" />
            <span>Formulir Evaluasi Pengunjung</span>
          </div>

          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Terima Kasih Banyak!</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Masukan berharga Anda telah tercatat dan menjadi dasar prioritas kami dalam mengembangkan kurikulum modul sains berikutnya di DeLiangTerra.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
              >
                Kirim Masukan Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              {/* Rating selection */}
              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  Bagaimana Pengalaman Belajar Anda di DeLiangTerra?
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 rounded-lg hover:scale-110 transition-transform focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-3 text-xs font-semibold text-amber-300 font-mono">
                    {ratingLabels[rating]}
                  </span>
                </div>
              </div>

              {/* Category & Desired Topic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Fokus Evaluasi:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Materi Pengetahuan">Materi Pengetahuan & Sains</option>
                    <option value="Game & Simulator">Game & Simulator Interaktif</option>
                    <option value="Kalkulator Energi">Kalkulator Energi Mikro</option>
                    <option value="Tampilan UI/UX">Desain Tampilan & Aksesibilitas</option>
                    <option value="Ruang Berbagi">Komunitas Ruang Berbagi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Topik yang Ingin Dipelajari Selanjutnya:
                  </label>
                  <select
                    value={desiredTopic}
                    onChange={(e) => setDesiredTopic(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Fusi Nuklir Terkendali (Tokamak)">Fusi Nuklir Bersih (Tokamak & Laser)</option>
                    <option value="Panas Bumi EGS Kedalaman Ekstrem">Panas Bumi Kedalaman Ekstrem (EGS)</option>
                    <option value="Piezoelektrik Jalan Raya">Piezoelektrik Penyerap Tekanan Jalan Raya</option>
                    <option value="Biofuel Alga Mikro Laut">Biofuel Alga Mikro Tropis</option>
                    <option value="Kabel Superkonduktor Suhu Kamar">Superkonduktor Transmisi Listrik</option>
                  </select>
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Nama Anda (Opsional):
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Rian Pratama"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Email (Opsional, untuk info modul baru):
                  </label>
                  <input
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Saran, Kritik, atau Ide Pengembangan:
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Apa yang paling Anda sukai atau apa yang perlu diperbaiki di website ini?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Kirimkan Masukan Anda</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Community Wishlist & Recent Reviews */}
        <div className="lg:col-span-5 space-y-6">
          {/* Wishlist Poll Card */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wide flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Polling Minat Belajar Pengunjung</span>
            </div>
            <h4 className="text-base font-bold text-white mb-4">
              Topik Modul Sains Berikutnya Paling Diminati
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Fusi Nuklir Terkendali (Tokamak)</span>
                  <span className="font-mono font-bold text-amber-400">46%</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '46%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Panas Bumi EGS Kedalaman Ekstrem</span>
                  <span className="font-mono font-bold text-cyan-400">28%</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: '28%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Biofuel Alga Mikro Laut Tropis</span>
                  <span className="font-mono font-bold text-yellow-300">16%</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-300 rounded-full" style={{ width: '16%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Piezoelektrik Jalan Raya & Trotoar</span>
                  <span className="font-mono font-bold text-slate-400">10%</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 rounded-full" style={{ width: '10%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial List */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-sm font-bold text-white">
              Ulasan & Masukan Pengunjung Terbaru:
            </h4>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {feedbacks.map((fb) => (
                <div key={fb.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="font-bold text-white">{fb.name}</span>
                    <div className="flex items-center text-amber-400">
                      {Array.from({ length: fb.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed italic">
                    "{fb.message}"
                  </p>
                  <div className="text-[10px] text-slate-400 pt-1 flex items-center justify-between font-mono">
                    <span>Modul: {fb.desiredTopic}</span>
                    <span>{fb.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
