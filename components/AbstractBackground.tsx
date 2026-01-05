// @ts-nocheck
import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store/useStore';

const PARTICLE_COUNT = 20000;

const DynamicAtmosphere: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { currentSection } = useStore();
  const { viewport } = useThree();
  
  const coverageScale = Math.max(viewport.width, viewport.height) * 1.5;

  const particleData = useMemo(() => {
    const seeds = new Float32Array(PARTICLE_COUNT);
    const factors = new Float32Array(PARTICLE_COUNT);
    const armOffsets = new Float32Array(PARTICLE_COUNT);
    const twinkles = new Float32Array(PARTICLE_COUNT);
    const radials = new Float32Array(PARTICLE_COUNT);
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      seeds[i] = Math.random();
      factors[i] = Math.random();
      armOffsets[i] = (i % 4) * (Math.PI * 0.5);
      twinkles[i] = Math.random() * Math.PI * 2;
      radials[i] = 0.8 + Math.random() * 0.4;
    }
    return { seeds, factors, armOffsets, twinkles, radials };
  }, []);

  const positions = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const geoPositions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    const lerpFactor = 0.035;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const f = particleData.factors[i];
      const s = particleData.seeds[i];
      const arm = particleData.armOffsets[i];
      const rMod = particleData.radials[i];

      let tx = 0, ty = 0, tz = 0;

      if (currentSection === 'resume') {
        const strand = (i % 2 === 0 ? 1 : -1);
        const angle = f * Math.PI * 12 + t * 0.15; 
        const height = (f - 0.5) * 120; 
        const radius = 25; 
        
        tx = strand * radius * Math.cos(angle) + (s - 0.5) * 4; 
        tz = strand * radius * Math.sin(angle) + (s - 0.5) * 4;
        ty = height;

      } else if (currentSection === 'projects') {
        const xRange = coverageScale * 5;
        tx = (f - 0.5) * xRange;
        const zLayer = ((i % 100) / 100 - 0.5) * 50;
        tz = zLayer + Math.cos(tx * 0.02 + t * 0.15) * 15;
        ty = Math.sin(tx * 0.08 + t * 0.3 + s) * 20;

      } else {
        const radius = f * 120 + 5;
        const angle = f * 25 + arm + t * 0.06;
        const scatter = (s - 0.5) * 15 * (1 - f); 
        
        tx = radius * Math.cos(angle) + scatter;
        tz = radius * Math.sin(angle) + scatter;
        ty = (s - 0.5) * 12; 
      }

      geoPositions[i3] = THREE.MathUtils.lerp(geoPositions[i3], tx, lerpFactor);
      geoPositions[i3 + 1] = THREE.MathUtils.lerp(geoPositions[i3 + 1], ty, lerpFactor);
      geoPositions[i3 + 2] = THREE.MathUtils.lerp(geoPositions[i3 + 2], tz, lerpFactor);
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += 0.0002; 
    pointsRef.current.rotation.z += 0.0001;
  });

  return (
    <points ref={pointsRef} raycast={() => null}>
      <bufferGeometry onUpdate={(self) => self.computeBoundingSphere()}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={PARTICLE_COUNT}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08} 
        color="#2ECC71" 
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default DynamicAtmosphere;
