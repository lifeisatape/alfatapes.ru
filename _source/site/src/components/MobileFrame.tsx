import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileFrameProps {
  url: string;
  title: string;
  screenSize?: {
    width: number;
    height: number;
  };
}

export function MobileFrame({ url, title, screenSize = { width: 375, height: 812 } }: MobileFrameProps) {
  const [isVisible, setIsVisible] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Early check - don't even initialize if it might be mobile
  const [shouldRender, setShouldRender] = useState<boolean | null>(null);

  useEffect(() => {
    // Immediate mobile detection without waiting for hook
    const screenSizeMobile = window.innerWidth < 768;
    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroid = userAgent.includes('android');
    const isIOS = userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod');
    const isMobileDevice = isAndroid || isIOS;
    
    const isMobileNow = screenSizeMobile || isMobileDevice;
    setShouldRender(!isMobileNow);
  }, []);

  useEffect(() => {
    if (!shouldRender) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (frameRef.current) {
      observer.observe(frameRef.current);
    }

    return () => observer.disconnect();
  }, [shouldRender]);

  // Triple protection: early return, hook check, and state check
  if (isMobile || shouldRender === false || shouldRender === null) {
    return null;
  }

  return (
    <div
      ref={frameRef}
      className={`w-full flex justify-center items-center py-16 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      data-testid={`mobile-frame-${title}`}
    >
      <div className="relative group">
        <div
          className="absolute -inset-4 rounded-[3rem] opacity-30 blur-xl transition-all duration-700 group-hover:opacity-50"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)",
            backgroundSize: "200% 200%",
            animation: "rainbow-shift 8s ease infinite"
          }}
        />

        <div className="relative">
          <div
            className="relative rounded-[1rem]  shadow-2xl"
            style={{
              background: "transparent",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}
          >
            <div 
              className="relative rounded-[1rem] overflow-hidden bg-black"
              style={{
                width: `${screenSize.width}px`,
                height: `${screenSize.height}px`
              }}
            >
              <iframe
                src={url}
                title={title}
                className="w-full h-full border-0"
                loading="lazy"
                allow="microphone; camera; accelerometer; gyroscope"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                data-testid={`iframe-${title}`}
              />
            </div>
          </div>

          <div
            className="absolute inset-0 rounded-[2.5rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(135deg, transparent 0%, rgba(102, 126, 234, 0.1) 50%, transparent 100%)",
              backgroundSize: "200% 200%",
              animation: "gradient-morph 3s ease infinite"
            }}
          />
        </div>

        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center w-full">
          <p className="text-sm text-gray-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Живое демо
          </p>
        </div>
      </div>
    </div>
  );
}
