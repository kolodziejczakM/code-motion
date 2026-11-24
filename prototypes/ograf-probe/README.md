# Test OGraf w DaVinci Resolve

To mała próba zgodności importera i renderera, nie gotowa animacja logo.
Grafika jest rysowana w Canvas z alpha, według czasu przekazanego przez hosta
(`goToTime` w milisekundach). Nie używa internetu, zewnętrznych fontów ani bibliotek.

## Wersja programu

OGraf jest obsługiwany od Resolve 21 na macOS i Windows; na Linux od 21.1.2.
Informacje o wydaniu 21.2 wymieniają dalsze poprawki OGraf. Starsza wersja bez
obsługi tego formatu nie jest dobrym środowiskiem do tej próby.

Źródła: [Blackmagic - import i alpha, s. 67](https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_21_New_Features_Guide.pdf#page=67),
[Linux od 21.1.2](https://www.blackmagicdesign.com/support/content/readme/1dcfa6f38ebc4031a3a8561eea3aeee3),
[poprawki 21.2](https://www.blackmagicdesign.com/support/content/readme/630fd2cb208a46df9493de661a76628a).

## Import i próba

1. Rozpakuj ZIP do lokalnego folderu na komputerze z Resolve. Zachowaj obok siebie
   `tower-lady-test.ograf.json` i `graphic.mjs`. ZIP służy wyłącznie do pobrania;
   do Resolve importujesz rozpakowany plik JSON.
2. Utwórz osobny projekt testowy, np. 1920 x 1080, 25 fps. Przeciągnij
   `tower-lady-test.ograf.json` do Media Pool na stronie Edit, następnie na timeline.
   Nie importuj modułu MJS ani strony HTML.
3. Umieść klip na V2 i ustaw około 10 sekund długości. Na V1 umieść kolorowe tło,
   np. z Effects Library > Generators > Solid Color. Ustaw dla niego wyraźny kolor.
4. Włącz odtwarzanie. Powinny być widoczne: napis `TOWER LADY / OGRAF TEST`,
   licznik czasu oraz złote koło przesuwające się w prawo i w lewo, z okresem 4 s.
   Tło z V1 powinno być widoczne wokół rysunku; kwadrat po prawej ma alpha 50%.
5. Przeskocz w okolice 1 s, następnie 3 s i wróć do tej samej klatki w 1 s.
   Licznik i pozycja koła powinny być identyczne przy obu wizytach. Sprawdź też
   kilka klatek klawiszami strzałek i przewijanie do tyłu.
6. Wyeksportuj 5-10 sekund zwykłego filmu, np. H.264 z tłem z V1. Otwórz wynik:
   licznik i ruch powinny odpowiadać timeline, a tło być nadal widoczne.
   Ten eksport sprawdza compositing, nie zapis kanału alpha w pliku wideo.
7. Odłącz internet i ponownie otwórz projekt z lokalnym folderem testowym.
   Powinien działać bez połączenia ze stroną Tower Lady i z VPS.

## Jeśli import lub obraz nie zadziała

- Sprawdź wersję Resolve i obecność `graphic.mjs` obok JSON. Zostaw folder w tym
  samym miejscu także podczas późniejszego otwierania projektu.
- Alternatywna ścieżka: wstaw Fusion Composition, otwórz Fusion, dodaj przez
  Shift+Space węzeł `OGrafLoader`, wskaż rozpakowany JSON i podłącz wyjście
  do `MediaOut`. Nazwy kontrolek mogą różnić się między wersjami.
- Jeśli obraz jest pusty, sprawdź Scheduled Actions w OGrafLoader: Play przy
  początku klipu, Stop po 10 s. Jest jeden krok Play (indeks 0).
- Zanotuj dokładny komunikat i etap, na którym pojawia się problem. Przekaż też
  system i pełny numer wersji Resolve. Nie wnioskuj z pustego obrazu, że sam
  format OGraf nie działa - na tym etapie testujemy również nasz adapter.

## Zakres dotychczasowej weryfikacji

Manifest przechodzi walidację względem schematu EBU v1. Przeglądarka sprawdza
przezroczystość, powtarzalność klatek podczas przewijania, Play/Stop i zmianę
rozdzielczości. Użytkownik potwierdził import i działanie animacji w Resolve,
zgodność z podglądem oraz deklarowane 10 s długości klipu. Wynik eksportu nie
został jeszcze zgłoszony. Ten folder nie zmienia animacji ani strony produkcyjnej.
