'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const CanvasWrapper = dynamic(() => import('./CanvasWrapper'), { 
  ssr: false,
  loading: () => null
});

export default function ClientCanvas() {
  return <CanvasWrapper />;
}

