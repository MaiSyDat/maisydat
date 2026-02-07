import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Text, Image, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { IDENTITY_DATA, CONTACT_INFO } from '../lib/data';
import useStore from '../store/useStore';

const VISIBLE_RANGE = 0.15;
const CURVE_POINTS = [
  new THREE.Vector3(0, 0, 10),
  new THREE.Vector3(12, 2, -20),
  new THREE.Vector3(-15, -4, -60),
  new THREE.Vector3(18, 6, -110),
  new THREE.Vector3(-10, -2, -160),
  new THREE.Vector3(15, 4, -220),
  new THREE.Vector3(0, 0, -320),
];

interface RoadCardProps {
  title: string;
  subtitle?: string | string[];
  image?: string;
  isMobile?: boolean;
  onClick?: () => void;
  label?: string;
  labelColor?: string;
}

const RoadCard: React.FC<RoadCardProps> = ({ title, subtitle, image, isMobile = false, onClick, label, labelColor = "#2ECC71" }) => {
  const [failed, setFailed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (image) {
      const img = new window.Image();
      img.onerror = () => setFailed(true);
      img.src = image;
    }
  }, [image]);

  const subtitleLines = Array.isArray(subtitle) ? subtitle : subtitle ? [subtitle] : [];

  useEffect(() => {
    if (isHovered) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = '';
    }
    return () => {
      document.body.style.cursor = '';
    };
  }, [isHovered]);

  // Adjust offsets for mobile to keep items on the "road"
  const cardXOffset = isMobile ? 0 : -3.8;
  const textXOffset = isMobile ? 0 : -1.5;
  const lineVisible = !isMobile;

  return (
    <group
      onClick={onClick}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {label && (
        <group position={[isMobile ? 0 : -3.8, isMobile ? 2.5 : 2.2, 0]}>
          <mesh>
            <planeGeometry args={[0.8, 0.3]} />
            <meshBasicMaterial color={labelColor} />
          </mesh>
          <Text fontSize={0.12} color="white" fontWeight="black" position={[0, 0, 0.01]}>
            {label}
          </Text>
        </group>
      )}

      {lineVisible && (
        <mesh position={[-1.8, -0.5, 0]} raycast={() => null}>
          <planeGeometry args={[0.02, 1.5]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.3} />
        </mesh>
      )}

      {image && !failed && (
        <Image
          url={image}
          scale={isMobile ? [3, 1.8] : [3.5, 2.2]}
          position={[cardXOffset, isMobile ? 1.4 : 0.8, 0]}
          radius={0.05}
          toneMapped={false}
        />
      )}

      {(failed || !image) && (
        <mesh position={[cardXOffset, isMobile ? 1.4 : 0.8, 0]} raycast={() => null}>
          <planeGeometry args={isMobile ? [3, 1.8] : [3.5, 2.2]} />
          <meshBasicMaterial color="#e2e8f0" transparent opacity={0.5} />
        </mesh>
      )}

      <group position={[textXOffset, isMobile ? 0.2 : 0.4, 0]}>
        <Text
          fontSize={isMobile ? 0.2 : 0.24}
          color="#0f172a"
          fontWeight="bold"
          anchorX={isMobile ? "center" : "left"}
          maxWidth={isMobile ? 3.5 : 4}
          textAlign={isMobile ? "center" : "left"}
        >
          {title}
        </Text>
        {subtitleLines.map((line, index) => (
          <Text
            key={index}
            fontSize={isMobile ? 0.12 : 0.16}
            color="#94a3b8"
            fontStyle="italic"
            position={[isMobile ? 0 : 0.1, isMobile ? -0.3 - (index * 0.2) : -0.7 - (index * 0.45), 0]}
            anchorX={isMobile ? "center" : "left"}
            maxWidth={isMobile ? 3 : 3}
            textAlign={isMobile ? "center" : "left"}
          >
            {line}
          </Text>
        ))}
      </group>
    </group>
  );
};

const RoadDots: React.FC<{ curve: THREE.CatmullRomCurve3 }> = ({ curve }) => {
  const pointsData = useMemo(() => {
    const dots = [];
    const segments = 500;
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
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[pointsData, 3]}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#000000"
        transparent
        opacity={0.1}
        sizeAttenuation
      />
    </points>
  );
};

