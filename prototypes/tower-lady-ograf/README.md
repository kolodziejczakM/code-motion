# Tower Lady Pictures - animowane materiały OGraf

Do wyboru są dwie osobne paczki:

| Manifest | Zawartość |
| --- | --- |
| `tower-lady.ograf.json` | Sam animowany emblemat, jak w pierwotnym eksporcie. |
| `tower-lady-intro.ograf.json` | Cały wybrany układ A: emblemat z korektą 2% w lewo i napisy TOWER LADY, PICTURES, PRESENTS. |

Zaimportuj właściwy manifest do Media Pool i umieść go na timeline. Kompletny
układ importuj przy domyślnej skali i pozycji klipu - korekta emblematu,
proporcje i napisy są już częścią grafiki.

Zachowaj cały rozpakowany folder: moduły JavaScript, obraz, a w pełnej wersji
również font Inter i jego licencja są częścią paczki. Font jest ładowany lokalnie;
nie wymaga instalowania w systemie. ZIP służy do pobrania. Nie ma zależności
od strony, VPS ani połączenia z internetem.

## Kompletny układ A

`tower-lady-intro.ograf.json` jest wyświetlany jako
`Tower Lady Pictures - complete intro (layout A)`. Zawiera:

- Ten sam animowany emblemat, powiększony do 48% wysokości kadru i ustawiony
  na X 48%, Y 36% (od góry) w kompozycji 16:9.
- TOWER LADY i PICTURES w Inter Bold 700, w kolorze `#F5EBD3`.
- PRESENTS w Inter Regular 400, w kolorze `#D8CEBB`.
- Linie przy PICTURES w kolorze `#9A8459`.
- Dokładne rozmiary, odstępy i położenie z zaakceptowanego prototypu A.

Napisy pozostają na osi X 50%. Font `assets/inter.woff2` jest dołączony wraz
z `assets/inter-ofl.txt`; grafika zgłasza gotowość dopiero po jego załadowaniu.
Nie korzysta z fontów zainstalowanych na komputerze ani z Google Fonts.

Kompozycja skaluje się proporcjonalnie do rozdzielczości hosta, także w Full HD
i UHD. W innych proporcjach dopasowuje kadr 16:9 bez rozciągania. Tło ma alpha:
na czerni efekt odpowiada prototypowi, można też umieścić grafikę nad ujęciem.
Napisy i emblemat pojawiają się razem przy Play i znikają razem przy Stop.
Nie dodano wejść i wyjść montażowych. Długość Play: 11 s, z możliwością
przycięcia do długości 6-sekundowego podkładu.

