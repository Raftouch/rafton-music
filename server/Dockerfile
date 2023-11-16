FROM node:lts-alpine

RUN npm install --global nodemon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run build

EXPOSE 4000

CMD npm run dev