FROM node:23.2


COPY package.json package.json
RUN yarn install

COPY . .

CMD ["yarn", "build"]