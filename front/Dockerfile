FROM node:lts-alpine

RUN apk add make g++ python3 git
RUN npm i -g node-pre-gyp
RUN apk --no-cache add curl

WORKDIR /app

COPY public public
COPY tsconfig.json tsconfig.json
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY tailwind.config.js tailwind.config.js
COPY codegen.ts codegen.ts
COPY src src

CMD npm run compile && npm start