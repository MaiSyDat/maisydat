"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "@/store/useStore";

export default function IntroScreen() {
  const { isIntroDone, setIntroDone } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    if (isIntroDone) return;
    
    setTimeout(() => {
      setIntroDone(true);
    }, 300);
  };

  if (!isReady) {
    return (
      <div className="fixed inset-0 z-[9990] bg-white flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as any,
      }
    },
  };

  const subtitleVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as any,
        delay: 0.4,
      }
    },
  };

  return (
    <AnimatePresence mode="wait">
      {!isIntroDone && (
        <motion.div
          key="intro-screen"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.02,
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[9990] bg-gradient-to-b from-emerald-50 via-emerald-100 to-emerald-200 flex flex-col items-center justify-center overflow-hidden"
        >

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-16 md:top-20 text-center"
          >
            <p className="text-[10px] md:text-xs text-slate-500 tracking-[0.4em] uppercase font-semibold mb-2">
              CHÀO MỪNG ĐẾN VỚI TRANG PROFILE CỦA
            </p>
            <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center text-center space-y-6 md:space-y-8"
          >
            <motion.h1
              variants={titleVariants}
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-slate-900 uppercase leading-none"
            >
              MAI SỸ ĐẠT
            </motion.h1>

            <motion.p
              variants={subtitleVariants}
              className="text-lg md:text-xl lg:text-2xl text-slate-500 font-semibold tracking-[0.2em] uppercase"
            >
              FULL-STACK DEVELOPER
            </motion.p>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "120px", opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-full"
            />
          </motion.div>

          <motion.button
            onClick={handleEnter}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.9, type: "spring", stiffness: 100 }}
            className="relative z-10 group mt-16 md:mt-20 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-full"
            disabled={isIntroDone}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                scale: isHovered ? [1, 1.15, 1.1] : 1,
                opacity: isHovered ? [0.3, 0.6, 0.4] : 0.2,
              }}
              transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
            >
              <div className="w-full h-full rounded-full border-2 border-emerald-400/30" />
            </motion.div>

            {/* Middle ring */}
            <motion.div
              className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
                isHovered 
                  ? "border-emerald-500 scale-110 opacity-100" 
                  : "border-slate-300 scale-100 opacity-60"
              }`}
            />

            <motion.div
              className={`relative px-12 py-6 md:px-16 md:py-8 rounded-full border-2 transition-all duration-500 ${
                isHovered
                  ? "border-emerald-600 bg-emerald-50/50 shadow-lg shadow-emerald-500/20"
                  : "border-slate-900 backdrop-blur-sm"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={`relative block text-sm md:text-base font-black tracking-[0.5em] uppercase transition-colors duration-300 ${
                isHovered ? "text-emerald-700" : "text-slate-900"
              }`}>
                ENTER
              </span>

              <motion.div
                className="absolute bottom-2 left-1/2 h-[2px] bg-emerald-500 rounded-full"
                initial={{ width: 0, x: "-50%" }}
                animate={{ 
                  width: isHovered ? "60%" : "0%",
                  x: "-50%"
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </motion.div>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-8 md:bottom-12 text-center"
          >
            <p className="text-[9px] md:text-[10px] text-slate-400 tracking-[0.3em] uppercase font-semibold">
              DESIGNED BY MAI SY DAT © 2024
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <motion.div 
                className="w-1 h-1 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              />
              <motion.div 
                className="w-1 h-1 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div 
                className="w-1 h-1 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}