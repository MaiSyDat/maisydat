"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroParticles from "./IntroParticles";
import useStore from "@/store/useStore";

export default function IntroScreen() {
  const { isIntroDone, setIntroDone } = useStore();
  const [isHovered, setIsHovered] = useState(false);

  // Xử lý khi nhấn Enter
  const handleEnter = () => {
    // Phát âm thanh click nếu chưa có trong button
    const audio = new Audio("/sounds/click.mp3");
    audio.volume = 0.5;
    audio.play().catch(() => {});

    // Cập nhật state để ẩn Intro -> Hiện Main
    setIntroDone(true);
  };

  return (
    <AnimatePresence>
      {!isIntroDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} // Hiệu ứng tan biến khi thoát
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Lớp hạt (Particles Effect) */}
          <IntroParticles />

          {/* Dòng chào mừng nhỏ ở trên */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute top-10 text-xs md:text-sm text-gray-500 tracking-[0.5em] uppercase"
          >
            Chào mừng đến với trang Profile của
          </motion.p>

          {/* Nút Enter chính giữa */}
          <motion.button
            onClick={handleEnter}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 1 }} // Hiện sau khi chữ đã ổn định
            className="relative z-10 group mt-40 md:mt-60"
          >
            {/* Vòng tròn bao quanh */}
            <div
              className={`absolute inset-0 rounded-full border border-white/20 transition-all duration-500 ${
                isHovered ? "scale-150 opacity-0" : "scale-100 opacity-100"
              }`}
            />
            <div
              className={`absolute inset-0 rounded-full border border-[#2ECC71]/50 transition-all duration-500 delay-75 ${
                isHovered ? "scale-125 opacity-100" : "scale-50 opacity-0"
              }`}
            />

            <span className="relative block px-8 py-4 text-sm md:text-base font-bold tracking-[0.3em] text-white transition-colors duration-300 group-hover:text-[#2ECC71]">
              ENTER
            </span>

            {/* Gạch chân animation */}
            <span
              className={`absolute bottom-0 left-1/2 h-[1px] bg-[#2ECC71] transition-all duration-300 -translate-x-1/2 ${
                isHovered ? "w-full" : "w-0"
              }`}
            />
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 3 }}
            className="absolute bottom-10 text-[10px] text-white tracking-widest"
          >
            DESIGNED BY MAI SY DAT
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
