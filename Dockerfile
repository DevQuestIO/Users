FROM node:18

WORKDIR /app

# Install netcat and other dependencies
RUN apt-get update && apt-get install -y netcat-openbsd

# Copy package files
COPY package*.json ./
COPY wait-for-it.sh ./
RUN chmod +x wait-for-it.sh

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Create src directory and copy files
RUN mkdir -p src
COPY src/ src/

# TypeScript configuration
COPY tsconfig.json ./

EXPOSE 5000

CMD ["./wait-for-it.sh", "crdb:26257", "-t", "60", "--", "npm", "start"]
# CMD ["bash", "./wait-for-it.sh", "crdb:26257", "-t", "60", "--", "npm", "start"]
