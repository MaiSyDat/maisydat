// @ts-nocheck
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../store/useStore';
import { CONTACT_INFO } from '../lib/data';

const SocialIcon = ({ id }: { id: string }) => {
  const icons: Record<string, React.ReactNode> = {
    fb: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    zalo: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M21.707 11.085c-.004-4.81-4.303-8.722-9.58-8.722-5.278 0-9.577 3.912-9.58 8.722-.004 4.81 4.303 8.722 9.58 8.722 1.39 0 2.704-.271 3.88-.755l3.868 1.488a.63.63 0 0 0 .824-.766l-.993-2.903c1.232-1.442 2.001-3.235 2.001-5.786zM13.292 14.12h-3.664V9.824h3.664v4.296z" />
      </svg>
    ),
    tele: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.944 0C5.346 0 0 5.346 0 11.944s5.346 11.944 11.944 11.944 11.944-5.346 11.944-11.944S18.542 0 11.944 0zm5.83 8.356c-.16 1.756-.864 5.942-1.22 7.848-.15.807-.446 1.077-.734 1.104-.625.058-1.1-.413-1.706-.81-.95-.623-1.486-.96-2.407-1.567-1.064-.7-1.116-1.086.234-2.18.354-.286 6.495-5.95 6.615-6.46.015-.064.03-.3-.11-.424s-.345-.08-.494-.047c-.21.047-3.56 2.26-10.05 6.64-.95.653-1.812.973-2.585.954-.852-.02-2.492-.484-3.71-.88-.15-.05-.27-.075-.27-.075s-.1-.02-.125-.035c-.025-.015-.05-.045-.065-.075 0 0-.025-.045-.03-.11-.005-.065.01-.155.075-.21.05-.04.28-.155 1.055-.473 4.793-1.958 7.99-3.262 9.593-3.91 4.57-1.85 5.52-2.17 6.14-2.18.136 0 .44.03.637.193.165.138.213.324.225.46.013.14.015.42 0 .584z" />
      </svg>
    ),
    git: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    ig: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    tiktok: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.89-.23-2.74.24-.93.53-1.51 1.54-1.58 2.6-.07 1.13.5 2.21 1.44 2.82.72.47 1.61.64 2.45.47 1.11-.25 2-1.18 2.24-2.27.05-.2.06-.4.06-.61-.02-5.26-.02-10.52-.02-15.78z" />
      </svg>
    ),
  };
  return icons[id] || <span>{id}</span>;
};

