// @ts-nocheck
import React, { useMemo, useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, ScrollControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { PORTFOLIO_DATA } from '../lib/data';
import PortfolioCard from './PortfolioCard';
import ContactScene from './ContactScene';
import IdentityJourney from './IdentityJourney';
import { useStore } from '../store/useStore';

const Experience: React.FC = () => {
  const sphereGroupRef = useRef<THREE.Group>(null);
  const contactGroupRef = useRef<THREE.Group>(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  
  const panRef = useRef({ x: 0, y: 0 });
  const targetPanRef = useRef({ x: 0, y: 0 });
  
  const isDraggingRef = useRef(false);
  const isPanningRef = useRef(false);
  const activePointersRef = useRef(new Set<number>());
  const previousMouseRef = useRef({ x: 0, y: 0 });
  
  const zoomRef = useRef(20); 
  const { 
    activeId, 
    currentSection, 
    zoom, 
    setZoom 
  } = useStore();

  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);
  
  const { camera, size } = useThree();
  const isMobile = size.width < 768;

  const isAboutMode = currentSection === 'about';
  const isResumeMode = currentSection === 'resume';
  const isContactMode = currentSection === 'contact';
  const isSphereMode = !isResumeMode && !isContactMode && !isAboutMode;

  const sphereItems = useMemo(() => {
    if (currentSection === 'projects') {
      return PORTFOLIO_DATA.filter(item => 
        item.id !== 'about' && 
        !item.id.startsWith('work-') && 
        !item.id.startsWith('edu-') &&
        !item.id.startsWith('skill-')
      );
    }
    return PORTFOLIO_DATA.filter(item => item.id === 'about' || item.category.en === 'Profile');
  }, [currentSection]);

  const sectionPositions = useMemo(() => {
    const n = sphereItems.length;
    return sphereItems.map((_, i) => {
      const pos = new THREE.Vector3();
      
      if (currentSection === 'projects') {
        const heightRange = 35;
        const totalRotations = 2.2;
        const angle = (i / n) * Math.PI * 2 * totalRotations;
        const radius = isMobile ? 8 : 14; 
        const y = (i / n - 0.5) * heightRange;
        
        pos.set(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        );
      } else {
        const r = isMobile ? 6 : 10;
        if (n === 1) {
          pos.set(0, 0, 0);
        } else {
          const phi = Math.acos(1 - 2 * (i + 0.5) / n);
          const theta = Math.PI * (1 + 5 ** 0.5) * (i + 0.5);
          pos.set(r * Math.cos(theta) * Math.sin(phi), r * Math.sin(theta) * Math.sin(phi), r * Math.cos(phi));
        }
      }
      return pos;
    });
  }, [sphereItems, currentSection, isMobile]);

  useEffect(() => {
    targetPanRef.current = { x: 0, y: 0 };
    const duration = 0.5;
    const ease = "expo.out";

    if (sphereGroupRef.current) {
      gsap.to(sphereGroupRef.current.scale, {
        x: isSphereMode ? 1 : 0,
        y: isSphereMode ? 1 : 0,
        z: isSphereMode ? 1 : 0,
        duration,
        ease
      });
    }

    if (contactGroupRef.current) {
      gsap.to(contactGroupRef.current.scale, {
        x: isContactMode ? 1 : 0,
        y: isContactMode ? 1 : 0,
        z: isContactMode ? 1 : 0,
        duration,
        ease
      });
    }
  }, [currentSection, isSphereMode, isContactMode]);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      activePointersRef.current.add(e.pointerId);
      // On touch devices, treat single touch as drag, multi-touch as pan
      if (e.button === 2 || activePointersRef.current.size >= 2) {
        isPanningRef.current = true;
      } else {
        isDraggingRef.current = true;
      }
      previousMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if ((!isDraggingRef.current && !isPanningRef.current) || activeId || isAboutMode) return;
      
      const prevMouse = previousMouseRef.current;
      if (!prevMouse || typeof prevMouse.x !== 'number') return;

      const deltaX = e.clientX - prevMouse.x;
      const deltaY = e.clientY - prevMouse.y;
      
      if (isPanningRef.current) {
        targetPanRef.current.x -= deltaX * 0.04;
        targetPanRef.current.y += deltaY * 0.04;
      } else {
        // Adjust sensitivity for touch devices
        const rotationSensitivity = isMobile ? 0.012 : 0.008;
        targetRotationRef.current.y += deltaX * rotationSensitivity;
        targetRotationRef.current.x += deltaY * rotationSensitivity;
      }
      previousMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      activePointersRef.current.clear();
      isDraggingRef.current = false;
      isPanningRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      if (currentSection === 'contact' || isAboutMode) return; 
      const currentZ = zoomRef.current ?? 25;
      const newZoom = currentZ + e.deltaY * 0.06;
      setZoom(newZoom);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeId, setZoom, currentSection, isAboutMode]);

  useFrame((state, delta) => {
    if (!sphereGroupRef.current || isAboutMode) return;

    // Smooth orbital rotation
    if (!isDraggingRef.current && !activeId && isSphereMode) {
      targetRotationRef.current.y += delta * 0.15; 
    }
    
    // Lerp values for smooth motion
    rotationRef.current.x = THREE.MathUtils.lerp(rotationRef.current.x, targetRotationRef.current.x, 0.1);
    rotationRef.current.y = THREE.MathUtils.lerp(rotationRef.current.y, targetRotationRef.current.y, 0.1);
    panRef.current.x = THREE.MathUtils.lerp(panRef.current.x, targetPanRef.current.x, 0.1);
    panRef.current.y = THREE.MathUtils.lerp(panRef.current.y, targetPanRef.current.y, 0.1);
    
    sphereGroupRef.current.rotation.x = rotationRef.current.x;
    sphereGroupRef.current.rotation.y = rotationRef.current.y;

    const targetCamPos = new THREE.Vector3();
    const lookAtTarget = new THREE.Vector3(panRef.current.x, panRef.current.y, 0);

    if (activeId && isSphereMode) {
      const idx = sphereItems.findIndex(item => item.id === activeId);
      if (idx !== -1 && sectionPositions && sectionPositions[idx]) {
        const cardPos = sectionPositions[idx].clone();
        cardPos.applyEuler(sphereGroupRef.current.rotation);
        const dir = cardPos.clone().normalize();
        const offsetDistance = isMobile ? 14 : 12; 
        targetCamPos.copy(cardPos).add(dir.multiplyScalar(offsetDistance));
        camera.position.lerp(targetCamPos, 0.1);
        camera.lookAt(cardPos);
      } else {
        targetCamPos.set(panRef.current.x, panRef.current.y, zoom);
        camera.position.lerp(targetCamPos, 0.1);
        camera.lookAt(lookAtTarget);
      }
    } else if (isContactMode) {
      const contactDistance = isMobile ? 26 : 16; 
      targetCamPos.set(panRef.current.x, panRef.current.y, contactDistance);
      camera.position.lerp(targetCamPos, 0.1);
      camera.lookAt(lookAtTarget);
    } else if (isResumeMode) {
      const resumeDistance = isMobile ? 40 : 30;
      targetCamPos.set(panRef.current.x, panRef.current.y, resumeDistance); 
      camera.position.lerp(targetCamPos, 0.1);
      camera.lookAt(lookAtTarget);
    } else if (!isAboutMode) {
      const finalZoom = currentSection === 'projects' ? zoom : zoom - 5;
      const adjustedZoom = isMobile ? finalZoom + 8 : finalZoom;
      targetCamPos.set(panRef.current.x, panRef.current.y, adjustedZoom);
      camera.position.lerp(targetCamPos, 0.1);
      camera.lookAt(lookAtTarget);
    }
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <pointLight position={[20, 20, 20]} intensity={2.5} />
      <Environment preset="night" />

      {/* Identity Journey - Removed infinite loop */}
      {isAboutMode && (
        <ScrollControls pages={10} damping={0.3} infinite={false}>
          <IdentityJourney />
        </ScrollControls>
      )}

      {/* Portfolio Card Systems */}
      <group ref={sphereGroupRef} visible={!isAboutMode}>
        {sphereItems.map((item, i) => (
          <PortfolioCard 
            key={item.id} 
            item={item} 
            position={sectionPositions[i] || new THREE.Vector3(0,0,0)}
            isMobile={isMobile}
          />
        ))}
        <ContactShadows position={[0, -20, 0]} opacity={0.5} scale={100} blur={3} />
      </group>

      {/* Contact Scene */}
      <group ref={contactGroupRef} scale={0}>
        <ContactScene isMobile={isMobile} />
      </group>
    </>
  );
};

export default Experience;
