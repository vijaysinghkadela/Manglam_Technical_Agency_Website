# MTA Website - System Architecture

## Overview

This project follows a scalable system architecture with clear separation between frontend and backend.

## Structure

```
mta-website/
├── frontend/                 # UI + User Experience Layer
│   ├── src/
│   │   ├── components/      # Reusable UI blocks
│   │   ├── pages/           # Page components (Next.js App Router)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API communication
│   │   ├── contexts/        # React contexts
│   │   ├── store/           # State management (Zustand)
│   │   ├── types/           # TypeScript definitions
│   │   ├── utils/           # Utility functions
│   │   ├── routes/          # Navigation system
│   │   ├── lib/             # Core libraries
│   │   └── styles/          # Global styles
│   └── public/              # Static assets
│
├── backend/                  # Business Logic + API Layer
│   ├── src/
│   │   ├── models/          # Database structure (Mongoose)
│   │   ├── controllers/     # Request handling
│   │   ├── routes/          # API routes
│   │   ├── services/        # Core business logic
│   │   ├── middleware/      # Auth & security
│   │   ├── utils/           # Helper functions
│   │   ├── config/          # Configuration
│   │   ├── jobs/            # Background tasks
│   │   └── server.js        # Entry point
│   └── Dockerfile
│
├── docs/                     # Documentation
│   ├── api/                 # API documentation
│   ├── architecture/        # Architecture docs
│   ├── deployment/          # Deployment guides
│   └── guides/              # Developer guides
│
├── docker-compose.yml        # Container orchestration
└── README.md                 # Project overview
```

## Architecture Principles

### Frontend
- **Components**: Atomic design, reusable UI blocks
- **Hooks**: Encapsulated stateful logic
- **Services**: API communication abstraction
- **Store**: Global state with Zustand
- **Routes**: Type-safe navigation

### Backend
- **Models**: MongoDB schemas with validation
- **Controllers**: Thin, delegate to services
- **Services**: Core business logic
- **Middleware**: Authentication, validation, rate limiting
- **Jobs**: Cron jobs, background processing

## Tech Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Zustand (state)
- Framer Motion (animations)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer

### DevOps
- Docker & Docker Compose
- Nginx (reverse proxy)
- Redis (caching)
