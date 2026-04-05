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

type HomeScenarioCopy = {
  label: string;
  title: string;
  diagnosis: string;
  primaryCta: string;
  secondaryCta: string;
  systemWhyItWorks?: string;
  systemProofLead?: string;
  editorialProofFirst?: string;
  editorialInterpretation?: string;
};

type PortfolioScenarioCopy = {
  label: string;
  title: string;
  situation: string;
  primaryCta: string;
  secondaryCta: string;
  systemWhyItWorks?: string;
  systemProof?: string;
  editorialProofFirst?: string;
  editorialInterpretation?: string;
};

type DetailScenarioCopy = {
  entryTitle: string;
  entryCopy: string;
  context: string;
  primaryCta: string;
  secondaryCta: string;
  systemProblem?: string;
  systemLogic?: string;
  systemProof?: string;
  editorialProof?: string;
  editorialWhyItWorks?: string;
  closingTitle?: string;
  closingDescription?: string;
};

export type CasePresentationConfig = {
  mode: CasePresentationMode;
  roleLabel: string;
  overview: [CaseOverviewItem, CaseOverviewItem, CaseOverviewItem, CaseOverviewItem];
  signals: [string, string, string, string];
  visualAssets: CaseVisualSet;
  home: HomeScenarioCopy;
  portfolio: PortfolioScenarioCopy;
  detail: DetailScenarioCopy;
};

