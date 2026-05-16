import { useParams, Link } from "wouter";
import { portfolioCases } from "@shared/portfolio-data";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTilt } from "@/hooks/useTilt";
import { useEffect, useRef, useState } from "react";
import { MobileFrame } from "@/components/MobileFrame";
import { ShaderBackground } from "@/components/ShaderBackground";
import { SectionBackdrop } from "@/components/SectionBackdrop";

import line1Image from "@assets/line1_1763386688336.png";
import line2Image from "@assets/line2_1763386688337.png";
import line3Image from "@assets/line3_1763386688337.png";
import line4Image from "@assets/line4_1763386688338.png";
import line5Image from "@assets/line5_1763386688338.png";
import line6Image from "@assets/line6_1763386688339.png";
import line7Image from "@assets/line7_1763386688340.png";
import editorImage from "@assets/editor_1763388096038.png";
import flowersOnMarsImage from "@assets/flowersonmrs_1763388273464.png";
import pinballImage from "@assets/pinbal_1763388368936.png";
import honkImage from "@assets/honk_1763388485672.png";

export default function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  const currentCase = portfolioCases.find(c => c.id === id);
  const otherCases = portfolioCases.filter(c => c.id !== id);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = scrollRef.current?.querySelectorAll('.scroll-reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;

      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };

    if (lightboxIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxIndex]);

  const getImageUrl = (path: string) => {
    if (path.includes('line2_1763386688337.png')) return line2Image;
    if (path.includes('line3_1763386688337.png')) return line3Image;
    if (path.includes('line4_1763386688338.png')) return line4Image;
    if (path.includes('line5_1763386688338.png')) return line5Image;
    if (path.includes('line6_1763386688339.png')) return line6Image;
    if (path.includes('line7_1763386688340.png')) return line7Image;
    return null;
  };

  const handlePrevImage = () => {
    if (lightboxIndex === null || !currentCase?.images) return;
    const newIndex = lightboxIndex === 0 ? currentCase.images.length - 1 : lightboxIndex - 1;
    setLightboxIndex(newIndex);
  };

  const handleNextImage = () => {
    if (lightboxIndex === null || !currentCase?.images) return;
    const newIndex = lightboxIndex === currentCase.images.length - 1 ? 0 : lightboxIndex + 1;
    setLightboxIndex(newIndex);
  };

  if (!currentCase) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Кейс не найден</h1>
          <Link href="/">
            <Button data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              На главную
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" ref={scrollRef}>
      <ShaderBackground />
      <SectionBackdrop opacity="medium" />
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20 relative z-0">
        <Link href="/#portfolio">
          <Button 
            variant="ghost" 
            className="mb-8 group"
            data-testid="button-back-portfolio"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Назад к портфолио
          </Button>
        </Link>

        <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
          <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 border border-purple-500/20 mb-6">
            <span className="text-sm font-medium bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              {currentCase.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            {currentCase.title}
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12">
            {currentCase.subtitle}
          </p>
        </div>

        {currentCase.demoUrl && (
          <MobileFrame 
            url={currentCase.demoUrl} 
            title={currentCase.title}
            screenSize={currentCase.screenSize}
          />
        )}

        <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 delay-100 mb-16">
          <div className="liquid-glass p-8 md:p-12 rounded-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Обзор проекта</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {currentCase.overview}
            </p>
          </div>
        </div>

        {currentCase.images && currentCase.images.length > 0 && (
          <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 delay-150 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Скриншоты проекта</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {currentCase.images.map((imagePath, idx) => {
                const imageUrl = getImageUrl(imagePath);
                if (!imageUrl) return null;

                return (
                  <button
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className="liquid-glass rounded-2xl overflow-hidden hover-elevate transition-all duration-300 cursor-pointer h-64 md:h-80 flex items-center justify-center bg-background/50"
                    data-testid={`screenshot-${idx}`}
                  >
                    <img
                      src={imageUrl}
                      alt={`${currentCase.title} screenshot ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 delay-200">
            <div className="liquid-glass p-8 rounded-3xl h-full">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></span>
                Ключевые особенности
              </h3>
              <ul className="space-y-3">
                {currentCase.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mt-2 flex-shrink-0"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 delay-300">
            <div className="liquid-glass p-8 rounded-3xl h-full">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500"></span>
                Ключевые достижения
              </h3>
              <ul className="space-y-3">
                {currentCase.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500/50 mt-2 flex-shrink-0"></span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 delay-400 mb-20">
          <div className="liquid-glass p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"></span>
              Технологии
            </h3>
            <div className="flex flex-wrap gap-3">
              {currentCase.technologies.map((tech, idx) => (
                <span 
                  key={idx}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 border border-purple-500/20 text-sm font-medium"
                  data-testid={`tech-${tech.toLowerCase().replace(/\./g, '-')}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {otherCases.length > 0 && (
          <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 delay-500">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Другие кейсы
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherCases.map((caseItem) => (
                <CaseCard key={caseItem.id} caseData={caseItem} />
              ))}
            </div>
          </div>
        )}
      </div>

      {lightboxIndex !== null && currentCase.images && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
          data-testid="lightbox-overlay"
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            data-testid="button-close-lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
            className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            data-testid="button-prev-image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
            className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            data-testid="button-next-image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div
            className="max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getImageUrl(currentCase.images[lightboxIndex]) || ''}
              alt={`${currentCase.title} screenshot ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              data-testid="lightbox-image"
            />
          </div>

          <div 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70"
            data-testid="lightbox-counter"
          >
            {lightboxIndex + 1} / {currentCase.images.length}
          </div>
        </div>
      )}
    </div>
  );
}

function CaseCard({ caseData }: { caseData: typeof portfolioCases[0] }) {
  const tiltRef = useTilt<HTMLDivElement>();

  const getThumbnailUrl = (imageUrl?: string) => {
    if (!imageUrl) return null;
    if (imageUrl.includes('line1_1763386688336.png')) return line1Image;
    if (imageUrl.includes('editor_1763388096038.png')) return editorImage;
    if (imageUrl.includes('flowersonmrs_1763388273464.png')) return flowersOnMarsImage;
    if (imageUrl.includes('pinbal_1763388368936.png')) return pinballImage;
    if (imageUrl.includes('honk_1763388485672.png')) return honkImage;
    return null;
  };

  const thumbnailUrl = getThumbnailUrl(caseData.imageUrl);

  return (
    <Link href={`/case/${caseData.id}`}>
      <div
        ref={tiltRef}
        className="liquid-glass liquid-glass-hover rounded-xl overflow-hidden cursor-pointer group relative iridescent-border"
        style={{ transformStyle: "preserve-3d" }}
        data-testid={`card-case-${caseData.id}`}
      >
        {thumbnailUrl ? (
          <div className="aspect-video relative overflow-hidden">
            <img 
              src={thumbnailUrl} 
              alt={caseData.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
            <div className="text-4xl font-bold text-white opacity-20">
              {caseData.title.charAt(0)}
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 border border-purple-500/20 mb-4">
            <span className="text-xs font-medium bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              {caseData.category}
            </span>
          </div>

          <h3 className="text-xl font-bold mb-2 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            {caseData.title}
          </h3>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {caseData.subtitle}
          </p>
        </div>
      </div>
    </Link>
  );
}