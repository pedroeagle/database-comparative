#!/bin/bash
npm install
node load
cd src
npm install
if $ENV=='dev'
    then npm run dev
else
    npm run build
    npm start
fi