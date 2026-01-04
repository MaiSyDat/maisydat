// @ts-nocheck
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Text, Image, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { IDENTITY_DATA, CONTACT_INFO } from '../lib/data';
import { useStore } from '../store/useStore';

// --- CONFIGURATION ---
const VISIBLE_RANGE = 0.2;
const CURVE_POINTS = [
  new THREE.Vector3(0, 0, 10),
  new THREE.Vector3(12, 2, -20),
  new THREE.Vector3(-15, -4, -60),
  new THREE.Vector3(18, 6, -110),
  new THREE.Vector3(-10, -2, -160),
  new THREE.Vector3(0, 0, -210),
];

// --- MINIMAL ROAD CARD ---
const RoadCard: React.FC<{ 
  title: string; 
  subtitle?: string | string[]; 
  image?: string; 
  active?: boolean;
}> = ({ title, subtitle, image, active }) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (image) {
      const img = new window.Image();
      img.onerror = () => {
        console.warn(`Failed to load image: ${image}`);
        setFailed(true);
      };
      img.src = image;
    }
  }, [image]);

  const subtitleLines = Array.isArray(subtitle) ? subtitle : subtitle ? [subtitle] : [];

  return (
    <group>
      {/* Indicator Line */}
      <mesh position={[-1.8, -0.5, 0]} raycast={() => null}>
        <planeGeometry args={[0.02, 1.5]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.3} />
      </mesh>

      {/* Main Image with fallback */}
      {image && !failed && (
        <Image 
          url={image} 
          scale={[3.5, 2.2]} 
          position={[-3.8, 0.8, 0]} 
          radius={0.05}
          toneMapped={false}
        />
      )}
      
      {/* Fallback if image fails or is missing */}
      {(failed || !image) && (
        <mesh position={[-3.8, 0.8, 0]} raycast={() => null}>
          <planeGeometry args={[3.5, 2.2]} />
          <meshBasicMaterial color="#e2e8f0" transparent opacity={0.5} />
        </mesh>
      )}

      {/* Text Group */}
      <group position={[-1.5, 0.4, 0]}>
        <Text
          fontSize={0.24}
          color="#0f172a"
          fontWeight="bold"
          anchorX="left"
        >
          {title}
        </Text>
        {subtitleLines.map((line, index) => (
          <Text
            key={index}
            fontSize={0.16}
            color="#94a3b8"
            fontStyle="italic"
            position={[0.1, -0.3 - (index * 0.25), 0]}
            anchorX="left"
          >
            {line}
          </Text>
        ))}
      </group>
    </group>
  );
};

// --- STRUCTURED ROAD (DOT GRID) ---
const RoadDots: React.FC<{ curve: THREE.CatmullRomCurve3 }> = ({ curve }) => {
  const pointsData = useMemo(() => {
    const dots = [];
    const segments = 400;
    const widthCount = 8;
    const spacing = 2.5;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const pos = curve.getPointAt(t);
      const tangent = curve.getTangentAt(t);
      const normal = new THREE.Vector3(0, 1, 0).cross(tangent).normalize();

      for (let j = 0; j < widthCount; j++) {
        const offset = (j - widthCount / 2) * spacing;
        const p = pos.clone().add(normal.clone().multiplyScalar(offset));
        dots.push(p.x, p.y - 1.5, p.z);
      }
    }
    return new Float32Array(dots);
  }, [curve]);

  return (
    <points raycast={() => null}>
      <bufferGeometry onUpdate={(self) => self.computeBoundingSphere()}>
        <bufferAttribute
          attach="attributes-position"
          args={[pointsData, 3]}
          count={pointsData.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#000000"
        transparent
        opacity={0.12}
        sizeAttenuation
      />
    </points>
  );
};

