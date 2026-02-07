import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import { Section, Language } from '../types';
import SoundManager from './SoundManager';
import { CONTACT_INFO } from '../lib/data';

const UIOverlay: React.FC = () => {
  const { currentSection, setSection, language, setLanguage } = useStore();

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
    <div className="fixed inset-0 pointer-events-none z-[90] p-6 md:p-12 lg:p-16">
      <div className="flex flex-col justify-between h-full">
        {/* Top Header */}
        <div className="flex justify-between items-start pointer-events-auto">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg md:text-xl font-extrabold tracking-tighter text-slate-900 leading-none">
              M.S. DAT
            </h1>
          </div>
        </div>

        {/* Right Navigation */}
        <div className="fixed right-6 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 flex flex-col items-end gap-5 md:gap-7 pointer-events-auto">
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleSectionClick(sec.id)}
              className="group flex flex-col items-end py-1"
            >
              <span className={`text-[10px] md:text-xs lg:text-sm font-black tracking-[0.2em] transition-all duration-300 ${currentSection === sec.id ? 'text-slate-900 scale-105' : 'text-slate-400 hover:text-slate-600'}`}>
                {sec.label[language]}
              </span>
              {currentSection === sec.id && (
                <motion.div layoutId="nav-line" className="h-[2px] w-4 bg-slate-900 mt-1" />
              )}
            </button>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex items-end justify-between w-full pointer-events-auto">
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Socials */}
            <div className="flex gap-4 md:gap-6">
              {CONTACT_INFO.socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] md:text-xs font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4 md:gap-8">
              <div className="flex gap-4">
                {(['en', 'vi'] as Language[]).map(lang => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageClick(lang)}
                    className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${language === lang ? 'text-slate-900 underline underline-offset-4' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <SoundManager />
            </div>
          </div>

          <div className="flex items-center gap-2 pb-1">
            <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-slate-900" />
            <span className="text-[8px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.3em] text-slate-400">MAISYDAT // 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIOverlay;
