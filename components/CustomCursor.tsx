"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const CustomCursor: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    // Cập nhật vị trí chuột
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Bắt sự kiện nhấn chuột để tạo hiệu ứng
    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Green Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        // Thêm hiệu ứng Scale khi click
        animate={{
          scale: isPressed ? 0.5 : 1, // Khi nhấn sẽ co lại còn 50%
        }}
        // Cấu hình độ nảy (Spring) để cảm giác bấm "sướng" tay hơn
        transition={{
          type: "spring",
          stiffness: 400, // Độ cứng lò xo (càng cao càng nảy nhanh)
          damping: 25, // Độ giảm chấn (để không bị rung quá nhiều)
        }}
        className="absolute w-3 h-3 bg-[#2ECC71] rounded-full shadow-[0_0_15px_rgba(46,204,113,0.8)] border border-white/20"
      />
    </div>
  );
};

export default CustomCursor;