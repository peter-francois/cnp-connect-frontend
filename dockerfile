FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json .
RUN npm ci --omit=dev

COPY . .
RUN npm run build

FROM nginx:1.28-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
#no write for group or other user than owner
RUN chmod -R 755 /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]