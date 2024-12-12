FROM node:23.2


COPY package.json package.json
RUN yarn install

COPY . .

RUN yarn build

FROM nginx:stable-alpine

COPY --from=build /dist /usr/share/nginx/html
COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "deamon off;"]
