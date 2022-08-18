rm -rf deploy

mkdir deploy

npm run build

cp -r dist deploy/

cp .env deploy
cp package.json deploy
cp package-lock.json deploy

cd deploy

echo "web: npm run start:prod" >> Procfile
echo ".env" > .gitignore


APP_NAME="socks4s-api"

git init 
git add -A
git commit -m "deploy"
heroku git:remote -a "$APP_NAME"

git push heroku master -f