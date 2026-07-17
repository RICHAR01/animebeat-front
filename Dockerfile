FROM nginx:alpine

# Copiar la app estática
COPY app /usr/share/nginx/html/app
COPY public /usr/share/nginx/html/public
COPY config /usr/share/nginx/html/config

# Copiar archivos raíz
COPY *.html /usr/share/nginx/html/
COPY *.js /usr/share/nginx/html/
COPY *.json /usr/share/nginx/html/

# Config SPA routing
RUN echo 'server { listen 3000; root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 3000
