# frontend/Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Expose port 3000 for the development server
EXPOSE 3000

# Start the development server (hot reloading enabled)
CMD ["npm", "start"]