'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';

export default function CanvasWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
        logarithmicDepthBuffer: false
      }}
      dpr={Math.min(window.devicePixelRatio, 2)}
      performance={{ min: 0.5 }}
    >
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
    </Canvas>
  );
}

