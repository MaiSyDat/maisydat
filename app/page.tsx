'use client';

import React, { Suspense, lazy, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import IntroScreen from '@/components/IntroScreen';
import useStore from '@/store/useStore';

const ClientCanvas = dynamic(() => import('../components/ClientCanvas'), { 
  ssr: false,
  loading: () => null
});

const Loader = dynamic(() => import('@react-three/drei').then((mod) => mod.Loader), { 
  ssr: false 
});

const UIOverlay = lazy(() => import('../components/UIOverlay'));
const CustomCursor = lazy(() => import('../components/CustomCursor'));
const ResumeView = lazy(() => import('../components/ResumeView'));
const RoadDetailOverlay = lazy(() => import('../components/RoadDetailOverlay'));


export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { isIntroDone } = useStore();

  useEffect(() => {
    setMounted(true);
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    window.addEventListener('contextmenu', handleContextMenu, { passive: false });
    return () => window.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  if (!mounted) {
    return (
      <div className="relative w-screen h-screen overflow-hidden select-none">
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-emerald-50 via-emerald-100 to-emerald-200" />
      </div>
    );
  }

  return (
    <main className="relative w-full h-screen overflow-hidden">
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>

      <IntroScreen />

      <motion.div 
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isIntroDone ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-emerald-50 via-emerald-100 to-emerald-200" />

        <div className="relative z-1 w-full h-full">
          <ClientCanvas />
        </div>

        <Suspense fallback={null}>
          <AnimatePresence mode="wait">
            <ResumeView key="resume-view" />
          </AnimatePresence>
          <RoadDetailOverlay />
          <UIOverlay />
        </Suspense>

        <Loader 
          containerStyles={{ background: 'white' }} 
          innerStyles={{ background: '#000' }}
          barStyles={{ background: '#000' }}
          dataStyles={{ color: '#000', fontWeight: '800', letterSpacing: '0.2em' }}
        />
      </motion.div>
    </main>
  );
}

