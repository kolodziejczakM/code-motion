# CODE-MOTION — rebranding

Pracujemy iteracyjnie. Obecny etap: poszukiwanie nazwy; żadna propozycja nie została zatwierdzona. Push wymaga zgody właściciela repozytorium.

- [Brief i potwierdzone preferencje](docs/rebranding/brief.md)
- [Nazwy, runda 01 — propozycje, ograniczenia i źródła](docs/rebranding/naming-round-01.md)
- [Nazwy, runda 02 — angielskie i własne](docs/rebranding/naming-round-02.md)

## Prototyp nazwy

To jednorazowy materiał porównawczy, nie kod strony docelowej ani projekt logo. Zawiera dwie rundy nazw w jednakowej typografii, trzy konteksty użycia i filmografię przekazaną przez autora. Nie ma zewnętrznych zależności ani trwałego zapisu wyborów.

Podgląd na komputerze i telefonie po połączeniu z Tailscale:

[Prototyp nazwy — runda 02, HTTPS w tailnecie](https://vps.tailfb5686.ts.net:8766/prototypes/naming.prototype.html?round=2&variant=A)

Parametr `round` przyjmuje 1 lub 2, a `variant` wybiera nazwę: A–D w rundzie 01, A–E w rundzie 02. Dotychczasowe linki bez parametru `round` zachowują rundę 01. Strzałki w dolnym pasku i na klawiaturze przełączają nazwy. Kontekst i film pozostają wybrane do przeładowania strony.

Serwer VPS i komputer użytkownika mają różne adresy `localhost`. Na tym VPS podgląd obsługuje Caddy na porcie `8766`, z nasłuchem wyłącznie na adresach Tailscale IPv4 i IPv6. Serwuje bezpośrednio pliki prototypów i notatki rebrandingu, więc nie wymaga procesu Pythona ani tunelu SSH. Dostęp urządzeń zależy też od reguł tailnetu.

Wpis do konfiguracji: [ops/caddy/prototypes.caddy](ops/caddy/prototypes.caddy). Wpis jest już zapisany w `/etc/caddy/Caddyfile`, a działający podgląd obsługuje Caddy. Edycje plików prototypu są dostępne od razu, bez przeładowania serwera.

### Uruchomienie na komputerze z lokalną kopią repozytorium

Otwórz plik `prototypes/naming.prototype.html` bezpośrednio w przeglądarce lub uruchom z katalogu repozytorium na tym samym komputerze:

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

Wejdź na [lokalny prototyp nazwy](http://localhost:8765/prototypes/naming.prototype.html?variant=A). Ten adres nie prowadzi z komputera użytkownika do VPS.

Prototyp rozwijamy na lokalnej gałęzi `codex/prototype-naming`. Po rozstrzygnięciu zachowamy tam materiał źródłowy i zapiszemy uzasadnienie wyboru; do docelowego kodu trafią zatwierdzone decyzje.
