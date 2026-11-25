ARG NODE_VERSION=24.14.0-alpine
ARG NGINX_VERSION=1.31.9-alpine-slim

FROM node:${NODE_VERSION} AS deps 

WORKDIR /app

RUN chown node:node /app

USER node

COPY --chown=node:node package.json package-lock.json ./

RUN npm ci

FROM node:${NODE_VERSION} AS build

WORKDIR /app

RUN chown node:node /app

USER node

COPY --from=deps --chown=node:node /app/node_modules ./node_modules/

COPY --chown=node:node . . 

RUN npm run build

FROM nginx:${NGINX_VERSION} AS runner

WORKDIR /app

RUN touch /var/run/nginx.pid && chown -R nginx:nginx /var/cache/nginx /run/nginx.pid
RUN chown nginx:nginx /app

USER nginx

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=nginx:nginx /app/dist /usr/share/nginx/html

EXPOSE 81

CMD ["nginx", "-g", "daemon off;"]


