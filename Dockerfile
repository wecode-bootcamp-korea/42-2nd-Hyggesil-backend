FROM node:18.13.0-alpine

RUN apk add --no-cache bash
RUN apk add --no-cache curl
RUN apk add --no-cache mysql-client

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY [".", "."]

EXPOSE 4000

CMD [ "node", "server.js"]