[Podgląd kompletnego OGraf w Tailscale](https://vps.tailfb5686.ts.net:8766/prototypes/tower-lady-ograf/?graphic=intro).

## Podkład muzyczny

W paczce znajduje się `audio/tower-queen.wav`: zatwierdzony podkład autora,
oryginalnie przesłany jako `Tower_Queen_2026-11-24T143800.wav`. Plik zachowano
bez zmian: 6 s, stereo, PCM 16-bit, 48 kHz.

Zaimportuj WAV do Media Pool oddzielnie. Ustaw go na ścieżce audio od tego
samego punktu co animację na ścieżce wideo. Sam import manifestu OGraf nie
dodaje tego pliku do timeline ani nie odtwarza muzyki. W ten sposób możesz
ustalić głośność, cięcia i przejścia dźwięku bez zmiany animacji.

Animacja ma nadal 11 s, podkład 6 s. Jeśli intro ma kończyć się razem z muzyką,
przytnij klip OGraf do 6 s. Nie zmieniono tempa, długości ani brzmienia WAV.

## Wariant samego emblematu

- Sam emblemat kobiety i baszty, bez logotypu, napisów, przejść i dźwięku.
- Wybrany na stronie podmuch: okres 5,5 s, parametry poziome/pionowe 30 i 14,
  ta sama maska włosów, opóźnienie fali i narastanie siły przez pierwsze 0,65 s.
- Metadane długości Play: 11 s. Można przyciąć klip. Sam ruch obliczany jest
  ze wskazanego czasu i może trwać dłużej, jeśli Stop przesuniesz dalej.
- Tło z alpha. Czerń obrazu źródłowego zostaje usunięta przy renderowaniu,
  a krawędzie przeliczone tak, żeby nie miały czarnej obwódki.
- Emblemat wyśrodkowany, zajmuje do 80% wysokości i szerokości kadru. Wielkość
  i położenie całego klipu możesz zmieniać w Resolve.

Zachowane narastanie wiatru oznacza, że pierwsza i ostatnia klatka nie tworzą
bezszwowej pętli. Nie stosuj automatycznego Loop, jeśli potrzebujesz płynnego
przejścia przez granicę klipu. Wystarczy wydłużyć zakres Play/Stop.

## Co sprawdzić w Resolve

1. Czy nowy import ma nazwę `Tower Lady Pictures - animated logo` i 11 s.
2. Czy włosy poruszają się zgodnie z podglądem, a twarz i baszta są nieruchome.
3. Czy położenie grafiki nad kolorowym tłem nie ujawnia czarnego prostokąta.
4. Czy ta sama klatka wygląda identycznie po przewinięciu w obie strony.
5. Czy krótki eksport odpowiada podglądowi, także w docelowej rozdzielczości.

Użytkownik potwierdził działanie właściwej animacji logo w Resolve po wcześniejszej
próbie paczki diagnostycznej. Krótki eksport z wybranym podkładem i końcowym
montażem trzeba jeszcze sprawdzić. Instrukcja awaryjnego importu przez Fusion:
dodaj `OGrafLoader`, wskaż JSON i podłącz do `MediaOut`; Play na początku,
Stop na końcu.

Pełną wersję z napisami sprawdzono w Chromium, w tym zgodność z prototypem,
lokalny font i przewijanie. Jej import w Resolve trzeba potwierdzić osobno;
wcześniejsze potwierdzenie użytkownika dotyczy samego emblematu.

## Przygotowanie ZIP

Z katalogu repozytorium uruchom:

```sh
python3 prototypes/tower-lady-ograf/package.py
```

Pełny układ A:

```sh
python3 prototypes/tower-lady-ograf/package.py --variant intro
```

Wyniki trafiają do ignorowanego katalogu `prototypes/tower-lady/astro/downloads/`
jako `tower-lady-animated-logo-ograf.zip` i `tower-lady-intro-ograf.zip`,
udostępniane przez podgląd Tailscale. Po ponownym zbudowaniu podglądu Astro
może być potrzebne ponowne wykonanie polecenia pakującego.

Na innym komputerze możesz wskazać dowolną lokalizację:

```sh
python3 prototypes/tower-lady-ograf/package.py --variant intro --output /tmp/tower-lady-intro.zip
```

Każde archiwum zawiera odpowiedni manifest, potrzebne moduły JS, obraz, WAV
i tę instrukcję. Pełna wersja dołącza również Inter z licencją.

## Źródło i jakość

Wersja **1.1.0** używa `prototypes/tower-lady/assets/brand-artwork-clean.webp`
(1487 x 1058 px) z uproszczonym trzonem wieży: szerszym oknem, większymi
detalami pod gzymsem i gładką lewą krawędzią. Zmiana opiera się na wizualizacji
autora; edytowalny fragment to `assets/simplified-tower.svg` w katalogu źródeł
strony. Góra logo, ramię oraz oba duże gzymsy zachowują oryginalne piksele.
Kadr ilustracji (około 500 x 580 px), proporcje, ruch włosów i przesunięcie
emblematu w intro o 2% pozostały bez zmian. Nadal usunięty jest fragment
następnego poziomu u dołu wieży, oczyszczony w 1.0.1. Rozdzielczość Canvas dopasowuje
się do rozdzielczości hosta; nie zwiększa to szczegółowości bitmapy. Do dużego
logo w finalnym intro 4K warto później dostarczyć osobny obraz w większej
rozdzielczości lub wektor i dostosować do niego kadr oraz maskę deformacji.

`wind.mjs` przenosi matematykę z `src/scripts/hair-motion.js`. `graphic.mjs`
obsługuje cykl życia OGraf, lokalny zasób i czas hosta w milisekundach. Funkcja
renderująca zawsze korzysta z niezmiennych pikseli źródłowych. Kod produkcyjnej
strony korzysta z tego samego poprawionego obrazu.

`intro.mjs` rozszerza działający komponent emblematu o gotową kompozycję
HTML/CSS i lokalny font. Korzysta z tego samego zegara, maski włosów i obsługi
akcji Play/Stop. Tekst jest renderowany przez silnik OGraf w docelowej
rozdzielczości, bez zapisania go jako dodatkowej bitmapy.
