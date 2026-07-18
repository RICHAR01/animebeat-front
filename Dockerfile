FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf 2>/dev/null; rm /usr/share/nginx/html/index.html 2>/dev/null
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html/
EXPOSE 3000
