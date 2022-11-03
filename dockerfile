FROM node:16
WORKDIR /usr/app
COPY src/package.json .
RUN npm install
COPY . .
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 6A26B1AE64C3C388
RUN echo "deb [arch=amd64] http://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org.list
RUN apt update
RUN apt install -y mongodb-org