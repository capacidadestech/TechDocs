# CONVENTIONS.md — Convenciones de código y estructura

Reglas **de código** del proyecto (las de *proceso* están en [`AGENTS.md`](../AGENTS.md)).
Basadas en el **Angular Style Guide** (v20+) y en el naming que genera el CLI de Angular v22.

---

## 1. Estructura de carpetas (frontend)

```
frontend/src/app/
├── core/        # singletons: servicios, guards, interceptores, modelos globales (se proveen 1 vez)
├── layouts/     # shells con <router-outlet>: auth-layout/, dashboard-layout/
├── features/    # dominios autocontenidos: <feature>/{pages,components}/ + <feature>.routes.ts
└── shared/      # reutilizable cross-feature SIN lógica de negocio: components/, directives/, pipes/
```

**Dónde va cada cosa:**

| Necesito crear… | Va en… |
|-----------------|--------|
| Página/contenedor (smart) de una feature | `features/<feature>/pages/<nombre>/` |
| Componente presentacional (dumb) de una feature | `features/<feature>/components/<nombre>/` |
| Componente reutilizable en varias features | `shared/components/<nombre>/` |
| Directiva / pipe reutilizable | `shared/directives/` · `shared/pipes/` |
| Servicio / guard / interceptor singleton | `core/services|guards|interceptors/` |
| Modelo / interface de dominio | `shared/models/` (o `core/models/` si es global) |
| Layout/shell | `layouts/<nombre>/` |

> No crees carpetas vacías "por si acaso": estructura **evolutiva** (ver `AGENTS.md`).

## 2. Naming (Angular v22 / CLI)

- **Archivos:** `kebab-case`, **sin** sufijo `.component`/`.service`/`.directive`.
  Ej.: `document-list.ts`, `document-list.html`, `document-list.scss`, `document.ts` (servicio),
  `highlight.ts` (directiva), `document.model.ts` (modelo).
- **Clases:** `PascalCase`, **sin** sufijo `Component`/`Service`. Ej.: `class DocumentList`,
  `class DocumentService` *(servicios sí conservan `Service` por claridad)*, `class Highlight`.
- **Selectores de componente:** `app-<kebab>` (prefijo `app`). Ej.: `app-document-list`.
- **Selectores de directiva:** `appCamelCase`. Ej.: `[appThemeSwatch]`.
- **Rutas:** un fichero por feature: `<feature>.routes.ts` exportando `FEATURE_ROUTES`
  (ej. `DOCUMENTS_ROUTES`).

> Genera siempre con el CLI (`ng generate …`) para respetar el naming automáticamente.

## 3. Componentes

- **Standalone siempre** (no `NgModule`). **No** escribas `standalone: true`: es el default en
  Angular v20+. Importa lo que uses en `imports: [...]`.
- **Host bindings** en el objeto `host` del decorador; **no** uses `@HostListener`/`@HostBinding`.
- **Smart vs Dumb:**
  - *Smart* (`pages/`): inyecta servicios, maneja estado/rutas, orquesta. Pasa datos a los dumb.
  - *Dumb* (`components/`): solo `input()` / `output()`, sin servicios ni estado de negocio. Reutilizable y testeable.
- **Inputs/Outputs con funciones de señal:** `valor = input<T>()`, `valor = input.required<T>()`,
  `cambio = output<T>()`. (No uses los decoradores `@Input()/@Output()` en código nuevo.)
- **ChangeDetection:** se adopta `OnPush` en **M5** de forma transversal (hasta entonces, default).
- **Inyección:** usa `inject()` en vez de inyección por constructor.

## 4. Estado y reactividad

- **Signals** para estado local/derivado: `signal()`, `computed()`, `effect()`.
- Evita `BehaviorSubject` para estado de UI en código nuevo (signals son el estándar v22).
- RxJS solo para flujos asíncronos/eventos (ej. HTTP en M2).

## 5. Plantillas (control flow nuevo)

- Usa `@if` / `@else`, `@for` (**siempre con `track`**), `@switch`, y `@empty` en listas.
- **Prohibido** `*ngIf`, `*ngFor`, `*ngSwitch`, `ngClass`/`ngStyle` (usa `[class.x]`/`[style.x]`).

```html
@if (documents().length) {
  @for (doc of documents(); track doc.id) {
    <article class="doc">{{ doc.name }}</article>
  }
} @else {
  <app-empty-state />
}
```

