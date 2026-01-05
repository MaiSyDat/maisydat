import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import { Section, Language } from '../types';
import SoundManager from './SoundManager';

const UIOverlay: React.FC = () => {
  const { currentSection, setSection, language, setLanguage, activeId, setActiveId } = useStore();

  const SECTIONS: { id: Section; label: { en: string; vi: string } }[] = useMemo(() => [
    { id: 'about', label: { en: 'ROAD', vi: 'HÀNH TRÌNH' } },
    { id: 'resume', label: { en: 'OVERVIEW', vi: 'TỔNG QUAN' } },
    { id: 'projects', label: { en: 'PROJECTS', vi: 'DỰ ÁN' } }
  ], []);

  const handleSectionClick = useCallback((section: Section) => {
    setSection(section);
  }, [setSection]);

  const handleLanguageClick = useCallback((lang: Language) => {
    setLanguage(lang);
  }, [setLanguage]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] p-8 md:p-16">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-1 pointer-events-auto">
          <h1 className="text-xl font-extrabold tracking-tighter text-slate-900 leading-none">
            M.S. DAT
          </h1>
        </div>

        <div className="fixed right-8 md:right-16 top-1/2 -translate-y-1/2 flex flex-col items-end gap-6 pointer-events-auto">
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleSectionClick(sec.id)}
              className="group flex flex-col items-end"
            >
              <span className={`text-xs md:text-sm font-black tracking-widest transition-all duration-300 ${currentSection === sec.id ? 'text-slate-900 scale-110' : 'text-slate-400 hover:text-slate-600'}`}>
                {sec.label[language]}
              </span>
              {currentSection === sec.id && (
                <motion.div layoutId="nav-line" className="h-[2px] w-4 bg-slate-900 mt-1" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between w-full pointer-events-auto">
          <div className="flex items-center gap-6">
            {(['en', 'vi'] as Language[]).map(lang => (
              <button 
                key={lang} 
                onClick={() => handleLanguageClick(lang)} 
                className={`text-[10px] font-black uppercase tracking-widest transition-colors ${language === lang ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {lang}
              </button>
            ))}
            <SoundManager />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
            <span className="text-[10px] font-black tracking-[0.3em] text-slate-400">MAISYDAT // 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIOverlay;
