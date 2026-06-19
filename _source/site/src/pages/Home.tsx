import { useEffect } from "react";
import { ArrowRight, Send } from "lucide-react";

const BOT_URL = "https://t.me/yo_tapes_bot";
const MOSCOW_URL = "https://tapes.moscow";
const MOSCOW_TG_URL = "https://t.me/tapesmoscow";

const slides = [
  {
    title: "alfatápes",
    accent: "делает AI-продукты, которые остаются в работе",
    body: "Не витрина возможностей. Не набор кейсов. Мы собираем живые операционные контуры: бот, память, задачи, подтверждение и понятный следующий шаг.",
  },
  {
    title: "Обычный AI быстро становится шумом",
    accent: "если он не связан с реальностью бизнеса",
    body: "Люди пишут в Telegram, решения теряются в созвонах, CRM живёт отдельно, а собственник снова держит контекст в голове.",
  },
  {
    title: "Мы проектируем не бота",
    accent: "а управляемый вход в систему",
    body: "Пользователь пишет привычным языком. Агент собирает контекст, готовит действие, человек подтверждает. Всё остаётся в истории, задачах и памяти.",
  },
  {
    title: "tapes.Moscow",
    accent: "первый публичный продукт в этом формате",
    body: "Городские истории, партнёры и вход через Telegram.",
    product: true,
  },
  {
    title: "Формат переносится",
    accent: "на бизнес, сообщество, проект или город",
    body: "Один и тот же принцип: найти поток, где теряется внимание, и собрать рядом с ним AI-слой с человеческим контролем.",
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
          <a href="#product">tapes.Moscow</a>
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
            id={slide.product ? "product" : undefined}
            className={`alfStorySlide${slide.product ? " isProduct" : ""}`}
          >
            <div className="alfStoryContent">
              <h1 className={index === 0 ? "alfStoryTitle isHero" : "alfStoryTitle"}>
                {slide.title}
                <span>{slide.accent}</span>
              </h1>
              <p className="alfStoryBody">{slide.body}</p>

              {slide.product && (
                <div className="alfProductProof">
                  <div>
                    <strong>tapes.Moscow</strong>
                  </div>
                  <p>живой продукт alfatápes</p>
                  <div className="alfProductActions">
                    <a className="alfProductButton isPrimary" href={MOSCOW_URL} target="_blank" rel="noopener noreferrer">
                      сайт <ArrowRight className="h-4 w-4" />
                    </a>
                    <a className="alfProductButton" href={MOSCOW_TG_URL} target="_blank" rel="noopener noreferrer">
                      @tapesmoscow <Send className="h-4 w-4" />
                    </a>
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
