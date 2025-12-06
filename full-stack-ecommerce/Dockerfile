FROM node:20-alpine

WORKDIR /app

# Copy package files first to leverage Docker layer cache
COPY package*.json ./

# Install only production dependencies for speed/security
RUN npm install --only=production

# Copy the rest of the source code
COPY . .

# Expose the API port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]