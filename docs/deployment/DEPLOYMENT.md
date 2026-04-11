# Deployment Guide

## Prerequisites

- Docker & Docker Compose
- Node.js 20+
- MongoDB (or use Docker)
- Domain with SSL certificate

## Environment Variables

Create `.env` files in both `frontend/` and `backend/` directories:

### Backend (.env)

```env
# Server
NODE_ENV=production
PORT=5000

# Database
DATABASE_URL=mongodb://username:password@host:27017/mta_website

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=MTA <noreply@manglamtechnicalagency.com>
ADMIN_EMAIL=manglamtechnicalagency@gmail.com

# Frontend URL (for CORS)
FRONTEND_URL=https://manglamtechnicalagency.com
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=https://api.manglamtechnicalagency.com
```

## Deployment Options

### Option 1: Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/vijaysinghkadela/Manglam_Technical_Agency_Website.git
cd Manglam_Technical_Agency_Website

# Set up environment variables
cp .env.example .env
# Edit .env with your values

# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f
```

### Option 2: Manual Deployment

#### Backend

```bash
cd backend
npm install --production
npm start
```

#### Frontend

```bash
cd frontend
npm install
npm run build
npm start
```

### Option 3: Vercel (Frontend Only)

1. Connect your GitHub repo to Vercel
2. Set root directory to `frontend`
3. Add environment variables
4. Deploy

## Nginx Configuration

For production, use Nginx as reverse proxy:

```nginx
server {
    listen 80;
    server_name manglamtechnicalagency.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name manglamtechnicalagency.com;

    ssl_certificate /etc/ssl/certs/your-cert.pem;
    ssl_certificate_key /etc/ssl/private/your-key.pem;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
    }
}
```

## Monitoring

Use PM2 for process management:

```bash
npm install -g pm2

# Start backend
cd backend
pm2 start src/server.js --name mta-backend

# Start frontend
cd frontend
pm2 start npm --name mta-frontend -- start

# Save PM2 config
pm2 save
pm2 startup
```
