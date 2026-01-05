"use client";
import { useEffect, useRef, useState } from "react";

export default function SoundManager() {
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // 1. Khởi tạo Audio
    bgAudioRef.current = new Audio("/sounds/ambient.mp3");
    bgAudioRef.current.loop = true;

    // ĐIỀU CHỈNH VOLUME TẠI ĐÂY:
    bgAudioRef.current.volume = 0.5; // Tăng nhạc nền lên

    clickAudioRef.current = new Audio("/sounds/click.mp3");
    clickAudioRef.current.volume = 0.3; // Giảm tiếng click xuống

    // 2. Hàm xử lý phát nhạc nền
    const playAmbient = () => {
      if (bgAudioRef.current && bgAudioRef.current.paused) {
        bgAudioRef.current.play().catch((e) => {
          console.error("Không thể phát nhạc nền:", e);
        });
      }
    };

    // 3. Hàm xử lý tiếng click
    const playClick = () => {
      if (clickAudioRef.current) {
        // Clone node để click nhanh vẫn nhận tiếng chồng lên nhau
        const sound = clickAudioRef.current.cloneNode() as HTMLAudioElement;
        sound.volume = 0.3; // Đảm bảo volume clone cũng giống bản gốc
        sound.play().catch(() => {});
      }
    };

    window.addEventListener("click", playAmbient, { once: true });
    window.addEventListener("mousedown", playClick);

    return () => {
      window.removeEventListener("click", playAmbient);
      window.removeEventListener("mousedown", playClick);
      if (bgAudioRef.current) bgAudioRef.current.pause();
    };
  }, []);

  const toggleMute = () => {
    if (bgAudioRef.current && clickAudioRef.current) {
      const newState = !isMuted;
      setIsMuted(newState);
      bgAudioRef.current.muted = newState;
      clickAudioRef.current.muted = newState;
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-50 mix-blend-difference">
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleMute();
        }}
        className="text-white text-xs uppercase tracking-widest hover:opacity-70 transition-opacity font-bold cursor-pointer"
      >
        {isMuted ? "Sound: Off" : "Sound: On"}
      </button>
    </div>
  );
}
