# Publikacja Tower Lady Pictures na GitHub Pages

Docelowym adresem jest `https://towerlady.com/`. GitHub Actions buduje statyczny HTML, CSS i JavaScript z `main`, a GitHub Pages serwuje wynik. Domena i DNS pozostają w Hostingerze.

## Prywatne repozytorium

Dla repozytorium należącego do konta osobistego GitHub Pages obsługuje prywatne źródła w planie GitHub Pro. GitHub Free obsługuje Pages dla publicznych repozytoriów. Sprawdź swój plan w ustawieniach konta, w sekcji rozliczeń. Repozytorium `kolodziejczakM/code-motion` jest prywatne. Odczyt API z 23 listopada 2026 nie udostępnił nazwy planu. [Dostępność GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)

Strona publikowana przez ten workflow będzie publicznie dostępna pod własną domeną. Do publikacji trafia zawartość `dist/`, w tym statyczne strony, fonty i grafiki. Przewodnik `/design/` ma `noindex` i pozostaje dostępny przez bezpośredni adres.

## Jednorazowe ustawienia GitHub

1. Otwórz [Pages w ustawieniach konta](https://github.com/settings/pages). Dodaj `towerlady.com` do **Verified domains**. GitHub pokaże nazwę i wartość rekordu TXT. Wpisz je w edytorze DNS Hostingera i kliknij **Verify** po propagacji. Zachowaj rekord po weryfikacji. [Weryfikacja własnej domeny](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
2. Otwórz [Settings → Pages repozytorium](https://github.com/kolodziejczakM/code-motion/settings/pages). W **Build and deployment → Source** wybierz **GitHub Actions**.
3. W **Custom domain** wpisz `towerlady.com` i zapisz. Zrób to przed przełączeniem rekordów A i CNAME w Hostingerze. Przy publikacji przez Actions domenę ustawia się tutaj. Plik `CNAME` w repozytorium jest ignorowany. [Konfiguracja domeny](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
4. Po utworzeniu środowiska `github-pages` sprawdź jego ustawienia w **Settings → Environments**. Dopuszczona gałąź wdrożenia powinna obejmować `main`. Workflow ma również warunek pozwalający budować tylko tę gałąź. [Środowisko wdrożenia Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

## DNS w Hostingerze

Otwórz **Domains → DNS**, wybierz `towerlady.com` i przejdź do **DNS records**. Alternatywna ścieżka w panelu to **Domain portfolio → Manage → DNS / Nameservers**. Domena używa już serwerów nazw `apollo.dns-parking.com` i `athena.dns-parking.com`, więc Hostinger zarządza aktywną strefą. [Edytor rekordów Hostingera](https://www.hostinger.com/support/1583249-how-to-manage-dns-records-at-hostinger/)

Dodaj te rekordy. Każdy adres A lub AAAA stanowi osobny rekord. TTL może wynosić 3600 s.

| Typ | Nazwa w Hostingerze | Wartość |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `kolodziejczakm.github.io` |
| TXT | dokładna nazwa z **Verified domains** | kod wyświetlony przez GitHub |

Adresy pochodzą z dokumentacji GitHuba. Rekord `www` wskazuje na host konta GitHub. Gdy domeną kanoniczną w Pages jest `towerlady.com`, GitHub przekieruje wariant `www` na ten adres. [Rekordy DNS dla Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

Zastąp dotychczasowy rekord A `@` wskazujący na `2.57.91.91` i CNAME `www` wskazujący na `towerlady.com`. To stan odczytany 23 listopada 2026. Sprawdź strefę przed zapisaniem zmian, aby usunąć inne rekordy A, AAAA lub ALIAS kolidujące z powyższymi adresami dla tych samych hostów. Zachowaj rekordy usług pocztowych, TXT i innych subdomen. [DNS i wystawienie certyfikatu Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)

## Pierwsza publikacja

1. Włącz Pages i zapisz domenę w ustawieniach repozytorium.
2. Wypchnij gałąź z workflow `.github/workflows/deploy-pages.yml` i scal ją do `main`.
3. Otwórz **Actions → Deploy GitHub Pages** i zaczekaj na powodzenie zadań `build` oraz `deploy`. GitHub buduje stronę na swoim runnerze i publikuje artefakt `dist/`.
4. Przełącz rekordy A, AAAA i CNAME w Hostingerze. W **Settings → Pages** zaczekaj na poprawny DNS check i wystawienie certyfikatu, a potem włącz **Enforce HTTPS**. Zmiany DNS mogą propagować się do 24 godzin. [HTTPS w GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
5. Otwórz `https://towerlady.com/`, `https://www.towerlady.com/`, obie wersje językowe, favicon i `/sitemap.xml`. Sprawdź nieistniejący adres i odpowiedź HTTP 404.
6. Zweryfikuj własność domeny w Google Search Console i zgłoś `https://towerlady.com/sitemap.xml`.

`astro.config.mjs` ma produkcyjne `site: "https://towerlady.com"` i `base: "/"`. Ścieżki są gotowe do publikacji na własnej domenie. Przed podpięciem domeny podgląd `github.io/code-motion/` ma inną ścieżkę bazową. [Konfiguracja Astro dla Pages](https://docs.astro.build/en/guides/deploy/github/)

Katalog główny otwiera `/pl/` za pomocą `location.replace()`. Dokument startowy ma czarne tło zapisane w HTML i pustą treść. Zachowuje parametry adresu oraz fragment po `#`. Przy wyłączonym JavaScripcie przekierowanie wykonuje znacznik `meta refresh` z czasem 0 s. GitHub Pages automatycznie obsługuje plik `404.html` jako stronę błędu ze statusem 404. [Strona 404 w Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)

## Kolejne wydania

Każda zmiana w `main`, w tym merge pull requesta, uruchamia workflow. Instalacja używa `npm ci` i pliku `package-lock.json`, a budowanie `npm run build`. Zadanie publikacji rusza dopiero po udanym buildzie. Kolejne wdrożenia korzystają z jednej kolejki. Workflow używa automatycznego `GITHUB_TOKEN` i OIDC. Uprawnienia publikacji należą do zadania `deploy`. [Workflow publikacji Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

Możesz ponowić publikację przez **Actions → Deploy GitHub Pages → Run workflow**, wskazując `main`. Przy wycofaniu zmiany zrób revert na `main`. Powstały commit uruchomi publikację poprzedniej treści.

## Development przez Tailscale

Na VPS uruchamiaj `npm run build:preview`. Generuje on prywatny podgląd w `prototypes/tower-lady/astro/`, z właściwą ścieżką bazową i oznaczeniem `noindex`. Caddy udostępnia go pod dotychczasowym adresem Tailscale. Produkcja i podgląd budują się w oddzielnych katalogach.
