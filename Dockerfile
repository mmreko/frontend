FROM node:8

WORKDIR /home/app/src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "start"]