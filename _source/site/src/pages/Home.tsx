import { useEffect } from "react";
import { ArrowRight, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const BOT_URL = "https://t.me/yo_tapes_bot";

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
    body: "Истории, партнёры, городская энергия и вход через бота. Не презентация на десять экранов, а живой слой, куда можно зайти и начать диалог.",
    product: true,
  },
  {
    title: "Формат переносится",
    accent: "на бизнес, сообщество, проект или город",
    body: "Один и тот же принцип: найти поток, где теряется внимание, и собрать рядом с ним AI-слой с человеческим контролем.",
  },
  {
    title: "Начать можно с одного разговора",
    accent: "бот соберёт контекст и передаст его дальше",
    body: "Расскажи, где у тебя теряются заявки, решения или контент. Мы превратим это в первый рабочий сценарий.",
    final: true,
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

    const onZoneClick = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      goTo(target.dataset.storyZone === "next" ? current + 1 : current - 1);
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goTo(current + 1);
      if (event.key === "ArrowLeft") goTo(current - 1);
    };

    const zones = Array.from(document.querySelectorAll("[data-story-zone]"));
    zones.forEach((zone) => zone.addEventListener("click", onZoneClick));
    rail.addEventListener("scroll", syncFromScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    setActive(0);

    return () => {
      zones.forEach((zone) => zone.removeEventListener("click", onZoneClick));
      rail.removeEventListener("scroll", syncFromScroll);
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
            id={slide.product ? "product" : slide.final ? "contact" : undefined}
            className={`alfStorySlide${slide.product ? " isProduct" : ""}${slide.final ? " isFinal" : ""}`}
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
                  <p>story-first AI surface для партнёров, города и входа через Telegram-бота.</p>
                  <a href="https://tapes.moscow" target="_blank" rel="noopener noreferrer">
                    открыть tapes.moscow <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              )}

              {slide.final && (
                <div className="alfFinalActions">
                  <Button asChild className="alfPrimaryButton">
                    <a href={BOT_URL} target="_blank" rel="noopener noreferrer">
                      <Bot className="h-4 w-4" />
                      написать боту
                    </a>
                  </Button>
                  <a className="alfTextLink" href="https://tapes.moscow" target="_blank" rel="noopener noreferrer">
                    посмотреть tapes.Moscow
                  </a>
                </div>
              )}
            </div>
          </article>
        ))}
      </section>

      <button className="alfTapZone left" type="button" aria-label="previous story" data-story-zone="prev" />
      <button className="alfTapZone right" type="button" aria-label="next story" data-story-zone="next" />
    </main>
  );
}
