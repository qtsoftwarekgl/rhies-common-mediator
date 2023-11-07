FROM node:latest
WORKDIR /usr/src/app/commonMediator

COPY ./server/ .

RUN npm install

EXPOSE 4004

CMD ["node", "./lib/index.js" ]
