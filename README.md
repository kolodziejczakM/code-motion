# CODE-MOTION — rebranding

Pracujemy iteracyjnie. Obecny etap: poszukiwanie nazwy; żadna propozycja nie została zatwierdzona. Push wymaga zgody właściciela repozytorium.

- [Brief i potwierdzone preferencje](docs/rebranding/brief.md)
- [Nazwy, runda 01 — propozycje, ograniczenia i źródła](docs/rebranding/naming-round-01.md)

## Prototyp nazwy

To jednorazowy materiał porównawczy, nie kod strony docelowej ani projekt logo. Zawiera cztery nazwy w jednakowej typografii, trzy konteksty użycia i filmografię przekazaną przez autora. Nie ma zewnętrznych zależności ani trwałego zapisu wyborów.

Podgląd na komputerze i telefonie po połączeniu z Tailscale:

[Prototyp nazwy — HTTPS w tailnecie](https://vps.tailfb5686.ts.net:8766/prototypes/naming.prototype.html?variant=A)

Parametr `variant` przyjmuje A, B, C lub D. Strzałki w dolnym pasku i na klawiaturze przełączają nazwy. Kontekst i film pozostają wybrane do przeładowania strony.

Serwer VPS i komputer użytkownika mają różne adresy `localhost`. Na tym VPS podgląd obsługuje Caddy na porcie `8766`, z nasłuchem wyłącznie na adresach Tailscale IPv4 i IPv6. Serwuje bezpośrednio pliki prototypów i notatki rebrandingu, więc nie wymaga procesu Pythona ani tunelu SSH. Dostęp urządzeń zależy też od reguł tailnetu.

Wpis do konfiguracji: [ops/caddy/prototypes.caddy](ops/caddy/prototypes.caddy). Działająca konfiguracja została przeładowana przez lokalne API Caddy. Zapis wpisu do `/etc/caddy/Caddyfile` pozostaje krokiem wymagającym `sudo`; do tego czasu podgląd może zniknąć po restarcie usługi lub przeładowaniu pliku. Przygotowany jednorazowy skrypt na VPS: `/tmp/code-motion-persist-caddy.sh`.

### Uruchomienie na komputerze z lokalną kopią repozytorium

Otwórz plik `prototypes/naming.prototype.html` bezpośrednio w przeglądarce lub uruchom z katalogu repozytorium na tym samym komputerze:

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

Wejdź na [lokalny prototyp nazwy](http://localhost:8765/prototypes/naming.prototype.html?variant=A). Ten adres nie prowadzi z komputera użytkownika do VPS.

Prototyp rozwijamy na lokalnej gałęzi `codex/prototype-naming`. Po rozstrzygnięciu zachowamy tam materiał źródłowy i zapiszemy uzasadnienie wyboru; do docelowego kodu trafią zatwierdzone decyzje.
