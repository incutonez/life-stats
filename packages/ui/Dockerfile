FROM node:lts-alpine

RUN mkdir -p /usr/tmp

RUN mkdir -p /usr/app

WORKDIR /usr/tmp

# copy everything from the root workspace
COPY . .

# Idea from https://stackoverflow.com/a/44047595/1253609
RUN apk add --no-cache openssl && \
    openssl genrsa -des3 -passout pass:x -out server.pass.key 2048 && \
    openssl rsa -passin pass:x -in server.pass.key -out ../app/server.key && \
    rm server.pass.key && \
    openssl req -new -key ../app/server.key -out server.csr \
        -subj "/C=US/ST=Virginia/L=Fairfax/O=incutonez/OU=Life Stats/CN=incutonez.dev" && \
    openssl x509 -req -days 365 -in server.csr -signkey ../app/server.key -out ../app/server.crt

# install simple http server for serving static content
RUN npm i -g http-server

# install project dependencies
RUN npm i

# build app for production with minification
RUN npm run ui:build

COPY ./packages/ui/dist ../app

WORKDIR /usr/app

RUN rm -rf /usr/tmp

EXPOSE 8080
EXPOSE 443
CMD [ "http-server", "-S", "-C", "server.crt", "-K", "server.key", "--cors", "." ]