# Deployment Guide

## Prerequisites

- Node.js 20+
- npm
- A production host that supports Next.js 16
- Domain with SSL certificate
- SMTP credentials for contact, quote, and document request forms

## Environment Variables

Create `.env.local` in the repository root for local development. Configure equivalent environment variables in the production host.

```env
# SMTP email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM="MTA Website <your-email@gmail.com>"

# Site assistant
OPENROUTER_API_KEY=your-openrouter-api-key
OPENROUTER_MODEL=openai/gpt-oss-20b:free

# Public site URL
NEXT_PUBLIC_SITE_URL=https://manglamtechnicalagency.com

# Optional API CORS allowlist
ALLOWED_ORIGINS=https://manglamtechnicalagency.com,https://www.manglamtechnicalagency.com
```

`OPENROUTER_API_KEY` is optional. If it is missing, `/api/chat` returns local fallback responses instead of streamed model output.

## Deployment Options

### Option 1: Vercel

1. Connect the GitHub repository to Vercel.
2. Leave the root directory as the repository root.
3. Set the environment variables above in Project Settings.
4. Deploy the `main` branch.

### Option 2: Manual Node Deployment

```bash
git clone https://github.com/vijaysinghkadela/Manglam_Technical_Agency_Website.git
cd Manglam_Technical_Agency_Website
npm ci
npm run build
npm run start
```

By default, `npm run start` serves the production app on port 3000.

### Option 3: PM2

```bash
npm ci
npm run build
npm install -g pm2
pm2 start npm --name mta-website -- start
pm2 save
pm2 startup
```

## Verification

```bash
npm run lint
npm run build
```

After deployment, verify these routes:

- `/`
- `/about`
- `/services`
- `/portfolio`
- `/pricing`
- `/contact`
- `/trust-center`
- `/cybersecurity-policy`
- `/cybersecurity-training`
- `/legal`
- `/api/chat`
- `/api/contact`
- `/api/document-request`
- `/api/newsletter`
- `/api/quote`

## Nginx Reverse Proxy

For a self-hosted deployment, proxy the single Next.js process:

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

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

API routes are served by the same Next.js process at `/api/*`; do not proxy them to a separate backend.

## Operational Notes

- The active app is in the root `src/` directory, not `frontend/` or `backend/`.
- No MongoDB, JWT server, Redis, or Express backend is required by the active website.
- SMTP is required for production form delivery.
- The in-memory rate limit in `src/proxy.ts` works per process. For multi-instance/serverless production, use a shared store if strict global limits are required.
