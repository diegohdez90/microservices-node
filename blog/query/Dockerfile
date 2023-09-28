FROM node:18.17.0-alpine
WORKDIR /usr/app
COPY package.json ./
RUN npm install
COPY index.js ./

CMD ["npm", "start"]
