FROM node:lts-alpine AS build
USER node

ARG VITE_MODE
WORKDIR /app
# copy everything from the root workspace
COPY --chown=node:node . .
# install project dependencies
RUN npm ci -w packages/ui -w packages/spec
WORKDIR /app/packages/ui
# build app for production with minification
RUN if [[ "$VITE_MODE" = "test" ]]; then npm run build:test; else npm run build:prod; fi

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