const casePresentations: Record<string, CasePresentationConfig> = {
  mblmaster: {
    mode: "system",
    roleLabel: "Системный формат",
    overview: [
      {
        label: "Формат",
        value: "Многостраничный коммерческий сайт",
      },
      {
        label: "Роль",
        value: "Помогает выбрать и спокойно доводит до заявки",
      },
      {
        label: "Ключевой ход",
        value: "Категории, видео и контент складываются в один маршрут",
      },
      {
        label: "Ритм",
        value: "Ровный, рациональный, объясняющий",
      },
    ],
    signals: ["категории", "контент", "доверие", "длинный путь"],
    visualAssets: {
      home: {
        src: "/uploads/mblmaster-lead.webp",
        alt: "Первый экран MBLMaster с оффером и заявкой на замер",
        aspect: "wide",
        caption:
          "Первый экран сразу показывает, что кейс начинается с понятного оффера и прямого входа в расчёт проекта.",
      },
      portfolio: {
        src: "/uploads/mblmaster-videos.webp",
        alt: "Видеообзоры и контентные блоки MBLMaster",
        aspect: "landscape",
        caption:
          "Видеообзоры и кейсы работают как доказательство, а не как декоративный контент.",
      },
      lead: {
        src: "/uploads/mblmaster-lead.webp",
        alt: "Первый экран MBLMaster с оффером и заявкой на замер",
        aspect: "wide",
        caption:
          "Первый экран сразу ставит человека в коммерческий контекст: замер, расчёт и понятный оффер находятся на первом плане.",
      },
      gallery: [
        {
          src: "/uploads/mblmaster-categories.webp",
          alt: "Категории MBLMaster с быстрым распределением по задачам",
          aspect: "landscape",
          caption:
            "Категории закрывают главный сценарий выбора без дополнительной навигационной нагрузки.",
        },
        {
          src: "/uploads/mblmaster-videos.webp",
          alt: "Видеообзоры и кейсы на сайте MBLMaster",
          aspect: "landscape",
          caption:
            "Видео и кейсы доказывают опыт на реальных проектах и удерживают доверие глубже по скроллу.",
        },
        {
          src: "/uploads/mblmaster-trust.webp",
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
    home: {
      label: "Системный формат",
      title: "Когда сайт помогает разобраться и доводит до заявки",
      diagnosis:
        "Много позиций. Клиент сравнивает. Нужно объяснить различия, снять сомнения и выстроить путь к решению.",
      systemWhyItWorks:
        "Такой сайт работает как структура: помогает выбрать, показывает логику, усиливает доверие и постепенно приводит к заявке.",
      systemProofLead:
        "На примере MBLMaster: каталог, категории, видео и контентные блоки работают как часть маршрута.",
      primaryCta: "Хочу системный сайт",
      secondaryCta: "Разобрать кейс",
    },
    portfolio: {
      label: "Системный формат",
      title: "Когда сайт помогает разобраться и доводит до заявки",
      situation:
        "Клиенту нужно сравнить варианты, понять различия и принять решение без давления.",
      systemWhyItWorks:
        "Сайт выстраивает маршрут: выбор → понимание → доверие → заявка.",
      systemProof:
        "MBLMaster: структура каталога, категории и контентные блоки помогают пройти этот путь.",
      primaryCta: "Подходит системный формат",
      secondaryCta: "Разобрать кейс",
    },
    detail: {
      entryTitle: "Сайт для сложного выбора и длинного пути к заявке",
      entryCopy:
        "Здесь клиент не принимает решение сразу. Ему нужно разобраться, сравнить и понять, что именно ему подходит.",
      context:
        "Коммерческий сайт под мебель на заказ, где структура работает не на вау-эффект, а на понятный маршрут к заявке.",
      systemProblem:
        "Обычный лендинг не работает: он не даёт достаточно информации и не помогает выбрать.",
      systemLogic:
        "Поэтому сайт выстраивается как система: структура, категории, контент — всё работает на понимание и доверие.",
      systemProof:
        "Каталог, видео, блоки с примерами — это не декор, а часть маршрута к решению.",
      primaryCta: "Хочу такой сайт под свою задачу",
      secondaryCta: "Посмотреть быстрый формат",
      closingTitle: "Соберём системный маршрут под вашу задачу",
      closingDescription:
        "Если человеку нужно сравнить варианты, разобраться и спокойно дойти до решения, такой формат работает лучше короткого лендинга.",
    },
  },
  criatevmebel: {
    mode: "editorial",
    roleLabel: "Быстрый лендинг",
    overview: [
      {
        label: "Формат",
        value: "Короткий лендинг с плотным ритмом",
      },
      {
        label: "Роль",
        value: "Быстро зацепить и сократить путь до контакта",
      },
      {
        label: "Ключевой ход",
        value: "Первый экран, proof-сцены и один Telegram CTA",
      },
      {
        label: "Ритм",
        value: "Быстрый, импульсный, собранный",
      },
    ],
    signals: ["первый экран", "плотность", "ритм", "один CTA"],
    visualAssets: {
      home: {
        src: "/uploads/mesto-lead.webp",
        alt: "Первый экран MESTO с большим заголовком и CTA",
        aspect: "wide",
        caption:
          "Первый экран сразу показывает главный ход кейса: атмосфера, крупный оффер и один короткий вход в диалог.",
      },
      portfolio: {
        src: "/uploads/mesto-proof-flow.webp",
        alt: "Proof-блоки и narrative-flow MESTO",
        aspect: "landscape",
        caption:
          "На странице важнее не список преимуществ, а быстрый переход в сцены, где решение доказывает себя визуально.",
      },
      lead: {
        src: "/uploads/mesto-lead.webp",
        alt: "Первый экран MESTO с большим заголовком и CTA",
        aspect: "wide",
        caption:
          "Первый экран почти не спорит и не объясняет. Он задаёт тон и тут же показывает короткий вход в разговор.",
      },
      gallery: [
        {
          src: "/uploads/mesto-proof-card.webp",
          alt: "Proof-card на первом экране MESTO",
          aspect: "portrait",
          caption:
            "Доказательство встроено прямо в первый экран, поэтому лендинг не теряет темп на длинном подводящем тексте.",
        },
        {
          src: "/uploads/mesto-proof-flow.webp",
          alt: "Proof-блоки и narrative-flow MESTO",
          aspect: "landscape",
          caption:
            "Скролл быстро переходит в сцены «было → стало», где формат доказывает себя визуально.",
        },
        {
          src: "/uploads/mesto-hero-type.webp",
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
    home: {
      label: "Быстрый лендинг",
      title: "Когда важно зацепить сразу и быстро привести к контакту",
      diagnosis:
        "Один оффер. Решение принимается быстро. Нужно сразу захватить внимание и удержать его.",
      editorialProofFirst:
        "Здесь работает подача: первый экран, плотность, ритм и быстрый вход в предложение.",
      editorialInterpretation:
        "Такой формат сокращает путь до контакта и усиливает импульс решения.",
      primaryCta: "Хочу быстрый лендинг",
      secondaryCta: "Разобрать кейс",
    },
    portfolio: {
      label: "Быстрый лендинг",
      title: "Когда важно зацепить сразу и быстро привести к контакту",
      situation:
        "Решение принимается быстро. Важно не объяснять долго, а сразу вовлекать.",
      editorialProofFirst:
        "Первый экран, подача и плотность создают импульс действия.",
      editorialInterpretation:
        "Такой формат сокращает путь до контакта и усиливает конверсию.",
      primaryCta: "Подходит быстрый формат",
      secondaryCta: "Разобрать кейс",
    },
    detail: {
      entryTitle: "Лендинг, который захватывает с первого экрана",
      entryCopy:
        "Здесь важно не объяснять долго. Важно сразу зацепить и удержать внимание.",
      context:
        "Короткий лендинг для мебели на заказ, где решение строится через подачу, ритм и быстрый вход в диалог.",
      editorialProof:
        "Первый экран задаёт ритм. Плотность и подача удерживают и ведут дальше.",
      editorialWhyItWorks:
        "Такой формат работает за счёт скорости: минимум трения, максимум вовлечения.",
      primaryCta: "Хочу такой лендинг",
      secondaryCta: "Посмотреть системный вариант",
    },
  },
};

export function getCasePresentation(project: Project): CasePresentationConfig | null {
  return casePresentations[project.slug] ?? null;
}

export function requireCasePresentation(
  project: Project,
  context: string,
): CasePresentationConfig {
  const presentation = getCasePresentation(project);

  if (!presentation) {
    throw new Error(
      `Missing case presentation config for "${project.slug}" in ${context}.`,
    );
  }

  return presentation;
}
