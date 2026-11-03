# Commit Chaos

Juego educativo de Git con terminal de comandos, árbol visual y una campaña de 32 misiones. El jugador aprende en casa, entra en ChaosWare, se convierte en veterano y termina resolviendo incidentes de producción.

## Contenido

- Cuatro capítulos de ocho misiones, en español e inglés.
- Simulador Git determinista separado de React.
- Validación por estado final y soluciones alternativas.
- Ramas, commits, índice, working tree, remotos, stash, conflictos y reflog.
- Progreso local, logros, ayudas, modo libre, Chaos Meter y Chaos Legacy.
- Cuatro finales derivados de las acciones Git.
- Diseño responsive, navegación por teclado y movimiento reducido.

## Desarrollo

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

## Publicación

La compilación usa rutas relativas y está preparada para alojamiento estático. Este repositorio no publica ni despliega automáticamente; cualquier publicación requiere autorización expresa.