interface JourneySectionProps {
  t: number;
  curve: THREE.CatmullRomCurve3;
  children: React.ReactNode;
  minOffset?: number;
}

const JourneySection: React.FC<JourneySectionProps> = ({ t, curve, children, minOffset }) => {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  const lastUpdateRef = useRef(0);

  useFrame((_state, delta) => {
    if (!groupRef.current || !scroll) return;

    lastUpdateRef.current += delta;
    if (lastUpdateRef.current < 0.016) return;
    lastUpdateRef.current = 0;

    const offset = scroll.offset || 0;
    if (minOffset !== undefined && offset < minOffset) {
      groupRef.current.visible = false;
      return;
    }

    const distance = Math.abs(offset - t);
    const opacity = THREE.MathUtils.clamp(1 - distance / VISIBLE_RANGE, 0, 1);
    const pos = curve.getPointAt(t);
    groupRef.current.position.copy(pos);
    groupRef.current.visible = opacity > 0.01;

    if (groupRef.current.visible) {
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
          child.material.transparent = true;
          child.material.opacity = opacity;
        }
        if ('fillOpacity' in child) (child as any).fillOpacity = opacity;
      });
    }
  });

  return (
    <group ref={groupRef}>
      <Billboard>{children}</Billboard>
    </group>
  );
};

