FROM node:16
WORKDIR /usr/app
COPY src/package.json .
RUN npm install --quiet
COPY . .