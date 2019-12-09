FROM node:latest

WORKDIR /app

ENV NODE_ENV development

COPY package*.json .
RUN npm install

COPY . .
RUN ls -lh

EXPOSE 8080
CMD [ "npm", "run", "serve" ]