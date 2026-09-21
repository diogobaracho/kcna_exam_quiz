# ---- base: install dependencies -------------------------------------------
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# ---- dev: Vite dev server with hot reload ---------------------------------
FROM base AS dev
ENV CHOKIDAR_USEPOLLING=true
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

# ---- build: static production bundle --------------------------------------
FROM base AS build
COPY . .
RUN npm run build

# ---- prod: nginx serving the bundle ---------------------------------------
FROM nginx:1.27-alpine AS prod
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
