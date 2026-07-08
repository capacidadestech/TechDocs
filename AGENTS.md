# AGENTS.md — Punto de partida para cualquier asistente de IA

> **Documento canónico y genérico para trabajar en TechDocs.** Es **agnóstico de herramienta**:
> lo leen los asistentes que soportan `AGENTS.md` (Claude, Cursor, Gemini, …) y cualquier
> integrante humano. **Excepción:** GitHub Copilot no lee este archivo, por lo que sus reglas
> viven (resumidas) en `.github/copilot-instructions.md` — mantén ambos en sync.
>
> **Si acabas de llegar: lee este archivo completo antes de tocar nada.**

---

## 1. Qué es TechDocs

Sistema de gestión de **documentación técnica interna**, construido como **curso práctico de
9 módulos evolutivos**: empieza como **monolito** (Fase 1, M1–M5) y evoluciona a
**microservicios** (Fase 2, M6–M9). Cada módulo refuerza, sobre un sistema real, temas con alto
índice de error del equipo.

- Alcance y ruta: [`docs/ROADMAP.md`](docs/ROADMAP.md) · Brief original (plan en PDF): [`docs/source/`](docs/source/)
- Referencia visual analizada: [`docs/reference/`](docs/reference/)

## 2. Mapa del repositorio

```
TechDocs/
├── README.md                    # portada (humano)
├── AGENTS.md                    # ESTE archivo (canónico, genérico)
├── .github/copilot-instructions.md   # reglas para Copilot (no lee AGENTS.md)
├── docs/
│   ├── ROADMAP.md · CONVENTIONS.md
│   ├── modules/                 # spec por módulo (_TEMPLATE.md → m1.md … m9.md)
│   ├── architecture/            # diagramas (cuando aplique)
│   ├── source/                  # brief original (plan PDF, kick-off)
│   └── reference/               # análisis de la app de referencia (DocVault)
├── frontend/                    # Angular v22 — UI principal (Fase 1+)
├── backend/                     # NestJS — API (desde M2)
└── infra/                       # Docker Compose, observabilidad, deploy (desde M6)

# services/ → se crea en la Fase 2 (M7), cuando existan microservicios reales. NO antes.
```

## 3. Stack tecnológico

| Capa | Tecnología | Desde |
|------|-----------|:-----:|
| Frontend | Angular v22 (standalone, signals, `@if`/`@for`) | M1 |
| Estilos | SCSS + variables CSS (design system) + iconos SVG inline | M1 |
| Backend | NestJS v10+ · TypeORM · PostgreSQL | M2 |
| Auth | JWT · Passport.js | M3 |
| Tests | Vitest / Jest (unit) · Cypress (E2E) | M4 |
| Infra | Docker · GitHub Actions | M6 |
| Microservicios | RabbitMQ · OpenTelemetry · Grafana | M7–M9 |

## 4. Comandos clave

Cada carpeta es un **proyecto independiente** con su propio `package.json`. Los comandos se
ejecutan **dentro** de cada carpeta (no hay `package.json` ni workspaces en la raíz).

```bash
# Frontend (Angular):
cd frontend
npm install        # dependencias del frontend
npm start          # levanta el Angular en http://localhost:4200
npm test           # tests del frontend

# backend/ tendrá su propio package.json y comandos desde M2.
```

---

## 5. Protocolo de trabajo (cómo abordar cada tarea)

Esta es la **forma de trabajar**. **Conversa siempre en español.**

Cada módulo pasa por **dos fases**: **A) Apertura** (planificar, una sola vez) y
**B) Desarrollo** (ciclo por tarea). El paso 1 de "Al iniciar" decide en cuál estás.

### Al iniciar (cada sesión)
1. Sincroniza (`git pull`) y lee **[`docs/ROADMAP.md`](docs/ROADMAP.md)** → identifica el **módulo activo**.
2. **Checkpoint:** ¿el módulo activo tiene su **`docs/modules/mN.md`** con alcance + DoD?
   - **No** (no existe o es solo el template vacío) → **Fase A — Apertura** (abajo).
   - **Sí** → **Fase B — Desarrollo** (abajo).

### Fase A — Apertura del módulo (una vez, con el equipo)
Planificar el incremental **antes de codificar nada**:
1. Lee el alcance del módulo en el **brief**: `docs/source/plan-desarrollo-v1.0.pdf` describe
   **cada módulo M1–M9** con su tabla "qué se implementa". **Esa es la fuente de las tareas.**
2. Copia [`docs/modules/_TEMPLATE.md`](docs/modules/_TEMPLATE.md) → `mN.md`, **cita la sección
   del PDF en `Fuente:`** (trazabilidad) y llénalo: objetivo, temas débiles, **tabla de alcance
   (las tareas)** y **DoD**.
3. Marca el módulo **🚧** en el ROADMAP y **confírmalo con el equipo** antes de desarrollar.

