
import React, { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      
      // Re-create particles when canvas resizes
      initParticles();
    };

    const initParticles = () => {
      particles.current = [];
      const particleCount = Math.min(Math.floor(window.innerWidth / 20), 100);
      
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 2 + 1;
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: getRandomColor(),
        });
      }
    };

    const getRandomColor = () => {
      const colors = [
        "rgba(80, 250, 123, 0.5)",  // Green
        "rgba(139, 233, 253, 0.5)", // Cyan
        "rgba(189, 147, 249, 0.5)", // Purple
        "rgba(255, 121, 198, 0.5)", // Pink
        "rgba(241, 250, 140, 0.5)", // Yellow
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x > canvas.width || particle.x < 0) {
          particle.speedX = -particle.speedX;
        }
        if (particle.y > canvas.height || particle.y < 0) {
          particle.speedY = -particle.speedY;
        }
      });
      
      // Connect particles with lines if they're close enough
      connectParticles();
      
      animationRef.current = requestAnimationFrame(drawParticles);
    };

    const connectParticles = () => {
      const maxDistance = 120;
      
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i; j < particles.current.length; j++) {
          const particleA = particles.current[i];
          const particleB = particles.current[j];
          
          const dx = particleA.x - particleB.x;
          const dy = particleA.y - particleB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(80, 100, 120, ${0.2 * (1 - distance / maxDistance)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particleA.x, particleA.y);
            ctx.lineTo(particleB.x, particleB.y);
            ctx.stroke();
          }
        }
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    drawParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default ParticlesBackground;
