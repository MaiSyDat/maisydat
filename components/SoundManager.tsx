"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function SoundManager() {
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Khởi tạo Audio
    bgAudioRef.current = new Audio("/sounds/ambient.mp3");
    bgAudioRef.current.loop = true;
    bgAudioRef.current.volume = 0.3; // Âm lượng nền vừa phải

    clickAudioRef.current = new Audio("/sounds/click.mp3");
    clickAudioRef.current.volume = 0.5; // Âm lượng click rõ hơn chút

    const handleInteraction = () => {
      if (!hasInteracted && bgAudioRef.current) {
        bgAudioRef.current
          .play()
          .catch((e) => console.log("Audio play failed", e));
        setHasInteracted(true);
      }
    };

    const handleClick = () => {
      // Logic để phát tiếng click chồng lên nhau nếu click nhanh
      if (clickAudioRef.current) {
        clickAudioRef.current.currentTime = 0; // Reset về đầu
        clickAudioRef.current.play().catch(() => {});
      }
    };

    // Lắng nghe sự kiện để kích hoạt âm thanh lần đầu
    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("mousedown", handleClick);
      if (bgAudioRef.current) bgAudioRef.current.pause();
    };
  }, [hasInteracted]);

  // Nút bật/tắt âm thanh (Optional - gắn ở góc màn hình)
  const toggleMute = () => {
    if (bgAudioRef.current) {
      bgAudioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-50 mix-blend-difference">
      <button
        onClick={toggleMute}
        className="text-white text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
      >
        {isMuted ? "Sound Off" : "Sound On"}
      </button>
    </div>
  );
}
