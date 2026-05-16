import { useEffect, useState } from "react";
import { ShaderBackground } from "@/components/ShaderBackground";
import { SectionBackdrop } from "@/components/SectionBackdrop";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BusinessQuiz } from "@/components/BusinessQuiz";
import {
  Gamepad2,
  Brain,
  Music,
  Video,
  Globe,
  Smartphone,
  Palette,
  Search,
  SendHorizontal,
} from "lucide-react";
import { useTilt } from "@/hooks/useTilt";
import { portfolioCases } from "@shared/portfolio-data";
import { Link } from "wouter";
import line1Image from "@assets/line1_1763386688336.png";
import editorImage from "@assets/editor_1763388096038.png";
import flowersOnMarsImage from "@assets/flowersonmrs_1763388273464.png";
import pinballImage from "@assets/pinbal_1763388368936.png";
import honkImage from "@assets/honk_1763388485672.png";
// Team avatars
import tapeAvatar from "@assets/tape_1765193118752.png";
import axekAvatar from "@assets/axek_1765193118750.png";
import mattAvatar from "@assets/matt_1765193118751.jpg";
import lovejoyAvatar from "@assets/lovejoy_1765193118750.png";
import markAvatar from "@assets/mark_1765193118751.png";
import altagresAvatar from "@assets/altagres_1765193118749.png";
import alexAvatar from "@assets/alex_1765193118753.jpg";
import emuletaAvatar from "@assets/emuleta_1766589274569.png";

