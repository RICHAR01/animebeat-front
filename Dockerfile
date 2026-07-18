FROM node:18-alpine

WORKDIR /app

# Build deps for native modules
RUN apk add --no-cache python3 make g++

# Copy package files first for caching
COPY package*.json .bowerrc bower.json ./

# Fresh install with mongoose 8 + legacy compat
RUN npm install --legacy-peer-deps --ignore-engines
RUN npm install -g bower 2>/dev/null && bower install --config.interactive=false --allow-root 2>/dev/null || true

# Copy app
COPY . .

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "server.js"]
