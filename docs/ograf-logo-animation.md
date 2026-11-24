# Animacja logo przez OGraf w DaVinci Resolve

Stan sprawdzenia: 24 listopada 2026. Źródła integracji: dokumentacja i informacje o wydaniach Blackmagic Design. Na VPS nie ma lokalnej instalacji Resolve. Użytkownik potwierdził import i działanie paczki diagnostycznej, a następnie właściwej animacji logo w swojej instalacji Resolve. Wynik końcowego eksportu nie został jeszcze zgłoszony.

OGraf jest realną drogą do użycia animacji HTML/JS bez wcześniejszego eksportu filmu. Blackmagic potwierdza import grafiki OGraf jako klipu, zachowanie przezroczystości i węzeł Fusion `OGrafLoader`. Nie potwierdza to jednak importu dowolnego HTML ani dowolnego pliku JSON. [Resolve 21 New Features Guide, s. 67 i 116](https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_21_New_Features_Guide.pdf#page=67)

## Wersja i system

| Wersja | Potwierdzone możliwości |
| --- | --- |
| Resolve 21 | OGraf na macOS i Windows, import do Media Pool lub bezpośrednio na timeline, alpha, `OGrafLoader`. [Przewodnik nowości](https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_21_New_Features_Guide.pdf#page=67) |
| Resolve Studio 21.1 | Akcje animacji OGraf na timeline; kontrolki klatek, ease i skali w `OGrafLoader`. [Informacje o wydaniu z 8.09.2026](https://www.blackmagicdesign.com/support/content/readme/baf7c071c0524fbf8ccc961925c9f443) |
| Resolve Studio 21.1.2 | OGraf i Lottie na Linux; kontrolki select/multi-select, responsywne proporcje, uwzględnianie długości akcji przy planowaniu Stop i szybszy playback. [Informacje o wydaniu z 23.10.2026](https://www.blackmagicdesign.com/support/content/readme/1dcfa6f38ebc4031a3a8561eea3aeee3) |
| Resolve Studio 21.2 | Poprawki ładowania szablonów z lokalizacji sieciowych i ZIP oraz timeoutów renderowania i użycia pamięci. To rozsądna wersja do pierwszej próby. [Informacje o wydaniu z 4.11.2026](https://www.blackmagicdesign.com/support/content/readme/630fd2cb208a46df9493de661a76628a) |

Wymagania całej aplikacji i systemu trzeba porównać z konfiguracją użytkownika; nie znaleziono osobnej tabeli wymagań sprzętowych OGraf. [Wymagania Studio 21.2](https://www.blackmagicdesign.com/support/content/readme/630fd2cb208a46df9493de661a76628a)

## Import i opakowanie

Dokumentacja Blackmagic określa OGraf jako `.json`, a Lottie jako `.lottie`. Opisuje przeciągnięcie pliku do Media Pool albo na timeline oraz wskazanie ścieżki w `OGrafLoader`. Nie podaje w tych sekcjach konkretnej końcówki nazwy manifestu OGraf ani pełnej struktury paczki. [Reference Manual, s. 366 i 2376–2378](https://documents.blackmagicdesign.com/UserManuals/DaVinciResolveReferenceManual.pdf#page=366), [Fusion 21 Manual, s. 83](https://documents.blackmagicdesign.com/UserManuals/Fusion21_Manual.pdf#page=83)

Wzmianka o poprawce „zipped paths” w 21.2 potwierdza istnienie obsługi takich ścieżek, ale nie określa akceptowanej końcówki archiwum, struktury katalogów ani reguł wykrywania manifestu. Nie należy z niej wyprowadzać obietnicy, że dowolny ZIP będzie importowany. Pierwsza próba powinna użyć lokalnego, rozpakowanego katalogu i manifestu zgodnego ze standardem EBU; wariant ZIP można sprawdzić oddzielnie. [Informacje o wydaniu 21.2](https://www.blackmagicdesign.com/support/content/readme/630fd2cb208a46df9493de661a76628a)

## Czas, Inspector i alpha

`OGrafLoader` udostępnia Global In/Out, Trim, Time Scale, Hold First/Last Frame i Loop; nie ma Reverse. Time Scale zmienia szybkość animacji oraz zakres globalny. Scheduled Actions pozwala przypisać Play i Stop do klatek. Dla szablonu z jednym krokiem Play zadziała tylko po wcześniejszym Stop. To trzeba uwzględnić przy powtarzaniu animacji. [Reference Manual, s. 2376–2378](https://documents.blackmagicdesign.com/UserManuals/DaVinciResolveReferenceManual.pdf#page=2376)

Kontrolki select/multi-select i responsywność są jawnie potwierdzone od 21.1.2. Dokumenty nie wyliczają pełnego mapowania wszystkich typów schematu danych OGraf na Inspector; nie można obiecać dowolnych własnych suwaków wyłącznie na tej podstawie. [Informacje o wydaniu 21.1.2](https://www.blackmagicdesign.com/support/content/readme/1dcfa6f38ebc4031a3a8561eea3aeee3)

Alpha jest zachowywana przez Resolve, jeśli grafika ją dostarcza. Obecny [skrypt włosów](../src/scripts/hair-motion.js) używa Canvas z `alpha: false` i interpoluje tylko RGB. Aktualny materiał ma nieprzezroczyste tło. Przezroczysta wersja logo wymagałaby osobnego dostosowania grafiki i renderowania, niezależnie od poprawnego importu OGraf. [Potwierdzenie obsługi alpha](https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_21_New_Features_Guide.pdf#page=116)

## Granice potwierdzenia i najmniejsza próba

Przejrzane sekcje Blackmagic nie dokumentują wywołań `goToTime()` ani `setActionsSchedule()`, wersji silnika przeglądarki, pełnego zestawu obsługiwanych Web API ani dostępu do sieci. Semantykę tych metod należy wywodzić ze specyfikacji EBU, a ich zachowanie w Resolve potwierdzić próbą. Samo odtwarzanie w Chromium nie dowodzi zgodności importera Resolve.

Najmniejszy test na komputerze użytkownika:

1. Zaimportować lokalny manifest prostej, samowystarczalnej grafiki OGraf z przezroczystym tłem, licznikiem czasu i obiektem przesuwanym według podanego czasu. Sprawdzić Media Pool, timeline i `OGrafLoader`.
2. Na Resolve Studio 21.2 sprawdzić kilka klatek w kolejności do przodu, do tyłu i ponownie; te same czasy powinny dawać identyczne obrazy. Sprawdzić Play/Stop, Time Scale i Loop.
3. Położyć grafikę nad kolorowym tłem i sprawdzić alpha. Wyeksportować krótki fragment i porównać z podglądem; podczas testu odłączyć dostęp do sieci.
4. Dopiero po tym podmienić prosty renderer na funkcję animacji włosów i sprawdzić jakość oraz czas renderowania w docelowej rozdzielczości.

Powyższy plan próby został wykonany etapami opisanymi niżej. Import i działanie obu paczek potwierdził użytkownik; wynik końcowego eksportu pozostaje do zgłoszenia. Produkcyjna animacja strony nie została zmieniona.

## Standard EBU: pliki i sterowanie czasem

Grafika składa się z manifestu o nazwie kończącej się na `.ograf.json`, modułu JavaScript eksportującego domyślnie klasę dziedziczącą po `HTMLElement` oraz używanych zasobów. Canvas jest wprost wymieniony wśród technologii grafiki. Poniżej uproszczony przykład struktury; gotowa paczka Tower Lady została opisana na końcu notatki. [Specyfikacja EBU v1](https://github.com/ebu/ograf/blob/main/v1/specification/docs/Specification.md#requirements-for-a-graphic)

```text
tower-lady/
  tower-lady.ograf.json
  graphic.mjs
  assets/logo.png
```

Dla montażu deklarujemy `supportsNonRealTime: true`. Komponent musi implementować także `goToTime({ timestamp })`, gdzie czas jest wyrażony w milisekundach, oraz `setActionsSchedule({ schedule })`. Promise z `goToTime` kończy się po narysowaniu żądanej klatki. Harmonogram zastępuje poprzedni i opisuje akcje Play, Stop, Update oraz akcje własne. Host żąda konkretnego czasu; sposób obliczenia klatki należy do komponentu. [API EBU](https://github.com/ebu/ograf/blob/main/v1/specification/docs/Specification.md#gototime), [interfejs TypeScript](https://github.com/ebu/ograf/blob/main/v1/typescript-definitions/src/apis/graphicsAPI.ts)

`load` dostaje charakterystyki renderera, w tym rozdzielczość; dopiero po przygotowaniu zasobów można zgłosić gotowość. Dotychczasowy zegar `requestAnimationFrame` i uzależnienie od widoczności strony zastępuje sterowanie przez aplikację montażową. [API ładowania](https://github.com/ebu/ograf/blob/main/v1/specification/docs/Specification.md#load), [oficjalny przykład wykorzystujący rozdzielczość renderera](https://github.com/ebu/ograf/blob/main/v1/examples/renderer-test/graphic.mjs)

Uwaga praktyczna: oficjalne przykłady animowanego logo i testu renderera deklarują `supportsNonRealTime: false`. Są źródłem wzorów struktury, ale nie gotowymi szablonami do naszego zastosowania na timeline. [Manifest logo](https://github.com/ebu/ograf/blob/main/v1/examples/ograf-logo/logo.ograf.json), [manifest testu renderera](https://github.com/ebu/ograf/blob/main/v1/examples/renderer-test/manifest.ograf.json)

## Dopasowanie do obecnego kodu Tower Lady

Poniższe wnioski wynikają z analizy naszego [skryptu animacji](../src/scripts/hair-motion.js):

- `drawWind(context, artwork, seconds)` oblicza deformację ze wskazanego czasu i niezmiennego obrazu źródłowego. Parametry podmuchu, maska wag i interpolacja mogą zostać zachowane.
- Adapter czasu może wywoływać tę funkcję z `timestamp / 1000`. Pozwala to zachować tempo 5,5 s niezależnie od szybkości renderowania i klatkażu projektu.
- `prepareArtwork` obecnie mierzy elementy makiety przez `getBoundingClientRect`. Docelowy komponent potrzebuje własnego kadru i rozmiaru, niezależnego od CSS strony.
- `setup`, obserwowanie widoczności i zegar przeglądarki należą do integracji internetowej; w OGraf zastąpi je cykl życia komponentu i czas hosta.
- Aktualne `alpha: false` oraz interpolacja tylko trzech kanałów oznaczają konieczność osobnego przygotowania przezroczystości i deformowania jej razem z obrazem. Sam manifest tego nie zmienia.
- Format nie zwiększy szczegółowości obecnej bitmapy. Jakość dużego logo w kadrze trzeba ocenić osobno.

## Wykonane próby na VPS

1. Minimalny manifest trybu non-real-time przeszedł walidację przez `jsonschema.Draft202012Validator` z pobranym oficjalnym [schematem EBU](https://ograf.ebu.io/v1/specification/json-schemas/graphics/schema.json). Sprawdzono format metadanych, nie kompletną paczkę ani importer Resolve.
2. W Chromium wywołano niezmienione funkcje `prepareArtwork` i `drawWind` przez testowy adapter `goToTime({ timestamp })`. Kolejność czasów: `0, 1000, 2750, 5500, 11000, 1000, 0, 5500` ms. Powtórzone czasy dały identyczne hashe SHA-256 całych klatek; różne fazy animacji dały różne obrazy. Powrót do wcześniejszego czasu nie wymagał odtwarzania poprzednich klatek.
3. W tej próbie klatka miała 491 × 569 px, a alpha każdego piksela wynosiła 255. Wynik potwierdza przydatność obecnego algorytmu do sterowania czasem, ale nie przezroczystość, wydajność w 4K ani działanie w Resolve.

Skrypt pomiarowy jest tymczasowym narzędziem badawczym `/tmp/tower-lady-browser/check-ograf-timing.sh`; dane i pobrane źródła są w katalogu wskazanym przez `/tmp/tower-lady-ograf-location`. Nie są wymagane do działania strony.

## Wybrany sposób wdrożenia

Najpierw przygotowano małą paczkę diagnostyczną non-real-time. Po potwierdzeniu importu przeniesiono renderer podmuchu do właściwej grafiki z alpha. Oba etapy opisano niżej. OGraf zastępuje wcześniejsze generowanie sekwencji obrazów lub osobnego filmu źródłowego; koszt renderowania samych klatek nadal istnieje. Nie było potrzeby zmieniania matematyki ruchu włosów ani produkcyjnej strony.

## Gotowa paczka do próby w Resolve

Przygotowano [manifest](../prototypes/ograf-probe/tower-lady-test.ograf.json),
[komponent Canvas](../prototypes/ograf-probe/graphic.mjs) i
[instrukcję importu](../prototypes/ograf-probe/README.md). Jest to osobna grafika
diagnostyczna z licznikiem czasu i poruszającym się kołem, jeszcze bez logo.
Nie zmienia kodu strony ani wybranego ruchu włosów. Archiwum do pobrania jest
generowane w ignorowanym katalogu podglądu; ZIP służy do transportu, nie importu.

W Chromium sprawdzono tę paczkę, a nie tylko funkcje animacji strony:

- Manifest przeszedł oficjalny schemat EBU v1.
- Powtórzone czasy w kolejności `0, 1000, 3000, 5000, 1000, 0, 10000, 1000` ms
  dały identyczne hashe pełnych klatek. Sprawdzono także harmonogram ze Stop
  i ponownym Play oraz zastąpienie go pustym harmonogramem.
- Tło ma alpha 0, koło 255, a półprzezroczysty kwadrat 128. Potwierdzono to
  w 1920 x 1080 i 3840 x 2160; wykonano też próbę kadru pionowego 1080 x 1920.
- Sprawdzono bezpośrednie Play/Stop, pusty obraz po `load`, czyszczenie zasobów
  przez `dispose` oraz brak zewnętrznych zależności i zapytań do usług sieciowych.

Po otrzymaniu paczki użytkownik potwierdził import w Resolve: animacja wygląda
tak samo jak w przeglądarce, a klip ma deklarowane 10 s. Nie zgłosił jeszcze
wyniku eksportu ani numeru wersji Resolve. Potwierdzenie dotyczy paczki testowej.

## Paczka z właściwym logo Tower Lady

Po pozytywnej próbie przygotowano [właściwą grafikę OGraf](../prototypes/tower-lady-ograf/tower-lady.ograf.json),
[moduł czasu i zasobów](../prototypes/tower-lady-ograf/graphic.mjs),
[renderer włosów](../prototypes/tower-lady-ograf/wind.mjs) oraz
[instrukcję](../prototypes/tower-lady-ograf/README.md).

Paczka zawiera lokalną, niezmienioną kopię istniejącego obrazu WebP. Zachowuje
wybrane parametry podmuchu (`5.5`, `.27`, `30`, `14`), maskę, opóźnienie fali
i rozruch siły przez 0,65 s. Metadane Play ustawiono na 11 s. Grafika jest
wyśrodkowana na przezroczystym tle; emblemat ma do 80% wysokości i szerokości
kadru. Nie zawiera logotypu, dźwięku ani wejścia i wyjścia montażowego.

Renderowanie odbywa się w oryginalnej przestrzeni RGB na czerni. Po deformacji
piksele są przeliczane na kolor i alpha, tak aby usunięcie czerni nie zostawiało
ciemnych krawędzi nad innym ujęciem. Zachowano kadr ilustracji z desktopowego
hero, bez pozostałych elementów makiety. Kod strony nie jest modyfikowany.

Sprawdzenia w Chromium:

- Manifest zgodny z oficjalnym schematem EBU v1; lokalny WebP identyczny bajtowo
  ze źródłem na stronie.
- Powtórzone czasy `0, 1000, 2750, 5500, 10999, 1000, 0` ms dają identyczne
  hashe pełnych klatek. Obszar twarzy i baszty pozostaje pikselowo nieruchomy.
- Porównano obraz po złożeniu na czerni z niezmienionymi funkcjami renderera
  strony, przy takim samym kadrze. Maksymalna różnica wyniosła 2/255, a średnia
  poniżej 0,1/255 na kanał; wynika z przeliczenia alpha i usunięcia szumu czerni.
- Potwierdzono alpha 0-255, Play/Stop, ponowny Play, zastąpienie harmonogramu,
  czyszczenie zasobów oraz pusty obraz przed Play.
- Render 3840 x 2160 działa. Średni czas 12 przykładowych klatek na VPS wyniósł
  około 36 ms; ten pomiar nie prognozuje wydajności importera Resolve.
- Obejrzano obraz na czerni i jasnym tle. Wszystkie zależności są lokalne.

Użytkownik potwierdził działanie właściwej animacji w Resolve. Wynik końcowego
eksportu z muzyką pozostaje do zgłoszenia. Źródło ilustracji pozostaje rastrem
około 500 x 580 px; większy Canvas nie zwiększa szczegółowości logo. Początkowy
rozruch oznacza, że klip nie jest bezszwową pętlą.

## Zatwierdzony podkład muzyczny

Na prośbę autora dołączono [oryginalny podkład WAV](../prototypes/tower-lady-ograf/audio/tower-queen.wav)
bez zmian w zawartości: 6 s, stereo, PCM 16-bit, 48 kHz. Oryginalny plik nazywał
się `Tower_Queen_2026-11-24T143800.wav`. Hash SHA-256 kopii i załącznika jest
identyczny. Nie analizowano ani nie zmieniano brzmienia podkładu.

WAV jest osobnym zasobem paczki do umieszczenia na ścieżce audio w Resolve,
od tego samego punktu co OGraf. Nie dodano odtwarzania dźwięku do komponentu
Canvas. Animacja zachowuje 11 s; przy intro o długości podkładu można przyciąć
ją do 6 s. [Skrypt pakujący](../prototypes/tower-lady-ograf/package.py) dołącza
manifest, moduły JS, obraz, WAV i instrukcję do jednego ZIP. Pakiet i dźwięk
nie są ładowane przez produkcyjne podstrony portfolio.

## Drugi OGraf: pełna kompozycja z napisami

[Manifest kompletnego intra](../prototypes/tower-lady-ograf/tower-lady-intro.ograf.json)
uruchamia [komponent `intro.mjs`](../prototypes/tower-lady-ograf/intro.mjs).
Rozszerza on działający komponent emblematu, zachowując jego renderer włosów,
cykl życia i zegar OGraf. Dodaje zaakceptowany układ A w HTML/CSS: emblemat
przesunięty o 2% szerokości kadru w lewo i napisy TOWER LADY, PICTURES, PRESENTS.
Warstwa emblematowa pozostaje na X 48%, napisy na X 50% kadru 16:9.

Do paczki dołączono ten sam lokalny Inter WOFF2 co na stronie oraz jego licencję
OFL. Komponent ładuje font przez `FontFace`, rejestruje go pod własną nazwą
i zgłasza gotowość dopiero po zakończeniu ładowania. Usuwa swoją instancję
fontu przy `dispose`. Nie wymaga instalowania fontu w systemie.
[API FontFace](https://developer.mozilla.org/en-US/docs/Web/API/FontFace/FontFace),
[FontFaceSet dokumentu](https://developer.mozilla.org/en-US/docs/Web/API/Document/fonts).

Kompozycja ma przestrzeń projektową 3840 x 2160. Dopasowuje ją proporcjonalnie
do rozdzielczości hosta; przy innych proporcjach centruje kadr 16:9 bez
rozciągania. Tekst nie jest zapisany jako bitmapa. Tło zachowuje alpha.
Wszystkie elementy podlegają wspólnym akcjom Play/Stop, bez wejść i wyjść
montażowych. Metadane Play pozostają ustawione na 11 s.

Sprawdzenia w Chromium:

- Pełny kadr 1920 x 1080 przy czasie 1000 ms porównano z wybranym prototypem
  A, `shift=-2`, bez jego paska sterowania. Obrazy są identyczne pikselowo:
  maksymalna różnica kanału 0/255.
- Potwierdzono rzeczywiste załadowanie dołączonego fontu i grubości 700/400,
  identyczne położenie i wymiary wszystkich napisów oraz kolory z prototypu.
- Powtórzone czasy `0, 1000, 2750, 5500, 10999, 1000, 0` ms dają identyczne
  obrazy pełnej kompozycji. Sprawdzono wspólne Play/Stop, ponowny Play,
  podmianę harmonogramu i czyszczenie zasobów wraz z fontem.
- W UHD położenie i wymiary napisów są dokładnie dwukrotnością Full HD.
  Przy 4096 x 2160 scena 3840 x 2160 pozostaje wyśrodkowana z marginesami
  po 128 px. Obejrzano kompozycję nad kolorowym tłem.

Pełna paczka jest budowana przez `package.py --variant intro` i zawiera
manifest, moduły, obraz, font z licencją, oryginalny WAV i instrukcję.
Wcześniejszy manifest samego emblematu i jego renderer pozostają bez zmian.
Import pełnej wersji z napisami w Resolve pozostaje do potwierdzenia przez
użytkownika; dotychczasowe potwierdzenie dotyczy wariantu bez tekstu.
