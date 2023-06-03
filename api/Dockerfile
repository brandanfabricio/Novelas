FROM node:lts-alpine

WORKDIR /user/src/app

COPY package*.json .

RUN npm install

COPY ./build .
COPY wait-for-it.sh .
COPY .env .

ENV HOST '192.168.1.16'
ENV PORT '4000'
EXPOSE 3000

CMD ["npm","start"]
