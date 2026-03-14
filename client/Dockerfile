FROM node:24-alpine

ARG VITE_API_URL

ENV VITE_API_URL=$VITE_API_URL

WORKDIR /frontend

COPY package*.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run generate

EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]