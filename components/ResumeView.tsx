
import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { PORTFOLIO_DATA } from '../lib/data';

const ResumeView: React.FC = () => {
  const { currentSection, language, setSection } = useStore();
  
  if (currentSection !== 'resume') return null;

  // Stable filtering by checking categories in both languages or checking ID prefixes
  const skills = PORTFOLIO_DATA.filter(item => 
    item.id.startsWith('skill-') || 
    item.category.en === 'Skill' || 
    item.category.vi === 'Kỹ năng'
  );
  
  const experience = PORTFOLIO_DATA.filter(item => 
    item.id.startsWith('work-') || 
    item.category.en === 'Current Job' || 
    item.category.en === 'Experience' ||
    item.category.vi === 'Công việc hiện tại' || 
    item.category.vi === 'Kinh nghiệm'
  );

  const TRANSLATIONS = {
    expertise: { en: 'Expertise', vi: 'Chuyên môn' },
    chronology: { en: 'Chronology', vi: 'Lịch sử' },
    current: { en: 'Current', vi: 'Đang làm' },
    history: { en: 'History', vi: 'Lịch sử' },
    present: { en: 'Present', vi: 'Hiện tại' },
    cta: { en: 'Ready to start a new chapter?', vi: 'Sẵn sàng cho chương mới?' },
    connect: { en: 'Connect with me', vi: 'Kết nối với tôi' }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className="fixed inset-0 z-30 overflow-y-auto pointer-events-auto custom-scrollbar bg-white/20 backdrop-blur-[2px]"
    >
      <div className="max-w-6xl mx-auto px-6 pt-40 pb-32">
        
        {/* SECTION I: EXPERTISE (Skills) */}
        <motion.div variants={itemVariants} className="mb-32">
          <div className="flex items-center gap-6 mb-16">
            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-emerald-600">01</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 uppercase">
              {TRANSLATIONS.expertise[language]}
            </h2>
            <div className="h-[1px] flex-grow bg-slate-200" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100 border border-slate-200 overflow-hidden rounded-[2.5rem] shadow-xl">
            {skills.map((skill) => (
              <motion.div 
                key={skill.id}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
                className="p-12 bg-white/80 backdrop-blur-md transition-colors group"
              >
                <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 group-hover:border-emerald-500 group-hover:bg-emerald-50 transition-all transform group-hover:rotate-12">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{skill.title}</h3>
                <p className="text-slate-500 leading-relaxed text-base font-medium">{skill.description[language]}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SECTION II: CHRONOLOGY (Experience) */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-6 mb-16">
            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-emerald-600">02</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 uppercase">
              {TRANSLATIONS.chronology[language]}
            </h2>
            <div className="h-[1px] flex-grow bg-slate-200" />
          </div>

          <div className="space-y-0">
            {experience.map((job) => (
              <motion.div
                key={job.id}
                className="group relative flex flex-col md:flex-row md:items-start justify-between py-16 border-b border-slate-200 cursor-default"
              >
                <div className="flex flex-col mb-6 md:mb-0 max-w-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest px-2.5 py-1 bg-emerald-50 rounded-full">
                      {(job.category.en === 'Current Job' || job.category.vi === 'Công việc hiện tại') ? TRANSLATIONS.current[language] : TRANSLATIONS.history[language]}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {(job.category.en === 'Current Job' || job.category.vi === 'Công việc hiện tại') 
                        ? (language === 'en' ? `Oct 2025 — ${TRANSLATIONS.present[language]}` : `10/2025 — ${TRANSLATIONS.present[language]}`)
                        : (language === 'en' ? 'Apr 2025 — Oct 2025' : '04/2025 — 10/2025')}
                    </span>
                  </div>
                  <h3 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[0.85] transition-transform duration-500 group-hover:translate-x-6">
                    {job.title}
                  </h3>
                </div>
                
                <div className="md:text-right md:max-w-md pt-4">
                  <p className="text-slate-500 text-lg leading-relaxed group-hover:text-slate-900 transition-colors duration-500 font-medium">
                    {job.description[language]}
                  </p>
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '60px' }}
                    className="h-1 bg-emerald-500 mt-8 md:ml-auto rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="mt-32 p-16 bg-slate-900 rounded-[4rem] text-center text-white overflow-hidden relative group">
          <div className="absolute inset-0 bg-emerald-600 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-10">
              {TRANSLATIONS.cta[language]}
            </h2>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResumeView;
