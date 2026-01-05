"use client";
import { useEffect, useRef, useState } from "react";

export default function SoundManager() {
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // 1. Khởi tạo Audio (Chỉ chạy 1 lần duy nhất khi mount)
    bgAudioRef.current = new Audio("/sounds/ambient.mp3");
    bgAudioRef.current.loop = true;
    bgAudioRef.current.volume = 0.3;

    clickAudioRef.current = new Audio("/sounds/click.mp3");
    clickAudioRef.current.volume = 0.5;

    // 2. Hàm xử lý phát nhạc nền (chỉ chạy 1 lần khi user click lần đầu)
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
        // Clone node để có thể phát chồng âm thanh nếu click nhanh
        // hoặc đơn giản là reset time về 0
        const sound = clickAudioRef.current.cloneNode() as HTMLAudioElement;
        sound.volume = 0.5;
        sound.play().catch(() => {});
      }
    };

    // Đăng ký sự kiện
    // { once: true } nghĩa là sau khi click 1 cái thì tự gỡ sự kiện này ra -> tối ưu
    window.addEventListener("click", playAmbient, { once: true });
    window.addEventListener("mousedown", playClick);

    // Cleanup khi component bị hủy (ví dụ chuyển trang khác nếu SPA unmount layout)
    return () => {
      window.removeEventListener("click", playAmbient);
      window.removeEventListener("mousedown", playClick);
      if (bgAudioRef.current) bgAudioRef.current.pause();
    };
  }, []); // <--- Quan trọng: Mảng rỗng để chỉ chạy 1 lần

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
          e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài gây tiếng click kép
          toggleMute();
        }}
        className="text-white text-xs uppercase tracking-widest hover:opacity-70 transition-opacity font-bold cursor-pointer"
      >
        {isMuted ? "Sound: Off" : "Sound: On"}
      </button>
    </div>
  );
}
