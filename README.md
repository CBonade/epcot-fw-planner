# Epcot Food & Wine Planner (2026)

A small mobile-friendly planner for the Epcot International Food & Wine
Festival. Browse the full marketplace menu, pick what you want, rank it by
priority, see where your picks cluster on a schematic World Showcase map,
and cross items off as you get them.

Everything is stored locally in your browser (`localStorage`) — no account,
no backend, no syncing between devices.

## Features

- **Browse** — every marketplace booth (World Showcase pavilions + themed
  kiosks), searchable by dish, country, or dietary tag.
- **My List** — your picks in priority order, with up/down re-ranking. Items
  that share a marketplace with another pick on your list are flagged so you
  can plan one stop for multiple things (e.g. "Same stop as #5").
- **Map** — a schematic (not GPS-precise) map of the World Showcase
  promenade with pins for every marketplace on your list.
- Cross items off once acquired, or remove them if you change your mind.

## Menu data

The menu data in `src/data/menuData.js` was compiled from public festival
menu roundups (Disney Food Blog, BlogMickey, AllEars, WDW Prep School, DVC
Shop, WDWNT, Resortsgal) published in August 2026. A few newer kiosks
(Islands of the Caribbean, Milled & Mulled, Bramblewood Bites, Swirled
Showcase, Shimmering Sips, Brew-Wing Lab) hadn't published itemized menus at
compile time — they're included with empty item lists so they still show up
on the map/browse list. Double-check prices and confirm current offerings
against Disney's official festival page before your trip, as festival menus
can change.

## Local development

```bash
npm install
npm run dev
```

## Deploying to Vercel

This repo includes a `vercel.json` with the build already configured
(`npm run build`, output directory `dist`). Once the repo is connected to a
Vercel project (Vercel auto-detects the Vite framework), every push to the
connected branch deploys automatically.

Alternatively, via the Vercel CLI:

```bash
npm run build
npx vercel --prod
```
