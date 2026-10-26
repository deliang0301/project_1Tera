import React, { useState, useEffect } from 'react';
import { INITIAL_COMMUNITY_PROJECTS } from '../data/energyData';
import { CommunityProject, UserProfile } from '../types';
import { 
  Users, ThumbsUp, MessageSquare, Plus, Search, Filter,
  Wrench, Check, Send, X, Lightbulb
} from 'lucide-react';

interface CommunitySectionProps {
  currentUser?: UserProfile | null;
  onProjectAdded?: () => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({ 
  currentUser,
  onProjectAdded 
}) => {
  // Load stored projects or fallback to initial
  const [projects, setProjects] = useState<CommunityProject[]>(() => {
    try {
      const saved = localStorage.getItem('deliangterra_projects') || localStorage.getItem('terranova_projects');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_COMMUNITY_PROJECTS;
  });

  // Track upvoted projects in this session/browser
  const [upvotedIds, setUpvotedIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('deliangterra_upvoted') || localStorage.getItem('terranova_upvoted');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {};
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [newCommentText, setNewCommentText] = useState<Record<string, string>>({});
  const [newCommentAuthor, setNewCommentAuthor] = useState<Record<string, string>>({});

  // Modal for new project
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formTitle, setFormTitle] = useState('');
  const [formAuthor, setFormAuthor] = useState(currentUser?.name || '');
  const [formRole, setFormRole] = useState(currentUser?.role || '');
  const [formCategory, setFormCategory] = useState('Surya Mandiri');
  const [formDifficulty, setFormDifficulty] = useState<'Pemula' | 'Menengah' | 'Lanjutan'>('Pemula');
  const [formBudget, setFormBudget] = useState('Rp 50.000 - Rp 100.000');
  const [formDescription, setFormDescription] = useState('');
  const [formMaterials, setFormMaterials] = useState('');
  const [formSteps, setFormSteps] = useState('');

  // Update form fields if currentUser changes
  useEffect(() => {
    if (currentUser) {
      setFormAuthor(currentUser.name);
      setFormRole(currentUser.role);
    }
  }, [currentUser]);

  // Persist projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('deliangterra_projects', JSON.stringify(projects));
    } catch {
      // ignore
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('deliangterra_upvoted', JSON.stringify(upvotedIds));
    } catch {
      // ignore
    }
  }, [upvotedIds]);

  const handleUpvote = (projectId: string) => {
    if (upvotedIds[projectId]) {
      setUpvotedIds(prev => ({ ...prev, [projectId]: false }));
      setProjects(prev =>
        prev.map(p => (p.id === projectId ? { ...p, upvotes: Math.max(0, p.upvotes - 1) } : p))
      );
    } else {
      setUpvotedIds(prev => ({ ...prev, [projectId]: true }));
      setProjects(prev =>
        prev.map(p => (p.id === projectId ? { ...p, upvotes: p.upvotes + 1 } : p))
      );
    }
  };

  const handleToggleComments = (projectId: string) => {
    setExpandedComments(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const handleAddComment = (projectId: string) => {
    const text = newCommentText[projectId]?.trim();
    const author = newCommentAuthor[projectId]?.trim() || (currentUser ? currentUser.name : 'Pegiat EBT');
    if (!text) return;

    const newComment = {
      id: `c_${Date.now()}`,
      author,
      date: 'Baru saja',
      comment: text
    };

    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            comments: [...p.comments, newComment]
          };
        }
        return p;
      })
    );

    setNewCommentText(prev => ({ ...prev, [projectId]: '' }));
    setNewCommentAuthor(prev => ({ ...prev, [projectId]: '' }));
  };

  const handleSubmitNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formAuthor || !formDescription) return;

    const initials = formAuthor
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const materialsArray = formMaterials
      .split('\n')
      .map(m => m.trim())
      .filter(m => m.length > 0);

    const newProj: CommunityProject = {
      id: `proj-${Date.now()}`,
      title: formTitle,
      author: formAuthor,
      authorRole: formRole || 'Komunitas DeLiangTerra',
      avatarText: initials || 'DL',
      date: 'Hari ini',
      category: formCategory,
      difficulty: formDifficulty,
      budgetEstimate: formBudget,
      description: formDescription,
      materials: materialsArray.length > 0 ? materialsArray : ['Material bekas/sederhana'],
      stepsSummary: formSteps || 'Langkah panduan detail dapat ditanyakan lewat kolom komentar.',
      upvotes: 1,
      comments: []
    };

    setProjects([newProj, ...projects]);
    if (onProjectAdded) onProjectAdded();
    setIsModalOpen(false);

    // Reset form
    setFormTitle('');
    setFormDescription('');
    setFormMaterials('');
    setFormSteps('');
  };

  // Filter projects
  const filteredProjects = projects.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesQuery =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs text-amber-400 font-mono tracking-wider uppercase mb-1">
            RUANG BERBAGI & MAKER LAB
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Komunitas Proyek Mandiri (DIY)
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Wadah belajar bersama: rancang, uji, dan bagikan eksperimen energi terbarukan sederhana buatan tangan Anda di DeLiangTerra.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Bagikan Proyek DIY Anda</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Semua ({projects.length})
          </button>
          <button
            onClick={() => setActiveCategory('Surya Mandiri')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeCategory === 'Surya Mandiri'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Surya Mandiri
          </button>
          <button
            onClick={() => setActiveCategory('Smart Grid IoT')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeCategory === 'Smart Grid IoT'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            IoT & Telemetri
          </button>
          <button
            onClick={() => setActiveCategory('Energi Angin')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeCategory === 'Energi Angin'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Angin & Savonius
          </button>
          <button
            onClick={() => setActiveCategory('Bioenergi')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeCategory === 'Bioenergi'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Biogas & Kompos
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari ide, sensor, alat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => {
          const isUpvoted = !!upvotedIds[project.id];
          const areCommentsOpen = !!expandedComments[project.id];

          return (
            <div
              key={project.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-colors shadow-lg"
            >
              <div>
                {/* Author Info & Date */}
                <div className="flex items-center justify-between text-xs text-slate-400 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-amber-400">
                      {project.avatarText}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{project.author}</div>
                      <div className="text-[11px] text-slate-400">{project.authorRole}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-slate-400">{project.date}</span>
                    <div className="text-[10px] text-amber-400 font-semibold">{project.category}</div>
                  </div>
                </div>

                {/* Title & Metadata Strip */}
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {project.title}
                  </h3>
                  
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <span>Tingkat: {project.difficulty}</span>
                    <span aria-hidden="true" className="text-slate-700">·</span>
                    <span>Biaya: {project.budgetEstimate}</span>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Materials list */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-amber-400" />
                    <span>Komponen & Bahan Kunci:</span>
                  </div>
                  <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                    {project.materials.map((mat, i) => (
                      <li key={i} className="line-clamp-1">{mat}</li>
                    ))}
                  </ul>
                </div>

                {/* Steps summary */}
                <div className="mt-3 text-xs text-slate-400 leading-relaxed">
                  <span className="font-semibold text-slate-300">Panduan Ringkas:</span>{' '}
                  {project.stepsSummary}
                </div>
              </div>

              {/* Action Bar: Upvote & Discussion Toggle */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpvote(project.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                      isUpvoted
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                        : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border-slate-700'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-amber-400 text-amber-400' : ''}`} />
                    <span className="font-mono tabular-nums">{project.upvotes}</span>
                  </button>

                  <button
                    onClick={() => handleToggleComments(project.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Diskusi ({project.comments.length})</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 font-mono">
                  {project.difficulty}
                </div>
              </div>

              {/* Collapsible Comments Section */}
              {areCommentsOpen && (
                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="text-xs font-semibold text-slate-300">
                    Kolom Tanya Jawab Proyek:
                  </div>

                  {project.comments.length === 0 ? (
                    <div className="text-xs text-slate-500 italic">
                      Belum ada komentar. Jadilah yang pertama bertanya atau memberi masukan!
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {project.comments.map((c) => (
                        <div key={c.id} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs">
                          <div className="flex items-center justify-between text-slate-400 mb-1">
                            <span className="font-bold text-slate-200">{c.author}</span>
                            <span className="text-[10px] font-mono text-slate-500">{c.date}</span>
                          </div>
                          <p className="text-slate-300 leading-normal">{c.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Comment Inputs */}
                  <div className="pt-2 space-y-2">
                    <input
                      type="text"
                      placeholder="Nama Anda"
                      value={newCommentAuthor[project.id] ?? (currentUser?.name || '')}
                      onChange={(e) =>
                        setNewCommentAuthor(prev => ({ ...prev, [project.id]: e.target.value }))
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Tulis pertanyaan atau tips..."
                        value={newCommentText[project.id] || ''}
                        onChange={(e) =>
                          setNewCommentText(prev => ({ ...prev, [project.id]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddComment(project.id);
                        }}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                      <button
                        onClick={() => handleAddComment(project.id)}
                        className="p-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors"
                        title="Kirim Komentar"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal: Bagikan Proyek DIY Baru */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <span>Bagikan Karya Eksperimen DIY</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitNewProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Judul Proyek:</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Powerbank Tenaga Surya Mini untuk Camping"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nama Pembuat:</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Anda"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Profesi / Peran:</label>
                  <input
                    type="text"
                    placeholder="Contoh: Siswa SMK / Maker"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Kategori:</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Surya Mandiri">Surya Mandiri</option>
                    <option value="Smart Grid IoT">Smart Grid IoT</option>
                    <option value="Energi Angin">Energi Angin</option>
                    <option value="Bioenergi">Bioenergi</option>
                    <option value="Hidrogen & Air">Hidrogen & Air</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Tingkat Kesulitan:</label>
                  <select
                    value={formDifficulty}
                    onChange={(e) => setFormDifficulty(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Pemula">Pemula</option>
                    <option value="Menengah">Menengah</option>
                    <option value="Lanjutan">Lanjutan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Estimasi Biaya:</label>
                  <input
                    type="text"
                    placeholder="Rp 50rb - 100rb"
                    value={formBudget}
                    onChange={(e) => setFormBudget(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Deskripsi & Manfaat Proyek:</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Jelaskan tujuan alat ini dan pengalaman Anda saat membuatnya..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Daftar Bahan / Alat (Pisahkan dengan baris baru):
                </label>
                <textarea
                  rows={2}
                  placeholder="Panel surya mini 5V&#10;Kabel jumper&#10;Saklar toggle"
                  value={formMaterials}
                  onChange={(e) => setFormMaterials(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Ringkasan Langkah Perakitan:</label>
                <textarea
                  rows={2}
                  placeholder="1. Rangkai baterai dengan modul charger. 2. Sambungkan ke beban LED..."
                  value={formSteps}
                  onChange={(e) => setFormSteps(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold"
                >
                  Publikasikan Proyek
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
