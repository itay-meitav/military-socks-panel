rm -rf deploy
npm run build
mkdir deploy
cp -r build deploy/public
cp index.js deploy
cd deploy
npm init -y
npm i express
# rm -rf node_modules


echo "web: node index" >> Procfile
echo "node_modules
*.map" > .gitignore

APP_NAME="socks4s"

git init 
git add -A
git commit -m "deploy"
heroku git:remote -a "$APP_NAME"

git push heroku master -f