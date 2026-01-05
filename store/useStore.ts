
import { create } from 'zustand';
import { AppState } from '../types';

export const useStore = create<AppState>((set) => ({
  language: 'en',
  activeId: null,
  currentSection: 'about',
  zoom: 25,
  isDragging: false,
  selectedRoadItem: null,
  setLanguage: (lang) => set({ language: lang }),
  setActiveId: (id) => set({ activeId: id }),
  setSection: (section) => set({ 
    currentSection: section, 
    activeId: null,
    selectedRoadItem: null
  }),
  // Expanded zoom range: 5 to 100 for maximum flexibility in seeing the whole spiral
  setZoom: (zoom) => set({ zoom: Math.max(5, Math.min(zoom, 100)) }),
  setIsDragging: (isDragging) => set({ isDragging }),
  setSelectedRoadItem: (item) => set({ selectedRoadItem: item }),
}));
