# TechDocs — Sistema de Documentación Técnica

**TechDocs** es una aplicación para gestionar **documentación técnica interna**. Se construye
como un **curso práctico de 9 módulos evolutivos**: arranca con una arquitectura **monolítica**
simple (Fase 1) y evoluciona hacia **microservicios** desplegados en la nube (Fase 2). Cada
módulo refuerza, sobre un sistema real, los temas con mayor índice de error del equipo.

> 🤖 **¿Vas a escribir código (humano o agente IA)?** Lee **[`AGENTS.md`](AGENTS.md)** primero —
> es el manual operativo del repo (convenciones, reglas, onboarding por módulo).

---

## Stack tecnológico

| Capa | Tecnología | Desde |
|------|-----------|:-----:|
| Frontend | Angular v22 (standalone, signals, control flow `@if`/`@for`) | M1 |
| Estilos | SCSS + variables CSS (design system) + iconos SVG inline | M1 |
| Backend | NestJS v10+ · TypeORM · PostgreSQL | M2 |
| Seguridad | JWT · Passport.js | M3 |
| Pruebas | Vitest / Jest (unit) · Cypress (E2E) | M4 |
| Infra | Docker · GitHub Actions | M6 |
| Microservicios | RabbitMQ · OpenTelemetry · Grafana | M7–M9 |

## Estructura del monorepo

```
TechDocs/
├── frontend/     Angular v22 — UI principal (Fase 1+)
├── backend/      NestJS — API REST (desde M2)
├── infra/        Docker Compose, observabilidad y deploy (desde M6)
├── docs/         Plan, roadmap, convenciones, specs por módulo, arquitectura
├── AGENTS.md     Manual operativo para IA y devs
└── README.md     Este archivo
```

> `services/` (microservicios) se añade en la Fase 2 (M7), no antes.

## Fases y módulos

**Fase 1 — Monolito (M1–M5):** Angular + NestJS + PostgreSQL en un proceso/contenedor.
1. **M1** — Setup, monorepo, shell, navegación por carpetas, alta/acciones de documento, directiva, temas, login (UI) ✅
2. **M2** — CRUD + enrutamiento avanzado + Guards
3. **M3** — Seguridad: JWT, interceptores, headers
4. **M4** — Pruebas unitarias + E2E
5. **M5** — Renderizado OnPush + librería `techdocs-ui`

**Fase 2 — Microservicios (M6–M9):** servicios independientes, RabbitMQ, observabilidad y nube.
6. **M6** — CI/CD + Docker · 7. **M7** — Microservicio de búsqueda · 8. **M8** — Telemetría · 9. **M9** — Nube y cierre

Estado detallado en **[`docs/ROADMAP.md`](docs/ROADMAP.md)**.

## Requisitos previos

- **Node.js** 20+ y **npm** 10+
- **Angular CLI** (`npm i -g @angular/cli`)
- **VS Code** + asistente de IA (**Claude / Claude Code**; GitHub Copilot también soportado)
- Docker y PostgreSQL llegan a partir de M2/M6

## Arranque rápido

Cada carpeta es un proyecto independiente; los comandos se corren dentro de ella.

```bash
cd frontend
npm install               # dependencias del frontend
npm start                 # http://localhost:4200
```

## Documentación

| Documento | Para qué |
|-----------|----------|
| [`AGENTS.md`](AGENTS.md) | Manual operativo (convenciones, reglas, onboarding) |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Estado de los 9 módulos |
| [`docs/CONVENTIONS.md`](docs/CONVENTIONS.md) | Convenciones de código y estructura |
| [`docs/modules/`](docs/modules/) | Alcance técnico por módulo (`m1.md`…) |
| [`docs/architecture/`](docs/architecture/) | Arquitectura Fase 1 y Fase 2 |
| [`docs/source/`](docs/source/) | Brief original (plan de desarrollo, kick-off) |

---

**M1 — Setup y Fundamentos: ✅ cerrado.** Siguiente: **M2**. Ver [`docs/modules/m1.md`](docs/modules/m1.md) y [`docs/ROADMAP.md`](docs/ROADMAP.md).
