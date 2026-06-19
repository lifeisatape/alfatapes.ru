import { useEffect } from "react";
import { ArrowRight, Send } from "lucide-react";

const BOT_URL = "https://t.me/yo_tapes_bot";
const MOSCOW_URL = "https://tapes.moscow";

const slides = [
  {
    title: "alfatapes",
    accent: "умные инструменты для бизнеса",
    body: "Боты, агенты и системы для ежедневной работы.",
    cta: "bot",
  },
  {
    title: "Собираем продукты",
    accent: "вокруг реальной работы",
    body: "Подключаем ботов, сайты, задачи и аналитику так, чтобы заявки, контекст и следующий шаг всегда были под вашим контролем.",
  },
  {
    title: "tapes",
    accent: "один экран вместо пяти чатов",
    body: "Готовые инструменты для совместной работы людей и агентов в простом приложении. Одно кольцо, чтобы править всеми.",
    cta: "tapes",
  },
  {
    title: "Дайте знать",
    accent: "если теряется контекст",
    body: "Если есть поток заявок, команда, клиенты или проект, где важное распадается между чатами, задачами и заметками.",
    partners: ["МФЦН", "КОН", "ЛИНИЯ", "ИСКРА"],
    cta: "bot",
  },
];

export default function Home() {
  useEffect(() => {
    const rail = document.getElementById("alfStoryRail");
    const dots = Array.from(document.querySelectorAll("[data-story-dot]"));
    if (!rail) return;

    let current = 0;

    const setActive = (index: number) => {
      current = Math.max(0, Math.min(slides.length - 1, index));
      dots.forEach((dot, dotIndex) => {
        dot.setAttribute("data-active", dotIndex <= current ? "true" : "false");
      });
    };

    const syncFromScroll = () => {
      const width = rail.clientWidth || 1;
      setActive(Math.round(rail.scrollLeft / width));
    };

    const goTo = (index: number) => {
      const width = rail.clientWidth || 1;
      const next = Math.max(0, Math.min(slides.length - 1, index));
      rail.scrollTo({ left: width * next, behavior: "smooth" });
      setActive(next);
    };

    const onRailClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button")) return;
      goTo(event.clientX > window.innerWidth / 2 ? current + 1 : current - 1);
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goTo(current + 1);
      if (event.key === "ArrowLeft") goTo(current - 1);
    };

    rail.addEventListener("scroll", syncFromScroll, { passive: true });
    rail.addEventListener("click", onRailClick);
    window.addEventListener("keydown", onKey);
    setActive(0);

    return () => {
      rail.removeEventListener("scroll", syncFromScroll);
      rail.removeEventListener("click", onRailClick);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <main className="alfStoryPage">
      <video className="alfStoryVideo" autoPlay loop muted playsInline aria-hidden="true">
        <source src="/bg-hero.mp4" type="video/mp4" />
      </video>
      <div className="alfStoryShade" aria-hidden="true" />

      <header className="alfStoryTop">
        <a className="alfStoryBrand" href="#start" aria-label="alfatapes home">
          alfatápes
        </a>
        <nav className="alfStoryNav" aria-label="main">
          <a href="#product">пример</a>
          <a href={BOT_URL} target="_blank" rel="noopener noreferrer">
            бот
          </a>
        </nav>
      </header>

      <div className="alfStoryProgress" aria-hidden="true">
        {slides.map((slide) => (
          <span key={slide.title} data-story-dot />
        ))}
      </div>

      <section id="alfStoryRail" className="alfStoryRail" aria-label="alfatapes story">
        {slides.map((slide, index) => (
          <article
            key={slide.title}
            id={slide.cta === "tapes" ? "product" : undefined}
            className={`alfStorySlide${slide.cta ? " isProduct" : ""}`}
          >
            <div className="alfStoryContent">
              <h1 className={index === 0 ? "alfStoryTitle isHero" : "alfStoryTitle"}>
                {slide.title}
                <span>{slide.accent}</span>
              </h1>
              <p className="alfStoryBody">{slide.body}</p>

              {slide.partners && (
                <div className="alfPartnerLine" aria-label="Партнёры">
                  <span>Партнёры:</span>
                  <strong>{slide.partners.join(" · ")}</strong>
                </div>
              )}

              {slide.cta && (
                <div className="alfProductProof">
                  <div className="alfProductActions">
                    {slide.cta === "tapes" ? (
                      <a className="alfProductButton isPrimary" href={MOSCOW_URL} target="_blank" rel="noopener noreferrer">
                        перейти <ArrowRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <a className="alfProductButton isPrimary" href={BOT_URL} target="_blank" rel="noopener noreferrer">
                        написать нам <span>@yo_tapes_bot</span> <Send className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </section>

    </main>
  );
}
