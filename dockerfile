FROM node:16
WORKDIR /usr/app
COPY src/package.json .
RUN npm install --quiet
COPY . .
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo 'deb http://downloads-distro.mongodb.org dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list
RUN apt update
RUN apt install -y mongodb-org