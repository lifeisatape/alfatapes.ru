import { useEffect, useRef } from 'react';

interface IconParticle {
  x: number;
  y: number;
  z: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  iconType: number;
  opacity: number;
  hue: number;
  vx: number;
  vy: number;
}

// SVG paths для иконок Lucide
const iconSVGs = [
  // Gamepad2
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 11h4"/><path d="M8 9v4"/><path d="M15 11h.01"/><path d="M18 13h.01"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>`,

  // Brain
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>`,

  // Music
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,

  // Video
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>`,

  // Globe
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,

  // Smartphone
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>`,

  // Palette
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="white"/><circle cx="17.5" cy="10.5" r=".5" fill="white"/><circle cx="8.5" cy="7.5" r=".5" fill="white"/><circle cx="6.5" cy="12.5" r=".5" fill="white"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,

  // Search
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`
];

export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const iconImagesRef = useRef<HTMLImageElement[]>([]);
  const imagesLoadedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Создаем изображения из SVG используя data URL с яркими цветами
    const loadIconImages = async () => {
      const promises = iconSVGs.map((svg, index) => {
        return new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();

          img.onload = () => {
            resolve(img);
          };

          img.onerror = (e) => {
            console.error('Failed to load icon:', e);
            // Создаем пустое изображение чтобы не блокировать
            resolve(img);
          };

          // Заменяем белый цвет на яркий радужный для каждой иконки
          const hue = (index * 45) % 360;
          const coloredSVG = svg.replace(/stroke="white"/g, `stroke="hsl(${hue}, 85%, 65%)"`).replace(/fill="white"/g, `fill="hsl(${hue}, 85%, 65%)"`);

          // Используем data URL вместо blob для надежности
          const encodedSVG = encodeURIComponent(coloredSVG);
          img.src = `data:image/svg+xml,${encodedSVG}`;
        });
      });

      iconImagesRef.current = await Promise.all(promises);
      imagesLoadedRef.current = true;
    };

    loadIconImages();

    // 50 иконок для насыщенного эффекта
    const PARTICLE_COUNT = 30;
    const particles: IconParticle[] = [];

    // Инициализация частиц
    const initParticles = () => {
      particles.length = 0;
      const width = window.innerWidth;
      const height = window.innerHeight;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 1000 + 100,
          size: Math.random() *  30 + 20,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.03,
          iconType: Math.floor(Math.random() * iconSVGs.length),
          opacity: Math.random() * 0.5 + 0.3,
          hue: Math.random() * 360,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
        });
      }
    };

    const resizeCanvas = () => {
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Инициализируем частицы только если их еще нет
      if (particles.length === 0) {
        initParticles();
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.016); // Ограничиваем до 60fps
      lastTime = currentTime;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Очищаем canvas темным фоном
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      // Ждем загрузки изображений
      if (!imagesLoadedRef.current || iconImagesRef.current.length === 0) {
        animationId = requestAnimationFrame(render);
        return;
      }

      // Статичный режим для reduced motion
      if (prefersReducedMotion) {
        particles.forEach((particle) => {
          const img = iconImagesRef.current[particle.iconType];
          if (!img || !img.complete || img.naturalWidth === 0) return;

          const scale = 1000 / (1000 + particle.z);
          const screenX = particle.x;
          const screenY = particle.y;
          const size = particle.size * scale;
          const alpha = particle.opacity * scale * 0.5;

          ctx.save();
          ctx.translate(screenX, screenY);
          ctx.rotate(particle.rotation);
          ctx.globalAlpha = alpha;

          ctx.filter = `hue-rotate(${particle.hue}deg) saturate(1.5) brightness(1.2)`;
          ctx.drawImage(img, -size / 2, -size / 2, size, size);
          ctx.filter = 'none';

          ctx.restore();
        });

        animationId = requestAnimationFrame(render);
        return;
      }

      // Обновляем и рисуем частицы с нормальной скоростью
      particles.forEach((particle) => {
        // Движение вперед с постоянной скоростью
        particle.z -= 60 * deltaTime;

        // Плавное движение по x и y
        particle.x += particle.vx * deltaTime * 25;
        particle.y += particle.vy * deltaTime * 25;

        // Вращение
        particle.rotation += particle.rotationSpeed * deltaTime * 60;

        // Цикличное обновление hue для радужного эффекта
        particle.hue = (particle.hue + deltaTime * 15) % 360;

        // Респавн частицы
        if (particle.z < 1) {
          particle.z = 1000 + Math.random() * 500;
          particle.x = Math.random() * width;
          particle.y = Math.random() * height;
          particle.iconType = Math.floor(Math.random() * iconSVGs.length);
          particle.opacity = Math.random() * 0.5 + 0.3;
          particle.hue = Math.random() * 360;
        }

        // Wrap around edges
        if (particle.x < -200) particle.x = width + 200;
        if (particle.x > width + 200) particle.x = -200;
        if (particle.y < -200) particle.y = height + 200;
        if (particle.y > height + 200) particle.y = -200;

        // Рендеринг иконки с перспективой
        const img = iconImagesRef.current[particle.iconType];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        const scale = 1000 / (1000 + particle.z);
        const screenX = particle.x;
        const screenY = particle.y;
        const size = particle.size * scale;
        const alpha = particle.opacity * scale;

        ctx.save();
        ctx.translate(screenX, screenY);
        ctx.rotate(particle.rotation);
        ctx.globalAlpha = alpha;

        ctx.filter = `hue-rotate(${particle.hue}deg) saturate(1.5) brightness(1.2)`;
        ctx.drawImage(img, -size / 2, -size / 2, size, size);
        ctx.filter = 'none';

        ctx.restore();
      });

      // Добавляем туманности для глубины
      for (let i = 0; i < 3; i++) {
        const x = width * (1.12 + i * 0.83);
        const y = height * (0.3 + Math.sin(currentTime * 0.00005 + i * 2) * 0.3);
        const radius = width * 1.10;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        // Используем только синие, фиолетовые, розовые и красные оттенки (200-360°)
        const baseHue = 200 + (i * 50); // Начинаем с синего (200°)
        const hue = (baseHue + currentTime * 0.01) % 160 + 200; // Ограничиваем диапазон 200-360°
        gradient.addColorStop(0, `hsla(${hue}, 70%, 50%, 0.38)`);
        gradient.addColorStop(0.5, `hsla(${(hue + 60) % 160 + 200}, 70%, 60%, 4.04)`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Легкое виньетирование
      const vignette = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height) * 0.007);
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationId = requestAnimationFrame(render);
    };

    // Запускаем рендеринг
    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
    />
  );
}