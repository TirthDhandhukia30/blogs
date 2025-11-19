"use client";
import React, { useRef, useEffect, useState } from "react";

class Particle {
  constructor(dimensions, minSize, maxSize) {
    this.dimensions = dimensions;
    this.x = Math.random() * dimensions.width;
    this.y = Math.random() * dimensions.height;
    this.size = Math.random() * (maxSize - minSize) + minSize;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > this.dimensions.width) this.x = 0;
    if (this.x < 0) this.x = this.dimensions.width;
    if (this.y > this.dimensions.height) this.y = 0;
    if (this.y < 0) this.y = this.dimensions.height;
  }

  draw(ctx, particleColor) {
    if (!ctx) return;
    ctx.fillStyle = particleColor;
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export const SparklesCore = ({
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 100,
  className = "",
  particleColor = "#FFFFFF",
}) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        setDimensions({
          width: canvasRef.current.offsetWidth,
          height: canvasRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const particles = [];
    const particleCount = Math.floor((dimensions.width * dimensions.height) / particleDensity);

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(dimensions, minSize, maxSize));
    }

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx, particleColor);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, minSize, maxSize, particleDensity, particleColor]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ background }}
    />
  );
};
