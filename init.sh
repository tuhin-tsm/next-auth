#! /bin/bash

pm2 start npm --name "next-app" -- start;

nginx -g "daemon off;"
