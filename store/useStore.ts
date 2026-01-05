

import { create } from 'zustand';
import { AppState } from '../types';

interface State extends AppState {
  isIntroDone: boolean;
  setIntroDone: (value: boolean) => void;
}

const useStore = create<State>((set) => ({
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
  setZoom: (zoom) => set({ zoom: Math.max(5, Math.min(zoom, 100)) }),
  setIsDragging: (isDragging) => set({ isDragging }),
  setSelectedRoadItem: (item) => set({ selectedRoadItem: item }),
  isIntroDone: false,
  setIntroDone: (value) => set({ isIntroDone: value }),
}));

export default useStore;
