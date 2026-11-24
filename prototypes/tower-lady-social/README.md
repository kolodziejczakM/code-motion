# Tower Lady Pictures - zestawy Facebook / YouTube

Stan: propozycje do wyboru. Autor potwierdził angielskie hasło na obu platformach:
**Stories without walls. Always original.** Wariant A jest rekomendacją,
ostateczny wybór układu banerów pozostaje do potwierdzenia.

[Podgląd trzech zestawów w Tailscale](https://vps.tailfb5686.ts.net:8766/prototypes/tower-lady-social/?variant=A).
Parametr `variant=A`, `B` lub `C` wybiera zestaw. Dolny pasek przełącza warianty.
Podgląd jest statyczny i udostępniany przez istniejący Caddy, tak jak pozostałe
prototypy. Nie zmienia produkcyjnej strony ani kont społecznościowych.

## Warianty

- **A - nazwa studia:** emblemat, logotyp Inter Bold i uzupełniające hasło.
  Tło z rozproszonymi cegłami i ciepłą poświatą.
- **B - hasło:** logotyp mniejszy, a hasło większe w Cormorant Garamond,
  nawiązującym do nagłówków strony.
- **C - filmy:** kadry Boundless, actually, Akabei i Saturday cleaning,
  z emblematem i nazwą w jednym wierszu. Dla Saturday cleaning użyto czystego
  fotograficznego fragmentu zatwierdzonej makiety strony.

Wspólny avatar na obu platformach zawiera sam emblemat na czerni. Nazwa i hasło
pozostają na banerze, aby mała ikona była czytelna.

## Pliki do wgrania

Każdy ZIP zawiera cztery PNG oraz tę instrukcję:

| Plik | Rozmiar | Zastosowanie |
| --- | --- | --- |
| `facebook-avatar.png` | 1080 x 1080 | Zdjęcie profilowe strony Facebook |
| `facebook-cover.png` | 1702 x 630 | Baner strony Facebook |
| `youtube-avatar.png` | 1080 x 1080 | Zdjęcie profilowe kanału YouTube |
| `youtube-banner.png` | 2560 x 1440 | Pełny baner kanału YouTube |

Pliki avatarów są identyczne. Przekazano dwa czytelnie nazwane pliki, żeby
każda platforma miała komplet. Wgrywaj pełne obrazy, bez wcześniejszego
wycinania koła lub kadru mobilnego. Prowadnice z podglądu nie są częścią PNG.

## Kadrowanie i źródła wymiarów

YouTube zaleca 2560 x 1440, limit 6 MB, a przy minimum 2048 x 1152 podaje
obszar tekstu i logo 1235 x 338. Po przeskalowaniu 1,25x otrzymujemy centralne
1543,75 x 422,5 px. Wszystkie kluczowe elementy trzech wariantów mieszczą się
w tym obszarze. Galeria pokazuje jego kadr, szeroki pas i cały obraz.
[Oficjalna dokumentacja YouTube](https://support.google.com/youtubecreatorstudio/answer/10456525?co=GENIE.Platform%3DDesktop&hl=en).

Facebook: przyjęto roboczy eksport 1702 x 630 i konserwatywny centralny obszar
treści 1120 x 470. Węższy kadr 1120 x 630 w galerii jest symulacją, nie
potwierdzonym układem aplikacji Facebook. Należy sprawdzić finalne położenie
w kadratorze podczas wgrywania. Oficjalny artykuł o wymiarach był w tej sesji
niedostępny bez logowania, więc nie traktujemy tej symulacji jako specyfikacji Meta.
[Oficjalny artykuł Meta](https://www.facebook.com/help/125379114252045),
[wskazanie tego artykułu przez Meta for Business](https://en-gb.facebook.com/business/tools/facebook-pages/get-started).

## Spójność marki i źródła

- Emblemat: ten sam obraz i renderer co w stronie i OGraf, statyczny czas 0.
- Paleta: `#000000`, `#F5EBD3`, `#D8CEBB`, `#BD9B5F`, `#9A8459`.
- Fonty: lokalny Inter i Cormorant Garamond z istniejących zasobów projektu.
- Tło: motyw z `src/components/Backdrop.astro`, dopasowany do proporcji banera.
- Kadry: własne filmy autora, z już używanych zasobów strony.
- PNG są renderowane z kodu w sRGB, a następnie kompresowane bezstratnie.
  Nie wygenerowano nowego rysunku logo. Rozdzielczość PNG nie zwiększa
  szczegółowości istniejącej bitmapy emblematu.

`artwork.mjs` jest edytowalnym źródłem kompozycji. `index.html` renderuje
podgląd i udostępnia `window.exportSocialAssets()`, zwracające PNG i geometrię
treści. `exports/manifest.json` zapisuje rozmiary, skróty plików i obszary treści.

Sprawdzono wymiary, limity plików, identyczność avatarów i widoczność znaku
wewnątrz okrągłego kadru. Jasne piksele avatara nie wychodzą poza okrąg.
Sprawdzono też położenie kluczowej treści względem zadeklarowanych obszarów.
Nie wykonano publikacji ani testu kadratora na kontach autora.

## Pakowanie

```sh
python3 prototypes/tower-lady-social/package.py
```

Polecenie tworzy `exports/tower-lady-social-A.zip`, `B.zip` i `C.zip` z istniejących
PNG. Po zmianie kodu kompozycji trzeba najpierw ponownie wyrenderować PNG.
Prototyp pozostaje na osobnej gałęzi do momentu wyboru wariantu.
