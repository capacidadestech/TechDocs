# infra/ — Infraestructura del monorepo

Configuración de **infraestructura compartida**: orquestación de contenedores, observabilidad
y despliegue. No incluye los `Dockerfile` de cada servicio (esos viven con su código).

> 🧭 Esta carpeta se **llena de forma evolutiva**. Hoy está documentada pero casi vacía;
> cada pieza llega en su módulo. No agregues config antes de su módulo.

## Qué irá aquí (y cuándo)

| Ruta | Contenido | Módulo |
|------|-----------|:------:|
| `infra/docker-compose.yml` | Orquestación local de los servicios | **M6** (multi-servicio en M7) |
| `infra/observability/` | OpenTelemetry + Grafana (dashboards, config OTLP) | **M8** |
| `infra/deploy/` | Manifests / scripts de despliegue a la nube | **M9** |

## Qué NO va aquí

| Config | Dónde vive | Por qué |
|--------|-----------|---------|
| `Dockerfile` de cada servicio | `frontend/Dockerfile`, `backend/Dockerfile` | Necesita el *build context* de su propio paquete |
| Pipelines CI/CD | `.github/workflows/` (`ci.yml`, `cd.yml`) | GitHub Actions solo los lee ahí |
| Variables/secretos | GitHub Secrets / `.env` (ignorado) | Nunca se versionan |

## Referencia

Arquitectura objetivo en `docs/architecture/`. Plan de despliegue en el módulo M6 y M9
(`docs/modules/`).
