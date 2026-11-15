# Project instructions

GitHub repository: https://github.com/DeadZone-0/forma-face-analysis
Production: https://deadzone-0.github.io/forma-face-analysis/

The user explicitly requested GitHub and GitHub Pages hosting. Pushes to main deploy dist/ through .github/workflows/pages.yml. Do not deploy to the previous Sites service.

Run locally with `python3 -m http.server 4173 --bind 127.0.0.1 --directory dist`.
Validate geometry with `node check.mjs`. Use relative asset paths so GitHub Pages subdirectory hosting works.
