FROM node:18-slim

WORKDIR /app

COPY package*.json ./
ENV NODE_ENV=development
RUN apt-get update -y && apt-get install -y openssl
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
