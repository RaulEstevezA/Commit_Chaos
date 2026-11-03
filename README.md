# Commit Chaos

An interactive Git adventure where commands—not quiz answers—solve 32 increasingly chaotic development incidents.

- [English](README_en.md)
- [Español](README_es.md)

## Run locally

```bash
npm install
npm run dev
```

## Verify

```bash
npm test
npm run build
```

The app is static and uses relative asset paths for GitHub Pages compatibility. Progress stays in the browser under `commit-chaos.progress`. Nothing is sent to a server.

## Architecture

- `src/core/git`: deterministic Git state and command simulator.
- `src/core/missions`: declarative final-state validation.
- `src/core/progression`: achievements, chaos and endings.
- `src/data`: 32 localized mission definitions.
- `src/ui`: React screens and accessible controls.
- `tests`: parser, simulator, campaign and progression tests.

This repository does not deploy automatically. Publication requires explicit approval.
