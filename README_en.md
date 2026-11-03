# Commit Chaos

An educational Git game with a command terminal, visual commit tree, and a 32-mission campaign. The player learns at home, joins ChaosWare, becomes a veteran, and eventually handles production incidents.

## Features

- Four eight-mission chapters in English and Spanish.
- Deterministic Git simulator isolated from React.
- Final-state validation with alternative solutions.
- Branches, commits, index, working tree, remotes, stash, conflicts, and reflog.
- Local progress, achievements, hints, free mode, Chaos Meter, and Chaos Legacy.
- Four endings derived from Git actions.
- Responsive layout, keyboard operation, and reduced-motion support.

## Development

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

## Publishing

The build uses relative paths and is ready for static hosting. This repository does not publish or deploy automatically; publication requires explicit approval.
