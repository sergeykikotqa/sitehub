import type { Project } from "@/types/content";

export type CasePresentationMode = "system" | "editorial";

export type CaseVisualAsset = {
  src: string;
  alt: string;
  aspect: "wide" | "landscape" | "portrait" | "square";
  objectPosition?: string;
  caption?: string;
};

type CaseOverviewItem = {
  label: string;
  value: string;
};

type CaseVisualSet = {
  home: CaseVisualAsset;
  portfolio: CaseVisualAsset;
  lead: CaseVisualAsset;
  gallery: [CaseVisualAsset, CaseVisualAsset, CaseVisualAsset];
  og: {
    src: string;
    objectPosition?: string;
  };
};

export type CasePresentationConfig = {
  mode: CasePresentationMode;
  roleLabel: string;
  compareTitle: string;
  compareSummary: string;
  portfolioSummary: string;
  heroStatement: string;
  heroCaption: string;
  heroLabels: [string, string];
  overview: [CaseOverviewItem, CaseOverviewItem, CaseOverviewItem, CaseOverviewItem];
  signals: [string, string, string, string];
  visualAssets: CaseVisualSet;
  ctaCopy: {
    title: string;
    description: string;
    tone?: "light" | "dark";
  };
};

const casePresentations: Record<string, CasePresentationConfig> = {
  mblmaster: {
    mode: "system",
    roleLabel: "Системный сценарий",
    compareTitle: "Сайт, который собирает коммерческий маршрут",
    compareSummary:
      "MBLMaster нужен не для красивого первого экрана, а для спокойной воронки: ассортимент, видео, кейсы и локальный спрос держатся как одна система.",
    portfolioSummary:
      "MBLMaster показывает рациональный формат сайта для мебельного бизнеса: категории распределяют интерес, видео и кейсы усиливают доверие, локальные блоки поддерживают SEO.",
    heroStatement:
      "Этот кейс выстроен как коммерческий маршрут. Он ведёт человека от оффера к категории, от категории к доверию, а затем к понятной заявке без хаоса и лишних ответвлений.",
    heroCaption:
      "Коммерческий сайт под мебель на заказ в Иркутске, где оффер, ассортимент, видеообзоры и trust-механики складываются в один спокойный сценарий.",
    heroLabels: ["Коммерческий маршрут", "Категории и видео"],
    overview: [
      {
        label: "Формат",
        value: "Многостраничный коммерческий сайт",
      },
      {
        label: "Роль",
        value: "Собрать ассортимент, доверие и локальный спрос",
      },
      {
        label: "Ключевой ход",
        value: "Категории, кейсы и видеообзоры внутри одного маршрута",
      },
      {
        label: "Ритм",
        value: "Ровный, спокойный, рациональный",
      },
    ],
    signals: ["категории", "кейсы", "видеообзоры", "локальный спрос"],
    visualAssets: {
      home: {
        src: "/uploads/mblmaster-lead.png",
        alt: "Первый экран MBLMaster с оффером и заявкой на замер",
        aspect: "wide",
        caption:
          "Домашний тизер сразу показывает, что кейс начинается с понятного оффера и прямого входа в расчёт проекта.",
      },
      portfolio: {
        src: "/uploads/mblmaster-videos.png",
        alt: "Видеообзоры и контентные блоки MBLMaster",
        aspect: "landscape",
        caption:
          "Видеообзоры и кейсы работают как доказательство, а не как декоративный контент.",
      },
      lead: {
        src: "/uploads/mblmaster-lead.png",
        alt: "Первый экран MBLMaster с оффером и заявкой на замер",
        aspect: "wide",
        caption:
          "Первый экран сразу ставит человека в коммерческий контекст: замер, расчёт и понятный оффер находятся на первом плане.",
      },
      gallery: [
        {
          src: "/uploads/mblmaster-categories.png",
          alt: "Категории MBLMaster с быстрым распределением по задачам",
          aspect: "landscape",
          caption:
            "Категории закрывают главный сценарий выбора без дополнительной навигационной нагрузки.",
        },
        {
          src: "/uploads/mblmaster-videos.png",
          alt: "Видеообзоры и кейсы на сайте MBLMaster",
          aspect: "landscape",
          caption:
            "Видео и кейсы доказывают опыт на реальных проектах и удерживают доверие глубже по скроллу.",
        },
        {
          src: "/uploads/mblmaster-trust.png",
          alt: "Боковая колонка MBLMaster с CTA и trust-блоками",
          aspect: "portrait",
          caption:
            "Отдельный акцент на CTA и обещании замера помогает быстро перейти из просмотра в действие.",
        },
      ],
      og: {
        src: "/uploads/mblmaster-og.png",
        objectPosition: "center top",
      },
    },
    ctaCopy: {
      title: "Подберём системный коммерческий маршрут",
      description:
        "Если задаче нужен ассортимент, доверие и локальный спрос, соберём сайт, который ведёт человека к заявке без случайных блоков и лишних веток.",
      tone: "light",
    },
  },
  criatevmebel: {
    mode: "editorial",
    roleLabel: "Короткий лендинг",
    compareTitle: "Лендинг, который держится на ритме",
    compareSummary:
      "MESTO не строит каталог. Он сокращает сценарий до ощущения качества, двух proof-сцен и одного аккуратного входа в Telegram.",
    portfolioSummary:
      "MESTO показывает другой тип решения для той же ниши: меньше навигации, меньше объяснений и больше ощущения, что подходящий формат уже найден.",
    heroStatement:
      "Этот кейс работает быстро и плотно. Он не растягивает аргументацию, а сначала создаёт нужный тон, затем показывает proof и рано предлагает войти в диалог.",
    heroCaption:
      "Короткий лендинг для мебели на заказ, где основное доверие строится через ритм, доказательство «было → стало» и один понятный CTA.",
    heroLabels: ["Быстрый лендинг", "Proof и ритм"],
    overview: [
      {
        label: "Формат",
        value: "Короткий лендинг с плотным ритмом",
      },
      {
        label: "Роль",
        value: "Передать ощущение качества без каталожного шума",
      },
      {
        label: "Ключевой ход",
        value: "Proof-сцены и один Telegram CTA",
      },
      {
        label: "Ритм",
        value: "Быстрый, собранный, эмоциональный",
      },
    ],
    signals: ["один CTA", "proof-сцены", "ритм", "короткий путь"],
    visualAssets: {
      home: {
        src: "/uploads/mesto-lead.png",
        alt: "Первый экран MESTO с большим заголовком и CTA",
        aspect: "wide",
        caption:
          "Домашний тизер сразу показывает главный ход кейса: атмосфера, крупный оффер и один короткий вход в диалог.",
      },
      portfolio: {
        src: "/uploads/mesto-proof-flow.png",
        alt: "Proof-блоки и narrative-flow MESTO",
        aspect: "landscape",
        caption:
          "На странице важнее не список преимуществ, а быстрый переход в сцены, где решение доказывает себя визуально.",
      },
      lead: {
        src: "/uploads/mesto-lead.png",
        alt: "Первый экран MESTO с большим заголовком и CTA",
        aspect: "wide",
        caption:
          "Первый экран почти не спорит и не объясняет. Он задаёт тон и тут же показывает короткий вход в разговор.",
      },
      gallery: [
        {
          src: "/uploads/mesto-proof-card.png",
          alt: "Proof-card на первом экране MESTO",
          aspect: "portrait",
          caption:
            "Доказательство встроено прямо в первый экран, поэтому лендинг не теряет темп на длинном подводящем тексте.",
        },
        {
          src: "/uploads/mesto-proof-flow.png",
          alt: "Proof-блоки и narrative-flow MESTO",
          aspect: "landscape",
          caption:
            "Скролл быстро переходит в сцены «было → стало», где формат доказывает себя визуально.",
        },
        {
          src: "/uploads/mesto-hero-type.png",
          alt: "Левая типографическая часть лендинга MESTO",
          aspect: "portrait",
          caption:
            "Большой заголовок и свободное поле помогают передать ощущение дорогого решения без перегруза интерфейсом.",
        },
      ],
      og: {
        src: "/uploads/mesto-og.png",
        objectPosition: "center top",
      },
    },
    ctaCopy: {
      title: "Соберём короткий лендинг с характером",
      description:
        "Если бизнесу нужен быстрый вход в диалог и ощущение качества без тяжёлой сетки, соберём плотную страницу с proof-блоками и одним главным действием.",
      tone: "dark",
    },
  },
};

export function getCasePresentation(project: Project) {
  return casePresentations[project.slug] ?? casePresentations.mblmaster;
}
