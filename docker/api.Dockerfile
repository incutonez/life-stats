FROM node:lts-alpine AS build
USER node

WORKDIR /app
# copy everything from the root workspace
COPY --chown=node:node . .
# install project dependencies for api workspace
RUN npm ci -w packages/api
# build app for production with minification
RUN npm run api:build
ENV NODE_ENV=production
RUN npm ci --only=production && npm cache clean --force

FROM node:lts-alpine AS main
USER node

WORKDIR /app
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/packages/api/package.json .
COPY --chown=node:node --from=build /app/packages/api/dist dist
COPY --chown=node:node --from=build /app/packages/api/.env* .
COPY --chown=node:node --from=build /app/certs dist/certs
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
