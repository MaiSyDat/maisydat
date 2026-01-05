// @ts-nocheck
import React, { useRef, memo, useState, useEffect } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { Text, Float, RoundedBox, Image } from '@react-three/drei';
import * as THREE from 'three';
import { PortfolioItem } from '../types';
import { useStore } from '../store/useStore';

interface PortfolioCardProps {
  item: PortfolioItem;
  position: THREE.Vector3;
  isMobile: boolean;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item, position, isMobile }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const { activeId, setActiveId, currentSection, language } = useStore();
  const isActive = activeId === item.id;

  useEffect(() => {
    if (item.image) {
      const img = new window.Image();
      img.onerror = () => {
        setImageFailed(true);
      };
      img.src = item.image;
    }
  }, [item.image]);

  // Background cards visibility
  const bgOpacity = 0.4;

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setActiveId(isActive ? null : item.id);
  };

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Safe position target
    const targetPos = position || new THREE.Vector3(0, 0, 0);
    
    // Position Interpolation
    meshRef.current.position.lerp(targetPos, 0.1);

    // Rotation Logic
    if (isActive) {
      meshRef.current.quaternion.slerp(state.camera.quaternion, 0.15);
    } else {
      const targetQuat = new THREE.Quaternion();
      if (currentSection === 'projects' || currentSection === 'contact') {
        targetQuat.identity();
      } else {
        const currentPos = meshRef.current.position;
        const outwardTarget = new THREE.Vector3().copy(currentPos).multiplyScalar(2);
        // Ensure outwardTarget isn't zero to avoid lookAt issues
        if (outwardTarget.lengthSq() < 0.0001) outwardTarget.set(0, 0, 1);
        
        const lookMatrix = new THREE.Matrix4().lookAt(
          currentPos,
          outwardTarget,
          new THREE.Vector3(0, 1, 0)
        );
        targetQuat.setFromRotationMatrix(lookMatrix);
      }
      meshRef.current.quaternion.slerp(targetQuat, 0.1);
    }
    
    // Scale Transition
    const baseScale = isMobile ? 0.6 : 1;
    const targetS = baseScale * (isActive ? 1.5 : 1);
    const currentSX = meshRef.current.scale.x;
    const lerpedS = THREE.MathUtils.lerp(currentSX, targetS, 0.1);
    meshRef.current.scale.setScalar(lerpedS);
  });

  return (
    <Float 
      speed={isActive ? 0 : 2} 
      rotationIntensity={isActive ? 0 : 0.2} 
      floatIntensity={isActive ? 0 : 0.5}
    >
      <group ref={meshRef} onClick={handleClick}>
        <RoundedBox args={[2.8, 3.8, 0.15]} radius={0.15} smoothness={4}>
          <meshPhysicalMaterial
            transmission={0.8}
            roughness={0.05}
            thickness={2}
            envMapIntensity={2.5}
            color={isActive ? "#ffffff" : "#f8fafc"}
            transparent
            opacity={activeId && !isActive ? bgOpacity : 0.9}
            metalness={0.05}
          />
        </RoundedBox>

        {item.image && !imageFailed && (
          <Image
            url={item.image}
            scale={[2.2, 2.2]}
            position={[0, 0.5, 0.1]}
            radius={0.1}
            transparent
            opacity={activeId && !isActive ? bgOpacity : 1}
          />
        )}
        
        {imageFailed && (
           <mesh position={[0, 0.5, 0.1]}>
             <planeGeometry args={[2.2, 2.2]} />
             <meshBasicMaterial color={item.color} transparent opacity={0.2} />
           </mesh>
        )}

        <mesh position={[0, 1.7, 0.1]}>
          <planeGeometry args={[2.5, 0.05]} />
          <meshBasicMaterial color={item.color} transparent opacity={activeId && !isActive ? bgOpacity : 0.8} />
        </mesh>

        <Text
          position={[0, item.image ? -0.8 : 0.5, 0.12]}
          fontSize={item.id === 'about' ? 0.28 : 0.22}
          color="#0f172a"
          maxWidth={2.4}
          textAlign="center"
          fontWeight="bold"
          fillOpacity={activeId && !isActive ? bgOpacity : 1}
        >
          {item.title}
        </Text>

        <Text
          position={[0, item.image ? -1.2 : -0.2, 0.12]}
          fontSize={0.12}
          color="#64748b"
          textAlign="center"
          fontWeight="medium"
          fillOpacity={activeId && !isActive ? bgOpacity : 1}
        >
          {item.category[language].toUpperCase()}
        </Text>
      </group>
    </Float>
  );
};

export default memo(PortfolioCard);