const IdentityJourney: React.FC = () => {
  const scroll = useScroll();
  const { language, setSelectedRoadItem } = useStore();
  const curve = useMemo(() => new THREE.CatmullRomCurve3(CURVE_POINTS, false), []);
  const { size } = useThree();
  const isMobile = size.width < 768;

  const lastUpdateRef = useRef(0);
  useFrame((state, delta) => {
    if (!scroll || !state.camera) return;
    lastUpdateRef.current += delta;
    if (lastUpdateRef.current < 0.016) return;
    lastUpdateRef.current = 0;

    const offset = THREE.MathUtils.clamp(scroll.offset || 0, 0, 1);
    const camPos = curve.getPointAt(offset);
    const lookAtPos = curve.getPointAt(THREE.MathUtils.clamp(offset + 0.05, 0, 1));

    if (camPos && lookAtPos) {
      if (isMobile) {
        // Higher camera for better road view on mobile
        const adjustedCamPos = camPos.clone().add(new THREE.Vector3(0, 4, 1));
        adjustedCamPos.add(camPos.clone().sub(lookAtPos).normalize().multiplyScalar(-3));
        state.camera.position.lerp(adjustedCamPos, 0.1);
      } else {
        state.camera.position.lerp(camPos, 0.1);
      }
      state.camera.lookAt(lookAtPos);
    }
  });

  return (
    <group>
      <RoadDots curve={curve} />

      <JourneySection t={0.05} curve={curve}>
        <group position={[0, 1, 0]}>
          <Text fontSize={isMobile ? 0.35 : 0.5} color="#000" fontWeight="black" anchorY="bottom">
            {IDENTITY_DATA.intro.name}
          </Text>
          <Text fontSize={isMobile ? 0.12 : 0.16} color="#94a3b8" position={[0, -0.3, 0]} fontWeight="medium">
            {IDENTITY_DATA.intro.role}
          </Text>
        </group>
      </JourneySection>

      <JourneySection t={0.2} curve={curve}>
        <RoadCard
          title={IDENTITY_DATA.education.school[language]}
          subtitle={[IDENTITY_DATA.education.major[language], IDENTITY_DATA.education.period, `GPA: ${IDENTITY_DATA.education.gpa}`]}
          image="/images/hpc.jpg"
          isMobile={isMobile}
          onClick={() => setSelectedRoadItem({
            title: IDENTITY_DATA.education.school[language],
            subtitle: [IDENTITY_DATA.education.major[language], IDENTITY_DATA.education.period, `GPA: ${IDENTITY_DATA.education.gpa}`],
            image: '/images/hpc.jpg',
            description: language === 'en'
              ? 'Foundation of my IT career. Focused on software development and building a strong technical base.'
              : 'Nền móng cho sự nghiệp IT. Tập trung vào phát triển phần mềm và xây dựng nền tảng kỹ thuật vững chắc.'
          })}
        />
      </JourneySection>

      <JourneySection t={0.35} curve={curve}>
        <RoadCard
          title="LSD TECHNOLOGY"
          subtitle={["01/2025 - 04/2025", language === 'en' ? 'First steps' : 'Những bước đi đầu tiên']}
          image="/images/lsd.jpg"
          isMobile={isMobile}
          onClick={() => setSelectedRoadItem({
            title: "LSD TECHNOLOGY",
            subtitle: ["01/2025 - 04/2025"],
            image: '/images/lsd.jpg',
            description: language === 'en'
              ? 'Learned professional workflows and expanded knowledge in HTML, CSS, ReactJS, and Laravel.'
              : 'Học hỏi quy trình làm việc chuyên nghiệp và mở rộng kiến thức về HTML, CSS, ReactJS và Laravel.'
          })}
        />
      </JourneySection>

      <JourneySection t={0.5} curve={curve}>
        <RoadCard
          title="OVATHEME"
          subtitle={["04/2025 - 10/2025", language === 'en' ? "WordPress Plugin Development" : "Lập trình WordPress & Plugin"]}
          image="/images/ovatheme.jpg"
          isMobile={isMobile}
          onClick={() => setSelectedRoadItem({
            title: "OVATHEME",
            subtitle: ["04/2025 - 10/2025"],
            image: '/images/ovatheme.jpg',
            description: language === 'en'
              ? 'Converted Figma to Themes, developed Elementor widgets, and supported booking modules with performance optimization.'
              : 'Chuyển đổi Figma thành Theme, phát triển Elementor widgets và hỗ trợ module booking với tối ưu hiệu suất.'
          })}
        />
      </JourneySection>

      <JourneySection t={0.65} curve={curve}>
        <RoadCard
          title="HUPUNA GROUP"
          subtitle={["10/2025 - 02/2026", language === 'en' ? "SEO Automation & UI/UX" : "Tự động hóa SEO & UI/UX"]}
          image="/images/hupuna.png"
          isMobile={isMobile}
          onClick={() => setSelectedRoadItem({
            title: "HUPUNA GROUP",
            subtitle: ["10/2025 - 02/2026"],
            image: '/images/hupuna.png',
            description: language === 'en'
              ? 'Developed SEO tools, managed 14 satellite sites, and built internal Chrome Extensions for business automation.'
              : 'Phát triển công cụ SEO, quản trị 14 website vệ tinh và xây dựng Chrome Extension nội bộ để tự động hóa doanh nghiệp.'
          })}
        />
      </JourneySection>

      <JourneySection t={0.82} curve={curve}>
        <RoadCard
          labelColor="#064E3B"
          title={language === 'en' ? 'NATIONAL SERVICE' : 'NGHĨA VỤ QUÂN SỰ'}
          subtitle={["AFTER TET 2026", language === 'en' ? 'A new duty' : 'Một nhiệm vụ mới']}
          image="/images/quandoinhandan.jpg"
          isMobile={isMobile}
          onClick={() => setSelectedRoadItem({
            title: language === 'en' ? 'NATIONAL SERVICE' : 'NGHĨA VỤ QUÂN SỰ',
            subtitle: ["2026 - 2028"],
            image: '/images/quandoinhandan.jpg',
            description: language === 'en'
              ? 'Fulfilling national duty. A pause from code, but a significant period for discipline and personal growth.'
              : 'Thực hiện nghĩa vụ quân sự. Một khoảng nghỉ với code, nhưng là giai đoạn quan trọng để rèn luyện kỷ luật và sự trưởng thành cá nhân.'
          })}
        />
      </JourneySection>

      <JourneySection t={1.0} curve={curve}>
        <group position={[0, 0, 0]}>
          <Text fontSize={isMobile ? 0.3 : 0.4} color="#000" fontWeight="black" textAlign="center">
            {language === 'en' ? 'TO BE CONTINUED...' : 'CÒN TIẾP...'}
          </Text>
          <Text fontSize={0.12} color="#94a3b8" position={[0, -0.4, 0]} maxWidth={3} textAlign="center">
            {language === 'en'
              ? 'Thank you for following my journey. Connect with me through the social links below.'
              : 'Cảm ơn bạn đã theo dõi hành trình của tôi. Hãy kết nối với tôi qua các liên kết bên dưới.'}
          </Text>
        </group>
      </JourneySection>

      <fog attach="fog" args={['#ffffff', 5, 80]} />
    </group>
  );
};

export default IdentityJourney;
