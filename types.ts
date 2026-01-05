
export type Section = 'about' | 'projects' | 'resume';
export type Language = 'en' | 'vi';

export interface PortfolioItem {
  id: string;
  title: string;
  category: { en: string; vi: string };
  color: string;
  description: { en: string; vi: string };
  image?: string;
  type?: 'image' | 'video';
  url?: string;
  position?: [number, number, number];
}

export interface RoadItem {
  title: string;
  subtitle?: string | string[];
  image?: string;
  description?: string;
}

export interface AppState {
  language: Language;
  activeId: string | null;
  currentSection: Section;
  zoom: number;
  isDragging: boolean;
  selectedRoadItem: RoadItem | null;
  setLanguage: (lang: Language) => void;
  setActiveId: (id: string | null) => void;
  setSection: (section: Section) => void;
  setZoom: (zoom: number) => void;
  setIsDragging: (isDragging: boolean) => void;
  setSelectedRoadItem: (item: RoadItem | null) => void;
}
