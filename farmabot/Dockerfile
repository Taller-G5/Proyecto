FROM risingstack/alpine:3.7-v8.10.0-4.8.0
WORKDIR /usr/src/farmabot
COPY package*.json ./
RUN npm i -g localtunnel
RUN npm install 
COPY . .
EXPOSE 5000
CMD ["npm","start"]
