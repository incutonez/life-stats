FROM node:lts-alpine AS build
USER node

WORKDIR /app
# copy everything from the root workspace
COPY --chown=node:node . .
# install project dependencies
RUN npm ci -w packages/ui -w packages/spec
# build app for production with minification
RUN npm run ui:build:prod

FROM node:lts-alpine AS main
USER node

WORKDIR /app
COPY --chown=node:node --from=build /app/packages/ui/dist .
COPY --chown=node:node --from=build /app/packages/ui/.env* .
COPY --chown=node:node --from=build /app/certs certs
# install simple http server for serving static content
RUN npm i http-server
EXPOSE 8080
CMD [ "npx", "http-server", "-S", "-C", "certs/cert.crt", "-K", "certs/cert.key", "--cors", "." ]
