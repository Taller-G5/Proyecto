FROM node:latest
WORKDIR /usr/src/node-service
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5004
CMD ["npm","start"]
