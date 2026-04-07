# Manglam Technical Agency Website

A scalable, production-ready website for Manglam Technical Agency built with modern web technologies.

## System Architecture

```
mta-website/
├── frontend/          # UI + User Experience Layer (Next.js)
├── backend/           # Business Logic + API Layer (Express.js)
├── docs/              # Documentation
└── docker-compose.yml # Container Orchestration
```

## Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn
- MongoDB (optional for local dev)

### Development

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

**Backend:**
```bash
cd backend
npm install
npm run dev
```
API runs on [http://localhost:5000](http://localhost:5000)

### Docker (Recommended)

```bash
docker-compose up -d
```

## Project Structure

### Frontend (`/frontend`)
| Directory | Purpose |
|-----------|---------|
| `src/components/` | Reusable UI blocks |
| `src/pages/` | Page components (App Router) |
| `src/hooks/` | Custom React hooks |
| `src/services/` | API communication |
| `src/contexts/` | React contexts |
| `src/store/` | State management (Zustand) |
| `src/types/` | TypeScript definitions |
| `src/utils/` | Utility functions |
| `src/routes/` | Navigation system |

### Backend (`/backend`)
| Directory | Purpose |
|-----------|---------|
| `src/models/` | Database structure |
| `src/controllers/` | Request handling |
| `src/routes/` | API routes |
| `src/services/` | Core business logic |
| `src/middleware/` | Auth & security |
| `src/utils/` | Helper functions |
| `src/config/` | Configuration |
| `src/jobs/` | Background tasks |

## Tech Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Zustand

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer

### DevOps
- Docker & Docker Compose
- Nginx (reverse proxy)

## Documentation

- [Architecture](docs/architecture/ARCHITECTURE.md)
- [API Reference](docs/api/API.md)
- [Deployment Guide](docs/deployment/DEPLOYMENT.md)

## Environment Variables

See [Deployment Guide](docs/deployment/DEPLOYMENT.md) for full list.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## License

Private - Manglam Technical Agency

---

**Manglam Technical Agency**  
*Empowering Your Digital Future*  
[manglamtechnicalagency.com](https://manglamtechnicalagency.com)
