export const locales = ["pl", "en"] as const;
export type Locale = (typeof locales)[number];

const slugs = {
  pl: { home: "", films: "filmy", about: "o-nas" },
  en: { home: "", films: "films", about: "about" },
} as const;
export type Page = keyof (typeof slugs)["pl"];
export const pages = ["home", "films", "about"] as const satisfies readonly Page[];

export function slugFor(locale: Locale, page: Page) {
  return slugs[locale][page];
}

export function pathFor(locale: Locale, page: Page) {
  const slug = slugFor(locale, page);
  return slug ? `/${locale}/${slug}/` : `/${locale}/`;
}

export function hrefFor(locale: Locale, page: Page) {
  return import.meta.env.BASE_URL.replace(/\/$/, "") + pathFor(locale, page);
}

export const copy = {
  pl: {
    navigation: "Nawigacja główna",
    skip: "Przejdź do treści",
    homeLabel: "Tower Lady Pictures, strona główna",
    languageLabel: "Czytaj po polsku",
    footer: {
      contact: "Kontakt i profile społecznościowe",
      top: "Do góry",
    },
    home: {
      title: "Niezależne krótkie metraże z Polski",
      description: "Tower Lady Pictures tworzy niezależne krótkie metraże z pogranicza thrillera, mrocznego dramatu i absurdu.",
      heading: ["Niezależne krótkie", "metraże z Polski."],
      tagline: "Kino bez murów. Tylko oryginalne historie.",
      explore: "Zobacz filmy",
      shortFilms: "Krótkie metraże",
    },
    films: {
      title: "Filmy",
      description: "Obejrzyj niezależne krótkie metraże Tower Lady Pictures. „Boundless, actually”, „Akabei” i „Saturday cleaning” łączą thriller z mrocznym dramatem lub absurdem.",
      watch: "Obejrzyj film",
      watchOnYouTube: (film: string) => `Obejrzyj „${film}” na YouTube`,
      more: "Więcej krótkich metraży",
      absurd: "Absurd",
      darkDrama: "Mroczny dramat",
      approximate: "Ok.",
      akabei: "Młoda kobieta marzy o stałym związku. Gdy odkrywa, że jej partner tylko marnuje jej czas, planuje szybką zemstę.",
      saturdayCleaning: "Sobota jest nieunikniona. Jest robota do zrobienia.",
    },
    about: {
      title: "O nas",
      description: "Poznaj Marcina i Karolinę Kołodziejczaków oraz historię Tower Lady Pictures: autorskie krótkie filmy, pracę na planie i wyróżnienia festiwalowe.",
      heading: "O studiu",
      intro: [
        "Tower Lady Pictures to niezależne studio filmowe założone przez Marcina Kołodziejczaka.",
        "Tworzymy autorskie filmy krótkometrażowe, najczęściej thrillery, z miejscem na mroczny dramat i absurd.",
        "Rozwijamy własne historie i sami finansujemy ich realizację.",
      ],
      explore: "Zobacz nasze filmy",
    },
  },
  en: {
    navigation: "Main navigation",
    skip: "Skip to content",
    homeLabel: "Tower Lady Pictures, home",
    languageLabel: "Read in English",
    footer: {
      contact: "Contact and social profiles",
      top: "Back to top",
    },
    home: {
      title: "Independent short films from Poland",
      description: "Tower Lady Pictures makes independent short films where suspense meets dark drama or the absurd.",
      heading: ["Independent short", "films from Poland."],
      tagline: "Stories without walls. Always original.",
      explore: "Explore films",
      shortFilms: "Short films",
    },
    films: {
      title: "Films",
      description: "Watch Boundless, actually, Akabei and Saturday cleaning, three independent short films from Tower Lady Pictures where suspense meets dark drama or the absurd.",
      watch: "Watch film",
      watchOnYouTube: (film: string) => `Watch ${film} on YouTube`,
      more: "More short films",
      absurd: "Absurd",
      darkDrama: "Dark drama",
      approximate: "About",
      akabei: "A young woman dreaming of a stable relationship discovers that her current partner is wasting her time, so she plans swift revenge.",
      saturdayCleaning: "The Saturday is inevitable. There is work to be done.",
    },
    about: {
      title: "About",
      description: "Meet Marcin and Karolina Kołodziejczak and discover Tower Lady Pictures: our original short films, filmmaking process and festival recognition.",
      heading: "About the studio",
      intro: [
        "Tower Lady Pictures is an independent film studio founded by Marcin Kołodziejczak.",
        "We make original short films, primarily thrillers, with room for dark drama and the absurd.",
        "We develop our own stories and finance our productions ourselves.",
      ],
      explore: "Explore the films",
    },
  },
};
