"use client";

import { useEffect, useRef } from "react";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const STAR_SPEED = 0.5;
const STAR_COUNT_DESKTOP = 800;
const STAR_COUNT_MOBILE = 300;

class Star {
  x: number;
  y: number;
  z: number;
  pz: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth - canvasWidth / 2;
    this.y = Math.random() * canvasHeight - canvasHeight / 2;
    this.z = Math.random() * canvasWidth;
    this.pz = this.z;
  }

  update(canvasWidth: number, canvasHeight: number, speed: number) {
    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = canvasWidth;
      this.x = Math.random() * canvasWidth - canvasWidth / 2;
      this.y = Math.random() * canvasHeight - canvasHeight / 2;
      this.pz = this.z;
    }
  }

  draw(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number
  ) {
    const sx = ((this.x / this.z) * canvasWidth) / 2 + canvasWidth / 2;
    const sy = ((this.y / this.z) * canvasHeight) / 2 + canvasHeight / 2;

    const r = Math.max(0.1, (1 - this.z / canvasWidth) * 2.5);

    const px = ((this.x / this.pz) * canvasWidth) / 2 + canvasWidth / 2;
    const py = ((this.y / this.pz) * canvasHeight) / 2 + canvasHeight / 2;

    this.pz = this.z;

    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(sx, sy);
    ctx.lineWidth = r * 2;
    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - this.z / canvasWidth})`;
    ctx.stroke();
  }
}

function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const numStars = isMobile ? STAR_COUNT_MOBILE : STAR_COUNT_DESKTOP;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (!reducedMotion) {
        stars.forEach((star) => {
          star.update(canvas.width, canvas.height, STAR_SPEED);
          star.draw(ctx, canvas.width, canvas.height);
        });
      } else {
        stars.forEach((star) => {
          star.draw(ctx, canvas.width, canvas.height);
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [numStars, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

export default function HyperdriveBackground() {
  return <StarfieldCanvas />;
}
