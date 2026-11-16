# CODE-MOTION — rebranding

Trwa wybór nazwy. **Varianture jest obecnym faworytem autora.** Na krótkiej liście są też Altertake, Fictension, Elsecut, Avantreel i Last Familiar Pictures. Push wymaga zgody właściciela repozytorium.

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

## Prototyp nazwy

Runda 24 zestawia samą nazwę Varianture i pięć wersji rozszerzonych na planszy otwierającej, w opisie profilu i w podpisie przy filmie.

Podgląd na komputerze i telefonie po połączeniu z Tailscale:

[Runda 24 — Varianture](https://vps.tailfb5686.ts.net:8766/prototypes/naming.prototype.html?round=24&variant=A) · [Varianture Films](https://vps.tailfb5686.ts.net:8766/prototypes/naming.prototype.html?round=24&variant=B)

[Runda 21: Avantreel — wariant A](https://vps.tailfb5686.ts.net:8766/prototypes/naming.prototype.html?round=21&variant=A) · [Last Familiar Pictures — wariant B](https://vps.tailfb5686.ts.net:8766/prototypes/naming.prototype.html?round=21&variant=B)

Parametr `round` przyjmuje wartości od 1 do 24. Parametr `variant` wybiera nazwę. Listę wariantów danej rundy pokazuje przełącznik „Nazwa”. Adres bez parametru `round` otwiera rundę 01. Strzałki w dolnym pasku i na klawiaturze przełączają nazwy. Kontekst i film pozostają wybrane do przeładowania strony.

Serwer VPS i komputer użytkownika mają różne adresy `localhost`. Na tym VPS podgląd obsługuje Caddy na porcie `8766`, z nasłuchem wyłącznie na adresach Tailscale IPv4 i IPv6. Serwuje bezpośrednio pliki prototypów i notatki rebrandingu, więc nie wymaga procesu Pythona ani tunelu SSH. Dostęp urządzeń zależy też od reguł tailnetu.

Wpis do konfiguracji: [ops/caddy/prototypes.caddy](ops/caddy/prototypes.caddy). Wpis jest już zapisany w `/etc/caddy/Caddyfile`, a działający podgląd obsługuje Caddy. Edycje plików prototypu są dostępne od razu, bez przeładowania serwera.

### Uruchomienie na komputerze z lokalną kopią repozytorium

Otwórz plik `prototypes/naming.prototype.html` bezpośrednio w przeglądarce lub uruchom z katalogu repozytorium na tym samym komputerze:

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

Wejdź na [lokalny prototyp nazwy](http://localhost:8765/prototypes/naming.prototype.html?variant=A). Ten adres nie prowadzi z komputera użytkownika do VPS.

Prototyp rozwijamy na lokalnej gałęzi `codex/prototype-naming`. Po rozstrzygnięciu zachowamy tam materiał źródłowy i zapiszemy uzasadnienie wyboru; do docelowego kodu trafią zatwierdzone decyzje.
