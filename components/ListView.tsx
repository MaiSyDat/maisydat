
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import { PORTFOLIO_DATA } from '../lib/data';

const ListView: React.FC = () => {
  const { currentSection } = useStore();
  
  const isListView = currentSection === 'projects';

  const filteredData = React.useMemo(() => {
    if (currentSection === 'projects') {
      // Filter for work, skills, and projects
      return PORTFOLIO_DATA.filter(item => 
        item.category.en === 'Current Job' || 
        item.category.en === 'Experience' ||
        item.category.en === 'Skill' ||
        item.category.en === 'Project' ||
        item.category.en === 'Backend' ||
        item.category.en === 'Tool' ||
        item.category.en === 'Work' ||
        item.category.en === 'Plugin' ||
        item.category.en === 'Frontend' ||
        item.category.en === 'Graduation' ||
        item.category.en === 'Education' ||
        item.category.en === 'UI/UX' ||
        item.category.en === 'App'
      );
    }
    return [];
  }, [currentSection]);

  if (!isListView) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center p-6 md:p-24 pointer-events-none overflow-hidden">
      <div className="w-full max-w-6xl pointer-events-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="flex flex-col space-y-0"
        >
          {filteredData.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
              whileHover={{ x: 15 }}
              className="group relative flex items-center justify-between py-8 md:py-12 border-b border-slate-300 transition-colors hover:border-emerald-500 cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="text-[10px] md:text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">
                  {item.category.en}
                </span>
                <h2 
                  className="text-4xl md:text-7xl font-bold tracking-tighter transition-colors group-hover:text-emerald-600"
                  style={{ color: 'inherit' }}
                >
                  {item.title}
                </h2>
              </div>

              <div className="text-right flex flex-col items-end">
                <p className="text-sm md:text-base text-slate-500 max-w-xs md:max-w-md line-clamp-2 md:line-clamp-none transition-colors group-hover:text-slate-900">
                  {/* Since this isn't localized in the original render, it might need attention but sticking to fix for error */}
                  {/* Fixing potential implicit any/object issue here as well if needed, but error was on filter */}
                  {item.description.en}
                </p>
                <motion.div 
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  className="h-[2px] bg-emerald-500 mt-4 self-end"
                />
              </div>

              {/* Animated Background Highlight */}
              <div className="absolute inset-0 bg-emerald-50/0 group-hover:bg-emerald-50/50 -z-10 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ListView;
