# Forma — Face analysis studio
Made by ze.

Live app: https://deadzone-0.github.io/forma-face-analysis/

Static HTML/CSS/JavaScript. No build or server API is required. Pushes to `main` deploy `dist/` to GitHub Pages through GitHub Actions.

For local development, open http://localhost:4173 after starting the server below.

```
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
node check.mjs
```

MediaPipe Tasks Vision 0.10.32 and the Google face landmarker model are bundled locally under `dist/vendor/`. See the included Apache license. Example image: https://images.unsplash.com/photo-1506794778202-cad84cf45f1d (Unsplash). Google Fonts supplies DM Sans and Manrope; system sans-serif is the fallback.

Photos remain in browser memory. Exports contain measured ratios and the explicitly unvalidated PSL heuristic. This is not a calibrated attractiveness model, identity matching system, or medical assessment. The app measures 2D landmark geometry, so perspective, expression, occlusion, and head pose affect it.
