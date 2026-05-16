import { useEffect, useRef, RefObject } from 'react';

interface TiltOptions {
  max?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  glare?: boolean;
  maxGlare?: number;
}

export function useTilt<T extends HTMLElement>(
  options: TiltOptions = {}
): RefObject<T> {
  const {
    max = 15,
    perspective = 1000,
    scale = 1.05,
    speed = 400,
    glare = true,
    maxGlare = 0.3,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const checkReducedMotion = () => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    };

    if (checkReducedMotion()) return;

    let glareElement: HTMLDivElement | null = null;

    if (glare) {
      glareElement = document.createElement('div');
      glareElement.className = 'tilt-glare';
      glareElement.style.position = 'absolute';
      glareElement.style.top = '0';
      glareElement.style.left = '0';
      glareElement.style.width = '100%';
      glareElement.style.height = '100%';
      glareElement.style.borderRadius = 'inherit';
      glareElement.style.background =
        'linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%)';
      glareElement.style.opacity = '0';
      glareElement.style.pointerEvents = 'none';
      glareElement.style.transition = `opacity ${speed}ms cubic-bezier(0.4, 0, 0.2, 1)`;
      glareElement.style.mixBlendMode = 'overlay';
      
      const parent = element.parentElement;
      if (parent && getComputedStyle(parent).position === 'static') {
        parent.style.position = 'relative';
      }
      element.appendChild(glareElement);
    }

    element.style.transformStyle = 'preserve-3d';
    // Убираем transition для мгновенного отклика на курсор
    // element.style.transition = `transform ${speed}ms cubic-bezier(0.4, 0, 0.2, 1)`;

    const handleMouseMove = (e: MouseEvent) => {
      // Убираем transition для мгновенного отклика
      element.style.transition = 'none';
      
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      const tiltX = percentY * max;
      const tiltY = -percentX * max;

      element.style.transform = `
        perspective(${perspective}px)
        rotateX(${tiltX}deg)
        rotateY(${tiltY}deg)
        scale3d(${scale}, ${scale}, ${scale})
      `;

      if (glareElement) {
        const glareOpacity = Math.min(
          Math.sqrt(percentX ** 2 + percentY ** 2) * maxGlare,
          maxGlare
        );
        glareElement.style.opacity = glareOpacity.toString();
        
        const angle = Math.atan2(percentY, percentX) * (180 / Math.PI);
        glareElement.style.background = `
          linear-gradient(${angle + 90}deg, 
            rgba(255, 255, 255, 0) 0%, 
            rgba(255, 255, 255, ${maxGlare}) 100%)
        `;
      }
    };

    const handleMouseLeave = () => {
      // Добавляем transition только для возврата в исходное состояние
      element.style.transition = `transform ${speed}ms cubic-bezier(0.4, 0, 0.2, 1)`;
      element.style.transform = `
        perspective(${perspective}px)
        rotateX(0deg)
        rotateY(0deg)
        scale3d(1, 1, 1)
      `;

      if (glareElement) {
        glareElement.style.opacity = '0';
      }
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (glareElement && element.contains(glareElement)) {
        element.removeChild(glareElement);
      }
    };
  }, [max, perspective, scale, speed, glare, maxGlare]);

  return ref;
}
