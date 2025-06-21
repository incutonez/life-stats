FROM node:lts-alpine

RUN mkdir -p /usr/ui

WORKDIR /usr/tmp

# copy everything from the root workspace
COPY . .

# install simple http server for serving static content
RUN npm i -g http-server

# install project dependencies
RUN npm ci --include=dev

# build app for production with minification
RUN npm run ui:build:prod

RUN mv ./packages/ui/dist/* ../ui

RUN mv certs ../ui

WORKDIR /usr/ui

RUN rm -rf /usr/tmp

EXPOSE 8080
CMD [ "http-server", "-S", "-C", "certs/cert.crt", "-K", "certs/cert.key", "--cors", "." ]