# Psychoterapie Žáček

Static website for [psychoterapie-zacek.cz](https://psychoterapie-zacek.cz).

Cloudflare Pages deploys the `master` branch. The build command is:

```sh
./scripts/build.sh
```

It writes the public website to `dist/`. Keep private files, repository metadata,
and deployment configuration outside that directory.

To check the production build locally:

```sh
./scripts/build.sh
python3 -m http.server 4173 --directory dist
```

## Design assets

The portrait in `assets/martin.webp` is a compressed copy of the existing
`assets/martin.jpg`. The payment QR code is unchanged. The page uses system fonts
and CSS for its background; no JavaScript or new runtime dependencies are required.

`assets/upol-logo.png` is the official Czech horizontal logo from Palacký
University's [visual identity downloads](https://www.vizual.upol.cz/logotypy.html),
file `PNG_web/UP_logo_horizont_cz.png` in `UP_logotypy.zip`, retrieved 2026-09-12.

Training provider logos, retrieved from their official websites on 2026-09-12:
- `assets/actplus-logo.png`: [Institut ACT+](https://institutactplus.cz/wp-content/uploads/2024/06/logoblbakvalitaactplus.png).
- `assets/pca-logo.svg`: [Český institut PCA Brno](https://rogers.cz/svg/logo.svg).
- `assets/npi-logo.svg`: [Národní pedagogický institut ČR](https://www.npi.cz/images/template/logo_npi_svg.svg).
These identify the education providers; they do not indicate endorsement.
It appears with Martin's education, in its original colours and proportions.
