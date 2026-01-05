"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

const CustomCursor: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isPressed, setIsPressed] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastMoveRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        lastMoveRef.current = { x: e.clientX, y: e.clientY };
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      });
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000]">
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPressed ? 0.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        className="absolute w-3 h-3 bg-[#2ECC71] rounded-full shadow-[0_0_15px_rgba(46,204,113,0.8)] border border-white/20 mix-blend-difference"
      />
    </div>
  );
};

export default CustomCursor;