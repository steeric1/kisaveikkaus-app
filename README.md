# Kisaveikkaus

Rekisteröitymiskoodit luodaan tällä hetkellä tiedostoon `data/tokens.txt`, joka siis `.gitignore`ssa. Oikeasti jatkossa sitten tietokantaa. Numero 0/1 koodin jälkeen välilyönnillä erotettuna kertoo, onko koodi käytetty.

Komponentit tarjoaa [shadch-svelte](https://www.shadcn-svelte.com/).

### Tietokanta

Tällä hetkellä tietokantana [pocketbase](https://pocketbase.io/), helppo asentaa lokaalisti. Itse asentanut globaalisti ja sitten kaikki siihen liittyvä on hakemistossa `pb/`, joka niin ikään ignoroituna.

### Bun

Käytän Bunia tässä NPM:n sijaan, koska kehityksen aallonharja.
