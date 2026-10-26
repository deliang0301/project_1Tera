export type NavTab = 'beranda' | 'pengetahuan' | 'info' | 'sharing' | 'game' | 'bantu-ai' | 'feedback';

export interface EnergyTech {
  id: string;
  title: string;
  subtitle: string;
  category: 'surya' | 'angin' | 'baterai' | 'hidrogen' | 'grid';
  categoryLabel: string;
  image: string;
  efficiencyText: string;
  efficiencyPercent: number;
  highlightStat: string;
  statLabel: string;
  summary: string;
  concept: string;
  advantages: string[];
  scientificMechanism: string;
  analogy: string;
  realWorldApplications: string[];
  simulatorType: 'solar' | 'wind' | 'battery' | 'hydrogen' | 'smartgrid';
}

export interface TimelineEvent {
  year: string;
  quarter?: string;
  title: string;
  category: string;
  description: string;
  impact: string;
}

export interface EnergyMixItem {
  name: string;
  indonesiaCurrent: number; // percentage
  indonesiaTarget2030: number; // percentage
  globalAverage: number; // percentage
  color: string;
}

export interface CommunityProject {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  avatarText: string;
  date: string;
  category: string;
  difficulty: 'Pemula' | 'Menengah' | 'Lanjutan';
  budgetEstimate: string;
  description: string;
  materials: string[];
  stepsSummary: string;
  upvotes: number;
  comments: ProjectComment[];
}

export interface ProjectComment {
  id: string;
  author: string;
  date: string;
  comment: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  funFact: string;
}

export interface UserFeedback {
  id: string;
  name: string;
  email?: string;
  rating: number; // 1 to 5
  category: string;
  desiredTopic: string;
  message: string;
  createdAt: string;
}

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  unlockedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarInitials: string;
  bio: string;
  joinedDate: string;
  completedModules: string[];
  bestGridScore: number;
  carbonQuizScore: number;
  hasCertificate: boolean;
  certificateDate?: string;
  diyProjectsCount: number;
  badges: UserBadge[];
}
