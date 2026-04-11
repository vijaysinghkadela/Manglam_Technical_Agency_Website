# Backend Build
FROM node:20-alpine

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 backend

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source files
COPY --chown=backend:nodejs . .

# Create logs directory
RUN mkdir -p logs && chown -R backend:nodejs logs

USER backend

EXPOSE 5000

CMD ["node", "src/server.js"]
