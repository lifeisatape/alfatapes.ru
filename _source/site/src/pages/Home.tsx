import { ArrowRight, Bot, Building2, Check, MapPinned, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const BOT_URL = "https://t.me/yo_tapes_bot";

const slides = [
  {
    eyebrow: "00 / 07",
    title: "alfatápes",
    accent: "делает AI-продукты, которые остаются в работе",
    body: "Не витрина возможностей. Не набор кейсов. Мы собираем живые операционные контуры: бот, память, задачи, approval и понятный следующий шаг.",
    lines: ["product studio", "AI operations", "human approval", "business memory"],
  },
  {
    eyebrow: "01 / 07",
    title: "Обычный AI быстро становится шумом",
    accent: "если он не связан с реальностью бизнеса",
    body: "Люди пишут в Telegram, решения теряются в созвонах, CRM живёт отдельно, а собственник снова держит контекст в голове.",
    lines: ["чат отдельно", "CRM отдельно", "задачи отдельно", "ответственность в голове"],
  },
  {
    eyebrow: "02 / 07",
    title: "Мы проектируем не бота",
    accent: "а управляемый вход в систему",
    body: "Пользователь пишет привычным языком. Агент собирает контекст, готовит действие, человек подтверждает. Всё остаётся в истории, задачах и памяти.",
    lines: ["message", "draft", "approve", "publish / task / follow-up"],
  },
  {
    eyebrow: "03 / 07",
    title: "tapes.Moscow",
    accent: "первый публичный продукт в этом формате",
    body: "Истории, партнёры, городская энергия и вход через бота. Не презентация на десять экранов, а живой слой, куда можно зайти и начать диалог.",
    lines: ["story format", "telegram bot", "partner layer", "public proof"],
    product: true,
  },
  {
    eyebrow: "04 / 07",
    title: "Формат переносится",
    accent: "на бизнес, сообщество, проект или город",
    body: "Один и тот же принцип: найти поток, где теряется внимание, и собрать рядом с ним AI-слой с человеческим контролем.",
    lines: ["lead intake", "content approval", "client memory", "delivery loop"],
  },
  {
    eyebrow: "05 / 07",
    title: "Мы оставляем только то, что можно проверить",
    accent: "бот, артефакт, лог, статус, следующий шаг",
    body: "AI без границ опасен. AI без памяти бесполезен. Нам нужен третий режим: быстрый агент, понятные правила и человек на решающих действиях.",
    lines: ["approval-first", "logs", "proof", "control"],
  },
  {
    eyebrow: "06 / 07",
    title: "Начать можно с одного разговора",
    accent: "бот соберёт контекст и передаст его дальше",
    body: "Расскажи, где у тебя теряются заявки, решения или контент. Мы превратим это в первый рабочий сценарий.",
    lines: ["open bot", "describe flow", "get next step"],
    final: true,
  },
];

const principles = [
  { icon: <Bot className="h-5 w-5" />, label: "бот как вход" },
  { icon: <ShieldCheck className="h-5 w-5" />, label: "human approval" },
  { icon: <Building2 className="h-5 w-5" />, label: "продукт вместо кейс-галереи" },
  { icon: <MapPinned className="h-5 w-5" />, label: "tapes.Moscow как proof" },
];

export default function Home() {
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
          <a href="#principles">подход</a>
          <a href={BOT_URL} target="_blank" rel="noopener noreferrer">
            бот
          </a>
        </nav>
      </header>

      <div className="alfStoryProgress" aria-hidden="true">
        {slides.map((slide) => (
          <span key={slide.eyebrow} />
        ))}
      </div>

      <section id="start" className="alfStoryRail" aria-label="alfatapes story">
        {slides.map((slide, index) => (
          <article
            key={slide.eyebrow}
            id={slide.product ? "product" : slide.final ? "contact" : undefined}
            className={`alfStorySlide${slide.product ? " isProduct" : ""}${slide.final ? " isFinal" : ""}`}
          >
            <div className="alfStorySystem" aria-hidden="true">
              {slide.lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>

            <div className="alfStoryContent">
              <p className="alfStoryEyebrow">{slide.eyebrow}</p>
              <h1 className={index === 0 ? "alfStoryTitle isHero" : "alfStoryTitle"}>
                {slide.title}
                <span>{slide.accent}</span>
              </h1>
              <p className="alfStoryBody">{slide.body}</p>

              {slide.product && (
                <div className="alfProductProof">
                  <div>
                    <span className="alfProofLabel">product</span>
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

      <section id="principles" className="alfPrinciples" aria-label="alfatapes principles">
        {principles.map((item) => (
          <div className="alfPrinciple" key={item.label}>
            {item.icon}
            <span>{item.label}</span>
            <Check className="h-4 w-4" />
          </div>
        ))}
      </section>
    </main>
  );
}
