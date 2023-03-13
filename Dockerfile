FROM node:19-alpine

WORKDIR /usr/src/app

COPY ./app/package.json ./app/yarn.lock ./app/.yarnrc.yml ./
COPY ./app ./

RUN yarn install --frozen-lockfile
# RUN yarn build

EXPOSE 3000

CMD ["node", "server.js"]
