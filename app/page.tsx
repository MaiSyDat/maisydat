'use client';

import React, { Suspense, lazy, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';

// Dynamic imports with proper SSR handling
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

  useEffect(() => {
    setMounted(true);
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    window.addEventListener('contextmenu', handleContextMenu);
    return () => window.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  if (!mounted) {
    return (
      <div className="relative w-screen h-screen overflow-hidden bg-white select-none">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#f8fafc] to-[#ffffff]" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white select-none cursor-none">
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>
      
      {/* Clean Aesthetic Gradient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#f8fafc] to-[#ffffff]" />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-50/50 blur-[150px] rounded-full" />
      </div>

      {/* Main 3D Canvas - Only render when mounted */}
      {mounted && (
        <div className="relative z-1 w-full h-full">
          <ClientCanvas />
        </div>
      )}

      {/* HTML Overlay Layers */}
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
    </div>
  );
}

