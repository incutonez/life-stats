FROM node:lts-alpine

WORKDIR /usr/app

# copy everything from the root workspace
COPY . .

# install project dependencies
RUN npm ci --include=dev

# build app for production with minification
RUN npm run api:build

WORKDIR /usr/app/packages/api

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]