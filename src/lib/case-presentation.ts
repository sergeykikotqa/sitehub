import type { Project } from "@/types/content";

export type CasePresentationMode = "system" | "editorial";

export type CaseVisualAsset = {
  src: string;
  alt: string;
  aspect: "wide" | "landscape" | "portrait" | "square";
  objectPosition?: string;
  caption?: string;
};

export type ProofKey = "understand" | "trust" | "act";

export type CaseProofFrames = Record<ProofKey, CaseVisualAsset>;

export type CaseVisualSet = {
  proofFrames: CaseProofFrames;
  og: {
    src: string;
    objectPosition?: string;
  };
};

type CaseOverviewItem = {
  label: string;
  value: string;
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

export const PROOF_FRAME_ORDER = ["understand", "trust", "act"] as const;

const PROOF_FRAME_KEY_SET = new Set<string>(PROOF_FRAME_ORDER);

export function assertProofFrames(
  frames: CaseProofFrames,
  caseId: string,
): asserts frames is CaseProofFrames {
  const keys = Object.keys(frames);

  for (const key of PROOF_FRAME_ORDER) {
    if (!frames[key]) {
      throw new Error(`[CaseProof] ${caseId} is invalid: missing ${key} frame.`);
    }
  }

  const invalidKeys = keys.filter((key) => !PROOF_FRAME_KEY_SET.has(key));
  if (invalidKeys.length > 0) {
    throw new Error(
      `[CaseProof] ${caseId} is invalid: unexpected proof keys ${invalidKeys.join(", ")}.`,
    );
  }

  if (keys.length !== PROOF_FRAME_ORDER.length) {
    throw new Error(
      `[CaseProof] ${caseId} is invalid: must have exactly ${PROOF_FRAME_ORDER.length} proof frames.`,
    );
  }

  if (process.env.NODE_ENV === "development") {
    const srcs = PROOF_FRAME_ORDER.map((key) => frames[key].src);
    if (new Set(srcs).size !== srcs.length) {
      console.warn(`[CaseProof] duplicate assets in ${caseId}`);
    }
  }
}

export function getFrame(
  frames: CaseProofFrames,
  key: ProofKey,
): CaseVisualAsset {
  const frame = frames[key];

  if (!frame) {
    throw new Error(`[CaseProof] missing ${key} frame.`);
  }

  return frame;
}

function createCasePresentation(
  caseId: string,
  config: CasePresentationConfig,
): CasePresentationConfig {
  assertProofFrames(config.visualAssets.proofFrames, caseId);
  return config;
}

const casePresentations: Record<string, CasePresentationConfig> = {
  mblmaster: createCasePresentation("mblmaster", {
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
      proofFrames: {
        understand: {
          src: "/uploads/mblmaster-lead.webp",
          alt: "Первый экран MBLMaster с оффером и заявкой на замер",
          aspect: "wide",
          caption: "Помогает быстро понять формат и войти в выбор без лишнего поиска.",
        },
        trust: {
          src: "/uploads/mblmaster-videos.webp",
          alt: "Видеообзор реального проекта на сайте MBLMaster",
          aspect: "landscape",
          caption: "Показывает реальные проекты и снимает сомнение, что всё это только на словах.",
        },
        act: {
          src: "/uploads/mblmaster-trust.webp",
          alt: "CTA-блок MBLMaster с заявкой на замер и trust-метриками",
          aspect: "portrait",
          caption: "Сразу видно, куда нажать, чтобы перейти из просмотра в заявку.",
        },
      },
      og: {
        src: "/uploads/mblmaster-og.png",
        objectPosition: "center top",
      },
    },
    home: {
      label: "Системный формат",
      title: "Когда сайт помогает разобраться и доводит до заявки",
      diagnosis:
        "Много позиций. Нужно быстро показать человеку, что ему подходит.",
      systemWhyItWorks:
        "Сайт объясняет выбор, усиливает доверие и не теряет человека по пути к заявке.",
      systemProofLead:
        "Первый экран ориентирует, реальный контент добавляет доверие, CTA остаётся рядом.",
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
        "MBLMaster: первый экран объясняет оффер, обзоры усиливают доверие, CTA собирает человека в действие.",
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
        "Реальные обзоры и примеры снимают сомнения глубже по скроллу и переводят сайт из обещания в доказательство.",
      primaryCta: "Хочу такой сайт под свою задачу",
      secondaryCta: "Посмотреть быстрый формат",
      closingTitle: "Соберём системный маршрут под вашу задачу",
      closingDescription:
        "Если человеку нужно сравнить варианты, разобраться и спокойно дойти до решения, такой формат работает лучше короткого лендинга.",
    },
  }),
  criatevmebel: createCasePresentation("criatevmebel", {
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
      proofFrames: {
        understand: {
          src: "/uploads/mesto-lead.webp",
          alt: "Первый экран MESTO с большим заголовком и CTA",
          aspect: "wide",
          caption: "Сразу даёт уровень и короткий вход в разговор без лишнего шума.",
        },
        trust: {
          src: "/uploads/mesto-proof-card.webp",
          alt: "Proof-блок MESTO с логикой было и стало",
          aspect: "portrait",
          caption: "Показывает разницу так, что качество считывается без длинных объяснений.",
        },
        act: {
          src: "/uploads/mesto-action.webp",
          alt: "Финальный Telegram CTA в кейсе MESTO",
          aspect: "square",
          caption: "Оставляет один понятный вход в диалог без лишних шагов.",
        },
      },
      og: {
        src: "/uploads/mesto-og.png",
        objectPosition: "center top",
      },
    },
    home: {
      label: "Быстрый лендинг",
      title: "Когда важно зацепить сразу и быстро привести к контакту",
      diagnosis:
        "Один оффер. Важно зацепить сразу и не потерять импульс.",
      editorialProofFirst:
        "Первый экран цепляет, proof быстро подтверждает качество, CTA не даёт потерять импульс.",
      editorialInterpretation:
        "Один понятный CTA ускоряет переход к разговору.",
      primaryCta: "Хочу быстрый лендинг",
      secondaryCta: "Разобрать кейс",
    },
    portfolio: {
      label: "Быстрый лендинг",
      title: "Когда важно зацепить сразу и быстро привести к контакту",
      situation:
        "Решение принимается быстро. Важно не объяснять долго, а сразу вовлекать.",
      editorialProofFirst:
        "Первый экран цепляет, proof подтверждает качество, а один Telegram CTA оставляет короткий путь к контакту.",
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
        "После первого экрана лендинг быстро переходит к доказательству: качество видно в конкретной сцене, а не в длинном списке преимуществ.",
      editorialWhyItWorks:
        "Такой формат работает за счёт скорости: минимум трения, максимум вовлечения.",
      primaryCta: "Хочу такой лендинг",
      secondaryCta: "Посмотреть системный вариант",
    },
  }),
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
