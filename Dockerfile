FROM node:19-alpine

WORKDIR /usr/src/app

COPY ./app/package.json ./app/package-lock.json ./

RUN npm install

COPY ./app/src ./app/public ./
EXPOSE 3000

CMD ["npm", "run", "dev"]
