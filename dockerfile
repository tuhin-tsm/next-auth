# 1. Install dependencies

FROM node:lts-alpine as package_install

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --ignore-scripts --prefer-offline

# 2. Build the app

FROM package_install as build

ARG BuildId

COPY . .

RUN echo '{"BuildId": "'${BuildId}'"}' > /app/deployment/appInfo.json

RUN yarn run build

# 3. Creating nginx image and copy build folder from above
# Also install pm2 to start the Node server Next.js

FROM nginx:1.23.2-alpine as nginx

RUN rm /etc/nginx/conf.d/default.conf

RUN apk add nodejs npm
RUN npm install --global pm2

FROM nginx

WORKDIR /app

COPY --from=build /app .

COPY init.sh .

RUN chmod +x ./init.sh

COPY ./deployment/nginx.conf /etc/nginx/

EXPOSE 80

ENTRYPOINT [ "sh", "./init.sh" ]
