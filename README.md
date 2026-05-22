# kubilas7

Mobile-ready GitHub Pages build for **Hot Tub Hero — The Long Forest Trip**.

## Run on iPhone

Open the live game:

```text
https://mataspaulinas.github.io/kubilas7/
```

On iPhone: open the Pages URL in Safari, rotate sideways, tap **START**, then use the on-screen controls.

## Save to Home Screen on iPhone

1. Open the game URL in Safari.
2. Tap the **Share** button.
3. Choose **Add to Home Screen**.
4. Keep the name as **Hot Tub Hero** or rename it.
5. Tap **Add**.

After that, launch it from the iPhone home screen. It should open without Safari’s normal browser frame and feel closer to a small app.

## PWA / app-mode files

- `index.html` — GitHub Pages loader with app metadata.
- `manifest.webmanifest` — PWA manifest with name, theme, orientation, and icon.
- `sw.js` — service worker for app-shell caching.
- `icons/hot-tub-icon.svg` — home-screen/browser icon source.
- `game/part-00.html` to `game/part-08.html` — full game split into browser-loaded chunks.
- `.nojekyll` — makes GitHub Pages serve the static files directly.

## If the old version keeps opening

On iPhone Safari, refresh the page once or close and reopen it from the home-screen icon. The service worker may keep the last loaded version for a moment while the new cache updates.
