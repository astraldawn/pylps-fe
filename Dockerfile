FROM node:alpine as angular-built
WORKDIR /usr/src/app
RUN npm i -g @angular/cli --unsafe
COPY package.json package.json
RUN npm install --silent
COPY . .
RUN ng build --prod --build-optimizer

FROM nginx:alpine
LABEL author="Mark Lee"
COPY --from=angular-built /usr/src/app/dist /usr/share/nginx/html
COPY nginx-default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
