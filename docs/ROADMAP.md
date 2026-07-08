# ROADMAP — Estado de los módulos

Tablero de avance del proyecto. **Es la fuente de verdad del "dónde vamos"**: cualquier
asistente o integrante lo lee primero (ver protocolo en [`AGENTS.md`](../AGENTS.md)).

Leyenda: ✅ done · 🚧 en progreso · ⬜ pendiente

## Fase 1 — Monolito

| Módulo | Tema | Estado | Spec |
|:------:|------|:------:|------|
| **M1** | Setup, monorepo, shell, navegación por carpetas (árbol + tabla + tags), alta/acciones de documento, directiva custom, temas, login (UI) | ✅ | [m1.md](modules/m1.md) |
| M2 | CRUD NestJS + PostgreSQL, enrutamiento avanzado, Guards, lazy loading | ⬜ | — |
| M3 | Seguridad: JWT, interceptores, sanitización, headers | ⬜ | — |
| M4 | Pruebas unitarias + E2E (Cypress), cobertura | ⬜ | — |
| M5 | Renderizado OnPush, signals, librería `techdocs-ui` | ⬜ | — |

## Fase 2 — Microservicios

| Módulo | Tema | Estado | Spec |
|:------:|------|:------:|------|
| M6 | CI/CD con GitHub Actions + Docker | ⬜ | — |
| M7 | Primer microservicio (búsqueda) + RabbitMQ → crea `services/` | ⬜ | — |
| M8 | Telemetría distribuida (OpenTelemetry + Grafana) | ⬜ | — |
| M9 | Nube y cierre (deploy + retrospectiva) | ⬜ | — |

> **Progreso fino del módulo activo →** en su `docs/modules/mN.md` (tabla de alcance + DoD).
> Aquí solo se lleva el estado de alto nivel. Para el M1: [`modules/m1.md`](modules/m1.md).

---

## Cómo actualizar este tablero

- Al **empezar** un módulo o tarea: márcalo 🚧.
- Al **cumplir el DoD** (en `docs/modules/mN.md`): márcalo ✅ y enlaza el spec.
- Mantén una sola fila por módulo. Actualiza en el **mismo cambio** que el código (docs-as-code).
