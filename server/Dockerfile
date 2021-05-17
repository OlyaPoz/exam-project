FROM node:14.16.1-alpine3.13

ARG NODE_ENV="production"

RUN mkdir ./server

RUN mkdir -p /var/www/html/images/

WORKDIR /server

COPY . .

RUN npm install -g sequelize-cli\
  && npm install\
  && chmod u+x ./start.sh

EXPOSE 3000

CMD ./start.sh