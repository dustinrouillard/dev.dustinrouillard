FROM node:latest

RUN npm install -g http-server

RUN mkdir /app
WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000
CMD [ "http-server", "-p 5000", "dist" ]


