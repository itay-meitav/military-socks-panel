#! /bin/bash


HEROKU_APP_NAME="cyber4s-socks"

cd deploy
git init
echo "\n .env" >> "./.gitignore"
heroku git:remote -a "$HEROKU_APP_NAME"
git add -A
git commit -m "deploy"
git push heroku master -f
