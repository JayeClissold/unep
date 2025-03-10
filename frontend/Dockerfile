# frontend/Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose port 3000 for the development server
EXPOSE 3000

# Start the development server (hot reloading enabled)
CMD ["npm", "start"]