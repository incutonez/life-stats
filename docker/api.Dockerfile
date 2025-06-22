FROM node:lts-alpine AS build

WORKDIR /app
# copy everything from the root workspace
COPY . .
# install project dependencies
RUN npm ci -w packages/api
# build app for production with minification
RUN npm run api:build

FROM node:lts-alpine AS main

WORKDIR /app
COPY --from=build /app /app
WORKDIR /app/packages/api
EXPOSE 3000
CMD [ "node", "dist/main.js" ]
