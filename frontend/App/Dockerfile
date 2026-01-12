# Stage 1: Build React app
FROM node:20-alpine AS build
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache tini

# Copy package files
COPY src/frontend/package*.json ./

# Install dependencies. Use `npm install` here instead of `npm ci` because the package-lock.json may not be present.
RUN npm install --no-audit --prefer-offline --no-fund

# Copy source and build
COPY src/frontend/ ./
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.24-alpine

# Switch to root to modify permissions
USER root

# Create writable PID directory and set permissions
RUN mkdir -p /run/nginx && \
    chown -R nginx:nginx /run/nginx && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    chown -R nginx:nginx /usr/share/nginx/html

# Copy custom nginx config
COPY src/frontend/nginx.conf /etc/nginx/nginx.conf

# Copy built application
COPY --from=build /app/dist /usr/share/nginx/html

# Switch to nginx user
USER nginx
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]