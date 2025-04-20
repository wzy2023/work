rm -r ./service/build

cd ./service
pnpm build
echo "后端代码打包成功"

cp package.json ./build
cp -r cert ./build/cert

cd ../
pnpm build-only
echo "前端代码打包成功"

mv dist ./service/build/public

git add .
git commit -a -m "build: chat"
