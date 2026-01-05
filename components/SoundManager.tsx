"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import useStore from "@/store/useStore";

export default function SoundManager() {
  const { isIntroDone } = useStore();
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const clonedSoundsRef = useRef<Set<HTMLAudioElement>>(new Set());
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    bgAudioRef.current = new Audio("/sounds/ambient.mp3");
    bgAudioRef.current.loop = true;
    bgAudioRef.current.volume = 0.7;

    clickAudioRef.current = new Audio("/sounds/click.mp3");
    clickAudioRef.current.volume = 0.3;

    const playAmbient = () => {
      if (bgAudioRef.current && bgAudioRef.current.paused) {
        bgAudioRef.current.play().catch(() => {});
      }
    };

    const playClick = () => {
      if (clickAudioRef.current) {
        const sound = clickAudioRef.current.cloneNode() as HTMLAudioElement;
        sound.volume = 0.3;
        clonedSoundsRef.current.add(sound);
        sound.play().catch(() => {});
        sound.onended = () => {
          clonedSoundsRef.current.delete(sound);
        };
      }
    };

    window.addEventListener("click", playAmbient, { once: true });
    window.addEventListener("mousedown", playClick);

    return () => {
      window.removeEventListener("click", playAmbient);
      window.removeEventListener("mousedown", playClick);
      if (bgAudioRef.current) bgAudioRef.current.pause();
      clonedSoundsRef.current.forEach(sound => {
        sound.pause();
        sound.remove();
      });
      clonedSoundsRef.current.clear();
    };
  }, [isMuted]);

  useEffect(() => {
    if (bgAudioRef.current) {
      bgAudioRef.current.muted = isMuted;
      if (isMuted && !bgAudioRef.current.paused) {
        bgAudioRef.current.pause();
      } else if (!isMuted && bgAudioRef.current.paused) {
        bgAudioRef.current.play().catch(() => {});
      }
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  if (!isIntroDone) return null;

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      onClick={(e) => {
        e.stopPropagation();
        toggleMute();
      }}
      className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isMuted ? 'text-slate-400 hover:text-slate-600' : 'text-slate-900'}`}
    >
      {isMuted ? "Sound: Off" : "Sound: On"}
    </motion.button>
  );
}