function ServiceCard({ 
  icon, 
  iconColor, 
  title, 
  description, 
  testId, 
  delay 
}: { 
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  description: string;
  testId: string;
  delay: string;
}) {
  const tiltRef = useTilt<HTMLDivElement>({
    max: 15,
    scale: 1.08,
    glare: true,
    maxGlare: 0.3,
  });

  return (
    <div
      ref={tiltRef}
      className={`liquid-glass liquid-glass-hover rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:-translate-y-2 iridescent-border scroll-fade-in ${delay} cursor-pointer h-full flex flex-col`}
      data-testid={testId}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className={`mb-6 ${iconColor}`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
        {description}
      </p>
    </div>
  );
}

function PortfolioCard({ caseData, index }: { caseData: typeof portfolioCases[0]; index: number }) {
  const tiltRef = useTilt<HTMLDivElement>({
    max: 20,
    scale: 1.08,
    glare: true,
    maxGlare: 0.4,
  });

  const getIconForCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case 'game':
        return <Gamepad2 className="w-16 h-16 md:w-20 md:h-20 text-white" strokeWidth={1.5} />;
      case 'music app':
        return <Music className="w-16 h-16 md:w-20 md:h-20 text-white" strokeWidth={1.5} />;
      case 'creative tool':
        return <Palette className="w-16 h-16 md:w-20 md:h-20 text-white" strokeWidth={1.5} />;
      case 'social app':
        return <Smartphone className="w-16 h-16 md:w-20 md:h-20 text-white" strokeWidth={1.5} />;
      case 'web application':
        return <Globe className="w-16 h-16 md:w-20 md:h-20 text-white" strokeWidth={1.5} />;
      default:
        return <Globe className="w-16 h-16 md:w-20 md:h-20 text-white" strokeWidth={1.5} />;
    }
  };

  const getGradientForIndex = (idx: number) => {
    const gradients = [
      'from-rainbow-purple to-rainbow-violet',
      'from-rainbow-pink to-rainbow-cyan',
      'from-rainbow-cyan to-rainbow-blue',
      'from-rainbow-violet to-rainbow-pink',
      'from-rainbow-blue to-rainbow-purple',
      'from-rainbow-cyan to-rainbow-violet'
    ];
    return gradients[idx % gradients.length];
  };

  const delayClass = index % 3 === 1 ? 'scroll-fade-in-delay-1' : index % 3 === 2 ? 'scroll-fade-in-delay-2' : '';

  const getImageUrl = (imageUrl?: string) => {
    if (!imageUrl) return null;
    if (imageUrl.includes('line1_1763386688336.png')) return line1Image;
    if (imageUrl.includes('editor_1763388096038.png')) return editorImage;
    if (imageUrl.includes('flowersonmrs_1763388273464.png')) return flowersOnMarsImage;
    if (imageUrl.includes('pinbal_1763388368936.png')) return pinballImage;
    if (imageUrl.includes('honk_1763388485672.png')) return honkImage;
    return null;
  };

  const actualImageUrl = getImageUrl(caseData.imageUrl);

  return (
    <Link href={`/case/${caseData.id}`}>
      <div
        ref={tiltRef}
        className={`liquid-glass liquid-glass-hover rounded-xl overflow-hidden iridescent-border scroll-fade-in ${delayClass}`}
        style={{ transformStyle: "preserve-3d" }}
        data-testid={`card-portfolio-${caseData.id}`}
      >
        {actualImageUrl ? (
          <div className="aspect-video relative overflow-hidden">
            <img 
              src={actualImageUrl} 
              alt={caseData.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className={`aspect-video bg-gradient-to-br ${getGradientForIndex(index)} flex items-center justify-center`}>
            {getIconForCategory(caseData.category)}
          </div>
        )}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{caseData.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {caseData.subtitle}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);


  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);


  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    );

    const elements = document.querySelectorAll(".scroll-fade-in");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <ShaderBackground />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-7xl">
          <div className="text-xl font-bold">
            <span className="shimmer-text-smooth animate-shimmer-smooth">alfatápes</span>
          </div>
          <Button
            onClick={() => scrollToSection("contact")}
            variant="outline"
            size="icon"
            className="btn-glass rounded-full"
            data-testid="button-discuss-project"
          >
            <SendHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10"
          data-testid="video-hero-background"
        >
          <source src="/bg-hero.mp4" type="video/mp4" />
        </video>
        <SectionBackdrop opacity="medium" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="space-y-6 animate-float">
            <p className="text-sm tracking-widest uppercase text-muted-foreground font-semibold">
              Карельский Креативный Кластер
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-3xl mx-auto">
              Создаём цифровые продукты
            </h2>
            <div className="flex gap-4 justify-center items-center flex-wrap pt-8">
              <Button
                onClick={() => scrollToSection("services")}
                size="lg"
                className="btn-glass rounded-full text-lg px-8 py-6 font-bold"
                data-testid="button-what-we-do"
              >
                Мы делаем →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-32 px-6">
        <SectionBackdrop opacity="medium" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20 scroll-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">

            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">

            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">

            {/* 1. AI Интеграции */}
            <Link href="/service/ai-integrations">
              <ServiceCard 
                icon={<Brain className="w-12 h-12" strokeWidth={1.5} />}
                iconColor="text-rainbow-purple"
                title="AI Интеграции"
                description="Внедряем Ai-ассистентов в ваши бизнес-процессы. Чат-боты с искусственным интеллектом, автоматизация поддержки, интеграция с CRM и аналитикой."
                testId="card-service-ai-integrations"
                delay=""
              />
            </Link>

            {/* 2. Сайты и AI-боты */}
            <Link href="/service/websites-ai-bots">
              <ServiceCard 
                icon={<Globe className="w-12 h-12" strokeWidth={1.5} />}
                iconColor="text-rainbow-cyan"
                title="Сайты и AI-боты"
                description="Умные сайты с AI-интеграцией, телеграм боты для автоматизации продаж, BI-системы для анализа данных и принятия решений."
                testId="card-service-websites"
                delay=""
              />
            </Link>

            {/* 3. Приложения */}
            <Link href="/service/apps">
              <ServiceCard 
                icon={<Smartphone className="w-12 h-12" strokeWidth={1.5} />}
                iconColor="text-rainbow-teal"
                title="Приложения"
                description="WEB и PWA приложения, телеграм mini apps, для Вас и ваших клиентов."
                testId="card-service-apps"
                delay="scroll-fade-in-delay-1"
              />
            </Link>

            {/* 4. Дизайн и контент */}
            <Link href="/service/design-content">
              <ServiceCard 
                icon={<Palette className="w-12 h-12" strokeWidth={1.5} />}
                iconColor="text-rainbow-pink"
                title="Дизайн и контент"
                description="AI музыка, видео и дизайн - создаём комплексный и уникальный контент для вашего бренда."
                testId="card-service-design-content"
                delay="scroll-fade-in-delay-1"
              />
            </Link>

            {/* 5. Геймификация */}
            <Link href="/service/gamification">
              <ServiceCard 
                icon={<Gamepad2 className="w-12 h-12" strokeWidth={1.5} />}
                iconColor="text-rainbow-purple"
                title="Геймификация"
                description="Интерактивные решения для вовлечения клиентов: браузерные игры, механики лояльности, образовательные симуляторы для вашего бизнеса."
                testId="card-service-games"
                delay="scroll-fade-in-delay-2"
              />
            </Link>

            {/* 6. AI-SEO Аудит */}
            <Link href="/service/ai-seo">
              <ServiceCard 
                icon={<Search className="w-12 h-12" strokeWidth={1.5} />}
                iconColor="text-rainbow-orange"
                title="AI-SEO Аудит"
                description="Анализ и оптимизация вашего цифрового следа для AI-поисковиков."
                testId="card-service-seo"
                delay="scroll-fade-in-delay-2"
              />
            </Link>


          </div>
        </div>
      </section>



      {/* Portfolio Section */}
      <section id="portfolio" className="relative py-32 px-6">
        <SectionBackdrop opacity="medium" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20 scroll-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Проекты
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">

            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioCases.slice(0, 6).map((caseItem, index) => (
              <PortfolioCard key={caseItem.id} caseData={caseItem} index={index} />
            ))}
          </div>
        </div>
      </section>


      {/* Quiz Section */}
      <BusinessQuiz />

      {/* About Section */}
      <section className="relative py-32 px-6">
        <SectionBackdrop opacity="medium" />
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16 scroll-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Люди
            </h2>
          </div>

          {/* Intro */}
          <div className="mb-16 scroll-fade-in">
            <div className="liquid-glass p-8 md:p-12 rounded-3xl">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                <span className="font-bold text-foreground">alfatápes</span> — карельский креативный кластер, объединяющий профессионалов в области искусственного интеллекта, разработки и дизайна
              </p>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Наш подход — <span className="font-semibold text-foreground">стратегическое партнерство</span>: погружаемся в задачу, предлагаем решения на основе данных, сопровождаем проект
              </p>
            </div>
          </div>

          {/* Team Members */}
          <div className="scroll-fade-in">

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 justify-items-center">
              {[
                { name: "tape", avatar: tapeAvatar },
                { name: "mark", avatar: markAvatar },
                { name: "matt", avatar: mattAvatar },
                { name: "altagres", avatar: altagresAvatar },
                { name: "lovejoy", avatar: lovejoyAvatar },
                { name: "axek", avatar: axekAvatar },
                { name: "alex", avatar: alexAvatar },
                { name: "emulèta", avatar: emuletaAvatar },
              ].map((member, idx) => {
                const tiltRef = useTilt<HTMLDivElement>({
                  max: 15,
                  scale: 1.05,
                  glare: true,
                  maxGlare: 0.2,
                });

                return (
                  <div key={member.name} className="text-center scroll-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                    <div 
                      ref={tiltRef}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-3 mx-auto border-2 border-white/10 liquid-glass cursor-pointer"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">{member.name}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>




      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6">
        <SectionBackdrop opacity="medium" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center scroll-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Связаться
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">

            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                asChild
                size="lg"
                className="btn-glass rounded-full text-lg px-8 py-6 font-bold"
                data-testid="button-telegram"
              >
                <a
                  href="https://t.me/alfatapes"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram
                </a>
              </Button>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 rainbow-text">alfatápes</h3>
              <p className="text-sm text-muted-foreground">
                Карельский Креативный Кластер 
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/service/ai-integrations" className="hover:text-foreground transition-colors">
                    AI Интеграции
                  </Link>
                </li>
                <li>
                  <Link href="/service/gamification" className="hover:text-foreground transition-colors">
                    Геймификация
                  </Link>
                </li>
                <li>
                  <Link href="/service/design-content" className="hover:text-foreground transition-colors">
                    Дизайн и контент
                  </Link>
                </li>
                <li>
                  <Link href="/service/websites-ai-bots" className="hover:text-foreground transition-colors">
                    Сайты и AI-боты
                  </Link>
                </li>
                <li>
                  <Link href="/service/apps" className="hover:text-foreground transition-colors">
                    Приложения
                  </Link>
                </li>
                <li>
                  <Link href="/service/ai-seo" className="hover:text-foreground transition-colors">
                    AI-SEO Аудит
                  </Link>
                </li>

              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Проекты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/case/liniya-bi" className="hover:text-foreground transition-colors">
                    Сайт и BI для Линии
                  </Link>
                </li>
                <li>
                  <Link href="/case/online-editor" className="hover:text-foreground transition-colors">
                    Онлайн редактор
                  </Link>
                </li>
                <li>
                  <Link href="/case/flowers-on-mars" className="hover:text-foreground transition-colors">
                    Flowers on Mars
                  </Link>
                </li>
                <li>
                  <Link href="/case/honk-farcaster" className="hover:text-foreground transition-colors">
                    Honk! Farcaster
                  </Link>
                </li>
                <li>
                  <Link href="/case/pinball-allstars" className="hover:text-foreground transition-colors">
                    Pinball: All Stars
                  </Link>
                </li>
                <li>
                  <Link href="/case/alfatuna" className="hover:text-foreground transition-colors">
                    alfatuna
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Связаться</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://t.me/alfatapes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    Telegram

                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 alfatápes</p>
            <p className="mt-2">
              <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                Политика конфиденциальности
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}