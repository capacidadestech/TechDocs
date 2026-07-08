# GitHub Copilot — Instrucciones del proyecto TechDocs

> Reglas para Copilot (que **no** lee `AGENTS.md`). Fuente canónica para humanos y otros agentes:
> **`AGENTS.md`** (raíz) y **`docs/CONVENTIONS.md`**. Mantener en sync. **Responde en español.**

## Contexto

**TechDocs**: documentación técnica interna. Monorepo: `frontend/` (Angular v22), `backend/`
(NestJS, desde M2), `infra/` (Docker, desde M6). Curso de 9 módulos evolutivos
(monolito → microservicios). Eres experto en TypeScript, Angular y desarrollo web escalable;
escribe código funcional, mantenible, performante y accesible.

## Dónde poner las cosas (estructura del proyecto)

- Página/contenedor (smart) → `frontend/src/app/features/<feature>/pages/`
- Componente presentacional (dumb) → `frontend/src/app/features/<feature>/components/`
- Reutilizable cross-feature → `frontend/src/app/shared/`
- Servicio/guard/interceptor singleton → `frontend/src/app/core/`
- Layout/shell → `frontend/src/app/layouts/`
- **Layouts separados**: `AuthLayout` (login, pantalla completa) vs `DashboardLayout`.
- **Routing**: features autocontenidas con `*.routes.ts` *lazy* (`loadChildren`).
- **Estilos**: SCSS + **variables CSS** del design system (`var(--color-surface)`,
  `var(--color-foreground)`…). **Nunca** colores hex literales. Sin frameworks. Iconos: SVG inline (de lucide.dev).
- **Naming** (CLI v22): archivos `kebab-case` sin sufijo `.component`; selector `app-<kebab>`.

## TypeScript

- Strict type checking. Prefiere inferencia cuando el tipo es obvio.
- **Evita `any`**; usa `unknown` cuando el tipo es incierto. Modelos como `interface` en `*.model.ts`.

## Angular

- Usa siempre **standalone components** (no `NgModule`).
- **NO** pongas `standalone: true` en el decorador: es el **default en Angular v20+**.
- Usa **signals** para el estado; `computed()` para estado derivado; en signals usa `update`/`set`
  (no `mutate`).
- **Lazy loading** para rutas de feature.
- **NO** uses los decoradores `@HostBinding` / `@HostListener`: pon los host bindings en el objeto
  `host` del decorador `@Component`/`@Directive`.
- Usa `NgOptimizedImage` para imágenes estáticas (no aplica a base64 inline).

## Componentes

- Pequeños y de responsabilidad única.
- Usa funciones `input()` y `output()` (no decoradores `@Input()/@Output()`).
- `computed()` para estado derivado. Plantillas inline para componentes pequeños.
- Prefiere **Reactive forms** sobre template-driven.
- **NO** uses `ngClass` ni `ngStyle`: usa bindings `[class.x]` / `[style.x]`.
- Inyección con `inject()` (no por constructor). Servicios singleton con `providedIn: 'root'`.

## Plantillas

- Control flow nativo: `@if` / `@for` (siempre con `track`) / `@switch`. **Nunca** `*ngIf`,
  `*ngFor`, `*ngSwitch`. Usa el `async` pipe para observables. Mantén la lógica fuera de la plantilla.

## Accesibilidad (WCAG AA)

- Debe pasar checks AXE: gestión de foco, contraste de color y atributos ARIA correctos.

## Proceso

- Commits: **Conventional Commits** (`feat(scope): …`). Ramas `feat/ · fix/ · docs/ …`.
- Cambios mínimos y acotados; no inventes APIs; nunca commitees secretos (usa `.env`).
- Antes de avanzar de tarea, confirma con el usuario (ver protocolo en `AGENTS.md` §5).

Detalle completo en `AGENTS.md` y `docs/CONVENTIONS.md`.
