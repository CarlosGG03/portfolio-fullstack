# Portfolio Full Stack — Carlos Garzón

Arquitectura profesional y modular para portafolio Full Stack con **Clean Architecture**, integrando **Next.js (React/TypeScript)**, **FastAPI (Python 3.13)**, **ASP.NET Core (.NET 10)**, **PostgreSQL** y **Docker**.

---

## 🏗️ Arquitectura del Monorepo

```text
portfolio-fullstack/
├── .github/workflows/          # Integración Continua (CI/CD) con GitHub Actions
├── frontend/                   # Interfaz pública y panel en Next.js 16 + Tailwind CSS
├── backend-python/             # API de contenido (Proyectos, Habilidades, Experiencia, Contacto) en FastAPI
├── backend-dotnet/             # API de Autenticación, JWT, Usuarios y Roles en ASP.NET Core Web API
├── infrastructure/
│   └── docker/                 # Docker Compose y orquestación local
└── docs/                       # Documentación y Decisiones de Arquitectura (ADRs)
```

---

## 🚀 Cómo Ejecutar Localmente

### Opción 1: Todo con Docker Compose (Recomendado)

Desde la raíz del proyecto:

```powershell
docker compose -f infrastructure/docker/docker-compose.yml up --build
```

Servicios levantados:
- **Frontend Next.js:** `http://localhost:3000`
- **Backend Python (FastAPI):** `http://localhost:8000` (Docs: `http://localhost:8000/docs`)
- **Backend .NET (Auth):** `http://localhost:5000` (Health: `http://localhost:5000/health`)
- **PostgreSQL:** `localhost:5433`

---

### Opción 2: Ejecutar individualmente

#### 1. Base de Datos (PostgreSQL)
```powershell
docker compose -f infrastructure/docker/docker-compose.yml up postgres -d
```

#### 2. Backend Python (FastAPI)
```powershell
cd backend-python
uv sync
uv run uvicorn portfolio_api.main:app --reload --port 8000
```
- Pruebas: `uv run pytest`
- Linting: `uv run ruff check .`

#### 3. Backend .NET (ASP.NET Core)
```powershell
cd backend-dotnet
dotnet run --project src/PortfolioAuth.Api/PortfolioAuth.Api.csproj
```
- Pruebas: `dotnet test`

#### 4. Frontend (Next.js)
```powershell
cd frontend
npm install
npm run dev
```
- Build de producción: `npm run build`

---

## 🧪 Pruebas Automatizadas

Todos los servicios cuentan con suites de pruebas unitarias y de integración:

- **Python (Pytest):** `cd backend-python && uv run pytest`
- **.NET (xUnit & WebApplicationFactory):** `cd backend-dotnet && dotnet test`
- **Frontend (TypeScript & Next.js Build):** `cd frontend && npm run build`
