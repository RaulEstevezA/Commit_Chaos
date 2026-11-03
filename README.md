# Commit Chaos

An interactive Git adventure where commands—not quiz answers—solve 32 increasingly chaotic development incidents.

- **[Play Commit Chaos](https://raulesteveza.github.io/games/Commit_Chaos/)**

- [English](README_en.md)
- [Español](README_es.md)

## About this repository

This is the source repository for the published browser game. It is intended for development and maintenance; players should use the hosted version linked above. Progress stays in the player’s browser and nothing is sent to a server.

## Development

For contributors who want to inspect or modify the source:

```bash
npm install
npm run dev
```

## Verify

```bash
npm test
npm run build
```

The app is static and uses relative asset paths for GitHub Pages compatibility. Progress is stored under the versioned `commit-chaos.progress` browser key.

## Architecture

- `src/core/git`: deterministic Git state and command simulator.
- `src/core/missions`: declarative final-state validation.
- `src/core/progression`: achievements, chaos and endings.
- `src/data`: 32 localized mission definitions.
- `src/ui`: React screens and accessible controls.
- `tests`: parser, simulator, campaign and progression tests.

The playable version is published at the URL shown above.
