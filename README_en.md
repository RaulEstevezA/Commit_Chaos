# Commit Chaos

<p align="center"><img src="public/commit-chaos-logo.png" alt="Commit Chaos logo" width="220"></p>

An educational Git game with a command terminal, visual commit tree, and a 32-mission campaign. The player learns at home, joins ChaosWare, becomes a veteran, and eventually handles production incidents.

## Play

**[Play Commit Chaos](https://raulesteveza.github.io/games/Commit_Chaos/)**

This is the source-code repository. Players should use the hosted version linked above; the repository is intended for development and maintenance rather than local game distribution.

## Features

- Four eight-mission chapters in English and Spanish.
- Deterministic Git simulator isolated from React.
- Final-state validation with alternative solutions.
- Branches, commits, index, working tree, remotes, stash, conflicts, and reflog.
- Local progress, achievements, hints, free mode, Chaos Meter, and Chaos Legacy.
- Four endings derived from Git actions.
- Responsive layout, keyboard operation, and reduced-motion support.

## Development and contribution

These instructions are for contributors who want to inspect or modify the source:

```bash
npm install
npm run dev
```

Tests and production build:

```bash
npm test
npm run build
```

Progress is stored only in the browser under the versioned `commit-chaos.progress` key. The game sends no data to a server.

## Web version

The build uses relative paths and is ready for static hosting. The player-facing version is available at **[raulesteveza.github.io/games/Commit_Chaos](https://raulesteveza.github.io/games/Commit_Chaos/)**.
