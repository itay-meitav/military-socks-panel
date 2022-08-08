cd deploy
git init
echo "\n .env" >> "./.gitignore"
heroku git:remote -a cyber4s-socks
git add -A
git commit -m "deploy"
git push heroku master -f
