# CODE-MOTION — rebranding

Marka to **Tower Lady Pictures**. Autor potwierdził wybór logo i zakup domeny **`towerlady.com`**. Trwa ocena prototypu portfolio. Push wymaga zgody właściciela repozytorium.

[Polski podgląd portfolio](https://vps.tailfb5686.ts.net:8766/prototypes/tower-lady/astro/pl/) · [Angielski podgląd portfolio](https://vps.tailfb5686.ts.net:8766/prototypes/tower-lady/astro/en/)

Portfolio w Astro obejmuje stronę główną opartą na wybranej makiecie, filmografię z wyróżnionym filmem i artykuł O nas z historią studia, podejściem twórczym, zespołem, wyróżnieniami festiwalowymi i kontaktem. Wspólny nagłówek przełącza język bieżącej podstrony. Adres bez oznaczenia języka wybiera wersję na podstawie pierwszego preferowanego języka przeglądarki: polski (`pl`, `pl-PL`) prowadzi do `/pl/`, pozostałe do `/en/`. Bez JavaScriptu otwiera się wersja polska. Bezpośrednie adresy językowe i ręczny przełącznik mają pierwszeństwo przed ustawieniami przeglądarki.

Treść artykułu w obu językach jest w `src/about.ts`, a jego wstęp i metadane w `src/content.ts`. Trzy filmy w historii studia mają lokalne miniatury; odtwarzacz YouTube jest ładowany dopiero po kliknięciu. Bez JavaScriptu miniatura prowadzi bezpośrednio do filmu. Nazwy festiwali pozostają w oryginale, a rodzaje wyróżnień są tłumaczone. Zgodnie z decyzją autora nie dodajemy lat wyróżnień ani dodatkowych kategorii.

### Praca nad portfolio

Użyj Node.js 22.22 lub nowszego.

```sh
npm ci
npm run dev
```

- `npm run build` zapisuje pliki do `dist/`, gotowe do serwowania w katalogu głównym domeny.
- `npm run build:preview` zapisuje pliki pod `prototypes/tower-lady/astro/` z oznaczeniem `noindex`. Po wykonaniu tego polecenia na VPS działający Caddy od razu udostępnia nowy build w Tailscale.
- [Pierwotna makieta HTML](https://vps.tailfb5686.ts.net:8766/prototypes/tower-lady/index.html) jest nadal dostępna do porównań. Astro korzysta z jej zasobów graficznych i stylów.

### Design system

Wpisz `/design/` bezpośrednio w adresie strony. Na podglądzie ścieżka to `/prototypes/tower-lady/astro/design/`. Strona pokazuje paletę, role i rozmiary typografii, odstępy, wzorce elementów oraz zasady ruchu. Ma `noindex` i jest dostępna przez bezpośredni adres.

### Animacja logo do DaVinci Resolve

Samowystarczalna [paczka OGraf](prototypes/tower-lady-ograf/README.md) zawiera
wybraną animację włosów na przezroczystym tle oraz zatwierdzony podkład
`audio/tower-queen.wav` (6 s, stereo, PCM 16-bit, 48 kHz). Manifest OGraf
importujemy jako klip graficzny, a WAV jako osobną ścieżkę audio. Użytkownik potwierdził
działanie animacji w Resolve.

Druga paczka, `tower-lady-intro.ograf.json`, zawiera gotowy układ A z napisami
TOWER LADY, PICTURES i PRESENTS oraz korektą emblematu 2% w lewo.
Dołączony lokalny Inter nie wymaga instalowania fontów ani ręcznego ustawiania
napisów w Resolve.

```sh
python3 prototypes/tower-lady-ograf/package.py
python3 prototypes/tower-lady-ograf/package.py --variant intro
```

[Podgląd animacji i pobranie ZIP w Tailscale](https://vps.tailfb5686.ts.net:8766/prototypes/tower-lady-ograf/).
[Gotowy układ z napisami](https://vps.tailfb5686.ts.net:8766/prototypes/tower-lady-ograf/?graphic=intro).
[Notatka techniczna o OGraf i wynikach sprawdzeń](docs/ograf-logo-animation.md)
opisuje format oraz ograniczenia obecnej bitmapy. Strona produkcyjna nie
ładuje paczki intro ani podkładu muzycznego.

Logo na stronie, w obu OGrafach (wersja 1.0.1) i w materiałach social korzysta
z poprawionego obrazu `brand-artwork-clean.webp`. Usunięto wystający fragment
u dołu wieży, zachowując kadr, proporcje i wybraną animację włosów. Korektę
z oryginału i kopię obrazu dla OGraf można odtworzyć poleceniem
`node prototypes/tower-lady/assets/clean-logo.mjs` po `npm ci`.

### Materiały na Facebook i YouTube

Wybrany **zestaw C** zawiera kadry trzech filmów oraz angielskie hasło
„Stories without walls. Always original.”. [Podgląd i pobranie zestawu](https://vps.tailfb5686.ts.net:8766/prototypes/tower-lady-social/?variant=C)
oraz [instrukcja eksportów](prototypes/tower-lady-social/README.md) obejmują
banery i wspólny avatar obu platform. Warianty A i B zachowano do porównań.

### Przed publikacją

- Docelowy hosting to GitHub Pages pod `https://towerlady.com/`. [Instrukcja konfiguracji GitHuba i DNS w Hostingerze](docs/deployment.md) opisuje pierwsze wdrożenie i kolejne wydania.
- Workflow [Deploy GitHub Pages](.github/workflows/deploy-pages.yml) publikuje zawartość `dist/` po każdej zmianie na `main`. Można go też uruchomić ręcznie dla `main`.
- Prywatne repozytorium na koncie osobistym wymaga planu GitHub Pro do publikowania przez Pages. Treść **O nas / About** została zaakceptowana do publikacji w bieżącej wersji.
- Sprawdź obie wersje językowe, przekierowania, widok mobilny w Safari oraz kartę udostępniania na publicznym adresie.
- Po uruchomieniu zweryfikuj domenę w Google Search Console, zgłoś `/sitemap.xml` i sprawdź inspekcję URL dla `/pl/` i `/en/`.

- [Brief i potwierdzone preferencje](docs/rebranding/brief.md)
- [Krótka lista — oceny i zastrzeżenia autora](docs/rebranding/naming-shortlist.md)
- [Nazwy, runda 01 — propozycje, ograniczenia i źródła](docs/rebranding/naming-round-01.md)
- [Nazwy, runda 02 — angielskie i własne](docs/rebranding/naming-round-02.md)
- [Nazwy, runda 03 — jednosłowe gry słów i analiza strukturalna](docs/rebranding/naming-round-03.md)
- [Nazwy, runda 04 — krótkie brzmienie i obraz](docs/rebranding/naming-round-04.md)
- [Nazwy, runda 05 — poważne studio, nowy rozdział i AI](docs/rebranding/naming-round-05.md)
- [Nazwy, runda 06 — wokół Altertake](docs/rebranding/naming-round-06.md)
- [Nazwy, runda 07 — nazwy projektowane fonetycznie](docs/rebranding/naming-round-07.md)
- [Nazwy, runda 08 — człowiek i AI](docs/rebranding/naming-round-08.md)
- [Nazwy, runda 09 — słowiańska inspiracja, własne imię bóstwa](docs/rebranding/naming-round-09.md)
- [Nazwy, runda 10 — Egipt, Grecja i tradycja nordycka](docs/rebranding/naming-round-10.md)
- [Nazwy, runda 11 — film, opowieść i nowe możliwości](docs/rebranding/naming-round-11.md)
- [Fictension i Altertake — badanie oryginalności, domeny i porównanie](docs/rebranding/name-originality-check.md)
- [Nazwy, runda 13 — Elsecut, Plotcoil i Shotgraft](docs/rebranding/naming-round-13.md)
- [Nazwy, runda 14 — Lensyntax, Afterif, Reelhinge i Rendergrain](docs/rebranding/naming-round-14.md)
- [Nazwy, runda 15 — Avantreel, Spoolforth i Newnegative](docs/rebranding/naming-round-15.md)
- [Nazwy, runda 16 — variant / var](docs/rebranding/naming-round-16.md)
- [Nazwy, runda 17 — var + liczby i symbole](docs/rebranding/naming-round-17.md)
- [Nazwy, runda 18 — dwa słowa](docs/rebranding/naming-round-18.md)
- [OutOfRange — znaczenie i wcześniejsze użycia](docs/rebranding/naming-out-of-range.md)
- [Nazwy, runda 19 — nostalgia i retro](docs/rebranding/naming-round-19.md)
- [Coming Home Studio — interpretacja i wcześniejsze użycia](docs/rebranding/naming-coming-home.md)
- [Nazwy, runda 20 — 12 wariantów wokół uczucia powrotu](docs/rebranding/naming-round-20.md)
- [Interframe Studio — interpretacja i wcześniejsze użycia](docs/rebranding/naming-interframe.md)
- [Last Familiar Pictures — interpretacja i wcześniejsze użycia](docs/rebranding/naming-last-familiar.md)
- [Runda 21 — porównanie Avantreel i Last Familiar Pictures](docs/rebranding/naming-round-21.md)
- [Varianture — interpretacja i sprawdzenie oryginalności](docs/rebranding/naming-varianture.md)
- [Runda 22 — porównanie Varianture i Variantour](docs/rebranding/naming-round-22.md)
- [Runda 23 — porównanie Variant93 i Varianture](docs/rebranding/naming-round-23.md)
- [Runda 24 — Varianture i dopiski filmowe](docs/rebranding/naming-round-24.md)
- [Runda 25 — nazwy z własnej filmografii](docs/rebranding/naming-round-25.md)
- [Runda 26 — Tower Lady Pictures i dotychczasowa krótka lista](docs/rebranding/naming-round-26.md)

## Prototyp nazwy

Runda 26 zestawia Tower Lady Pictures z sześcioma wcześniejszymi faworytami w tej samej oprawie. Załączona przez autora wizualizacja jest oceniona w notatce rundy.

Podgląd na komputerze i telefonie po połączeniu z Tailscale:

[Runda 24 — Varianture](https://vps.tailfb5686.ts.net:8766/prototypes/naming.prototype.html?round=24&variant=A) · [Varianture Films](https://vps.tailfb5686.ts.net:8766/prototypes/naming.prototype.html?round=24&variant=B)

[Runda 25 — nazwy z własnej filmografii](https://vps.tailfb5686.ts.net:8766/prototypes/naming.prototype.html?round=25&variant=A)

[Runda 26 — Tower Lady Pictures i dotychczasowi faworyci](https://vps.tailfb5686.ts.net:8766/prototypes/naming.prototype.html?round=26&variant=A)

[Runda 21: Avantreel — wariant A](https://vps.tailfb5686.ts.net:8766/prototypes/naming.prototype.html?round=21&variant=A) · [Last Familiar Pictures — wariant B](https://vps.tailfb5686.ts.net:8766/prototypes/naming.prototype.html?round=21&variant=B)

Parametr `round` przyjmuje wartości od 1 do 26. Parametr `variant` wybiera nazwę. Listę wariantów danej rundy pokazuje przełącznik „Nazwa”. Adres bez parametru `round` otwiera rundę 01. Strzałki w dolnym pasku i na klawiaturze przełączają nazwy. Kontekst i film pozostają wybrane do przeładowania strony.

Serwer VPS i komputer użytkownika mają różne adresy `localhost`. Na tym VPS podgląd obsługuje Caddy na porcie `8766`, z nasłuchem wyłącznie na adresach Tailscale IPv4 i IPv6. Serwuje bezpośrednio pliki prototypów i notatki rebrandingu, więc nie wymaga procesu Pythona ani tunelu SSH. Dostęp urządzeń zależy też od reguł tailnetu.

Wpis do konfiguracji: [ops/caddy/prototypes.caddy](ops/caddy/prototypes.caddy). Wpis jest już zapisany w `/etc/caddy/Caddyfile`, a działający podgląd obsługuje Caddy. Edycje statycznych makiet są dostępne od razu. Edycje portfolio wymagają ponownego `npm run build:preview`.

### Uruchomienie na komputerze z lokalną kopią repozytorium

Otwórz plik `prototypes/naming.prototype.html` bezpośrednio w przeglądarce lub uruchom z katalogu repozytorium na tym samym komputerze:

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

Wejdź na [lokalny prototyp nazwy](http://localhost:8765/prototypes/naming.prototype.html?variant=A). Ten adres nie prowadzi z komputera użytkownika do VPS.

Prototyp rozwijamy na lokalnej gałęzi `codex/prototype-naming`. Po rozstrzygnięciu zachowamy tam materiał źródłowy i zapiszemy uzasadnienie wyboru; do docelowego kodu trafią zatwierdzone decyzje.
