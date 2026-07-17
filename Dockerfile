FROM node:12-alpine

WORKDIR /app

# Install build deps for native modules (mongoose 5.x needs them)
RUN apk add --no-cache python3 make g++

# Copy package files first for layer caching
COPY package*.json .bowerrc bower.json ./

# Fresh install with mongoose 5.13
RUN npm install --production=false --legacy-peer-deps
RUN npm install -g bower 2>/dev/null && bower install --config.interactive=false --allow-root 2>/dev/null || true

# Copy the rest  
COPY . .

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "server.js"]
