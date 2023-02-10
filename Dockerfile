#build environment and run tests
FROM node:lts-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --no-optional
COPY . .
RUN npm run test 

# development environment
FROM node:lts-alpine as dev
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app .
ENV NODE_ENV=development
EXPOSE 3000
RUN chown -R node /usr/src/app \
  && chmod -R 755 /usr/src/app
USER node
CMD ["npm", "run", "dev"]

# production environment
FROM node:lts-alpine as prod
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app .
ENV NODE_ENV=production
EXPOSE 3000
RUN chown -R node /usr/src/app \
  && chmod -R 755 /usr/src/app
USER node
CMD ["npm", "start"]