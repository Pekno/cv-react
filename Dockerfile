# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code and assets
COPY . .

# Build the app - this will process and bundle the assets properly
RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copy built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]