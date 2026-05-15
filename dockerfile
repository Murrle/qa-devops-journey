# Start from official Node.js 18 image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Install Playwright with all browsers and dependencies
RUN npx playwright install --with-deps

# Copy the rest of your project
COPY . .

# Default command - run all tests
CMD ["npx", "playwright", "test"]