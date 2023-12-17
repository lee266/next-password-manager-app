FROM node:19-alpine

WORKDIR /usr/src/app

COPY ./app/package.json ./app/yarn.lock ./app/.yarnrc.yml ./app/.yarnrc ./

RUN corepack enable
RUN yarn install
# RUN yarn build

COPY ./app/src ./app/public ./
EXPOSE 3000

CMD ["node", "server.js"]
