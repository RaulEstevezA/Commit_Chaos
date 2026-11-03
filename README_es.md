# Commit Chaos

Juego educativo de Git con terminal de comandos, árbol visual y una campaña de 32 misiones. El jugador aprende en casa, entra en ChaosWare, se convierte en veterano y termina resolviendo incidentes de producción.

## Jugar

**[Jugar a Commit Chaos](https://raulesteveza.github.io/games/Commit_Chaos/)**

Este es el repositorio del código fuente. Para jugar debe utilizarse la versión web enlazada arriba; el repositorio está orientado al desarrollo y mantenimiento del juego, no a su distribución para uso local.

## Contenido

- Cuatro capítulos de ocho misiones, en español e inglés.
- Simulador Git determinista separado de React.
- Validación por estado final y soluciones alternativas.
- Ramas, commits, índice, working tree, remotos, stash, conflictos y reflog.
- Progreso local, logros, ayudas, modo libre, Chaos Meter y Chaos Legacy.
- Cuatro finales derivados de las acciones Git.
- Diseño responsive, navegación por teclado y movimiento reducido.

## Desarrollo y colaboración

Estas instrucciones son para quienes quieran inspeccionar o modificar el código fuente:

```bash
npm install
npm run dev
```

Pruebas y compilación:

```bash
npm test
npm run build
```

El progreso se guarda únicamente en el navegador con la clave versionada `commit-chaos.progress`. El juego no envía datos a ningún servidor.

## Versión web

La compilación utiliza rutas relativas y está preparada para alojamiento estático. La versión para jugadores está disponible en **[raulesteveza.github.io/games/Commit_Chaos](https://raulesteveza.github.io/games/Commit_Chaos/)**.
