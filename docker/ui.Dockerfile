FROM node:lts-alpine AS build

WORKDIR /app
# copy everything from the root workspace
COPY . .
# install project dependencies
RUN npm ci -w packages/ui -w packages/spec
# build app for production with minification
RUN npm run ui:build:prod

FROM node:lts-alpine AS main

WORKDIR /app
RUN mkdir -p /app/certs
COPY --from=build /app/packages/ui/dist .
COPY --from=build /app/certs certs
# install simple http server for serving static content
RUN npm i -g http-server
EXPOSE 8080
CMD [ "http-server", "-S", "-C", "certs/cert.crt", "-K", "certs/cert.key", "--cors", "." ]
