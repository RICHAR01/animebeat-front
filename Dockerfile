FROM node:12-alpine

WORKDIR /app

# Pre-installed deps (node_modules + bower already in repo)
COPY . .

# Only install globals
RUN npm install -g grunt-cli 2>/dev/null || true

ENV NODE_ENV=production
EXPOSE 3000

# Use node server.js directly instead of grunt (avoids nodemon --debug crash)
CMD ["node", "server.js"]
