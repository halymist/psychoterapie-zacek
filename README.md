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
