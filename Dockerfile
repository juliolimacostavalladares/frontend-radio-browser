FROM node:16-alpine

WORKDIR /app

COPY yarn.lock package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]