"use client";
import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  ease: number;
  friction: number;
  dx: number;
  dy: number;
  distance: number;
  force: number;
  angle: number;
}

const IntroParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    // Cấu hình chuột
    const mouse = { x: 0, y: 0, radius: 100 };

    // Xử lý sự kiện chuột
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Hàm khởi tạo hạt từ text
    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];

      // 1. Vẽ Text lên Canvas (để lấy dữ liệu pixel)
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Responsive font size
      const fontSizeTitle = Math.min(window.innerWidth / 10, 80);
      const fontSizeSub = Math.min(window.innerWidth / 25, 20);

      // Dòng 1: Tên
      ctx.font = `900 ${fontSizeTitle}px sans-serif`;
      ctx.fillText("MAI SỸ ĐẠT", canvas.width / 2, canvas.height / 2 - 30);

      // Dòng 2: Role
      ctx.font = `400 ${fontSizeSub}px monospace`;
      ctx.fillStyle = "#2ECC71"; // Màu xanh lá điểm nhấn
      ctx.fillText(
        "FULL-STACK DEVELOPER",
        canvas.width / 2,
        canvas.height / 2 + 50
      );

      // 2. Quét dữ liệu pixel (Scan)
      const textCoordinates = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      // 3. Tạo hạt dựa trên pixel có màu
      // gap: bỏ qua bớt pixel để giảm tải (tăng hiệu suất)
      const gap = 4;

      for (let y = 0; y < textCoordinates.height; y += gap) {
        for (let x = 0; x < textCoordinates.width; x += gap) {
          // Kiểm tra độ trong suốt (Alpha channel)
          const alpha =
            textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3];

          if (alpha > 128) {
            // Lấy màu từ pixel gốc (để giữ màu xanh của dòng chữ dưới)
            const red =
              textCoordinates.data[y * 4 * textCoordinates.width + x * 4];
            const green =
              textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 1];
            const blue =
              textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 2];
            const color = `rgb(${red},${green},${blue})`;

            particles.push({
              x: Math.random() * canvas.width, // Vị trí bắt đầu ngẫu nhiên (hiệu ứng bay vào)
              y: Math.random() * canvas.height,
              originX: x, // Vị trí gốc cần về
              originY: y,
              size: Math.random() * 2 + 1, // Kích thước hạt
              color: color,
              vx: 0,
              vy: 0,
              ease: Math.random() * 0.1 + 0.05, // Tốc độ phản hồi về chỗ cũ
              friction: Math.random() * 0.05 + 0.9, // Độ trượt
              dx: 0,
              dy: 0,
              distance: 0,
              force: 0,
              angle: 0,
            });
          }
        }
      }
    };

    // Hàm render Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Tính khoảng cách giữa chuột và hạt
        p.dx = mouse.x - p.x;
        p.dy = mouse.y - p.y;
        p.distance = p.dx * p.dx + p.dy * p.dy; // Bình phương khoảng cách (nhanh hơn sqrt)

        // VẬT LÝ: Xử lý va chạm chuột (Mouse Repulsion)
        const forceDistance = mouse.radius * mouse.radius; // Bán kính tương tác

        if (p.distance < forceDistance) {
          // Nếu chuột ở gần -> Đẩy hạt ra xa
          p.angle = Math.atan2(p.dy, p.dx);
          p.vx -= Math.cos(p.angle) * 3; // Lực đẩy
          p.vy -= Math.sin(p.angle) * 3;
        }

        // VẬT LÝ: Hồi vị (Spring back to origin)
        // Tính khoảng cách tới vị trí gốc
        const dxOrigin = p.originX - p.x;
        const dyOrigin = p.originY - p.y;

        // Di chuyển hạt về vị trí gốc + vận tốc hiện tại
        p.vx += dxOrigin * p.ease;
        p.vy += dyOrigin * p.ease;

        // Áp dụng ma sát (để hạt dừng lại từ từ, không rung mãi)
        p.vx *= p.friction;
        p.vy *= p.friction;

        // Cập nhật vị trí
        p.x += p.vx;
        p.y += p.vy;

        // Vẽ hạt
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Chạy
    // Đợi font load xong mới init để tránh lỗi không vẽ được chữ
    document.fonts.ready.then(() => {
      init();
      animate();
    });

    // Resize handler
    const handleResize = () => {
      init();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default IntroParticles;
