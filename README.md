# CODE-MOTION — rebranding

Pracujemy iteracyjnie. Obecny etap: poszukiwanie nazwy. **Altertake ma wstępną akceptację z późniejszym zastrzeżeniem autora dotyczącym oryginalności**. Aktualnie szukamy nazwy łączącej siłę człowieka i AI. Finalny wybór pozostaje otwarty. Push wymaga zgody właściciela repozytorium.

- [Brief i potwierdzone preferencje](docs/rebranding/brief.md)
- [Krótka lista — opcje wstępnie zaakceptowane przez autora](docs/rebranding/naming-shortlist.md)
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

## Prototyp nazwy

To jednorazowy materiał porównawczy, nie kod strony docelowej ani projekt logo. Zawiera jedenaście rund nazw w jednakowej typografii, trzy konteksty użycia i filmografię przekazaną przez autora. Aktualna runda 11 porównuje Narravolt, Fictension i Cineural: opowieść i energię, fikcję i napięcie oraz kino i inteligencję. Status Altertake uwzględnia zastrzeżenie autora dotyczące oryginalności. Same wybory w przeglądarce nie zmieniają krótkiej listy.

Podgląd na komputerze i telefonie po połączeniu z Tailscale:

[Prototyp nazwy — runda 11, HTTPS w tailnecie](https://vps.tailfb5686.ts.net:8766/prototypes/naming.prototype.html?round=11&variant=A)

Parametr `round` przyjmuje wartości od 1 do 11, a `variant` wybiera nazwę: A–D w rundach 01, 05 i 09, A–E w rundach 02–04 i 06, A–C w rundach 07–08 i 10–11. Dotychczasowe linki bez parametru `round` zachowują rundę 01. Strzałki w dolnym pasku i na klawiaturze przełączają nazwy. Kontekst i film pozostają wybrane do przeładowania strony.

Serwer VPS i komputer użytkownika mają różne adresy `localhost`. Na tym VPS podgląd obsługuje Caddy na porcie `8766`, z nasłuchem wyłącznie na adresach Tailscale IPv4 i IPv6. Serwuje bezpośrednio pliki prototypów i notatki rebrandingu, więc nie wymaga procesu Pythona ani tunelu SSH. Dostęp urządzeń zależy też od reguł tailnetu.

Wpis do konfiguracji: [ops/caddy/prototypes.caddy](ops/caddy/prototypes.caddy). Wpis jest już zapisany w `/etc/caddy/Caddyfile`, a działający podgląd obsługuje Caddy. Edycje plików prototypu są dostępne od razu, bez przeładowania serwera.

### Uruchomienie na komputerze z lokalną kopią repozytorium

Otwórz plik `prototypes/naming.prototype.html` bezpośrednio w przeglądarce lub uruchom z katalogu repozytorium na tym samym komputerze:

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

Wejdź na [lokalny prototyp nazwy](http://localhost:8765/prototypes/naming.prototype.html?variant=A). Ten adres nie prowadzi z komputera użytkownika do VPS.

Prototyp rozwijamy na lokalnej gałęzi `codex/prototype-naming`. Po rozstrzygnięciu zachowamy tam materiał źródłowy i zapiszemy uzasadnienie wyboru; do docelowego kodu trafią zatwierdzone decyzje.