## 6. Estilos (SCSS + variables CSS · sistema de diseño)

**Sin frameworks de estilo** (no Tailwind). El sistema de diseño vive en **hojas globales** y los
componentes solo llevan su **layout específico** — así el sitio se homogeniza y escala.

### Arquitectura

```
frontend/src/styles.scss     entrypoint (@use de los parciales)
frontend/src/styles/
├── _base.scss               tokens (variables CSS) + reset + body (tema por defecto)
└── _ui.scss                 primitivos reutilizables (clases globales)
```

### Reglas

- **Global vs componente:** los patrones compartidos (botones, inputs, píldoras, cards,
  tipografía…) son **clases globales** en `_ui.scss`. El SCSS del componente lleva solo su
  **estructura/layout** propia. Un cambio en `_ui.scss` se refleja en **todo el sitio**.
- **Antes de escribir un estilo, revisa si ya existe un primitivo.** Si un patrón se repite en
  2+ componentes, súbelo a `_ui.scss`.
- **Solo variables del tema** para color: `var(--color-surface)`, `var(--color-foreground)`,
  `var(--color-primary)`… **Nunca** colores hex/literales en componentes (los temas dependen de ello).
- **Iconos:** SVG inline de [lucide.dev](https://lucide.dev) (sin dependencia).
- Tipografía: `var(--font-display)` (Poppins) para títulos; `var(--font-sans)` para el cuerpo.

### Primitivos disponibles (`_ui.scss`)

| Clase | Para |
|-------|------|
| `.btn` · `.btn--icon` · `.btn--primary` · `.btn--danger` | botones (base · solo-icono · acción principal · destructiva) |
| `.pill` | forma de píldora (combina con `.btn` o `.input`) |
| `.input` · `.field` · `.field__label` | campos de formulario |
| `.chips` · `.chip` · `.chips__input` | entrada de tags como chips + input inline |
| `.card` · `.dashed-box` · `.frosted` · `.divider` | superficies y separadores |
| `.overlay` · `.menu` · `.menu__item` | popovers / menús |
| `.modal-actions` | fila de botones al pie de un modal |
| `.eyebrow` · `.display` · `.muted` | tipografía (etiqueta · título display · texto atenuado) |

> **Modales:** usa el componente compartido `shared/components/modal/` (shell con fondo difuminado,
> animación y cierre por Esc/clic/✕) y `shared/components/confirm-dialog/` para confirmaciones.
> El contenido se proyecta con `<ng-content>`; el footer usa el primitivo `.modal-actions`.

### Temas

Los tokens en `_base.scss` son el **tema por defecto (Kernel)**. El cambio de tema se hace
sobrescribiendo las variables `--color-*` en `:root` (el **Theme Switcher** lo aplica en caliente
y lo persiste en localStorage). Por eso los componentes **nunca** usan colores literales.

## 7. Routing

- **Lazy por feature**: `app.routes.ts` solo monta layouts y delega con `loadChildren` a
  `<feature>.routes.ts`.
- `AuthLayout` (público, pantalla completa) y `DashboardLayout` (interno; `authGuard` desde M3)
  son shells separados. No mezclar.
- Redirecciones explícitas (`redirectTo` + `pathMatch: 'full'`).

## 8. TypeScript

- `strict` activado; **prohibido `any`** (usa `unknown` + narrowing si hace falta).
- Modelos de dominio como `interface` en `*.model.ts`.
- Tipos explícitos en APIs públicas (inputs, outputs, retornos de servicio).

## 9. Pruebas

- **Vitest** (config base del proyecto). Archivos `*.spec.ts` junto al código que prueban.
- Dumb components: prueban render y eventos. Smart/servicios: lógica con mocks.
- Cobertura y E2E (Cypress) se formalizan en **M4** (meta ≥ 70% en servicios).

## 10. Accesibilidad (WCAG)

- HTML semántico, `aria-*` y roles donde aplique, foco visible, contraste adecuado.
- Imágenes con `alt`; botones/links con texto o `aria-label`.

## 11. Git (resumen)

- Ramas `feat/ · fix/ · docs/ · refactor/ · test/ · chore/`; Conventional Commits.
- Detalle del flujo en [`AGENTS.md`](../AGENTS.md) §6 (Estándares y buenas prácticas).
