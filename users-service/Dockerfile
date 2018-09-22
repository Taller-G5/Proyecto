FROM risingstack/alpine:3.7-v8.10.0-4.8.0
WORKDIR /usr/src/node-service
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5001
CMD ["npm","start"]