const ContactScene: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { language, currentSection } = useStore();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('success'), 1500);
    setTimeout(() => setStatus('idle'), 4000);
  };

  useFrame((state) => {
    if (!groupRef.current) return;
    const { x, y } = state.mouse;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.15, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.1, 0.05);
  });

  const panelWidth = isMobile ? 6 : 8;
  const panelHeight = isMobile ? 10 : 10;
  const gap = isMobile ? 0.5 : 2;

  return (
    <group ref={groupRef}>
      {/* LEFT PANEL: INFO & SOCIALS */}
      <group position={[isMobile ? 0 : -(panelWidth / 2 + gap / 2), isMobile ? 6 : 0, 0]}>
        <RoundedBox args={[panelWidth, panelHeight, 0.2]} radius={0.2} raycast={() => null}>
          <meshPhysicalMaterial 
            transmission={0.8} 
            thickness={2} 
            roughness={0.1} 
            color="#ffffff" 
            envMapIntensity={1}
          />
        </RoundedBox>
        
        <Text
          position={[-panelWidth/2 + 0.5, panelHeight/2 - 1, 0.15]}
          fontSize={0.4}
          color="#1e293b"
          anchorX="left"
          fontWeight="bold"
        >
          {language === 'en' ? 'CONTACT INFO' : 'LIÊN HỆ'}
        </Text>

        <group position={[-panelWidth/2 + 0.5, panelHeight/2 - 2.5, 0.15]}>
          <Text fontSize={0.2} color="#64748b" anchorX="left" position={[0, 0.5, 0]}>
            {language === 'en' ? 'Address' : 'Địa chỉ'}
          </Text>
          <Text fontSize={0.25} color="#0f172a" anchorX="left" fontWeight="medium" maxWidth={panelWidth - 1}>
            {CONTACT_INFO.address[language]}
          </Text>

          <Text fontSize={0.2} color="#64748b" anchorX="left" position={[0, -1, 0]}>
            {language === 'en' ? 'Email' : 'Thư điện tử'}
          </Text>
          <Text fontSize={0.25} color="#0f172a" anchorX="left" position={[0, -1.5, 0]} fontWeight="medium">
            {CONTACT_INFO.email}
          </Text>

          <Text fontSize={0.2} color="#64748b" anchorX="left" position={[0, -2.5, 0]}>
            {language === 'en' ? 'Phone' : 'Điện thoại'}
          </Text>
          <Text fontSize={0.25} color="#0f172a" anchorX="left" position={[0, -3, 0]} fontWeight="medium">
            {CONTACT_INFO.phone}
          </Text>
        </group>

        {/* Static Social Icons */}
        <group position={[0, -panelHeight/2 + 2, 0.15]}>
          <Text fontSize={0.2} color="#64748b" position={[0, 1.4, 0]} fontWeight="bold">
            {language === 'en' ? 'SOCIAL CHANNELS' : 'KÊNH MẠNG XÃ HỘI'}
          </Text>
          <group>
            {CONTACT_INFO.socials.map((social, i) => (
              <group 
                key={social.id}
                position={[(i - 2.5) * 1.15, 0, 0]}
              >
                <mesh onClick={(e) => { 
                  if (currentSection !== 'contact') return;
                  e.stopPropagation(); 
                  window.open(social.url, '_blank'); 
                }}>
                  <circleGeometry args={[0.45, 32]} />
                  <meshBasicMaterial color="#f1f5f9" />
                  <Html
                    position={[0, 0, 0.01]}
                    center
                    transform
                    scale={0.22}
                    distanceFactor={isMobile ? 12 : 10}
                    pointerEvents="none"
                  >
                    <div className="w-32 h-32 flex items-center justify-center text-slate-700">
                      <SocialIcon id={social.id} />
                    </div>
                  </Html>
                </mesh>
              </group>
            ))}
          </group>
        </group>
      </group>

      {/* RIGHT PANEL: CONTACT FORM */}
      <group position={[isMobile ? 0 : (panelWidth / 2 + gap / 2), isMobile ? -5 : 0, 0]}>
        <RoundedBox args={[panelWidth, panelHeight, 0.2]} radius={0.2} raycast={() => null}>
          <meshPhysicalMaterial 
            transmission={0.8} 
            thickness={2} 
            roughness={0.1} 
            color="#ffffff" 
          />
        </RoundedBox>

        <Html
          position={[0, 0, 0.11]}
          transform
          center
          distanceFactor={isMobile ? 12 : 10}
          style={{ pointerEvents: 'none' }}
        >
          <div className={`w-[400px] p-8 flex flex-col gap-4 text-slate-800 transition-opacity duration-500 ${currentSection === 'contact' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} bg-white/10 backdrop-blur-md rounded-2xl shadow-xl`}>
            <h2 className="text-3xl font-bold mb-4">
              {language === 'en' ? 'Send Message' : 'Gửi Tin Nhắn'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 pointer-events-auto">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-slate-500">
                  {language === 'en' ? 'Full Name' : 'Họ và tên'}
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-slate-100/50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onWheel={(e) => e.stopPropagation()}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-slate-500">
                  {language === 'en' ? 'Email Address' : 'Địa chỉ Email'}
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-slate-100/50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-text"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onWheel={(e) => e.stopPropagation()}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-slate-500">
                  {language === 'en' ? 'Message' : 'Nội dung'}
                </label>
                <textarea
                  rows={4}
                  required
                  className="w-full bg-slate-100/50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none cursor-text"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onWheel={(e) => e.stopPropagation()}
                />
              </div>

              <button
                type="submit"
                disabled={status !== 'idle'}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all transform hover:scale-105 active:scale-95 ${
                  status === 'success' ? 'bg-emerald-500' : 'bg-slate-900 hover:bg-emerald-600'
                }`}
              >
                {status === 'idle' && (language === 'en' ? 'SEND INQUIRY' : 'GỬI YÊU CẦU')}
                {status === 'sending' && (language === 'en' ? 'SENDING...' : 'ĐANG GỬI...')}
                {status === 'success' && (language === 'en' ? 'SENT SUCCESSFULLY!' : 'ĐÃ GỬI THÀNH CÔNG!')}
              </button>
            </form>
          </div>
        </Html>
      </group>
    </group>
  );
};

export default ContactScene;
