
import React from 'react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import { PORTFOLIO_DATA } from '../lib/data';

const ResumeView: React.FC = () => {
  const { currentSection, language } = useStore();

  if (currentSection !== 'resume') return null;

  const skills = PORTFOLIO_DATA.filter(item =>
    item.category && (item.category.en === 'Skill' || item.category.vi === 'Kỹ năng')
  );

  const history = PORTFOLIO_DATA.filter(item =>
    item.category && (
      item.category.en === 'Current Chapter' ||
      item.category.en === 'Next Chapter' ||
      item.category.en === 'Experience' ||
      item.category.en === 'Internship' ||
      item.category.vi === 'Chương hiện tại' ||
      item.category.vi === 'Chương kế tiếp' ||
      item.category.vi === 'Kinh nghiệm' ||
      item.category.vi === 'Thực tập'
    )
  ).sort((a, b) => {
    if (a.category?.en === 'Next Chapter') return -1;
    if (b.category?.en === 'Next Chapter') return 1;
    if (a.category?.en === 'Current Chapter') return -1;
    if (b.category?.en === 'Current Chapter') return 1;
    return 0;
  });

  const projects = PORTFOLIO_DATA.filter(item =>
    item.category && (
      item.category.en.includes('Project') ||
      item.category.en === 'Full-stack' ||
      item.category.en === 'Automation' ||
      item.category.en === 'Utility'
    )
  );

  const TRANSLATIONS = {
    expertise: { en: 'Technical Arsenal', vi: 'Vũ khí Kỹ thuật' },
    chronology: { en: 'The Journey', vi: 'Hành trình' },
    projects: { en: 'Crafted Works', vi: 'Sản phẩm đã tạo' },
    present: { en: 'Present', vi: 'Hiện tại' },
    cta: { en: 'Ready for the next challenge?', vi: 'Sẵn sàng cho thử thách mới?' }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className="fixed inset-0 z-[80] overflow-y-auto pointer-events-auto bg-slate-50/60 backdrop-blur-[6px]"
    >
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 lg:py-40">

        {/* SKILLS */}
        <motion.div variants={itemVariants} className="mb-20 md:mb-32">
          <div className="flex items-center gap-4 md:gap-6 mb-12 md:mb-16">
            <span className="text-[9px] md:text-[10px] font-black tracking-[0.5em] uppercase text-slate-400">01</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-slate-900 uppercase">
              {TRANSLATIONS.expertise[language]}
            </h2>
            <div className="h-[1px] flex-grow bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <motion.div
                key={skill.id}
                className="p-8 md:p-10 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
                  <div className={`w-2 h-2 rounded-full bg-[${skill.color || '#000'}]`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{skill.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{skill.description[language]}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CHRONOLOGY */}
        <motion.div variants={itemVariants} className="mb-20 md:mb-32">
          <div className="flex items-center gap-4 md:gap-6 mb-12 md:mb-16">
            <span className="text-[9px] md:text-[10px] font-black tracking-[0.5em] uppercase text-slate-400">02</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-slate-900 uppercase">
              {TRANSLATIONS.chronology[language]}
            </h2>
            <div className="h-[1px] flex-grow bg-slate-200" />
          </div>

          <div className="space-y-4">
            {history.map((job) => (
              <div
                key={job.id}
                className="group relative flex flex-col md:flex-row md:items-center justify-between p-8 bg-white/40 border border-slate-100 rounded-[2rem] hover:bg-white transition-all duration-500"
              >
                <div className="max-w-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 bg-slate-100 rounded-full text-slate-600">
                      {job.category?.[language]}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      {job.period}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black tracking-tighter text-slate-900 group-hover:translate-x-1 transition-transform">
                    {job.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-slate-500 font-medium max-w-lg">
                    {job.description[language]}
                  </p>
                </div>
                {job.location && (
                  <div className="mt-4 md:mt-0 md:text-right">
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest block">{job.location[language]}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* PROJECTS */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-4 md:gap-6 mb-12 md:mb-16">
            <span className="text-[9px] md:text-[10px] font-black tracking-[0.5em] uppercase text-slate-400">03</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-slate-900 uppercase">
              {TRANSLATIONS.projects[language]}
            </h2>
            <div className="h-[1px] flex-grow bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <a
                href={proj.url || '#'}
                key={proj.id}
                target={proj.url ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="block p-8 bg-white border border-slate-100 rounded-[2rem] hover:rotate-[-1deg] hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{proj.period}</span>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: proj.color }} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{proj.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{proj.description[language]}</p>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-20 md:mt-32 p-10 md:p-16 bg-slate-900 rounded-[2rem] md:rounded-[4rem] text-center text-white overflow-hidden relative group">
          <div className="absolute inset-0 bg-slate-800 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-6">
              {TRANSLATIONS.cta[language]}
            </h2>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResumeView;
