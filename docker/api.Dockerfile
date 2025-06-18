FROM node:lts-alpine

WORKDIR /usr/app

# copy everything from the root workspace
COPY . .

# install project dependencies
RUN npm i

# build app for production with minification
RUN npm run api:build

RUN mv docker/api.env.prod packages/api/.env.prod

WORKDIR /usr/app/packages/api

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]