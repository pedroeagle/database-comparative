#!/bin/bash
npm install
node load
cd src
npm install
if [[ $ENV = "dev" ]]
then
    echo 'ENV: dev'
    npm run dev
else
    echo 'ENV: prod'
    npm run build
    npm start
fi