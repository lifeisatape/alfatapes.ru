import { useParams, Link, useLocation } from "wouter";
import { servicesData } from "@shared/services-data";
import { ArrowLeft, Brain, Gamepad2, Music, Video, Globe, Smartphone, Search, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef } from "react";
import { ShaderBackground } from "@/components/ShaderBackground";
import { SectionBackdrop } from "@/components/SectionBackdrop";
import { MusicPlayer } from "@/components/MusicPlayer";

const iconMap = {
  Brain,
  Gamepad2,
  Music,
  Video,
  Globe,
  Smartphone,
  Search,
  Palette
};

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const currentService = servicesData.find(s => s.id === id);
  const otherServices = servicesData.filter(s => s.id !== id && !['ai-music', 'ai-video', 'design'].includes(s.id));
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // For the combined design-content service, show all three separate services as tabs/sections
  const isDesignContentService = id === 'design-content';
  const separateServices = isDesignContentService ? 
    servicesData.filter(s => ['ai-music', 'ai-video', 'design'].includes(s.id)) : [];

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

  if (!currentService) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ShaderBackground />
        <div className="text-center relative z-10">
          <h1 className="text-4xl font-bold mb-4">Услуга не найдена</h1>
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

  const Icon = iconMap[currentService.iconName as keyof typeof iconMap];

  return (
    <div className="min-h-screen relative" ref={scrollRef}>
      <ShaderBackground />
      <SectionBackdrop opacity="medium" />
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20 relative z-0">
        <Button 
          variant="ghost" 
          className="mb-8 group"
          data-testid="button-back-services"
          onClick={() => {
            setLocation("/");
            setTimeout(() => {
              const servicesSection = document.getElementById("services");
              if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: "smooth" });
              }
            }, 300);
          }}
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Все услуги
        </Button>

        <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
          <div className={`mb-8 ${currentService.iconColor}`}>
            <Icon className="w-16 h-16 md:w-20 md:h-20" strokeWidth={1.5} />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            {currentService.title}
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            {currentService.subtitle}
          </p>

          
        </div>

        <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 delay-100 mb-16">
          <div className="liquid-glass p-8 md:p-12 rounded-3xl">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {currentService.detailedDescription}
            </p>
          </div>
        </div>

        <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 delay-200 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Что мы предлагаем</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {currentService.features.map((feature, idx) => (
              <div 
                key={idx}
                className="liquid-glass p-6 rounded-2xl hover-elevate transition-all duration-300"
                data-testid={`feature-${idx}`}
              >
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></span>
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        

        <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 delay-300 mb-16">
          <div className="liquid-glass p-8 md:p-12 rounded-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Преимущества</h2>
            <ul className="space-y-4">
              {currentService.benefits.map((benefit, idx) => (
                <li 
                  key={idx} 
                  className="flex items-start gap-3 text-lg"
                  data-testid={`benefit-${idx}`}
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 mt-2 flex-shrink-0"></span>
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        

        {currentService.musicTracks && currentService.musicTracks.length > 0 && (
          <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 delay-450 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Послушайте примеры</h2>
            <MusicPlayer tracks={currentService.musicTracks} />
          </div>
        )}

        

        

        {otherServices.length > 0 && (
          <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 delay-700">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Что ещё мы делаем
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherServices.slice(0, 6).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        )}

        <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 delay-800 mt-20">
          
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Связаться
            </h2>
           
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                asChild
                size="lg"
                className="btn-glass rounded-full text-lg px-8 py-6 font-bold"
                data-testid="button-telegram-contact"
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
    </div>
  );
}

function ServiceCard({ service }: { service: typeof servicesData[0] }) {
  const Icon = iconMap[service.iconName as keyof typeof iconMap];

  return (
    <Link href={`/service/${service.id}`}>
      <div
        className="liquid-glass liquid-glass-hover rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:-translate-y-2 iridescent-border cursor-pointer h-full"
        data-testid={`service-card-${service.id}`}
      >
        <div className={`mb-6 ${service.iconColor}`}>
          <Icon className="w-12 h-12" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {service.description}
        </p>
        
      </div>
    </Link>
  );
}