// --- SECTION WRAPPER ---
const JourneySection: React.FC<{ t: number; curve: THREE.CatmullRomCurve3; children: React.ReactNode }> = ({ t, curve, children }) => {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (!groupRef.current || !scroll) return;
    
    const offset = scroll.offset || 0;
    const distance = Math.abs(offset - t);
    
    const opacity = THREE.MathUtils.clamp(1 - distance / VISIBLE_RANGE, 0, 1);
    
    const pos = curve.getPointAt(t);
    if (pos) {
      groupRef.current.position.copy(pos);
    }
    
    groupRef.current.visible = opacity > 0.01;
    
    if (groupRef.current.visible) {
      groupRef.current.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material.transparent = true;
          child.material.opacity = opacity;
        }
        if (child.fillOpacity !== undefined) child.fillOpacity = opacity;
      });
    }
  });

  return (
    <group ref={groupRef}>
      <Billboard>{children}</Billboard>
    </group>
  );
};

// --- MAIN COMPONENT ---
const IdentityJourney: React.FC = () => {
  const scroll = useScroll();
  const { language } = useStore();
  const curve = useMemo(() => new THREE.CatmullRomCurve3(CURVE_POINTS, false), []);

  useFrame((state) => {
    if (!scroll || !state.camera) return;
    const offset = THREE.MathUtils.clamp(scroll.offset || 0, 0, 1);
    
    const camPos = curve.getPointAt(offset);
    const lookAtPos = curve.getPointAt(THREE.MathUtils.clamp(offset + 0.05, 0, 1));
    
    if (camPos && lookAtPos) {
      state.camera.position.lerp(camPos, 0.1);
      state.camera.lookAt(lookAtPos);
    }
  });

  return (
    <group>
      <RoadDots curve={curve} />
      
      <JourneySection t={0.1} curve={curve}>
        <group position={[0, 1, 0]}>
          <Text fontSize={0.6} color="#000" fontWeight="black" anchorY="bottom" raycast={() => null}>
            {IDENTITY_DATA.intro.name}
          </Text>
          <Text fontSize={0.18} color="#94a3b8" position={[0, -0.3, 0]} fontWeight="medium" raycast={() => null}>
            {IDENTITY_DATA.intro.role.toUpperCase()}
          </Text>
        </group>
      </JourneySection>

      <JourneySection t={0.3} curve={curve}>
        <RoadCard 
          title={IDENTITY_DATA.education.school[language]} 
          subtitle={[
            IDENTITY_DATA.education.major[language],
            IDENTITY_DATA.education.period,
            `GPA: ${IDENTITY_DATA.education.gpa}`
          ]}
          image="/images/education.jpg"
        />
      </JourneySection>

      <JourneySection t={0.5} curve={curve}>
        <RoadCard 
          title={language === 'en' ? 'Certificates' : 'Chứng chỉ'} 
          subtitle={IDENTITY_DATA.certs.map(c => `${c.name} (${c.date})`)}
          image="/images/certificates.jpg"
        />
      </JourneySection>

      <JourneySection t={0.7} curve={curve}>
        <RoadCard 
          title={language === 'en' ? 'Contact Information' : 'Thông tin liên hệ'} 
          subtitle={[
            CONTACT_INFO.email,
            CONTACT_INFO.phone,
            CONTACT_INFO.dob
          ]}
          image="/images/contact.jpg"
        />
      </JourneySection>

      <JourneySection t={0.9} curve={curve}>
        <RoadCard 
          title={language === 'en' ? 'Personal Interests' : 'Sở thích cá nhân'} 
          subtitle={IDENTITY_DATA.hobbies.map(h => h.name[language])}
          image="/images/hobbies.jpg"
        />
      </JourneySection>

      {/* Final Section - Profile Image */}
      <JourneySection t={0.98} curve={curve}>
        <group position={[0, 0, 0]}>
          <Image 
            url="/images/profile.jpg" 
            scale={[4, 4]} 
            position={[0, 0, 0]} 
            radius={0.5}
            toneMapped={false}
          />
        </group>
      </JourneySection>

      <fog attach="fog" args={['#ffffff', 10, 50]} />
    </group>
  );
};

export default IdentityJourney;
