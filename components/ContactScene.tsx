// @ts-nocheck
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../store/useStore';
import { CONTACT_INFO } from '../lib/data';

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

  const panelWidth = isMobile ? 5.5 : 8;
  const panelHeight = isMobile ? 8 : 10;
  const gap = isMobile ? 0.5 : 2;

  return (
    <group ref={groupRef}>
      {/* LEFT PANEL: INFO */}
      <group position={[isMobile ? 0 : -(panelWidth / 2 + gap / 2), isMobile ? 3.5 : 0, 0]}>
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
      </group>

      {/* RIGHT PANEL: CONTACT FORM */}
      <group position={[isMobile ? 0 : (panelWidth / 2 + gap / 2), isMobile ? -3.5 : 0, 0]}>
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
          distanceFactor={isMobile ? 8 : 10}
          style={{ pointerEvents: 'none' }}
        >
          <div className={`${isMobile ? 'w-[320px] p-6' : 'w-[400px] p-8'} flex flex-col gap-4 text-slate-800 transition-opacity duration-500 ${currentSection === 'contact' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} bg-white/10 backdrop-blur-md rounded-2xl shadow-xl`}>
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold mb-4`}>
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
