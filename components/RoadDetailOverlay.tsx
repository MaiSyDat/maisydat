// @ts-nocheck
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

const RoadDetailOverlay: React.FC = () => {
  const { selectedRoadItem, setSelectedRoadItem, language } = useStore();

  if (!selectedRoadItem) return null;

  const subtitleLines = Array.isArray(selectedRoadItem.subtitle) 
    ? selectedRoadItem.subtitle 
    : selectedRoadItem.subtitle 
      ? [selectedRoadItem.subtitle] 
      : [];

  return (
    <AnimatePresence>
      {selectedRoadItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] pointer-events-none"
        >
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            onClick={() => setSelectedRoadItem(null)}
          />

          {/* Main Content Container */}
          <div className="relative w-full h-full flex items-center justify-center p-6 md:p-12">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-7xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedRoadItem(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/90 hover:bg-white transition-colors flex items-center justify-center shadow-lg group"
                aria-label="Close"
              >
                <svg 
                  className="w-6 h-6 text-slate-900 group-hover:rotate-90 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Split Screen Layout */}
              <div className="relative w-full h-full flex flex-col md:flex-row">
                {/* Left Side - Image */}
                <motion.div
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full md:w-1/2 h-1/2 md:h-full bg-slate-100"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                >
                  {selectedRoadItem.image ? (
                    <img
                      src={selectedRoadItem.image}
                      alt={selectedRoadItem.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                      <span className="text-slate-400 text-lg">No Image</span>
                    </div>
                  )}
                </motion.div>

                {/* Right Side - Content */}
                <motion.div
                  initial={{ x: '100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full md:w-1/2 h-1/2 md:h-full bg-white p-8 md:p-16 flex flex-col justify-center overflow-y-auto"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                >
                  {/* Title */}
                  <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-4xl md:text-7xl font-black text-slate-900 mb-6 leading-tight"
                  >
                    {selectedRoadItem.title}
                  </motion.h1>

                  {/* Subtitle */}
                  {subtitleLines.length > 0 && (
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="mb-8 space-y-2"
                    >
                      {subtitleLines.map((line, index) => (
                        <p
                          key={index}
                          className="text-lg md:text-xl text-slate-600 italic"
                        >
                          {line}
                        </p>
                      ))}
                    </motion.div>
                  )}

                  {/* Description */}
                  {selectedRoadItem.description && (
                    <motion.p
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="text-base md:text-lg text-slate-700 leading-relaxed max-w-2xl"
                    >
                      {selectedRoadItem.description}
                    </motion.p>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RoadDetailOverlay;

