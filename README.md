# Discipline Tracker — PWA

Installeerbare, offline-werkende versie van je Discipline Tracker. Eén statische map; geen backend nodig.

## Inhoud
- `index.html` — de app (alles zit hierin)
- `manifest.webmanifest` — app-metadata voor installatie
- `sw.js` — service worker (offline + caching)
- `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, `apple-touch-icon-180.png` — iconen

## Belangrijk
- Een PWA vereist **HTTPS** (of `localhost`). Vanaf `file://` werkt de service worker niet; de app draait dan nog wel, maar zonder installeren/offline.
- Houd alle bestanden in dezelfde map. `start_url` en `scope` zijn relatief (`./`).

## Deployen (kies er één)

### GitHub Pages (simpelst)
1. Maak een repo en upload deze map (of de inhoud in de root).
2. Settings → Pages → Deploy from branch → `main` / root.
3. Open de gepubliceerde URL op je telefoon.

### Azure Static Web Apps (past bij Microsoft 365)
1. Push deze map naar een GitHub-repo.
2. Azure Portal → Create → Static Web App → Free plan → koppel de repo.
3. App location: `/` (of de submap). Geen build nodig (geen framework).
4. Open de toegewezen `*.azurestaticapps.net`-URL.

## Installeren op je telefoon
- Open de HTTPS-URL in Chrome/Edge → menu → **App installeren** / **Toevoegen aan beginscherm**.
- Daarna opent hij als losse app, offline beschikbaar, met eigen icoon.

## Opslag & back-up
- Data staat lokaal in **IndexedDB** (met een localStorage-spiegel als extra vangnet). Bestaande data uit de oude versie wordt automatisch overgenomen.
- Maak periodiek een back-up via **Back-up exporteren** en bewaar de `.json` in OneDrive. Dat blijft je verzekering tegen toestelverlies, tot je later cloud-sync toevoegt.
