
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Section, Language } from '../types';

const UIOverlay: React.FC = () => {
  const { currentSection, setSection, language, setLanguage, activeId, setActiveId } = useStore();

  const SECTIONS: { id: Section; label: { en: string; vi: string } }[] = [
    { id: 'about', label: { en: 'ROAD', vi: 'HÀNH TRÌNH' } },
    { id: 'resume', label: { en: 'OVERVIEW', vi: 'TỔNG QUAN' } },
    { id: 'projects', label: { en: 'LIST', vi: 'DANH SÁCH' } },
    { id: 'contact', label: { en: 'INQUIRE', vi: 'LIÊN HỆ' } }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] p-8 md:p-16 flex flex-col justify-between items-start">
      
      {/* Brand Header */}
      <div className="flex flex-col gap-1 pointer-events-auto">
        <h1 className="text-xl font-extrabold tracking-tighter text-slate-900 leading-none">
          M.S. DAT
        </h1>
        <div className="flex gap-2">
           {(['en', 'vi'] as Language[]).map(lang => (
             <button 
               key={lang} 
               onClick={() => setLanguage(lang)} 
               className={`text-[9px] font-black uppercase ${language === lang ? 'text-slate-900' : 'text-slate-300'} transition-colors`}
             >
               {lang}
             </button>
           ))}
        </div>
      </div>

      {/* Vertical Navigation (Right Side) */}
      <div className="fixed right-8 md:right-16 top-1/2 -translate-y-1/2 flex flex-col items-end gap-6 pointer-events-auto">
        {SECTIONS.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setSection(sec.id)}
            className="group flex flex-col items-end"
          >
            <span className={`text-xs md:text-sm font-black tracking-widest transition-all duration-300 ${currentSection === sec.id ? 'text-slate-900 scale-110' : 'text-slate-300 hover:text-slate-500'}`}>
              {sec.label[language]}
            </span>
            {currentSection === sec.id && (
              <motion.div layoutId="nav-line" className="h-[2px] w-4 bg-slate-900 mt-1" />
            )}
          </button>
        ))}
      </div>

      {/* Footer Branding */}
      <div className="flex items-center gap-4 pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          <span className="text-[10px] font-black tracking-[0.3em] text-slate-400">MAISYDAT // 2025</span>
        </div>
      </div>
    </div>
  );
};

export default UIOverlay;
