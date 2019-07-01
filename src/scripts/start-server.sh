#!/bin/bash
# $1 --> SERVER PORT

echo "Starting web fake service"
echo "npm start"
PORT=$1 npm run start --prefix ../fake-server
