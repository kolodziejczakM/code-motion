# Tower Lady Pictures - animowane logo OGraf

Zaimportuj `tower-lady.ograf.json` do Media Pool i umieść na timeline tak jak
poprzednią paczkę testową. Zachowaj cały rozpakowany folder: moduły JavaScript
oraz `assets/brand-artwork.webp` są częścią grafiki. ZIP służy do pobrania.
Nie ma zależności od strony, VPS ani połączenia z internetem.

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

## Co zawiera animacja

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

## Przygotowanie ZIP

Z katalogu repozytorium uruchom:

```sh
python3 prototypes/tower-lady-ograf/package.py
```

Wynik trafia do ignorowanego katalogu
`prototypes/tower-lady/astro/downloads/tower-lady-animated-logo-ograf.zip`,
udostępnianego przez podgląd Tailscale. Po ponownym zbudowaniu podglądu Astro
może być potrzebne ponowne wykonanie tego polecenia.

Na innym komputerze możesz wskazać dowolną lokalizację:

```sh
python3 prototypes/tower-lady-ograf/package.py --output /tmp/tower-lady-logo.zip
```

Archiwum zawiera manifest, oba moduły JS, obraz źródłowy, WAV i tę instrukcję.

## Źródło i jakość

Źródłem pozostaje istniejący `prototypes/tower-lady/assets/brand-artwork.webp`
(1487 x 1058 px), a kadr ilustracji ma około 500 x 580 px. Nie wygenerowano
nowego rysunku i nie zmieniono jego kształtu. Rozdzielczość Canvas dopasowuje
się do rozdzielczości hosta; nie zwiększa to szczegółowości bitmapy. Do dużego
logo w finalnym intro 4K warto później dostarczyć osobny obraz w większej
rozdzielczości lub wektor i dostosować do niego kadr oraz maskę deformacji.

`wind.mjs` przenosi matematykę z `src/scripts/hair-motion.js`. `graphic.mjs`
obsługuje cykl życia OGraf, lokalny zasób i czas hosta w milisekundach. Funkcja
renderująca zawsze korzysta z niezmiennych pikseli źródłowych. Kod produkcyjnej
strony pozostaje bez zmian.
