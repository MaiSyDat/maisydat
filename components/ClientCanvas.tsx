'use client';

// @ts-nocheck
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic import với SSR disabled
const CanvasWrapper = dynamic(() => import('./CanvasWrapper'), { 
  ssr: false,
  loading: () => null
});

export default function ClientCanvas() {
  return <CanvasWrapper />;
}

