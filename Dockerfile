FROM node:22

WORKDIR /usr/src/website
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000
CMD ["npm", "start"]