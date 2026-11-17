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
    home: {
      title: "Niezależne krótkie metraże z Polski",
      description: "Tower Lady Pictures tworzy niezależne krótkie metraże z pogranicza thrillera, mrocznego dramatu i absurdu.",
      heading: ["Niezależne krótkie", "metraże z Polski."],
      tagline: "Historie bez murów",
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
      description: "Poznaj historię nazwy Tower Lady Pictures, nasz sposób pracy na planie i to, jak łączymy zdjęcia z narzędziami cyfrowymi.",
      heading: "Historia Tower Lady Pictures",
      intro: "Kręcimy niezależne filmy krótkometrażowe w Polsce. Pociągają nas thrillery i to, co dzieje się, gdy napięcie spotyka się z mrocznym dramatem albo absurdem.",
      story: [
        { heading: "Nazwa z Szamotuł", text: "Nasza nazwa wywodzi się z legendy o Halszce. Baszta związana z jej historią wciąż stoi w Szamotułach, rodzinnym mieście reżysera. W filmach przyciągają nas właśnie takie szczegóły. Znajome miejsce zaczyna wyglądać inaczej, kiedy poznasz jego historię." },
        { heading: "Jak pracujemy", text: "Robimy filmy po godzinach. Pracujemy w małej ekipie, omawiamy scenariusz i wspólnie budujemy scenografię. Przygotowanie kilkuminutowego filmu potrafi zająć kilka miesięcy. Dzięki temu mamy czas zdecydować, co widz powinien zobaczyć, a co możemy zostawić jego wyobraźni." },
        { heading: "Czego próbujemy", text: "Punktem wyjścia w nowych projektach pozostają zdjęcia z aktorami. Sprawdzamy, jak narzędzia cyfrowe, w tym AI, mogą rozwinąć to, co powstaje na planie. Czasem oznacza to rozbudowę scenografii, czasem stworzenie nowego ujęcia na podstawie nakręconych klatek. Wybór zależy od tego, czego potrzebuje scena." },
      ],
      explore: "Zobacz nasze filmy",
    },
  },
  en: {
    navigation: "Main navigation",
    skip: "Skip to content",
    homeLabel: "Tower Lady Pictures, home",
    languageLabel: "Read in English",
    home: {
      title: "Independent short films from Poland",
      description: "Tower Lady Pictures makes independent short films where suspense meets dark drama or the absurd.",
      heading: ["Independent short", "films from Poland."],
      tagline: "Stories without walls",
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
      description: "The story behind Tower Lady Pictures, how we work on set and how we use digital tools in our films.",
      heading: "The story behind Tower Lady Pictures",
      intro: "We make independent short films in Poland. We’re drawn to thrillers and to what happens when suspense meets dark drama or the absurd.",
      story: [
        { heading: "A name from Szamotuły", text: "Our name comes from the legend of Halszka. The tower linked to her story still stands in Szamotuły, the filmmaker’s hometown. It’s the kind of detail we’re drawn to in films: a familiar place that feels different once you know the story behind it." },
        { heading: "How we work", text: "We make these films after hours. We work with a small crew, talk through the script and build the sets together. A short that runs for a few minutes can take months to prepare. That time gives us room to decide what the audience needs to see and what can be left to their imagination." },
        { heading: "What we’re exploring", text: "For new projects, shooting with actors remains the starting point. We’re exploring where digital tools, including AI, can extend what we make on set, whether that means expanding a set or developing a new shot from frames we’ve filmed. The choice depends on what the scene needs." },
      ],
      explore: "Explore the films",
    },
  },
};