> Las tareas y su progreso **viven en `mN.md`** (tabla de alcance + DoD). El **ROADMAP solo
> lleva el estado de alto nivel** de los 9 módulos. No se duplica.

### Fase B — Desarrollo (ciclo, por tarea)
1. Abre `mN.md` → revisa alcance y **DoD**: lo marcado = **dónde quedamos**. Repasa
   [`docs/CONVENTIONS.md`](docs/CONVENTIONS.md). Reconstruye el contexto **antes de proponer nada**.
2. **Orden sugerido**: módulos M1→M9 y, dentro, el orden de la tabla de alcance.
3. Toma la **siguiente tarea pendiente**. Se trabaja **directo en `dev`** (sin feature branches).
4. **Pregunta siempre al usuario en qué seguir**, sugiriendo lo pendiente según la ruta.
   **No avances de tarea sin confirmar.** Una tarea a la vez.
5. **Antes de cerrar la tarea:** documenta, **marca el DoD** en `mN.md`, deja listo el terreno
   para lo siguiente, y **commitea en `dev`** (Conventional Commits).

### Cierre de módulo
- No se cierra hasta que su **DoD esté completo** y la **documentación actualizada**.
- Integra **`dev` → `main`** (main queda estable con el módulo cerrado).
- Marca el módulo **✅** en el ROADMAP, **propón el siguiente** de la ruta y espera confirmación.

---

## 6. Estándares y buenas prácticas

Complementan el protocolo con estándares de la industria. (Las convenciones de *código* —
Angular style guide, naming, lint— viven en [`docs/CONVENTIONS.md`](docs/CONVENTIONS.md).)

**Control de versiones — _Conventional Commits_:**
- **Ramas:** se trabaja **directo en `dev`** (integración diaria); **`main`** se mantiene estable
  y se actualiza **solo al cerrar un módulo** (merge `dev` → `main`).
- Commits atómicos con formato `tipo(scope): descripción`
  (ej. `feat(documents): listado con @for y trackBy`).
- No rompas `dev`; mantén `main` siempre estable. Diffs pequeños; **un commit = una unidad coherente**.

**Comportamiento del asistente — _IA asistida responsable_:**
- **Plan → confirmar → ejecutar**: en tareas grandes, propón el plan antes de codificar.
- Cambios **mínimos y acotados** al objetivo; no refactorices de más sin acordarlo.
- **No inventes APIs**: verifica contra el código/docs reales; cita `archivo:línea`.
- **Verifica antes de declarar "hecho"** (corre build/tests, observa); reporta con honestidad.
- Acciones **destructivas o irreversibles**: confirma primero.

**Definition of Done — calidad mínima por tarea:**
- Lint + formato en verde (**ESLint + Prettier**); tipado estricto, **sin `any`**.
- Tests pasan (desde M4) y build de producción sin errores.
- Sin `console.log`, código muerto ni comentado.
- DoD del `mN.md` marcado y documentación actualizada en el **mismo** cambio.

**Seguridad — _OWASP_ / _12-Factor config_:**
- **Nunca** commitees secretos: usa `.env` (ignorado) o GitHub Secrets.
- Config por entorno, fuera del código. Valida y sanitiza entradas (formal en M3).

**Documentación — _docs-as-code_:**
- La documentación vive junto al código y se actualiza en el mismo PR.
- Documenta decisiones relevantes en el `mN.md` o el mensaje de commit, no cambios silenciosos.

**Accesibilidad — _WCAG_:**
- HTML semántico, roles/`aria-*`, foco visible y contraste adecuado (los tokens del tema ayudan).

## 7. Convenciones esenciales de código (reglas de oro)

Detalle completo en [`docs/CONVENTIONS.md`](docs/CONVENTIONS.md). Lo mínimo:

**Sí:**
- Angular v22 moderno: `standalone`, `signal()`, `computed()`, `@if`/`@for` (con `track`).
- Componentes **smart/dumb** separados.
- Estilos con **variables CSS** del design system (`var(--color-surface)`…), nunca colores literales.
- Features **autocontenidas** con su propio `*.routes.ts` *lazy*.
- Layouts separados: `AuthLayout` (login, pantalla completa) vs `DashboardLayout` (sidebar + header).

**No:**
- No uses `*ngIf`/`*ngFor` ni `NgModules` (es v22 standalone).
- No metas lógica de negocio en `shared/`.
- No dupliques este contexto en otros archivos; enlaza aquí.
- No crees carpetas que aún no se usan (estructura evolutiva).

## 8. Estado actual

> **M1 — Setup y Fundamentos: ✅ cerrado** (Fase 1, Monolito). Siguiente: **M2** (pendiente de apertura).
> Alcance M1: [`docs/modules/m1.md`](docs/modules/m1.md) · Estado: [`docs/ROADMAP.md`](docs/ROADMAP.md).
