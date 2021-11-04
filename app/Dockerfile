FROM node:12.18.4-alpine
WORKDIR /opt/app/
COPY . .
RUN npm install
RUN npm run build

FROM node:12.18.4-alpine 
EXPOSE 3000
WORKDIR /opt/app/
COPY --from=0 /opt/app/package.json ./package.json
RUN npm i --prod
COPY --from=0 /opt/app/build/ ./
CMD npm run start:prod