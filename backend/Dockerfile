FROM node:23-slim

WORKDIR /app

COPY package*.json ./
ENV NODE_ENV=development
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
