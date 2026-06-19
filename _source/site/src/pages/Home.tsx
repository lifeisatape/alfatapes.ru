import { useEffect } from "react";
import { ArrowRight, Send } from "lucide-react";

const BOT_URL = "https://t.me/yo_tapes_bot";
const MOSCOW_URL = "https://tapes.moscow";

const slides = [
  {
    title: "alfatápes",
    accent: "порядок в заявках, клиентах и задачах за 7 дней",
    body: "Настраиваем рабочий контур вокруг ваших чатов, сайта и CRM: заявки не теряются, следующий шаг виден, руководитель понимает, что происходит.",
  },
  {
    title: "Не новая CRM",
    accent: "не ещё один чат",
    body: "Мы не заставляем команду переезжать в новую систему. Сначала смотрим, где сейчас теряются заявки, договорённости и задачи — и закрываем это место.",
  },
  {
    title: "Заявки теряются не потому",
    accent: "что люди плохие",
    body: "Просто всё живёт в разных местах: Telegram, сайт, CRM, голосовые, созвоны и личные заметки. Контекст не собирается сам.",
  },
  {
    title: "Собираем первый",
    accent: "рабочий контур",
    body: "Заявка приходит из чата или формы, попадает в понятное место, получает ответственного, следующий шаг и напоминание. Важные действия подтверждает человек.",
  },
  {
    title: "Первый результат",
    accent: "за неделю",
    body: "За 7 дней можно запустить простой сценарий: заявки из Telegram или сайта, карточка клиента, задача менеджеру и контроль следующего шага.",
  },
  {
    title: "Подходит",
    accent: "если работа уже идёт в чатах",
    body: "Малый бизнес, агентство, сервисная команда, локальный проект или сообщество — везде, где люди пишут, договариваются и потом теряют продолжение.",
    cta: true,
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
            id={slide.cta ? "product" : undefined}
            className={`alfStorySlide${slide.cta ? " isProduct" : ""}`}
          >
            <div className="alfStoryContent">
              <h1 className={index === 0 ? "alfStoryTitle isHero" : "alfStoryTitle"}>
                {slide.title}
                <span>{slide.accent}</span>
              </h1>
              <p className="alfStoryBody">{slide.body}</p>

              {slide.cta && (
                <div className="alfProductProof">
                  <div>
                    <strong>разобрать ваш контур</strong>
                  </div>
                  <p>Пример подхода: tapes.Moscow — публичный продукт, где Telegram становится входом в рабочий сценарий.</p>
                  <div className="alfProductActions">
                    <a className="alfProductButton isPrimary" href={BOT_URL} target="_blank" rel="noopener noreferrer">
                      написать в Telegram <Send className="h-4 w-4" />
                    </a>
                    <a className="alfProductButton" href={MOSCOW_URL} target="_blank" rel="noopener noreferrer">
                      посмотреть пример <ArrowRight className="h-4 w-4" />
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
