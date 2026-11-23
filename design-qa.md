# Sprawdzenie prototypu portfolio

Źródłem dla Home jest załączona przez autora makieta `codex-clipboard-1603d48e-1c7a-4bcb-a254-cc78462dd12e.png`. Dla Films źródłem jest pierwszy wyświetlony wariant `exec-64494cbe-0cd7-4226-90f8-bab25147dc8f.png`. Obie makiety mają 1487 × 1058 px. About oceniono względem ustalenia o krótkim artykule.

## Widoki

- Zrzuty z Chrome wykonano z prywatnego podglądu Tailscale. Desktop ma 1487 × 1058 px, skala urządzenia 1, stan początkowy każdej strony i fonty po załadowaniu. Telefon ma 393 × 852 px. Dodatkowo sprawdzono brak przewijania poziomego na szerokości 320 px.
- Pełne porównania makiety i renderu umieszczono obok siebie w `/tmp/tower-lady-browser/comparison-home.png` i `/tmp/tower-lady-browser/comparison-films.png`. Obie połówki skalowano do tej samej szerokości 960 px. Górne obszary sprawdzono też w porównaniach `comparison-home-hero.png` i `comparison-films-hero.png` z tej samej sesji.
- Sprawdzono też `/tmp/tower-lady-browser/mobile-home.png`, `mobile-films.png`, `mobile-about.png` i `desktop-about.png`. Na telefonie ilustracja Home znajduje się pod wprowadzeniem, a lista filmów ma jedną kolumnę.

## Ustalenia i poprawki

- Fonty i czytelność. Pierwsze renderowanie w środowisku testowym nie wyświetlało tekstu ze względu na brak konfiguracji fontów przeglądarki. Powtórzone ujęcia po przywróceniu tej konfiguracji pokazały Cormorant Garamond i Inter. Powiększenie nagłówków przywróciło proporcje względem makiety. Tekst About korzysta z rozszerzonego zestawu znaków w tym samym kroju.
- Układ i odstępy. Home zachowuje dwie kolumny w części otwierającej i trzy tytuły pod linią podziału. Films zachowuje wyróżniony film i dwa szersze obrazy w dalszym katalogu. Kadrowanie zdjęcia nad tytułem Films skorygowano po pierwszym porównaniu. Przejście po lewej stronie zdjęcia jest płynne w ostatnim ujęciu.
- Paleta i kontrast. Zachowano jasne napisy na czerni i mosiężny przycisk. W Films zdjęcie ma osobną warstwę przyciemnienia, a stan aktywnego linku w nawigacji wskazuje podkreślenie.
- Obrazy. Po zauważeniu podwójnych napisów wykorzystano czystą ilustrację *Saturday cleaning* z zatwierdzonej makiety. Wizerunek Halszki pochodzi z tej samej makiety i jest kadrowany przez layout. *Boundless, actually* i *Akabei* używają miniatur filmów autora. Pozostają drobne różnice kadru względem makiet. Znak będzie można podmienić na osobny plik przy przygotowywaniu wersji docelowej.
- Treść. Tytuły, gatunki i czasy odpowiadają znanym danym. About ma wąską kolumnę, śródtytuły i roboczy tekst po angielsku. Opis przyszłego wykorzystania narzędzi cyfrowych odnosi się do nowych projektów.

## Nawigacja

W Chrome sprawdzono przejście z przycisku Explore films na Films, z linku About do artykułu, powrót przez nazwę studia i kotwicę filmu otwieraną z Home. Wszystkie trzy linki Watch wskazują właściwe filmy na YouTube. Sprawdzenie obejmuje adresy linków, a odtwarzacz YouTube pozostaje poza prototypem. Fonty i obrazy załadowały się we wszystkich sprawdzonych widokach. Nie wystąpiły błędy JavaScript.

## Dalsze dopracowanie

Po ocenie prototypu należy potwierdzić, który film pozostanie wyróżniony, i uzupełnić About o historię opowiedzianą przez autorów. Drobne różnice w doborze kroju, rozmieszczeniu wybranych detali i kadrowaniu nie zmieniają hierarchii ani działania strony.

final result: passed
