FROM node:latest

RUN npm install -g servor

RUN mkdir /app
WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000
CMD [ "servor", "dist", "index.html", "5000" ]


